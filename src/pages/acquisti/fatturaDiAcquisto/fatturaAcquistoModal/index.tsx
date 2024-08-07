import { FormProvider, useForm } from "react-hook-form";
import Modal from "../../../../components/atoms/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationsSchemaFatturaAcquisto } from "../../../../validations";
import InputForm2 from "../../../../components/molecules/inputForm2";
import { PurchaseInvoice } from "../../../../store/acquisti/types";
import InputFormFornitore from "../../../../components/molecules/InputForm/inputFormFornitore";
import { SuppliersData, fetchCustomers, fetchSuppliers, getCustomersData, useAppDispatch } from "../../../../store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import InputFormTipoDiPagamento from "../../../../components/molecules/InputForm/inputFormCliente/inputFormTipoDiPagamento";

interface FatturaAcquistoModalProps {
    open: boolean;
    handleModalClose: () => void;
    handleSave: (data: PurchaseInvoice) => void;
    editingId: number | null;
    darkMode: boolean;
}

const FatturaAcquistoModal = ({ open, handleModalClose, handleSave, editingId, darkMode }: FatturaAcquistoModalProps) => {
    const methods = useForm<PurchaseInvoice>({ resolver: zodResolver(validationsSchemaFatturaAcquisto) });
    const dispatch = useAppDispatch();

    const supplier = useSelector(SuppliersData);
    const tipoPagamento = useSelector(getCustomersData)
    

    useEffect(() => {
        dispatch(fetchSuppliers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);



    const handleFormSubmit = async () => {
        const isValid = await methods.trigger();
        if (isValid) {
            const data = methods.getValues();
            const PurchaseInvoiceData: PurchaseInvoice = {
                ...data,
                supplierId: Number(data.supplierId),
                typeOfPaymentId: Number(data.typeOfPaymentId),
                netValue: Number(data.netValue),
                vatValue: Number(data.vatValue),
                grossValue: Number(data.grossValue),
            };
            handleSave(PurchaseInvoiceData);
            methods.reset();
        }
    };

    return (
        <Modal show={open} className={`fixed inset-0 flex z-50 ${darkMode ? 'dark:bg-gray-900 bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                    <h2 className={`text-xl font-extrabold font-lato mb-4 mx-4 text-left ${darkMode ? 'text-pink-500' : 'text-pink-500'}`}>
                        {editingId ? 'Modifica Fattura di acquisto ' : 'Aggiungi nuova fattura acquisto'}
                    </h2>
                    <div className="h-full w-full">
                        <div className={`h-full flex flex-col border border-solid rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                            <div className="flex flex-col md:flex-row mt-[50px]">
                                <div className="ml-4 md:w-3/5">
                                    <InputForm2 title="Numero Fattura" name="code" type="number" placeholder="Numero Fattura" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                                <div className="ml-4 md:w-3/5">
                                    <InputForm2 name="operationDate" title="Data" type="date" placeholder="Data" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                                <div className="ml-4 md:w-3/5">
                                    <InputFormFornitore name="supplierId" title="Fornitore" type="text" placeholder="Fornitore" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} suppliers={supplier} />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row mt-[5px]">
                                <div className="md:w-full md:pl-4">
                                    <InputFormTipoDiPagamento title="Tipo di pagamento" name="typeOfPaymentId" type="number" placeholder="Tipo di pagamento" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} customers={tipoPagamento} />
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

export default FatturaAcquistoModal;
