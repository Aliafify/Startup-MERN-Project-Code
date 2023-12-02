import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";

import "./sidNav.css";
import Logo from "../../assests/logo01.jpeg";
import { Link, NavLink } from "react-router-dom";
const Tap =({index,viewComponent,setView,name})=>{
    return (<>
    <li className="menu-item" onClick={()=>setView(viewComponent[index])}>{name}</li>
    <hr/>
    </>)
}
const SidNav = ({minimized})=> {

    
    const [iconsize,setIconSize] = useState(20);
    const [iconColor,setIconColor] = useState('orange')
    const taps = [{name:"الرئيسية",path:"#",icon:<IoMdHome size={iconsize} color={iconColor} />},{name:"الباقات",path:"packages"},
                  {name:"الفريق",path:"my-team"},
                   {name:"FAQS- الاسئلةالشائعة",path:"faqs"},
                   {name:"حسابى",path:"profile"},
                 ];
    
    
    return(
        <>
        <div className="sidnav ">
        <img src={Logo} width={'50px'} className="logo"/> 
        <ul className="side-menu">
           {taps.map((t,index)=>(
               <li key={index} className="menu-item">
               <NavLink className="side-link"   to={t.path}>{t.icon}{!minimized?t.name:''}</NavLink>
               <hr/>
               </li>
))}
        </ul>
        </div>
        </>
    )
}
export default SidNav;