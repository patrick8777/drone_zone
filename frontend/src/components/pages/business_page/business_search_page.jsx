import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import BusinessCard from "../../cards/business_card.jsx";
import BusinessFilterSidebar from "../../side_bar/business_filter_sidebar.jsx";
import {api} from "../../../api/api.js";
import {loadBusinesses} from "../../../features/businessSlice.js";

export default function BusinessSearchPage() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [businessPostInfo, setBusinessPostInfo] = useState([]);
    const quick_filter = useSelector((state) => state.sidebar.business_sidebar_quick)
    const keyword = useSelector((state) => state.sidebar.business_keyword)


    const fetchAllBusinesses = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/businesses/");
            const resolvedData = response.data;
            setBusinessPostInfo(resolvedData);
            dispatch(loadBusinesses(resolvedData));
        } catch (error) {
            console.error("Could not fetch businesses", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchRepairBusinesses = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/businesses/repair/");
            const resolvedData = response.data;
            setBusinessPostInfo(resolvedData);
            dispatch(loadBusinesses(resolvedData));
        } catch (error) {
            console.error("Could not fetch businesses", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDroneOperatorBusinesses = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/businesses/operator");
            const resolvedData = response.data;
            setBusinessPostInfo(resolvedData);
            dispatch(loadBusinesses(resolvedData));
        } catch (error) {
            console.error("Could not fetch businesses", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchInstructorBusinesses = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/businesses/instructor/");
            const resolvedData = response.data;
            setBusinessPostInfo(resolvedData);
            dispatch(loadBusinesses(resolvedData));
        } catch (error) {
            console.error("Could not fetch businesses", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBestRatedBusinesses = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/businesses/best/");
            const resolvedData = response.data;
            setBusinessPostInfo(resolvedData);
            dispatch(loadBusinesses(resolvedData));
        } catch (error) {
            console.error("Could not fetch businesses", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        switch (quick_filter) {
            case '':
            case 'all_services':
                fetchAllBusinesses();
                break;
            case 'repair':
                fetchRepairBusinesses();
                break;
            case 'drone_operators':
                fetchDroneOperatorBusinesses();
                break;
            case 'instructors':
                fetchInstructorBusinesses();
                break;
            case 'best_rated':
                fetchBestRatedBusinesses();
                break;
            default:
                fetchAllBusinesses();
                break;
        }
    }, [quick_filter]);

    const filtered_businesses = businessPostInfo && businessPostInfo.filter((business_post) => {
        const searchMatch = keyword !== '' && business_post.company_name.toLowerCase().includes(keyword.toLowerCase()) ||
            business_post.description.toLowerCase().includes(keyword.toLowerCase()) ||
            business_post.services.toLowerCase().includes(keyword.toLowerCase()) ||
            business_post.user.toLowerCase().includes(keyword.toLowerCase());

        if (keyword !== '' && searchMatch) {
            return true;
        } else if (keyword === '') {
            return true;
        }
        return false;
    });


    return (
        <div className="flex w-full">
            <div>
                <BusinessFilterSidebar/>
            </div>
            <div
                style={{alignItems: "center", gap: "2rem"}}
                className="pt-10 pb-20 bg-opacity-40 flex flex-1 flex-col"
            >
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    filtered_businesses.map((business_post) => (
                        <div key={business_post.id} className="w-[40rem]">
                            <BusinessCard
                                id={business_post.id}
                                company_name={business_post.company_name}
                                first_name={business_post.first_name}
                                last_name={business_post.last_name}
                                description={business_post.description}
                                services={business_post.services}
                                user={business_post.user}
                                average_rating={business_post.average_rating}
                                background_image={business_post.background_image}
                                type={business_post.type}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
