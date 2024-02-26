import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import useSetItem from "../../../hooks/useSetItem.js";
import {useEffect, useState} from "react";
import {api} from "../../../api/api.js";
import {loadUser, login} from "../../../features/userSlice.js";

export default function SignInPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, handleEmailLogin] = useSetItem()
    const [password, handlePasswordLogin] = useSetItem()
    const [loginError, setLoginError] = useState('')
    const [validAccessToken, setValidAccessToken] = useState(null)

    const fetchUser = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${validAccessToken}`,
                },
            };
            const response = await api.get("/users/me/", config);
            const resolvedData = response.data;

            dispatch(loadUser(resolvedData));
            // console.log("resolved data from api", resolvedData);
            navigate('/')
        } catch (error) {
            console.error("We could not retrieve your profile details...", error);
            navigate('/login')
        }
    }


    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        let userLogin = {email, password}
        try {
            const response = await api.post('/auth/token/', userLogin)
            localStorage.setItem('accessToken', response.data.access)
            dispatch(login(response.data.access))
            setValidAccessToken(response.data.access)
            // console.log(response)
            setLoginError('')

        } catch (error) {
            setLoginError('Login failed.')
            console.log(error)
        }
    }
    useEffect(() => {
        if (validAccessToken !== null) {
            fetchUser()
        }

    }, [validAccessToken]);

    return (
        <div style={{marginTop: '8rem'}} className='flex min-h-full flex-col px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-white'>
                    Sign in to your account
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
                                id='email'
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                className='block w-full rounded-full border-0 py-1.5 ring-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                onChange={handleEmailLogin}
                            />
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center justify-between'>
                            <label
                                htmlFor='password'
                                className='block text-sm font-medium leading-6 text-white'>
                                Password
                            </label>
                        </div>
                        <div className='mt-2'>
                            <input
                                onChange={handlePasswordLogin}
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                required
                                className='block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleLoginSubmit}
                            type='submit'
                            className='flex w-full justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                            SIGN IN
                        </button>
                        <div style={{color: 'red', marginTop: '2rem'}} className='LoginError'>{loginError}</div>
                    </div>
                </form>
            </div>
        </div>
    )
}
