import React from 'react'
import UseAuth from '../custom-hooks/UseAuth'
import { Navigate} from 'react-router-dom'

export default function ProtectedRoot({children}) {
  
  const {currentUser} = UseAuth()
  return currentUser ? children : <Navigate to='/login'/>
}
