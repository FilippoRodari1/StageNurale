import { format } from "date-fns";
import IconSvg from "../../../../components/iconsSvg";
import { Scadenze } from "../../../../store/scadenze/types";

interface ScadenzeTableProps {
    currentScadenze: Scadenze[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (scadenze: Scadenze) => void;
    isDarkMode: boolean;
}

const ScadenzeTable = ({ currentScadenze, handleModalOpen, handleDeleteConfirmation }: ScadenzeTableProps) => {

    const formatCurrency = (amount: number): string => {
        return amount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
    };

    return (
        <table className="w-full divide-gray-100">
            <thead>
                <tr>
                    <th className="text-left px-2 py-2">
                        <button className="flex items-center">Fattura d'acquisto</button>
                    </th>
                    <th className="text-left px-2 py-2">
                        <button className="flex items-center">Fattura di vendita</button>
                    </th>
                    <th className="text-left px-6 py-2">
                        <button className="flex items-center">Totale</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Data Prevista</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Data pagamento</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Note</button>
                    </th>
                    <th className="text-right px-10 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {currentScadenze.map((scadenze, index) => (
                    <tr key={scadenze.id} className={`${index % 2 === 0 ? 'bg-gray-100 ' : ''}`}>
                        <td className="text-left px-20 py-2">{scadenze.salesInvoiceId}</td>
                        <td className="text-left px-16 py-2">{scadenze.purchasesInvoiceId}</td>
                        <td className="text-left px-4 py-2">{formatCurrency(scadenze.grossValue)}</td>
                        <td className="text-left px-8 py-2">{format(new Date(scadenze.scheduledDate), 'dd/MM/yy')}</td>
                        <td className="text-left px-8 py-2">{format(new Date(scadenze.paymentDate), 'dd/MM/yy')}</td>
                        <td className="text-left px-8 py-2">{scadenze.note}</td>
                        <td className="text-right px-18 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(scadenze.id)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(scadenze)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ScadenzeTable;