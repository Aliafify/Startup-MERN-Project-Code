import axios from "axios";
// export const urlBase = 'http://localhost:8073'
// export const urlBase = "https://ag-platform.com";
export const urlBase= ''
//---- get Adm----
export const getAccounts = () => {
  return axios({
    method: "get",
    url: `${urlBase}/api/admins`,
    responseType: "json",
  });
}; 

// ----------Register--------
export const register = (data) => {   // role used to identefy type of user to register
    const url = `${urlBase}/api/register/user`;
    return axios({
      method: "POST",
      data: data,
      withCredentials: true,
      url: url,
    });
  };

// Reset Password  request
export const ResetPassRequest= (email)=>{
  return axios({
    method:"POST",
    data:email,
    withCredentials:true,
    url:`${urlBase}/api/user/password/reset`
  })
}

// Verify Reset Code
export const verifyCodeRequest = (code)=>{
  return axios({
    method:"POST",
    data:code,
    withCredentials:true,
    url:`${urlBase}/api/user/verify/code`
  })
}

//--------check login statue when reload or new session-----------
export const intializeUser = () => {
    return fetch(`${urlBase}/api/auth`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((user) => user)
      .catch((err) => {
        console.log(err);
      });
  };
  
  //------- logOut --------
  export const logOut = () => {
    return fetch(`${urlBase}/api/logout`, {
      credentials: "include",
    });
  };
  
  // --------  login------
  export const getAuthedUser = (authentcation) => {
    return axios({
      method: "POST",
      data: {
        username: authentcation.email,
        password: authentcation.password,
      },
      withCredentials: true,
      url: `${urlBase}/api/login`,
    }).then((res) => res.data);
  };
  // update user
  export const update_user=(data)=>{//data is an object
    // console.log('api',data,role)
    return axios({
      method:"put",
      data:{property:data},
      withCredentials:true,
      url:`${urlBase}/api/update`//update client end point
    })
  }

