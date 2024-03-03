import { useEffect, useState } from "react"
import axios from "axios"
//component import
import { Appbar } from "../../components/Appbar"
import { Balance } from "../../components/Balance"
import { Users } from "../../components/Users"

export const Dashboard = () => {
  const [balance, setBalance] = useState("")

  useEffect(() => {
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
    })()
  }, [])

  return (
    <div className="">
      <Appbar />
      <div className="p-6">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  )
}
