import IconSvg from "../../../../components/iconsSvg";
import { PurchaseInvoiceActivity } from "../../../../store/fattureAcquistiAttività/types";

interface FatturaAcquistoAttivitaTableProps {
    currentFatturaAcquistoAttivita: PurchaseInvoiceActivity[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (fatturaAcquistoAttivita: PurchaseInvoiceActivity) => void;
    isDarkMode: boolean;
}

const FatturaAcquistoAttivitaTable = ({ currentFatturaAcquistoAttivita, handleModalOpen, handleDeleteConfirmation }: FatturaAcquistoAttivitaTableProps) => {

    return (
        <table className="w-full divide-gray-100">
            <thead>
                <tr>
                    <th className="text-left px-4 py-2">Id</th>
                    <th className="text-left px-4 py-2">Attività</th>
                    <th className="text-left px-2 py-2">Fattura di acquisto</th>
                    <th className="text-right px-8 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {currentFatturaAcquistoAttivita.map((fatturaAcquistoAttivita, index) => (
                    <tr key={fatturaAcquistoAttivita.id} className={`${index % 2 === 0 ? 'bg-gray-100 ' : ''}`}>
                        <td className="text-left px-4 py-2">{fatturaAcquistoAttivita.id}</td>
                        <td className="text-left px-10 py-2">{fatturaAcquistoAttivita.activityId}</td>
                        <td className="text-left px-16 py-2">{fatturaAcquistoAttivita.jobId}</td>
                        <td className="text-right px-2 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(fatturaAcquistoAttivita.id)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(fatturaAcquistoAttivita)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default FatturaAcquistoAttivitaTable;
