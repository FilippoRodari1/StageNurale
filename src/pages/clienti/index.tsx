import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { zodResolver } from '@hookform/resolvers/zod';
import { validationsSchema } from "../../validations";

import FilterModal from "../../components/atoms/modal/filterModal";
import CustomerTable from "../../components/atoms/table/customersTable";
import CustomersModal from "../../components/atoms/modal/customersModal";
import ErrorBar from "../../components/molecules/errorBar";
import IconSvg from "../../components/iconsSvg";

import { Customers } from "../../store/customers/types";

import ModalDelete from "../../components/atoms/modal/modalDelete";

import { RootState, fetchCustomers, useAppDispatch } from "../../store";
import { createCustomers } from "../../store/customer/actions/createCustomer";
import { deleteCustomers } from "../../store/customer/actions/deleteCustomer";
import Navbar from "../../components/molecules/navBar";
import { updateCustomer } from "../../store/customer/updateCustomer";



const Clienti = () => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [viewingUserId, setViewingUserId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFilteredModalOpen, setIsFilteredModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<Customers | null>(null);
    const [filteredCustomers, setFilteredCustomers] = useState<Customers[]>([]);
    const [ricercaNome, setRicercaNome] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues, setFilterValues] = useState({ name: '', typeOfPayment: '', note: ''});
    const [isDarkMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState('');
    const customersPerPage = 8;
    const dispatch = useAppDispatch();

    const methods = useForm<Customers>({ resolver: zodResolver(validationsSchema) });

    const customers = useSelector((state: RootState) => state.customers.data);

    const filteredClients = customers.filter((customer) =>
        customer.name.toLowerCase().includes(ricercaNome.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);


    const handleSave = async (data: Customers) => {
        try {
            if (editingId !== null) {
                await updateData(editingId, { ...data, id: editingId });
            } else {
                await dispatch(createCustomers(data));
            }
            handleModalClose();
            setRicercaNome('');
        } catch (error: any) {
            console.error("Error saving data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };

    const handleDeleteConfirmation = (customer: Customers) => {
        setCustomerToDelete(customer);
        setIsDeleteModalOpen(true);
    };
    

    const deleteData = async (id: number) => {
        try {
            await dispatch(deleteCustomers(id));
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            console.error("Error deleting data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
            setIsDeleteModalOpen(false);
            throw error;
        }
    };

    const updateData = async (id: number, updatedCustomer: Customers) => {
        try {
            await dispatch(updateCustomer({ id, updatedCustomer }));
        } catch (error: any) {
            console.error("Error updating data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };
    
    const handleModalOpen = (id?: number) => {
        if (id) {
            const customer = customers.find(user => user.id === id);
            if (customer) {
                methods.reset(customer);
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
    
        const filtered = customers.filter((customer) => {
            const nameMatch = filterValues.name.trim().length === 0 || customer.name.toLowerCase().includes(filterValues.name.toLowerCase());
            const paymentTypeMatch = filterValues.typeOfPayment.trim().length === 0;
            const notesMatch = filterValues.note.trim().length === 0 || customer.note.toLowerCase().includes(filterValues.note.toLowerCase());
            return nameMatch && paymentTypeMatch && notesMatch;
        });
        setFilteredCustomers(filtered as Customers[]);
    };

    const removeFilterSubmit = () => {
        setFilterValues({ name: '', typeOfPayment: '', note: ''});
        setRicercaNome('');
        setIsFilteredModalOpen(false);
    };

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredClients.slice(indexOfFirstCustomer, indexOfLastCustomer);
 
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

            <Navbar name="Clienti"/>

            <div className="w-full flex justify-between items-center mt-10 mb-1 mx-4">
                <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => handleModalOpen()}>+ Aggiungi nuovo </button>
                <div className="flex">
                    <input type="text" placeholder="Cerca cliente" className="px-12 py-1 border text-left border-gray-800 rounded-lg mb-2 mr-4" value={ricercaNome} onChange={handleRicercaNomeChange} />
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2 mr-4" onClick={handleFilterSubmit}>Cerca</button>
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => setIsFilteredModalOpen(true)}>Filtri</button>
                </div>
            </div>
            <div className="border-2 border-gray-400 rounded-lg w-full p-1 mx-4" style={{ height: 'calc(100% - 180px)' }}>
                <div className="overflow-auto h-full font-lato">
                    {isFilteredModalOpen && (
                        <FilterModal
                            open={isFilteredModalOpen}
                            onClose={() => setIsFilteredModalOpen(false)}
                            customers={customers as Customers[]}
                            filterValues={filterValues}
                            handleFilterChange={handleFilterChange}
                            handleFilterSubmit={handleFilterSubmit}
                            removeFilterSubmit={removeFilterSubmit}
                            darkMode={isDarkMode}
                        />
                    )}

                    {isDeleteModalOpen && customerToDelete && (
                        <ModalDelete show={isDeleteModalOpen} onClick={() => setIsDeleteModalOpen(false)} className="bg-white rounded-xl p-8 max-w-md w-full flex flex-col items-center justify-center">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center justify-center">
                                <p className="font-lato mb-4 text-center text-gray-800">Sei sicuro di voler eliminare {customerToDelete.name} ?</p>
                                <div className="flex items-center justify-center mt-6">
                                    <button className="mb-4 font-lato flex items-center justify-center bg-gray-400 text-gray-800 px-4 py-1 rounded-lg ml-4" onClick={() => setIsDeleteModalOpen(false)}>
                                    <IconSvg name="xDelete" width={28} height={28}/> Annulla
                                    </button>
                                    <button className="mb-4 font-lato flex items-center justify-center bg-pink-500 text-white px-4 py-1 rounded-lg ml-4" onClick={() => deleteData(customerToDelete.id!)}>
                                    <IconSvg name="tickTrue" width={32} height={32}/> Conferma
                                    </button>
                                </div>
                            </div>
                        </ModalDelete>
                    )}

                    <div className="overflow-auto h-full font-lato">
                        <CustomerTable
                            currentCustomers={currentCustomers as Customers[]}
                            setViewingUserId={setViewingUserId}
                            handleModalOpen={handleModalOpen}
                            handleDeleteConfirmation={handleDeleteConfirmation}
                            isDarkMode={isDarkMode}
                        />
                    </div> 
                         
                    <div>
                        <CustomersModal 
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
                        <span className="mr-2 font-bold font-lato">di {Math.ceil(filteredCustomers.length / customersPerPage)}</span>
                        <div className="flex">
                            <button className="bg-gray-300 text-gray-800 px-2 py-1 mr-2 rounded-l-lg" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'◁'}</button>
                            <button className="bg-gray-300 text-gray-800 px-2 py-1 rounded-r-lg" onClick={() => paginate(currentPage + 1)} >{'▷'}</button>
                        </div>
                    </div>
                </div>
                {viewingUserId && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-4 text-center text-black">Attributi Utente</h2>
                            <p className="text-center text-black">Nome: {customers.find(customer => customer.id === viewingUserId)?.name}</p>
                            <p className="text-center text-black">Tipo di pagamento: {customers.find(customer => customer.id === viewingUserId)?.typeOfPaymentId}</p>
                            <p className="text-center text-black">Note: {customers.find(customer => customer.id === viewingUserId)?.note}</p>
                            <button className="bg-pink-500 text-white px-4 py-2 rounded-lg mt-4 ml-40" onClick={() => setViewingUserId(null)}>Chiudi</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Clienti;
