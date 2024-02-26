import ImageCard from "../../cards/image_card.jsx";
import ScrollImageCard from "../../cards/scroll_image_card.jsx";
import {useEffect} from "react";
import {api} from "../../../api/api.js";
import {loadGallery} from "../../../features/gallerySlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import GallerySidebar from "../../side_bar/gallery_sidebar.jsx";


export default function GalleryPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validAccessToken = useSelector((state) => state.user.validAccessToken);
    const selectedValue = useSelector((state) => state.sidebar.gallery_sidebar_quick)
    const inputSearch = useSelector((state) => state.sidebar.gallery_keyword)
    const profile_gallery = useSelector((state) => state.gallery.galleries)
    const userInfo = useSelector((state) => state.user.userData)
    const isSidebarOpen = useSelector((state)=> state.sidebar.gallery_sidebar_open)
    const keyword = useSelector((state) => state.sidebar.forum_keyword)
    const myDronesArray = (userInfo && userInfo.my_drones !== '[]' && userInfo.my_drones !== '') && userInfo.my_drones.split(',').map(drone => drone.trim());
    const selected_gallery = useSelector((state) => state.gallery.selected_gallery)
    const isImageCarouselShowing = useSelector((state) => state.gallery.isImageCarouselShowing)


    const fetchGallery = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                },
            };
            const response = await api.get(`/galleries/`, config);
            const reversedGalleries = response.data.reverse();
            dispatch(loadGallery(reversedGalleries));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchGallery()
    }, []);

    const profile_gallery_filtered_first = profile_gallery && profile_gallery.filter((gallery) => gallery.private === false)


    const profile_gallery_filtered_second = profile_gallery_filtered_first && profile_gallery_filtered_first.filter((gallery) => {
        if (selectedValue === 'all...' || selectedValue === '' || selectedValue === 'all') {
            return true;
        } else if (selectedValue === 'favourites' && gallery.favourite === true) {
            return true;
        } else if (selectedValue === 'my_drones' && myDronesArray.includes(gallery.drone)) {
            return true
        }
        return false;
    });

    const profile_gallery_filtered = profile_gallery_filtered_second && profile_gallery_filtered_second.filter((gallery) => {
        const searchMatch =
            inputSearch !== '' &&
            (gallery.drone.toLowerCase().includes(inputSearch.toLowerCase()) ||
                gallery.user.first_name.toLowerCase().includes(inputSearch.toLowerCase()) ||
                gallery.user.last_name.toLowerCase().includes(inputSearch.toLowerCase()) ||
                gallery.text_content.toLowerCase().includes(inputSearch.toLowerCase()));

        if (inputSearch !== '' && searchMatch) {
            return true;
        } else if (inputSearch === '') {
            return true;
        }
        return false;
    });

    useEffect(() => {
        !validAccessToken && navigate('/login')
    }, [])

    const calculateCardSize = (images) => {
        if (images && images[0]) {
            const image = images[0];
            const aspectRatio = image.width / image.height;
            if (aspectRatio >= 1 && aspectRatio < 1.2) {
                return 'bento-medium'; // Slightly wider
            } else if (aspectRatio >= 0.85 && aspectRatio < 1.2) {
                return 'bento-small'; // Slightly taller
            } else if (aspectRatio >= 0.6 && aspectRatio < 0.85) {
                return 'bento-tall'; // Tall
            } else if (aspectRatio < 0.6) {
                return 'bento-extra-tall'; // Very tall (portrait orientation)
            }
        }
        return 'bento-medium'; // Default size
    };

    function splitTextIntoLines(text) {
        const chunkSize = 100;
        const regex = new RegExp(`.{1,${chunkSize}}`, 'g');
        return text.match(regex) || [];
    }

    return (
        <>
            <div className='bg-slate-900 flex flex-col w-full z-10'>

                <div className='z-50'>
                    <GallerySidebar/>
                </div>
                <ScrollImageCard/>
                <div
                    className='fixed bottom-12 left-1/2 transform -translate-x-1/2 mb-8 rounded-lg bg-black bg-opacity-90 shadow-md text-white p-4 z-50'
                    style={{display: isImageCarouselShowing ? "block" : "none"}}>
                    {selected_gallery && splitTextIntoLines(selected_gallery.text_content).map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
                <div
                    className='pl-40 pr-40 pt-12 pb-20 flex-wrap  flex justify-between gap-5 '>
                    {/*className= 'pl-24 pr-16 pt-12 pb-20 grid grid-cols-3 gap-4'>*/}
                    {profile_gallery_filtered && profile_gallery_filtered.map((gallery, index) => (
                        <div key={index}
                             className={`flex-auto card card-compact bg-base-100 shadow-xl ${calculateCardSize(gallery.images)}`}>
                            <ImageCard
                                id={gallery.id}
                                drone={gallery.drone}
                                text_content={gallery.text_content}
                                images={gallery.images}
                                user={gallery.user}
                                favourite={gallery.favourite}
                                private_gallery={gallery.private}
                            />
                        </div>))}
                </div>
            </div>
        </>
    )
}

