import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
//component import
import { Appbar } from "../../components/Appbar"
import { Balance } from "../../components/Balance"
import { Users } from "../../components/Users"

export const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState("")
  const [firstName, setFirstName] = useState("")

  useEffect(() => {
    //function to check the user's existance
    (async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token")
          }
        })

        setFirstName(response.data.user.firstName)
      } catch (error) {
        setFirstName("") //reset the first name
        alert(error.response.data.message)

        //navigate to the sign in page
        navigate("/signin")
      }
    })();

    // function to get users balance info
    (async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        setBalance(response.data.balance)
      } catch (error) {
        alert(error.response.data.message)
      }
    })();

  }, [])

  return (
    <div className="">
      <Appbar firstName={firstName} />
      <div className="p-6">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  )
}
