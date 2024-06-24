import { ChangeEvent, useEffect, useState } from "react";
import { API, BASE, ORDERS, V1 } from "../../../utils/constants";
import { RootState, fetchOrders, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Orders } from "../../../store/orders/types";
import { zodResolver } from "@hookform/resolvers/zod";
import validationsSchema from "../../../validations";
import ErrorBar from "../../../components/molecules/errorBar";
import Navbar from "../../../components/molecules/navBar";
import IconSvg from "../../../components/iconsSvg";
import ModalDelete from "../../../components/atoms/modal/modalDelete";
import FilterModalOrders from "./filterModalOrders";
import OrderTable from "./ordersTable";
import OrderModal from "./ordersModal/commesseModal";
import { deleteOrders } from "../../../store/orders/order/deleteOrders";
import { createOrders } from "../../../store/orders/order/createOrders";

const URL_ORDERS = `${BASE}${API}${V1}${ORDERS}`;

const OrdersPage = () => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFilteredModalOpen, setIsFilteredModalOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<Orders | null>(null);
    const [filteredOrders, setFilteredOrders] = useState<Orders[]>([]);
    const [ricercaNome, setRicercaNome] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues, setFilterValues] = useState({ codice: '', cliente: '', descrizione: '' });
    const [isDarkMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState('');
    const ordersPerPage = 8;
    const dispatch = useAppDispatch();

    const methods = useForm<Orders>({ resolver: zodResolver(validationsSchema) });

    const orders = useSelector((state: RootState) => state.orders.data);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    useEffect(() => {
        const filtered = orders.filter((order: Orders) =>
            order.code.toLowerCase().includes(ricercaNome.toLowerCase())
        );
        setFilteredOrders(filtered);
    }, [ricercaNome, orders]);

    const handleSave = async (data: Orders) => {
        try {
            if (editingId !== null) {
                await updateData(editingId, { ...data, jobId: editingId });
            } else {
                await dispatch(createOrders(data));
            }
            handleModalClose();
            setRicercaNome('');
        } catch (error: any) {
            console.error("Error saving data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
        }
    };

    const handleDeleteConfirmation = (order: Orders) => {
        setOrderToDelete(order);
        setIsDeleteModalOpen(true);
    };

    const deleteData = async (id: number) => {
        try {
            await dispatch(deleteOrders(id));
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            console.error("Error deleting data:", error);
            setErrorMessage('È stato riscontrato un errore');
            setErrorDetails(`Dettagli tecnici dell'errore: ${error.message}`);
            setIsDeleteModalOpen(false);
            throw error;
        }
    };

    const updateData = async (id: number, updatedOrder: Orders) => {
        try {
            const response = await fetch(`${URL_ORDERS}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedOrder)
            });
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(fetchOrders());
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
            const order = orders.find((order: Orders) => order.jobId === id);
            if (order) {
                methods.reset(order);
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

        const filtered = orders.filter((order: Orders) => {
            const codiceMatch = filterValues.codice.trim().length === 0 || order.code.toLowerCase().includes(filterValues.codice.toLowerCase());
            const clienteMatch = filterValues.cliente.trim().length === 0 || order.description.toLowerCase().includes(filterValues.cliente.toLowerCase());
            const descrizioneMatch = filterValues.descrizione.trim().length === 0 || order.description.toLowerCase().includes(filterValues.descrizione.toLowerCase());
            return codiceMatch && clienteMatch && descrizioneMatch;
        });
        setFilteredOrders(filtered);
    };

    const removeFilterSubmit = () => {
        setFilterValues({ codice: '', cliente: '', descrizione: '' });
        setRicercaNome('');
        setIsFilteredModalOpen(false);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

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

            <Navbar name="Orders"/>

            <div className="w-full flex justify-between items-center mt-10 mb-1 mx-4">
                <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => handleModalOpen()}>+ Aggiungi nuovo </button>
                <div className="flex">
                    <input type="text" placeholder="Cerca ordine" className="px-12 py-1 border text-left border-gray-800 rounded-lg mb-2 mr-4" value={ricercaNome} onChange={handleRicercaNomeChange} />
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2 mr-4" onClick={handleFilterSubmit}>Cerca</button>
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" onClick={() => setIsFilteredModalOpen(true)}>Filtri</button>
                </div>
            </div>
            <div className="border-2 border-gray-400 rounded-lg w-full p-1 mx-4" style={{ height: 'calc(100% - 180px)' }}>
                <div className="overflow-auto h-full font-lato">
                    {isFilteredModalOpen && (
                        <FilterModalOrders
                            open={isFilteredModalOpen}
                            onClose={() => setIsFilteredModalOpen(false)}
                            orders={orders}
                            filterValues={filterValues}
                            handleFilterChange={handleFilterChange}
                            handleFilterSubmit={handleFilterSubmit}
                            removeFilterSubmit={removeFilterSubmit}
                            darkMode={isDarkMode}
                        />
                    )}
                    {isDeleteModalOpen && orderToDelete && (
                        <ModalDelete show={isDeleteModalOpen} onClick={() => setIsDeleteModalOpen(false)} className="bg-white rounded-xl p-8 max-w-md w-full flex flex-col items-center justify-center">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center justify-center">
                                <p className="font-lato mb-4 text-center text-gray-800">Sei sicuro di voler eliminare {orderToDelete.code} ?</p>
                                <div className="flex items-center justify-center mt-6">
                                    <button className="mb-4 font-lato flex items-center justify-center bg-gray-400 text-gray-800 px-4 py-1 rounded-lg ml-4" onClick={() => setIsDeleteModalOpen(false)}>
                                        <IconSvg name="xDelete" width={28} height={28}/> Annulla
                                    </button>
                                    <button className="mb-4 font-lato flex items-center justify-center bg-pink-500 text-white px-4 py-1 rounded-lg ml-4" onClick={() => deleteData(orderToDelete.jobId!)}>
                                        <IconSvg name="tickTrue" width={32} height={32}/> Conferma
                                    </button>
                                </div>
                            </div>
                        </ModalDelete>
                    )}
                    <div className="overflow-auto h-full font-lato">
                        <OrderTable
                            currentOrders={currentOrders}
                            handleModalOpen={handleModalOpen}
                            handleDeleteConfirmation={handleDeleteConfirmation}
                            isDarkMode={isDarkMode}
                        />
                    </div>      
                    <div>
                        <OrderModal 
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
                        <span className="mr-2 font-bold font-lato">di {Math.ceil(filteredOrders.length / ordersPerPage)}</span>
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

export default OrdersPage;
