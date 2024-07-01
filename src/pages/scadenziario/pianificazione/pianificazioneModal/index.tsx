import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Modal from '../../../../components/atoms/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationsSchemaPianificazione } from '../../../../validations';
import InputForm2 from '../../../../components/molecules/inputForm2';
import { Pianificazione } from '../../../../store/pianificazione/types';

interface PianificaizoneModalProps {
    open: boolean;
    handleModalClose: () => void;
    handleSave: (data: Pianificazione) => void;
    editingId: number | null;
    darkMode: boolean;
}

const PianificazioneModal = ({ open, handleModalClose, handleSave, editingId, darkMode }: PianificaizoneModalProps) => {
    
    const methods = useForm<Pianificazione>({
        resolver: zodResolver(validationsSchemaPianificazione)
    });
    
    const [formValues, setFormValues] = useState({
        netValue: 0,
        vatValue: 0,
        grossValue: 0
    });


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: parseFloat(value)
        });
    };

    const handleFormSubmit = async () => {
        const isError = await methods.trigger();
        if (!isError) {
            const data = methods.getValues();
            const pianificazioneData: Pianificazione = {
                ...data
            };
            handleSave(pianificazioneData);
            methods.reset();
        }
    };

    return (
        <Modal show={open} className={`fixed inset-0 flex z-50 ${darkMode ? 'dark:bg-gray-900 bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}>
            <FormProvider {...methods}>
                <h2 className={`text-xl font-extrabold font-lato mb-4 mx-4 text-left ${darkMode ? 'text-pink-500' : 'text-pink-500'}`}>
                    {editingId ? 'Modifica Valore pianificato' : 'Aggiungi nuovo Valore pianificato'}
                </h2>
                <div className="h-full w-full">
                    <div className={`h-full flex flex-col border border-solid rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                        <div className="flex flex-col md:flex-row mt-[50px]">
                            <div className="ml-4 md:w-5/6">
                                <InputForm2
                                    title="Categoria"
                                    name="valueCategory"
                                    type="text"
                                    placeholder="Categoria"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                            <div className="ml-4 md:w-5/6">
                                <InputForm2
                                    title="Descrizione"
                                    name="description"
                                    type="text"
                                    placeholder="Descrizione"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4">
                            <div className="ml-4 md:w-1/2">
                                <InputForm2
                                    name="startDate"
                                    title="Data Inizio"
                                    type="date"
                                    placeholder="Data inizio"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                            <div className="ml-4 md:w-1/2">
                                <InputForm2
                                    name="endDate"
                                    title="Data fine"
                                    type="date"
                                    placeholder="Data fine"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4">
                            <div className="ml-4 md:w-1/2">
                                <InputForm2
                                    name="daysBetween"
                                    title="Giorni Tra"
                                    type="number"
                                    placeholder="Giorni Tra"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                            <div className="ml-4 md:w-1/2">
                                <InputForm2
                                    name="fixedDay"
                                    title="Giorno fisso"
                                    type="number"
                                    placeholder="Giorno fisso"
                                    className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4">
                            <div className="ml-4 md:w-1/2">
                                <InputForm2
                                    name="netValue"
                                    title="Imponibile"
                                    type="number"
                                    placeholder="€ 0,00"
                                    className={` text-right appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="ml-4 md:w-1/2">
                                <InputForm2
                                    name="vatValue"
                                    title="Iva"
                                    type="number"
                                    placeholder="€ 0,00"
                                    className={` text-right appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="ml-4 md:w-1/2">
                                <InputForm2
                                    name="grossValue"
                                    title="Totale"
                                    type="number"
                                    placeholder="€ 0,00"
                                    value={formValues.grossValue.toFixed(2)}
                                    className={` text-right appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
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
                        <div className=" ml-6 flex flex-col md:flex-row mt-4">
                            <div className=" mr-14 flex items-center">
                                <label className={`mr-14 ${darkMode ? 'text-white' : 'text-black'}`}>Vendita</label>
                                <input
                                    type="checkbox"
                                    name="isSale"
                                    className={`appearance-none rounded-full h-6 w-6 checked:bg-pink-500 border border-gray-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'text-black border-gray-300'}`}
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

export default PianificazioneModal;
