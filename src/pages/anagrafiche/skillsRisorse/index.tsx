import { ChangeEvent, useEffect, useState } from "react";
import { API, BASE, SKILLSRISORSE, V1 } from "../../../utils/constants";
import { RootState, fetchSkillResource, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationsSchemaResource } from "../../../validations";
import ErrorBar from "../../../components/molecules/errorBar";
import Navbar from "../../../components/molecules/navBar";
import IconSvg from "../../../components/iconsSvg";
import ModalDelete from "../../../components/atoms/modal/modalDelete";
import SkillResourceTable from "./skillResourceTable";
import SkillResourcesModal from "./skillResourceModal";
import { fetchResources } from "../../../store/resources/actions/fetchResources";
import { SkillResources } from "../../../store/skillResource/types";
import { createSkillResources } from "../../../store/skillResource/skillResource/createSkillResource";
import { deleteSkillResources } from "../../../store/skillResource/skillResource/deleteSkillResouces";
import SkillRescourceFilter from "./skillResourceFiltered";

const URL_SKILLRESOURCES = `${BASE}${API}${V1}${SKILLSRISORSE}`;

const SkillRisorse = () => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFilteredModalOpen, setIsFilteredModalOpen] = useState(false);
    const [resourceToDelete, setResourceToDelete] = useState<SkillResources| null>(null);
    const [filteredResources, setFilteredResources] = useState<SkillResources[]>([]);
    const [ricercaNome, setRicercaNome] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues, setFilterValues] = useState({ skillResource: '', skill: '', level: 0});
    const [isDarkMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState('');
    const resourcesPerPage = 8;
    const dispatch = useAppDispatch();

    const methods = useForm<SkillResources>({ resolver: zodResolver(validationsSchemaResource) });

    const skillResources = useSelector((state: RootState) => state.skillResource.data);

    const filteredResourcesList = skillResources.filter((resource: { resource: { name: string; }; }) =>
        resource.resource.name.toLowerCase().includes(ricercaNome.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetchSkillResource());
    }, [dispatch]);

    const handleSave = async (data: SkillResources) => {
        try {
            if (editingId !== null) {
                await updateData(editingId, { ...data, resourceId: editingId });
            } else {
                await dispatch(createSkillResources(data));
            }
            handleModalClose();
        } catch (error: any) {
            console.error("Error saving data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };    
    
    const handleDeleteConfirmation = (resource: SkillResources) => {
        setResourceToDelete(resource);
        setIsDeleteModalOpen(true);
    };

    const deleteData = async (id: number) => {
        try {
            await dispatch(deleteSkillResources(id));
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            console.error("Error deleting data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
            setIsDeleteModalOpen(false);
            throw error;
        }
    };

    const updateData = async (id: number, updatedResource: SkillResources) => {
        try {
            const response = await fetch(`${URL_SKILLRESOURCES}/${id}`, {
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
            const resource = skillResources.find((resource: SkillResources) => resource.resourceId === id);
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

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = event.target;
        setFilterValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilterSubmit = () => {
        setIsFilteredModalOpen(false);
    
        const filtered = skillResources.filter((resource) => {
            const fornitoreMatch = filterValues.skillResource.trim().length === 0 || resource.resource.name.toLowerCase().includes(filterValues.skillResource.toLowerCase());
            return fornitoreMatch;
        });
        setFilteredResources(filtered as unknown as SkillResources[]);
    };
    
    const removeFilterSubmit = () => {
        setFilterValues({ skillResource: '', skill: '', level: 0 });
        setRicercaNome('');
        setIsFilteredModalOpen(false);
    };

    useEffect(() => {
        return setFilteredResources(filteredResourcesList);
    }, [skillResources, ricercaNome]);

    const indexOfLastResource = currentPage * resourcesPerPage;
    const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
    const currentSkillResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);

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

            <Navbar name="Skills delle Risorse"/>

            <div className="w-full flex justify-between items-center mt-10 mb-1 mx-4">
                <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => handleModalOpen()}>+ Aggiungi nuovo </button>
                <div className="flex">
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => setIsFilteredModalOpen(true)}>Filtri</button>
                </div>
            </div>
            <div className="border-2 border-gray-400 rounded-lg w-full p-1 mx-4" style={{ height: 'calc(100% - 180px)' }}>
                <div className="overflow-auto h-full font-lato">
                {isFilteredModalOpen && (
                    <SkillRescourceFilter
                            open={isFilteredModalOpen}
                            onClose={() => setIsFilteredModalOpen(false)}
                            filterValues={filterValues}
                            handleFilterChange={handleFilterChange}
                            handleFilterSubmit={handleFilterSubmit}
                            removeFilterSubmit={removeFilterSubmit}
                            darkMode={isDarkMode} 
                            skillResource={[]}                    
                    />
                )}
                    {isDeleteModalOpen && resourceToDelete && (
                        <ModalDelete show={isDeleteModalOpen} onClick={() => setIsDeleteModalOpen(false)} className="bg-white rounded-xl p-8 max-w-md w-full flex flex-col items-center justify-center">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center justify-center">
                                <p className="font-lato mb-4 text-center text-gray-800">Sei sicuro di voler eliminare {resourceToDelete.skillResource.resource.name} ?</p>
                                <div className="flex items-center justify-center mt-6">
                                    <button className="mb-4 font-lato flex items-center justify-center bg-gray-400 text-gray-800 px-4 py-1 rounded-lg ml-4" onClick={() => setIsDeleteModalOpen(false)}>
                                        <IconSvg name="xDelete" width={28} height={28}/> Annulla
                                    </button>
                                    <button className="mb-4 font-lato flex items-center justify-center bg-pink-500 text-white px-4 py-1 rounded-lg ml-4" onClick={() => deleteData(resourceToDelete.resourceId!)}>
                                        <IconSvg name="tickTrue" width={32} height={32}/> Conferma
                                    </button>
                                </div>
                            </div>
                        </ModalDelete>
                    )}
                    <div className="overflow-auto h-full font-lato">
                        <SkillResourceTable
                            currentSkillResource={currentSkillResources as SkillResources[]}
                            handleModalOpen={handleModalOpen}
                            handleDeleteConfirmation={handleDeleteConfirmation}
                            isDarkMode={isDarkMode}
                        />
                    </div>      
                    <div>
                        <SkillResourcesModal
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

export default SkillRisorse;
