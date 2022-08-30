import './App.css';
import React, { useState } from 'react';
import Inicio from './Component/Inicio/Inicio';
import searchpkmn from './Component/escenarios/searchpkmn';
import walking from './Component/imgif/walking.gif';
import pokeballs from './Component/imgif/atrapar.gif';
import boy from './Component/imgif/boy.gif';
import girl from './Component/imgif/girl.gif';
import Ingreso from './Component/ingreso/ingreso';
import Pelea from './Component/pelea/Pelea';

function App() {
  const [strname, setstrname] = useState('');
  const [stridentrenador, setstridentrenador] = useState(0);
  const [intsexo, setintsexo] = useState(0);

  const [PkmnData, setPkmnData] = useState([]);
  const [Pkmnprin, setPkmnprin] = useState([]);

  {/* cambio de escenarios */}
  const [PkmnImg, setPkmnImg] = useState(false);  
  const [Pkmnbuscando, setPkmnbuscando] = useState(false);
  const [Pkmnatapear, setPkmnatapear] = useState(false);
  const [islogin, setislogin] = useState(false);

  const funcsearchpkmn = async () => {
    let random = await generaridpkmnrandom();

      searchpkmn(random).then(data => {          
          setPkmnData(data.sprites.front_default);
      }).catch(err => {
          console.log(err);
      }
      );
  }
  const generaridpkmnrandom = async () => {
    return await Math.floor(Math.random() * ((151 - 1 )+ 1)) + 1;
  }
  const mipkmn = async (inicial) => {
    await searchpkmn(inicial).then(data => {          
      setPkmnprin(data.sprites.back_default);
    }).catch(err => {
        console.log(err);
    }
    );
  }
  const Buscarpkmn = async () => {    
    
    setPkmnImg(false); 
    setPkmnbuscando(true);
    setTimeout(() => {
      setPkmnImg(true); 
      setPkmnbuscando(false)}, 1000); //10000
    await funcsearchpkmn();
  }

  return (
    <>
    <table border={0} style={{width:'100%', height:'52rem'}}>
      <tr>
      {
      islogin ?  
        <td style={{width:'20%'}}>          
          
            <div className="nes-container with-title is-centered" style={{width:'100%'}}>     
              <p className="title">{strname}</p>          
              <img src={intsexo == 0 ? boy: girl} alt='person' />
              <div>
                <br />
                <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />                                
              </div>
            </div>
        </td>:
            <></>
        
        }
        <td style={{width:'80%'}}>           
        {
          PkmnImg ? 
          <Pelea setPkmnData={PkmnData} setPkmnprin={Pkmnprin} />:
          <></>
        }           
        {
          Pkmnbuscando ?      
          <div className="nes-table-responsive"  style={{ width:'60%', margin:'1rem auto'}}>
            {/* busqueda */}
            <img src={walking} alt="loading..." style={{width:'100%'}} />
          </div>
          :
          <></>
        }        
        { islogin ? 
            <div >
              <Inicio getboolBuscarpkmn={Buscarpkmn} setname={strname} getidpkmnfirst={ (idfirst) =>  mipkmn(idfirst)} settidentrenador={stridentrenador}/>
            </div>
          : 
          <div  >
            <Ingreso getuserbool={(value) => {setislogin(value)}} getnameusuario={(value) => {setstrname(value)}} getidentrenador={(value) => {setstridentrenador(value)}}
            getsexo={(value) => {setintsexo(value)}} />
          </div> 
          }
        </td>
      </tr>
    </table>
    </>
  );
}

export default App;
