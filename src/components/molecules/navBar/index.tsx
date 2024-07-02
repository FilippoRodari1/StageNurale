import { useState } from 'react';
import IconSvg from '../../iconsSvg';
import ModalUser from '../../atoms/modal/modalUser';
import { removeTokenCookies } from '../../../utils/Helpers';
import { LOGIN } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';

interface Props{
    name: string;
}

const Navbar = ({name}: Props) => {
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isRingModalOpen, setIsRingModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeTokenCookies();
        navigate(LOGIN);
    };

    return (
        <nav className={`flex justify-between items-center h-auto bg-gradient-to-r rounded-r-lg from-pink-600 from-10% via-blue-950 via-30% to-white to-50% dark:to-black`}>
            <div className="ml-4">
              <h1 className='font-lato text-xl text-white'>{name}</h1>
            </div>

            <div className="mr-4 flex items-center space-x-4">
                <button className="relative" onClick={() => setIsRingModalOpen(true)}>
                    <IconSvg name="campanello" className="h-6 w-6 text-white" />
                </button>
                <button className="relative" onClick={() => setIsUserModalOpen(true)}>
                    <IconSvg name="user" className="h-6 w-6 text-white" />
                </button>
            </div>
            {isRingModalOpen && (
                <ModalUser show={isRingModalOpen} onClick={() => setIsRingModalOpen(false)} className="bg-white rounded-xl max-w-md w-full flex flex-col items-center justify-center">
                    <div className="bg-white rounded-lg p-1 ml-12 mt-[-35px] max-w-md w-full flex flex-col items-center justify-center border-2 border-solid border-gray-200">
                        <button className="font-lato flex text-gray-800 px-4 py-1 rounded-lg self-end" onClick={() => setIsRingModalOpen(false)}>X</button>
                        <h2 className="font-bold font-lato mb-6 mr-12 text-gray-800">Nessuna Notifica Presente!</h2>
                    </div>
                </ModalUser>
            )}
            {isUserModalOpen && (
                <ModalUser show={isUserModalOpen} onClick={() => setIsUserModalOpen(false)} className="bg-white rounded-xl max-w-md w-full flex flex-col items-center justify-center">
                    <div className="bg-white rounded-lg p-1 ml-12 mt-[-35px] max-w-md w-full flex flex-col items-center justify-center border-2 border-solid border-gray-200">
                        <button className="font-lato flex text-gray-800 px-4 py-1 rounded-lg self-end" onClick={() => setIsUserModalOpen(false)}>X</button>
                        <p className="font-bold font-lato mb-6 mr-12 text-gray-800">Nome Utente</p>
                        <hr className="border-solid border-gray-100 w-48" />
                        <div className="flex items-center cursor-pointer text-gray-800 mb-4 mt-4 mr-24" onClick={handleLogout}>
                            <IconSvg name="logout" className="mr-12"/> 
                            <p className="font-bold font-lato ml-6 mb-1 text-gray-800">Logout</p>
                        </div>
                    </div>
                </ModalUser>
            )}
        </nav>
    );
};

export default Navbar;
