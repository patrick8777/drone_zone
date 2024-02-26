import blue_gray_background from "../../../assets/svgs/blue_gray_background.svg";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {api} from "../../../api/api.js";
import default_user from "../../../assets/images/default_user.png";
import {useDispatch, useSelector} from "react-redux";
import {createReviews, selectReviewsId} from "../../../features/reviewsSlice.js";
import useSetItem from "../../../hooks/useSetItem.js";

export default function BusinessReviewPage() {

    const {id} = useParams();
    const [businessData, setBusinessData] = useState(null);

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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [text_content, setTextContent] = useSetItem()
    const [selectedRating, setSelectedRating] = useState(0);


    const validAccessToken = useSelector((state) => state.user.validAccessToken);

    const handleCreateReview = async (e) => {

        e.preventDefault();
        let data = {
            text_content: text_content,
            rating: selectedRating,
        };

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                }
            };
            const res = await api.post(`/reviews/new/${id}/`, data, config);
            const resolvedData = res.data;
            dispatch(selectReviewsId(id));
            dispatch(createReviews(resolvedData));
            navigate(`/business/${id}`);
        } catch (error) {
            console.error("Failed to post review:", error);
        }
    };

    if (!businessData) {
        return <p>Loading...</p>;
    }

    const handleSelectRating = (rating) => {
        setSelectedRating(rating);
    };

    // Function to render the stars for rating selection
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`cursor-pointer text-2xl ${
                        i <= selectedRating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => handleSelectRating(i)}
                >
                    ★
                </span>
            );
        }
        return stars;
    };


    return (
        <>
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
                    </div>
                </div>
            </div>
            <div className="mt-[18rem] w-[40rem] border-b border-gray-900/10 pb-12">
                <div className="col-span-full">
                    <div className='mb-10'>
                        {/* 5 star rating set here */}
                        {renderStars()}
                    </div>
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-white">
                        Review
                    </label>
                    <div className="mt-1 mb-5">
                                <textarea
                                    onChange={setTextContent}
                                    style={{height: "6rem"}}
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <Link to='/business/search'>
                        <button type="button"
                                className='flex w-[270px] justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                            Cancel
                        </button>
                    </Link>
                    <button
                        onClick={handleCreateReview}
                        type="submit"
                        className='flex w-[270px] justify-center rounded-full bg-transparent border border-blue-400 px-3 py-1.5 text-sm font-semibold leading-10 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                        Post
                    </button>

                </div>
            </div>

        </>
    )
}