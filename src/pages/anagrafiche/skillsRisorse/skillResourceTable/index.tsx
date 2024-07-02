import IconSvg from "../../../../components/iconsSvg";
import { SkillResources } from "../../../../store/skillResource/types";


interface SkillResourceTableProps {
    currentSkillResource: SkillResources[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (skillResource: SkillResources) => void;
    isDarkMode: boolean;
}

const SkillResourceTable= ({ currentSkillResource, handleModalOpen, handleDeleteConfirmation, }: SkillResourceTableProps) => {

    return (
        <table className="w-full divide-gray-100">
            <thead>
                <tr>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Risorsa</button>
                    </th>
                    <th className="text-left px-32 py-2">
                        <button className="flex items-center">Skill</button>
                    </th>
                    <th className="text-left px-6 py-2">
                        <button className="flex items-center">Livello</button>
                    </th>
                    <th className="text-left px-10 py-2">
                        <button className="flex items-center">Note</button>
                    </th>
                    <th className="text-right px-16 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {currentSkillResource.map((skillResource, index) => (
                    <tr key={skillResource.id} className={`${index % 2 === 0 ? 'bg-gray-100 ' : ''}`}>
                        <td className="text-left px-4 py-2 ">{skillResource.resource.name}</td>
                        <td className="text-left px-32 py-2  ">{skillResource.skill.name}</td>
                        <td className="text-left px-10 py-2 ">{skillResource.level}</td>
                        <td className="text-left px-10 py-2 ">{skillResource.note}</td>
                        <td className="text-right px-8 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(skillResource.resourceId!)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(skillResource)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SkillResourceTable;
