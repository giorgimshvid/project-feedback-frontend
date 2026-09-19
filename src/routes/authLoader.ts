import { redirect } from "react-router-dom"
import { authService } from "../services/auth.service"
import { logoutUser, setCredentials } from "../store/slices/authSlice"
import { store } from "../store/store"

export const requiredAuthLoader = async () => {
  const isAutentication = store.getState().auth.isAuthenticated
  if (isAutentication) return null
  try {
    const res = await authService.getMe()
    if (res?.user) {
      store.dispatch(setCredentials(res.user))
      return null
    } else {
      store.dispatch(logoutUser())
      return redirect("/login")
    }
  } catch (e) {
    console.error("Auth loader error")
    store.dispatch(logoutUser())
    return redirect("/login")
  }
}
