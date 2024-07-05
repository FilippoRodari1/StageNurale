import { FormProvider, useForm } from "react-hook-form";
import Modal from "../../../../components/atoms/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchemaUser } from "../../../../validations";
import InputForm2 from "../../../../components/molecules/inputForm2";
import { User } from "../../../../store/utenti/types";
import { fetchResources, getResourceData, useAppDispatch } from "../../../../store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import InputFormRisorsa from "../../../../components/molecules/InputForm/inputFormRisorsa";

interface UserModalProps {
    open: boolean;
    handleModalClose: () => void;
    handleSave: (data: User) => void;
    editingId: number | null;
    darkMode: boolean;
}

const UserModal = ({ open, handleModalClose, handleSave, editingId, darkMode }: UserModalProps) => {
    const methods = useForm<User>({ resolver: zodResolver(validationSchemaUser) });
    const dispatch = useAppDispatch();
    const risorsa = useSelector(getResourceData);

    useEffect(() => {
        dispatch(fetchResources());
    }, [dispatch]);


    const generateRandomPassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?!#.;:';
        let newPassword = '';
        for (let i = 0; i < 8; i++) {
            newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        methods.setValue('password', newPassword);
        methods.setValue('passwordConfirm', newPassword);
    };

    const handleFormSubmit = async (data: User) => {
        const isValid = await methods.trigger();
        if (isValid) {
            handleSave({
                ...data,
                resourceId: Number(data.resourceId), 
                password: methods.getValues('password'),
                passwordConfirm: methods.getValues('passwordConfirm')
            });
            methods.reset();
        }
    };

    return (
        <Modal show={open} className={`fixed inset-0 flex z-50 ${darkMode ? 'dark:bg-gray-900 bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                    <h2 className={`text-xl font-extrabold font-lato mb-4 mx-4 text-left ${darkMode ? 'text-pink-500' : 'text-pink-500'}`}>
                        {editingId ? 'Modifica utente' : 'Aggiungi nuovo utente'}
                    </h2>
                    <div className="h-full w-full">
                        <div className={`h-full flex flex-col border border-solid rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                            <div className="flex flex-col md:flex-row mt-[50px]">
                                <div className="ml-4 md:w-3/5">
                                    <InputForm2 title="Email" name="email" type="text" placeholder="Email" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                                <div className="ml-4 md:w-3/5">
                                    <InputFormRisorsa title="Risorsa" name="resourceId" type="number" placeholder="Risorsa" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} resource={risorsa} />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row mt-[5px]">
                                <div className="md:w-full md:pl-4">
                                    <InputForm2 title="Nome" name="firstName" type="text" placeholder="Nome" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                                <div className="md:w-full md:pl-4">
                                    <InputForm2 title="Cognome" name="lastName" type="text" placeholder="Cognome" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row mt-[5px]">
                                <div className="md:w-full md:pl-4">
                                    <InputForm2
                                        title="Password"
                                        name="password"
                                        type="text"
                                        placeholder="Nurale2022!"
                                        className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`}
                                    />
                                </div>
                                <div className="ml-4 mt-6">
                                    <button onClick={generateRandomPassword} className={`justify-center text-center text-white bg-pink-500 px-4 py-2 rounded-xl`}>Genera</button>
                                </div>
                                <div className="md:w-full md:pl-4">
                                    <InputForm2
                                        title="Conferma Password"
                                        name="passwordConfirm"
                                        type="text"
                                        placeholder="Nurale2022!"
                                        className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`}
                                    />
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

export default UserModal;
