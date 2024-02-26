import search from '../../assets/svgs/search.svg'
import React, {useState} from "react";
import tune from "../../assets/svgs/tune.svg";
import service_toolbox from "../../assets/svgs/service_toolbox.svg";
import service_toolbox_white from "../../assets/svgs/service_toolbox_white.svg";
import star from "../../assets/svgs/star.svg";
import star_white from "../../assets/svgs/star_white.svg";
import search_white from "../../assets/svgs/search_white.svg";
import location from "../../assets/svgs/location.svg"
import location_white from "../../assets/svgs/location_white.svg"
import close from "../../assets/svgs/close.svg";
import {useDispatch, useSelector} from "react-redux";
import {
    loadBusinessSidebarKeyword,
    loadBusinessSidebarQuick,
} from "../../features/sidebarSlice.js";

export default function BusinessFilterSidebar() {

    const dispatch = useDispatch()
    const [selectedValueService, setSelectedValueService] = useState(useSelector((state) => state.sidebar.business_sidebar_quick));
    const [selectedValueRating, setSelectedValueRating] = useState(useSelector((state) => state.sidebar.business_sidebar_quick));
    const [isSidebarOpen, setIsSidebarOpen] = useState((selectedValueService !== '' || selectedValueRating !== ''))

    const handleChangeSelectedValueService = (event) => {
        event.preventDefault()
        setSelectedValueService(event.target.value);
        dispatch(loadBusinessSidebarQuick(event.target.value))
    };

    const handleChangeSelectedValueRating = (event) => {
        event.preventDefault()
        setSelectedValueRating(event.target.value);
        dispatch(loadBusinessSidebarQuick(event.target.value))
    };

    const toggleOpenSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }


    return (<>
        <div onClick={toggleOpenSidebar} style={{
            boxShadow: '4px 0 6px rgba(0, 0, 0, 0.1)',
            position: "fixed",
            height: '4rem',
            width: '4rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            alignItems: 'center',
            display: isSidebarOpen && 'none',
            zIndex: '31',
            backgroundColor: 'rgb(96 165 250)'
        }}
             className="hover:cursor-pointer flex flex-col ml-[3.5rem] mt-[2rem] bg-slate-900 rounded-full fixed justify-center">
            <img className='w-8' src={tune}/>
        </div>

        <div
            style={{
                boxShadow: '4px 0 6px rgba(0, 0, 0, 0.1)',
                position: "fixed",
                height: 'calc(100% - 9rem)',
                marginBottom: '3rem',
                marginLeft: isSidebarOpen ? '3.5rem' : '-20rem',
                marginTop: '2rem',
                width: '20rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                display: 'flex',
                transition: 'margin-left 0.5s ease-in-out',
                zIndex: '31',
                background: 'rgb(15,23,42)'
            }}
            className="rounded-lg flex-col border border-blue-400">
            <img onClick={toggleOpenSidebar} style={{position: 'absolute', top: '0.5rem', left: '18rem'}}
                 className='w-6 rounded-full hover:cursor-pointer hover:bg-gray-300' src={close}/>
            <span
                className='flex mt-10 flex-col hover:cursor-pointer rounded gap-3 p-4'
                style={{
                    width: '100%'
                }}>
                <div className='flex gap-3'>
                    <img src={service_toolbox}/>
                    <label className='text-white'>Select Services</label>
                </div>
                <select
                    className="focus:outline-none font-normal focus:ring-gray-300 ml-8 mr-6 block rounded-full border-0 py-1.5 shadow-sm ring-1 ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleChangeSelectedValueService}
                    value={selectedValueService}
                    style={{outline: 'none'}}>
                    <option style={{display: selectedValueService !== '' && 'none'}} value=''>Select value...</option>
                    <option value='repair'>Repair</option>
                    <option value='drone_operator'>Drone operators</option>
                    <option value='instructors'>Instructors</option>
                    <option value='all_services'>All services</option>
                </select>
            </span>
            <span
                className='flex mt-10 flex-col hover:cursor-pointer rounded gap-3 p-4'
                style={{
                    width: '100%'
                }}>
                <div className='flex gap-3'>
                    <img src={star}/>
                    <label className='text-white'>Rating</label>
                </div>
                <select
                    className="focus:outline-none font-normal focus:ring-gray-300 ml-8 mr-6 block rounded-full border-0 py-1.5 shadow-sm ring-1 ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleChangeSelectedValueRating}
                    value={selectedValueRating}
                    style={{outline: 'none'}}>
                    <option style={{display: selectedValueRating !== '' && 'none'}} value=''>Select value...</option>
                    <option value='best_rated'>Best rated</option>
                </select>
            </span>
            <span
                className='flex mt-10 flex-col hover:cursor-pointer rounded gap-3 p-4'
                style={{
                    width: '100%'
                }}>
                <div className='flex gap-3'>
                    <img src={location}/>
                    <label className='text-white'>City/Country</label>
                </div>
                <input
                    onChange={(e) => dispatch(loadBusinessSidebarKeyword(e.target.value))}
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="city"
                    className="focus:outline-none font-normal focus:ring-gray-300 ml-8 mr-6 block rounded-full border-0 py-1.5 shadow-sm ring-1 ring-gray-300 sm:text-sm sm:leading-6"
                />
            </span>
            <span
                className='flex mt-10 flex-col hover:cursor-pointer rounded gap-3 p-4'
                style={{
                    width: '100%'
                }}>
                <div className='flex gap-3'>
                    <img src={search}/>
                    <label className='text-white'>Keyword</label>
                </div>
                <input
                    onChange={(e) => dispatch(loadBusinessSidebarKeyword(e.target.value))}
                    type="text"
                    name="keyword"
                    id="keyword"
                    className="focus:outline-none font-normal focus:ring-gray-300 ml-8 mr-6 block rounded-full border-0 py-1.5 shadow-sm ring-1 ring-gray-300 sm:text-sm sm:leading-6"
                />
            </span>
        </div>
    </>);
}
