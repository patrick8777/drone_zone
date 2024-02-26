import thumb_up from '../../assets/svgs/thumb_up.svg'
import thumb_down from '../../assets/svgs/thumb_down.svg'
import add_comment from '../../assets/svgs/add_comment.svg'
import remove_comment from '../../assets/svgs/remove_comment.svg'
import CommentCard from "./comment_card.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadSelectedGalleryRepliesEvents, toggleIsCarouselShowing} from "../../features/gallerySlice.js";
import {format} from 'date-fns'
import {api} from "../../api/api.js";
import {loadSelectedUserID, loadUser} from "../../features/userSlice.js";
import {Link, useNavigate} from "react-router-dom";
import default_user from '../../assets/images/default_user.png'
import {MEDIA_ROOT} from '../../api/api.js'
import {
    addCommentSelectedDiscussion,
    deleteReplySelectedDiscussion,
    selectReplyId,
    toggleReplyLike,
    toggleReplyDislike, updateReplySelectedDiscussion
} from "../../features/forumEventsSlice.js";
import three_dots from "../../assets/svgs/three-dots-vertical.svg";
import thumb_up_green from '../../assets/svgs/thumb_up_green.svg'
import thumb_down_red from '../../assets/svgs/thumb_down_red.svg'
import attach_file from "../../assets/svgs/attach_file.svg";
import check_circle from "../../assets/svgs/check_circle.svg";

