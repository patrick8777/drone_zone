import three_dots from '../../assets/svgs/three-dots-vertical.svg'
import {useState} from "react";
import { Link } from 'react-router-dom';

export default function EditDeleteButton() {

    const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)

    const toggleEditButtonClicked = () => {
        setIsEditButtonClicked(!isEditButtonClicked)
    }

    return (
        <div className="relative inline-block text-left">
            <div>
                <button type="button"
                        onClick={toggleEditButtonClicked}
                        style={{width: '1rem',height:'1.5rem', backgroundImage: `url(${three_dots})`, backgroundPosition:'center', backgroundSize: 'cover'}}
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-gray-300"
                        id="menu-button" aria-expanded="true" aria-haspopup="true">
                </button>
            </div>
            <div
                style={{display: isEditButtonClicked===false && 'none'}}
                className="absolute left-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="hover:bg-gray-50 py-1" role="none">
                    <Link to="/" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1"
                       id="menu-item-0">Edit</Link>
                </div>
                <div className="hover:bg-gray-50 py-1" role="none">
                <Link to="/" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1"
                       id="menu-item-6">Delete</Link>
                </div>
            </div>
        </div>
    )
}