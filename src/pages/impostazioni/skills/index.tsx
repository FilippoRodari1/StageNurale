import { ChangeEvent, useEffect, useState } from "react";
import { API, BASE, SKILLS, V1 } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ErrorBar from "../../../components/molecules/errorBar";
import Navbar from "../../../components/molecules/navBar";
import IconSvg from "../../../components/iconsSvg";
import ModalDelete from "../../../components/atoms/modal/modalDelete";
import { validationsSchemaSkills } from "../../../validations";
import { Skills } from "../../../store/skill/types";
import { fetchSkill, getSkillData } from "../../../store/skill";
import { createSkill } from "../../../store/skill/operations/createSkill";
import { deleteSkill } from "../../../store/skill/operations/deleteSkill";
import SkillFilter from "./skillFiltered";
import SkillTable from "./skillTable";
import SkillModal from "./skillModal";
import { useAppDispatch } from "../../../store";


const URL_SKILLS = `${BASE}${API}${V1}${SKILLS}`;

const SkillsPage = () => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFilteredModalOpen, setIsFilteredModalOpen] = useState(false);
    const [supplierToDelete, setSupplierToDelete] = useState<Skills | null>(null);
    const [_, setFilteredSuppliers] = useState<Skills[]>([]);
    const [ricercaNome, setRicercaNome] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues, setFilterValues] = useState({ name: '', skillType: '', note: ''});
    const [isDarkMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState('');
    const skillsPerPage = 8;
    const dispatch = useAppDispatch();

    const methods = useForm<Skills>({ resolver: zodResolver(validationsSchemaSkills) });

    const skills = useSelector(getSkillData);

    const filteredSkills = skills.filter((skills: { name: string; }) =>
        skills.name.toLowerCase().includes(ricercaNome.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetchSkill());
    }, [dispatch]);

    const handleSave = async (data: Skills) => {
        try {
            if (editingId !== null) {
                await updateData(editingId, { ...data, id: editingId });
            } else {
                await dispatch(createSkill(data));
            }
            handleModalClose();
            setRicercaNome('');
        } catch (error: any) {
            console.error("Error saving data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };

    const handleDeleteConfirmation = (supplier: Skills) => {
        setSupplierToDelete(supplier);
        setIsDeleteModalOpen(true);
    };

    const deleteData = async (id: number) => {
        try {
            await dispatch(deleteSkill(id));
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            console.error("Error deleting data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
            setIsDeleteModalOpen(false);
            throw error;
        }
    };

    const updateData = async (id: number, updatedSupplier: Skills) => {
        try {
            const response = await fetch(`${URL_SKILLS}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedSupplier)
            });
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(fetchSkill());
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
            const skill = skills.find((skills: { id: number; }) => skills.id === id);
            if (skill) {
                methods.reset(skill);
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
        const searchTerm = event.target.value;
        setRicercaNome(searchTerm);
    };

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilterValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilterSubmit = () => {
        setIsFilteredModalOpen(false);

        const filtered = skills.filter((supplier: { name: string; note: string; }) => {
            const nameMatch = filterValues.name.trim().length === 0 || supplier.name.toLowerCase().includes(filterValues.name.toLowerCase());
            const paymentTypeMatch = filterValues.skillType.trim().length === 0;
            const notesMatch = filterValues.note.trim().length === 0 || supplier.note.toLowerCase().includes(filterValues.note.toLowerCase());
            return nameMatch && paymentTypeMatch && notesMatch;
        });
        setFilteredSuppliers(filtered as Skills[]);
    };

    const removeFilterSubmit = () => {
        setFilterValues({ name: '', skillType: '', note: ''});
        setRicercaNome('');
        setIsFilteredModalOpen(false);
    };

    const indexOfLastSkill = currentPage * skillsPerPage;
    const indexOfFirstSupplier = indexOfLastSkill - skillsPerPage;
    const currentSkill = filteredSkills.slice(indexOfFirstSupplier, indexOfLastSkill);

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

            <Navbar name="Skills"/>

            <div className="w-full flex justify-between items-center mt-10 mb-1 mx-4">
                <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => handleModalOpen()}>+ Aggiungi nuovo </button>
                <div className="flex">
                    <input type="text" placeholder="Cerca skill" className="px-12 py-1 border text-left border-gray-800 rounded-lg mb-2 mr-4" value={ricercaNome} onChange={handleRicercaNomeChange} />
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2 mr-4" onClick={handleFilterSubmit}>Cerca</button>
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => setIsFilteredModalOpen(true)}>Filtri</button>
                </div>
            </div>
            <div className="border-2 border-gray-400 rounded-lg w-full p-1 mx-4 mt-3" style={{ height: 'calc(100% - 180px)' }}>
                <div className="overflow-auto h-full font-lato">
                    {isFilteredModalOpen && (
                        <SkillFilter
                            open={isFilteredModalOpen}
                            onClose={() => setIsFilteredModalOpen(false)}
                            skills={skills as Skills[]}
                            filterValues={filterValues}
                            handleFilterChange={handleFilterChange}
                            handleFilterSubmit={handleFilterSubmit}
                            removeFilterSubmit={removeFilterSubmit}
                            darkMode={isDarkMode}
                        />
                    )}
                    {isDeleteModalOpen && supplierToDelete && (
                        <ModalDelete show={isDeleteModalOpen} onClick={() => setIsDeleteModalOpen(false)} className="bg-white rounded-xl p-8 max-w-md w-full flex flex-col items-center justify-center">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center justify-center">
                                <p className="font-lato mb-4 text-center text-gray-800">Sei sicuro di voler eliminare {supplierToDelete.name} ?</p>
                                <div className="flex items-center justify-center mt-6">
                                    <button className="mb-4 font-lato flex items-center justify-center bg-gray-400 text-gray-800 px-4 py-1 rounded-lg ml-4" onClick={() => setIsDeleteModalOpen(false)}>
                                        <IconSvg name="xDelete" width={28} height={28}/> Annulla
                                    </button>
                                    <button className="mb-4 font-lato flex items-center justify-center bg-pink-500 text-white px-4 py-1 rounded-lg ml-4" onClick={() => deleteData(supplierToDelete.id!)}>
                                        <IconSvg name="tickTrue" width={32} height={32}/> Conferma
                                    </button>
                                </div>
                            </div>
                        </ModalDelete>
                    )}
                    <div className="overflow-auto h-full font-lato">
                        <SkillTable
                            currentSkills={currentSkill as Skills[]}
                            handleModalOpen={handleModalOpen}
                            handleDeleteConfirmation={handleDeleteConfirmation}
                            isDarkMode={isDarkMode}
                        />
                    </div>      
                    <div>
                        <SkillModal 
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
                        <span className="mr-2 font-bold font-lato">di {Math.ceil(filteredSkills.length / skillsPerPage)}</span>
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

export default SkillsPage;
