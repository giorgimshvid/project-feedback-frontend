import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { authService } from "../services/auth.service";
import { logoutUser } from "../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.log(error);
        }
        dispatch(logoutUser())
        navigate('/login')
    }

    return (
        <>
            <header className="flex justify-between items-center bg-[#2f323d] py-4 px-7">
                <Link to={isAuthenticated ? '/dashboard' : '/'} className="font-bold text-white text-2xl">
                    Feedback
                </Link>
                {
                    isAuthenticated && user ? (
                        <div className="header-inner w-full flex justify-between items-center ml-8">
                            <div className="user-info flex justify-center gap-x-10 text-white">
                                <p className="font-bold">User: </p>
                                <p>{user?.firstName}</p>
                                <p>{user?.lastName}</p>
                                <p>{user?.email}</p>
                            </div>
                            <div className="logout-btn text-white px-4 py-2 bg-emerald-600">
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    ) :
                    (
                        <div className="header-inner flex gap-x-2">
                            <Link 
                                to='/login' 
                                className="bg-emerald-500 px-4 py-2 text-base font-semibold text-white transition-colors hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400">
                                    Login
                            </Link>
                            <Link 
                                to='/signup'
                                className="bg-[#f2eda3] px-4 py-2 text-base font-semibold text-[#2f323d] transition-colors hover:bg-[#e9e28d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2eda3]" >
                                    Signup
                            </Link>
                        </div>
                    )
                }
                
            </header>
        </>
    )
}

export default Header


{/* <header className="flex justify-between bg-[#2f323d] py-4 px-7">
                <div className="user-info flex justify-center gap-x-10 text-white">
                    <p className="font-bold">User: </p>
                    <p>{user?.firstName}</p>
                    <p>{user?.lastName}</p>
                    <p>{user?.email}</p>
                </div>
                <div className="logout-btn text-white px-4 py-2 bg-emerald-600">
                   <button onClick={handleLogout}>Logout</button>
                </div>
            </header> */}