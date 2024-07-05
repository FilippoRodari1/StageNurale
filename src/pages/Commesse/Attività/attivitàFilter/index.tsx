import { ChangeEvent } from "react";

import ModalFiltri from "../../../../components/atoms/modal/modalFiltri";
import { Activities } from "../../../../store/attività/types";
import InputForm2 from "../../../../components/molecules/inputForm2";

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
                <h2 className="text-xl font-bold mb-2">Filtri</h2>
                <div className="">
                    <InputForm2
                        type="text"
                        name="jobId"
                        value={filterValues.commessa}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded" 
                        title={"Commessa"} 
                        placeholder={"Commessa"}                    
                    />
                </div>
                <div className="">
                    <InputForm2
                        type="text"
                        name="order"
                        value={filterValues.ordine}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded" 
                        title={"Ordine"} 
                        placeholder={"Ordine"}                    
                    />
                </div>
                <div className="">
                    <InputForm2
                        type="text"
                        name="resource"
                        value={filterValues.risorsa}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded" 
                        title={"Risorsa"} 
                        placeholder={"Risorsa"}                    
                    />
                </div>
                <div className="">
                    <InputForm2
                        type="text"
                        name="state"
                        value={filterValues.stato}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded" 
                        title={"Stato"} 
                        placeholder={"Stato"}                    
                    />
                </div>
                <div className="">
                    <InputForm2
                        type="date"
                        name="startDate"
                        value={filterValues.dataInizio}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded" 
                        title={"Data Inizio"} 
                        placeholder={"Data Inizio"}                    
                    />
                </div>
                <div className="">
                    <InputForm2
                        type="date"
                        name="endDate"
                        value={filterValues.dataFine}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded" 
                        title={"Data Fine"} 
                        placeholder={"Data Fine"}                    
                    />
                </div>
                <div className="justify-center text-center">
                        <button onClick={removeFilterSubmit} className={`text-xl font-bold font-lato py-1 px-2 rounded-lg mb-1 mr-4 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'}`}>Svuota Filtri</button>
                        <button onClick={handleFilterSubmit} className={`text-xl font-bold font-lato py-1 px-2 rounded-lg mb-1 ${darkMode ? 'bg-pink-500 text-white' : 'bg-pink-500 text-white'}`}>Applica</button>
                    </div>
                </div>
        </ModalFiltri>
    );
};

export default FilterModalAttivita;
