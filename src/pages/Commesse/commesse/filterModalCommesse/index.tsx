import { ChangeEvent } from "react";
import { Jobs } from "../../../../store/commesse/types";
import ModalFiltri from "../../../../components/atoms/modal/modalFiltri";
import InputForm2 from "../../../../components/molecules/inputForm2";

interface FilterModalProps {
    open: boolean;
    onClose: () => void;
    commesse: Jobs[];
    filterValues: { codice: string; cliente: string; descrizione: string };
    handleFilterChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleFilterSubmit: () => void;
    removeFilterSubmit: () => void;
    darkMode: boolean;
}

const FilterModalCommesse = ({
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
                    <InputForm2
                        type="text"
                        name="code"
                        value={filterValues.codice}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded" 
                        title={"Codice"} 
                        placeholder={"Codice"}                    
                    />
                </div>
                <div className="mb-4">
                    <InputForm2
                        type="text"
                        name="cliente"
                        value={filterValues.cliente}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded" 
                        title={"Cliente"} 
                        placeholder={"Cliente"}                    
                    />
                </div>
                <div className="mb-4">
                    <InputForm2
                        type="text"
                        name="descrizione"
                        value={filterValues.descrizione}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded" 
                        title={"Descrizione"} 
                        placeholder={"Descrizione"}                    
                    />
                </div>
                <div className="justify-center text-center mt-2">
                        <button onClick={removeFilterSubmit} className={`text-xl font-bold font-lato py-1 px-2 rounded-lg mb-1 mr-4 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'}`}>Svuota Filtri</button>
                        <button onClick={handleFilterSubmit} className={`text-xl font-bold font-lato py-1 px-2 rounded-lg mb-1 ${darkMode ? 'bg-pink-500 text-white' : 'bg-pink-500 text-white'}`}>Applica</button>
                    </div>
                </div>
        </ModalFiltri>
    );
};

export default FilterModalCommesse;
