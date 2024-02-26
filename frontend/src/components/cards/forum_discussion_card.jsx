import ReplyCard from "./reply_card.jsx";
import plus_sign from '../../assets/svgs/plus_sign.svg'
import arrow_back from "../../assets/svgs/arrow_back.svg";
import {useEffect, useState} from "react";
import remove_sign from '../../assets/svgs/remove.svg'
import attach_file from "../../assets/svgs/attach_file.svg";
import {Link, useNavigate} from "react-router-dom";
import ScrollImageCard from "./scroll_image_card.jsx";
import {useDispatch, useSelector} from "react-redux";
import {format} from 'date-fns'
import {api} from "../../api/api.js";
import check_circle from '../../assets/svgs/check_circle.svg'
import useSetItem from "../../hooks/useSetItem.js";
import {MEDIA_ROOT} from '../../api/api.js'
import default_user from '../../assets/images/default_user.png'
import {
    addReplySelectedDiscussion,
} from "../../features/forumEventsSlice.js";
import {loadSelectedUserID} from "../../features/userSlice.js";
import three_dots from "../../assets/svgs/three-dots-vertical.svg";


export default function ForumDiscussionCard() {


    const navigate = useNavigate()
    const [isAddReplyClicked, setIsAddReplyClicked] = useState(false)
    const forum_discussion = useSelector((state) => state.forum_event.selected_discussion)
    const validAccessToken = useSelector((state) => state.user.validAccessToken);
    const [selectedFile, setSelectedFile] = useState([]);
    const [text_content, setTextContent] = useSetItem()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.userData)
    const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)

    const toggleEditButtonClicked = () => {
        setIsEditButtonClicked(!isEditButtonClicked)
    }


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log(event.target.files[0])
        console.log(setSelectedFile)
        if (file) {
            setSelectedFile([...selectedFile, file]);
        }
    };


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

            const response = await api.post(`/replies/new/forum/${forum_discussion.id}/`, formData, config);
            console.log('Response.data:', response.data);
            dispatch(addReplySelectedDiscussion(response.data))
            toggleIsAddReplyClicked()
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const toggleIsAddReplyClicked = () => {
        setIsAddReplyClicked(!isAddReplyClicked)
        setSelectedFile([])
    }

    useEffect(() => {
    }, [forum_discussion, forum_discussion?.replies]);

    const handleSelectUser = () => {
        dispatch(loadSelectedUserID(forum_discussion.user.id))
    }

    const handleDeleteForumDiscussion = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                }
            };
            const res = await api.delete(`/forums/${forum_discussion?.id}/`, config);
            const resolvedData = res.data;
            toggleEditButtonClicked()
            navigate('/forum')
        } catch (error) {
            console.log(error);
            console.error("Failed to delete post:", error);
        }
    }

    useEffect(() => {

    }, [selectedFile]);


    if (!validAccessToken) {
        navigate('/login')
    }

    while (forum_discussion === null || !user) {
        return <div>Loading...</div>
    }

    return (
        <>
            <ScrollImageCard/>
            <div className='flex-col pb-20'>
                <article style={{height: 'fit-content', width: '40rem'}}
                         className="border-b border-blue-500 p-5 rounded-sm flex-col items-start justify-between">
                    <Link to='/forum'><img
                        src={arrow_back}
                        alt="Arrow Back"
                        style={{width: '2rem', transform: 'translateX(-5rem)'}}
                    /></Link>
                    <div style={{width: '100%', justifyContent: 'space-between'}}
                         className="flex items-center gap-x-4 text-xs">
                        <div className="flex items-center gap-x-4 text-xs">
                            <time dateTime='2020-03-16' className="text-white">
                                {format(new Date(forum_discussion?.date_created), 'MMM dd, yyyy')}
                            </time>
                            <div style={{fontSize: '0.75rem'}}
                                 className="badge badge-info badge-outline">#{forum_discussion?.category}
                            </div>
                        </div>
                        <div style={{display: forum_discussion?.user?.id !== user?.id && 'none'}}>
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
                                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-gray-300"
                                            id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    </button>
                                </div>
                                <div
                                    style={{display: isEditButtonClicked === false && 'none'}}
                                    className="absolute left-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <Link to='/forum/discussion/edit' className="hover:bg-gray-50 py-1" role="none">
                                        <div className="text-black block px-4 py-2 text-sm" role="menuitem"
                                             tabIndex="-1"
                                             id="menu-item-0">Edit
                                        </div>
                                    </Link>
                                    <div onClick={handleDeleteForumDiscussion} className="hover:bg-gray-50 py-1"
                                         role="none">
                                        <div className="text-black block px-4 py-2 text-sm" role="menuitem"
                                             tabIndex="-1"
                                             id="menu-item-6">Delete
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="group relative" style={{maxWidth: '100%', wordWrap: 'break-word'}}>
                        <h3 className="mt-6 text-lg font-semibold leading-6 text-blue-400">
                            {forum_discussion?.question}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-white">
                            {forum_discussion?.text_description}
                        </p>
                    </div>
                    <div className='flex mt-6 pr-2 w-full'
                         style={{alignItems: 'center', justifyContent: 'space-between'}}>
                        <div className="relative flex items-center gap-x-4">
                            <div className='w-10 h-10 rounded-full'>
                                <img className="w-full h-full object-cover rounded-full"
                                     src={forum_discussion?.user?.avatar ? `${MEDIA_ROOT}${forum_discussion?.user?.avatar}` : default_user}/>
                            </div>
                            <div className="text-sm leading-6">
                                <p className="font-semibold text-white">
                                    <Link className='hover:cursor-pointer hover:text-blue-500 z-20'
                                          to='/profile'
                                          onClick={handleSelectUser}>
                                        <span className="absolute inset-0"/>
                                        {forum_discussion?.user?.first_name} {forum_discussion?.user?.last_name}
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <p className="mt-1 line-clamp-3 text-sm leading-6 text-white">{forum_discussion?.reply_count} Replies</p>
                    </div>
                </article>
                <button style={{display: isAddReplyClicked && 'none'}} onClick={toggleIsAddReplyClicked}
                        className='mt-[1rem] flex w-[200px] justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Add
                    Reply
                </button>
                <button style={{display: isAddReplyClicked === false && 'none'}} onClick={toggleIsAddReplyClicked}
                        className='mt-[1rem]  flex w-[200px] justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Close
                </button>
                <div className='flex'
                     style={{display: isAddReplyClicked === false && 'none', margin: '1.5rem', gap: '1rem'}}>
                    <div className='w-10 h-10 rounded-full'>
                        <img className="w-full h-full object-cover rounded-full"
                             src={user ? `${user.avatar}` : default_user}/>
                    </div>
                    <div className='border border-none flex flex-col justify-between' style={{
                        height: '8rem',
                        gap: '0',
                        flexGrow: '1',
                    }}>
                        <textarea style={{
                            width: '100%',
                            outline: 'none',
                            resize: 'none',
                            border: "none",
                            borderBottomLeftRadius: '0',
                            borderBottomRightRadius: '0'
                        }} onChange={setTextContent} placeholder="Add your reply"
                                  className="flex rounded-t-lg rounded-b-0 textarea flex-1"></textarea>
                        <div style={{
                            padding: '0.25rem',
                            width: '100%', height: '2.5rem', backgroundColor: 'white'
                        }} className='flex justify-between rounded-b-lg bg-transparent'>
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
                                style={{justifyContent: 'center', alignItems: 'center'}}
                                className='flex-col flex w-1/5 h-[2rem] rounded-full bg-transparent border border-blue-400 text-sm font-semibold text-black shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                Post
                            </button>
                        </div>
                    </div>
                </div>
                {
                    forum_discussion?.replies && forum_discussion?.replies.map((reply, index) => (<ReplyCard key={index}
                                                                                                             id={reply.id}
                                                                                                             discussion_id={forum_discussion.id}
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
                                                                                                             logged_user_liked={reply?.users_liked.includes(user.id)}
                                                                                                             logged_user_disliked={reply?.users_disliked.includes(user.id)}
                    />))
                }
            </div>
        </>
    )
}
