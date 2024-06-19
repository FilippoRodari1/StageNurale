

interface ColumnHeader {
    title: string;
    width?: string;
    className?: string;
}

interface TableProps {
    columnHeaders: ColumnHeader[];
    handleModalOpen?: () => void;
    handleDeleteConfirmation?: () => void;
    isDarkMode?: boolean;
}

const Table = ({columnHeaders}: TableProps) => {
    return (
        <div className={`h-full w-full flex-col`}>
        <table className="w-full divide-gray-100">
            <thead>
                <tr>
                    {columnHeaders.map((header, index) => (
                        <th key={index} className={`text-left px-4 py-2 ${header.width ?? ''}`}>
                            <button className="flex items-center">{header.title}</button>
                        </th>
                    ))}
                    <th className="text-right">{/* Altro titolo o azioni */}</th>
                </tr>
            </thead>
            <tbody>
                {/* Qui inserisci il contenuto delle righe 
                <td className="text-right px-8 py-2">
                    <button className="text-white px-2 py-1 rounded mr-2"><IconSvg name="modifica" /></button>
                    <button className="text-white px-2 py-1 rounded mr-2"><IconSvg name="delete" /></button>
                </td>
                */}        
            </tbody>
        </table>
        </div>
    );
}

export default Table;
