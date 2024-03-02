import { Appbar } from "../../components/Appbar"
import { Balance } from "../../components/Balance"
import { Users } from "../../components/Users"

export const Dashboard = () => {
  return (
    <div className="">
      <Appbar />
      <div className="p-6">
        <Balance value="5000" />
        <Users />
      </div>
    </div>
  )
}
