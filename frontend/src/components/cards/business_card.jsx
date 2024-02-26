import droneInstructorImage from '../../assets/images/drone_instructor.jpeg';
import droneOperatorImage from '../../assets/images/drone_operator.jpg';
import droneRepairsImage from '../../assets/images/drone_repairs.jpg';


import Rating from "../rating/rating.jsx";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {api} from "../../api/api.js";
import {loadSelectedUserID} from "../../features/userSlice.js";
import {selectBusiness} from "../../features/businessSlice.js";

export default function BusinessCard({
                                         id,
                                         company_name,
                                         description,
                                         services,
                                         average_rating,
                                         first_name,
                                         last_name,
                                         type
                                     }) {
    const dispatch = useDispatch()

    const fetchBusiness = async (event) => {
        event.preventDefault();
        try {
            const response = await api.get(`/businesses/${id}/`)
            const resolvedData = response.data;
            dispatch(selectBusiness(resolvedData));
        } catch (error) {
            console.error("We could not retrieve business", error);
        }
    }


    const handleSelectUser = () => {
        dispatch(loadSelectedUserID(id))
    }

    const getBadgeColor = () => {
        switch (services) {
            case 'Repair':
                return 'blue';
            case 'Instructor':
                return 'red';
            case 'Operator':
                return 'yellow';
            default:
                return 'gray';
        }
    };

    const getBusinessImage = () => {
        switch (services) {
            case 'Repair':
                return droneRepairsImage;
            case 'Instructor':
                return droneInstructorImage;
            case 'Operator':
                return droneOperatorImage;
            default:
                return null; // Return a default image or handle the case as needed
        }
    };


    return (
        <Link onClick={fetchBusiness} to={"/business/"}
              style={{height: 'fit-content', width: '45rem', boxShadow: '10px 10px 2px 1px rgb(96 165 250)'}}
              className="bg-white rounded-lg shadow-md flex items-start justify-between hover:cursor-pointer">
            <div style={{width: '35rem'}} className="group relative p-2 pr-5">
                <div className='flex justify-between'>
                    <Link onClick={handleSelectUser} to={`/business/${id}`}
                          className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <span className="absolute inset-0"></span>
                        {type === 'Individual' ? `${first_name} ${last_name}` : company_name}
                    </Link>

                    <div className="mt-3"><Rating rating={average_rating}/></div>
                </div>
                <div className='flex gap-4 pt-2 pb-3 border-b border-gray-300'>
                    <div className="badge border-2 shadow-xl shadow-gray-400/40"
                         style={{borderColor: getBadgeColor()}}>{services}</div>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{description} </p>
            </div>
            <div style={{height: '10rem'}} className='rounded-tr-md rounded-br-md flex flex-1'>
                <img style={{objectFit: 'cover', objectPosition: '50% 50%'}}
                     className='rounded-tr-md rounded-br-md w-full h-full' src={getBusinessImage()} alt={company_name}/>
            </div>
        </Link>
    )
}