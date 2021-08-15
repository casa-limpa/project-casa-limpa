import React from 'react';
import './style.css';
import Logo from '../../assets/logo.png';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom';
import {logOut} from '../../Service/api';


export default function Header(){
    return(
        <div className='HeaderContainer'>
           <div className='HeaderLogo'>
               <Link to='/'>
               <img src={Logo} alt='Logotipo da empresa' />
               </Link>
           </div>

           <div className='HeaderMenu'>
               
               <Link to='/CadastraUsuario'>
                   <AddIcon/>
                   Novo Usuario
               </Link>
               <span>
                   |
               </span>
               <Link to='/'>
                   <PersonIcon/>
                   Usuarios
               </Link>
               <span>
                   |
               </span>
               <a onClick={()=>logOut()}>
                   <ExitToAppIcon/>
                   LogOut
               </a>
           </div>
        </div>
    );
}