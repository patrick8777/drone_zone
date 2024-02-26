import {useDispatch, useSelector} from "react-redux";
import {format} from "date-fns";
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {api, MEDIA_ROOT} from "../../api/api.js";
import default_user from "../../assets/images/default_user.png";
import {loadSelectedUserID} from "../../features/userSlice.js";
import three_dots from "../../assets/svgs/three-dots-vertical.svg";
import {
    selectReplyId,
    deleteCommentSelectedDiscussion,
    updateCommentSelectedDiscussion
} from "../../features/forumEventsSlice.js";

export default function CommentCard({reply_id, id, text_description, user, date_created}) {

    const dispatch= useDispatch()
    const loggedUser = useSelector((state) => state.user.userData)
    const validAccessToken = useSelector((state) => state.user.validAccessToken);
    const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)
    const [isConfirmEditButtonClicked, setIsConfirmEditButtonClicked] = useState(false)
    const [text_description_input, setTextDescriptionInput] = useState(text_description)

    const toggleEditButtonClicked = () => {
        setIsEditButtonClicked(!isEditButtonClicked)
    }

    const handleEditTextDescriptionInput = (e) => {
        setTextDescriptionInput(e.target.value)
    }

    const closeEditCommentSection = () => {
        setTextDescriptionInput(text_description)
        setIsConfirmEditButtonClicked(false)
    }

    const showEditSection = (e) => {
        e.preventDefault()
        setIsConfirmEditButtonClicked(true)
        toggleEditButtonClicked()
    }

    const handleSelectUser = () => {
        dispatch(loadSelectedUserID(user.id))
    }

    useEffect(() => {
    }, []);

    const handleDeleteComments = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                }
            };
            const res = await api.delete(`/comments/${id}/`, config);
            const resolvedData = res.data;
            dispatch(selectReplyId(reply_id))
            dispatch(deleteCommentSelectedDiscussion(id))
            toggleEditButtonClicked()
        } catch (error) {
            console.log(error);
            console.error("Failed to delete comment:", error);
        }
    }

    useEffect(() => {
        console.log({'reply_id': reply_id, 'id': id})
    }, []);

    const handleEditComments = async () => {
        try {
            const formData = new FormData();
            formData.append('text_description', text_description_input);
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                }
            };
            const res = await api.patch(`/comments/${id}/`, formData, config);
            const resolvedData = res.data;
            dispatch(selectReplyId(reply_id))
            dispatch(updateCommentSelectedDiscussion(res.data))
            closeEditCommentSection()
        } catch (error) {
            console.log(error);
            console.error("Failed to delete comment:", error);
        }
    }

    return (
        <article style={{height: 'fit-content', width: '38rem'}}
                 className="border-b border-l border-blue-500 p-5 rounded-sm rounded-bl-lg flex flex-col items-start justify-between">
            <div style={{width: '100%', justifyContent: 'space-between'}} className="flex items-center gap-x-4 text-xs">
                <div className="flex items-center gap-x-4 text-xs">
                    <div className="relative flex items-center gap-x-4">
                        <div className='h-10 w-10 rounded-full'>
                            {user.avatar && user.avatar.startsWith('http') ? (
                                <img
                                    src={user.avatar}
                                    alt="Image" className="h-full w-full rounded-full object-cover bg-gray-50"
                                />
                            ) : user.avatar && !user.avatar.startsWith('http') ? (
                                <img
                                    src={`${MEDIA_ROOT}${user.avatar}`}
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
                                <Link onClick={handleSelectUser}
                                      className='hover:cursor-pointer hover:text-gray-700 hover:text-red z-20'
                                      to="/profile">
                                    <span className="absolute inset-0"/>
                                    {user.first_name} {user.last_name}
                                </Link>
                            </p>
                            <time dateTime='2020-03-16' className="text-xs text-white">
                                {format(new Date(date_created), 'MMM dd, yyyy')}
                            </time>
                        </div>
                    </div>
                </div>
                <div style={{display: loggedUser.id !== user.id && 'none'}}>
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
                            <div className="hover:rounded-md  hover:cursor-pointer hover:bg-gray-50 py-1" role="none">
                                <div className="text-black block px-4 py-2 text-sm" role="menuitem"
                                     tabIndex="-1"
                                     onClick={showEditSection}
                                     id="menu-item-0">Edit
                                </div>
                            </div>
                            <div onClick={handleDeleteComments} className="hover:bg-gray-50 hover:rounded-md py-1" role="none">
                                <div className="text-black block px-4 py-2 text-sm" role="menuitem"
                                     tabIndex="-1"
                                     id="menu-item-6">Delete
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="group relative max-w-full break-words">
                <p style={{display: isConfirmEditButtonClicked===true ? 'none' : 'block'}} className="mt-2 text-sm text-white">{text_description}</p>
            </div>
            <div className='mt-3 rounded-lg flex flex-col justify-between' style={{
                height: 'fit-content',
                gap: '0',
                flexGrow: '1',
                width: '100%',
                display: isConfirmEditButtonClicked===false ? 'none' : 'flex',
            }}>
                        <textarea style={{
                            width: '100%',
                            height: '1rem',
                            outline: 'none',
                            resize: 'none',
                            border: 'none',
                        }} value={text_description_input}
                                  onChange={handleEditTextDescriptionInput}
                                  placeholder="Add your comment"
                                  className="flex rounded-t-lg rounded-b-none textarea"></textarea>
                <div style={{
                    padding: '0.25rem',
                    width: '100%', height: '2.5rem', backgroundColor: 'white'
                }} className='hover:cursor-pointer  rounded-b-lg rounded-t-none gap-3 flex justify-end bg-transparent'>
                    <button
                        type="button"
                        onClick={closeEditCommentSection}
                        style={{alignItems:'center'}}
                        className='flex-col flex w-1/5 h-[2rem] justify-center rounded-full bg-transparent border border-blue-500 text-sm font-semibold text-black shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Cancel
                    </button>
                    <button
                        onClick={handleEditComments}
                        style={{alignItems:'center'}}
                        type='submit'
                        className='flex-col flex w-1/5 h-[2rem] justify-center rounded-full bg-blue-500 border border-blue-500 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Edit
                    </button>
                </div>
            </div>
        </article>
    )
}