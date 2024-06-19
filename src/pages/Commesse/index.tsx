import Table from "../../components/atoms/table/table";
import Navbar from "../../components/molecules/navBar";

const Commesse = ()=>{

    const columnHeaders = [
        { title: 'Codice', width: 'px-32' },
        { title: 'Descrizione', width: 'px-32' },
        { title: 'Cliente', width: 'px-32' },
        { title: 'Data inizio', width: 'px-10' },
        { title: 'Data fine', width: 'px-10' },
        { title: 'Tipo di Commessa', width: 'px-10' },
        { title: 'Stato', width: 'px-10' },
        { title: 'Azioni', width: 'px-32' },
    ];

    return (
        <div className={`h-full w-full flex-col`}>
            <Navbar name="Commesse"/>

            <div className="w-full flex justify-between items-center mt-10 mb-1 mx-4">
                <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" >+ Aggiungi nuovo </button>
                <div className="flex">
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-4 rounded-lg mb-2" >Filtri</button>
                </div>
            </div>

            <div className="border-2 border-gray-400 rounded-lg w-full p-1 mx-4" style={{ height: 'calc(100% - 180px)' }}>
                <div className="overflow-auto h-full font-lato">
                    <div className="overflow-auto h-full font-lato">
                        <Table
                            columnHeaders={columnHeaders}
                        />
                    </div>      
                </div>
                <div className="flex justify-between items-center ml-64 mt-4">
                    <div></div>
                    <button className="bg-pink-500 text-white text-xl font-bold font-lato py-1 px-6 rounded-lg mb-2">Prossima Pagina</button>
                    <div className="flex items-center">
                        <span className="mr-2 font-bold font-lato">Pagina</span>
                        <input type="number" className="border border-gray-800 font-bold font-lato rounded-lg text-center w-12 mx-2" />
                        <span className="mr-2 font-bold font-lato">di 10</span>
                        <div className="flex">
                            <button className="bg-gray-300 text-gray-800 px-2 py-1 mr-2 rounded-l-lg">{'◁'}</button>
                            <button className="bg-gray-300 text-gray-800 px-2 py-1 rounded-r-lg" >{'▷'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Commesse