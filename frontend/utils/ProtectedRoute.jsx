/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//utils import
import { isMe } from './me'

export const ProtectedRoute = ({ Component, loggedInRoute, loggedOutRoute }) => {
    const navigate = useNavigate()

    //navigate according to the wheather the user is logged in or not
    useEffect(() => {
        isMe().then((response) => {
            //Not logedin
            if (!response) {
                if (loggedOutRoute) {
                    navigate(loggedOutRoute, { replace: true }) // stopts the user from navigate back to the previous page and make them stay at the signin page
                }
            }
            //Logged in 
            else {
                if (loggedInRoute) {
                    navigate(loggedInRoute)
                }
            }
        })
    }, [navigate, loggedInRoute, loggedOutRoute])

    return (
        <>
            {/* protected */}
            {Component}
        </>
    )
}
