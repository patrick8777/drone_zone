import EventsPostCard from "../../cards/events_post_card.jsx";
import EventsSidebar from "../../side_bar/events_sidebar.jsx";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {api} from "../../../api/api.js";
import {loadEvents} from "../../../features/forumEventsSlice.js";
import Calendar from "../../cards/calendar.jsx";


export default function EventsPage() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    const eventPosts = useSelector((state) => state.forum_event.events)
    const keyword = useSelector((state) => state.sidebar.events_keyword)
    const quick_filter = useSelector((state) => state.sidebar.events_sidebar_quick)
    const isSidebarOpen = useSelector((state) => state.sidebar.events_sidebar_open)
    const selected_date = useSelector((state) => state.sidebar.selected_date)

    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/events/",);
            const resolvedData = response.data;
            dispatch(loadEvents(resolvedData));
        } catch (error) {
            console.error("Error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPopularEvents = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/events/popular/",);
            const resolvedData = response.data;
            dispatch(loadEvents(resolvedData));
        } catch (error) {
            console.error("Error", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (quick_filter === 'most_popular') {
            fetchPopularEvents()
        } else {
            fetchEvents()
        }
    }, [quick_filter]);


    const filtered_posts = eventPosts && eventPosts.filter((event_post) => {
        const searchMatch = keyword !== '' && event_post.author.first_name.toLowerCase().includes(keyword.toLowerCase()) || event_post.author.last_name.toLowerCase().includes(keyword.toLowerCase()) || event_post.country.toLowerCase().includes(keyword.toLowerCase()) || event_post.city.toLowerCase().includes(keyword.toLowerCase()) || event_post.category.toLowerCase().includes(keyword.toLowerCase()) || event_post.detail.toLowerCase().includes(keyword.toLowerCase()) || event_post.title.toLowerCase().includes(keyword.toLowerCase());

        if (keyword !== '' && searchMatch) {
            return true;
        } else if (keyword === '') {
            return true;
        }
        return false;
    });

    const filtered_posts_second = filtered_posts && filtered_posts.filter((event_post) => {
        if (quick_filter === 'virtual' && event_post.type === true) {
            return true
        } else if (quick_filter === 'in_person' && event_post.type === false) {
            return true
        } else if (quick_filter === '' || quick_filter === 'all_events' || quick_filter === 'most_popular') {
            return true
        }
        return false
    })

    const filtered_posts_final = filtered_posts_second && filtered_posts_second.filter((event_post) => {
        const originalDate = new Date(event_post.event_date);
        if (selected_date === originalDate.toLocaleDateString('en-US')) {
            return true
        } else if (selected_date === '') {
            return true
        }
        return false
    })


    if (isLoading) return <div></div>

    return (
        <div className='flex w-full'>
            <div>
                <EventsSidebar/>
            </div>
            <div style={{position: 'fixed', right: '5rem', top: '5rem', zIndex: '50'}}>
                <Calendar selected_date={selected_date}/>
            </div>
            <div className='flex h-fit flex-col flex-1'>
                <div style={{
                    justifyContent: 'center',
                    gap: isSidebarOpen ? '2rem' : '2rem',
                    marginRight: '5rem',
                    marginLeft: '5rem'
                }}
                     className='pt-12 bg-opacity-40 flex flex-1 flex-wrap'>
                    {filtered_posts_final &&
                        filtered_posts_final.map((event_post, index) => (
                            <div className="h-[12rem] w-[23rem] rounded-lg"
                                 key={index}
                                 style={{
                                     alignItems: 'start',
                                     gap: '2rem',
                                     boxShadow: '10px 10px 2px 1px rgb(96 165 250)',
                                 }}>
                                <EventsPostCard
                                    user_id={event_post.author.id}
                                    id={event_post.id} title={event_post.title} category={event_post.category}
                                    detail={event_post.detail} event_date={event_post.event_date}
                                    participants_count={event_post.participants_count}
                                    first_name={event_post.author.first_name} last_name={event_post.author.last_name}
                                    type={event_post.type} avatar={event_post.author.avatar}
                                    city={event_post.city} country={event_post.country}
                                />
                            </div>
                        ))}
                </div>
            </div>

        </div>

    )
}