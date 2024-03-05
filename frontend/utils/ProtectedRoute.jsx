/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//utils import
import { isMe } from './me'

export const ProtectedRoute = ({ Component, loggedInRoute, loggedOutRoute }) => {
    const navigate = useNavigate()

    useEffect(() => {
        isMe().then((response) => {
            if (!response) {
                if (loggedOutRoute) {
                    navigate(loggedOutRoute, {replace: true}) // stopts the user from navigate back to the previous page and make them stay at the signin page
                }
            } else {
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
