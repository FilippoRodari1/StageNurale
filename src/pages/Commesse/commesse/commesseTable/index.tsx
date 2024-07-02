import { format } from "date-fns";
import IconSvg from "../../../../components/iconsSvg";
import { Jobs } from "../../../../store/commesse/types";

interface CommessaTableProps {
    currentJobs: Jobs[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (orders: Jobs) => void;
    isDarkMode: boolean;
}

const CommessaTable = ({ currentJobs, handleModalOpen, handleDeleteConfirmation, isDarkMode }: CommessaTableProps) => {
    return (
        <table className={`w-full divide-gray-100 ${isDarkMode ? 'dark-mode' : ''}`}>
            <thead>
                <tr>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Codice</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Descrizione</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Cliente</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Data Inizio</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Data Fine</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Tipo di Commessa</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Stato</button>
                    </th>
                    <th className="text-right px-16 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
            {currentJobs.map((jobs, index) => (
                <tr key={jobs.id} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                    <td className="text-left px-4 py-2">{jobs.code}</td>
                    <td className="text-left px-5 py-2">{jobs.description}</td>
                    <td className="text-left px-5 py-2">{jobs.customer?.name || 'Nome non disponibile'}</td>
                    <td className="text-left px-5 py-2">{format(new Date(jobs.startDate), 'dd/MM/yy')}</td>
                    <td className="text-left px-5 py-2">{format(new Date(jobs.endDate), 'dd/MM/yy')}</td>
                    <td className="text-left px-5 py-2">{jobs.jobType}</td>
                    <td className="text-left px-5 py-2">{jobs.state}</td>
                    <td className="text-right px-8 py-2">
                        <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(jobs.id)}><IconSvg name="modifica" /></button>
                        <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(jobs)}><IconSvg name="delete" /></button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default CommessaTable;
