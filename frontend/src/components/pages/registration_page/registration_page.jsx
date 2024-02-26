import useSetItem from "../../../hooks/useSetItem.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loadUser} from "../../../features/userSlice.js";
import {api} from "../../../api/api.js";

export default function RegistrationPage() {
    const [email, setItemValueEmail] = useSetItem();
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleUserRegistration = async (e) => {
        e.preventDefault()
        try {
            const config = {headers: {"Content-Type": "application/json"}}
            const response = await api.post('/registration/', {email: email}, config)
            console.log('here', response)
            setLoginError('')
            dispatch(loadUser({email}))
            navigate('verification/')
        } catch (error) {
            console.log(error)
            setLoginError('Registration failed.')
        }
    }


    return (
        <div style={{marginTop: '8rem'}} className='flex min-h-full flex-col px-6 py-12 lg:px-8'>
            <div style={{minWidth: '252.875px'}} className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-white'>
                    Sign Up
                </h2>

            </div>
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form className='space-y-6' action='#' method='POST'>
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium leading-6 text-white'>
                            Email address
                        </label>
                        <div className='mt-2'>
                            <input
                                onChange={setItemValueEmail}
                                id='email'
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                className='block w-full rounded-full border-0 py-1.5 ring-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div>

                        <button
                            onClick={handleUserRegistration}
                            type='submit'
                            className='flex w-full justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                            Submit
                        </button>
                    </div>
                    <div style={{color: 'red'}} className='LoginError'>{loginError}</div>
                </form>
            </div>
        </div>
    )
}