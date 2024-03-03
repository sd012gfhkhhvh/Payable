import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

//component import
import { Heading } from "../../components/Heading"
import { SubHeading } from "../../components/SubHeading"
import { InputBox } from "../../components/InputBox"
import { Button } from "../../components/Button"
import { BottomWarning } from "../../components/BottomWarning"
import { isMe } from "../../../utils/me";

export const Signup = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("")
  const [firstName, setFirstname] = useState("")
  const [lastName, setLastname] = useState("")
  const [password, setPassword] = useState("")

  //checking the users login status
  useEffect(() => {
    isMe().then((response) => {
      if (response) {
        navigate("/dashboard")
      }
    }).catch((error) => {
      console.log(error.message);
    })
  }, [navigate])

  // Signup
  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password
      })
      localStorage.setItem("token", response.data.token)
      navigate("/dashboard")
    }
    catch (error) {
      console.log(error);
      alert(error.response.data.message)
    }
  }


  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e) => setFirstname(e.target.value)} placeholder="Soham" label={"First Name"} />
        <InputBox onChange={(e) => setLastname(e.target.value)} placeholder="Das" label={"Last Name"} />
        <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="soham@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={handleSignup} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}