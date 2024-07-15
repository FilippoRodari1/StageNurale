import { ChangeEvent } from "react";
import { Skills } from "../../../../store/skill/types";
import ModalFiltri from "../../../../components/atoms/modal/modalFiltri";


interface FilterModalProps {
    open: boolean;
    onClose: () => void;
    skills: Skills[];
    filterValues: {
        name: string;
        skillType: string; 
        note: string;
    };
    handleFilterChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    handleFilterSubmit: () => void;
    removeFilterSubmit: () => void;
    darkMode: boolean;
}

const SkillFilter = ({ open, onClose, skills , filterValues, handleFilterChange, handleFilterSubmit, removeFilterSubmit, darkMode }: FilterModalProps) => {
    return (
        <ModalFiltri show={open} className={`fixed inset-0 flex items-center justify-center z-50 ${darkMode ? 'bg-opacity-50' : 'bg-opacity-50'}`}>
            <div className={`rounded-xl max-w-md w-full flex-col items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`rounded-lg p-6 max-w-md w-full flex flex-col mb-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex justify-between text-center mt-2">
                        <p className={`font-bold font-lato text-left ${darkMode ? 'text-white' : 'text-black'}`}>Filtri</p>
                        <button onClick={onClose} className={`font-bold font-lato py-1 px-2 rounded-lg mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>X</button>
                    </div>
                    <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />
                    <p className={`font-bold font-lato mt-4 mb-2 text-left ${darkMode ? 'text-white' : 'text-black'}`}>Tipo di skill</p>
                    <select name="typeOfSkill" value={filterValues.skillType} onChange={handleFilterChange} className={`px-4 py-2 border rounded-lg mb-2 w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'}`}>
                        <option value="">Tipo di skill</option>
                        {[...new Set(skills?.map((skills) => skills.skillType))].map((skillType) => (
                            <option key={skillType} value={skillType}>{skillType}</option>
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

export default SkillFilter;



