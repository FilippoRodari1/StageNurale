import { format } from "date-fns";
import IconSvg from "../../../../components/iconsSvg";
import { PurchaseInvoice } from "../../../../store/acquisti/types";

interface FatturaAcquistoTableProps {
    currentFatturaAcquisto: PurchaseInvoice[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (skillResource: PurchaseInvoice) => void;
    isDarkMode: boolean;
}

const FatturaAcquistoTable= ({ currentFatturaAcquisto, handleModalOpen, handleDeleteConfirmation, }: FatturaAcquistoTableProps) => {

    return (
        <table className="w-full divide-gray-100">
            <thead>
                <tr>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Numero Fattura</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Fornitore</button>
                    </th>
                    <th className="text-left px-1 py-2">
                        <button className="flex items-center">Tipo di pagamento</button>
                    </th>
                    <th className="text-center px-12 py-2">
                        <button className="flex items-center">Data</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Imponibile</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">IVA</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Totale</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Stato</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Note</button>
                    </th>
                    <th className="text-right px-12 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {currentFatturaAcquisto.map((fattureAcquisto, index) => (
                    <tr key={fattureAcquisto.id} className={`${index % 2 === 0 ? 'bg-gray-100 ' : ''}`}>
                        <td className="text-left px-4 py-2 ">{fattureAcquisto.code}</td>
                        <td className="text-left px-4 py-2  ">{fattureAcquisto.supplier.name}</td>
                        <td className="text-left px-4 py-2 ">{fattureAcquisto.typeOfPayment.name}</td>
                        <td className="text-left px-4 py-2 ">{format(new Date(fattureAcquisto.operationDate), 'dd/MM/yy')}</td> 
                        <td className="text-left px-4 py-2 ">{fattureAcquisto.netValue}</td>
                        <td className="text-left px-4 py-2 ">{fattureAcquisto.vatValue}</td>
                        <td className="text-left px-4 py-2 ">{fattureAcquisto.grossValue}</td>
                        <td className="text-left px-4 py-2 ">{fattureAcquisto.state}</td>
                        <td className="text-left px-4 py-2 ">{fattureAcquisto.note}</td>
                        <td className="text-right px-8 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(fattureAcquisto.id!)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(fattureAcquisto)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default FatturaAcquistoTable;
