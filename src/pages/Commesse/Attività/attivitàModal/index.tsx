import { FormProvider, useForm } from "react-hook-form";
import Modal from "../../../../components/atoms/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationsSchemaActivities } from "../../../../validations";
import InputForm2 from "../../../../components/molecules/inputForm2";
import { Activities } from "../../../../store/attività/types";

interface ActivitiesModalProps {
    open: boolean;
    handleModalClose: () => void;
    handleSave: (data: Activities) => void;
    editingId: number | null;
    darkMode: boolean;
}

const ActivitiesModal = ({ open, handleModalClose, handleSave, editingId, darkMode }: ActivitiesModalProps) => {
    const methods = useForm<Activities>({ resolver: zodResolver(validationsSchemaActivities) });

    const handleFormSubmit = async () => {
        const isError = await methods.trigger();
        if (!isError) {
            const data = methods.getValues();
            const activityData: Activities = {
                ...data
            };
            handleSave(activityData);
            methods.reset();
        }
    };

    return (
        <Modal show={open} className={`fixed inset-0 flex z-50 ${darkMode ? 'dark: bg-gray-900 bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}>
            <FormProvider {...methods}>
                <h2 className={`text-xl font-extrabold font-lato mb-4 mx-4 text-left ${darkMode ? 'text-pink-500' : 'text-pink-500'}`}>
                    {editingId ? 'MODIFICA ATTIVITÀ' : 'AGGIUNGI NUOVA ATTIVITÀ'}
                </h2>
                <div className="h-full w-full">
                    <div className={`h-full flex flex-col border border-solid rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                        <div className="flex flex-col md:flex-row mt-[50px] ">
                            <div className="ml-4 md:w-3/5">
                                <InputForm2 title="Commessa" name="jobId" type="text" placeholder="Commessa" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                            </div>
                            <div className="ml-4 md:w-3/5">
                                <InputForm2 name="Ordine" title="order" type="text" placeholder="Ordine" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                            </div> 
                            <div className="ml-4 md:w-3/5">
                                <InputForm2 title="Risorsa" name="resources" type="number" placeholder="Risorsa" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`} />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-[5px]">  
                            <div className="ml-4 md:w-3/5">
                                <InputForm2 name="startDate" title="Data Inizio" type="date" placeholder="Data Inizio" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`} />
                            </div>
                            <div className="ml-4 md:w-3/5">
                                <InputForm2 name="endDate" title="Data Fine" type="date" placeholder="Data Fine" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-[5px]">
                            <div className="ml-4 md:w-3/5">
                                <InputForm2 name="workedHours" title="Ore Lavorate" type="number" placeholder="Ore Lavorate" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                            </div>
                            <div className="ml-4 md:w-3/5">
                                <InputForm2 name="state" title="Stato" type="text" placeholder="Stato" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`} />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-[5px]">
                            <div className="ml-4 md:w-full">
                                <InputForm2 name="note" title="Note" type="text" placeholder="Note" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`} />
                            </div>
                        </div>
                        <div className="flex justify-end mt-auto ml-12 mx-4">
                            <button className={`mb-8 font-lato flex items-center justify-center px-4 py-1 rounded-lg ml-4 ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-800'}`} onClick={handleModalClose}>
                                Annulla
                            </button>
                            <button onClick={handleFormSubmit} className={`mb-8 font-lato flex items-center justify-center px-4 py-1 rounded-lg ml-4 ${darkMode ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white'}`}>
                                Conferma
                            </button>
                        </div>
                    </div>
                </div>
            </FormProvider>
        </Modal>
    );
}

export default ActivitiesModal;
