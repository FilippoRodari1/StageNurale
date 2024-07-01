import { useEffect, useState } from "react";
import { API, BASE, TIPIDIPAGAMENTO, V1 } from "../../../utils/constants";
import { fetchTypeOfPayments, getTypeOfPaymentsData, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchemaTypeOfPayments } from "../../../validations";
import ErrorBar from "../../../components/molecules/errorBar";
import Navbar from "../../../components/molecules/navBar";
import IconSvg from "../../../components/iconsSvg";
import ModalDelete from "../../../components/atoms/modal/modalDelete";
import TypeOfPaymentsModal from "./typeOfPaymentsModal";
import TypeOfPaymentsTable from "./typeOfPaymentsTable";

import { createTypeOfPayments } from "../../../store/tipiDiPagamento/operazioni/createTypeOfPayments";
import { deleteTypeOfPayments } from "../../../store/tipiDiPagamento/operazioni/deleteTypeOfPayments";
import TypeOfPaymentsFilter from "./typeOfPaymentsFilter";
import { TypeOfPayments } from "../../../store/tipiDiPagamento/types";

const URL_TIPIDIPAGAMENTO = `${BASE}${API}${V1}${TIPIDIPAGAMENTO}`;

const TipiDiPagamento = () => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFilteredModalOpen, setIsFilteredModalOpen] = useState(false);
    const [typeOfPaymentsToDelete, settypeOfPaymentsToDelete] = useState<TypeOfPayments| null>(null);
    const [filteredtypeOfPayments, setFilteredtypeOfPayments] = useState<TypeOfPayments[]>([]);
    const [ricercaNome, setRicercaNome] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues, setFilterValues] = useState({ movePaymentsToTheEndOfMonth: 'all' });
    const [isDarkMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState('');
    const typeOfPaymentsPerPage = 8;
    const dispatch = useAppDispatch();

    const methods = useForm<TypeOfPayments>({ resolver: zodResolver(validationSchemaTypeOfPayments) });

    const typeOfPayments = useSelector(getTypeOfPaymentsData);

    const filteredtypeOfPaymentsList = typeOfPayments.filter((payments) =>
        payments.name.toLowerCase().includes(ricercaNome.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetchTypeOfPayments());
    }, [dispatch]);

    const handleSave = async (data: TypeOfPayments) => {
        try {
            if (editingId !== null) {
                await updateData(editingId, { ...data, typeOfPaymentId: editingId });
            } else {
                await dispatch(createTypeOfPayments(data));
            }
            handleModalClose();
        } catch (error: any) {
            console.error("Error saving data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };    
    
    const handleDeleteConfirmation = (resource: TypeOfPayments) => {
        settypeOfPaymentsToDelete(resource);
        setIsDeleteModalOpen(true);
    };

    const deleteData = async (id: number) => {
        try {
            await dispatch(deleteTypeOfPayments(id));
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            console.error("Error deleting data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
            setIsDeleteModalOpen(false);
            throw error;
        }
    };

    const updateData = async (id: number, updatedResource: TypeOfPayments) => {
        try {
            const response = await fetch(`${URL_TIPIDIPAGAMENTO}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedResource)
            });
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(fetchTypeOfPayments());
            return data;
        } catch (error: any) {
            console.error("Error updating data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
            throw error;
        }
    };

    const handleModalOpen = (id?: number) => {
        if (id) {
            const payment = typeOfPayments.find((payment: TypeOfPayments) => payment.typeOfPaymentId === id);
            if (payment) {
                methods.reset(payment);
            }
        } else {
            methods.reset();
        }
        setEditingId(id || null);
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
        setEditingId(null);
    };

    const handleFilterChange = (value: string) => {
        setFilterValues((prev) => ({ ...prev, movePaymentsToTheEndOfMonth: value }));
    };

    const handleFilterSubmit = () => {
        setIsFilteredModalOpen(false);
    
        const filtered = typeOfPayments.filter((resource) => {
            if (filterValues.movePaymentsToTheEndOfMonth === 'yes') {
                return resource.movePaymentsToTheEndOfMonth;
            }
            if (filterValues.movePaymentsToTheEndOfMonth === 'no') {
                return !resource.movePaymentsToTheEndOfMonth;
            }
            return true;
        });
        setFilteredtypeOfPayments(filtered as TypeOfPayments[]);
    };
    
    const removeFilterSubmit = () => {
        setFilterValues({ movePaymentsToTheEndOfMonth: 'all' });
        setRicercaNome('');
        setIsFilteredModalOpen(false);
    };

    useEffect(() => {
        return setFilteredtypeOfPayments(filteredtypeOfPaymentsList);
    }, [typeOfPayments, ricercaNome]);

    const indexOfLasttypeOfPayments = currentPage * typeOfPaymentsPerPage;
    const indexOfFirsttypeOfPayments = indexOfLasttypeOfPayments - typeOfPaymentsPerPage;
    const currenttypeOfPayments = filteredtypeOfPayments.slice(indexOfFirsttypeOfPayments, indexOfLasttypeOfPayments);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleCloseError = () => {
        setErrorMessage('');
        setErrorDetails('');
    };

    return (
        <div className={`h-full w-full flex-col ${isDarkMode ? 'dark-mode' : ''}`}>
            {errorMessage && (
                <ErrorBar
                    errorMessage={errorMessage}
                    errorDetails={errorDetails}
                    onClose={handleCloseError}
                />
            )}

            <Navbar name="Tipi di Pagamento"/>

            <div className="w-full flex justify-between items-center mt-10 mb-1 mx-4">
                <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => handleModalOpen()}>+ Aggiungi nuovo </button>
                <div className="flex">
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => setIsFilteredModalOpen(true)}>Filtri</button>
                </div>
            </div>
            <div className="border-2 border-gray-400 rounded-lg w-full p-1 mx-4" style={{ height: 'calc(100% - 180px)' }}>
                <div className="overflow-auto h-full font-lato">
                {isFilteredModalOpen && (
                    <TypeOfPaymentsFilter
                        open={isFilteredModalOpen}
                        onClose={() => setIsFilteredModalOpen(false)}
                        filterValues={filterValues}
                        handleFilterChange={handleFilterChange}
                        handleFilterSubmit={handleFilterSubmit}
                        removeFilterSubmit={removeFilterSubmit}
                        darkMode={isDarkMode}                   
                    />
                )}
                    {isDeleteModalOpen && typeOfPaymentsToDelete && (
                        <ModalDelete show={isDeleteModalOpen} onClick={() => setIsDeleteModalOpen(false)} className="bg-white rounded-xl p-8 max-w-md w-full flex flex-col items-center justify-center">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center justify-center">
                                <p className="font-lato mb-4 text-center text-gray-800">Sei sicuro di voler eliminare {typeOfPaymentsToDelete.name} ?</p>
                                <div className="flex items-center justify-center mt-6">
                                    <button className="mb-4 font-lato flex items-center justify-center bg-gray-400 text-gray-800 px-4 py-1 rounded-lg ml-4" onClick={() => setIsDeleteModalOpen(false)}>
                                        <IconSvg name="xDelete" width={28} height={28}/> Annulla
                                    </button>
                                    <button className="mb-4 font-lato flex items-center justify-center bg-pink-500 text-white px-4 py-1 rounded-lg ml-4" onClick={() => deleteData(typeOfPaymentsToDelete.typeOfPaymentId!)}>
                                        <IconSvg name="tickTrue" width={32} height={32}/> Conferma
                                    </button>
                                </div>
                            </div>
                        </ModalDelete>
                    )}
                    <div className="overflow-auto h-full font-lato">
                        <TypeOfPaymentsTable
                            currentTypeOfPayments={currenttypeOfPayments}
                            handleModalOpen={handleModalOpen}
                            handleDeleteConfirmation={handleDeleteConfirmation}
                            isDarkMode={isDarkMode}
                        />
                    </div>      
                    <div>
                        <TypeOfPaymentsModal
                            open={open} 
                            handleSave={handleSave} 
                            handleModalClose={handleModalClose} 
                            editingId={editingId} 
                            darkMode={isDarkMode}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center ml-64 mt-4">
                    <div></div>
                    <button onClick={() => paginate(currentPage + 1)} className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-6 rounded-lg mb-2">Prossima Pagina</button>
                    <div className="flex items-center">
                        <span className="mr-2 font-bold font-lato">Pagina</span>
                        <input type="number" value={currentPage} onChange={(event) => setCurrentPage(Number(event.target.value))} className="border border-gray-800 font-bold font-lato rounded-lg text-center w-12 mx-2" />
                        <span className="mr-2 font-bold font-lato">di {Math.ceil(filteredtypeOfPayments.length / typeOfPaymentsPerPage)}</span>
                        <div className="flex">
                            <button className="bg-gray-300 text-gray-800 px-2 py-1 mr-2 rounded-l-lg" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'◁'}</button>
                            <button className="bg-gray-300 text-gray-800 px-2 py-1 rounded-r-lg" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredtypeOfPayments.length / typeOfPaymentsPerPage)}>{'▷'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TipiDiPagamento;
