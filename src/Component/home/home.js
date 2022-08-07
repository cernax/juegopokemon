import React , {useState} from 'react';
import buscarusuario from '../home/buscarusuario';

export default function Home(props) {
    const [strname, setstrname] = useState('');
    const [strpass, setstrpass] = useState('');

    const handleSubmit = async (e) => {
        await buscarusuario(strname, strpass).then(data => {
            if(data.length > 0) {
                props.getuserbool(true);
            }
            else{
                fetch('http://localhost:4000/api/post',{
                    method: 'POST',
                    body: JSON.stringify({
                        id:2,
                        nombre: strname,
                        clave: strpass
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

  return (
    <div>
        <br></br>
        <div className="nes-container with-title is-centered">
            <p className="title">Ingreso de Entrenador</p>
            <div className="nes-field">
                <label>Tu Nombre</label>
                <input type="text" id="name_field" className="nes-input" onChange={ (e) => {setstrname(e.target.value)} } />
            </div>
            <div className="nes-field">
                <label>Tu Clave</label>
                <input type="text" id="name_field" className="nes-input" onChange={ (e) => setstrpass(e.target.value) } />
            </div>
                <label>¿eres chico o chica?</label>
            <label>
            <input type="radio" className="nes-radio" name="answer" />
            <span>Chico</span>
            </label>

            <label>
            <input type="radio" className="nes-radio" name="answer" />
            <span>Chica</span>
            </label>
            <br />
            <button type="button" className="nes-btn is-primary" onClick={handleSubmit}>Ingresar</button>
        </div>
    </div>
  );
}