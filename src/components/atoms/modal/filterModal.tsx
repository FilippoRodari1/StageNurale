import { ChangeEvent } from "react";
import ModalFiltri from "./modalFiltri";
import { Customers } from "../../../store/customers/types";
import { Suppliers } from "../../../store/suppliers/types";
import { Resources } from "../../../store/resources/types";
import { SkillResources } from "../../../store/skillResource/types";

interface FilterModalProps {
    open: boolean;
    onClose: () => void;
    customers?: Customers[];
    suppliers?: Suppliers[];
    resources? : Resources[];
    skillResources? : SkillResources[];
    filterValues: {
        name: string;
        typeOfPayment: string; 
        note: string;
    };
    handleFilterChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    handleFilterSubmit: () => void;
    removeFilterSubmit: () => void;
    darkMode: boolean;
}

const FilterModal = ({ open, onClose, customers, filterValues, handleFilterChange, handleFilterSubmit, removeFilterSubmit, darkMode }: FilterModalProps) => {
    return (
        <ModalFiltri show={open} className={`fixed inset-0 flex items-center justify-center z-50 ${darkMode ? 'bg-opacity-50' : 'bg-opacity-50'}`}>
            <div className={`rounded-xl max-w-md w-full flex-col items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`rounded-lg p-6 max-w-md w-full flex flex-col mb-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex justify-between text-center mt-2">
                        <p className={`font-bold font-lato text-left ${darkMode ? 'text-white' : 'text-black'}`}>Filtri</p>
                        <button onClick={onClose} className={`font-bold font-lato py-1 px-2 rounded-lg mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>X</button>
                    </div>
                    <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />
                    <p className={`font-bold font-lato mt-4 mb-2 text-left ${darkMode ? 'text-white' : 'text-black'}`}>Tipo di pagamento</p>
                    <select name="typeOfPayment" value={filterValues.typeOfPayment} onChange={handleFilterChange} className={`px-4 py-2 border rounded-lg mb-2 w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'}`}>
                        <option value="">Tipo di pagamento</option>
                        {[...new Set(customers?.map((customer) => customer.typeOfPayment.name))].map((paymentType) => (
                            <option key={paymentType} value={paymentType}>{paymentType}</option>
                        ))}
                       
                    </select>
                    <div className="justify-center text-center mt-2">
                        <button onClick={removeFilterSubmit} className={`text-xl font-bold font-lato py-1 px-2 rounded-lg mb-1 mr-4 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'}`}>Svuota Filtri</button>
                        <button onClick={handleFilterSubmit} className={`text-xl font-bold font-lato py-1 px-2 rounded-lg mb-1 ${darkMode ? 'bg-pink-500 text-white' : 'bg-pink-500 text-white'}`}>Applica</button>
                    </div>
                </div>
            </div>
        </ModalFiltri>
    );
}

export default FilterModal;



