import { format } from "date-fns";
import IconSvg from "../../../../components/iconsSvg";
import { SalesInvoice } from "../../../../store/fattureVendite/types";

interface FattureVenditaTableProps {
    currentFattureVendita: SalesInvoice[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (fattureVendita: SalesInvoice) => void;
    isDarkMode: boolean;
}

const FattureVenditaTable = ({ currentFattureVendita, handleModalOpen, handleDeleteConfirmation }: FattureVenditaTableProps) => {

    const formatCurrency = (amount: number): string => {
        return amount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full divide-gray-100">
                <thead>
                    <tr>
                        <th className="text-left px-6 py-2">Numero Fattura</th>
                        <th className="text-left px-6 py-2">Data</th>
                        <th className="text-left px-6 py-2">Imponibile</th>
                        <th className="text-left px-6 py-2">IVA</th>
                        <th className="text-left px-6 py-2">Totale</th>
                        <th className="text-left px-6 py-2">Cliente</th>
                        <th className="text-left px-6 py-2">Tipo di pagamento</th>
                        <th className="text-left px-6 py-2">Stato</th>
                        <th className="text-left px-6 py-2">Note</th>
                        <th className="text-right px-10 py-2">Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {currentFattureVendita.map((fattureVendita, index) => (
                        <tr key={fattureVendita.id} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                            <td className="text-left px-6 py-2">{fattureVendita.code}</td>
                            <td className="text-left px-6 py-2">{format(new Date(fattureVendita.date), 'dd/MM/yy')}</td>
                            <td className="text-left px-6 py-2">{formatCurrency(fattureVendita.netValue)}</td>
                            <td className="text-left px-6 py-2">{formatCurrency(fattureVendita.vatValue)}</td>
                            <td className="text-left px-6 py-2">{formatCurrency(fattureVendita.grossValue)}</td>
                            <td className="text-left px-6 py-2">{fattureVendita.customer.name}</td>
                            <td className="text-left px-6 py-2">{fattureVendita.typeOfPayment.name}</td>
                            <td className="text-left px-6 py-2">{fattureVendita.state}</td>
                            <td className="text-left px-6 py-2">{fattureVendita.note}</td>
                            <td className="text-right px-5 py-2">
                                <button className="text-white  py-1 rounded mr-2" onClick={() => handleModalOpen(fattureVendita.id)}><IconSvg name="modifica" /></button>
                                <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(fattureVendita)}><IconSvg name="delete" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FattureVenditaTable;
