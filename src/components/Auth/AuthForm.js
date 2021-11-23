import { useState,useRef, useContext} from 'react';
import AuthContext from '../store/AuthContext';

import classes from './AuthForm.module.css';


const AuthForm = () => {

  const [isLogin, setIsLogin] = useState(true);
const [isLoading, setLoaging] =useState(false);
const authCtx = useContext(AuthContext);

  const emailInputRef  = useRef()
  const passwordInputRef  = useRef()
  const nameInputRef =useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandle =(e)=>{
    e.preventDefault();
    const enteredEmail =emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredNanme = nameInputRef.current.value;

console.log(enteredEmail,enteredPassword)
    //optional aad validation
    
    setIsLogin(true);
    let url;
    if(isLogin){
      url='https://sisboa.net/public/api/auth/login'
    }else{
      url='https://sisboa.net/public/api/freeAccess/register';
    }
    if(isLogin){
      //user login
      fetch(url,{
        method:'POST',
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type': 'aplication/json'
        }
      }
      ).then(res=>{
        setIsLogin(false)
        if(res.ok){
        
        return res.json();
        }else{
         return res.json().then(data=>{
            //show model error
            let errorMessage ='Authentication Failed';
            if(data && data.error && data.error.message )
            {
              errorMessage =data.error.message;
              console.log(data)
            }
       
         throw new Error(errorMessage);
      
          });
        }
      }).then(data=>{
        authCtx.login(data.access_token)
      })
      .catch(err=>{
        alert(err.message);
      })

  
    }
      //create user
    else{
fetch(url,{
  method:'POST',
  body:JSON.stringify({
    email:enteredEmail,
    password:enteredPassword,
    name:enteredNanme,
    returnSecureToken:true
  }),
  headers:{
    'Content-Type': 'aplication/json'
  }
}
).then(res=>{
  setIsLogin(false)
  if(res.ok){
    console.log("dfatap")
    //...
  }else{
   return res.json().then(data=>{
      //show model error
      let errorMessage ='Authentication Failed';
      if(data && data.error && data.error.message )
      {
        errorMessage =data.error.message;
        console.log(data)
      }
   alert(errorMessage);

    });
  }
});
    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandle}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        
            { !isLogin  ?
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name'  ref={nameInputRef} />
        </div> : ''}

        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          { !isLoading  && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Enviando solicitud...</p>}

          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            { isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
