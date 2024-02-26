import plus_sign from "../../assets/svgs/plus_sign.svg";
import ReplyCard from "./reply_card.jsx";
import arrow_back from '../../assets/svgs/arrow_back.svg'
import {useEffect, useState} from "react";
import attach_file from "../../assets/svgs/attach_file.svg";
import remove_sign from '../../assets/svgs/remove.svg'
import {format} from 'date-fns'
import {Link, useNavigate} from "react-router-dom";
import ScrollImageCard from "./scroll_image_card.jsx";
import {useDispatch, useSelector} from "react-redux";
import {loadSelectedGalleryRepliesEvents, toggleIsCarouselShowing} from "../../features/gallerySlice.js";
import default_user from "../../assets/images/default_user.png";
import {api, MEDIA_ROOT} from "../../api/api.js";
import useSetItem from "../../hooks/useSetItem.js";
import check_circle from "../../assets/svgs/check_circle.svg";
import {addReplySelectedDiscussion, toggleEventParticipation} from "../../features/forumEventsSlice.js";
import {loadSelectedUserID} from "../../features/userSlice.js";
import three_dots from "../../assets/svgs/three-dots-vertical.svg";

export default function EventsDiscussionCard() {

    const navigate = useNavigate()
    const [isAddReplyClicked, setIsAddReplyClicked] = useState(false)
    const dispatch = useDispatch()
    const isImageShowing = useSelector((state) => state.gallery.isImageCarouselShowing)
    const discussion = useSelector((state) => state.forum_event.selected_discussion)
    const validAccessToken = useSelector((state) => state.user.validAccessToken);
    const [selectedFile, setSelectedFile] = useState([]);
    const [text_content, setTextContent] = useSetItem()
    const user = useSelector((state) => state.user.userData)
    const [user_participates, setUserParticipates] = useState(false);
    const event_discussion = useSelector((state) => state.forum_event.selected_discussion)
    const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)


    if (!validAccessToken){
        navigate('/login')
    }

    const toggleEditButtonClicked = () => {
        setIsEditButtonClicked(!isEditButtonClicked)
    }


    useEffect(() => {
        if (user && discussion) {
            const participates = discussion.participants && discussion.participants.includes(user.id);
            setUserParticipates(participates);
        }
    }, [user, discussion]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile([...selectedFile, file]);
        }
    };

    useEffect(() => {

    }, [selectedFile]);


    const toggleIsImageShowing = () => {
        dispatch(loadSelectedGalleryRepliesEvents({'images': [...discussion.images]}))
        dispatch(toggleIsCarouselShowing(!isImageShowing))
    }
    const toggleIsAddReplyClicked = () => {
        setIsAddReplyClicked(!isAddReplyClicked)
        setSelectedFile([])
    }


    const handleSelectUser = () => {
        dispatch(loadSelectedUserID(discussion.author.id))
    }

    const handleToggleEventParticipation = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${validAccessToken}`,
            },
        };
        try {
            const response = await api.post(`/events/${discussion.id}/toggle-participation/`, {}, config)
            console.log(response.data)
            setUserParticipates(!user_participates)
            dispatch(toggleEventParticipation(response.data))
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreatePost = async () => {
        try {
            const formData = new FormData();
            formData.append('text_content', text_content);
            if (selectedFile) {
                for (const file of selectedFile) {
                    formData.append('images', file, file.name);
                }
            }
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${validAccessToken}`,
                },
            };

            const response = await api.post(`/replies/new/event/${discussion.id}/`, formData, config);
            console.log('Response.data:', response.data);
            dispatch(addReplySelectedDiscussion(response.data))
            toggleIsAddReplyClicked()
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDeleteEventsDiscussion = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                }
            };
            const res = await api.delete(`/events/${discussion?.id}/`, config);
            const resolvedData = res.data;
            toggleEditButtonClicked()
            navigate('/events')
        } catch (error) {
            console.log(error);
            console.error("Failed to delete post:", error);
        }
    }



    while (event_discussion === null || !user) {
        return <div>Loading...</div>
    }


    return (
        <>
            <ScrollImageCard/>
            <div className='flex-col pb-20'>
                <article style={{marginTop: '1.5rem', height: 'fit-content', width: '40rem'}}
                         className="border-b border-blue-500 p-5 pt-0 rounded-sm flex flex-col items-start justify-between">
                    <Link to='/events'><img
                        src={arrow_back}
                        alt="Arrow Back"
                        style={{width: '2rem', transform: 'translateX(-5rem)'}}
                    /></Link>
                    <div style={{width: '100%', justifyContent: 'space-between'}}
                         className="flex items-center gap-x-4 text-xs">
                        <div className="flex items-center gap-x-4 text-xs">
                            <div style={{fontSize: '0.75rem'}}
                                 className="badge badge-info badge-outline">#{event_discussion?.category}
                            </div>
                            <div style={{fontSize: '0.75rem'}} className="badge badge-secondary badge-outline">
                                Event Date: {event_discussion?.event_date && format(new Date(event_discussion?.event_date), 'MMM dd, yyyy')}
                            </div>
                            <div style={{display: event_discussion.type === false && 'none', fontSize: '0.75rem'}}
                                 className="badge badge-accent badge-outline">Virtual
                            </div>
                        </div>
                        <div style={{display: discussion?.author?.id !== user?.id && 'none'}}>
                            <div className="relative inline-block text-left">
                                <div>
                                    <button type="button"
                                            onClick={toggleEditButtonClicked}
                                            style={{
                                                width: '1rem',
                                                height: '1.5rem',
                                                backgroundImage: `url(${three_dots})`,
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover'
                                            }}
                                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white ring-gray-300"
                                            id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    </button>
                                </div>
                                <div
                                    style={{display: isEditButtonClicked === false && 'none'}}
                                    className="absolute left-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <Link to='/events/discussion/edit' className="hover:bg-gray-50 hover:rounded-md py-1" role="none">
                                        <div className="hover:bg-gray-50 hover:rounded-md text-black block px-4 py-2 text-sm" role="menuitem"
                                             tabIndex="-1"
                                             id="menu-item-0">Edit
                                        </div>
                                    </Link>
                                    <div onClick={handleDeleteEventsDiscussion} className="hover:cursor-pointer hover:bg-gray-50 hover:rounded-md py-1"
                                         role="none">
                                        <div className="text-black hover:rounded-md block px-4 py-2 text-sm" role="menuitem"
                                             tabIndex="-1"
                                             id="menu-item-6">Delete
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="group relative max-w-full break-words">
                        <h3 className="mt-6 text-lg font-semibold leading-6 text-white">
                            <a href='#'>
                                <span className="absolute inset-0"/>
                                {event_discussion?.title}
                            </a>
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-white">{event_discussion?.detail} </p>
                    </div>
                    <div style={{
                        fontWeight: 'bold',
                        display: (event_discussion?.street || event_discussion?.city || event_discussion?.country) ? 'block' : 'none'
                    }} className='mt-1 text-sm leading-6 text-white'>Event
                        Address: {event_discussion?.street} {event_discussion?.zip}{(event_discussion?.street && event_discussion?.city) && ','} {event_discussion?.city}{event_discussion?.country && ','} {event_discussion?.country}</div>
                    <div style={{
                        fontWeight: 'bold',
                        display: event_discussion?.link ? 'block' : 'none'
                    }} className='mt-1 text-sm leading-6 text-white'>Event
                        Link: {event_discussion?.link} </div>
                    <button style={{display: discussion.images?.length > 0 ? 'block' : 'none'}}
                            onClick={toggleIsImageShowing} className="border-none h-[2rem] pl-4 pr-4 btn rounded-full text-white hover:bg-blue-500 bg-blue-500 btn-xs mt-5">Event Images
                    </button>
                    <div className='flex mt-6 pr-2 w-full'
                         style={{alignItems: 'center', justifyContent: 'space-between'}}>
                        <div className="relative flex items-center gap-x-4">
                            <div className='w-10 h-10 rounded-full'>
                                {event_discussion?.author?.avatar && event_discussion?.author?.avatar.startsWith('http') ? (
                                    <img
                                        src={event_discussion?.author?.avatar}
                                        alt="Image" className="h-full w-full rounded-full object-cover bg-gray-50"
                                    />
                                ) : event_discussion?.author?.avatar && !event_discussion?.author?.avatar.startsWith('http') ? (
                                    <img
                                        src={`${MEDIA_ROOT}${event_discussion?.author?.avatar}`}
                                        alt="Image" className="h-full w-full rounded-full object-cover bg-gray-50"
                                    />
                                ) : (
                                    <img
                                        src={default_user}
                                        alt="Image" className="h-full w-full rounded-full object-cover bg-gray-50"
                                    />
                                )}
                            </div>
                            <div className="text-sm leading-6">
                                <p className="font-semibold text-white hover:text-blue-500">
                                    <Link onClick={handleSelectUser}
                                          className='hover:cursor-pointer z-20'
                                          to="/profile">
                                        <span className="absolute inset-0"/>
                                        {event_discussion?.author?.first_name} {event_discussion?.author?.last_name}
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <p className="mt-1 line-clamp-3 text-sm leading-6 text-white">{event_discussion?.participants_count} Participants</p>
                    </div>
                </article>
                <div style={{justifyContent: 'space-between', alignItems: 'center'}} className='pr-5 w-100% flex '>
                    <button style={{display: isAddReplyClicked && 'none'}} onClick={toggleIsAddReplyClicked}
                            className="mt-[1rem] flex w-[200px] justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Reply
                    </button>
                    <div style={{display: isAddReplyClicked && 'none'}} className="mt-3 form-control">
                        <label className="flex flex-1 gap-3 label cursor-pointer">
                            {user_participates ? (
                                <span style={{fontWeight: 'bold'}}
                                      className="label-text text-white">You confirmed your participation!</span>

                            ) : (
                                <span style={{fontWeight: 'bold'}}
                                      className="label-text text-white">Click to confirm participation </span>
                            )
                            }
                            {user_participates ? (
                                <input type="checkbox"
                                       onChange={handleToggleEventParticipation}
                                       checked="checked"
                                       className="checkbox checkbox-success hover:border-neutral border-neutral"/>
                            ) : (
                                <input type="checkbox"
                                       onChange={handleToggleEventParticipation}
                                       className="checkbox checkbox-success hover:border-neutral border-neutral"/>
                            )
                            }
                        </label>
                    </div>
                </div>
                <button style={{display: isAddReplyClicked === false && 'none'}} onClick={toggleIsAddReplyClicked}
                        className="mt-[1rem] flex w-[200px] justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Close
                </button>
                <div className='flex'
                     style={{display: isAddReplyClicked === false && 'none', margin: '1.5rem', gap: '1rem'}}>
                    <div className='w-10 h-10 rounded-full'>
                        {user?.avatar && user?.avatar.startsWith('http') ? (
                            <img
                                src={user?.avatar}
                                alt="Image" className="h-full w-full rounded-full object-cover bg-gray-50"
                            />
                        ) : user?.avatar && !user?.avatar.startsWith('http') ? (
                            <img
                                src={`${MEDIA_ROOT}${user?.avatar}`}
                                alt="Image" className="h-full w-full rounded-full object-cover bg-gray-50"
                            />
                        ) : (
                            <img
                                src={default_user}
                                alt="Image" className="h-full w-full rounded-full object-cover bg-gray-50"
                            />
                        )}
                    </div>
                    <div className='border border-gray-900/10 rounded-lg flex flex-col justify-between' style={{
                        height: '8rem',
                        gap: '0',
                        flexGrow: '1',
                    }}>
                        <textarea style={{
                            width: '100%',
                            outline: 'none',
                            resize: 'none',
                            border: "none",
                        }} onChange={setTextContent} placeholder="Add your reply"
                                  className="flex rounded-t-lg rounded-b-none textarea flex-1"></textarea>
                        <div style={{
                            padding: '0.25rem',
                            width: '100%', height: '2.5rem', backgroundColor: 'white'
                        }} className='flex justify-between rounded-b-lg rounded-t-none bg-transparent'>
                            <div className='flex flex-1'>
                                <label htmlFor="fileInput">
                                    <img onClick={handleFileUpload} className='pr-3 hover:cursor-pointer'
                                         src={attach_file}/>
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept=".jpg, .jpeg, .png, .gif, .mp4, .mov, .avi, .mkv" // Specify the allowed file types
                                    style={{display: 'none'}}
                                    onChange={handleFileUpload}
                                />
                                {selectedFile && selectedFile.map((check, index) => (
                                    <img className='h-[1.4rem]' key={index} src={check_circle}/>))}
                            </div>
                            <button
                                onClick={handleCreatePost}
                                type='submit'
                                style={{alignItems:'center', justifyContent:'center'}}
                                className='flex-col flex w-1/5 h-[2rem] rounded-full bg-transparent border border-blue-400 text-sm font-semibold text-black shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                Post
                            </button>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    {event_discussion.replies && event_discussion.replies.map((reply, index) => (
                        <ReplyCard key={index}
                                   id={reply.id}
                                   discussion_id={event_discussion.id}
                                   avatar={reply.user.avatar}
                                   user_id={reply.user.id}
                                   first_name={reply.user.first_name}
                                   last_name={reply.user.last_name}
                                   date_created={reply.date_created}
                                   text_content={reply.text_content}
                                   likes_count={reply.likes_count}
                                   dislike_count={reply.dislike_count}
                                   comments_count={reply.comments_count}
                                   images={reply.image}
                                   comments={reply.comments}
                                   logged_user_liked = {reply?.users_liked.includes(user?.id)}
                                   logged_user_disliked = {reply?.users_disliked.includes(user?.id)}
                        />))}
                </div>
            </div>
        </>
    )
}
