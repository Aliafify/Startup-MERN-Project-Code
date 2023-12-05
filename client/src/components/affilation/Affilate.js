import React, { useEffect,useState } from 'react'
import Sign from '../signInUp/sign'
import { useParams } from 'react-router-dom'

function Affilate() {
    const {id} = useParams();
    const [savedAffilate,setSavedAffilate] = useState(null)
    useEffect(()=>{
          const affilate = localStorage.getItem('AFFILATION_CODE');
          if(affilate&&affilate!=='null'||''){
            setSavedAffilate(affilate);
            console.log('aff exist',typeof affilate)
          }
          else{
            localStorage.setItem('AFFILATION_CODE',id);
            console.log('aff does not exist')

            setSavedAffilate(id);
          }
    },[])
  return (
    <div><Sign affilate={true} savedAffilate={savedAffilate}/></div>
  )
}

export default Affilate