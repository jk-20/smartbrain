import React from 'react';
import './Navigation.css';
const Navigation = ({onRouteChange , isSignin}) =>{
    if(isSignin){
    return (
           
                <nav className='navbar'>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
             );
            }else{
                return(
                    <nav className='navbar'>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
                </nav>

                );
               
            }
      
    

}





export default Navigation;