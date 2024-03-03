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

export const Signin = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("")
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

  // Signin
  const handleSignin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      })

      localStorage.setItem("token", response.data.token)
      navigate("/dashboard")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="soham@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={handleSignin} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}