import React, { useEffect, useState, Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import TelaCadastro from './Pages/CadastrarUsuarios/CadastraUsuario';
import Usuarios from './Pages/Usuarios/Usuarios';
import HomePage from './Pages/Home/Home';
import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import SimpleBottomNavigation from './Components/NavegacaoInferior';
import {auth} from './Service/api';


function Routes(){
    
    const [logTrue, setLogTrue] = useState();

    // useEffect(()=>{
        let Autentication = JSON.parse(window.localStorage.getItem('Auth'));
        // setLogTrue(Autentication);
    // },[logTrue]);

    // const PrivateRoute= ({component: Component, ...rest}) => (

    //     <Route {...rest} render={props=>(
    //         logTrue?(
    //             <Component {...props}/>
    //         ):(
    //             <Redirect to={{pathname:'/', state:{from: props.location}}}/>
    //         )
            
    //     )}/>
    // );

return(
 
        
            Autentication === null  ?
            <BrowserRouter>
            <Switch>
                <Route  path='*' component={HomePage} />
            </Switch>
            </BrowserRouter>
            :
            
            <BrowserRouter>
            
            <Header/>
            <Switch>
                <Route exact path='/CadastraUsuario' component={TelaCadastro}/>
            <Route exact path='/' component={Usuarios}/>
            </Switch>
            <Footer />
            <SimpleBottomNavigation/>    
            </BrowserRouter>
        
        
    // <SimpleBottomNavigation/>

);

}

export default Routes;