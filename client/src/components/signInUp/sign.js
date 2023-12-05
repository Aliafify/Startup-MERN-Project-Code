import React,{useEffect, useState} from 'react'
import LogIn from './logIn'
import SignUp from './signUp'

function Sign({affilate,savedAffilate}) {
   const [sign,setSign] = useState('in')
  useEffect(()=>{
   if(affilate){
    setSign('up')
   }
  },[])
  return (
    <>
    {sign==='in'?<LogIn setSign={setSign}/>:<SignUp setSign={setSign} savedAffilate={savedAffilate}/>}
    </>
  )
}

export default Sign;