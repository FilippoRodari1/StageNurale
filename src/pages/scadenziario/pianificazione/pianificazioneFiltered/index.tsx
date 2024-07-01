import { ChangeEvent } from "react";
import ModalFiltri from "../../../../components/atoms/modal/modalFiltri";
import { Pianificazione } from "../../../../store/pianificazione/types";

interface PianificazioneFilterModalProps {
    open: boolean;
    pianificazione: Pianificazione[];
    onClose: () => void;
    handleFilterChange: (event: ChangeEvent<HTMLSelectElement> | string) => void;
    handleFilterSubmit: () => void;
    removeFilterSubmit: () => void;
    darkMode: boolean;
    filterValues: {
        valueCategory: string | null;
        isSale: string | null;

    };
}

const PianificazioneFilterModal = ({
    open,
    pianificazione,
    onClose,
    handleFilterChange,
    handleFilterSubmit,
    removeFilterSubmit,
    darkMode,
    filterValues
}: PianificazioneFilterModalProps) => {
    const uniqueCategories = [...new Set(pianificazione.map(item => item.valueCategory))];

    return (
        <ModalFiltri show={open} className={`fixed inset-0 flex items-center justify-center z-50 ${darkMode ? 'bg-opacity-50' : 'bg-opacity-50'}`}>
            <div className={`rounded-xl max-w-md w-full flex-col items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`rounded-lg p-6 max-w-md w-full flex flex-col mb-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex justify-between text-center mt-2">
                        <p className={`font-bold font-lato text-left ${darkMode ? 'text-white' : 'text-black'}`}>Filtri</p>
                        <button onClick={onClose} className={`font-bold font-lato py-1 px-2 rounded-lg mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>X</button>
                    </div>
                    <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />
                    <p className={`font-bold font-lato mt-4 mb-2 text-left ${darkMode ? 'text-white' : 'text-black'}`}>Categoria</p>
                    <select
                        name="valueCategory"
                        value={filterValues.valueCategory || ''}
                        onChange={(event) => handleFilterChange(event)}
                        className={`px-4 py-2 border rounded-lg mb-2 w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'}`}
                    >
                        <option value="">Seleziona categoria</option>
                        {uniqueCategories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <div className="mb-4">
                        <label className={`block mb-2 font-bold font-lato ${darkMode ? 'text-white' : 'text-black'}`}>
                            Vendita
                        </label>
                        <div className="flex space-x-4">
                            <button
                                className={`px-6 py-2 rounded-lg ${filterValues.isSale === 'all' ? 'bg-pink-500 text-white' : 'bg-gray-300 text-black'}`}
                                onClick={() => handleFilterChange('all')}
                            >
                                Tutti
                            </button>
                            <button
                                className={`px-6 py-2 rounded-lg ${filterValues.isSale === 'yes' ? 'bg-pink-500 text-white' : 'bg-gray-300 text-black'}`}
                                onClick={() => handleFilterChange('yes')}
                            >
                                Si
                            </button>
                            <button
                                className={`px-6 py-2 rounded-lg ${filterValues.isSale === 'no' ? 'bg-pink-500 text-white' : 'bg-gray-300 text-black'}`}
                                onClick={() => handleFilterChange('no')}
                            >
                                No
                            </button>
                        </div>
                    </div>
                    <div className="justify-center text-center mt-2">
                        <button onClick={removeFilterSubmit} className={`text-xl font-bold font-lato py-1 px-2 rounded-lg mb-1 mr-4 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'}`}>Svuota Filtri</button>
                        <button onClick={handleFilterSubmit} className={`text-xl font-bold font-lato py-1 px-2 rounded-lg mb-1 ${darkMode ? 'bg-pink-500 text-white' : 'bg-pink-500 text-white'}`}>Applica</button>
                    </div>
                </div>
            </div>
        </ModalFiltri>
    );
};

export default PianificazioneFilterModal;
