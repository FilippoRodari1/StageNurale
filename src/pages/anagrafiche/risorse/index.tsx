import { ChangeEvent, useEffect, useState } from "react";
import { API, BASE, RESOURCES, V1 } from "../../../utils/constants";
import { RootState, fetchResources, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Resources } from "../../../store/resources/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationsSchemaResource } from "../../../validations";
import ErrorBar from "../../../components/molecules/errorBar";
import Navbar from "../../../components/molecules/navBar";
import FilterModal from "../../../components/atoms/modal/filterModal";
import IconSvg from "../../../components/iconsSvg";
import ModalDelete from "../../../components/atoms/modal/modalDelete";
import ResourceTable from "./resourceTable";
import ResourcesModal from "./resourceModal";
import { createResources } from "../../../store/resources/resource/createResource";
import { deletResources } from "../../../store/resources/resource/deleteResouces";

const URL_RESOURCES = `${BASE}${API}${V1}${RESOURCES}`;

const Risorse = () => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFilteredModalOpen, setIsFilteredModalOpen] = useState(false);
    const [resourceToDelete, setResourceToDelete] = useState<Resources | null>(null);
    const [filteredResources, setFilteredResources] = useState<Resources[]>([]);
    const [ricercaNome, setRicercaNome] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues, setFilterValues] = useState({ name: '', typeOfPayment: '', note: ''});
    const [isDarkMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState('');
    const resourcesPerPage = 8;
    const dispatch = useAppDispatch();

    const methods = useForm<Resources>({ resolver: zodResolver(validationsSchemaResource) });

    const resources = useSelector((state: RootState) => state.resources.data);

    const filteredResourcesList = resources.filter((resource) =>
        resource.firstName.toLowerCase().includes(ricercaNome.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetchResources());
    }, [dispatch]);

    const handleSave = async (data: Resources) => {
        try {
            if (editingId !== null) {
                await updateData(editingId, { ...data, id: editingId });
            } else {
                await dispatch(createResources(data));
            }
            handleModalClose();
        } catch (error: any) {
            console.error("Error saving data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };    
    
    const handleDeleteConfirmation = (resource: Resources) => {
        setResourceToDelete(resource);
        setIsDeleteModalOpen(true);
    };

    const deleteData = async (id: number) => {
        try {
            await dispatch(deletResources(id));
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            console.error("Error deleting data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
            setIsDeleteModalOpen(false);
            throw error;
        }
    };

    const updateData = async (id: number, updatedResource: Resources) => {
        try {
            const response = await fetch(`${URL_RESOURCES}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedResource)
            });
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(fetchResources());
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
            const resource = resources.find((resource: { id: number; }) => resource.id === id);
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

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilterValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilterSubmit = () => {
        setIsFilteredModalOpen(false);
    
        const filtered = resources.filter((resource) => {
            const fornitoreMatch = filterValues.name.trim().length === 0 || resource.firstName.toLowerCase().includes(filterValues.name.toLowerCase());
            return fornitoreMatch;
        });
        setFilteredResources(filtered as Resources[]);
    };
    
    const removeFilterSubmit = () => {
        setFilterValues({ name: '', typeOfPayment: '', note: '' });
        setRicercaNome('');
        setIsFilteredModalOpen(false);
    };

    useEffect(() => {
        setFilteredResources(filteredResourcesList);
    }, [resources, ricercaNome]);

    const indexOfLastResource = currentPage * resourcesPerPage;
    const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
    const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);

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

            <Navbar name="Risorse"/>

            <div className="w-full flex justify-between items-center mt-10 mb-1 mx-4">
                <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => handleModalOpen()}>+ Aggiungi nuovo </button>
                <div className="flex">
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => setIsFilteredModalOpen(true)}>Filtri</button>
                </div>
            </div>
            <div className="border-2 border-gray-400 rounded-lg w-full p-1 mx-4" style={{ height: 'calc(100% - 180px)' }}>
                <div className="overflow-auto h-full font-lato">
                    {isFilteredModalOpen && (
                        <FilterModal
                            open={isFilteredModalOpen}
                            onClose={() => setIsFilteredModalOpen(false)}
                            resources={resources as Resources[]}
                            filterValues={filterValues}
                            handleFilterChange={handleFilterChange}
                            handleFilterSubmit={handleFilterSubmit}
                            removeFilterSubmit={removeFilterSubmit}
                            darkMode={isDarkMode}
                        />
                    )}
                    {isDeleteModalOpen && resourceToDelete && (
                        <ModalDelete show={isDeleteModalOpen} onClick={() => setIsDeleteModalOpen(false)} className="bg-white rounded-xl p-8 max-w-md w-full flex flex-col items-center justify-center">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center justify-center">
                                <p className="font-lato mb-4 text-center text-gray-800">Sei sicuro di voler eliminare {resourceToDelete.firstName} ?</p>
                                <div className="flex items-center justify-center mt-6">
                                    <button className="mb-4 font-lato flex items-center justify-center bg-gray-400 text-gray-800 px-4 py-1 rounded-lg ml-4" onClick={() => setIsDeleteModalOpen(false)}>
                                        <IconSvg name="xDelete" width={28} height={28}/> Annulla
                                    </button>
                                    <button className="mb-4 font-lato flex items-center justify-center bg-pink-500 text-white px-4 py-1 rounded-lg ml-4" onClick={() => deleteData(resourceToDelete.id!)}>
                                        <IconSvg name="tickTrue" width={32} height={32}/> Conferma
                                    </button>
                                </div>
                            </div>
                        </ModalDelete>
                    )}
                    <div className="overflow-auto h-full font-lato">
                        <ResourceTable
                            currentResources={currentResources as Resources[]}
                            handleModalOpen={handleModalOpen}
                            handleDeleteConfirmation={handleDeleteConfirmation}
                            isDarkMode={isDarkMode}
                        />
                    </div>      
                    <div>
                        <ResourcesModal 
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
                        <span className="mr-2 font-bold font-lato">di {Math.ceil(filteredResources.length / resourcesPerPage)}</span>
                        <div className="flex">
                            <button className="bg-gray-300 text-gray-800 px-2 py-1 mr-2 rounded-l-lg" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'◁'}</button>
                            <button className="bg-gray-300 text-gray-800 px-2 py-1 rounded-r-lg" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredResources.length / resourcesPerPage)}>{'▷'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Risorse;
