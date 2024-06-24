import { ChangeEvent } from "react";
import ModalFiltri from "../../../../components/atoms/modal/modalFiltri";
import { SkillResources } from "../../../../store/skillResource/types";

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
                    <label className="block text-gray-700 mb-2">Risorsa</label>
                    <input
                        type="text"
                        name="skillResource"
                        value={filterValues.skillResource}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Skill</label>
                    <input
                        type="text"
                        name="skill"
                        value={filterValues.skill}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Livello</label>
                    <input
                        type="number"
                        name="level"
                        value={filterValues.level}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={removeFilterSubmit}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                    >
                        Svuota Filtri
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

export default SkillRescourceFilter;
