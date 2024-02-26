import EditDeleteButton from "./edit_delete_button.jsx";
import thumb_up from '../../assets/svgs/thumb_up.svg'
import thumb_down from '../../assets/svgs/thumb_down.svg'
import add_comment from '../../assets/svgs/add_comment.svg'
import CommentCard from "./comment_card.jsx";
import {useEffect, useState} from "react";
import Rating from "../rating/rating.jsx";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../api/api.js";
import {useParams} from "react-router-dom";
import default_user from "../../assets/images/default_user.png";

export default function ReviewCard() {

    const dispatch = useDispatch();
    const [isCommentsClicked, setIsCommentsClicked] = useState(false);
    const [isAddCommentsClicked, setIsAddCommentsClicked] = useState(false);
    const isImageShowing = useSelector((state) => state.gallery.isImageCarouselShowing);
    const {id} = useParams();
    const [reviewsData, setReviewsData] = useState(null);

    useEffect(() => {
        const fetchReviewsData = async () => {
            try {
                const response = await api.get(`/reviews/business/${id}/`);
                setReviewsData(response.data);
            } catch (error) {
                console.error('Error fetching reviews data:', error);
            }
        };

        fetchReviewsData();
    }, [id]);

    const toggleIsCommentsClicked = () => {
        setIsCommentsClicked(!isCommentsClicked);
    };

    const toggleIsAddCommentsClicked = () => {
        setIsAddCommentsClicked(!isAddCommentsClicked);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'};
        return date.toLocaleDateString('en-US', options);
    };

    return (
        reviewsData && reviewsData.map((review, index) => (

            <div key={index} style={{alignItems: 'flex-end'}} className='bg-white rounded-lg shadow flex flex-col'>
                <article style={{
                    marginTop: '1rem',
                    height: 'fit-content',
                    width: '30rem',
                    boxShadow: '10px 10px 2px 1px rgb(96 165 250)'}}
                         className="border-b border-gray-900/10 p-5 rounded-md flex flex-col items-start justify-between">
                    <div style={{width: '100%', justifyContent: 'space-between'}}
                         className="flex items-center gap-x-4 text-xs">
                        <div style={{width: '100%', alignItems: 'start'}}
                             className="flex items-center gap-x-12 text-xs">
                            <div className="relative flex items-center gap-x-4">
                                <img
                                    src={review?.avatar ? review.avatar : default_user} alt="User Avatar"
                                    className="h-10 w-10 rounded-full bg-gray-50"/>
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-900">
                                        <div>
                                            <span className="absolute inset-0"/>
                                            {review.user.username}
                                        </div>
                                    </p>
                                    <time dateTime={review.date_created} className="text-xs text-gray-500">
                                        {formatDate(review.date_created)}
                                    </time>
                                </div>
                            </div>
                            <div className='flex flex-1' style={{justifyContent: 'end'}}>
                                <Rating rating={review.rating}/>
                            </div>
                        </div>
                        <EditDeleteButton/>
                    </div>
                    <div className="group relative max-w-full break-words">
                        <p className="mt-2 text-sm text-gray-600"> {review.text_content}</p>
                    </div>
                    {/*<div className='flex mt-6 pr-2 w-full'
                         style={{alignItems: 'center', justifyContent: 'space-between'}}>
                        <div className='flex gap-4'>
                            <div style={{alignItems: 'center', justifyContent: 'space-between'}} className='flex gap-1'>
                                <img className='hover:cursor-pointer' src={thumb_up}/>
                                <p className='text-sm'>{review.likes_count} Likes</p>
                            </div>
                            <div style={{alignItems: 'center', justifyContent: 'space-between'}} className='flex gap-1'>
                                <img className='hover:cursor-pointer' src={thumb_down}/>
                                <p className='text-sm'>1 Dislikes</p>
                            </div>
                            <div style={{
                                display: isAddCommentsClicked && 'none',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }} className='flex gap-1'>
                                <img onClick={toggleIsAddCommentsClicked} className='hover:cursor-pointer'
                                     src={add_comment}/>
                                <p className='text-sm'>Add Comment</p>
                            </div>
                            <div style={{
                                display: isAddCommentsClicked === false && 'none',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }} className='flex gap-1'>
                                <img onClick={toggleIsAddCommentsClicked} className='hover:cursor-pointer'
                                     src={add_comment}/>
                                <p className='text-sm'>Close</p>
                            </div>
                        </div>
                        <p onClick={toggleIsCommentsClicked}
                           className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600 hover:cursor-pointer">15
                            Comments</p>
                    </div>*/}
                </article>
                {/*<article
                    style={{display: isAddCommentsClicked === false && 'none', height: 'fit-content', width: '38rem'}}
                    className="border-b border-gray-900/10 p-5 gap-4 rounded-md flex items-start justify-between">
                    <img
                        src='https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt="" className="h-10 w-10 rounded-full bg-gray-50"/>
                    <div className='border border-gray-900/10 rounded-lg flex flex-col justify-between' style={{
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
                        }} placeholder="Add your comment" className="flex textarea"></textarea>
                        <div style={{
                            padding: '0.25rem',
                            width: '100%', height: '2.5rem', backgroundColor: 'white'
                        }} className='flex justify-end rounded-lg bg-transparent'>
                            <button
                                type='submit'
                                className='w-20 rounded-md bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                Post
                            </button>
                        </div>
                    </div>
                </article>
                <div style={{display: isCommentsClicked === false && 'none'}}>
                    <>comment card</>
                </div>*/}
            </div>
        ))
    )
}