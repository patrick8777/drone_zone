import Router from "./routes/routes"
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from "react"
import {login, logout} from './features/userSlice.js'
import {api} from './api/api.js'

function App() {
    const dispatch = useDispatch()
    const validAccessToken = useSelector((store) => store.user.validAccessToken)
    const localToken = localStorage.getItem("accessToken")

    useEffect(() => {
        if (localToken) {
            api.post('/auth/token/verify/', {token: localToken})
                .then(() => dispatch(login(localToken)))
                .catch(() => {
                    localStorage.removeItem('accessToken');
                    dispatch(logout());
                })
        } else {
            dispatch(logout())
        }
    }, [])


    if (validAccessToken === undefined) {
        return <div>Loading...</div>
    } else {
        return <Router/>
    }
}


export default App
