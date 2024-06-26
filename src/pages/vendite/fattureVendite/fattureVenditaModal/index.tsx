import { FormProvider, useForm } from "react-hook-form";
import Modal from "../../../../components/atoms/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationsSchemaFattureVendita } from "../../../../validations";
import InputForm2 from "../../../../components/molecules/inputForm2";
import { SalesInvoice } from "../../../../store/fattureVendite/types";

interface FattureVenditaModalProps {
    open: boolean;
    handleModalClose: () => void;
    handleSave: (data: SalesInvoice) => void;
    editingId: number | null;
    darkMode: boolean;
}

const FattureVenditaModal = ({ open, handleModalClose, handleSave, editingId, darkMode }: FattureVenditaModalProps) => {
    const methods = useForm<SalesInvoice>({ resolver: zodResolver(validationsSchemaFattureVendita) });
    const handleFormSubmit = async () => {
        const isValid = await methods.trigger();
        if (isValid) {
            const data = methods.getValues();
            const SalesInvoiceData: SalesInvoice = {
                ...data,
                customerId: Number(data.customerId),
                typeOfPaymentId: Number(data.typeOfPaymentId),
                netValue: Number(data.netValue),
                vatValue: Number(data.vatValue),
                grossValue: Number(data.grossValue),
            };
            handleSave(SalesInvoiceData);
            methods.reset();
        }
    };

    return (
        <Modal show={open} className={`fixed inset-0 flex z-50 ${darkMode ? 'dark:bg-gray-900 bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                    <h2 className={`text-xl font-extrabold font-lato mb-4 mx-4 text-left ${darkMode ? 'text-pink-500' : 'text-pink-500'}`}>
                        {editingId ? 'Modifica Fatture di Vendite' : 'Aggiungi nuova Fattura di vendita'}
                    </h2>
                    <div className="h-full w-full">
                        <div className={`h-full flex flex-col border border-solid rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                            <div className="flex flex-col md:flex-row mt-[50px]">
                                <div className="ml-4 md:w-3/5">
                                    <InputForm2 title="Numero Fattura" name="code" type="number" placeholder="Numero Fattura" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                                <div className="ml-4 md:w-3/5">
                                    <InputForm2 name="date" title="Data" type="date" placeholder="Data" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                                <div className="ml-4 md:w-3/5">
                                    <InputForm2 name="customerId" title="Clienti" type="text" placeholder="Clienti" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row mt-[5px]">
                                <div className="md:w-full md:pl-4">
                                    <InputForm2 title="Tipo di pagamento" name="typeOfPaymentId" type="number" placeholder="Tipo di pagamento" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                                <div className="md:w-full md:pl-4">
                                    <InputForm2 title="Stato" name="state" type="text" placeholder="Stato" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                            </div>
                            <div className="md:w-full md:pl-4">
                                <InputForm2 title="Note" name="note" type="text" placeholder="Note" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                            </div>
                            <div className="flex flex-col md:flex-row mt-[5px]">
                                <div className="md:w-full md:pl-4">
                                    <InputForm2 title="Imponibile" name="netValue" type="number" placeholder="Imponibile" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                                <div className="md:w-full md:pl-4">
                                    <InputForm2 title="IVA" name="vatValue" type="number" placeholder="IVA" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                                <div className="md:w-full md:pl-4">
                                    <InputForm2 title="Totale" name="grossValue" type="number" placeholder="€ 0,00" className={`text-right appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                            </div>
                            <div className="flex justify-end mt-auto ml-12 mx-4">
                                <button type="button" className={`mb-8 font-lato flex items-center justify-center px-4 py-1 rounded-lg ml-4 ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-800'}`} onClick={handleModalClose}>
                                    Annulla
                                </button>
                                <button type="submit" className={`mb-8 font-lato flex items-center justify-center px-4 py-1 rounded-lg ml-4 ${darkMode ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white'}`}>
                                    Conferma
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    );
}

export default FattureVenditaModal;
