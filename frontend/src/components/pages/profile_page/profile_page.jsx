import ProfileSidebar from "../../side_bar/profile_sidebar.jsx";
import blue_gray_background from '../../../assets/svgs/blue_gray_background.svg'
import ForumPostCard from "../../cards/forum_post_card.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadSelectedUser} from "../../../features/userSlice.js";
import {api} from "../../../api/api.js";
import {useNavigate} from "react-router-dom";
import {loadEvents, loadForumPosts} from "../../../features/forumEventsSlice.js";
import default_user from "../../../assets/images/default_user.png";
import EventsPostCard from "../../cards/events_post_card.jsx";


export default function ProfilePage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [isEventsClicked, setIsEventsClicked] = useState(false)
    const validAccessToken = useSelector((state) => state.user.validAccessToken);
    const [userInfo, setUserInfo] = useState(null);
    const [forumPostInfo, setForumPostInfo] = useState()
    const [eventsInfo, setEventsInfo] = useState()
    const userID = useSelector((state) => state.user.selected_user_id)

    const myDronesArray = (userInfo && userInfo.my_drones !== '[]' && userInfo.my_drones !== '') && userInfo.my_drones.split(',').map(drone => drone.trim());
    const interestsArray = (userInfo && userInfo.interests !== '[]') && userInfo.interests.split(',').map(interest => interest.trim());


    const fetchPosts = async () => {
        try {
            setIsLoading(true);

            const response = await api.get("/forums/",);
            const resolvedData = response.data;
            setForumPostInfo(resolvedData);
            dispatch(loadForumPosts(resolvedData));
        } catch (error) {
            console.error("We could not retrieve forum discussions details...", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchEvents = async () => {
        try {
            setIsLoading(true);

            const response = await api.get("/events/",);
            const resolvedData = response.data;
            setEventsInfo(resolvedData);
            dispatch(loadEvents(resolvedData));
        } catch (error) {
            console.error("We could not retrieve event discussions details...", error);
        } finally {
            setIsLoading(false);
        }
    };


    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${validAccessToken}`,
                },
            };
            const response = await api.get(`/users/${userID}/`, config);
            const resolvedData = response.data;
            setUserInfo(resolvedData);
            dispatch(loadSelectedUser(resolvedData));
        } catch (error) {
            console.error("We could not retrieve your profile details...", error);
            navigate('/')
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchUser();
        fetchPosts();
        fetchEvents()
    }, []);


    const toggleIsEventsClicked = () => {
        setIsEventsClicked(!isEventsClicked)
    }

    const forumPostInfoFiltered = forumPostInfo && forumPostInfo.filter((post) => {
        if (post.user.id === userInfo.id) {
            return true;
        }
        if (post.replies.some(reply => reply.user.id === userInfo.id)) {
            return true;
        }
        if (post.replies.some(reply => reply.comments.some(comment => comment.user.id === userInfo.id))) {
            return true;
        }
        return false;
    });


    const eventsInfoFiltered = eventsInfo && eventsInfo.filter((event) => {
        if (event.author.id === userInfo.id) {
            return true;
        }
        if (event.replies.some(reply => reply.user.id === userInfo.id)) {
            return true;
        }
        if (event.replies.some(reply => reply.comments.some(comment => comment.user.id === userInfo.id))) {
            return true;
        }
        return false;
    });


    if (userInfo === null) return <div>Loading...</div>;


    return (
        <div style={{width: '100vw', minHeight: '100%'}} className='w-full'>
            <div style={{zIndex: '25'}}>
                <ProfileSidebar/>
            </div>
            <div style={{zIndex: '2', marginLeft: '15rem', marginRight: '15rem'}} className='flex flex-col '>
                <div style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // backgroundImage: `url(${blue_gray_background})`,
                    backgroundColor: 'rgb(14,23,42)',
                    height: '13rem',
                    alignItems: 'center',
                    width: '100%',
                    position: 'fixed',
                    zIndex: '20'
                }} className='flex'>
                    <div className='flex ml-10 gap-8'>
                        <div className="w-36 h-36 mask mask-squircle">
                            <img className="object-cover w-full h-full"
                                 src={userInfo?.avatar ? userInfo.avatar : default_user} alt="User Avatar"/>
                        </div>
                        <div style={{justifyContent: 'center'}} className='flex flex-col'>
                            <p style={{fontSize: '2rem', fontWeight: 'bold'}}
                               className='text-white'>{userInfo.first_name} {userInfo.last_name}</p>
                            <p className='text-white'>{userInfo.city}{(userInfo.city && userInfo.country) && ','} {userInfo.country}</p>
                            <ul style={{display: userInfo.interests ? 'flex' : 'none'}} className='mt-4 gap-3'>
                                {interestsArray && interestsArray.map((interest, index) => (
                                    <li key={index} className="badge badge-neutral">{interest}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex mt-[13rem] flex-1'>
                    <div className='flex flex-col flex-1'>
                        <div style={{
                            width: 'calc(100vw - 30rem)',
                            fontSize: '0.875rem',
                            position: 'fixed',
                            zIndex: '20',
                        }} className='bg-transparent h-fit text-white'>

                            <div className='p-2 pb-1' style={{
                                backgroundColor: 'rgb(15,23,41)',
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}>
                                <button onClick={toggleIsEventsClicked}
                                        className='flex justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                        style={{
                                            background: isEventsClicked === false && 'rgb(96,165,250)',
                                            fontWeight: 'bold',
                                            fontSize: '0.875rem',
                                            width: '47%'
                                        }}>Forum Activity
                                </button>
                                <button onClick={toggleIsEventsClicked}
                                        className='flex justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                        style={{
                                            background: isEventsClicked === true && 'rgb(96,165,250)',
                                            fontWeight: 'bold',
                                            fontSize: '0.875rem',
                                            width: '47%'
                                        }}>Events
                                </button>
                            </div>
                        </div>
                        <div
                            className='gap-5 pb-8 mt-[7rem] flex flex-col flex-1'>
                            <div style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: !isEventsClicked ? 'flex' : 'none'
                            }}
                                 className='flex gap-10 flex-wrap'>
                                {forumPostInfoFiltered && forumPostInfoFiltered.map((forum_post, index) => (
                                    <div key={index} className='rounded-md h-[12rem] w-[25rem]' style={{
                                        alignItems: 'start',
                                        gap: '2rem',
                                        boxShadow: '10px 10px 2px 1px rgb(96 165 250)',
                                    }}><ForumPostCard
                                        id={forum_post.id}
                                        date_created={forum_post.date_created}
                                        category={forum_post.category}
                                        question={forum_post.question}
                                        text_description={forum_post.text_description}
                                        reply_count={forum_post.reply_count}
                                        user={forum_post.user}
                                    /></div>))
                                }
                            </div>
                            <div style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: isEventsClicked ? 'flex' : 'none'
                            }} className='flex gap-10 flex-wrap'>
                                {eventsInfoFiltered && eventsInfoFiltered.map((event_post, index) => (
                                    <div key={index} className='rounded-md h-[12rem] w-[25rem]' style={{
                                        alignItems: 'start',
                                        gap: '2rem',
                                        boxShadow: '10px 10px 2px 1px rgb(96 165 250)',
                                    }}>
                                        <EventsPostCard
                                            user_id={event_post.author.id}
                                            id={event_post.id} title={event_post.title} category={event_post.category}
                                            detail={event_post.detail} event_date={event_post.event_date}
                                            participants_count={event_post.participants_count}
                                            first_name={event_post.author.first_name}
                                            last_name={event_post.author.last_name}
                                            type={event_post.type} avatar={event_post.author.avatar}
                                            city={event_post.city} country={event_post.country}
                                        />
                                    </div>))
                                }
                            </div>
                        </div>
                    </div>
                    <div style={{
                        boxShadow: '-10px 0 10px rgba(0, 0, 0, 0.3)',
                        fontSize: '0.875rem',
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        height: '100vh',
                        paddingTop: '15vh',
                        zIndex: '20',
                        backgroundColor: 'rgb(14,23,42)'
                    }} className='flex-col gap-4 p-5  w-[15rem] text-white max-w-full break-words'>
                        <div className='p-3 pl-[1rem] h-[50%]' style={{
                            display: userInfo.about ? 'block' : 'none',
                            boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1)',
                            backgroundColor: 'rgb(15,23,41)',
                            paddingBottom: '30vh',
                        }}>
                            <p className='pb-2' style={{fontWeight: 'bold'}}>About Me</p>
                            {userInfo.about}
                        </div>
                        <p style={{
                            display: (userInfo.my_drones !== '[]' && userInfo.my_drones !== '') ? 'block' : 'none',
                            fontWeight: 'bold',
                        }} className='border-t pl-[1rem] pt-[2rem] border-blue-500'>My Drone
                            History</p>
                        <p style={{
                            display: (userInfo.my_drones !== '[]' && userInfo.my_drones !== '') ? 'none' : 'block',
                            fontWeight: 'bold',
                            text: 'black'
                        }} className='border-t pl-[1rem] pt-[2rem] border-blue-500'>No drone history
                            added</p>
                        <ul className="timeline timeline-vertical mt-4 ml-[-10rem] text-black">
                            {myDronesArray && myDronesArray.map((drone, index) => (
                                <li key={index}>
                                    <hr/>
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white"
                                             className="w-5 h-5">
                                            <path fillRule="evenodd"
                                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="timeline-end timeline-box">{drone}</div>
                                    <hr/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}