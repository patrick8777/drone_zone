import React, {useState} from "react";
import DroneCard from "../../cards/drone_card.jsx";
import {Link} from 'react-router-dom';
import image1 from "../../../assets/images/drone/dJI_phantom_4_pro_v2.0.jpg"
import image21 from "../../../assets/images/drone/dJI_phantom_4_pro_v2.0.jpg"
import image2 from "../../../assets/images/drone/parrot_anafi.jpg"
import image3 from "../../../assets/images/drone/skydio_2.jpg"
import image4 from "../../../assets/images/drone/autel_robotics_evo_2.jpg"
import image5 from "../../../assets/images/drone/yuneec_typhoon_h_pro.jpg"
import image6 from "../../../assets/images/drone/holy_stone_hs720.jpg"
import image7 from "../../../assets/images/drone/autel_robotics_evo_lite_plus.jpg"
import image8 from "../../../assets/images/drone/power_vision_power_egg_x.jpg"
import image9 from "../../../assets/images/drone/ryze_tello.jpg"
import image10 from "../../../assets/images/drone/walkera_vitus_320.jpg"
import image11 from "../../../assets/images/drone/hubsan_zino_pro_plus.jpg"
import image12 from "../../../assets/images/drone/potensic_D85.jpg"
import image13 from "../../../assets/images/drone/eachine_E520S.jpg"
import image14 from "../../../assets/images/drone/jrrc_x12.jpg"
import image15 from "../../../assets/images/drone/snaptain_sp500.jpg"
import image16 from "../../../assets/images/drone/evo_nano_series.jpg"
import image17 from "../../../assets/images/drone/hglrc_petrel_120x.jpg"
import image18 from "../../../assets/images/drone/xiaomi_fimi_x8_se.jpg"
import image19 from "../../../assets/images/drone/potensic_t25.jpg"
import image20 from "../../../assets/images/drone/mjx_bugs_4_w.jpg"
import image22 from "../../../assets/images/drone/freefly_astro.jpg"
import image23 from "../../../assets/images/drone/flyability_elios_2.jpg"
import image24 from "../../../assets/images/drone/dji_mavic_mini.jpg"
import image25 from "../../../assets/images/drone/potensic_dreamer_pro.jpg"
import image26 from "../../../assets/images/drone/sjrc_f11_4k_pro.jpg"
import image27 from "../../../assets/images/drone/ruko-f11gim2-01.webp"
import image28 from "../../../assets/images/drone/force1_f100gp.jpg"
import image29 from "../../../assets/images/drone/drocon_ninja.jpg"
import image30 from "../../../assets/images/drone/contixo_f22.jpg"


const accordionItems = [
    {
        title: 'I want to hire a professional drone operator or an instructor',
        content: 'Please visit our Services page',
        link: 'https://dronet.propulsion-learn.ch/business/search'
    },
    {
        title: 'Basic rules for flying in Switzerland',
        content: (
            <div>
                - You must be at least 12 years old to pilot a drone <br/>
                - You must register if piloting a drone equipped with a camera <br/>
                - Always maintain direct visual contact with your drone <br/>
                - Fly no higher than 120m above ground level <br/>
                - Keep a suitable distance from people who are not involved in flying the drone <br/>
                - Do not fly over assemblies of people
            </div>
        ),
    },
    {
        title: 'Who needs to register for drones in Switzerland?',
        content: 'Almost all drone operators must register with the Federal Office of Civil Aviation on UAS.gate. Drones weighing less than 250g are exempt from this, but only if they are unable to collect personal data. This means that all drones with cameras must be registered, as they can record faces and thus collect personal data. Registration is free and requires a CH-Login. Please find the link to UAS.gate ',
        link: 'https://www.bazl.admin.ch/bazl/en/home/drohnen/uasgate.html',
    },
    {
        title: 'Who needs to take a drone exam?',
        content: 'Anyone piloting a drone that weighs 250g or more must take an online exam. The training and examination take around four hours. You must answer at least 75% of the exam questions correctly to pass. The certificate is valid for five years. If your drone weighs between 900g and 4kg you will need to sit the exam on site. Certificates from other EU countries are valid in Switzerland and vice versa.',
    },
    {
        title: 'Where can I fly my drone?',
        content: 'There are some areas of Switzerland where flying a drone is forbidden or only possible with a permit, ' +
            'for example near airfields, nature reserves and hospitals. You can consult the FOCA drone map and the swisstopo app' +
            ' to find out which areas you can or cannot fly in, and which areas are subject to restrictions, or check the oficial map page',
        link:'https://dronet.propulsion-learn.ch/map',
    },
];


