/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { isMe } from "../../../utils/me"


export const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        isMe().then((response) => {
            if (response) {
                navigate("/dashboard")
            }
            else {
                navigate("/signin")
            }
        }).catch((error) => {
            console.log(error.message);
        })

    }, [navigate])

    return (
        <>
            Home
        </>
    );
}
