import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import useSetItem from "../../../hooks/useSetItem.js";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../../api/api.js";
import {createEvents} from "../../../features/forumEventsSlice.js";

export default function CreateEventDiscussion() {

    const [isVirtualEventClicked, setIsVirtualEventClicked] = useState(false)
    const [isNextClicked, setIsNextClicked] = useState(false)

    const toggleIsVirtualEventClicked = () => {
        setIsVirtualEventClicked(!isVirtualEventClicked);
        setItemValueType(!isVirtualEventClicked); // Update the type based on isVirtualEventClicked
    }


    const toggleIsNextClicked = (e) => {
        e.preventDefault()
        setIsNextClicked(!isNextClicked)
    }

    const [type, setItemValueType] = useSetItem();
    const [category, setItemValueCategory] = useSetItem();
    const [link, setItemValueLink] = useSetItem();
    const [street, setItemValueStreet] = useSetItem();
    const [zip, setItemValueZip] = useSetItem();
    const [city, setItemValueCity] = useSetItem();
    const [country, setItemValueCountry] = useSetItem();
    const [event_date, setItemValueEventDate] = useSetItem();
    const [title, setItemValueTitle] = useSetItem();
    const [detail, setItemValueDetail] = useSetItem();

    const [selectedFile, setSelectedFile] = useState([]);


    const [error, setError] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validAccessToken = useSelector((store) => store.user.validAccessToken)

    const user = useSelector((store) => store.user.loadUser);

    const author = user ? {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
    } : null;

    const handleImagesUpload = (event) => {
        const file = event.target.files[0];
        console.log(event.target.files[0])
        if (file) {
            setSelectedFile([...selectedFile, file]);
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault()


        let formdata = new FormData();
        formdata.append("type", type);
        formdata.append("category", category);
        formdata.append("link", link);
        formdata.append("street", street);
        formdata.append("zip", zip);
        formdata.append("city", city);
        formdata.append("country", country);
        formdata.append("event_date", event_date);
        formdata.append("title", title);
        formdata.append("detail", detail);
        formdata.append("author", JSON.stringify(author));
        if (selectedFile) {
            for (const file of selectedFile) {
                formdata.append('images', file, file.name);
            }
        }


        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                }
            };
            setError('')
            const response = await api.post('events/create/', formdata, config)
            console.log(response.data)
            dispatch(createEvents(response.data))
            navigate('/events')
        } catch (error) {
            console.log(error)
            setError('Error creating event.')
        }
    }


    return (
        <form style={{width: '34.875rem', paddingTop: '3rem', paddingBottom: '3rem'}}>
            <div className="space-y-12">
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='text-center text-2xl font-bold leading-9 text-white tracking-tight ring-gray-300'>
                        Create an event
                    </h2>
                </div>
                <div style={{display: isNextClicked && 'none'}}>
                    <div className="border-b border-blue-500 pb-12">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="date"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Event Date
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueEventDate}
                                        type="date"
                                        name="date"
                                        id="date"
                                        autoComplete="date"
                                        className="block w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div style={{alignItems: 'center'}}
                                 className="mt-8 flex sm:col-span-3 gap-3">
                                <input onChange={toggleIsVirtualEventClicked} type="checkbox" className="checkbox border-none checkbox-info"/>
                                <label htmlFor="pro-account"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Virtual Event
                                </label>
                            </div>
                            <div className='col-span-full flex flex-col'>
                                <h2 style={{
                                    display: isVirtualEventClicked && 'none',
                                    marginBottom: '-1rem',
                                    marginTop: '1rem'
                                }} className="text-sm col-span-full font-semibold text-white">Event Address</h2>
                                <div style={{display: isVirtualEventClicked == false && 'none'}}
                                     className="col-span-full">
                                    <label htmlFor="event-link"
                                           className="block text-sm font-medium leading-6 text-white">
                                        Event Link
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={setItemValueLink}
                                            type="text"
                                            name="event-link"
                                            id="event-link"
                                            autoComplete="event-link"
                                            className="block w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={{display: isVirtualEventClicked && 'none'}} className="col-span-full">
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
                                        className="block w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div style={{display: isVirtualEventClicked && 'none'}}
                                 className="sm:col-span-2 sm:col-start-1">
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
                                        className="block w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div style={{display: isVirtualEventClicked && 'none'}} className="sm:col-span-2">
                                <label htmlFor="postal-code"
                                       className="block text-sm font-medium leading-6 text-white">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueZip}
                                        type="text"
                                        name="zip"
                                        id="zip"
                                        className="block w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div style={{display: isVirtualEventClicked && 'none'}} className="sm:col-span-2">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-white">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueCountry}
                                        type="text"
                                        name="country"
                                        id="country"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{display: isNextClicked === false && 'none'}} className="space-y-12">
                <div>
                    <div className="border-b border-blue-500 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="category"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Category
                                </label>
                                <div style={{height: "2rem"}} className="gap-3 flex mt-2">
                                    <p className='gap-2 flex text-white text-lg'>#</p>
                                    <input
                                        style={{
                                            border: "none",
                                            outline: 'none',
                                            paddingLeft: '1rem',
                                            paddingRight: '1rem',
                                            borderBottom: '1px solid rgb(224 224 224)'
                                        }}
                                        onChange={setItemValueCategory}
                                        type="category"
                                        name="category"
                                        id="category"
                                        autoComplete="category"
                                        className="block w-full rounded-full border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="title"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setItemValueTitle}
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="given-name"
                                        className="block w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="detail" className="block text-sm font-medium leading-6 text-white">
                                    Details
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        onChange={setItemValueDetail}
                                        style={{height: "6rem"}}
                                        id="detail"
                                        name="detail"
                                        rows={3}
                                        className="block w-full rounded-lg border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                            <label
                                htmlFor="uploadFileCreateEvent"
                                style={{marginLeft: '0'}}
                                className='flex w-[10rem] justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 mr-2 fill-white inline"
                                     viewBox="0 0 32 32">
                                    <path
                                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                        data-original="#000000"/>
                                    <path
                                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                        data-original="#000000"/>
                                </svg>
                                Upload Files
                                <input
                                    type="file"
                                    id="uploadFileCreateEvent"
                                    className="hidden"
                                    onChange={handleImagesUpload}
                                    multiple
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to='/events'>
                    <button style={{alignItems: 'center'}} type="button"
                            className="text-white flex-col flex w-[7rem] h-[2rem] justify-center rounded-full bg-transparent border border-blue-500 text-sm font-semibold shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Cancel
                    </button>
                </Link>
                <button
                    style={{justifyContent: 'center', alignItems: 'center', display: isNextClicked && 'none'}}
                    onClick={toggleIsNextClicked}
                    className="flex-col flex w-[7rem] h-[2rem] justify-center rounded-full bg-blue-500 border border-blue-500 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Next
                </button>
                <button
                    onClick={handleCreateEvent}
                    style={{alignItems: 'center', display: isNextClicked === false && 'none'}}
                    type="submit"
                    className="flex-col flex w-[7rem] h-[2rem] justify-center rounded-full bg-blue-500 border border-blue-500 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Post
                </button>

            </div>
        </form>

    )
}