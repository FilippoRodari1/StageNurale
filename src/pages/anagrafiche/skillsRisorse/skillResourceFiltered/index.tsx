import { ChangeEvent } from "react";
import ModalFiltri from "../../../../components/atoms/modal/modalFiltri";
import { SkillResources } from "../../../../store/skillResource/types";
import InputForm2 from "../../../../components/molecules/inputForm2";

interface SkillResourceModalProps {
    open: boolean;
    onClose: () => void;
    skillResource: SkillResources[];
    filterValues: { skillResource: any; skill: string; level: number };
    handleFilterChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleFilterSubmit: () => void;
    removeFilterSubmit: () => void;
    darkMode: boolean;
}

const SkillRescourceFilter = ({
    open,
    filterValues,
    handleFilterChange,
    handleFilterSubmit,
    removeFilterSubmit,
    darkMode
}: SkillResourceModalProps) => {
    if (!open) return null;

    return (
        <ModalFiltri show={open} className={`fixed inset-0 flex items-center justify-center z-50 ${darkMode ? 'bg-opacity-50' : 'bg-opacity-50'}`}>
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Filtri</h2>
                <div className="mb-4">
                    <InputForm2
                        type="text"
                        name="skillResource"
                        value={filterValues.skillResource}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded" 
                        title={"Risorsa"} 
                        placeholder={"Risorsa"}                    
                        />
                </div>
                <div className="mb-4">
                    <InputForm2
                        type="text"
                        name="skill"
                        value={filterValues.skill}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded" 
                        title={"Skill"} 
                        placeholder={"Skill"}                    
                    />
                </div>
                <div className="mb-4">
                    <InputForm2
                        type="number"
                        name="level"
                        value={filterValues.level}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded" 
                        title={"Livello"} 
                        placeholder={"Livello"}                    
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

export default SkillRescourceFilter;
