import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {logOut} from '../../Service/api';
import './style.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom:0
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const changePage=(e, value)=>{
    if(value === 0){
      window.location='/CadastraUsuario';
    }
    if(value === 1){
      window.location='/';
    }
  }

  useEffect(()=>{
    const rota = window.location.pathname;

    if(rota === '/CadastraUsuario'){
      setValue(0);
    }
    if(rota === '/'){
      setValue(1);
    }
  })

  return (
    <div className='containerBottomMenu'>
      <BottomNavigation
      value={value}
      onChange={(event, newValue) => changePage(event, newValue)}
      showLabels
      className={ `${classes.root} `}
    >
      <BottomNavigationAction label="Novo Usuario"  icon={<AddIcon />} />
      <BottomNavigationAction label="Usuarios"  icon={<PersonIcon />} />
      <BottomNavigationAction label="Log Out"  icon={<ExitToAppIcon />} onClick={()=>logOut()}/>
    </BottomNavigation>
    </div>
  );
}