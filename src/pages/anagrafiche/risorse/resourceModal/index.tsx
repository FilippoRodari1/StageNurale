import { FormProvider, useForm } from "react-hook-form";
import Modal from "../../../../components/atoms/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resources } from "../../../../store/resources/types";
import { validationsSchemaResource } from "../../../../validations";
import InputForm2 from "../../../../components/molecules/inputForm2";
import { SuppliersData, fetchSuppliers, useAppDispatch } from "../../../../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import InputFormFornitore from "../../../../components/molecules/InputForm/inputFormFornitore";

interface ResourcesModalProps {
    open: boolean;
    handleModalClose: () => void;
    handleSave: (data: Resources) => void;
    editingId: number | null;
    darkMode: boolean;
}

const ResourcesModal = ({ open, handleModalClose, handleSave, editingId, darkMode }: ResourcesModalProps) => {
    const methods = useForm<Resources>({ resolver: zodResolver(validationsSchemaResource) });
    const dispatch = useAppDispatch();

    const suppliers = useSelector(SuppliersData);

    useEffect(() => {
        dispatch(fetchSuppliers());
    }, [dispatch]);

    const handleFormSubmit = async () => {
        const isValid = await methods.trigger();
        if (isValid) {
            const data = methods.getValues();
            handleSave(data);
            methods.reset();
        }
    };

    return (
        <Modal show={open} className={`fixed inset-0 flex z-50 ${darkMode ? 'dark:bg-gray-900 bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}>
            <FormProvider {...methods}>
                <h2 className={`text-xl font-extrabold font-lato mb-4 mx-4 text-left ${darkMode ? 'text-pink-500' : 'text-pink-500'}`}>
                    {editingId ? 'MODIFICA RISORSE' : 'AGGIUNGI NUOVA RISORSA'}
                </h2>
                <div className="h-full w-full">
                    <div className={`h-full flex flex-col border border-solid rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                        <div className="flex flex-col md:flex-row mt-[50px]">
                            <div className="ml-4 md:w-3/5">
                                <InputForm2 title="Nome" name="firstName" type="text" placeholder="inserisci Nome" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                            </div>
                            <div className="ml-4 md:w-3/5">
                                <InputForm2 name="lastName" title="Cognome" type="text" placeholder="inserisci Cognome" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                            </div> 
                        </div>
                        <div className="flex flex-col md:flex-row mt-[5px]">
                            <div className="ml-4 md:w-3/5">
                                <InputForm2 title="Costo Or." name="hourCost" type="number" placeholder="€ 0,00" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                            </div>
                            <div className="ml-4 md:w-3/5">
                                <InputForm2 name="hourRevenue" title="Ricavo Or." type="number" placeholder="€ 0,00" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-[5px]">  
                            <div className="ml-4 md:w-full">
                                <InputForm2 title="CV" name="curriculumVitae" type="text" placeholder="inserisci Curriculum Vitae" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-[5px]">  
                            <div className="ml-4 md:w-3/5">
                                <InputFormFornitore name="supplierId" title="Fornitore" type="number" placeholder="fornitore" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} suppliers={suppliers} />
                            </div>
                            <div className="ml-4 md:w-full">
                                <InputForm2 title="Note" name="note" type="text" placeholder="Inserisci Note" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`} />
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
};

export default ResourcesModal;
