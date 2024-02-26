import filter from '../../assets/svgs/filter.svg'
import plus_sign from '../../assets/svgs/plus_sign.svg'
import search from '../../assets/svgs/search.svg'
import {useEffect, useState} from "react";
import tune from "../../assets/svgs/tune.svg";
import close from "../../assets/svgs/close.svg";
import {Link} from "react-router-dom";
import {
    loadEventsSidebarKeyword,
    loadEventsSidebarQuick,
    setIsEventsSidebarOpen
} from "../../features/sidebarSlice.js";
import {useDispatch, useSelector} from "react-redux";

export default function EventsSideBar() {

    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = useState(useSelector((state) => state.sidebar.events_sidebar_quick));
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const keyword = useSelector((state) => state.sidebar.events_keyword)

    const handleChangeSelectedValue = (event) => {
        event.preventDefault()
        setSelectedValue(event.target.value);
        dispatch(loadEventsSidebarQuick(event.target.value))
    };

    const toggleOpenSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    useEffect(() => {
        dispatch(setIsEventsSidebarOpen(isSidebarOpen))
    }, [isSidebarOpen]);


    return (<>
        <div onClick={toggleOpenSidebar} style={{
            boxShadow: (keyword === '' && selectedValue === '' || keyword === '' && selectedValue === "all_events") ? '4px 0 6px rgba(0, 0, 0, 0.1)' : '4px 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.8)',
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
            <Link to='/events/discussion/create'
                  className='mt-7 hover:cursor-pointer rounded gap-3 pl-4 pr-4'
                  style={{
                      display: 'flex', alignItems: 'center', height: '4rem', width: '100%'
                  }}>
                <img src={plus_sign}/>
                <p className='hover:text-gray-700 text-white'>Create a new event</p>
            </Link>
            <span
                className='flex mt-10 flex-col hover:cursor-pointer rounded gap-3 p-4'
                style={{
                    width: '100%'
                }}>
                <div className='flex gap-3'>
                    <img src={filter}/>
                    <label className='text-white'>Quick Filters</label>
                </div>
                <select
                    className="focus:outline-none font-normal focus:ring-gray-300 ml-8 mr-6 block rounded-full border-0 py-1.5 shadow-sm ring-1 ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={handleChangeSelectedValue}
                    value={selectedValue}
                    style={{outline: 'none'}}>
                    <option style={{display: selectedValue !== '' && 'none'}} value=''>Select value...</option>
                    <option value='all_events'>All events</option>
                    <option value='most_popular'>Most popular</option>
                    <option value='virtual'>Virtual</option>
                    <option value='in_person'>In person</option>
                </select>
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
                    onChange={(e) => dispatch(loadEventsSidebarKeyword(e.target.value))}
                    type="text"
                    name="keyword"
                    id="keyword"
                    className="focus:outline-none font-normal focus:ring-gray-300 ml-8 mr-6 block rounded-full border-0 py-1.5 shadow-sm ring-1 ring-gray-300 sm:text-sm sm:leading-6"
                />
            </span>
        </div>
    </>);
}
