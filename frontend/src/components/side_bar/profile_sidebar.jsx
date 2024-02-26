import {Link} from "react-router-dom";
import plus_sign_gray from '../../assets/svgs/plus_sign_gray.svg'
import photo_library from '../../assets/svgs/photo_library.svg'
import {useSelector} from "react-redux";

export default function ProfileSidebar() {

    const loggedUserID = useSelector((state) => state.user.userData.id)
    const selectedUserID = useSelector((state) => state.user.selected_user.id)

    return (
        <div style={{
            boxShadow: '5px 10px 10px rgba(0, 0, 0, 0.3)',
            position: "fixed",
            height: 'calc(100% - 5rem)',
            width: '15rem',
            left: '0',
            zIndex: '30',
        }} className="flex flex-col bg-slate-50 p-3 shadow-lg">

            <ul className="pt-5 space-y-2 text-sm">
                <li>
                    <Link to='/profile'
                          className="flex items-center space-x-3 text-white p-2 rounded-full font-medium hover:bg-blue-400">
                        <span className="text-white">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                        </span>
                        <span>{loggedUserID === selectedUserID ? 'My Profile' : 'See Profile'}</span>
                    </Link>
                </li>
                <li>
                    <Link to='/profile/gallery'
                          className="flex items-center space-x-3 text-white p-2 rounded-full font-medium hover:bg-blue-400">
                        <img style={{height: '1.25rem'}} src={photo_library}/>
                        <span>{loggedUserID === selectedUserID ? 'My Gallery' : 'Gallery'}</span>
                    </Link>
                </li>


                <li style={{display: loggedUserID === selectedUserID ? 'block' : 'none'}}>
                    <Link to="/profile/edit"
                          className="flex items-center space-x-3 text-white p-2 rounded-full font-medium hover:bg-blue-400">
                    <span className="text-white">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                        </svg>
                    </span>
                        <span>Edit Profile</span>
                    </Link>
                </li>
                <li style={{display: loggedUserID === selectedUserID ? 'block' : 'none'}}>
                    <Link to="/passwordreset"
                          className="flex items-center space-x-3 text-white p-2 rounded-full font-medium hover:bg-blue-400">
                    <span className="text-white">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                    </span>
                        <span>Change password</span>
                    </Link>
                </li>
                <li style={{display: loggedUserID === selectedUserID ? 'block' : 'none'}}>
                    <Link to="/"
                          className="flex items-center space-x-3 text-white p-2 rounded-full font-medium hover:bg-blue-400">
                    <span className="text-white">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                    </span>
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>
            <div style={{
                display: loggedUserID === selectedUserID ? 'flex' : 'none',
                alignItems: 'end',
                fontSize: '0.875rem'
            }} className='flex flex-1'>
                <div
                    className="flex w-full items-center space-x-3 text-white p-2 rounded-full font-medium hover:bg-blue-400">
                    <img style={{height: '1.25rem'}} src={plus_sign_gray}/>
                    <Link to='/create/business'>Create business account</Link>
                </div>
            </div>
        </div>
    );
}




