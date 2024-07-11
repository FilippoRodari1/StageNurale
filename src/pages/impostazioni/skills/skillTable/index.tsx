import IconSvg from "../../../../components/iconsSvg";
import { Skills } from "../../../../store/skill/types";


interface SkillsTableProps {
    currentSkills: Skills[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (skills: Skills) => void;
    isDarkMode: boolean;
}

const SkillTable= ({ currentSkills, handleModalOpen, handleDeleteConfirmation, isDarkMode }: SkillsTableProps) => {
    console.log(isDarkMode)
    return (
        <table className="w-full divide-gray-100">
            <thead>
                <tr>
                    <th className="text-left px-4 py-2">
                        <button className="flex items-center">Nome</button>
                    </th>
                    <th className="text-left px-32 py-2">
                        <button className="flex items-center">Tipo di skill</button>
                    </th>
                    <th className="text-left px-10 py-2">
                        <button className="flex items-center">Note</button>
                    </th>
                    <th className="text-right px-16 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {currentSkills.map((skills, index) => (
                    <tr key={skills.id} className={`${index % 2 === 0 ? `${isDarkMode ? ' bg-gray-500' : 'bg-gray-100'}` : " " }`}>
                        <td className="text-left px-4 py-2 ">{skills.name}</td>
                        <td className="text-left px-36 py-2  ">{skills.skillType}</td>
                        <td className="text-left px-10 py-2 ">{skills.note}</td>
                        <td className="text-right px-8 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(skills.id!)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(skills)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SkillTable;