const droneItems = [
    {
        name: "DJI Phantom 4 Pro V2.0",
        description: "The DJI Phantom 4 Pro V2.0 is a versatile drone equipped with a powerful camera capable of shooting 4K video at 60fps and capturing 20MP photos. It features obstacle sensing in five directions for safer flight and precise positioning with its GPS and GLONASS systems.",
        website: "https://www.dji.com/global/support/product/phantom-4-pro",
        image: image1
    },
    {
        name: "Parrot Anafi",
        description: "The Parrot Anafi is a lightweight and foldable drone designed for portability and aerial photography. It boasts a 4K HDR camera with a 180° tilt gimbal, enabling unique perspectives and creative shots. With up to 25 minutes of flight time, it's suitable for various outdoor adventures.",
        website: "https://www.parrot.com/us/drones/anafi",
        image: image2
    },
    {
        name: "Skydio 2",
        description: "The Skydio 2 is an autonomous drone renowned for its advanced obstacle avoidance capabilities. Equipped with six 4K navigation cameras, it can navigate complex environments with ease, making it ideal for capturing action shots and dynamic footage.",
        website: "https://www.skydio.com/skydio2",
        image: image3
    },
    {
        name: "Autel Robotics Evo II",
        description: "The Autel Robotics Evo II is a professional-grade drone featuring a 6K camera capable of capturing stunning aerial footage. With a 40-minute flight time and a range of intelligent flight modes, it offers versatility for various applications, including cinematography, mapping, and inspection.",
        website: "https://www.autelrobotics.com/productdetail/evo-ii-drones/",
        image: image4
    },
    {
        name: "Yuneec Typhoon H Pro",
        description: "The Yuneec Typhoon H Pro is a hexacopter drone equipped with a 4K camera and a 3-axis gimbal for stable and smooth footage. It features Intel RealSense technology for obstacle avoidance and offers various intelligent flight modes for creative aerial photography.",
        website: "https://yuneec.com/our-drones/",
        image: image5
    },
    {
        name: "Holy Stone HS720",
        description: "The Holy Stone HS720 is a budget-friendly foldable drone suitable for beginners and hobbyists. It features a 2K camera, GPS-assisted flight, and smart features like follow-me mode and gesture control, making it easy to capture aerial photos and videos.",
        website: "https://www.holystone.com/product/hs720-gps-drone-with-4k-camera/",
        image: image6
    },
    {
        name: "Autel Robotics Evo Lite+",
        description: "The Autel Robotics Evo Lite+ is a compact and lightweight drone designed for aerial photography and videography enthusiasts. It features a 1-inch CMOS sensor capable of capturing 6K resolution videos and 20MP photos. With intelligent flight modes and obstacle avoidance, it offers a user-friendly flying experience.",
        website: "https://www.autelrobotics.com/productdetail/evo-lite-series-drones/",
        image: image7
    },
    {
        name: "PowerVision PowerEgg X",
        description: "The PowerVision PowerEgg X is a versatile drone that can also transform into a handheld camera or a waterproof AI camera. It features a 4K camera with a 3-axis gimbal for stable footage and offers AI-based tracking and gesture control for intuitive operation.",
        website: "https://www.powervision.me/us/poweregg-x/overview",
        image: image8
    },
    {
        name: "Ryze Tello",
        description: "The Ryze Tello is a small and affordable drone packed with features suitable for beginners and educational purposes. It can perform flips, shoot 720p videos, and capture 5MP photos. With programmable features and compatibility with coding platforms like Scratch, it's an excellent tool for learning the basics of drone programming.",
        website: "https://www.ryzerobotics.com/tello",
        image: image9
    },
    {
        name: "Walkera Vitus 320",
        description: "The Walkera Vitus 320 is a compact and portable drone equipped with a 4K camera and a 3-axis gimbal for stabilized aerial photography. It features intelligent flight modes such as follow-me, orbit, and waypoint navigation, making it suitable for capturing dynamic shots and exploring creative possibilities.",
        website: "https://www.walkera.com/",
        image: image10
    },
    {
        name: "Hubsan Zino Pro Plus",
        description: "The Hubsan Zino Pro Plus is a feature-packed drone equipped with a 4K camera and a 3-axis gimbal for stable aerial footage. It offers intelligent flight modes, GPS/GLONASS positioning, and up to 43 minutes of flight time, making it suitable for both recreational and professional use.",
        website: "https://www.hubsan.com/na/index.php?main_page=index&country=Viet%20Nam&lang=English%20%2F%20%24%20USD&origin=Asia&spt_lang=en",
        image: image11
    },
    {
        name: "Potensic D85",
        description: "The Potensic D85 is a powerful drone designed for outdoor exploration and aerial photography. It features a 2K camera, GPS positioning, and brushless motors for stable flight performance. With smart features like follow-me mode and waypoints, it offers versatility for various applications.",
        website: "https://www.potensic.com/",
        image: image12
    },
    {
        name: "Eachine E520S",
        description: "The Eachine E520S is an affordable foldable drone equipped with a 4K camera and adjustable angle for capturing aerial footage. It features GPS positioning, follow-me mode, and gesture control, making it suitable for beginners and casual users.",
        website: "https://www.eachine.com/",
        image: image13
    },
    {
        name: "JJRC X12",
        description: "The JJRC X12 is a compact and portable drone equipped with a 3-axis stabilized gimbal and a 4K camera for capturing high-quality aerial footage. It features GPS positioning, intelligent flight modes, and up to 25 minutes of flight time, making it suitable for various outdoor activities.",
        website: "https://www.jjrc.com/goodshow/x12-5g-wi-fi-drone-with-3-axis-stabilizer-gimbal-ultra-sonic-altitude-hold-and-optical-flow-positioning.html",
        image: image14
    },
    {
        name: "Snaptain SP500",
        description: "The Snaptain SP500 is a beginner-friendly drone equipped with a 2.7K camera and GPS-assisted flight for stable aerial photography. It features smart features like follow-me mode, gesture control, and customizable flight paths, making it suitable for capturing memorable moments from unique perspectives.",
        website: "https://snaptain.com/pages/downloads",
        image: image15
    },
    {
        name: "EVO Nano Series",
        description: "The EVO Nano Series is a lineup of compact and lightweight drones designed for indoor and outdoor flying. Equipped with HD cameras and intuitive controls, these drones offer stability and maneuverability for capturing aerial photos and videos.",
        website: "https://shop.autelrobotics.com/collections/drones-evo-nano-series",
        image: image16
    },
    {
        name: "HGLRC Petrel 120X",
        description: "The HGLRC Petrel 120X is a micro FPV racing drone designed for high-speed maneuvers and immersive flying experiences. With its lightweight frame, powerful motors, and FPV camera, it offers adrenaline-fueled fun for racing enthusiasts and drone pilots.",
        website: "https://www.hglrc.com/collections/new-arrivals",
        image: image17
    },
    {
        name: "Xiaomi FIMI X8 SE",
        description: "The Xiaomi FIMI X8 SE is a foldable drone equipped with a 4K camera and a 3-axis gimbal for stabilized aerial footage. It features intelligent flight modes, GPS/GLONASS positioning, and up to 33 minutes of flight time, making it suitable for aerial photography and videography.",
        website: "https://www.fimi.com/fimi-x8-se-2022.html",
        image: image18
    },
    {
        name: "Potensic T25",
        description: "The Potensic T25 is a GPS-enabled drone equipped with a 1080p camera and a 9-axis gyro for stable flight performance. It features smart features like follow-me mode, waypoint navigation, and altitude hold, making it suitable for beginners and recreational users.",
        website: "https://www.potensic.com/",
        image: image19
    },
    {
        name: "MJX Bugs 4W",
        description: "The MJX Bugs 4W is a budget-friendly drone equipped with a 2K camera and GPS positioning for stable aerial photography. It features intelligent flight modes, long-range transmission, and up to 20 minutes of flight time, making it suitable for capturing scenic views and outdoor adventures.",
        website: "http://www.mjxrc.net/goodshow/bugs-4-w.html",
        image: image20
    },
    {
        name: "DJI Matrice 300 RTK",
        description: "The DJI Matrice 300 RTK is a professional-grade drone designed for industrial applications such as aerial inspections, mapping, and search and rescue operations. It features a robust build, advanced sensors, and intelligent flight modes, offering reliability and efficiency for demanding tasks.",
        website: "https://www.dji.com/matrice-300",
        image: image21
    },
    {
        name: "Freefly Astro",
        description: "The Freefly Astro is a versatile drone designed for professional filmmakers and content creators. It features a compact and modular design, high-quality camera options, and advanced flight control systems for capturing cinematic aerial shots with ease.",
        website: "https://freeflysystems.com/astro",
        image: image22
    },
    {
        name: "Flyability Elios 2",
        description: "The Flyability Elios 2 is a collision-tolerant drone designed for confined space inspection and exploration. With its unique spherical design and protective cage, it can navigate complex environments safely and capture high-quality visual data for various industrial applications.",
        website: "https://www.flyability.com/elios-2",
        image: image23
    },
    {
        name: "DJI Mavic Mini",
        description: "The DJI Mavic Mini is an ultra-lightweight and portable drone designed for beginners and recreational users. Despite its small size, it features a stabilized 2.7K camera, GPS/GLONASS positioning, and up to 30 minutes of flight time, making it perfect for capturing aerial moments on the go.",
        website: "https://www.dji.com/mavic-mini",
        image: image24
    },
    {
        name: "Potensic Dreamer Pro",
        description: "The Potensic Dreamer Pro is a feature-rich drone equipped with a 4K camera and a 3-axis gimbal for stabilized aerial footage. It features intelligent flight modes, GPS positioning, and up to 31 minutes of flight time, making it suitable for capturing professional-grade aerial photos and videos.",
        website: "https://www.potensic.com/dreamer-pro",
        image: image25
    },
    {
        name: "SJRC F11 4K Pro",
        description: "The SJRC F11 4K Pro is a budget-friendly drone equipped with a 4K camera and GPS-assisted flight for stable aerial photography. It features intelligent flight modes, long battery life, and brushless motors, making it suitable for beginners and casual users.",
        website: "https://www.sjrcdrone.com/SJRC-F11-PRO-4K-GPS-Drone.html",
        image: image26
    },
    {
        name: "Ruko F11Gim2",
        description: "The Ruko F11Gim2 is a foldable drone equipped with a 4K camera and a 3-axis gimbal for stable aerial footage. It features GPS positioning, intelligent flight modes, and up to 30 minutes of flight time, making it suitable for capturing stunning aerial photos and videos.",
        website: "https://www.ruko.net/products/ruko-f11gim2?variant=43095129882793",
        image: image27
    },
    {
        name: "Force1 F100GP",
        description: "The Force1 F100GP is a brushless motor drone equipped with a 1080p action camera and GPS-assisted flight for stable aerial photography. It features intelligent flight modes, long-range transmission, and up to 15 minutes of flight time, making it suitable for capturing action-packed moments from unique perspectives.",
        website: "https://force1rc.com/products/brushless-gps-drone-f100gp",
        image: image28
    },
    {
        name: "Drocon Ninja",
        description: "The Drocon Ninja is a compact and lightweight drone equipped with a 1080p camera and altitude hold for stable aerial photography. It features one-key takeoff/landing, headless mode, and emergency stop, making it suitable for beginners and indoor flying.",
        website: "https://droconshop.com/products/drone-for-kids-spacekey-fpv-wi-fi-drone-with-camera-1080p-hd-1",
        image: image29
    },
    {
        name: "Contixo F22",
        description: "The Contixo F22 is a foldable drone equipped with a 4K camera and a 3-axis gimbal for stable aerial footage. It features GPS positioning, intelligent flight modes, and up to 20 minutes of flight time, making it suitable for capturing scenic views and outdoor adventures.",
        website: "https://contixo.com/products/",
        image: image30
    }
];

