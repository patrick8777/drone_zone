import {useState} from "react";

export default function DroneCard({index, drone}) {
    const [isDescriptionShowing, setIsDescriptionShowing] = useState(false);

    const toggleIsDescriptionShowing = () => {
        setIsDescriptionShowing(!isDescriptionShowing);
    };

    return (
        <>
            <div
                key={index}
                onClick={toggleIsDescriptionShowing}
                style={{height: isDescriptionShowing === false && '17rem', boxShadow: '10px 10px 2px 1px rgb(96 165 250)'}}
                className="hover:cursor-pointer card card-compact min-h-60 w-52 bg-base-100 shadow-xl"
            >
                <figure className="relative h-56">
                    <img className="object-cover w-full h-full" src={drone.image} alt={drone.name}/>
                </figure>
                <div className="card-body">
                    <div style={{fontWeight: 'bold'}}>{drone.name}</div>
                    <p style={{display: isDescriptionShowing === false && 'none'}}>{drone.description}</p>
                    <a style={{display: isDescriptionShowing === false && 'none', fontWeight: 'bold'}}
                       href={drone.website}>Website</a>
                </div>
            </div>
        </>
    );
}