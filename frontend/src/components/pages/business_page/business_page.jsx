import {useEffect, useState} from "react";
import blue_gray_background from "../../../assets/svgs/blue_gray_background.svg";
import Rating from "../../rating/rating.jsx";
import reviews from '../../../assets/svgs/reviews.svg'
import {Link, useParams} from "react-router-dom";
import ScrollImageCard from "../../cards/scroll_image_card.jsx";
import {api} from "../../../api/api.js";
import default_user from "../../../assets/images/default_user.png";
import {loadSelectedUserID} from "../../../features/userSlice.js";
import {useDispatch} from "react-redux";
import ReviewCard from "../../cards/review_card.jsx";


export default function BusinessPage() {

    const {id} = useParams();
    const [businessData, setBusinessData] = useState(null);
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchBusinessInfo = async () => {
            try {
                const response = await api.get(`/businesses/${id}/`);
                setBusinessData(response.data);
            } catch (error) {
                console.error('Error fetching business information:', error);
            }
        };

        fetchBusinessInfo();
    }, [id]);


    const handleSelectUser = () => {
        dispatch(loadSelectedUserID(id))
    }

    if (!businessData) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <ScrollImageCard/>
            <div className='flex w-full'>
                <div className='flex flex-col flex-1'>
                    <div style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${businessData?.background_image ? businessData.background_image : blue_gray_background})`,
                        height: '13rem',
                        alignItems: 'center',
                        width: '100vw',
                        position: 'fixed',
                        zIndex: '20'
                    }} className='flex gap-[25rem]'>
                        <div className='flex ml-10 gap-8'>
                            <div className="w-36 h-36 mask mask-squircle">

                                {businessData.type === 'Individual' && businessData.avatar && (
                                    <div className="w-36 h-36 mask mask-squircle">
                                        <img className="object-cover w-full h-full" src={businessData.avatar}
                                             alt="User Avatar"/>
                                    </div>
                                )}

                                {/*{businessData.type === 'Individual' && businessData.avatar ? (
                                    <img className="object-cover w-full h-full" src={businessData.avatar}
                                         alt="User Avatar"/>
                                ) : (
                                    <img className="object-cover w-full h-full" src={default_user}
                                         alt="Default User Avatar"/>
                                )}*/}

                            </div>
                            <div style={{justifyContent: 'center'}} className='flex flex-col'>
                                {businessData.type === 'Individual' ? (
                                    <p style={{fontSize: '2rem', fontWeight: 'bold'}}
                                       className='text-white'>{businessData.first_name} {businessData.last_name}</p>
                                ) : (
                                    <p style={{fontSize: '2rem', fontWeight: 'bold'}}
                                       className='text-white'>{businessData.company_name}</p>
                                )}
                                <p className='text-white'>{businessData.city}, {businessData.country}</p>
                                <ul className='mt-4 mb-4 flex gap-3'>
                                    <li className="badge badge-neutral">{businessData.services}</li>
                                </ul>
                                <Rating rating={businessData.average_rating}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-[13rem] flex-1'>
                        <div className='flex flex-col flex-1 mr-[15rem]'>
                            <div style={{
                                background: 'rgb(15 23 42)',
                                width: 'calc(100vw - 25rem)',
                                fontSize: '0.875rem',
                                position: 'fixed',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                zIndex: '20',
                            }} className='pl-10 p-4 h-fit'>
                                <p className='pb-2 text-white'
                                   style={{fontWeight: 'bold'}}>{businessData.description}</p>
                            </div>
                            <div style={{
                                width: 'calc(100vw - 25rem)',
                                fontSize: '0.875rem',
                                position: 'fixed',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                zIndex: '20',
                            }} className='pl-10 p-4 h-fit'>
                                <p className='text-white pb-2' style={{fontWeight: 'bold'}}>
                                    {typeof businessData.description === 'string' ? businessData.description : 'No description available'}
                                </p>
                            </div>
                            <div
                                className='mr-[5rem] ml-[5rem] mt-[7rem] mb-[2rem]'>
                                <div style={{justifyContent: 'center'}} className=' flex gap-5 flex-wrap'>

                                    <div style={{justifyContent: 'center'}} className='flex gap-10 flex-wrap'>
                                        <ReviewCard/>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div style={{
                            boxShadow: '-5px 0 10px rgba(0, 0, 0, 0.1)',
                            fontSize: '0.875rem',
                            position: 'fixed',
                            right: '0',
                            height: 'calc(100vh - 20rem)',
                            zIndex: '25',
                        }} className='flex-col gap-4 p-5 flex w-[15rem]'>
                            <ul className="pt-5 space-y-2 text-sm">
                                <li>
                                    <Link onClick={handleSelectUser} to={`/business/review/${id}`}
                                          className="flex items-center space-x-3 text-white p-2 rounded-full font-medium hover:bg-blue-400">
                                        <img style={{height: '1.25rem'}} src={reviews}/>
                                        <span>Write a review</span>
                                    </Link>
                                </li>

                            </ul>
                            <div className='flex flex-col flex-1 text-white' style={{justifyContent: 'end'}}>
                                <p className='bottom-0' style={{fontWeight: 'bold'}}>Contact us</p>
                                <p style={{fontWeight: 'normal'}}>{businessData.address}</p>
                                <p style={{fontWeight: 'normal'}}>{businessData.phone}</p>
                                <p style={{fontWeight: 'normal'}}>{businessData.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
