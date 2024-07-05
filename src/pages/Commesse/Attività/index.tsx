import { ChangeEvent, useEffect, useState } from "react";
import { API, BASE, ATTIVITA, V1 } from "../../../utils/constants";
import { fetchAttività, useAppDispatch, getAttivitàData } from "../../../store"; 
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationsSchemaActivities } from "../../../validations";
import ErrorBar from "../../../components/molecules/errorBar";
import Navbar from "../../../components/molecules/navBar";
import IconSvg from "../../../components/iconsSvg";
import ModalDelete from "../../../components/atoms/modal/modalDelete";
import FilterModalAttivita from "./attivitàFilter";
import ActivitiesModal from "./attivitàModal";
import ActivitiesTable from "./attivitàTable";
import { Activities } from "../../../store/attività/types";
import { createActivities } from "../../../store/attività/attività/createActivities";
import { deleteActivities } from "../../../store/attività/attività/deleteActivities";

const URL_ATTIVITA = `${BASE}${API}${V1}${ATTIVITA}`;

const AttivitaPage = () => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFilteredModalOpen, setIsFilteredModalOpen] = useState(false);
    const [attivitaToDelete, setAttivitaToDelete] = useState<Activities | null>(null);
    const [filteredAttivita, setFilteredAttivita] = useState<Activities[]>([]);
    const [ricercaNome, setRicercaNome] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues, setFilterValues] = useState({
        commessa: '',
        ordine: '',
        risorsa: '',
        stato: '',
        dataInizio: '',
        dataFine: ''
    });
    const [isDarkMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState('');
    const attivitaPerPage = 8;
    const dispatch = useAppDispatch();

    const methods = useForm<Activities>({ resolver: zodResolver(validationsSchemaActivities) });

    const attivita = useSelector(getAttivitàData); 

    useEffect(() => {
        dispatch(fetchAttività());
    }, [dispatch]);

    useEffect(() => {
        const filtered = attivita.filter((activity: Activities) =>
            activity.job.name.toLowerCase().includes(ricercaNome.toLowerCase())
        );
        setFilteredAttivita(filtered);
    }, [ricercaNome, attivita]);

    const handleSave = async (data: Activities) => {
        try {
            if (editingId !== null) {
                await updateData(editingId, { ...data, jobId: editingId });
            } else {
                await dispatch(createActivities(data));
            }
            handleModalClose();
            setRicercaNome('');
        } catch (error: any) {
            console.error("Error saving data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };

    const handleDeleteConfirmation = (attivita: Activities) => {
        setAttivitaToDelete(attivita);
        setIsDeleteModalOpen(true);
    };

    const deleteData = async (id: number) => {
        try {
            await dispatch(deleteActivities(id));
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            console.error("Error deleting data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
            setIsDeleteModalOpen(false);
        }
    };

    const updateData = async (id: number, updatedActivity: Activities) => {
        try {
            const response = await fetch(`${URL_ATTIVITA}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedActivity)
            });
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(fetchAttività());
            return data;
        } catch (error: any) {
            console.error("Error updating data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };

    const handleModalOpen = (id?: number) => {
        if (id) {
            const activity = attivita.find((activity: Activities) => activity.jobId === id);
            if (activity) {
                methods.reset(activity);
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

    const handleRicercaNomeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRicercaNome(event.target.value);
    };

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = event.target;
        setFilterValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilterSubmit = () => {                                                                                                                                                                                        
        setIsFilteredModalOpen(false);

        const filtered = attivita.filter((activity: Activities) => {
            const commessaMatch = filterValues.commessa.trim().length === 0 || activity.job.name.toLowerCase().includes(filterValues.commessa.toLowerCase());
            const ordineMatch = filterValues.ordine.trim().length === 0 || activity.order.name.toLowerCase().includes(filterValues.ordine.toLowerCase());
            const risorsaMatch = filterValues.risorsa.trim().length === 0 || activity.resource.name.toLowerCase().includes(filterValues.risorsa.toLowerCase());
            const statoMatch = filterValues.stato.trim().length === 0 || activity.state.toLowerCase().includes(filterValues.stato.toLowerCase());

            const dataInizioMatch = filterValues.dataInizio.trim().length === 0 || activity.startDate.includes(filterValues.dataInizio);
            const dataFineMatch = filterValues.dataFine.trim().length === 0 || activity.endDate.includes(filterValues.dataFine);
            return commessaMatch && ordineMatch && risorsaMatch && statoMatch && dataInizioMatch && dataFineMatch;
        });
        setFilteredAttivita(filtered);
    };

    const removeFilterSubmit = () => {
        setFilterValues({
            commessa: '',
            ordine: '',
            risorsa: '',
            stato: '',
            dataInizio: '',
            dataFine: ''
        });
        setRicercaNome('');
        setIsFilteredModalOpen(false);
    };

    const indexOfLastAttivita = currentPage * attivitaPerPage;
    const indexOfFirstAttivita = indexOfLastAttivita - attivitaPerPage;
    const currentAttivita = filteredAttivita.slice(indexOfFirstAttivita, indexOfLastAttivita);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= Math.ceil(filteredAttivita.length / attivitaPerPage)) {
            setCurrentPage(pageNumber);
        }
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

            <Navbar name="Attività"/> 

            <div className="w-full flex justify-between items-center mt-10 mb-1 mx-4">
                <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => handleModalOpen()}>+ Aggiungi nuova </button> {/* Bottone aggiornato per le attività */}
                <div className="flex">
                    <input type="text" placeholder="Cerca attività" className="px-12 py-1 border text-left border-gray-800 rounded-lg mb-2 mr-4" value={ricercaNome} onChange={handleRicercaNomeChange} />
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2 mr-4" onClick={handleFilterSubmit}>Cerca</button>
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => setIsFilteredModalOpen(true)}>Filtri</button>
                </div>
            </div>
            <div className="border-2 border-gray-400 rounded-lg w-full p-1 mx-4" style={{ height: 'calc(100% - 180px)' }}>
                <div className="overflow-auto h-full font-lato">
                    {isFilteredModalOpen && (
                        <FilterModalAttivita
                            open={isFilteredModalOpen}
                            onClose={() => setIsFilteredModalOpen(false)}
                            attivita={attivita}
                            filterValues={filterValues}
                            handleFilterChange={handleFilterChange}
                            handleFilterSubmit={handleFilterSubmit}
                            removeFilterSubmit={removeFilterSubmit}
                            darkMode={isDarkMode}
                        />
                    )}
                    {isDeleteModalOpen && attivitaToDelete && (
                        <ModalDelete show={isDeleteModalOpen} onClick={() => setIsDeleteModalOpen(false)} className="bg-white rounded-xl p-8 max-w-md w-full flex flex-col items-center justify-center">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center justify-center">
                                <p className="font-lato mb-4 text-center text-gray-800">Sei sicuro di voler eliminare l'attività del:  {attivitaToDelete.endDate} ?</p>
                                <div className="flex items-center justify-center mt-6">
                                    <button className="mb-4 font-lato flex items-center justify-center bg-gray-400 text-gray-800 px-4 py-1 rounded-lg ml-4" onClick={() => setIsDeleteModalOpen(false)}>
                                        <IconSvg name="xDelete" width={28} height={28}/> Annulla
                                    </button>
                                    <button className="mb-4 font-lato flex items-center justify-center bg-pink-500 text-white px-4 py-1 rounded-lg ml-4" onClick={() => deleteData(attivitaToDelete.id!)}>
                                        <IconSvg name="tickTrue" width={32} height={32}/> Conferma
                                    </button>
                                </div>
                            </div>
                        </ModalDelete>
                    )}
                    <div className="overflow-auto h-full font-lato">
                        <ActivitiesTable
                            activities={currentAttivita}
                            handleModalOpen={handleModalOpen}
                            handleDeleteConfirmation={handleDeleteConfirmation}
                            isDarkMode={isDarkMode}
                        />
                    </div>      
                    <div>
                        <ActivitiesModal
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
                        <span className="mr-2 font-bold font-lato">di {Math.ceil(filteredAttivita.length / attivitaPerPage)}</span>
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

export default AttivitaPage;
