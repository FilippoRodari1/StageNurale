import { format } from "date-fns";
import IconSvg from "../../../../components/iconsSvg";
import { Activities } from "../../../../store/attività/types";


interface ActivitiesTableProps {
    activities: Activities[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (activity: Activities) => void;
    isDarkMode: boolean;
}

const ActivitiesTable = ({ activities, handleModalOpen, handleDeleteConfirmation, isDarkMode }: ActivitiesTableProps) => {
    return (
        <table className={`w-full divide-gray-100 ${isDarkMode ? 'dark-mode' : ''}`}>
            <thead>
                <tr>
                    <th className="text-left px-4 py-2">Id</th>
                    <th className="text-left px-5 py-2">Data Inizio</th>
                    <th className="text-left px-5 py-2">Data Fine</th>
                    <th className="text-left px-5 py-2">Ore lavorate</th>
                    <th className="text-left px-5 py-2">Stato</th>
                    <th className="text-left px-5 py-2">Commessa</th>
                    <th className="text-left px-5 py-2">Ordine</th>
                    <th className="text-left px-5 py-2">Risorsa</th>
                    <th className="text-left px-5 py-2">Note</th>
                    <th className="text-right px-16 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {activities.map((activity, index) => (
                    <tr key={activity.id} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                        <td className="text-left px-4 py-2">{activity.jobId}</td>
                        <td className="text-left px-5 py-2">{format(new Date(activity.startDate), 'dd/MM/yy')}</td>
                        <td className="text-left px-5 py-2">{format(new Date(activity.endDate), 'dd/MM/yy')}</td>
                        <td className="text-left px-5 py-2">{activity.workedHours}</td>
                        <td className="text-left px-5 py-2">{activity.state}</td>
                        <td className="text-left px-5 py-2">{activity.job.name}</td>
                        <td className="text-left px-5 py-2">{activity.order.name}</td>
                        <td className="text-left px-5 py-2">{activity.resource.name}</td>
                        <td className="text-left px-5 py-2">{activity.note}</td>
                        <td className="text-right px-8 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(activity.jobId)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(activity)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ActivitiesTable;
