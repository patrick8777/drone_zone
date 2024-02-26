import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {api} from "../../api/api.js";
import {format} from 'date-fns'
import {selectDiscussion} from "../../features/forumEventsSlice.js";
import default_user from '../../assets/images/default_user.png'
import {MEDIA_ROOT} from '../../api/api.js'
import {loadSelectedUserID} from "../../features/userSlice.js";

export default function ForumPostCard({id, user, date_created, category, question, text_description, reply_count}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const fetchForumDiscussion = async () => {
        try {
            const response = await api.get(`/forums/${id}/`)
            const resolvedData = response.data;
            dispatch(selectDiscussion(resolvedData));
        } catch (error) {
            console.error("We could not retrieve the discussion details...", error);
        }
    }

    const handleSelectUser = () => {
        dispatch(loadSelectedUserID(user.id))
    }

    return (
        <Link onClick={fetchForumDiscussion} to='/forum/discussion' style={{height: '100%'}} className="bg-white p-2 rounded-lg shadow-md flex flex-col items-start justify-between">
            <div  className="flex items-center gap-x-4 text-xs">
                <time dateTime='2020-03-16' >
                    {format(new Date(date_created), 'MMM dd, yyyy')}
                </time>
                <div style={{ fontSize: '0.75rem' }} className="badge badge-info badge-outline">#{category}</div>
            </div>
            <div className="group relative items-center w-full">

                <div>
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-black group-hover:text-gray-600">
                        <div className="line-clamp-2">
                            <span className="absolute inset-0" />
                            {question}
                        </div>
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">{text_description} </p>
                </div>
            </div>
            <div className='flex mt-2 pr-2 w-full' style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="relative flex items-center gap-x-1">
                    <div className='h-8 w-8 rounded-full mr-2'>
                        <img
                            src={user.avatar ? `${MEDIA_ROOT}${user.avatar}` : default_user}
                            alt="Image" className="h-full w-full rounded-full object-cover bg-gray-50"/>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">
                            <Link style={{fontSize: '0.875rem'}} className='hover:cursor-pointer hover:text-gray-700 hover:text-red z-10' to='/profile'
                                  onClick={handleSelectUser}>
                                <span className="absolute inset-0"/>
                                {user.first_name} {user.last_name}
                            </Link>
                        </p>
                    </div>
                </div>
                <p className="mt-1 line-clamp-3 text-sm leading-6">{reply_count} Replies</p>
            </div>
        </Link>

    )
}