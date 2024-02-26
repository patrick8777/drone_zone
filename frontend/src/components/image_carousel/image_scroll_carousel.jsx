import {Carousel} from "@material-tailwind/react";
import {useSelector} from "react-redux";
import {MEDIA_ROOT} from "../../api/api.js";

export default function ImageScrollCarousel() {



    const isVideoFile = (fileName) => {
        const videoExtensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'];
        const fileExtension = fileName.split('.').pop().toLowerCase();
        return videoExtensions.includes(fileExtension);
    }

    const images = useSelector((state) => state.gallery.selected_gallery?.images);


    return (
        <Carousel transition={{duration: 1}}>
            {images && images.map((image, index) => (
                <div key={index} className="rounded-md hero min-h-full">
                    {isVideoFile(image.image) ? (
                        <video
                            src={`${MEDIA_ROOT}${image.image}`}
                            type={isVideoFile(image.image) ? 'video/quicktime' : 'image/*'}
                            className="w-full h-full object-cover rounded-md"
                            autoPlay
                            loop
                            muted
                            controls
                        />
                    ) : image.image.startsWith('http') ? (
                        <div
                            className="rounded-md hero min-h-full"
                            style={{backgroundImage: `url(${image.image})`}}
                        >
                            <div className="rounded-md hero-overlay bg-opacity-20"></div>
                        </div>
                    ) : (
                        <div
                            className="rounded-md hero min-h-full"
                            style={{backgroundImage: `url(${MEDIA_ROOT}${image.image})`}}
                        >
                            <div className="rounded-md hero-overlay bg-opacity-20"></div>
                        </div>
                    )}
                </div>
            ))}
        </Carousel>
    );
}
