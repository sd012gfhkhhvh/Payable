import axios from "axios"

export const isMe = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/v1/user/me", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        return response;
    } catch (e) {
        console.log(e.response.data.message);
        return false;
    }
}