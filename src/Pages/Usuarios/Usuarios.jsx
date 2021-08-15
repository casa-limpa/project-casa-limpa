import React, { useEffect, useState } from 'react';
import ListUser from '../../Components/ListUser/ListUser';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { GetUsers } from '../../Service/api';
import './style.css';
import firebase from "../../Service/firebase";
import { Select } from '@material-ui/core';

export default function Usuarios(){
    const [nameUser, setName] = useState('');
    const [data, setData] = useState([]);
    const [filterField, setFilterField] = useState('');


      const listUser = async(data)=>{


      

  await firebase.database().ref('User').on('value', (snapshot)=>{
     
     setData([]);
     snapshot.forEach((chilItem)=>{
let dados = {
    key: chilItem.key,
    nome: chilItem.val().nome,
    tipo: chilItem.val().tipo,
    fotoUrl: chilItem.val().fotoUrl,
    endereco: chilItem.val().endereco,
    email: chilItem.val().email,
    celular: chilItem.val().celular,
    autorizado: chilItem.val().autorizado
};

setData(oldArray => [...oldArray, dados]);

     })
  })





      }
      

      useEffect(()=>{
        listUser();
      },[]);


      const changeCkecked = (e)=>{
          
            // console.log(e.target.checked);

            if(e.target.checked === true){
                const newElement = e.target.name;

                setData([...data, newElement]);

            }else{
                const array = data;
                const name = e.target.name;
                const index = array.indexOf(name);
               array.splice(index,1);

            }
      }


    return(
        <div className='UsuariosContainerList'>

<div className='FiltroClass'>
               

               <select onChange={(e)=>setFilterField(e.target.value)}>
                   <option defaultValue disabled> Selecione um filtro</option>
                   <option value=''> Sem filtro</option>
                   <option value='Deposito'> Deposito</option>
                   <option value='Coletador'> Coletador</option>
                   <option value='Gerador'> Gerador</option>
                   <option value='Catador'> Catador</option>
               </select>


            </div>

          {
                data === [] ?
                <div>
                    <h1>Carregando</h1>
                </div>
                :
                <div className='containerListUser'>
                    
                    {
                    data.map((item, key)=>{

                            if(filterField !== ''){

                                if(filterField === item.tipo){
                                        return(
                                            <ListUser 
                            id={item.key}
                            nome={item.nome}
                            tipo={item.tipo}
                            celular={item.celular}
                            endereco={item.endereco}
                            email={item.email}
                            fotoUrl={item.fotoUrl}
                            autorizado={item.autorizado}
                            />
                                        )
                                }

                            }else{
                                return(
                            <ListUser 
                            id={item.key}
                            nome={item.nome}
                            tipo={item.tipo}
                            celular={item.celular}
                            endereco={item.endereco}
                            email={item.email}
                            fotoUrl={item.fotoUrl}
                            autorizado={item.autorizado}
                            />
                        );
                            }
                        

            })}
            
           
                </div>
                
            }

        </div>
    );
}