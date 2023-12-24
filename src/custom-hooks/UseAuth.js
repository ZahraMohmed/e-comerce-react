import  { useEffect, useState } from 'react'
import { auth } from '../Firebase/config'
import {  onAuthStateChanged } from "firebase/auth";
export default function UseAuth() {
  const [currentUser , setCurrentUser]= useState({})
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        
      } else {
        setCurrentUser(null)
      }
    });
  })
  return {currentUser}
}
