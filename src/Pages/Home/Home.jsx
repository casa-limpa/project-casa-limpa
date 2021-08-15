import React, { useEffect } from 'react';
import './style.css';
import FormLogin from '../../Components/Login/';
import {logOut } from '../../Service/api'

export default function HomePage(){


    
    return (
        <div className='HomaPageLoginContainer'>
           
          <FormLogin />
        </div>
      );
}