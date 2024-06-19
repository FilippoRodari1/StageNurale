import { useNavigate } from 'react-router-dom';

interface SubLinkProps {
    name: string;
    icon: JSX.Element | string;
    link: string;
    isActive: boolean;
    isSidebarOpen: boolean;
    isDarkMode: boolean;
}

const SubLink = ({ name, icon, link, isActive, isSidebarOpen, isDarkMode }: SubLinkProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
    };
    

    return (
        <li className={`flex items-center p-4 cursor-pointer ${isActive ? (isDarkMode ? 'bg-purple-500 text-white' : 'bg-gray-200 text-pink-500') : ''} ${isSidebarOpen ? 'w-64' : 'w-16'}`} onClick={handleClick}>
            <span className="text-base">{icon}</span>
            {isSidebarOpen && <span className="ml-4 mt-[-1spx]">{name}</span>}
        </li>
    );
};

export default SubLink;

