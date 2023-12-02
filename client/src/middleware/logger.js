const logger =(store)=>(next)=>(action)=>{

     console.log(action.type)
    

    
    console.log(action);
    const data =store.getState();
     console.log("data:" ,data)
     return next(action);
 }
 export default logger; 