export default function StarterGuide() {
    const [openIndex, setOpenIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const filteredDroneArray = droneItems
        .filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    // console.log(filteredDroneArray);

    return (
        <div className="flex flex-column justify-center w-full bg-opacity-40 bg-slate-900">
            <div style={{position: 'fixed', top: '7rem', left:'4rem', height: 'calc(100vh - 8rem)', boxShadow: '0 4px 6px rgba(0,0,0,0.3)'}}
                 className="pb-10 w-[35rem] bg-transparent rounded-lg p-3 shadow-lg border-4 border-blue-400">
                <div className="flex items-center space-x-4 p-2 mb-5 justify-center">
                    <div>
                        <h1 className="font-bold text-lg text-white font-poppins tracking-wide">FAQ</h1>
                    </div>
                </div>
                <div className="flex items-center space-x-4 p-2 mb-5 text-white">
                    <p>Welcome to Dronet! Check out our FAQs!</p>
                </div>
                <div>
                    {accordionItems.map((item, index) => (
                        <div key={index} className="transition rounded-lg hover:bg-blue-400 mb-2 text-white">
                            <div
                                className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16 gap-2"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span>{openIndex === index ? "-" : "+"}</span>
                                <h3>{item.title}</h3>
                            </div>
                            <div
                                className={`pb-4 accordion-content px-5 pt-0 ${openIndex === index ? "block" : "hidden"}`}>
                                <p className="leading-6 font-light pl-9 text-justify">
                                    {item.content} {item.link && <Link to={item.link}><b className='italic underline' >here</b></Link>}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col flex-1 ml-[40rem]'>
                <input style={{width: 'calc(100% - 5rem)', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', outline: 'none'}}
                       type="text"
                       placeholder="Drone search..."
                       className="mt-8 ml-[2rem] placeholder:text-[0.875rem] border-none focus:border-none rounded-full shadow-md p-5 h-[2.3rem]"
                       onChange={handleSearchInputChange}
                />
                <div style={{justifyContent: "center", width: "calc(100% - 5rem)"}}
                     className="mt-8 pb-[3rem] gap-10 ml-[2rem] flex flex-wrap">

                    {filteredDroneArray.map((item, index) =>
                        <DroneCard index={index} drone={item}/>)}
                </div>
            </div>
        </div>
    );
}



