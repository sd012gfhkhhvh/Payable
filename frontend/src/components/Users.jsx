/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// import component
import { Button } from "./Button"
import { Pagination } from "./Pagination"


export const Users = () => {

    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [curPage, setCurPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}&page=${curPage}&limit=${limit}`, {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                console.log(response.data);
                setTotalPages(Math.ceil(response.data.total / limit));
                setUsers(response.data.users)
            } catch (e) {
                // alert(e.response.data.message)
            }
        })()
    }, [filter, curPage, limit])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div className="border-2 p-2 rounded-md">
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
        <Pagination curPage={curPage} setCurPage={setCurPage} totalPages={totalPages} />
    </>
}

function User({ user }) {
    const navigate = useNavigate();

    return <div className="flex justify-between items-center">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex justify-center items-center h-full">
            <Button onClick={() => navigate("/send?firstName=" + user.firstName + "&userId=" + user._id)} label={"Send Money"} />
        </div>
    </div>
}