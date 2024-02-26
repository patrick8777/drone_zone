import arrow_back_ios from '../../assets/svgs/arrow_back_ios.svg'
import arrow_forward_ios from '../../assets/svgs/arrow_forward_ios.svg'
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../api/api.js";
import {loadEvents} from "../../features/forumEventsSlice.js";
import {
    loadSelectedDate,
} from "../../features/sidebarSlice.js";
import events_item from '../../assets/svgs/events.svg'
import close_white from '../../assets/svgs/close_white.svg'

const Calendar = ({selected_date}) => {

    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth()); // Note: Months are zero-based, so we add 1
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date(currentYear, currentMonth, 1));
    const [firstDayIndex, setFirstDayIndex] = useState(null);
    const [isLeap, setIsLeap] = useState((currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0))
    const numberOfDaysList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const numberOfDaysListLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const numberOfDays = isLeap ? numberOfDaysListLeap[currentMonth] : numberOfDaysList[currentMonth]
    const dispatch = useDispatch()
    const events = useSelector((state) => state.forum_event.events)
    const [isLoading, setIsLoading] = useState(true);
    const date = useSelector((state) => state.sidebar.selected_date)
    const [isCalendarShowing, setIsCalendarShowing] = useState(false)


    const [eventList, setEventList] = useState([])

    const eventDates = events && events.map((event) => {
        const eventDate = new Date(event.event_date);
        return eventDate.toLocaleDateString('en-US');
    });
    const sortedEventDates = eventDates && eventDates.sort((a, b) => new Date(a) - new Date(b));
    const dateCountMap = {};

    sortedEventDates && sortedEventDates.forEach((date) => {
        dateCountMap[date] = (dateCountMap[date] || 0) + 1;
    });


    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/events/",);
            const resolvedData = response.data;
            dispatch(loadEvents(resolvedData));
        } catch (error) {
            console.error("Error", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents()
    }, []);


    useEffect(() => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        setFirstDayOfMonth(firstDayOfMonth);

        const index = firstDayOfMonth.getDay();
        setFirstDayIndex(index);
        setIsLeap(
            (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0)
        );
    }, [currentYear, currentMonth]);


    const weekDays = ['Sunday', "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']

    const shiftedWeekDays = [
        ...weekDays.slice(firstDayIndex),
        ...weekDays.slice(0, firstDayIndex)
    ];


    const rows = [];
    const calendar_length = Array.from({length: 35}, (_, index) => index + 1);

    for (let i = 0; i < 35; i += 7) {
        const rowItems = calendar_length.slice(i, i + 7);
        if (i < numberOfDays) {
            rows.push(rowItems);
        }
    }

    const handleDispatchDate = (e) => {
        dispatch(loadSelectedDate(e.currentTarget.getAttribute('value')))
    }

    useEffect(() => {
        console.log(selected_date)
    }, []);



    if (isLoading) return <div></div>

    return (
        <>
            <div style={{
                boxShadow: (selected_date==='') ?  '4px 0 6px rgba(0, 0, 0, 0.1)' : '4px 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.8)',
                position: "fixed",
                height: '4rem',
                width: '4rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                alignItems: 'center',
                display: isCalendarShowing ? 'none' : 'flex',
                zIndex: '31',
                right: '4rem',
                border: '1px solid rgb(96 165 250)'
            }}
                 onClick={()=>setIsCalendarShowing(!isCalendarShowing)}
                 className="hover:cursor-pointer flex flex-col ml-[3.5rem] mt-[2rem] rounded-full fixed justify-center">
                <img className='w-8' src={events_item}/>
            </div>

            <div style={{zIndex: '50', display: isCalendarShowing ? 'block' : 'none'}} className="container mx-auto mt-16">
                <div className="wrapper bg-white rounded shadow w-[28rem]">
                    <div className="header flex justify-between border-b p-2">
                        <div className='flex gap-3'>
          <span style={{fontSize: '1rem'}} className="text-lg font-bold">
            {currentYear} {months[currentMonth]}
          </span>
                            <img onClick={() => {
                                    setIsCalendarShowing(!isCalendarShowing)
                                }} className='cursor-pointer' style={{position: 'fixed', right: '3.5rem', top: '7.5rem'}} src={close_white}/>
                            <button
                                style={{display: date ? 'none' : 'flex'}}
                                className="border-blue-500 hover:border-blue-500 h-[2rem] pl-3 pr-3 btn rounded-full text-black hover:bg-white bg-white btn-xs">No
                                date selected
                            </button>
                            <button
                                style={{display: date ? 'flex' : 'none'}}
                                className="border-blue-500 hover:border-blue-500 h-[2rem] pl-3 pr-3 btn rounded-full text-black hover:bg-white bg-white btn-xs">Date: {date}
                            </button>
                            <button
                                onClick={() => dispatch(loadSelectedDate(''))}
                                style={{display: date ? 'flex' : 'none'}}
                                className="border-none h-[2rem] pl-3 pr-3 btn rounded-full text-white hover:bg-blue-500 bg-blue-500 btn-xs">Reset
                            </button>
                        </div>
                        <div className="buttons">
                            <button onClick={() => {
                                if (currentMonth !== 0) {
                                    setCurrentMonth(currentMonth - 1);
                                } else {
                                    setCurrentMonth(11);
                                    setCurrentYear(currentYear - 1);
                                }
                            }}
                                    className="p-1">
                                <img src={arrow_back_ios}/>
                            </button>
                            <button
                                onClick={() => {
                                    if (currentMonth !== 11) {
                                        setCurrentMonth(currentMonth + 1);
                                    } else {
                                        setCurrentMonth(0);
                                        setCurrentYear(currentYear + 1);
                                    }
                                }}
                                className="p-1"
                            >
                                <img src={arrow_forward_ios} alt="Next Month"/>
                            </button>
                        </div>
                    </div>
                    <table className="w-[28rem]">
                        <thead>
                        <tr>
                            {shiftedWeekDays.map((day, index) => (
                                <th style={{fontSize: '12px'}} key={index} className="p-2 border-r h-10 w-[4rem]">
                                    <span
                                        className="xl:block lg:block md:block sm:block hidden">{day.slice(0, 3)}</span>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody style={{zIndex: '50'}}>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((day, index) => (
                                    <td key={index}
                                        style={{backgroundColor: (day > numberOfDays) && 'rgb(245,245,245)'}}
                                        className="border p-1 h-[3rem] w-[3rem] overflow-auto">
                                        <div className="flex flex-col h-[3rem] w-[3rem] mx-auto overflow-hidden">
                                            <div style={{justifyContent: 'center'}} className="flex top w-full">
                                            <span
                                                style={{fontSize: '0.725rem'}}
                                                className=" text-gray-500">{(day > numberOfDays) ? (day - numberOfDays) : day}</span>
                                            </div>
                                            <div style={{
                                                display: (dateCountMap[`${currentMonth + 1}/${day}/${currentYear}`] || 0) !== 0 ? 'flex' : 'none',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                                 className="bottom flex-grow w-full cursor-pointer">
                                                <div
                                                    onClick={(e) => handleDispatchDate(e)}
                                                    value={`${currentMonth + 1}/${day}/${currentYear}`}
                                                    style={{fontSize: '9px',
                                                        backgroundColor: date===`${currentMonth + 1}/${day}/${currentYear}` ? 'purple' : 'white',
                                                        color:  date===`${currentMonth + 1}/${day}/${currentYear}` ? 'white' : 'black'
                                                    }}
                                                    className="flex-col p-1 flex h-[1.5rem] justify-center rounded-full bg-transparent border border-[black] text-sm font-semibold text-black shadow-sm bg-[purple] hover:bg-[purple] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">  {dateCountMap[`${currentMonth + 1}/${day}/${currentYear}`] || 0} {(dateCountMap[`${currentMonth + 1}/${day}/${currentYear}`] || 0) === 1 ? 'Event' : 'Events'}
                                                </div>
                                            </div>
                                        </div>

                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Calendar;