import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const Layout = () => {
    return (
        <>
            <div className="main-wrap min-h-screen flex flex-col justify-between">
                <Header />
                <div className="content">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout