import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from '../sideBar';
import IconSvg from '../../iconsSvg';
import { HOME, COMMESSE, SKILLS, LOGIN, ATTIVITA, FATTURADIACQUISTO, FATTURADIACQUISTOATTIVITA, FATTUREVENDITA, SCADENZE, PIANIFICAZIONE, SKILLSRISORSE, TIPIDIPAGAMENTO, UTENTI, INSERIMENTOVELOCE, TIMESHEET, REPORT, ORDERS, RESOURCES, SUPPLIERS, CUSTOMERS } from '../../../utils/constants';

const SIDEBAR = (isDarkMode: boolean) => [
    { name: 'Home', icon: <IconSvg name="home" />, link: HOME, className: 'text-pink-500' },
    { name: 'Inserimento Veloce', icon: <IconSvg name="risorse" />, link: INSERIMENTOVELOCE },
    { 
        name: 'Commesse', 
        icon: <IconSvg name="tipoDiPagamento" color={isDarkMode ? 'white' : 'black'} />, 
        sublinks: [
            { name: 'Commesse', link: COMMESSE },
            { name: 'Ordini', link: ORDERS },
            { name: 'Attività', link: ATTIVITA }
        ]
    },  
    {
        name: 'Anagrafiche', 
        icon: <IconSvg name="clienti" color={isDarkMode ? 'white' : 'black'} />, 
        sublinks: [
            { name: 'Clienti', link: CUSTOMERS },
            { name: 'Fornitori', link: SUPPLIERS },
            { name: 'Risorse', link: RESOURCES },
            { name: 'Skills delle risorse', link: SKILLSRISORSE }
        ]
    },  
    { 
        name: 'Acquisti', 
        icon: <IconSvg name="tipoDiPagamento" color={isDarkMode ? 'white' : 'black'} />, 
        sublinks: [
            { name: 'Fattura Di Acquisto', link: FATTURADIACQUISTO },
            { name: 'Fattura Di Acquisto Attività', link: FATTURADIACQUISTOATTIVITA },
        ]
    },  
    {
        name: 'Vendite', 
        icon: <IconSvg name="tipoDiPagamento" color={isDarkMode ? 'white' : 'black'} />, 
        sublinks: [
            { name: 'Fatture Vendita', link: FATTUREVENDITA },
        ]
    },  
    {
        name: 'Scadenziario', 
        icon: <IconSvg name="tipoDiPagamento" color={isDarkMode ? 'white' : 'black'} />, 
        sublinks: [
            { name: 'Scadenze', link: SCADENZE },
            { name: 'Pianificazione', link: PIANIFICAZIONE },
        ]
    },
    {
        name: 'Settings', 
        icon: <IconSvg name="impostazioni" color={isDarkMode ? 'white' : 'black'} />, 
        sublinks: [
            { name: 'Skills', link: SKILLS },
            { name: 'Tipi di pagamento', link: TIPIDIPAGAMENTO },
            { name: 'Utenti', link: UTENTI },
        ]
    },
    {
        name: 'Timesheet', 
        icon: <IconSvg name="timesheet" color={isDarkMode ? 'white' : 'black'} />, 
        sublinks: [
            { name: 'Timesheet', link: TIMESHEET },
            { name: 'Report', link: REPORT },
        ]
    },
];

const SIDEBARBASSA = (isDarkMode: boolean) => [
    { name: 'Logout', icon: <IconSvg name="logout" color={isDarkMode ? 'white' : 'black'} />, link: LOGIN },
    { name: 'Dark Mode', icon: '☀️', link: HOME }
];

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const lightModeImage = '/src/img/title.png';
    const darkModeImage = '/src/img/Marchio_Nurale_RGB 2.png';
    const logo = '/src/img/Group.png';

    return (
        <div className={`flex h-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <div className={`transition-all duration-300 h-screen ${isSidebarOpen ? 'w-full sm:w-64' : 'w-16'} ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-solid border-2 flex flex-col relative`}>
                {isSidebarOpen ? (
                    <img src={isDarkMode ? darkModeImage : lightModeImage} className="h-[95px] p-[20.76px_20.8px] mt-2" />
                ) : (
                    <img src={logo} className="h-[50px] mt-6 mx-auto" />
                )}
                <hr className={`border-solid ${isDarkMode ? 'border-white' : 'border-black'} ml-8 mr-8`} />
                <div className="flex-grow overflow-y-auto custom-scrollbar">
                    <SideBar 
                        links={SIDEBAR(isDarkMode)} 
                        currentLink={location.pathname} 
                        isSidebarOpen={isSidebarOpen} 
                        isDarkMode={isDarkMode} 
                        toggleDarkMode={toggleDarkMode} 
                    />
                </div>
                <hr className={`border-solid ${isDarkMode ? 'border-white' : 'border-black'} ml-6 mr-6`} />
                <div className="h-32 sm:w-64">
                    <SideBar 
                        links={SIDEBARBASSA(isDarkMode)} 
                        currentLink={location.pathname} 
                        isSidebarOpen={isSidebarOpen} 
                        isDarkMode={isDarkMode} 
                        toggleDarkMode={toggleDarkMode} 
                    />
                </div>
                <button 
                    className={`absolute top-[90px] right-4 items-center justify-center bg-pink-500 text-white px-1.5 py-0.5 transition-all duration-300 transform origin-top rounded-full ${isSidebarOpen ? 'translate-x-full' : 'right-[-16px]'}`} 
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? '◁' : '▷'}
                </button>
            </div>
            <div className="flex-1 mr-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
