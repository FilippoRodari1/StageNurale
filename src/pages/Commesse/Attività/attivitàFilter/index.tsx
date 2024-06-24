import { ChangeEvent } from "react";

import ModalFiltri from "../../../../components/atoms/modal/modalFiltri";
import { Activities } from "../../../../store/attività/types";

interface FilterModalProps {
    open: boolean;
    onClose: () => void;
    attivita: Activities[];
    filterValues: {
        commessa: string;
        ordine: string;
        risorsa: string;
        stato: string;
        dataInizio: string;
        dataFine: string;
    };
    handleFilterChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleFilterSubmit: () => void;
    removeFilterSubmit: () => void;
    darkMode: boolean;
}

const FilterModalAttivita = ({
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
                <h2 className="text-xl font-bold mb-4">Filtri Attività</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Commessa</label>
                    <input
                        type="text"
                        name="commessa"
                        value={filterValues.commessa}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Ordine</label>
                    <input
                        type="text"
                        name="ordine"
                        value={filterValues.ordine}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Risorsa</label>
                    <input
                        type="text"
                        name="risorsa"
                        value={filterValues.risorsa}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Stato</label>
                    <input
                        type="text"
                        name="stato"
                        value={filterValues.stato}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Data Inizio</label>
                    <input
                        type="date"
                        name="dataInizio"
                        value={filterValues.dataInizio}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Data Fine</label>
                    <input
                        type="date"
                        name="dataFine"
                        value={filterValues.dataFine}
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

export default FilterModalAttivita;
