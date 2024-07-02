import { FormProvider, useForm } from 'react-hook-form';
import Modal from '../../../../components/atoms/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationsSchemaScadenze } from '../../../../validations';
import InputForm2 from '../../../../components/molecules/inputForm2';
import { Scadenze } from '../../../../store/scadenze/types';

interface ScadenzeModalProps {
    open: boolean;
    handleModalClose: () => void;
    handleSave: (data: Scadenze) => void;
    editingId: number | null;
    darkMode: boolean;
}

const ScadenzeModal = ({ open, handleModalClose, handleSave, editingId, darkMode }: ScadenzeModalProps) => {
    
    const methods = useForm<Scadenze>({
        resolver: zodResolver(validationsSchemaScadenze)
    });

    const handleFormSubmit = async () => {
        const isError = await methods.trigger();
        if (!isError) {
            const data = methods.getValues();
            const scadenzeData: Scadenze = {
                ...data
            };
            handleSave(scadenzeData);
            methods.reset();
        }
    };

    return (
        <Modal show={open} className={`fixed inset-0 flex z-50 ${darkMode ? 'dark:bg-gray-900 bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}>
            <FormProvider {...methods}>
                <h2 className={`text-xl font-extrabold font-lato mb-4 mx-4 text-left ${darkMode ? 'text-pink-500' : 'text-pink-500'}`}>
                    {editingId ? 'Modifica Scadenza' : 'Aggiungi nuova scadenza'}
                </h2>
                <div className="h-full w-full">
                    <div className={`h-full flex flex-col border border-solid rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                        <div className="flex flex-col md:flex-row mt-[50px]">
                            <div className="ml-4 md:w-5/6">
                                <InputForm2
                                    title="Fattura d'acquisto"
                                    name="salesInvoiceId"
                                    type="number"
                                    placeholder="Fattura d'acquisto"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                            <div className="ml-4 md:w-5/6">
                                <InputForm2
                                    title="Fattura di vendita"
                                    name="purchasesInvoiceId"
                                    type="number"
                                    placeholder="Fattura di vendita"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4">
                            <div className="ml-4 md:w-full">
                                <InputForm2
                                    name="grossValue"
                                    title="Totale"
                                    type="number"
                                    placeholder="Totale"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4">
                        <div className="ml-4 md:w-1/2">
                            <InputForm2
                                name="scheduledDate"
                                title="Data Prevista"
                                type="date"
                                placeholder="Data Prevista"
                                className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                            />
                        </div>
                            <div className="ml-4 md:w-1/2">
                                <InputForm2
                                    name="paymentDate"
                                    title="Data pagamento"
                                    type="date"
                                    placeholder="Data pagamento"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4">
                            <div className="md:w-full md:pl-4">
                                <InputForm2
                                    title="Note"
                                    name="note"
                                    type="text"
                                    placeholder="Note"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-12 ml-12 mx-4">
                    <button
                        className={`mb-8 font-lato flex items-center justify-center px-4 py-1 rounded-lg ml-4 ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-800'}`}
                        onClick={handleModalClose}
                    >
                        Annulla
                    </button>
                    <button
                        onClick={handleFormSubmit}
                        className={`mb-8 font-lato flex items-center justify-center px-4 py-1 rounded-lg ml-4 ${darkMode ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white'}`}
                    >
                        Conferma
                    </button>
                </div>
            </FormProvider>
        </Modal>
    );
};

export default ScadenzeModal;
