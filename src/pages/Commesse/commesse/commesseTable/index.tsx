import { format } from "date-fns";
import IconSvg from "../../../../components/iconsSvg";
import { Jobs } from "../../../../store/commesse/types";

interface CommessaTableProps {
    currentOrders: Jobs[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (orders: Jobs) => void;
    isDarkMode: boolean;
}

const CommessaTable = ({ currentOrders, handleModalOpen, handleDeleteConfirmation, isDarkMode }: CommessaTableProps) => {
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
            {currentOrders.map((order, index) => (
                <tr key={order.id} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                    <td className="text-left px-4 py-2">{order.code}</td>
                    <td className="text-left px-5 py-2">{order.description}</td>
                    <td className="text-left px-5 py-2">{order.customer?.name || 'Nome non disponibile'}</td>
                    <td className="text-left px-5 py-2">{format(new Date(order.startDate), 'dd/MM/yy')}</td>
                    <td className="text-left px-5 py-2">{format(new Date(order.endDate), 'dd/MM/yy')}</td>
                    <td className="text-left px-5 py-2">{order.jobType}</td>
                    <td className="text-left px-5 py-2">{order.state}</td>
                    <td className="text-right px-8 py-2">
                        <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(order.id)}><IconSvg name="modifica" /></button>
                        <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(order)}><IconSvg name="delete" /></button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default CommessaTable;