export default function ReplyCard({
                                      id,
                                      user_id,
                                      avatar,
                                      comments_count,
                                      discussion_id,
                                      images,
                                      first_name,
                                      last_name,
                                      text_content,
                                      dislike_count,
                                      likes_count,
                                      date_created,
                                      comments,
                                      logged_user_liked,
                                      logged_user_disliked,
                                  }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isCommentsClicked, setIsCommentsClicked] = useState(false)
    const [isAddCommentsClicked, setIsAddCommentsClicked] = useState(false)
    const isImageShowing = useSelector((state) => state.gallery.isImageCarouselShowing)
    const validAccessToken = useSelector((state) => state.user.validAccessToken);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [text_description, set_text_description] = useState('')
    const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)
    const [text_content_input, setTextContentInput] = useState(text_content)
    const [isConfirmEditButtonClicked, setIsConfirmEditButtonClicked] = useState(false)
    const [selectedFileReply, setSelectedFileReply] = useState([]);

    const handleTextContentChange = (e) => {
        setTextContentInput(e.target.value)
    }

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };


    const handleFileUploadReply = (event) => {
        const files = event.target.files;
        console.log('handleFileUploadReply')
        console.log(selectedFileReply)
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedFileReply((prevSelectedFile) => [...prevSelectedFile, file]);
        }
    };


    const closeEditCommentSection = () => {
        setTextContentInput(text_content)
        setIsConfirmEditButtonClicked(false)
        setSelectedFileReply([])
    }

    const showEditSection = (e) => {
        e.preventDefault()
        setIsConfirmEditButtonClicked(true)
        toggleEditButtonClicked()
    }


    const handleTextDescriptionChange = (e) => {
        set_text_description(e.target.value);
    };


    const toggleEditButtonClicked = () => {
        setIsEditButtonClicked(!isEditButtonClicked)
    }

    const toggleIsCommentsClicked = () => {
        setIsCommentsClicked(!isCommentsClicked)
    }


    const toggleIsAddCommentsClicked = () => {
        setIsAddCommentsClicked(!isAddCommentsClicked)
        set_text_description('')
    }

    const toggleIsImageShowing = () => {
        dispatch(loadSelectedGalleryRepliesEvents({'images': [...images]}))
        dispatch(toggleIsCarouselShowing(!isImageShowing))
    }

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${validAccessToken}`,
                },
            };
            const response = await api.get("/users/me/", config);
            const resolvedData = response.data;
            setUserInfo(resolvedData);
            dispatch(loadUser(resolvedData));
        } catch (error) {
            console.error("We could not retrieve profile details...", error);
            navigate('/login')
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreatePostComments = async (e) => {
        e.preventDefault()
        let data = {
            text_description,
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                }
            };
            const res = await api.post(`/comments/new/reply/${id}/`, data, config);
            const resolvedData = res.data;
            dispatch(selectReplyId(id))
            dispatch(addCommentSelectedDiscussion(resolvedData))
            toggleIsAddCommentsClicked()
            setIsCommentsClicked(true)
        } catch (error) {
            console.log(error);
            console.error("Failed to post comment:", error);
        }
    };

    const handleSelectUser = () => {
        dispatch(loadSelectedUserID(user_id))
    }


    useEffect(() => {
        fetchUser();
    }, []);


    const handleDeleteReply = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                }
            };
            const res = await api.delete(`/replies/${id}/`, config);
            const resolvedData = res.data;
            dispatch(selectReplyId(id))
            dispatch(deleteReplySelectedDiscussion())
            toggleEditButtonClicked()
        } catch (error) {
            console.log(error);
            console.error("Failed to post comment:", error);
        }
    }

    const handlePatchReply = async () => {
        const formData = new FormData()
        formData.append('text_content', text_content_input)
        if (selectedFileReply) {
            for (const file of selectedFileReply) {
                console.log(file.name)
                formData.append('images', file, file.name);
            }
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${validAccessToken}`,
                }
            };
            const res = await api.patch(`/replies/${id}/`, formData, config);
            dispatch(selectReplyId(id))
            dispatch(updateReplySelectedDiscussion(res.data))
            setIsConfirmEditButtonClicked(false)
            setSelectedFileReply([])
        } catch (error) {
            console.log(error);
            console.error("Failed to edit reply:", error);
        }
    }


    const handleToggleLike = async () => {
        var formData = new FormData();
        formData.append("action", "like")
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                }
            };
            console.log(validAccessToken)
            const res = await api.post(`/replies/${id}/like-dislike/`, formData, config);
            const resolvedData = res.data;
            dispatch(selectReplyId(id))
            dispatch(toggleReplyLike({'user_id': userInfo.id}))
        } catch (error) {
            console.log(error);
            console.error("Failed to toggle like:", error);
        }

    }

    const handleToggleDislike = async () => {
        var formData = new FormData();
        formData.append("action", "dislike")
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                }
            };
            console.log(validAccessToken)
            const res = await api.post(`/replies/${id}/like-dislike/`, formData, config);
            const resolvedData = res.data;
            dispatch(selectReplyId(id))
            dispatch(toggleReplyDislike({'user_id': userInfo.id}))
        } catch (error) {
            console.log(error);
            console.error("Failed to toggle dislike:", error);
        }

    }

    if (userInfo === null) return <div></div>

    return (
        <div style={{alignItems: 'flex-end'}} className='flex flex-col'>
            <article style={{marginTop: '1rem', height: 'fit-content', width: '40rem'}}
                     className="border-b border-blue-500 p-5 rounded-t-md rounded-b-sm flex flex-col items-start justify-between">
                <div style={{width: '100%', justifyContent: 'space-between'}}
                     className="flex items-center gap-x-4 text-xs">
                    <div className="flex items-center gap-x-4 text-xs">
                        <div className="relative flex items-center gap-x-4">
                            <div className='h-10 w-10 rounded-full'>
                                {avatar && avatar.startsWith('http') ? (
                                    <img
                                        src={avatar}
                                        alt="Image" className="h-full w-full rounded-full object-cover bg-gray-50"
                                    />
                                ) : avatar && !avatar.startsWith('http') ? (
                                    <img
                                        src={`${MEDIA_ROOT}${avatar}`}
                                        alt="Image" className="h-full w-full rounded-full object-cover bg-gray-50"
                                    />
                                ) : (
                                    <img
                                        src={default_user}
                                        alt="Image" className="h-full w-full rounded-full object-cover bg-gray-50"
                                    />
                                )}
                            </div>
                            <div className="text-sm">
                                <p className="font-semibold text-white">
                                    <Link className='hover:cursor-pointer hover:text-white z-20'
                                          to='/profile'
                                          onClick={handleSelectUser}>
                                        <span className="absolute inset-0"/>
                                        {first_name} {last_name}
                                    </Link>
                                </p>
                                <time dateTime='2020-03-16' className="text-xs text-white">
                                    {format(new Date(date_created), 'MMM dd, yyyy')}
                                </time>
                            </div>
                        </div>
                    </div>
                    <div style={{display: user_id !== userInfo.id && 'none'}}>
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
                                <div className="hover:bg-gray-50 hover:rounded-md py-1" role="none">
                                    <div className="text-black block px-4 py-2 text-sm" role="menuitem"
                                         onClick={showEditSection}
                                         tabIndex="-1"
                                         id="menu-item-0">Edit
                                    </div>
                                </div>
                                <div onClick={handleDeleteReply} className="hover:bg-gray-50 py-1 hover:rounded-md" role="none">
                                    <div className="text-black block px-4 py-2 text-sm" role="menuitem"
                                         tabIndex="-1"
                                         id="menu-item-6">Delete
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: isConfirmEditButtonClicked === false ? 'block' : 'none'}}
                     className="group relative max-w-full break-words">
                    <p className="mt-5 text-sm text-white ">{text_content} </p>
                </div>
                <div
                    style={{display: (images && images.length > 0 && isConfirmEditButtonClicked === false) ? 'block' : 'none'}}>
                    <button onClick={toggleIsImageShowing}
                            className="border-none h-[2rem] pl-4 pr-4 btn rounded-full text-white hover:bg-blue-500 bg-blue-500 btn-xs mt-4">Images
                    </button>
                </div>
                <article
                    style={{display: isConfirmEditButtonClicked ? 'flex' : 'none', width: '38rem'}}
                    className="gap-4 rounded-md flex pt-[1rem] pl-[3rem] items-start justify-between">
                    <div className='border border-none rounded-lg flex flex-col justify-between' style={{
                        height: 'fit-content',
                        gap: '0',
                        flexGrow: '1',
                    }}>
                        <textarea style={{
                            minHeight: '5rem',
                            width: '100%',
                            outline: 'none',
                            resize: 'none',
                            border: 'none',
                        }} value={text_content_input}
                                  onChange={handleTextContentChange}
                                  placeholder="Add your comment"
                                  className="flex rounded-t-lg rounded-b-none textarea"></textarea>
                        <div style={{
                            padding: '0.25rem',
                            width: '100%', height: '2.5rem', backgroundColor: 'white'
                        }} className='flex  rounded-b-lg rounded-t-none  justify-end rounded-lg gap-2 bg-transparent'>
                            <div className='flex flex-1'>
                                <label htmlFor="fileInputReply">
                                    <img onClick={handleFileUploadReply} className='pr-3 hover:cursor-pointer'
                                         src={attach_file}/>
                                </label>
                                <input
                                    type="file"
                                    id="fileInputReply"
                                    accept=".jpg, .jpeg, .png, .gif, .mp4, .mov, .avi, .mkv"
                                    style={{display: 'none'}}
                                    onChange={handleFileUploadReply}
                                />
                                {selectedFileReply && selectedFileReply.map((check, index) => (
                                    <img className='h-[1.4rem]' key={index} src={check_circle}/>))}
                            </div>
                            <button
                                onClick={closeEditCommentSection}
                                type="button"
                                style={{alignItems:'center'}}
                                className='flex-col flex w-1/5 h-[2rem] justify-center rounded-full bg-transparent border border-blue-500 text-sm font-semibold text-black shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                Cancel
                            </button>
                            <button
                                onClick={handlePatchReply}
                                type='submit'
                                style={{alignItems:'center'}}
                                className='flex-col flex w-1/5 h-[2rem] justify-center rounded-full bg-blue-500 border border-blue-500 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                Edit
                            </button>
                        </div>
                    </div>
                </article>
                <div className='flex mt-6 pr-2 w-full' style={{alignItems: 'center', justifyContent: 'space-between'}}>
                    <div className='flex gap-4'>
                        <div onClick={handleToggleLike} style={{alignItems: 'center', justifyContent: 'space-between'}}
                             className='flex gap-1'>
                            <img className='hover:cursor-pointer' src={logged_user_liked ? thumb_up_green : thumb_up}/>
                            <p className='text-white text-sm'>{likes_count} Likes</p>
                        </div>
                        <div onClick={handleToggleDislike}
                             style={{alignItems: 'center', justifyContent: 'space-between'}} className='flex gap-1'>
                            <img className='hover:cursor-pointer'
                                 src={logged_user_disliked ? thumb_down_red : thumb_down}/>
                            <p className='text-white text-sm'>{dislike_count} Dislikes</p>
                        </div>
                        <div style={{
                            display: isAddCommentsClicked && 'none',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }} className='flex gap-1'>
                            <img onClick={toggleIsAddCommentsClicked} className='hover:cursor-pointer'
                                 src={add_comment}/>
                            <p className='text-white text-sm'>Add Comment</p>
                        </div>
                        <div style={{
                            display: isAddCommentsClicked === false && 'none',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }} className='flex gap-1'>
                            <img onClick={toggleIsAddCommentsClicked} className='hover:cursor-pointer'
                                 src={remove_comment}/>
                            <p className='text-white text-sm'>Close</p>
                        </div>
                    </div>
                    <p onClick={toggleIsCommentsClicked}
                       className="mt-1 line-clamp-3 text-sm leading-6 text-white hover:cursor-pointer">{comments_count} Comments</p>
                </div>
            </article>
            <article style={{display: isAddCommentsClicked === false && 'none', height: 'fit-content', width: '38rem'}}
                     className="border-b border-l border-blue-500 p-5 gap-4 rounded-sm rounded-bl-lg  rounded-b-sm flex items-start justify-between">
                <div className='h-10 w-10 rounded-full'>
                    <img
                        src={userInfo.avatar ? `${userInfo.avatar}` : default_user}
                        alt="Image" className="h-full w-full rounded-full object-cover bg-gray-50"/>
                </div>
                <div className='rounded-t-lg rounded-b-sm flex flex-col justify-between' style={{
                    height: 'fit-content',
                    gap: '0',
                    flexGrow: '1',
                }}>
                        <textarea style={{
                            width: '100%',
                            height: '1rem',
                            outline: 'none',
                            resize: 'none',
                            border: 'none',
                        }} value={text_description} onChange={handleTextDescriptionChange}
                                  placeholder="Add your comment"
                                  className="flex rounded-t-lg rounded-b-none textarea"></textarea>
                    <div style={{
                        padding: '0.25rem',
                        width: '100%', height: '2.5rem', backgroundColor: 'white'
                    }} className='flex justify-end rounded-t-none rounded-b-lg bg-transparent'>
                        <button
                            onClick={handleCreatePostComments}
                            type='submit'
                            style={{alignItems: 'center'}}
                            className='flex-col flex w-1/5 h-[2rem] justify-center rounded-full bg-transparent border border-blue-500 text-sm font-semibold text-black shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                            Post
                        </button>
                    </div>
                </div>
            </article>
            <div style={{display: isCommentsClicked === false && 'none'}}>
                {comments && comments.map((comment, index) => <CommentCard
                    key={index}
                    reply_id={id}
                    id={comment.id}
                    user={comment.user}
                    date_created={comment.date_created}
                    text_description={comment.text_description}
                />)}
            </div>
        </div>
    )
}