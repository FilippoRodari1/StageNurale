import { format } from "date-fns";
import IconSvg from "../../../../components/iconsSvg";
import { Pianificazione } from "../../../../store/pianificazione/types";

interface PianificazioneTableProps {
    currentPianificazione: Pianificazione[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (pianificazione: Pianificazione) => void;
    isDarkMode: boolean;
}

const PianificazioneTable = ({ currentPianificazione, handleModalOpen, handleDeleteConfirmation }: PianificazioneTableProps) => {
    return (
        <table className="w-full divide-gray-100">
            <thead>
                <tr>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Categoria</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Descrizione</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Data Inizio</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Data Fine</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Giorni tra</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Giorno fisso</button>
                    </th>
                    <th className="text-left px-6 py-2">
                        <button className="flex items-center">Totale</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Vendita</button>
                    </th>
                    <th className="text-right px-10 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {currentPianificazione.map((pianificazione, index) => (
                    <tr key={pianificazione.id} className={`${index % 2 === 0 ? 'bg-gray-100 ' : ''}`}>
                        <td className="text-left px-4 py-2">{pianificazione.valueCategory}</td>
                        <td className="text-left px-8 py-2">{pianificazione.description}</td>
                        <td className="text-left px-8 py-2">{format(new Date(pianificazione.startDate), 'dd/MM/yy')}</td>
                        <td className="text-left px-8 py-2">{format(new Date(pianificazione.endDate), 'dd/MM/yy')}</td>
                        <td className="text-left px-8 py-2">{pianificazione.daysBetween}</td>
                        <td className="text-left px-8 py-2">{pianificazione.fixedDay}</td>
                        <td className="text-left px-8 py-2">{pianificazione.grossValue}</td>
                        <td className="text-left px-8 py-2">
                            {pianificazione.isSale ? '✓' : '—'}
                        </td>
                        <td className="text-right px-18 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(pianificazione.id)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(pianificazione)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default PianificazioneTable;