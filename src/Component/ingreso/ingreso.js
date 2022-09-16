import './Ingresar.css';
import React , {useEffect, useState} from 'react';
import buscarusuario from './buscarusuario';
import boy from '../imgif/boy.gif';
import girl from '../imgif/girl.gif';
import searchlasid from '../ingreso/buscarultimoid';

export default function Ingreso(props) {
    const [strname, setstrname] = useState('');
    const [strpass, setstrpass] = useState('');
    const [strcorreo, setstrcorreo] = useState('');
    const [intidentrenador, setintidentrenador] = useState(0);
    const [tipsexo, settipsexo] = useState(true);

    const handleSubmit = async (e) => {
        await buscarusuario(strname, strpass).then(data => {
            if(data.length > 0) {
                props.getuserbool(true);
                props.getidentrenador(parseInt(data[0].id));
                props.getsexo(data[0].sexo);
            }
            else{         
                const sexo = tipsexo ? '0' : '1'; //0 hombre, 1 mujer
                props.getsexo(sexo);
                fetch('http://localhost:4000/api/entrenador/post',{
                    method: 'POST',
                    body: JSON.stringify({
                        id:intidentrenador,
                        nombre: strname,
                        clave: strpass,
                        sexo: sexo,
                        correo: strcorreo,
                        team:[]
                    }),
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(err => {
                        console.error(err);
                    });

                props.getuserbool(true);
                e.preventDefault();
            }
            props.getnameusuario(strname);
        }).catch(err => {
            console.log(err);
        }
        );
    }
    const handlercss = () => {
        let flipboxinner = document.getElementById('flipboxinner');
        flipboxinner.style.transform = 'rotateY(180deg)';
        // flip-vertical-right 
        // flip-vertical-left
    }
    const handlerrevercss = () => {
        let flipboxinner = document.getElementById('flipboxinner');
        flipboxinner.style.transform = 'rotateY(0deg)';
        // flip-vertical-right 
        // flip-vertical-left
    }
    const handlersexo = () => {
        debugger;
        settipsexo(!tipsexo);
        let chico = document.getElementById('chico');
        let chica = document.getElementById('chica');

        if (!tipsexo) {
            chico.style.filter = 'grayscale(0)';
            chica.style.filter = 'grayscale(1)';
            chica.style.animationPlayState = 'paused';
            chico.style.animationPlayState = 'running';
        }
        else {
            chica.style.filter = 'grayscale(0)';
            chico.style.filter = 'grayscale(1)';
            chica.style.animationPlayState = 'running';
            chico.style.animationPlayState = 'paused';
        }

    }

    useEffect(() => {
        searchlasid().then(data => {
            setintidentrenador(parseInt(data[0].id) + 1);            
            document.getElementById('chica').style.filter = 'grayscale(1)';
        }).catch(err => {
            console.log(err);
        });
    } , []);
    

  return (
    <div>
        <br></br>
        <div  id='flipbox' className="flip-box">
            <div id='flipboxinner' className="flip-box-inner">
                <div id='ingresouser'  className="flip-box-front" >
                    <div className="nes-container with-title is-centered" style={{ width:'30%', margin:'1rem auto'}}>
                        <p className="title">Ingreso de Entrenador</p>
                        <div className="nes-field">
                            <label>Tu Nombre</label>
                            <input type="text" id="name_field" className="nes-input" onChange={ (e) => {setstrname(e.target.value)} } />
                        </div>
                        <div className="nes-field">
                            <label>Tu Clave</label>
                            <input type="password" id="name_field" className="nes-input" onChange={ (e) => setstrpass(e.target.value) } />
                        </div>
                        <br />
                        <div>
                            <button type="button" className="nes-btn is-success" onClick={handleSubmit}>ingresar</button>
                            {' '}
                            <button type="button" className="nes-btn is-primary" onClick={handlercss}>Registrar</button>
                        </div>
                    </div>
                </div>
                <div id='registrouser' className="flip-box-back" >
                    <div className="nes-container with-title is-centered" style={{ width:'30%', margin:'1rem auto'}}>
                        <p className="title">Registro de Entrenador</p>
                        <div className="nes-field">
                            <label>Tu Nombre</label>
                            <input type="text" id="newentrenador" className="nes-input" onChange={ (e) => {setstrname(e.target.value)} } />
                        </div>
                        <div className="nes-field">
                            <label>Tu Correo</label>
                            <input type="text" id="newcorreo" className="nes-input" onChange={ (e) => {setstrcorreo(e.target.value)} } />
                        </div>
                        <div className="nes-field">
                            <label>Tu Clave</label>
                            <input type="password" id="newpass" className="nes-input" onChange={ (e) => setstrpass(e.target.value) } />
                        </div>
                            <label>¿eres chico o chica?</label>
                            
                        <br />
                        <label>
                            <input type="radio" className="nes-radio" name="answer" onChange={handlersexo} checked={tipsexo} />
                            <span>Chico</span>
                        </label>
                        <label>
                            <input type="radio" className="nes-radio" name="answer" onChange={handlersexo}  checked={!tipsexo}/>
                            <span>Chica</span>
                        </label>
                        <br />
                            {/* <img src={boy}  id='chico' alt='boy' style={{width:'7rem', left:'58%', top:'3%'}} /> */}
                            <img src={boy}  id='chico' alt='boy' style={{width:'7rem', left:'58%', top:'3%'}} /> 
                            <img src={girl} id='chica' alt='girl' style={{width:'7rem', left:'58%', top:'3%'}} />
                        {/* {
                            tipsexo ?
                            <img src={boy} alt='boy' style={{width:'7rem', left:'58%', top:'3%'}} />
                            :
                            <img src={girl} alt='girl' style={{width:'7rem', left:'58%', top:'3%'}} />
                        } */}
                        <br />
                        <br />
                        <div>
                            <button type="button" className="nes-btn is-primary" onClick={handleSubmit}>Registrarse</button>
                            {' '}
                            <button type="button" className="nes-btn is-warning" onClick={handlerrevercss}>Volver</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}