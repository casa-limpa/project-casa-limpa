import React, { useEffect, useState } from 'react';
import './styles.css';
import { cadastraUser } from '../../Service/api';
import firebase from '../../Service/firebase';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import NumberFormat from "react-number-format";
import Swal from 'sweetalert2';




function CadastraUsuario() {

  const [photo, setPhoto] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [imageStorage, setImageStorage] = useState('');
  const [rodarIcon, setRodarIcon] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [endereco, setEndereco] = useState('');
  const [tipo, setTipo] = useState('');
  const [autorizado, setAutorizado] = useState('');
  const [loading, setLoading] = useState(false);



  const cleanFields = () => {
    setRodarIcon(1);
    setName('');
    setEmail('');
    setCelular('');
    setEndereco('');
    setTipo('');
    setPhoto('');
    setPhotoName('');
    setAutorizado('')
  }

  useEffect(() => {

    setTimeout(function () { setRodarIcon(0); }, 2000);

  }, [rodarIcon])




  const saveUser = () => {
    console.log('Clickou no botão')

    const uid = Date.now();

    if (name === '' || email === '' || celular === '' || endereco === '' || tipo === '' || autorizado === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Revise todos os campos',
      })
      return
    }

    setLoading(true);

    cadastraUser(name, email, endereco, celular, tipo, uid, autorizado)
      .then(async (response) => {
        console.log('Caiu no then')

        console.log(response);
        cleanFields();

        if (imageStorage) {
          uploadPhoto(imageStorage, uid);
        } else {
          setLoading(false);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
        }

      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo deu errado, tente novamente mais tarde',
        })
        console.log(err);
        console.log('Caiu no catch')
      })
  }

  async function uploadPhoto(imageStorage, uid) {



    const updateTask = await firebase
      .storage()
      .ref(`images/${uid}/${imageStorage.name}`)
      .put(imageStorage)
      .then(async () => {

        console.log('Cadastrou a foto');
        console.log('Fazendo o download....');

        await firebase.storage().ref(`images/${uid}`).child(imageStorage.name).getDownloadURL()
          .then(async (url) => {
            let urlFoto = url;

            await firebase.database().ref('User').child(`${uid}`)
              .update({
                fotoUrl: urlFoto
              })
              .then(() => {
                setLoading(false);
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cadastrado com sucesso!',
                  showConfirmButton: false,
                  timer: 1500
                })
              })
              .catch((err) => {
                setLoading(false);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Algo deu errado, tente novamente mais tarde',
                })
                console.log(err);
              })

          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo deu errado, tente novamente mais tarde',
        })
      });
  }


  const updatePhoto = (e) => {

    setPhoto(URL.createObjectURL(e.target.files[0]));
    setImageStorage(e.target.files[0]);
    setPhotoName(e.target.files[0].name);
  }


  return (
    <div className='CadastraUsuarioContainer'>

      {
        loading ?
          <div>
            <h1>Carregando....</h1>
          </div>

          :
          <div>
            <div className='ContainerForm'>

              <div className='ContainerFoto'>
                <div className='ContainerFotoCard'>
                  {photo !== '' && (<img src={photo} title={photoName} alt='Foto do usuario' />)}
                </div>
                <div>

                  <label htmlFor='input-file'>
                    <PhotoCameraIcon />
                  </label>

                  <input
                    id='input-file'
                    type='file'
                    onChange={(e) => updatePhoto(e)}
                  />
                </div>
              </div>


              <div className='ContainerInputsForm'>
                <TextField
                  id="standard-basic"
                  label="Nome"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <TextField
                  id="standard-basic"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <TextField
                  id="standard-basic"
                  label="Endereço"
                  onChange={(e) => setEndereco(e.target.value)}
                  value={endereco}
                />

                <NumberFormat
                  label="Celular"
                  customInput={TextField}
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  format={"(##)#####-####"}
                />
              </div>

              <div>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Função</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" onChange={(e) => setTipo(e.target.value)} value={tipo}>
                    <FormControlLabel value="Gerador" control={<Radio />} label="Gerador" />
                    <FormControlLabel value="Catador" control={<Radio />} label="Catador" />
                    <FormControlLabel value="Deposito" control={<Radio />} label="Deposito" />
                    <FormControlLabel value="Coletador" control={<Radio />} label="Coletador" />
                  </RadioGroup>
                </FormControl>

                <FormControl component="fieldset">


                  {
                    tipo === 'Gerador' && (
                      <>
                        <FormLabel component="legend">Tipo</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" onChange={(e) => setAutorizado(e.target.value)} value={autorizado}>
                          <FormControlLabel value="comercial" control={<Radio />} label="comercial" />
                          <FormControlLabel value="Residencial" control={<Radio />} label="Residencial" />
                        </RadioGroup>
                      </>
                    )
                  }

                  {
                    tipo === 'Catador' && (
                      <>
                        <FormLabel component="legend">Tipo</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" onChange={(e) => setAutorizado(e.target.value)} value={autorizado}>
                          <FormControlLabel value="Cadastrado" control={<Radio />} label="Cadastrado" />
                          <FormControlLabel value="Não Cadastrado" control={<Radio />} label="Não Cadastrado" />
                        </RadioGroup>
                      </>
                    )
                  }

                  {
                    tipo === 'Deposito' && (
                      <>
                        <FormLabel component="legend">Tipo</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" onChange={(e) => setAutorizado(e.target.value)} value={autorizado}>
                          <FormControlLabel value="Autorizado" control={<Radio />} label="Autorizado " />
                          <FormControlLabel value="Parceiro" control={<Radio />} label="Parceiro" />
                        </RadioGroup>
                      </>
                    )
                  }

                  {
                    tipo === 'Coletador' && (
                      <>
                        <FormLabel component="legend">Tipo</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" onChange={(e) => setAutorizado(e.target.value)} value={autorizado}>
                          <FormControlLabel value="Cadastrado" control={<Radio />} label="Cadastrado" />
                          <FormControlLabel value="Não Cadastrado" control={<Radio />} label="Não Cadastrado" />
                        </RadioGroup>
                      </>
                    )
                  }

                </FormControl>
              </div>
            </div>

            <div className='ContainerButtons'>
              <Button

                variant="contained"
                color="default"
                size="small"
                startIcon={<AutorenewIcon className={rodarIcon == 1 ? 'girarIcon' : ''} />}
                onClick={() => cleanFields()}
              >
                Limpar
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                // className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => saveUser()}
              >
                Save
              </Button>
            </div>
          </div>
      }


    </div>
  );
}

export default CadastraUsuario;