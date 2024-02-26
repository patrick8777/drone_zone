import {useDispatch, useSelector} from "react-redux";
import star from '../../assets/svgs/star.svg'
import {api, MEDIA_ROOT} from "../../api/api.js";
import default_user from "../../assets/images/default_user.png";
import star_full from '../../assets/svgs/star_full.svg'
import {
    deleteGalleryPost,
    loadSelectedGallery,
    loadSelectedGalleryID,
    toggleIsCarouselShowing,
    updateGallery
} from "../../features/gallerySlice.js";
import VideoThumbnailExtractor from "./video_extractor.jsx";
import {Link} from "react-router-dom";
import {loadSelectedUserID} from "../../features/userSlice.js";

export default function ImageCard({id, favourite, private_gallery, images, drone, user, text_content}) {

    const dispatch = useDispatch()
    const isImageShowing = useSelector((state) => state.gallery.isImageCarouselShowing)
    const validAccessToken = useSelector((state) => state.user.validAccessToken);
    const loggedUser = useSelector((state) => state.user.userData);

    const toggleIsImageShowing = () => {
        dispatch(toggleIsCarouselShowing(!isImageShowing))
    }

    const toggleFavourite = async () => {
        const formData = new FormData()
        formData.append('favourite', !favourite)
        console.log(id)
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                },
            };
            const response = await api.patch(`/galleries/${id}/`, formData, config);
            dispatch(updateGallery(response.data))
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const deleteGallery = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                },
            };
            const response = await api.delete(`/galleries/${id}/`, config);
            dispatch(loadSelectedGalleryID(id))
            dispatch(deleteGalleryPost())
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const isVideoFile = (fileName) => {
        const videoExtensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'];
        const fileExtension = fileName.split('.').pop().toLowerCase();
        return videoExtensions.includes(fileExtension);
    }

    // Determine the appropriate class based on certain conditions
    const determineCardSizeClass = () => {
        if (images && images.length > 0) {
            const image = images[0];
            if (image.width >= 300 && image.height >= 200) {
                return "bento-large";
            } else if (image.width >= 200 && image.height >= 150) {
                return "bento-medium";
            } else if (image.width >= 150 && image.height >= 200) {
                return "bento-small";
            } else if (image.width >= 150 && image.height >= 300) {
                return "bento-tall";
            } else if (image.width === 200 && image.height === 200) {
                return "bento-square";
            }
        }
        // Default size if images are not provided or don't meet any condition
        return "bento-medium";
    };

    const handleSelectUser = () => {
        dispatch(loadSelectedUserID(user.id))
    }

    return (
        <div onClick={() => {
            dispatch(loadSelectedGallery(id));
            toggleIsImageShowing();
        }}
             className={`hover:cursor-pointer card card-compact bg-white shadow-xl ${determineCardSizeClass()}`}>
            <figure className="relative h-56 z-10">
                {images && isVideoFile(images[0].image) ? (
                    <VideoThumbnailExtractor videoSource={`${MEDIA_ROOT}${images[0].image}`}/>
                ) : images[0].image.startsWith('http') ? (
                    <img
                        src={images[0].image}
                        alt="Image" className="object-cover w-full h-full"
                    />
                ) : (
                    <img
                        src={`${MEDIA_ROOT}${images[0].image}`}
                        alt="Image" className="object-cover w-full h-full"
                    />
                )}
                <div className={'top-1 left-1 absolute rounded-lg flex items-center justify-center z-20'}>
                    <img onClick={(event) => {
                        event.stopPropagation();
                        toggleFavourite();
                    }}
                         className={'invert'}
                         src={favourite ? star_full : star}/>
                </div>
                <button
                    onClick={(event) => {
                        event.stopPropagation();
                        deleteGallery();
                    }}
                    style={{display: loggedUser?.id === user?.id ? 'block' : 'none'}}
                    className={`btn btn-xs absolute top-1 right-1 z-20`}>Delete
                </button>
            </figure>
            <div className="p-2 card-body gap-1 h-12">
                <div className='flex w-full justify-between items-center'>
                    <div className="flex gap-x-2 items-center">
                        <div className='h-5 w-5 rounded-full'>
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
                            <p className="font-semibold text-gray-900">
                                <div>
                                    <span className="absolute inset-0"/>
                                    {user.first_name} {user.last_name}
                                </div>
                            </p>
                        </div>
                    </div>
                    <div>
                        {drone && <div className="badge badge-outline">{drone}</div>}
                        {private_gallery &&
                            <div className="mt-2 badge badge-outline text-red-600 border border-red-600">Private</div>}
                    </div>
                </div>
            </div>
        </div>
    )

}