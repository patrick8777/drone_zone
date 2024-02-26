import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"

export const ProtectedRoutes = () => {
  const accessToken = useSelector((state) => state.user.accessToken)
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken === null) return navigate("/")
  }, [accessToken, navigate])

  return (
    <main>
      <Outlet />
    </main>
  )
}

export default ProtectedRoutes
