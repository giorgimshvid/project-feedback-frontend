import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { useFormik } from "formik"
import { authService } from "../services/auth.service"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { signupValidationSchema } from "../utils/validations"
import type { RegisterRequest } from "../models/AuthProps"

const Signup = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: toFormikValidationSchema(signupValidationSchema),
    onSubmit: async (value: RegisterRequest, { setStatus, setSubmitting }) => {
      try {
        await authService.register(value)
        navigate("/login")
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e))
        setStatus(err.message)
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-[#2f323d] py-5">
          <h2 className="text-white text-center text-2xl font-bold">Sign Up</h2>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex px-4 py-5 flex-col gap-4">
          <Input
            type="text"
            placeholder="John"
            id="firstName"
            name="firstName"
            label="Firstname"
            value={formik.values.firstName}
            required
            handleChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("firstName")}
            error={formik.errors.firstName}
            touched={formik.touched.firstName}
          />

          <Input
            type="text"
            placeholder="Doe"
            id="lastName"
            name="lastName"
            label="Lastname"
            value={formik.values.lastName}
            required
            handleChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("lastName")}
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
          />

          <Input
            type="email"
            placeholder="test@example.com"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            required
            handleChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("email")}
            error={formik.errors.email}
            touched={formik.touched.email}
          />

          <Input
            type="password"
            placeholder="*********"
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            required
            handleChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("password")}
            error={formik.errors.password}
            touched={formik.touched.password}
          />

          <Input
            type="password"
            placeholder="*********"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={formik.values.confirmPassword}
            required
            handleChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("confirmPassword")}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
          />

          <Button type="submit" variant="primary" >
            {formik.isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-sm text-gray-600 pb-4 text-center mt-6">
          Already have an account?
          <Link to="/login" className="text-emerald-600 ml-2 font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
