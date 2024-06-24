import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SubLink from './subLink';

interface Props {
    links: { 
        name: string, 
        link?: string, 
        icon: JSX.Element | string, 
        sublinks?: { name: string, link: string }[] 
    }[];
    currentLink: string;
    isSidebarOpen: boolean;
    isDarkMode: boolean;
    toggleDarkMode?: () => void;
}

const SideBar = ({ links, currentLink, isSidebarOpen, isDarkMode, toggleDarkMode }: Props) => {
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
        Commesse: false,
        Anagrafiche: false,
        Acquisti: false,
        Vendite: false,
        Scadenziario: false,
        Settings: false,
        Timesheet : false,
    });

    const navigate = useNavigate();

    const handleToggle = (sectionName: string) => {
        setOpenSections((prevState) => ({
            ...prevState,
            [sectionName]: !prevState[sectionName],
        }));
    };

    const handleClick = (link: string) => {
        navigate(link);
    };

    return (
        <div className={`font-lato relative h-full ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
            <ul className="mt-6 h-full">
                {links.map((link, index) => {
                    if (link.name === 'Dark Mode') {
                        return (
                            <li key={index} className="relative mt-1 ml-4 flex items-center">
                                <span className="text-base">{isDarkMode ? '🌙' : '☀️'}</span>
                                {isSidebarOpen && (
                                    <label className="inline-flex items-center cursor-pointer ml-4">
                                        <input type="checkbox" value="" className="sr-only peer" checked={isDarkMode} onChange={toggleDarkMode} />
                                        <span className="text-md font-Lato">
                                            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                                        </span>
                                        <div className="relative mt-[1px] ml-10 w-9 h-4 bg-gray-200 rounded-full peer-focus:ring-2 dark:bg-gray-700 peer-checked:bg-pink-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.3 after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600"></div>
                                    </label>
                                )}
                            </li>
                        );
                    } else if (link.sublinks) {
                        const isOpen = openSections[link.name] || false;
                        return (
                            <li key={index} className="relative mt-6">
                                <button onClick={() => handleToggle(link.name)} className="flex items-center mt-6 ml-4">
                                    <span className="text-base">{link.icon}</span>
                                    {isSidebarOpen && <span className="ml-3 flex-grow">{link.name}</span>}
                                    {isSidebarOpen && (
                                        <span className={`ml-auto flex items-center justify-center w-20 h-5 text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>{isOpen ? '△' : '▽'}</span>
                                    )}
                                </button>
                                {isOpen && isSidebarOpen && (
                                    <ul className={`ml-10 mt-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
                                        {link.sublinks.map((sublink, subindex) => (
                                            <li key={subindex} className={`relative py-2 px-6 cursor-pointer ${isDarkMode ? 'hover:bg-purple-500' : 'hover:bg-gray-200'} ${sublink.link === currentLink ? 'text-pink-400' : ''}`} onClick={() => handleClick(sublink.link)}>
                                                <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gray-100 ${isDarkMode ? ' bg-purple-500' : 'hover:bg-gray-200'}`}></div>
                                                <span className="ml-4">{sublink.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    } else {
                        return (
                            <SubLink key={index} name={link.name} icon={link.icon} link={link.link || ''} isActive={link.link === currentLink} isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default SideBar;
