import ForumPostCard from "../../cards/forum_post_card.jsx";
import ForumSidebar from "../../side_bar/forum_sidebar.jsx";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {loadForumPosts} from "../../../features/forumEventsSlice.js";
import {api} from "../../../api/api.js";
import {setIsForumSidebarOpen} from "../../../features/sidebarSlice.js";


export default function ForumPage() {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    const [forumPostInfo, setForumPostInfo] = useState()
    const quick_filter = useSelector((state) => state.sidebar.forum_sidebar_quick)
    const keyword = useSelector((state) => state.sidebar.forum_keyword)
    const isSidebarOpen = useSelector((state) => state.sidebar.forum_sidebar_open)


    const fetchAllPosts = async () => {
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

    const fetchBestPosts = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/forums/best/",);
            const resolvedData = response.data;
            setForumPostInfo(resolvedData);
            dispatch(loadForumPosts(resolvedData));
        } catch (error) {
            console.error("We could not retrieve forum discussions details...", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchLatestPosts = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/forums/latest/",);
            const resolvedData = response.data;
            setForumPostInfo(resolvedData);
            dispatch(loadForumPosts(resolvedData));
        } catch (error) {
            console.error("We could not retrieve forum discussions details...", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchInterestingPosts = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/forums/interests/",);
            const resolvedData = response.data;
            setForumPostInfo(resolvedData);
            dispatch(loadForumPosts(resolvedData));
        } catch (error) {
            console.error("We could not retrieve forum discussions details...", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (quick_filter === '' || quick_filter === 'all_discussions') {
            fetchAllPosts();
        } else if (quick_filter === 'most_active') {
            fetchBestPosts()
        } else if (quick_filter === 'my_interests') {
            fetchInterestingPosts()
        } else {
            fetchLatestPosts()
        }
    }, [quick_filter]);

    const filtered_posts = forumPostInfo && forumPostInfo.filter((forum_post) => {
        const searchMatch = keyword !== '' && forum_post.user.first_name.toLowerCase().includes(keyword.toLowerCase()) || forum_post.user.last_name.toLowerCase().includes(keyword.toLowerCase()) || forum_post.category.toLowerCase().includes(keyword.toLowerCase()) || forum_post.text_description.toLowerCase().includes(keyword.toLowerCase()) || forum_post.question.toLowerCase().includes(keyword.toLowerCase());

        if (keyword !== '' && searchMatch) {
            return true;
        } else if (keyword === '') {
            return true;
        }
        return false;
    });


    if (isLoading) return <div></div>;

    return (
        <div className='flex w-full'>
            <div>
                <ForumSidebar/>
            </div>
            <div className='flex h-fit flex-col gap-4 flex-1' style={{background: 'rgb(15 23 42)'}}>
                <div style={{
                    justifyContent: 'center',
                    gap: isSidebarOpen ? '2rem' : '2rem',
                    marginRight: '5rem',
                    marginLeft: '5rem'
                }}
                     className='pt-12 pb-20  bg-slate-900 flex flex-1 flex-wrap '>
                    {filtered_posts && filtered_posts.map((forum_post, index) => (
                        <div key={index} className='h-[12rem] w-[23rem] rounded-lg'
                             style={{alignItems: 'start',
                                 gap: '2rem',
                                 boxShadow: '10px 10px 2px 1px rgb(96 165 250)',
                             }}
                        ><ForumPostCard
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
            </div>

        </div>
    )
}