import { ChangeEvent } from "react";
import ModalFiltri from "../../../../components/atoms/modal/modalFiltri";
import { Timesheet } from "../../../../store/timesheet/types";

interface TimesheetFilterModalProps {
    open: boolean;
    timesheets: Timesheet[];
    onClose: () => void;
    handleFilterChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement> | string) => void;
    handleFilterSubmit: () => void;
    removeFilterSubmit: () => void;
    darkMode: boolean;
    filterValues: {
        markType: string | null;
        resourceId: string | null;
        jobId: string | null;
        orderId: string | null;
        startDate: string | null;
        endDate: string | null;
    };
}

const TimesheetFilterModal = ({
    open,
    timesheets,
    onClose,
    handleFilterChange,
    handleFilterSubmit,
    removeFilterSubmit,
    darkMode,
    filterValues
}: TimesheetFilterModalProps) => {
    const uniqueMarkTypes = [...new Set(timesheets.map(item => item.markType))];
    const uniqueResources = [...new Set(timesheets.map(item => item.resourceId))];
    const uniqueJobs = [...new Set(timesheets.map(item => item.jobId))];
    const uniqueOrders = [...new Set(timesheets.map(item => item.orderId))];

    return (
        <ModalFiltri show={open} className={`fixed inset-0 flex items-center justify-center z-50 ${darkMode ? 'bg-opacity-50' : 'bg-opacity-50'}`}>
            <div className={`rounded-xl max-w-md max-h-screen h-auto w-full flex-col items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`rounded-lg p-6 max-w-md max-h-screen h-auto w-full flex flex-col mb-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex justify-between text-center mt-2">
                        <p className={`font-bold font-lato text-left ${darkMode ? 'text-white' : 'text-black'}`}>Filtri</p>
                        <button onClick={onClose} className={`font-bold font-lato py-1 px-2 rounded-lg mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>X</button>
                    </div>
                    <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />
                    
                    <p className={`font-bold font-lato mt-4 mb-2 text-left ${darkMode ? 'text-white' : 'text-black'}`}>Tipo registrazione</p>
                    <select
                        name="markType"
                        value={filterValues.markType || ''}
                        onChange={(event) => handleFilterChange(event)}
                        className={`px-4 py-2 border rounded-lg mb-2 w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'}`}
                    >
                        <option value=""></option>
                        {uniqueMarkTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    
                    <p className={`font-bold font-lato mt-4 mb-2 text-left ${darkMode ? 'text-white' : 'text-black'}`}>Risorsa</p>
                    <select
                        name="resourceId"
                        value={filterValues.resourceId || ''}
                        onChange={(event) => handleFilterChange(event)}
                        className={`px-4 py-2 border rounded-lg mb-2 w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'}`}
                    >
                        <option value="">Risorsa</option>
                        {uniqueResources.map((resource) => (
                            <option key={resource} value={resource}>{resource}</option>
                        ))}
                    </select>

                    <p className={`font-bold font-lato mt-4 mb-2 text-left ${darkMode ? 'text-white' : 'text-black'}`}>Commessa</p>
                    <select
                        name="jobId"
                        value={filterValues.jobId || ''}
                        onChange={(event) => handleFilterChange(event)}
                        className={`px-4 py-2 border rounded-lg mb-2 w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'}`}
                    >
                        <option value="">Commessa</option>
                        {uniqueJobs.map((job) => (
                            <option key={job} value={job}>{job}</option>
                        ))}
                    </select>

                    <p className={`font-bold font-lato mt-4 mb-2 text-left ${darkMode ? 'text-white' : 'text-black'}`}>Ordine</p>
                    <select
                        name="orderId"
                        value={filterValues.orderId || ''}
                        onChange={(event) => handleFilterChange(event)}
                        className={`px-4 py-2 border rounded-lg mb-2 w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'}`}
                    >
                        <option value="">Ordine</option>
                        {uniqueOrders.map((order) => (
                            <option key={order} value={order}>{order}</option>
                        ))}
                    </select>

                    <p className={`font-bold font-lato mt-4 mb-2 text-left ${darkMode ? 'text-white' : 'text-black'}`}>Data inizio</p>
                    <input
                        type="date"
                        name="startDate"
                        value={filterValues.startDate || ''}
                        onChange={(event) => handleFilterChange(event)}
                        className={`px-4 py-2 border rounded-lg mb-2 w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'}`}
                    />

                    <p className={`font-bold font-lato mt-4 mb-2 text-left ${darkMode ? 'text-white' : 'text-black'}`}>Data Fine</p>
                    <input
                        type="date"
                        name="endDate"
                        value={filterValues.endDate || ''}
                        onChange={(event) => handleFilterChange(event)}
                        className={`px-4 py-2 border rounded-lg mb-2 w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'}`}
                    />

                    <div className="justify-center text-center mb-2 mt-4">
                        <button onClick={removeFilterSubmit} className={`text-xl font-bold font-lato py-1 px-2 rounded-lg mb-1 mr-4 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'}`}>Svuota Filtri</button>
                        <button onClick={handleFilterSubmit} className={`text-xl font-bold font-lato py-1 px-2 rounded-lg mb-1 ${darkMode ? 'bg-pink-500 text-white' : 'bg-pink-500 text-white'}`}>Applica</button>
                    </div>
                </div>
            </div>
        </ModalFiltri>
    );
};

export default TimesheetFilterModal;
