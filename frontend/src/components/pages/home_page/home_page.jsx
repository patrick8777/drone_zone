import BackgroundCarousel from "./background_carousel";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../../api/api.js";
import {loadUser} from "../../../features/userSlice.js";
import {useEffect} from "react";

export default function HomePage() {

    const dispatch = useDispatch()
    const validAccessToken = useSelector((state) => state.user.validAccessToken);
    const fetchUser = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${validAccessToken}`,
                },
            };
            const response = await api.get("/users/me/", config);
            const resolvedData = response.data;
            dispatch(loadUser(resolvedData));
        } catch (error) {
            console.error("We could not retrieve profile details...", error);
        }
    };

    useEffect(() => {
        if (validAccessToken !== null) {
          fetchUser()
        }

    }, [validAccessToken]);

    return (
        <div style={{display:'flex', flex:'1'}}>
            <BackgroundCarousel/>
            </div>

    )
}