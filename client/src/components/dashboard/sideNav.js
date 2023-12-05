import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { TbPackages } from "react-icons/tb";
import { SiMicrosoftteams } from "react-icons/si";
import { FaQuestion } from "react-icons/fa";
import { GiEgyptianProfile } from "react-icons/gi";
import { FaPowerOff } from "react-icons/fa6";

import "./sidNav.css";
import Logo from "../../assests/logo01.jpeg";
import { Link, NavLink } from "react-router-dom";
import { Log_Out } from "../../actions/signin-up";
import { useDispatch } from "react-redux";
const Tap =({index,viewComponent,setView,name})=>{
    return (<>
    <li className="menu-item" onClick={()=>setView(viewComponent[index])}>{name}</li>
    <hr/>
    </>)
}
const SidNav = ({minimized})=> {

    const dispatch = useDispatch() 
    const [iconsize,setIconSize] = useState(35);
    const [iconColor,setIconColor] = useState('orange')
    const taps = [
        {name:"الرئيسية",
        path:"#",
        icon:<IoMdHome 
            size={iconsize}  
            color={iconColor} />},
            {name:"الباقات",
            path:"packages",
            icon:<TbPackages size={iconsize} color={iconColor}/>},
                  {name:"الفريق",path:"team",
                icon:<SiMicrosoftteams size={iconsize}  
                color={iconColor} />
            },
                   {name:"FAQS",path:"faqs",
                icon:<FaQuestion size={iconsize}  
                color={iconColor} />
            },
                   {name:"حسابى",path:"profile",
                icon:<GiEgyptianProfile size={iconsize}  
                color={iconColor} />
            },
            
                 ];
    
    
    return(
        <>
        <div className="sidnav ">
        {!minimized&&<img src={Logo} width={'50px'} className="logo"/> }
        <ul className="side-menu">
           {taps.map((t,index)=>(
            <>
               <li key={index} className="menu-item">
               <NavLink className="side-link"   to={t.path}>{t.icon}{!minimized?t.name:''}</NavLink>
               </li>
               </>
))}
                <li className="menu-item">
                    <span className="side-link" onClick={()=>dispatch(Log_Out())}>{!minimized? <>Logout<FaPowerOff size={iconsize}  
                color={iconColor}/></>:<FaPowerOff size={iconsize}  
                color={iconColor}/>}</span>
                </li> 
        </ul>
        </div>
        </>
    )
}
export default SidNav;