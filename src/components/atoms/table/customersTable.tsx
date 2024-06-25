import IconSvg from "../../iconsSvg";
import { Customers } from "../../../store/customers/types";

interface CustomerTableProps {
    currentCustomers: Customers[];
    setViewingUserId: (id: number) => void;
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (customer: Customers) => void;
    isDarkMode: boolean;
}

const CustomerTable = ({ currentCustomers, setViewingUserId, handleModalOpen, handleDeleteConfirmation, }: CustomerTableProps) => {
    return (
        <table className="w-full divide-gray-100">
            <thead>
                <tr>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Nome</button>
                    </th>
                    <th className="text-left px-32 py-2">
                        <button className="flex items-center">Tipo di pagamento</button>
                    </th>
                    <th className="text-left px-10 py-2">
                        <button className="flex items-center">Note</button>
                    </th>
                    <th className="text-right px-28 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {currentCustomers.map((customer, index) => (
                    <tr key={customer.id} className={`${index % 2 === 0 ? 'bg-gray-100 ' : ''}`}>
                        <td className="text-left px-4 py-2 ">{customer.name}</td>
                        <td className="text-left px-32 py-2  ">{customer.typeOfPayment.name}</td>
                        <td className="text-left px-10 py-2 ">{customer.note}</td>
                        <td className="text-right px-8 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => setViewingUserId(customer.id!)}><IconSvg name="occhio" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(customer.id!)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(customer)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CustomerTable;
