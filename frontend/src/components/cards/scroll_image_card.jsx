import close_white from "../../assets/svgs/close_white.svg";
import ImageScrollCarousel from "../image_carousel/image_scroll_carousel.jsx";
import {toggleIsCarouselShowing} from "../../features/gallerySlice.js";
import {useDispatch, useSelector} from "react-redux";

export default function ScrollImageCard() {
    const dispatch = useDispatch()
    const isImageShowing = useSelector((state) => state.gallery.isImageCarouselShowing)

    const toggleIsImageShowing = () => {
        dispatch(toggleIsCarouselShowing(!isImageShowing))
    }

    return (
        <div className='fixed flex-col w-full z-50' style={{
            backgroundColor: 'rgba(0,0,0, 0.8)',
            justifyContent: 'center',
            alignItems: 'center',
            top: '0',
            height: '100vh',
            display: isImageShowing ? 'flex' : 'none',
            flex: '1'
        }}>
            <img onClick={toggleIsImageShowing} className='hover:cursor-pointer mr-[-36rem]' src={close_white}/>
            <div style={{backgroundColor: 'white', zIndex: 50}}
                 className='h-[35rem] w-[35rem] rounded-md'>
                <ImageScrollCarousel/>
            </div>
        </div>
    )
}