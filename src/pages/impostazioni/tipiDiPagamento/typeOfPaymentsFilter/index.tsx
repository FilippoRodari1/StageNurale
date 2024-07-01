import ModalFiltri from "../../../../components/atoms/modal/modalFiltri";

interface TypeOfPaymentsFilterProps {
    open: boolean;
    onClose: () => void;
    filterValues: { movePaymentsToTheEndOfMonth: string };
    handleFilterChange: (value: string) => void;
    handleFilterSubmit: () => void;
    removeFilterSubmit: () => void;
    darkMode: boolean;
}

const TypeOfPaymentsFilter = ({
    open,
    filterValues,
    handleFilterChange,
    handleFilterSubmit,
    removeFilterSubmit,
    darkMode
}: TypeOfPaymentsFilterProps) => {
    if (!open) return null;

    return (
        <ModalFiltri show={open} className={`fixed inset-0 flex items-center justify-center z-50 ${darkMode ? 'bg-opacity-0' : 'bg-opacity-50'}`}>
            <div className={`bg-white rounded-lg p-6 max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Filtri</h2>
                <div className="mb-4">
                    <label className={`block mb-2 font-lato ${darkMode ? 'text-white' : 'text-black'}`}>
                        Pagamenti alla fine del mese
                    </label>
                    <div className="flex space-x-4">
                        <button
                            className={`px-4 py-2 rounded-lg ${filterValues.movePaymentsToTheEndOfMonth === 'all' ? ' rounded-lg bg-pink-500 text-white' : ' text-black'}`}
                            onClick={() => handleFilterChange('all')}
                        >
                            Tutti
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${filterValues.movePaymentsToTheEndOfMonth === 'yes' ? ' rounded-lg bg-pink-500 text-white' : 'bg-gray-300 text-black'}`}
                            onClick={() => handleFilterChange('yes')}
                        >
                            Si
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${filterValues.movePaymentsToTheEndOfMonth === 'no' ? 'rounded-lg bg-pink-500 text-white' : 'bg-gray-300 text-black'}`}
                            onClick={() => handleFilterChange('no')}
                        >
                            No
                        </button>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <button onClick={removeFilterSubmit} className={`text-xl font-bold font-lato py-1 px-2 rounded-lg mb-1 mr-4 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'}`}>Svuota Filtri</button>
                        <button onClick={handleFilterSubmit} className={`text-xl font-bold font-lato py-1 px-2 rounded-lg mb-1 ${darkMode ? 'bg-pink-500 text-white' : 'bg-pink-500 text-white'}`}>Applica</button>
                </div>
            </div>
        </ModalFiltri>
    );
};

export default TypeOfPaymentsFilter;
