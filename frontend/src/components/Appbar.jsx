import { useEffect, useState } from "react"
import { Button } from "./Button"
import { isMe } from "../../utils/me"
import { useNavigate } from "react-router-dom"
/* eslint-disable react/prop-types */
export const Appbar = ({ firstName }) => {
    const navigate = useNavigate();

    const [isLoggedin, setIsLoggedin] = useState(false)

    useEffect(() => {
        isMe().then((response) => {
            if (response) {
                setIsLoggedin(true)
            }
            else {
                setIsLoggedin(false)
            }
        })
    }, [])

    const handleLogout = () => {
        if (isLoggedin) {
            localStorage.removeItem("token")
            alert("Logged Out Successfully")
            navigate("/signin")
        }
    }

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            Payable
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {firstName}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {firstName[0]}
                </div>
            </div>
            {isLoggedin && <div className="h-full flex justify-center items-center mt-1">
                <Button label={"Logout"} onClick={handleLogout} />
            </div>}
        </div>
    </div>
}