import { FormProvider, useForm } from "react-hook-form";
import Modal from "../../../../components/atoms/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchemaTypeOfPayments } from "../../../../validations";
import InputForm2 from "../../../../components/molecules/inputForm2";
import { TypeOfPayments } from "../../../../store/tipiDiPagamento/types";

interface TypeOfPaymentsModalProps {
    open: boolean;
    handleModalClose: () => void;
    handleSave: (data: TypeOfPayments) => void;
    editingId: number | null;
    darkMode: boolean;
}

const TypeOfPaymentsModal = ({ open, handleModalClose, handleSave, editingId, darkMode }: TypeOfPaymentsModalProps) => {
    const methods = useForm<TypeOfPayments>({ resolver: zodResolver(validationSchemaTypeOfPayments) });

    const handleFormSubmit = async () => {
        const isError = await methods.trigger();
        if (!isError) {
            const data = methods.getValues();
            const typeOfPaymentsData: TypeOfPayments = {
                ...data
            };
            handleSave(typeOfPaymentsData);
            methods.reset();
        }
    };

    const handleGenerateName = () => {
        methods.setValue("name", "30 gg d.f.");
    };

    return (
        <Modal show={open} className={`fixed inset-0 flex z-50 ${darkMode ? 'dark:bg-gray-900 bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}>
            <FormProvider {...methods}>
                <h2 className={`text-xl font-extrabold font-lato mb-4 mx-4 text-left ${darkMode ? 'text-pink-500' : 'text-pink-500'}`}>
                    {editingId ? 'Modifica Tipo di Pagamento' : 'Aggiungi nuovo Tipo di Pagamento'}
                </h2>
                <div className="h-full w-full">
                    <div className={`h-full flex flex-col border border-solid rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>   
                        <div className="flex flex-col md:flex-row mt-[50px]">
                            <div className="ml-4 md:w-5/6">
                                <InputForm2 title="Nome" name="name" type="text" placeholder="Nome" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`} />
                            </div>
                            <div className="ml-4 flex items-center">
                                <button className={`font-lato flex items-center justify-center px-4 py-1 rounded-lg ${darkMode ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white'}`} onClick={handleGenerateName}>
                                    Genera nome
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4">
                            <div className="ml-4 md:w-1/2">
                                <InputForm2 name="daysToFirstPayment" title="Giorni al primo pagamento" type="number" placeholder="Giorni al primo pagamento" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`} />
                            </div>
                            <div className="ml-4 md:w-1/2">
                                <InputForm2 name="daysBetweenPayments" title="Giorni tra i pagamenti" type="number" placeholder="30" className={` text-right appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`} />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4">
                            <div className="ml-4 md:w-1/2">
                                <InputForm2 name="numberOfPayments" title="Numero di pagamenti" type="number" placeholder="1" className={` text-right appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`} />
                            </div>
                            <div className="ml-4 md:w-1/2">
                                <InputForm2 name="daysOffsetPayments" title="Giorni scostamento pagamento" type="number" placeholder="Giorni scostamento pagamento" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`} />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4">
                            <div className="md:w-full md:pl-4">
                                <InputForm2 title="Note" name="note" type="text" placeholder="Note" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`} />
                            </div>
                        </div>
                        <div className=" ml-6 flex flex-col md:flex-row mt-4">
                            <div className=" mr-14 flex items-center">
                                <label className={`mr-14 ${darkMode ? 'text-white' : 'text-black'}`}>Spostare i pagamenti alla fine del mese</label>
                                <input type="checkbox" name="movePaymentsToTheEndOfMonth" className={`appearance-none rounded-full h-6 w-6 checked:bg-pink-500 border border-gray-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-12 ml-12 mx-4">
                    <button className={`mb-8 font-lato flex items-center justify-center px-4 py-1 rounded-lg ml-4 ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-800'}`} onClick={handleModalClose}>
                        Annulla
                    </button>
                    <button onClick={handleFormSubmit} className={`mb-8 font-lato flex items-center justify-center px-4 py-1 rounded-lg ml-4 ${darkMode ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white'}`}>
                        Conferma
                    </button>
                </div>
            </FormProvider>
        </Modal>
    );
}

export default TypeOfPaymentsModal;
