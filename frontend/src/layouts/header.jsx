import {Link, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadSelectedUserID, logout} from "../features/userSlice.js";
import default_user from '../assets/images/default_user.png'
import logo from '../assets/images/Artboard 5.png'

export default function Header({backgroundColor, headerMarginTop, applyGradient}) {

    const dispatch = useDispatch()
    const validToken = useSelector((state) => state.user.validAccessToken)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const userInfo = useSelector((state) => state.user.userData)

    useEffect(() => {
        validToken ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false)
    }, [validToken]);


    const handleSelectUser = () => {
        dispatch(loadSelectedUserID('me'))
    }
    const logMeOut = () => {
        localStorage.clear();
        dispatch(logout());
    };

//linear-gradient(to top, #1F6495, #0093F5)
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 21,
            background: applyGradient ? 'rgba(15, 23, 42)' : 'rgba(0, 0, 0,0)',
            paddingTop: '50px', // Adjust padding-top to accommodate the height of the header
        }}>
            <div style={{
                position: 'fixed',
                top: 50,
                left: 0,
                right: 0,
                zIndex: 10,
                background: applyGradient ? 'linear-gradient(to bottom, rgba(15, 23, 42,1), rgba(15, 23, 42,0.1))' : 'rgba(0, 0, 0,0)',
                paddingTop: '33px', // Adjust padding-top to accommodate the height of the header
            }}>
                <div style={{
                    zIndex: '1000',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    background: backgroundColor ? 'transparent' : 'rgb(96 165 250)',
                    marginTop: headerMarginTop ? '0' : '0',
                }}
                     className="rounded-full navbar w-11/12 h-3 bg-neutral fixed top-[21px] left-[60px] right-0 z-2000">

                    <NavLink to="/" className="rounded-full btn btn-ghost text-white" style={{fontSize: '25px', width: '150px', height: '50px'}}>
                        <img src={logo} alt="Image Alt Text"/>
                    </NavLink>

                    <div
                        style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                        className="menu menu-sm dropdown-content rounded-box flex-1 gap-3">
                        <NavLink to='/'>
                            <li className='rounded-full hover:border-white btn text-white btn-ghost'
                                style={{padding: '0'}}>
                                <p style={{backgroundColor: 'transparent'}}>HOME</p></li>
                        </NavLink>
                        <NavLink to='/gallery'>
                            <li className='rounded-full hover:border-white btn text-white btn-ghost'
                                style={{padding: '0'}}>
                                <p style={{backgroundColor: 'transparent'}}>GALLERY</p>
                            </li>
                        </NavLink>
                        <Link style={{zIndex: '1000'}} className="dropdown dropdown-end">
                            <li className='rounded-full hover:border-white btn text-white btn-ghost'
                                style={{padding: '0'}}>
                                <p style={{backgroundColor: 'transparent'}}>SOCIAL</p>
                            </li>
                            <ul tabIndex={0} style={{zIndex: '2000'}}
                                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li style={{zIndex: '2000'}}>
                                    <Link to='/forum' style={{zIndex: '2000'}} className="justify-between">
                                        Forum
                                    </Link>
                                </li>
                                <li style={{zIndex: '2000'}}><Link to='/events' style={{zIndex: '2000'}}>Events</Link>
                                </li>
                            </ul>
                        </Link>
                        <NavLink to='/business/search'>
                            <li className='rounded-full hover:border-white btn text-white btn-ghost'
                                style={{padding: '0'}}>
                                <p style={{backgroundColor: 'transparent'}}>SERVICES</p>
                            </li>
                        </NavLink>
                        <NavLink to='/starterguide'>
                            <li className='rounded-full hover:border-white btn text-white btn-ghost'
                                style={{padding: '0'}}>
                                <p style={{backgroundColor: 'transparent'}}>DRONE GUIDE</p></li>
                        </NavLink>
                    </div>
                    <NavLink style={{display: isUserLoggedIn && 'none'}} to='/registration'>
                        <li className='rounded-full btn mr-3 text-white btn-ghost'
                            style={{border: '1px solid white', padding: '0'}}><a className='pr-3 pl-3'>SIGN UP</a></li>
                    </NavLink>
                    <NavLink style={{display: isUserLoggedIn && 'none'}} to='/login'>
                        <li className='rounded-full btn text-white btn-ghost'
                            style={{border: '1px solid white', padding: '0'}}>
                            <a className='pr-3 pl-3'>LOGIN</a></li>
                    </NavLink>
                    <div style={{display: isUserLoggedIn === false && 'none'}}
                         className="z-1000  pr-3 dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="z-1000 btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="avatar"
                                     src={userInfo?.avatar ? userInfo.avatar : default_user}/>
                            </div>
                        </div>
                        <ul tabIndex={0}
                            className="z-1000 menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to='/profile' onClick={handleSelectUser} className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li onClick={logMeOut}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
