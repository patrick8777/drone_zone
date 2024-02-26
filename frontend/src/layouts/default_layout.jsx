import {Outlet, useLocation} from "react-router-dom";
import Header from "./header.jsx";
// import Footer from "./footer.jsx";

export default function DefaultLayout() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'rgb(15,23,42)'}}>
            <Header backgroundColor={isHomePage} headerMarginTop={!isHomePage} applyGradient={!isHomePage}/>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexGrow: '1',
                marginTop: isHomePage ? '0' : '5.3rem',
                marginBottom: isHomePage ? '0' : '0',
            }}>
                <Outlet/>
            </div>
            {/*<Footer backgroundColor={isHomePage} footerMarginBottom={!isHomePage}/>*/}
        </div>
    );
}