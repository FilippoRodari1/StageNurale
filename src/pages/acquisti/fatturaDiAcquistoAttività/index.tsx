import { useEffect, useState } from "react";
import { API, BASE, FATTURADIACQUISTOATTIVITA, V1 } from "../../../utils/constants";
import { fetchFatturaAcquisti, fetchFatturaAcquistiAttività, useAppDispatch, getFattureAcquistiAttivitàData } from "../../../store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorBar from "../../../components/molecules/errorBar";
import Navbar from "../../../components/molecules/navBar";
import IconSvg from "../../../components/iconsSvg";
import ModalDelete from "../../../components/atoms/modal/modalDelete";
import FatturaAcquistoAttivitaTable from "./fatturaAquistoAttivitàTable";
import FatturaAcquistoAttivitàModal from "./fatturaAcquistoAttivitàModal";
import { validationSchemaFatturaAcquistoAttivita } from "../../../validations";
import { PurchaseInvoiceActivity } from "../../../store/fattureAcquistiAttività/types";
import { createFattureAcquistiAttività } from "../../../store/fattureAcquistiAttività/operzioni/createFattureAcquistiAttività";
import { deleteFattureAcquistiAttività } from "../../../store/fattureAcquistiAttività/operzioni/deleteFattureAcquistiAttività";
const URL_FATTURADIACQUISTOATTIVITA = `${BASE}${API}${V1}${FATTURADIACQUISTOATTIVITA}`;

const FatturaAcquistoAttività = () => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [resourceToDelete, setResourceToDelete] = useState<PurchaseInvoiceActivity | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDarkMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState('');
    const dispatch = useAppDispatch();

    const methods = useForm<PurchaseInvoiceActivity>({ resolver: zodResolver(validationSchemaFatturaAcquistoAttivita) });
    const purchaseInvoiceActivity = useSelector(getFattureAcquistiAttivitàData);

    useEffect(() => {
        dispatch(fetchFatturaAcquistiAttività());
    }, [dispatch]);

    const handleSave = async (data: PurchaseInvoiceActivity) => {
        try {
            if (editingId !== null) {
                await updateData(editingId, { ...data, id: editingId });
            } else {
                await dispatch(createFattureAcquistiAttività(data));
            }
            handleModalClose();
        } catch (error: any) {
            console.error("Error saving data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };

    const handleDeleteConfirmation = (resource: PurchaseInvoiceActivity) => {
        setResourceToDelete(resource);
        setIsDeleteModalOpen(true);
    };

    const deleteData = async (id: number) => {
        try {
             await dispatch(deleteFattureAcquistiAttività(id));
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            console.error("Error deleting data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
            setIsDeleteModalOpen(false);
            throw error;
        }
    };

    const updateData = async (id: number, updatedResource: PurchaseInvoiceActivity) => {
        try {
            const response = await fetch(`${URL_FATTURADIACQUISTOATTIVITA}/${id}`, {
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
            const resource = purchaseInvoiceActivity.find((resource: PurchaseInvoiceActivity) => resource.id === id);
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

            <Navbar name="Fatture di Acquisto Attività" />

            <div className="w-full flex justify-between items-center mt-10 mb-1 mx-4">
                <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => handleModalOpen()}>+ Aggiungi nuovo </button>
            </div>
            <div className="border-2 border-gray-400 rounded-lg w-full p-1 mx-4 mt-3" style={{ height: 'calc(100% - 180px)' }}>
                <div className="overflow-auto h-full font-lato">
                    {isDeleteModalOpen && resourceToDelete && (
                        <ModalDelete show={isDeleteModalOpen} onClick={() => setIsDeleteModalOpen(false)} className="bg-white rounded-xl p-8 max-w-md w-full flex flex-col items-center justify-center">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center justify-center">
                                <p className="font-lato mb-4 text-center text-gray-800">Sei sicuro di voler eliminare {resourceToDelete.activityId} ?</p>
                                <div className="flex items-center justify-center mt-6">
                                    <button className="mb-4 font-lato flex items-center justify-center bg-gray-400 text-gray-800 px-4 py-1 rounded-lg ml-4" onClick={() => setIsDeleteModalOpen(false)}>
                                        <IconSvg name="xDelete" width={28} height={28} /> Annulla
                                    </button>
                                    <button className="mb-4 font-lato flex items-center justify-center bg-pink-500 text-white px-4 py-1 rounded-lg ml-4" onClick={() => deleteData(resourceToDelete.id)}>
                                        <IconSvg name="tickTrue" width={32} height={32} /> Conferma
                                    </button>
                                </div>
                            </div>
                        </ModalDelete>
                    )}
                    <div className="overflow-auto h-full font-lato">
                        <FatturaAcquistoAttivitaTable
                            currentFatturaAcquistoAttivita={purchaseInvoiceActivity}
                            handleModalOpen={handleModalOpen}
                            handleDeleteConfirmation={handleDeleteConfirmation}
                            isDarkMode={isDarkMode}
                        />
                    </div>
                    <div>
                        <FatturaAcquistoAttivitàModal
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

export default FatturaAcquistoAttività;
