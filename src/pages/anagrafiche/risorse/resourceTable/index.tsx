import IconSvg from "../../../../components/iconsSvg";
import { Resources } from "../../../../store/resources/types";


interface ResourcesTableProps {
    currentResources: Resources[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (customer: Resources) => void;
    isDarkMode: boolean;
}

const ResourceTable= ({ currentResources, handleModalOpen, handleDeleteConfirmation, }: ResourcesTableProps) => {
    return (
        <table className="w-full divide-gray-100">
            <thead>
                <tr>
                    <th className="text-left px-1 py-2">
                        <button className="flex items-center">Nome</button>
                    </th>
                    <th className="text-left px-3 py-2">
                        <button className="flex items-center">Cognome</button>
                    </th>
                    <th className="text-left px-3 py-2">
                        <button className="flex items-center">Costo Or.</button>
                    </th>
                    <th className="text-left px-3 py-2">
                        <button className="flex items-center">Ricavo Or.</button>
                    </th>
                    <th className="text-left px-3 py-2">
                        <button className="flex items-center">CV</button>
                    </th>
                    <th className="text-left px-3 py-2">
                        <button className="flex items-center">Fornitore</button>
                    </th>
                    <th className="text-left px-3 py-2">
                        <button className="flex items-center">Note</button>
                    </th>
                    <th className="text-right px-12 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {currentResources.map((resources, index) => (
                    <tr key={resources.id} className={`${index % 2 === 0 ? 'bg-gray-100 ' : ''}`}>
                        <td className="text-left px-4 py-2"> {resources.firstName}</td>
                        <td className="text-left px-4 py-2"> {resources.lastName}</td>
                        <td className="text-left px-4 py-2"> {resources.hourCost} €</td>
                        <td className="text-left px-4 py-2"> {resources.hourRevenue} €</td>
                        <td className="text-left px-4 py-2"> {resources.curriculumVitae}</td>
                        <td className="text-left px-4 py-2"> {resources.supplierId}</td>
                        <td className="text-left px-10 py-2"> {resources.note}</td>
                        <td className="text-right px-8 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(resources.id!)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(resources)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ResourceTable;
