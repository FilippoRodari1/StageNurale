import { FormProvider, useForm } from 'react-hook-form';
import Modal from '../../../../components/atoms/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationsSchemaTimesheet } from '../../../../validations';
import InputForm2 from '../../../../components/molecules/inputForm2';
import { Timesheet } from '../../../../store/timesheet/types';

interface TimesheetModalProps {
    open: boolean;
    handleModalClose: () => void;
    handleSave: (data: Timesheet) => void;
    editingId: number | null;
    darkMode: boolean;
}

const TimesheetModal = ({ open, handleModalClose, handleSave, editingId, darkMode }: TimesheetModalProps) => {
    const methods = useForm<Timesheet>({
        resolver: zodResolver(validationsSchemaTimesheet)
    });



    const handleFormSubmit = async () => {
        const isError = await methods.trigger();
        if (!isError) {
            const data = methods.getValues();
            const timesheetData: Timesheet = {
                ...data
            };
            handleSave(timesheetData);
            methods.reset();
        }
    };

    return (
        <Modal show={open} className={`fixed inset-0 flex z-50 ${darkMode ? 'dark:bg-gray-900 bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}>
            <FormProvider {...methods}>
                <h2 className={`text-xl font-extrabold font-lato mb-4 mx-4 text-left ${darkMode ? 'text-pink-500' : 'text-pink-500'}`}>
                    {editingId ? 'Modifica timesheet' : 'Aggiungi nuovo timesheet'}
                </h2>
                <div className="h-full w-full">
                    <div className={`h-full flex flex-col border border-solid rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                        <div className="flex flex-col md:flex-row mt-[50px]">
                            <div className="ml-4 md:w-full">
                                <InputForm2
                                    title="Data"
                                    name="operationDate"
                                    type="date"
                                    placeholder="Data"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4">
                            <div className="ml-4 md:w-3/6">
                                <InputForm2
                                    title="Ore lavorate"
                                    name="workedHours"
                                    type="number"
                                    placeholder="Ore lavorate"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                            <div className="ml-4 md:w-1/2">
                                <InputForm2
                                    title="Tipo registrazione"
                                    name="markType"
                                    type="number"
                                    placeholder="Tipo registrazione"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4">
                            <div className="ml-4 md:w-1/2">
                                <InputForm2
                                    name="resourceId"
                                    title="Risorsa"
                                    type="text"
                                    placeholder="Risorsa"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                            <div className="ml-4 md:w-1/2">
                                <InputForm2
                                    title="Commessa"
                                    name="number"
                                    type="text"
                                    placeholder="Commessa"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                            <div className="ml-4 md:w-1/2">
                                <InputForm2
                                    title="Ordine"
                                    name="orderId"
                                    type="number"
                                    placeholder="Ordine"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                        </div>
                        <div className="ml-4 md:w-full">
                                <InputForm2
                                    title="Note"
                                    name="note"
                                    type="text"
                                    placeholder="Note"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                        
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-700 focus:outline-none focus:shadow-outline"
                                onClick={handleFormSubmit}
                            >
                                Salva
                            </button>
                            <button
                                type="button"
                                className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                                onClick={handleModalClose}
                            >
                                Annulla
                            </button>
                        </div>
                    </div>
                </div>
            </FormProvider>
        </Modal>
    );
};

export default TimesheetModal;
