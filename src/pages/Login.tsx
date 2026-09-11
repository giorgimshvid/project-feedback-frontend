import Input from "../components/Input"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { loginValidationSchema } from "../utils/validations"
import type { LoginRequest } from "../models/AuthProps"
import { authService } from "../services/auth.service"
import { useDispatch } from "react-redux"
import { setCredentials } from "../store/slices/authSlice"

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: toFormikValidationSchema(loginValidationSchema),
    onSubmit: async (value: LoginRequest, {setStatus, setSubmitting}) => {
      try {
        const response = await authService.login(value)
        if (response?.user) {
          dispatch(setCredentials(response.user))
        }
        navigate('/')
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e))
        setStatus(err.message || 'არასწორი მეილი ან პასსვორდი')
      } finally {
        setSubmitting(false)
      }
    }
  })


    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-sm bg-white  rounded-lg shadow-sm border border-gray-200">
          <div className="bg-[#2f323d] py-5">
            <h2 className="text-white text-center text-2xl font-bold">Log In</h2>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex px-4 py-5 flex-col gap-4">
            <Input
              type={"email"}
              placeholder="test@example.com"
              id={"email"}
              name={"email"}
              label={"Email"}
              value={formik.values.email}
              handleChange={formik.handleChange}
              onBlur={() => formik.setFieldTouched('email')}
              error={formik.errors.email}
              touched={formik.touched.email}
              required
            />
            <Input
              type={"password"}
              placeholder="*********"
              id={"password"}
              name={"password"}
              label={"Password"}
              value={formik.values.password}
              handleChange={formik.handleChange}
              error={formik.errors.password}
              onBlur={() => formik.setFieldTouched('password')}
              touched={formik.touched.password}
              required
            />
            <Button
              type={"submit"}
              variant={"primary"}
            >
              {formik.isSubmitting ? 'Logining...' : 'Login'}
            </Button>
          </form>

          <p className="text-sm text-gray-600 pb-4 text-center mt-6">
            Don't have an account?
            <Link to={'/signup'} className="text-emerald-600 ml-2 font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

    )
}

export default Login
