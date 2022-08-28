import './Ingresar.css';
import React , {useState} from 'react';
import buscarusuario from '../home/buscarusuario';
import boy from '../imgif/boy.gif';
import girl from '../imgif/girl.gif';

export default function Home(props) {
    const [strname, setstrname] = useState('');
    const [strpass, setstrpass] = useState('');
    const [tipsexo, settipsexo] = useState(true);

    const handleSubmit = async (e) => {
        await buscarusuario(strname, strpass).then(data => {
            if(data.length > 0) {
                debugger;
                props.getuserbool(true);
                props.getidentrenador(data[0].id);
                props.getsexo(data[0].sexo);
            }
            else{
                debugger;
                const sexo = tipsexo ? '0' : '1'; //0 hombre, 1 mujer
                fetch('http://localhost:4000/api/entrenador/post',{
                    method: 'POST',
                    body: JSON.stringify({
                        id:2,
                        nombre: strname,
                        clave: strpass,
                        sexo: sexo,
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
                            <button type="button" className="nes-btn is-primary" onClick={handleSubmit}>ingresar</button>
                            {' '}
                            <button type="button" className="nes-btn is-primary" onClick={handlercss}>Registrar</button>
                        </div>
                    </div>
                </div>
                <div id='registrouser' className="flip-box-back" >
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
                            <label>¿eres chico o chica?</label>
                            
                        <br />
                        <label>
                            <input type="radio" className="nes-radio" name="answer" onChange={ () => settipsexo(true) } checked={tipsexo} />
                            <span>Chico</span>
                        </label>
                        <label>
                            <input type="radio" className="nes-radio" name="answer" onChange={ () => settipsexo(false) }  checked={!tipsexo}/>
                            <span>Chica</span>
                        </label>
                        <br />
                        {
                            tipsexo ?
                            <img src={boy} alt='boy' style={{width:'7rem', left:'58%', top:'3%'}} />
                            :
                            <img src={girl} alt='girl' style={{width:'7rem', left:'58%', top:'3%'}} />
                        }
                        <br />
                        <br />
                        <div>
                            <button type="button" className="nes-btn is-primary" onClick={handleSubmit}>Registrarse</button>
                            {' '}
                            <button type="button" className="nes-btn is-primary" onClick={handlerrevercss}>Volver</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}