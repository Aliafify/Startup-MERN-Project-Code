import { getAuthedUser, intializeUser, logOut, register,update_user } from "../utils/API";


export const AUTH_LOGIN = "AUTH_LOGIN";
export const REGISTER_ADMIN = "REGISTER_ADMIN";

const admin = (user) => {
    return {
      type: REGISTER_ADMIN,
      user,
    };
  };

  export const Register_Admin = (user) => {
    return (dispatch) => {
      return register(user).then((res) => {
        if (res.data === "created") {
          dispatch(admin(user));
          alert(`account created with email: ${user.username}`);
        }
       else if (res.data === "exist") {
          alert(`account with email: ${user.email} already exist`);
        }
        else{console.log(res.data);}
        return res
      });
    };
  };

  export const authedUser = (user) => {
    return {
      type: AUTH_LOGIN,
      user,
    };
  };
  

  export const logIn = (authentcation) => {
    return (dispatch) => {
      return getAuthedUser(authentcation).then((data) => {
      if(data.auth){
        const user = {...data.user,auth:data.auth}
        dispatch(authedUser(user));
      }
      else{
        // alert('password or username is not correct or username does not exist')
      }
      return data
  
      });
    };
  };

  export const intializeLogIn = () => {
    return (dispatch) => {
      return intializeUser().then((data) => {
        console.log(data)
        const user = {...data.user,auth:data.auth}
        dispatch(authedUser(user));
      });
    };
  };
  export const Log_Out = ()=>{
    return (dispatch) => {
      return logOut().then((res) => {
        dispatch(authedUser(null));
      });
    };
  }

  export const UPDATE_USER = "UPDATE_USER";
const updateUser = (data) => {
    return {
        type: UPDATE_USER,
        data
    }
}
export const Update_User = (data, role) => {
    return (dispatch) => {
        console.log('actions',data,role)
        return update_user(data, role).then(res => {
            if (res.status === 200) {
                dispatch(updateUser(data))
            }
            return res
        })
    } 
} 