import { FormProvider, useForm } from "react-hook-form";
import Modal from "../../../../components/atoms/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchemaSkillResource } from "../../../../validations";
import InputForm2 from "../../../../components/molecules/inputForm2";
import { SkillResources } from "../../../../store/skillResource/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, fetchSkill, fetchSkillResource, getSkillResourceData, getSkillData } from "../../../../store";
import InputFormSkill from "../../../../components/molecules/InputForm/inputFormSkill";
import InputFormLivello from "../../../../components/molecules/InputForm/risorsaForm/inputFormLivello";
import InputFormSkillRisorsa from "../../../../components/molecules/InputForm/risorsaForm/inputFormRisorsa";

interface SkillResourceModalProps {
    open: boolean;
    handleModalClose: () => void;
    handleSave: (data: SkillResources) => void;
    editingId: number | null;
    darkMode: boolean;
}

const SkillResourcesModal = ({ open, handleModalClose, handleSave, editingId, darkMode }: SkillResourceModalProps) => {
    const methods = useForm<SkillResources>({ resolver: zodResolver(validationSchemaSkillResource) });
    const dispatch = useAppDispatch();

    const skill = useSelector(getSkillData);
    const level = useSelector(getSkillResourceData);
    const skillResource = useSelector(getSkillResourceData);

    useEffect(() => {
        dispatch(fetchSkill());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSkillResource());
    }, [dispatch]);

    const handleFormSubmit = async () => {
        const isError = await methods.trigger();
        if (!isError) {
            const data = methods.getValues();
            const skillResourceData: SkillResources = {
                ...data,
                skillId: parseInt(data.skillId as unknown as string),
                level: parseInt(data.level as unknown as string), 
            };
            handleSave(skillResourceData);
            methods.reset();
        }
    };

    return (
        <Modal show={open} className={`fixed inset-0 flex z-50 ${darkMode ? 'dark:bg-gray-900 bg-opacity-50' : 'bg-gray-900 bg-opacity-50'}`}>
            <FormProvider {...methods}>
                <h2 className={`text-xl font-extrabold font-lato mb-4 mx-4 text-left ${darkMode ? 'text-pink-500' : 'text-pink-500'}`}>
                    {editingId ? 'Modifica Skill per la risorsa' : 'Aggiungi nuova Skill per la risorsa'}
                </h2>
                <div className="h-full w-full">
                    <div className={`h-full flex flex-col border border-solid rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}>
                        <div className="flex flex-col md:flex-row mt-[50px]">
                            <div className="ml-4 md:w-3/5">
                                <InputFormSkillRisorsa title="Risorsa" name="resourceId" type="text" placeholder="Risorsa" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} skillsRisorse={skillResource} />
                            </div>
                            <div className="ml-4 md:w-3/5">
                                <InputFormSkill name="skillId" title="Skill" type="number" placeholder="Skill" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} skill={skill} />
                            </div> 
                            <div className="ml-4 md:w-3/5">
                                <InputFormLivello name="level" title="Livello" type="number" placeholder="Livello" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} skillsRisorse={level} />
                            </div> 
                        </div>
                        <div className="flex flex-col md:flex-row mt-[5px]">  
                            <div className="md:w-full md:pl-4">
                                <InputForm2 title="Note" name="note" type="text" placeholder="note" className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ' text-black border-gray-300'}`} />
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

export default SkillResourcesModal;
