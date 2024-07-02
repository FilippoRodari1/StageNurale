import { useEffect, useState } from "react";
import { API, BASE, SCADENZE, V1 } from "../../../utils/constants";
import { fetchFatturaAcquisti, useAppDispatch, fetchScadenze, getScadenzeData } from "../../../store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorBar from "../../../components/molecules/errorBar";
import Navbar from "../../../components/molecules/navBar";
import IconSvg from "../../../components/iconsSvg";
import ModalDelete from "../../../components/atoms/modal/modalDelete";
import { Scadenze } from "../../../store/scadenze/types";
import { createScadenze } from "../../../store/scadenze/operations/createScadenze";
import { deleteScadenze } from "../../../store/scadenze/operations/deleteScadenze";
import { validationsSchemaScadenze } from "../../../validations";
import ScadenzeTable from "./scadenzeTable";
import ScadenzeModal from "./scadenzeModal";
const URL_SCADENZE = `${BASE}${API}${V1}${SCADENZE}`;

const ScadenzePage = () => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [scadenzeToDelete, setScadenzeToDelete] = useState<Scadenze | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDarkMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState('');
    const dispatch = useAppDispatch();

    const methods = useForm<Scadenze>({ resolver: zodResolver(validationsSchemaScadenze) });
    const scadenze = useSelector(getScadenzeData);

    useEffect(() => {
        dispatch(fetchScadenze());
    }, [dispatch]);

    const handleSave = async (data: Scadenze) => {
        try {
            if (editingId !== null) {
                await updateData(editingId, { ...data, id: editingId });
            } else {
                await dispatch(createScadenze(data));
            }
            handleModalClose();
        } catch (error: any) {
            console.error("Error saving data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };

    const handleDeleteConfirmation = (resource: Scadenze) => {
        setScadenzeToDelete(resource);
        setIsDeleteModalOpen(true);
    };

    const deleteData = async (id: number) => {
        try {
             await dispatch(deleteScadenze(id));
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            console.error("Error deleting data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
            setIsDeleteModalOpen(false);
            throw error;
        }
    };

    const updateData = async (id: number, updatedResource: Scadenze) => {
        try {
            const response = await fetch(`${URL_SCADENZE}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedResource)
            });
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(fetchFatturaAcquisti());
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
            const resource = scadenze.find((resource: Scadenze) => resource.id === id);
            if (resource) {
                methods.reset(resource);
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

            <Navbar name="Scadenze" />

            <div className="w-full flex justify-between items-center mt-10 mb-1 mx-4">
                <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => handleModalOpen()}>+ Aggiungi nuovo </button>
            </div>
            <div className="border-2 border-gray-400 rounded-lg w-full p-1 mx-4" style={{ height: 'calc(100% - 180px)' }}>
                <div className="overflow-auto h-full font-lato">
                    {isDeleteModalOpen && scadenzeToDelete && (
                        <ModalDelete show={isDeleteModalOpen} onClick={() => setIsDeleteModalOpen(false)} className="bg-white rounded-xl p-8 max-w-md w-full flex flex-col items-center justify-center">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center justify-center">
                                <p className="font-lato mb-4 text-center text-gray-800">Sei sicuro di voler eliminare {scadenzeToDelete.salesInvoiceId} ?</p>
                                <div className="flex items-center justify-center mt-6">
                                    <button className="mb-4 font-lato flex items-center justify-center bg-gray-400 text-gray-800 px-4 py-1 rounded-lg ml-4" onClick={() => setIsDeleteModalOpen(false)}>
                                        <IconSvg name="xDelete" width={28} height={28} /> Annulla
                                    </button>
                                    <button className="mb-4 font-lato flex items-center justify-center bg-pink-500 text-white px-4 py-1 rounded-lg ml-4" onClick={() => deleteData(scadenzeToDelete.id)}>
                                        <IconSvg name="tickTrue" width={32} height={32} /> Conferma
                                    </button>
                                </div>
                            </div>
                        </ModalDelete>
                    )}
                    <div className="overflow-auto h-full font-lato">
                        <ScadenzeTable
                            currentScadenze={scadenze}
                            handleModalOpen={handleModalOpen}
                            handleDeleteConfirmation={handleDeleteConfirmation}
                            isDarkMode={isDarkMode}
                        />
                    </div>
                    <div>
                        <ScadenzeModal
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
                        <span className="mr-2 font-bold font-lato">di 1</span>
                        <div className="flex">
                            <button className="bg-gray-300 text-gray-800 px-2 py-1 mr-2 rounded-l-lg" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'◁'}</button>
                            <button className="bg-gray-300 text-gray-800 px-2 py-1 rounded-r-lg" onClick={() => paginate(currentPage + 1)}>{'▷'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScadenzePage;
