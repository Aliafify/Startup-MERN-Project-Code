import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { intializeLogIn } from "./actions/signin-up";
import "./components/general.css"
import Sign from "./components/signInUp/sign";
import Dashboard from "./components/dashboard/dashboard";
import Profile from "./components/dashboard/profile";
import Affilate from './components/affilation/Affilate';
import Team from './components/userTeam/team';
function App() {
  
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const body = document.querySelector('body');
    body.style.direction='rtl';
    body.style.fontFamily= 'Noto Kufi Arabic';
    
    dispatch(intializeLogIn());
  },[])

  const { user } = useSelector(mapStateToProps);
console.log(user)
  return (
    <BrowserRouter>
    <Routes>
      {/* public routes */}
    <Route path="*" element={<Sign/>}/>

    <Route path="/" element={<Sign/>}/>
    {/* Affilation route */}
    <Route path="/affilate/:id" element={<Affilate/>}/>
    {/* Admin Routes */}
 

{/* user routes : repeat this part if more than 1 type of users  */}
{user.auth===true&&(
      <>
      {/* insert user routes here */}
<Route path="/dashboard/:user" element={<Dashboard/>}>
    <Route path="profile" element={<Profile user={user}/>}/>
    {/* user routes */}
    {user.role==='user'&&<>
       <Route path='team' element={<Team/>}/>
    </>}
</Route>
      </>
    )}
    
    </Routes>
    </BrowserRouter>
  );
}
const mapStateToProps = ({ loggedUser }) => {
  const user = { ...loggedUser};
  return { user };
};
export default App;
