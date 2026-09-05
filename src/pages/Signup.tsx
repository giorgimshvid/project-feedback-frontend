import type { Link } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { useState, type ChangeEvent } from "react"

const Signup = () => {
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword:"",
  })



    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        {/* <div className="w-full max-w-sm bg-white  rounded-lg shadow-sm border border-gray-200">
          <div className="bg-[#2f323d] py-5">
            <h2 className="text-white text-center text-2xl font-bold">Log In</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex px-4 py-5 flex-col gap-4">
            <Input

              type={"email"}
              placeholder="test@example.com"
              value={""}
              name={"email"}
              id={"email"}
              label={"Email"}
              required handleChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.")
              } }            />
            <Input
              type={"password"}
              placeholder="*********"
              value={""}
              name={"password"}
              id={"password"}
              label={"Password"}
              required handleChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.")
              } }            />
            <Input
              type={"email"}
              placeholder="test@example.com"
              value={""}
              name={"email"}
              id={"email"}
              label={"Email"}
              required handleChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.")
              } }            />
            <Input
              type={"password"}
              placeholder="*********"
              value={""}
              name={"password"}
              id={"password"}
              label={"Password"}
              required handleChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.")
              } }            />
            <Input
              type={"password"}
              placeholder="*********"
              value={""}
              name={"password"}
              id={"password"}
              label={"Password"}
              required handleChange={function (e: ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.")
              } }            />
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
        </div> */}
        Register
      </div>
    )
}

export default Signup
