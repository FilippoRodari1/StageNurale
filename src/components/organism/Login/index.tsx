import { useState } from 'react';
import InputForm2 from '../../molecules/inputForm2';
import Button from '../../atoms/buttom';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API, LOGIN, BASE, V1, AUTH, CUSTOMERS } from '../../../utils/constants';
import { addTokenCookies } from '../../../utils/Helpers';
import RecoverPassword from './passwordDimenticata';

interface PropsData {
  email: string;
  password: string;
}

const Login = () => {
    const [showPopup, setShowPopup] = useState(false);
    const methods = useForm<PropsData>();
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.toLowerCase());
    };

    const onSubmit: SubmitHandler<PropsData> = async (data) => {
        const { email, password } = data;

        if (!email) {
            methods.setError('email', { type: 'required', message: "L'Email è richiesta." });
            return;
        } else if (!validateEmail(email)) {
            methods.setError('email', { type: 'invalid', message: 'Inserisci una email valida.' });
            return;
        }

        if (!password) {
            methods.setError('password', { type: 'required', message: 'La Password è richiesta.' });
            return;
        } else if (password.length < 6) {
            methods.setError('password', { type: 'minLength', message: 'La password deve essere di almeno 6 caratteri.' });
            return;
        }

        try {
            const response = await fetch( `${BASE}${API}${V1}${AUTH}${LOGIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                const token = userData.user.stsTokenManager.accessToken;
                const refreshToken = userData.user.stsTokenManager.refreshToken;
                addTokenCookies({ token, refreshToken });
                navigate(CUSTOMERS);
                console.log(token, refreshToken);
                return console.log(userData);
            } 
        
        } catch (error) {
            console.error('Error during the call:', error);
        }
    };

    return (
        <FormProvider {...methods}>
            <div>
                <div className="absolute top-1/2 left-24 transform -translate-y-1/2 mt-6">
                    <div className="mb-3">
                        <img src='/src/img/title.png' alt="Logo" className='absolute w-[356px] h-[100px] top-[-100px] left-[-5px] p-[5.76px_5.8px] gap-0' />
                    </div>
                    
                    <div className="mb-5">
                        <hr className='border-black'/>
                    </div>

                    <div className="mb-2">
                        <InputForm2 title="Email" placeholder=" Inserisci Email" type="email" name="email" />
                    </div>
                    <div className="mb-2">
                        <InputForm2 title="Password" placeholder=" Inserisci Password" type="password" name="password" />
                    </div>
                    <div className="mb-3">
                        <h2 className="font-lato text-20 font-bold leading-24 text-center">
                            <span className="cursor-pointer" onClick={() => setShowPopup(true)}> Hai dimenticato la password?</span>
                        </h2>
                    </div>

                    <div className="mb-8">
                        <Button onClick={methods.handleSubmit(onSubmit)} className={''}>
                            <div className="w-80 h-12 gap-0 rounded-l-[15px] rounded-r-[15px] font-bold leading-24 text-center bg-pink-500 text-zinc-50 text-3xl hover:bg-pink-400 transition duration-300 transform-none cursor-pointer">Accedi</div>
                        </Button>
                    </div>

                    <div className="mb-8">
                        <h2 className="font-lato text-20 font-bold leading-24 text-center">Non sei ancora registrato? <span className="text-pink-500">Registrati</span></h2>
                    </div>

                    <div className="mb-2">
                        <Button type="button" className={''}>
                            <div className="font-lato text-20 font-bold leading-24 text-center">Accedi con Google</div>
                        </Button>
                    </div>

                    <Button type="button" className={''}>
                        <div className="font-lato text-20 font-bold leading-24 text-center">Accedi con Facebook</div>
                    </Button>
                </div>
            </div>    
            <div className='fixed inset-0 bg-gradient-to-l from-purple-500 to-pink-500 flex items-center justify-center ml-[550px]'>
                <img src='/src/img/GroupWhite.png' alt="Logo" className='relative w-[800px] h-[800px] top-[-10px] left-[50px] p-64 gap-0' />
            </div>

            {showPopup && <RecoverPassword onClose={() => setShowPopup(false)} />}
        </FormProvider>
    );
};

export default Login;
