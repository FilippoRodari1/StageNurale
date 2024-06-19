import React from 'react';
import InputForm2 from '../../../molecules/inputForm2';
import Button from '../../../atoms/buttom';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../../utils/constants';

interface PropsData {
  email: string;
}

interface RecoverPasswordPopupProps {
  onClose: () => void;
}

const RecoverPasswordPopup: React.FC<RecoverPasswordPopupProps> = ({ onClose }) => {
    const methods = useForm<PropsData>();
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.toLowerCase());
    };

    const onSubmit: SubmitHandler<PropsData> = async (data) => {
        const { email } = data;

        if (!email) {
            methods.setError('email', { type: 'required', message: "L'Email è richiesta." });
            return;
        } else if (!validateEmail(email)) {
            methods.setError('email', { type: 'invalid', message: 'Inserisci una email valida.' });
            return;
        }

        try {
            const response = await fetch(`${API}/recover-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Password recovery email sent:', result);
                onClose();
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during the call:', error);
        }
    };

    return (
        <FormProvider {...methods}>
            <div className='fixed inset-0 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center'>
                <div className="p-16 bg-white rounded-3xl shadow-lg">
                    <div className="mb-3 text-center">
                        <img src='/src/img/title.png' alt="Logo" className='w-80 h-20 mx-auto mb-4' />
                    </div>

                    <div className="mb-6">
                        <hr className='border-black mr-8 ml-8'/>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-center font-lato text-xl font-bold">Password dimenticata</h2>
                    </div>

                    <div className="mr-4 ml-4 mb-3">
                        <InputForm2 title="Email" placeholder=" Inserisci Email" type="email" name="email"/>
                    </div>

                    <div className="mr-4 ml-4 mb-3 justify-center">
                        <Button onClick={methods.handleSubmit(onSubmit)}>
                            <div className="w-80 h-12 rounded-l-[15px] rounded-r-[15px] font-bold leading-24 text-center bg-pink-500 text-zinc-50 text-xl hover:bg-pink-400 transition duration-300 transform-none cursor-pointer">Recupera Password</div>
                        </Button>
                    </div>

                    <div className="text-center">
                        <button onClick={onClose} className="font-bold font-lato">Torna alla pagina di login</button>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
};

export default RecoverPasswordPopup;
