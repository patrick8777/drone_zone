import {UserCircleIcon} from '@heroicons/react/24/solid'
import {useState} from "react";
import useSetItem from "../../../hooks/useSetItem.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {api} from "../../../api/api.js";
import {loadUser} from "../../../features/userSlice.js";
import default_user from "../../../assets/images/default_user.png";

export default function VerificationPage() {
    const [nextClicked, setNextClicked] = useState(false)
    const toggleNextClicked = (e) => {
        e.preventDefault()
        setNextClicked(!nextClicked)
    }

    const [email, setItemValueEmail] = useSetItem();
    const [code, setItemValueCode] = useSetItem();
    const [username, setItemValueUsername] = useSetItem();
    const [password, setItemValuePassword] = useSetItem();
    const [password_repeat, setItemValuePasswordRepeat] = useSetItem();
    const [first_name, setItemValueFirstName] = useSetItem();
    const [last_name, setItemValueLastName] = useSetItem();
    const [street, setItemValueStreet] = useSetItem();
    const [zip, setItemValueZip] = useSetItem();
    const [about, setItemValueAbout] = useSetItem();
    const [city, setItemValueCity] = useSetItem();
    const [country, setItemValueCountry] = useSetItem();
    const [my_drones, setMyDrones] = useSetItem();
    const [interests, setInterests] = useSetItem();
    const [phone, setItemValuePhone] = useSetItem();
    const [temp_avatar, setTempAvatar] = useState(default_user)
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
        setTempAvatar(URL.createObjectURL(e.target.files[0]));
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };


    const handleValidateCode = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('email', email);
        formData.append('username', username);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('street', street);
        formData.append('zip', zip);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('about', about);
        formData.append('my_drones', my_drones);
        formData.append('interests', interests);
        formData.append('phone', phone);
        formData.append('code', code);
        formData.append('avatar', avatar, avatar.name);
        formData.append('password', password);
        formData.append('password_repeat', password_repeat);
        if (password === password_repeat) {
            setError('')
            try {
                setError('')
                const response = await api.patch('/registration/validate/', formData)
                dispatch(loadUser(response.data))
                navigate('/login')
            } catch (error) {
                console.log(error)
                setError('Code not validated.')
            }
        } else {
            setError("Passwords entered don't match.")
        }
    }


    return (
        <>
            <form style={{display: nextClicked && 'none', width: '35rem', paddingTop: '3rem', paddingBottom: '3rem'}}>
                <div className="space-y-6">
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                        <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-white'>
                            Create an account
                        </h2>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="code"
                                       className="block text-sm font-medium leading-6 text-gray-900 text-white">
                                    Verification Code
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueCode}
                                        type="text"
                                        name="code"
                                        id="code"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="username"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueUsername}
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="phone"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Phone
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValuePhone}
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        autoComplete="phone"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="email"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueEmail}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium leading-6 text-white">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueFirstName}
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueLastName}
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="about"
                                       className="block text-sm font-medium leading-6 text-white">
                                    About
                                </label>
                                <div className="mt-2">
                <textarea
                    id="about"
                    onChange={setItemValueAbout}
                    name="about"
                    rows={3}
                    className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-white">Write a few sentences about
                                    yourself.</p>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="photo"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Profile Picture
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <div className="z-1000 avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="avatar"
                                                 src={temp_avatar ? temp_avatar : default_user}/>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{display: 'none'}}
                                        onChange={handleFileChange}
                                    />
                                    <button
                                        onClick={handleButtonClick}
                                        type="button"
                                        className='flex w-full justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                        Add Picture
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button"
                            className='flex w-full justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Cancel
                    </button>
                    <button
                        onClick={toggleNextClicked}
                        type="submit"
                        className='flex w-full justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Next
                    </button>
                </div>
            </form>
            <form style={{
                display: nextClicked === false && 'none',
                width: '35rem',
                paddingTop: '3rem',
                paddingBottom: '3rem'
            }}>
                <div className="space-y-6">
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                        <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-white'>
                            Create an account
                        </h2>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="interests"
                                       className="block text-sm font-medium leading-6 text-white">
                                    My interests (separate with ",")
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        onChange={setInterests}
                                        name="interests"
                                        id="interests"
                                        autoComplete="interests"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="my_drones"
                                       className="block text-sm font-medium leading-6 text-white">
                                    My drones (separate with ",")
                                </label>
                                <div className="mt-3">
                                    <input
                                        onChange={setMyDrones}
                                        type="text"
                                        name="my_drones"
                                        id="my_drones"
                                        autoComplete="my_drones"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="street-address"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueStreet}
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="zip"
                                       className="block text-sm font-medium leading-6 text-white">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueZip}
                                        type="text"
                                        name="zip"
                                        id="zip"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueCity}
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueCountry}
                                        type="text"
                                        name="country"
                                        id="country"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValuePassword}
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="password_repeat"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Password Repeat
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValuePasswordRepeat}
                                        type="password"
                                        name="password_repeat"
                                        id="password_repeat"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button onClick={toggleNextClicked} type="button"
                            className='flex w-full justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Back
                    </button>
                    <button
                        onClick={handleValidateCode}
                        type="submit"
                            className='flex w-full justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Submit
                    </button>
                </div>
                <div style={{color: 'red'}} className='LoginError'>{error}</div>
            </form>
        </>
    )
}
