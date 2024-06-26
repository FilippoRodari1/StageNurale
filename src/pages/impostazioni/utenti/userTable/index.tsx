import IconSvg from "../../../../components/iconsSvg";
import { User } from "../../../../store/utenti/types";

interface UserTableProps {
    currentUser: User[];
    handleModalOpen: (id: number) => void;
    handleDeleteConfirmation: (currentUser: User) => void;
    isDarkMode: boolean;
}

const UserTable = ({ currentUser, handleModalOpen, handleDeleteConfirmation }: UserTableProps) => {

    return (
        <table className="w-full divide-gray-100">
            <thead>
                <tr>
                    <th className="text-left px-4 py-2">Nome</th>
                    <th className="text-left px-4 py-2">Cognome</th>
                    <th className="text-left px-4 py-2">Emailo</th>
                    <th className="text-right px-16 py-2">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {currentUser.map((user, index) => (
                    <tr key={user.id} className={`${index % 2 === 0 ? 'bg-gray-100 ' : ''}`}>
                        <td className="text-left px-4 py-2">{user.firstName}</td>
                        <td className="text-left px-4 py-2">{user.lastName}</td>
                        <td className="text-left px-4 py-2">{user.email}</td>
                        <td className="text-right px-2 py-2">
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleModalOpen(user.id)}><IconSvg name="modifica" /></button>
                            <button className="text-white px-2 py-1 rounded mr-2" onClick={() => handleDeleteConfirmation(user)}><IconSvg name="delete" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserTable;
