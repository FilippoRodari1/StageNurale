import { ChangeEvent, useEffect, useState } from "react";
import { API, BASE, COMMESSE, V1 } from "../../../utils/constants";
import { fetchCommesse, useAppDispatch, getCommessaData } from "../../../store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Jobs } from "../../../store/commesse/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationsSchemaCommesse } from "../../../validations";
import ErrorBar from "../../../components/molecules/errorBar";
import Navbar from "../../../components/molecules/navBar";
import IconSvg from "../../../components/iconsSvg";
import ModalDelete from "../../../components/atoms/modal/modalDelete";
import FilterModalCommesse from "./filterModalCommesse";
import { createJobs } from "../../../store/commesse/commessa/actions/createJobs";
import { deleteJobs } from "../../../store/commesse/commessa/actions/deleteJobs";
import CommessaTable from "./commesseTable";
import CommessaModal from "./commesseModal";

const URL_COMMESSE = `${BASE}${API}${V1}${COMMESSE}`;

const CommessePage = () => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFilteredModalOpen, setIsFilteredModalOpen] = useState(false);
    const [commessaToDelete, setCommessaToDelete] = useState<Jobs | null>(null);
    const [filteredCommesse, setFilteredCommesse] = useState<Jobs[]>([]);
    const [ricercaNome, setRicercaNome] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues, setFilterValues] = useState({ code: '', customer: '', description: '' });
    const [isDarkMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState('');
    const commessePerPage = 8;
    const dispatch = useAppDispatch();

    const methods = useForm<Jobs>({ resolver: zodResolver(validationsSchemaCommesse) });

    const commesse = useSelector(getCommessaData);

    useEffect(() => {
        dispatch(fetchCommesse());
    }, [dispatch]);

    useEffect(() => {
        const filtered = commesse.filter((jobs: Jobs) =>
            jobs.code.toLowerCase().includes(ricercaNome.toLowerCase())
        );
        setFilteredCommesse(filtered);
    }, [ricercaNome, commesse]);

    const handleSave = async (data: Jobs) => {
        try {
            if (editingId !== null) {
                await updateData(editingId, { ...data, id: editingId });
            } else {
                await dispatch(createJobs(data));
            }
            handleModalClose();
            setRicercaNome('');
        } catch (error: any) {
            console.error("Error saving data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };

    const handleDeleteConfirmation = (commessa: Jobs) => {
        setCommessaToDelete(commessa);
        setIsDeleteModalOpen(true);
    };

    const deleteData = async (id: number) => {
        try {
            await dispatch(deleteJobs(id));
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            console.error("Error deleting data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
            setIsDeleteModalOpen(false);
        }
    };

    const updateData = async (id: number, updatedCommessa: Jobs) => {
        try {
            const response = await fetch(`${URL_COMMESSE}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCommessa)
            });
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(fetchCommesse());
            return data;
        } catch (error: any) {
            console.error("Error updating data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };

    const handleModalOpen = (id?: number) => {
        if (id) {
            const commessa = commesse.find((commessa: Jobs) => commessa.id === id);
            if (commessa) {
                methods.reset(commessa);
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

        const filtered = commesse.filter((commessa: Jobs) => {
            const codiceMatch = filterValues.code.trim().length === 0 || commessa.code.toLowerCase().includes(filterValues.code.toLowerCase());
            const clienteMatch = filterValues.customer.trim().length === 0 || commessa.customer.name.toLowerCase().includes(filterValues.customer.toLowerCase());
            const descrizioneMatch = filterValues.description.trim().length === 0 || commessa.description.toLowerCase().includes(filterValues.description.toLowerCase());
            return codiceMatch && clienteMatch && descrizioneMatch;
        });
        setFilteredCommesse(filtered);
    };

    const removeFilterSubmit = () => {
        setFilterValues({ code: '', customer: '', description: '' });
        setRicercaNome('');
        setIsFilteredModalOpen(false);
    };

    const indexOfLastCommessa = currentPage * commessePerPage;
    const indexOfFirstCommessa = indexOfLastCommessa - commessePerPage;
    const currentCommesse = filteredCommesse.slice(indexOfFirstCommessa, indexOfLastCommessa);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= Math.ceil(filteredCommesse.length / commessePerPage)) {
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

            <Navbar name="Commesse"/>

            <div className="w-full flex justify-between items-center mt-10 mb-1 mx-4">
                <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => handleModalOpen()}>+ Aggiungi nuovo </button>
                <div className="flex">
                    <input type="text" placeholder="Cerca commessa" className="px-12 py-1 border text-left border-gray-800 rounded-lg mb-2 mr-4" value={ricercaNome} onChange={handleRicercaNomeChange} />
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2 mr-4" onClick={handleFilterSubmit}>Cerca</button>
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => setIsFilteredModalOpen(true)}>Filtri</button>
                </div>
            </div>
            <div className="border-2 border-gray-400 rounded-lg w-full p-1 mx-4 mt-3" style={{ height: 'calc(100% - 180px)' }}>
                <div className="overflow-auto h-full font-lato">
                    {isFilteredModalOpen && (
                        <FilterModalCommesse
                            open={isFilteredModalOpen}
                            onClose={() => setIsFilteredModalOpen(false)}
                            commesse={commesse}
                            filterValues={filterValues}
                            handleFilterChange={handleFilterChange}
                            handleFilterSubmit={handleFilterSubmit}
                            removeFilterSubmit={removeFilterSubmit}
                            darkMode={isDarkMode}
                        />
                    )}
                    {isDeleteModalOpen && commessaToDelete && (
                        <ModalDelete show={isDeleteModalOpen} onClick={() => setIsDeleteModalOpen(false)} className="bg-white rounded-xl p-8 max-w-md w-full flex flex-col items-center justify-center">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center justify-center">
                                <p className="font-lato mb-4 text-center text-gray-800">Sei sicuro di voler eliminare {commessaToDelete.code} ?</p>
                                <div className="flex items-center justify-center mt-6">
                                    <button className="mb-4 font-lato flex items-center justify-center bg-gray-400 text-gray-800 px-4 py-1 rounded-lg ml-4" onClick={() => setIsDeleteModalOpen(false)}>
                                        <IconSvg name="xDelete" width={28} height={28}/> Annulla
                                    </button>
                                    <button className="mb-4 font-lato flex items-center justify-center bg-pink-500 text-white px-4 py-1 rounded-lg ml-4" onClick={() => deleteData(commessaToDelete.id!)}>
                                        <IconSvg name="tickTrue" width={32} height={32}/> Conferma
                                    </button>
                                </div>
                            </div>
                        </ModalDelete>
                    )}
                    <div className="overflow-auto h-full font-lato">
                        <CommessaTable
                            currentJobs={currentCommesse}
                            handleModalOpen={handleModalOpen}
                            handleDeleteConfirmation={handleDeleteConfirmation}
                            isDarkMode={isDarkMode}
                        />
                    </div>      
                    <div>
                        <CommessaModal 
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
                        <span className="mr-2 font-bold font-lato">di {Math.ceil(filteredCommesse.length / commessePerPage)}</span>
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

export default CommessePage;
