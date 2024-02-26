import {Carousel} from "@material-tailwind/react";
import backgroundVideo from '../../../assets/videos/Sequence 02.mp4'

export default function BackgroundCarousel() {
    return (
        <Carousel transition={{duration: 0.75}}>
            <div className="hero min-h-full">
                <video autoPlay muted loop className="w-full h-full object-cover">
                    <source src={backgroundVideo} type="video/mp4"/>
                    {/* You can add additional <source> elements for different video formats */}
                    Your browser does not support the video tag.
                </video>
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="text-white mb-5 text-9xl font-bold ">TIME TO FLY</h1>
                        <p className="text-white text-5xl italic mb-5">GET IN THE ZONE</p>
                    </div>
                </div>
            </div>

            <div className="hero min-h-full"
                 style={{backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/024/650/100/large_2x/autumn-mountain-landscape-captured-by-flying-drone-camera-generated-by-ai-free-photo.jpg)'}}>
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="text-white mb-5 text-9xl font-bold ">TIME TO FLY</h1>
                        <p className="text-white text-5xl italic mb-5">GET IN THE ZONE</p>
                    </div>
                </div>
            </div>

            <div className="hero min-h-full"
                 style={{backgroundImage: 'url(https://epepa.eu/wp-content/uploads/2019/07/best-drone-photography-locations-croatia.jpg)'}}>
                <div className="hero-overlay bg-opacity-30"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="text-white mb-5 text-9xl font-bold ">TIME TO FLY</h1>
                        <p className="text-white text-5xl italic mb-5">GET IN THE ZONE</p>
                    </div>
                </div>
            </div>
        </Carousel>
    );
}

// export default function BackgroundVideo() {
//     return (
//         <div className="hero min-h-full">
//             <video autoPlay muted loop className="w-full h-full object-cover">
//                 <source src={backgroundVideo} type="video/mp4"/>
//                 {/* You can add additional <source> elements for different video formats */}
//                 Your browser does not support the video tag.
//             </video>
//             <div className="hero-overlay bg-opacity-20"></div>
//             <div className="hero-content text-center text-neutral-content">
//                 <div className="max-w-md">
//                     <h1 className="text-white	mb-5 text-9xl font-bold ">TIME TO FLY</h1>
//                     <p className="text-white mb-5">JOIN NOW</p>
//                 </div>
//             </div>
//         </div>
//     );
// }