import ProfileSidebar from "../../side_bar/profile_sidebar.jsx";
import ImageCard from "../../cards/image_card.jsx";
import ScrollImageCard from "../../cards/scroll_image_card.jsx";
import {useEffect, useState} from "react";
import {api} from "../../../api/api.js";
import useSetItem from "../../../hooks/useSetItem.js";
import {useDispatch, useSelector} from "react-redux";
import {loadGallery, createGalleryPost} from "../../../features/gallerySlice.js";

export default function ProfileGalleryPage() {

    const dispatch = useDispatch()
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isAddFileShowing, setIsAddFileShowing] = useState(false)
    const [text_content, setTextContent] = useSetItem()
    const [drone, setDrone] = useSetItem()
    const [privateView, setPrivateView] = useState(false)
    const userID = useSelector((state) => state.user.selected_user.id)
    const profile_gallery = useSelector((state) => state.gallery.galleries)?.filter((gallery) => gallery.user?.id === userID)
    const validAccessToken = useSelector((state) => state.user.validAccessToken);
    const loggedUser = useSelector((state) => state.user.userData)

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles([...selectedFiles, ...files]);
    };


    const handleCreateGalleryPost = async () => {
        try {
            const formData = new FormData();
            formData.append('text_content', text_content);
            formData.append('drone', drone);
            formData.append('private', privateView)
            if (selectedFiles) {
                for (const file of selectedFiles) {
                    formData.append('images', file, file.name);
                }
            }
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${validAccessToken}`,
                },
            };
            const response = await api.post(`/galleries/create/`, formData, config);
            dispatch(createGalleryPost(response.data))
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const togglePrivateView = () => {
        setPrivateView(!privateView)
    }


    const toggleIsAddFileShowing = () => {
        setIsAddFileShowing(!isAddFileShowing)
    }

    const toggleIsAddFileShowingAndCancel = () => {
        setSelectedFiles([])
        setIsAddFileShowing(!isAddFileShowing)
        setPrivateView(false)
    }

    const fetchGallery = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                },
            };
            const response = await api.get(`/galleries/`, config);
            dispatch(loadGallery(response.data))
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchGallery()
    }, []);


    const profile_gallery_filtered = profile_gallery && profile_gallery.filter((gallery) => {
        if (userID !== loggedUser.id && gallery.private) {
            return false
        } else if (userID !== loggedUser.id && !gallery.private) {
            return true
        } else if (userID === loggedUser.id) {
            return true
        }
        return false
    })


    return (
        <>
            <ScrollImageCard/>
            <div className='fixed flex-col w-full z-50' style={{
                backgroundColor: 'rgba(15,23,42, 0.95)',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100% - 7rem)',
                display: isAddFileShowing ? 'flex' : 'none',
                flex: '1'
            }}>
                <div style={{justifyContent: 'flex-start', zIndex: 50}}
                     className='p-3 flex flex-col h-fit w-[35rem] mt-[-4rem] rounded-md bg-white'>
                    <label
                        htmlFor="uploadFile1"
                        style={{marginLeft: '0'}}
                        className='flex w-1/3 justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-black shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 mr-2 fill-black inline"
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
                            id="uploadFile1"
                            className="hidden"
                            onChange={handleFileChange}
                            multiple
                        />
                    </label>
                    {selectedFiles.length > 0 && (
                        <ul className="mt-3 text-sm text-neutral text-black">
                            {selectedFiles.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    )}
                    <div className='flex flex-col '>
                        <div style={{display: selectedFiles.length === 0 && 'none', alignItems: 'center'}}
                             className='mt-[5rem] flex gap-3'>
                            <div className='w-[50%] flex flex-col'>
                                <label htmlFor="drone-type"
                                       className="block text-sm font-medium leading-6 text-black m-1">
                                    Which drone did you use?
                                </label>
                                <input
                                    onChange={setDrone}
                                    type="text"
                                    name="drone-type"
                                    id="drone-type"
                                    className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className='w-[50%] flex flex-col'>
                                <label htmlFor="category-type"
                                       className="text-sm bold block leading-6 text-black m-1">
                                    Description
                                </label>
                                <input
                                    onChange={setTextContent}
                                    type="text"
                                    name="category-type"
                                    id="category-type"
                                    className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div style={{marginTop: selectedFiles.length === 0 && '5rem', alignItems: 'center'}}
                             className='justify-end mt-[1rem] flex gap-3'>
                            <label style={{justifyContent: 'left'}}
                                   className="p-0 h-fit flex flex-1 gap-3 label cursor-pointer ">
                                <input type="checkbox"
                                       checked={privateView && 'checked'}
                                       onClick={togglePrivateView}
                                       className="checkbox hover:border-neutral border-neutral "/>
                                <span style={{fontWeight: 'normal'}}
                                      className="label-text text-black">Do not post in public gallery</span>
                            </label>
                            <button
                                onClick={toggleIsAddFileShowingAndCancel}
                                type="button"
                                className='flex w-1/3 justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-black shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    toggleIsAddFileShowingAndCancel();
                                    handleCreateGalleryPost();
                                }}
                                style={{display: selectedFiles.length === 0 && 'none'}}
                                type="submit"
                                className='flex w-1/3 justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-black shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div style={{paddingLeft: '23rem', justifyContent: 'left', width: '100vw'}} className='flex '>
                <div style={{zIndex: '25'}}>
                    <ProfileSidebar/>
                </div>
                <div style={{width: 'calc(100%-20rem)', alignItems: 'left'}}
                     className='mt-10 flex flex-col'>
                    <button
                        onClick={toggleIsAddFileShowing}
                        type="button"
                        className='flex w-56 justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Add Files
                    </button>
                    <div className='mt-10 pb-[5rem] flex gap-10 flex-wrap'>
                        {profile_gallery_filtered && profile_gallery_filtered.map((gallery, index) => (<ImageCard
                            key={index}
                            id={gallery.id}
                            drone={gallery.drone}
                            // text_content={gallery.text_content}
                            images={gallery.images}
                            user={gallery.user}
                            favourite={gallery.favourite}
                            private_gallery={gallery.private}
                        />))}
                    </div>
                </div>
            </div>
        </>
    )
}