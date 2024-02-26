import {PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useSetItem from "../../../hooks/useSetItem.js";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../../api/api.js";
import {createBusiness} from "../../../features/businessSlice.js";

export default function CreateBusinessPage() {

    const [firstName, setFirstName] = useSetItem();
    const [lastName, setLastName] = useSetItem();
    const [companyName, setCompanyName] = useSetItem();
    const [description, setDescription] = useSetItem();
    const [services, setServices] = useState();
    const [type, setType] = useState('');
    const [email, setEmail] = useSetItem();
    const [street, setStreet] = useSetItem();
    const [zip, setZip] = useSetItem();
    const [city, setCity] = useSetItem();
    const [country, setCountry] = useSetItem();
    const [website, setWebsite] = useSetItem();
    const [phone, setPhone] = useSetItem();
    const [backgroundImage, setBackgroundImage] = useState();
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validAccessToken = useSelector((store) => store.user.validAccessToken)


    const handleBackgroundImageUpload = (e) => {
        const fileForBackgroundImage = e.target.files[0];
        setBackgroundImage(fileForBackgroundImage)
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setAvatar(file)
    }
    const handleAddServicesType = (e) => {
        if (e && e.target && e.target.value) {
            console.log(e.target.value)
            setServices(e.target.value);
        }
    };
    const handleCreateBusiness = async (e) => {
        e.preventDefault()

        let formdata = new FormData();
        if (type === 'Individual') {
            formdata.append("company_name", "Individual");
            formdata.append("first_name", firstName);
            formdata.append("last_name", lastName);

        } else if (type === 'Company') {
            formdata.append("company_name", companyName);
            formdata.append("first_name", 'Company');
            formdata.append("last_name", 'Company');
        }
        formdata.append("description", description);
        formdata.append("services", services);
        formdata.append("type", type);
        formdata.append("email", email);
        formdata.append("street", street);
        formdata.append("zip", zip);
        formdata.append("city", city);
        formdata.append("country", country);
        formdata.append("website", website);
        formdata.append("phone", phone);


        if (backgroundImage) {
            formdata.append("background_image", backgroundImage);
        }
        avatar && formdata.append("avatar", avatar, avatar.name);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            };
            const response = await api.post('/businesses/create/', formdata, config)
            console.log(response.data)
            dispatch(createBusiness(response.data))
            navigate('/')
        } catch (error) {
            console.log(error)

        }
    }


    const handleChooseFile = () => {
        document.getElementById('fileInput').click();
    };

    const [isUsePersonalInfoClicked, setIsUsePersonalInfoClicked] = useState(false)

    const handleBusinessType = (e) => {
        setType(e.target.value)
    }

    const togglePersonalInfoClicked = () => {
        setIsUsePersonalInfoClicked(!isUsePersonalInfoClicked);

        // If personal info checkbox is clicked, fill the form with user's info
        if (!isUsePersonalInfoClicked) {
            // Assuming you have access to the user's information, you can set the values accordingly
            // Replace the placeholders with the actual user information
            setFirstName("User's First Name");
            setLastName("User's Last Name");
            setEmail("user@example.com");
            setStreet("User's Street Address");
            setCity("User's City");
            setZip("User's ZIP Code");
            setCountry("User's Country");
            setWebsite("User's Website");
            setPhone("User's Phone Number");
        } else {
            // If the personal info checkbox is unchecked, clear the form fields
            setFirstName("");
            setLastName("");
            setEmail("");
            setStreet("");
            setCity("");
            setZip("");
            setCountry("");
            setWebsite("");
            setPhone("");
        }
    };


    return (
        <form style={{width: '34.875rem', paddingTop: '3rem', paddingBottom: '3rem'}}>
            <div className="space-y-12">
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-white'>
                        Create a professional account
                    </h2>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                                Company or Individual?
                            </label>
                            <div className="mt-2">
                                <select
                                    onChange={handleBusinessType}
                                    id="type"
                                    name="type"
                                    className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value=''>Select business type...</option>
                                    <option value='Company'>Company</option>
                                    <option value='Individual'>Individual</option>
                                </select>
                            </div>
                        </div>


                        <div style={{display: type !== 'Individual' && 'none', alignItems: 'center'}}
                             className="mt-8  flex sm:col-span-3 gap-3">
                            <label htmlFor="pro-account"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                            </label>
                            {/*<input onChange={togglePersonalInfoClicked} type="checkbox" className="checkbox"/>*/}
                        </div>


                    </div>

                </div>

                <div style={{display: (isUsePersonalInfoClicked || type === '') && 'none'}}>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="services"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Type of Services
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={handleAddServicesType}
                                        id="services"
                                        name="services"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value=''>Select Service...</option>
                                        <option value='Repair'>Repair</option>
                                        <option value='Operator'>Operator</option>
                                        <option value='Instructor'>Instructor</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div style={{display: type !== 'Individual' && 'none'}} className="sm:col-span-3">
                                <label htmlFor="firstName"
                                       className="block text-sm font-medium leading-6 text-white">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setFirstName}
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        autoComplete="given-name"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div style={{display: type !== 'Individual' && 'none'}} className="sm:col-span-3">
                                <label htmlFor="last-name"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setLastName}
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div style={{display: type !== 'Company' && 'none'}}
                                 className="sm:col-span-3 border-5 border-black">
                                <div>
                                    <label htmlFor="last-name"

                                           className="block text-sm font-medium leading-6 text-white">
                                        Business name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={setCompanyName}
                                            type="text"
                                            name="business-name"
                                            id="business-name"
                                            autoComplete="business-name"
                                            className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>


                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setEmail}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-white">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setCountry}
                                        type="text"
                                        name="country"
                                        id="country"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div className="sm:col-span-3">
                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-white">
                                    Website
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setWebsite}
                                        type="text"
                                        name="website"
                                        id="website"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div className="sm:col-span-3">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-white">
                                    Phone
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setPhone}
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div className="col-span-3">
                                <label htmlFor="street-address"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setStreet}
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setCity}
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="zip"
                                       className="block text-sm font-medium leading-6 text-white">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setZip}
                                        type="text"
                                        name="zip"
                                        id="zip"
                                        autoComplete="zip"
                                        className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="description"
                                       className="block text-sm font-medium leading-6 text-white">
                                    About
                                </label>
                                <div className="mt-2">
                <textarea
                    onChange={setDescription}
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-white">Write a few sentences about your
                                    business.</p>
                            </div>

                            <div style={{display: type !== 'Individual' && 'none'}} className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-white">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true"/>
                                    <input
                                        type='file'
                                        id='fileInput'
                                        accept='image/*'
                                        style={{display: 'none'}}
                                        onChange={handleImageUpload}
                                    />
                                    <label htmlFor='fileInput' className='UploadImage'></label>

                                    <button
                                        onClick={handleChooseFile}
                                        type="button"
                                        className='flex w-[150px] justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                    >
                                        Add Image
                                    </button>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="backgroundImage"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Background Image
                                </label>
                                <div
                                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                                        <div className="mt-4 flex-column text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className='flex w-[150px] justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                            >
                                                <span>Upload an Image</span>
                                                <input
                                                    onChange={handleBackgroundImageUpload}
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"/>
                                            </label>
                                            <p className="pl-1 text-white">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-white">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to='/'>
                    <button type="button"
                            className='flex w-[270px] justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Cancel
                    </button>
                </Link>
                <button
                    onClick={handleCreateBusiness}
                    type="submit"
                    className='flex w-[270px] justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                    Save
                </button>

            </div>
        </form>
    )
}
