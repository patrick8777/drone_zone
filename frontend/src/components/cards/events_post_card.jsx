import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {api, MEDIA_ROOT} from "../../api/api.js";
import {selectDiscussion} from "../../features/forumEventsSlice.js";
import {format} from 'date-fns'
import default_user from "../../assets/images/default_user.png";
import {loadSelectedUserID} from "../../features/userSlice.js";


export default function EventsPostCard({
                                           id,
                                           title,
                                           category,
                                           detail,
                                           event_date,
                                           city,
                                           country,
                                           participants_count,
                                           first_name,
                                           last_name,
                                           type,
                                           avatar,
                                           user_id
                                       }) {

    const dispatch = useDispatch()


    const fetchEvents = async () => {
        try {
            const response = await api.get(`/events/${id}/`)
            const resolvedData = response.data;
            dispatch(selectDiscussion(resolvedData));
        } catch (error) {
            console.error("Error", error);
        }
    }

    const handleSelectUser = () => {
        dispatch(loadSelectedUserID(user_id))
    }

    return (
        <Link onClick={fetchEvents} to='/events/discussion' style={{ height: '100%', width: '100%' }}
            className="p-2 bg-white rounded-md shadow-lg flex flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
                <div style={{ fontSize: '0.75rem' }} className="badge badge-info badge-outline">#{category}</div>
                <div style={{ display: event_date ? 'block' : 'none', fontSize: '0.75rem' }} className="badge badge-secondary badge-outline">
                    Date: {format(new Date(event_date), 'MMM dd, yyyy')}
                </div>
                <div style={{ display: type === false && 'none', fontSize: '0.75rem' }}
                    className="badge badge-accent badge-outline">Virtual
                </div>
                <div style={{ display: (city || country) ? 'block' : 'none', fontSize: '0.75rem' }}
                    className="badge badge-default badge-outline">{city}{country && ','} {country}
                </div>
            </div>

            <div className="flex w-full items-center gap-x-4">

                <div className="group relative w-full">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href='#'>
                            <span className="absolute inset-0" />
                            {title}
                        </a>
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">{detail}</p>
                </div>
            </div>

            <div className='flex w-full justify-between items-center'>
                <div className="relative flex items-center gap-x-2">
                    <div className='h-8 w-8 rounded-full'>
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
                    <div className="text-sm leading-2">
                        <p className="font-semibold text-gray-900">
                            <Link
                                className='hover:cursor-pointer hover:text-gray-700 hover:text-red z-20' to='/profile'
                                onClick={handleSelectUser}>
                                <span className="absolute inset-0"/>
                                {first_name} {last_name}
                            </Link>
                        </p>
                    </div>
                </div>
                <p className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600">{participants_count} Participants</p>
            </div>
        </Link>
    )
}
