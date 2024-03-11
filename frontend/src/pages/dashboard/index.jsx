//packages import
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

//component import
import { Appbar } from "../../components/Appbar"
import { Balance } from "../../components/Balance"
import { Users } from "../../components/Users"

//utils import
import { isMe } from "../../../utils/me"

export const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState("")
  const [firstName, setFirstName] = useState("")

  // function to get users balance info
  const fetchbalance = async () => {
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
  }

  useEffect(() => {

    // get the current users data and fetch balance
    isMe().then((response) => {
      if (response) {
        setFirstName(response.data.user.firstName) // set first name
        fetchbalance()
      }
      else {
        setFirstName("") //reset the first name
      }
    }).catch((error) => {
      console.log(error.message);
    });

  }, [navigate])

  return (
    <>
      <div className="">
        <Appbar firstName={firstName} />
        <div className="p-6">
          <Balance value={balance} />
          <Users />
        </div>
      </div>
    </>
  )
}
