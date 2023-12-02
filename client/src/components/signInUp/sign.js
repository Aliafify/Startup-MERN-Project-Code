import React,{useState} from 'react'
import LogIn from './logIn'
import SignUp from './signUp'

function Sign() {
   const [sign,setSign] = useState('in')

  return (
    <>
    {sign==='in'?<LogIn setSign={setSign}/>:<SignUp setSign={setSign}/>}
    </>
  )
}

export default Sign