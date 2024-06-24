import { format } from "date-fns";
import IconSvg from "../../../../components/iconsSvg";
import { Orders } from "../../../../store/orders/types";

interface OrderTableProps {
    currentOrders: Orders[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (order: Orders) => void; 
    isDarkMode: boolean;
}

const OrderTable = ({ currentOrders, handleModalOpen, handleDeleteConfirmation, isDarkMode }: OrderTableProps) => {
    return (
        <table className={`w-full divide-gray-100 ${isDarkMode ? 'dark-mode' : ''}`}>
            <thead>
                <tr>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Codice</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Risorsa</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Fornitore</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Commessa</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Descrizione</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Tipo di Ordine</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Data Inizio</button>
                    </th>
                    <th className="text-left px-5 py-2">
                        <button className="flex items-center">Data Fine</button>
                    </th>
                    <th className="text-right px-14 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
            {currentOrders.map((order, index) => (
                <tr key={order.id} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                    <td className="text-left px-4 py-2">{order.code}</td>
                    <td className="text-left px-5 py-2">{order.resource?.name || ' '}</td>
                    <td className="text-left px-5 py-2">{order.supplier?.name || ' '}</td>
                    <td className="text-left px-5 py-2">{order.job?.name || ' '}</td>
                    <td className="text-left px-5 py-2">{order.description}</td>
                    <td className="text-left px-5 py-2">{order.orderType}</td>
                    <td className="text-left px-5 py-2">{format(new Date(order.startDate), 'dd/MM/yy')}</td>
                    <td className="text-left px-5 py-2">{format(new Date(order.endDate), 'dd/MM/yy')}</td>
                    <td className="text-right px-8 py-2">
                        <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(order.jobId)}><IconSvg name="modifica" /></button>
                        <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(order)}><IconSvg name="delete" /></button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default OrderTable;
