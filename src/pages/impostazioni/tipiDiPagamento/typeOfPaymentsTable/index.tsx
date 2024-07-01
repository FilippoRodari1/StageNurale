import IconSvg from "../../../../components/iconsSvg";
import { TypeOfPayments } from "../../../../store/tipiDiPagamento/types";

interface TypeOfPaymentsTableProps {
    currentTypeOfPayments: TypeOfPayments[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (typeOfPayments: TypeOfPayments) => void;
    isDarkMode: boolean;
}

const TypeOfPaymentsTable = ({ currentTypeOfPayments, handleModalOpen, handleDeleteConfirmation }: TypeOfPaymentsTableProps) => {
    return (
        <table className="w-full divide-gray-100">
            <thead>
                <tr>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Nome</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Giorni al primo pagamento</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Giorni tra i pagamenti</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Numero di pagamenti</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Spostare i pagamenti alla fine del mese</button>
                    </th>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Note</button>
                    </th>
                    <th className="text-right px-10 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {currentTypeOfPayments.map((typeOfPayment, index) => (
                    <tr key={typeOfPayment.id} className={`${index % 2 === 0 ? 'bg-gray-100 ' : ''}`}>
                        <td className="text-left px-4 py-2">{typeOfPayment.name}</td>
                        <td className="text-left px-20 py-2">{typeOfPayment.daysToFirstPayment}</td>
                        <td className="text-left px-24 py-2">{typeOfPayment.daysBetweenPayments}</td>
                        <td className="text-left px-24 py-2">{typeOfPayment.numberOfPayments}</td>
                        <td className="text-left px-40 py-2">
                            {typeOfPayment.movePaymentsToTheEndOfMonth ? '✓' : '—'}
                        </td>
                        <td className="text-left px-4 py-2">{typeOfPayment.note}</td>
                        <td className="text-right px-18 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(typeOfPayment.id)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(typeOfPayment)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TypeOfPaymentsTable;