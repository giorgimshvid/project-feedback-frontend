import { useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import { Link } from "react-router-dom"

const Login = () => {
  const [emailValue, setEmailValue] = useState("")
  const [passValue, setPassValue] = useState("")
  const handleSubmit = () => {
    alert("Success")
  }
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-sm bg-white  rounded-lg shadow-sm border border-gray-200">
          <div className="bg-[#2f323d] py-5">
            <h2 className="text-white text-center text-2xl font-bold">Log In</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex px-4 py-5 flex-col gap-4">
            <Input
              handleChange={(e) => setEmailValue(e.target.value)}
              type={"email"}
              placeholder="test@example.com"
              value={emailValue}
              name={"email"}
              id={"email"}
              label={"Email"}
              required
            />
            <Input
              handleChange={(e) => setPassValue(e.target.value)}
              type={"password"}
              placeholder="*********"
              value={passValue}
              name={"password"}
              id={"password"}
              label={"Password"}
              required
            />
            <Button
              type={"submit"}
              variant={"primary"}
            >
              Log In
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
