import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authService } from "../services/auth.service";
import { setCredentials, setLoading } from "../store/slices/authSlice";

const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authService.getMe();
        if (res?.user) {
          dispatch(setCredentials(res.user));
        } else {
          dispatch(setLoading(false));
        }
      } catch (error) {
        dispatch(setLoading(false));
      }
    };
    fetchUser();
  }, [dispatch]);
};

export default useAuthInit;
