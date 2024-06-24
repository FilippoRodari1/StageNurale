import { ChangeEvent } from "react";
import { Orders } from "../../../../store/orders/types";
import ModalFiltri from "../../../../components/atoms/modal/modalFiltri";


interface FilterModalProps {
    open: boolean;
    onClose: () => void;
    orders: Orders[];
    filterValues: { codice: string; cliente: string; descrizione: string };
    handleFilterChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleFilterSubmit: () => void;
    removeFilterSubmit: () => void;
    darkMode: boolean;
}

const FilterModalOrders = ({
    open,
    filterValues,
    handleFilterChange,
    handleFilterSubmit,
    removeFilterSubmit,
    darkMode
}: FilterModalProps) => {
    if (!open) return null;

    return (
        <ModalFiltri show={open} className={`fixed inset-0 flex items-center justify-center z-50 ${darkMode ? 'bg-opacity-50' : 'bg-opacity-50'}`}>
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Filtri</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Codice</label>
                    <input
                        type="text"
                        name="codice"
                        value={filterValues.codice}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Cliente</label>
                    <input
                        type="text"
                        name="cliente"
                        value={filterValues.cliente}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Descrizione</label>
                    <input
                        type="text"
                        name="descrizione"
                        value={filterValues.descrizione}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={removeFilterSubmit}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                    >
                        Rimuovi Filtri
                    </button>
                    <button
                        onClick={handleFilterSubmit}
                        className="bg-pink-500 text-white px-4 py-2 rounded"
                    >
                        Applica Filtri
                    </button>
                </div>
            </div>
        </ModalFiltri>
    );
};

export default FilterModalOrders;
