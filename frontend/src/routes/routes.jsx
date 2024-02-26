import {BrowserRouter, Routes, Route} from "react-router-dom"
import {ProtectedRoutes} from "./protected_route.jsx"
import DefaultLayout from "../layouts/default_layout"
import HomePage from "../components/pages/home_page/home_page"
import SignInPage from "../components/pages/sign_in_page/sign_in_page.jsx"
import NotFoundPage from "../components/pages/page_not_found/page_not_found.jsx"
import VerificationPage from "../components/pages/verification_page/verification_page.jsx"
import RegistrationPage from "../components/pages/registration_page/registration_page.jsx"
import ProfilePage from "../components/pages/profile_page/profile_page.jsx"
import ProfileGalleryPage from "../components/pages/profile_page/profile_gallery_page.jsx"
import ForumPage from "../components/pages/forum_page/forum_page.jsx"
import ForumDiscussionPage from "../components/pages/forum_page/forum_discussion_page.jsx"
import CreateForumDiscussion from "../components/pages/forum_page/create_forum_discussion.jsx"
import EventsPage from "../components/pages/events_page/events_page.jsx"
import EventsDiscussionPage from "../components/pages/events_page/events_discussion_page.jsx"
import CreateEventDiscussion from "../components/pages/events_page/create_event_discussion.jsx"
import BusinessPage from "../components/pages/business_page/business_page.jsx"
import CreateBusinessPage from "../components/pages/business_page/create_business_page.jsx"
import BusinessSearchPage from "../components/pages/business_page/business_search_page.jsx"
import BusinessReviewPage from "../components/pages/business_page/business_review_page.jsx"
import GalleryPage from "../components/pages/gallery_page/gallery_page.jsx"
import AccordionFAQAccordionSection from "../components/accordion-faq-section/accordion-faq-section.jsx"
import ChatApp from "../components/chat/chat_app.jsx"
import StarterGuide from "../components/pages/starter_guide/starter_guide.jsx"
import PasswordResetPage from "../components/pages/password_reset_page/password_reset_page.jsx";
import EditProfilePage from "../components/pages/profile_page/edit_profile_page.jsx";
import MapPage from "../components/pages/map_page/map_page.jsx";
import EditForumDiscussion from "../components/pages/forum_page/edit_forum_discussion.jsx";
import EditEventDiscussion from "../components/pages/events_page/edit_event_discussion.jsx";
import Calendar from "../components/cards/calendar.jsx";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout/>}>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/login' element={<SignInPage/>}/>
                    <Route path='/registration' element={<RegistrationPage/>}/>
                    <Route
                        path='/registration/verification'
                        element={<VerificationPage/>}
                    />

                    <Route path='/forum' element={<ForumPage/>}/>
                    <Route path='/forum/discussion' element={<ForumDiscussionPage/>}/>

                    <Route path='/events' element={<EventsPage/>}/>
                    <Route path='/events/discussion' element={<EventsDiscussionPage/>}/>
                    <Route
                        path='/events/discussion/create'
                        element={<CreateEventDiscussion/>}
                    />
                    <Route path='/business/:id' element={<BusinessPage/>}/>
                    <Route path='/create/business' element={<CreateBusinessPage/>}/>
                    <Route path='/business/search' element={<BusinessSearchPage/>}/>
                    <Route path='/business/review/:id' element={<BusinessReviewPage/>}/>
                    <Route path='/gallery' element={<GalleryPage/>}/>
                    <Route path='/faq' element={<AccordionFAQAccordionSection/>}/>
                    <Route path='/chat' element={<ChatApp/>}/>
                    <Route path='/starterguide' element={<StarterGuide/>}/>
                    <Route path='/calendar' element={<Calendar/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path='/profile' element={<ProfilePage/>}/>
                        <Route path='/profile/edit' element={<EditProfilePage/>}/>
                        <Route path='/profile/gallery' element={<ProfileGalleryPage/>}/>
                        <Route path='/passwordreset' element={<PasswordResetPage/>}/>
                        <Route path='/map' element={<MapPage/>}/>
                        <Route path='/forum/discussion/create' element={<CreateForumDiscussion/>}/>
                        <Route path='/forum/discussion/edit' element={<EditForumDiscussion/>}/>
                        <Route path='/events/discussion/create' element={<CreateEventDiscussion/>}/>
                        <Route path='/events/discussion/edit' element={<EditEventDiscussion/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
