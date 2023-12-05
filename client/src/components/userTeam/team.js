import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { UseSelector, useSelector } from 'react-redux'
import { urlBase } from '../../utils/API';
import CopyToClipboardButton from './copy-text';
import ResponsiveTable from './Table';
const Team = ()=>{
 
const {user} = useSelector(mapStateToProps)
const [team,setTeam] = useState([]); 
  useEffect(() => {
    console.log('Team useEffect',user);
    const userTeam = user.AffilationTree;
   
       axios({ 
        method:'post',  
url:`${urlBase}/api/get-team`,
data:{team:userTeam}, 
withCredentials:true  
      }).then(res=>{
        if(res.data.case===true){
            setTeam(res.data.users)
            console.log(res.data.users)
        }
      }).catch(e=>{console.log(e.message)})
    // Your effect logic here

    return () => {
      console.log('Team useEffect cleanup');
      // Cleanup logic if needed
    };
  }, []);

  const [textToCopy,setTextToCopy] = useState('');
  useEffect(()=>{
      const link = window.location.origin;
      setTextToCopy(`${link}/affilate/${user._id}`)
      console.log(link)
  },[])
  console.log('tttt',team)
    return(<>
   <CopyToClipboardButton textToCopy={textToCopy}/>
   <ResponsiveTable data = {team}/>
    </>)

}

function mapStateToProps({loggedUser}){
  return {user:loggedUser};
}

export default Team;