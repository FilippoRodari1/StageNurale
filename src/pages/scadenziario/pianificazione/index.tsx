import { ChangeEvent, useEffect, useState } from "react";
import { API, BASE, PIANIFICAZIONE, V1 } from "../../../utils/constants";
import { useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorBar from "../../../components/molecules/errorBar";
import Navbar from "../../../components/molecules/navBar";
import IconSvg from "../../../components/iconsSvg";
import ModalDelete from "../../../components/atoms/modal/modalDelete";
import { Pianificazione } from "../../../store/pianificazione/types";
import { validationsSchemaPianificazione } from "../../../validations";
import { fetchPianificazione, getPianificazioneData } from "../../../store/pianificazione";
import { createPianificazione } from "../../../store/pianificazione/operations/createPianificazione";
import { deletePianificazione } from "../../../store/pianificazione/operations/deletePianificazione";
import PianificazioneModal from "./pianificazioneModal";
import PianificazioneFilterModal from "./pianificazioneFiltered";
import PianificazioneTable from "./pianificazioneTable";

const URL_PIANIFICAZIONE = `${BASE}${API}${V1}${PIANIFICAZIONE}`;

const PianificazionePage = () => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFilteredModalOpen, setIsFilteredModalOpen] = useState(false);
    const [pianificazioneToDelete, setPianificazioneToDelete] = useState<Pianificazione | null>(null);
    const [filteredPianificazione, setFilteredPianificazione] = useState<Pianificazione[]>([]);
    const [ricercaNome, setRicercaNome] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues, setFilterValues] = useState<{ valueCategory: string | null, isSale: string | null}>({
        valueCategory: null,
        isSale: null,
    });
    const [isDarkMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState('');
    const pianificazionePerPage = 8;
    const dispatch = useAppDispatch();

    const methods = useForm<Pianificazione>({ resolver: zodResolver(validationsSchemaPianificazione) });

    const pianificazioneList = useSelector(getPianificazioneData);

    const filteredPianificazioneList = pianificazioneList.filter((pianificazione) =>
        pianificazione.valueCategory.toLowerCase().includes(ricercaNome.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetchPianificazione());
    }, [dispatch]);

    const handleSave = async (data: Pianificazione) => {
        try {
            if (editingId !== null) {
                await updatePianificazione(editingId, { ...data, id: editingId });
            } else {
                await dispatch(createPianificazione(data));
            }
            handleModalClose();
        } catch (error: any) {
            console.error("Error saving data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };    
    
    const handleDeleteConfirmation = (pianificazione: Pianificazione) => {
        setPianificazioneToDelete(pianificazione);
        setIsDeleteModalOpen(true);
    };

    const deletePianificazioneData = async (id: number) => {
        try {
            await dispatch(deletePianificazione(id));
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            console.error("Error deleting data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
            setIsDeleteModalOpen(false);
            throw error;
        }
    };

    const updatePianificazione = async (id: number, updatedPianificazione: Pianificazione) => {
        try {
            const response = await fetch(`${URL_PIANIFICAZIONE}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPianificazione)
            });
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(fetchPianificazione());
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
            const pianificazione = pianificazioneList.find((pianificazione) => pianificazione.id === id);
            if (pianificazione) {
                methods.reset(pianificazione);
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

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement> | string) => {
        if (typeof event === 'string') {
            setFilterValues(prev => ({
                ...prev,
                isSale: event === ' ' ? null : event
            }));
        } else {
            setFilterValues(prev => ({
                ...prev,
                valueCategory: event.target.value === ' ' ? null : event.target.value
            }));
        }
    };
    
    const handleFilterSubmit = () => {
        setIsFilteredModalOpen(false);
    
        const filtered = pianificazioneList.filter(pianificazione => {
            const isCategoryMatch = !filterValues.valueCategory || pianificazione.valueCategory.toLowerCase().includes(filterValues.valueCategory.toLowerCase());
            const isSaleMatch = filterValues.isSale === null || 
                (filterValues.isSale === 'yes' && pianificazione.isSale) || 
                (filterValues.isSale === 'no' && !pianificazione.isSale);
            
            return isCategoryMatch && isSaleMatch;
        });
    
        setFilteredPianificazione(filtered);
    };
    
    const removeFilterSubmit = () => {
        setFilterValues({ valueCategory: null, isSale: null });
        setRicercaNome('');
        setIsFilteredModalOpen(false);
    };

    useEffect(() => {
        setFilteredPianificazione(filteredPianificazioneList);
    }, [pianificazioneList, ricercaNome]);

    const indexOfLastPianificazione = currentPage * pianificazionePerPage;
    const indexOfFirstPianificazione = indexOfLastPianificazione - pianificazionePerPage;
    const currentPianificazione = filteredPianificazione.slice(indexOfFirstPianificazione, indexOfLastPianificazione);

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

            <Navbar name="Pianificazione"/>

            <div className="w-full flex justify-between items-center mt-10 mb-1 mx-4">
                <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => handleModalOpen()}>+ Aggiungi nuovo</button>
                <div className="flex">
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => setIsFilteredModalOpen(true)}>Filtri</button>
                </div>
            </div>
            <div className="border-2 border-gray-400 rounded-lg w-full p-1 mx-4 mt-3" style={{ height: 'calc(100% - 180px)' }}>
                <div className="overflow-auto h-full font-lato">
                    {isFilteredModalOpen && (
                        <PianificazioneFilterModal
                            open={isFilteredModalOpen}
                            onClose={() => setIsFilteredModalOpen(false)}
                            filterValues={filterValues}
                            handleFilterChange={(value: string | ChangeEvent<HTMLSelectElement>) => handleFilterChange(value)}
                            handleFilterSubmit={handleFilterSubmit}
                            removeFilterSubmit={removeFilterSubmit}
                            darkMode={isDarkMode} 
                            pianificazione={[]}                        
                        />
                    )}
                    {isDeleteModalOpen && pianificazioneToDelete && (
                        <ModalDelete show={isDeleteModalOpen} onClick={() => setIsDeleteModalOpen(false)} className="bg-white rounded-xl p-8 max-w-md w-full flex flex-col items-center justify-center">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center justify-center">
                                <p className="font-lato mb-4 text-center text-gray-800">Sei sicuro di voler eliminare {pianificazioneToDelete.valueCategory}?</p>
                                <div className="flex items-center justify-center mt-6">
                                    <button className="mb-4 font-lato flex items-center justify-center bg-gray-400 text-gray-800 px-4 py-1 rounded-lg ml-4" onClick={() => setIsDeleteModalOpen(false)}>
                                        <IconSvg name="xDelete" width={28} height={28}/> Annulla
                                    </button>
                                    <button className="mb-4 font-lato flex items-center justify-center bg-pink-500 text-white px-4 py-1 rounded-lg ml-4" onClick={() => deletePianificazioneData(pianificazioneToDelete.id)}>
                                        <IconSvg name="tickTrue" width={32} height={32}/> Conferma
                                    </button>
                                </div>
                            </div>
                        </ModalDelete>
                    )}
                    <div className="overflow-auto h-full font-lato">
                        <PianificazioneTable
                            currentPianificazione={currentPianificazione}
                            handleModalOpen={handleModalOpen}
                            handleDeleteConfirmation={handleDeleteConfirmation}
                            isDarkMode={isDarkMode}
                        />
                    </div>      
                    <div>
                        <PianificazioneModal
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
                        <span className="mr-2 font-bold font-lato">di {Math.ceil(filteredPianificazione.length / pianificazionePerPage)}</span>
                        <div className="flex">
                            <button className="bg-gray-300 text-gray-800 px-2 py-1 mr-2 rounded-l-lg" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'◁'}</button>
                            <button className="bg-gray-300 text-gray-800 px-2 py-1 rounded-r-lg" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPianificazione.length / pianificazionePerPage)}>{'▷'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PianificazionePage;
