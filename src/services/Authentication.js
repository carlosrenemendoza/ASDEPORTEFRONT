class Authentication  {
    test = ()=>{
    }  
    setAuthentication = (token,dataUser,customerSelect) =>{
      localStorage.setItem('token',token);
      // localStorage.setItem('data',dataUser)
    }
    getAuthentication = (value)=>{
      return localStorage.getItem(value);     
    }
    deleteAuthentication = (value)=>{
      localStorage.removeItem(value);
    }
}

export default Authentication;