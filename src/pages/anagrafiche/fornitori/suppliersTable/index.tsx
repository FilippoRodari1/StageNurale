import IconSvg from "../../../../components/iconsSvg";
import { Suppliers } from "../../../../store/suppliers/types";


interface SuppliersTableProps {
    currentSuppliers: Suppliers[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (suppliers: Suppliers) => void;
    isDarkMode: boolean;
}

const SupplierTable= ({ currentSuppliers, handleModalOpen, handleDeleteConfirmation, }: SuppliersTableProps) => {
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
                {currentSuppliers.map((suppliers, index) => (
                    <tr key={suppliers.id} className={`${index % 2 === 0 ? 'bg-gray-100 ' : ''}`}>
                        <td className="text-left px-4 py-2 ">{suppliers.name}</td>
                        <td className="text-left px-32 py-2  ">{suppliers.typeOfPayment.name}</td>
                        <td className="text-left px-10 py-2 ">{suppliers.note}</td>
                        <td className="text-right px-8 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(suppliers.id!)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(suppliers)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SupplierTable;
