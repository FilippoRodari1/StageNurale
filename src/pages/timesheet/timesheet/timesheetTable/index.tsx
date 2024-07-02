import { format } from "date-fns";
import IconSvg from "../../../../components/iconsSvg";
import { Timesheet } from "../../../../store/timesheet/types";

interface TimesheetTableProps {
    currentTimesheet: Timesheet[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (timesheet: Timesheet) => void;
    isDarkMode: boolean;
}

const TimesheetTable = ({ currentTimesheet, handleModalOpen, handleDeleteConfirmation }: TimesheetTableProps) => {
    return (
        <table className="w-full divide-gray-100">
            <thead>
                <tr>
                    <th className="text-left px-8 py-2">
                        <button className="flex items-center">Id</button>
                    </th>
                    <th className="text-left px-12 py-2">
                        <button className="flex items-center">Data</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Risorsa</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Ordine</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Commessa</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Ore lavorate</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Tipo registrazione</button>
                    </th>
                    <th className="text-left px-8 py-2">
                        <button className="flex items-center">Note</button>
                    </th>
                    <th className="text-right px-8 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {currentTimesheet.map((timesheet, index) => (
                    <tr key={timesheet.id} className={`${index % 2 === 0 ? 'bg-gray-100 ' : ''}`}>
                        <td className="text-left px-6 py-2">{timesheet.id}</td>
                        <td className="text-left px-8 py-2">{format(new Date(timesheet.operationDate), 'dd/MM/yy')}</td>
                        <td className="text-left px-8 py-2">{timesheet.resourceId}</td>
                        <td className="text-left px-12 py-2">{timesheet.orderId}</td>
                        <td className="text-left px-12 py-2">{timesheet.jobId}</td>
                        <td className="text-left px-12 py-2">{timesheet.workedHours}</td>
                        <td className="text-left px-8 py-2">{timesheet.markType}</td>
                        <td className="text-left px-8 py-2">{timesheet.note}</td>
                        <td className="text-right px-18 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(timesheet.id)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(timesheet)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TimesheetTable;