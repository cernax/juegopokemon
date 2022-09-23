import './App.css';
import React, { useState } from 'react';
import Inicio from './Component/Inicio/Inicio';
import searchpkmn from './Component/escenarios/searchpkmn';
import walking from './Component/imgif/walking.gif';
import boy from './Component/imgif/boy.gif';
import girl from './Component/imgif/girl.gif';
import pokeball from './Component/imgif/pokeball.png';
import Ingreso from './Component/ingreso/ingreso';
import Pelea from './Component/pelea/Pelea';
import Pokedex from './Component/pokedex/Pokedex'
import Equipo from './Component/team/Equipo'

function App() {
  const [strname, setstrname] = useState('');
  const [stridentrenador, setstridentrenador] = useState(0);
  const [intsexo, setintsexo] = useState(0);

  const [PkmnData, setPkmnData] = useState([]);
  const [pkmnidene, setpkmnidene] = useState(0);
  const [pkmnidmy, setpkmnidmy] = useState(0);
  const [pkmndataname, setpkmndataname] = useState('');
  const [Pkmnprin, setPkmnprin] = useState([]);
  const [pkmnprinname, setpkmnprinname] = useState('');

  {/* cambio de escenarios */}
  const [PkmnImg, setPkmnImg] = useState(false);  
  const [seccionini, setseccionini] = useState('inline');
  const [Pkmnbuscando, setPkmnbuscando] = useState(false);
  const [Pkmnatapear, setPkmnatapear] = useState(false);
  const [islogin, setislogin] = useState(false);
  const [pokedex, setpokedex] = useState(false);
  const [team, setteam] = useState(false);

  const funcsearchpkmn = async () => {
    let random = await generaridpkmnrandom();
    setpkmnidene(random);
      searchpkmn(random).then(data => {          
          setPkmnData(data.sprites.front_default);
          setpkmndataname(data.name);
      }).catch(err => {
          console.log(err);
      }
      );
  }
  const generaridpkmnrandom = async () => {
    return await Math.floor(Math.random() * ((151 - 1 )+ 1)) + 1;
  }
  const mipkmn = async (inicial) => {
    setpkmnidmy(inicial);
    await searchpkmn(inicial).then(data => {          
      setPkmnprin(data.sprites.back_default);     
      setpkmnprinname(data.name);
    }).catch(err => {
        console.log(err);
    }
    );
  }
  const Buscarpkmn = async () => {    
    
    setPkmnImg(false); 
    setPkmnbuscando(true);
    setseccionini('none');
    setTimeout(() => {
      setPkmnImg(true); 
      setPkmnbuscando(false)}, 1000); //10000
    await funcsearchpkmn();
  }

  const boolequipo = () => {
    setteam(true);
    setpokedex(false);
    setPkmnImg(false);
    setPkmnbuscando(false);
    setseccionini('none');
  }

  const boolpokedex = () => {
    setpokedex(true);
    setteam(false);
    setPkmnImg(false);
    setPkmnbuscando(false);
    setseccionini('none');
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
                <img src={pokeball} alt="loading..." style={{width:'2rem'}} onClick={boolequipo} />      
                <img src='https://ih1.redbubble.net/image.733115337.2227/flat,1000x1000,075,f.jpg' alt="loading..." style={{width:'3rem'}} onClick={boolpokedex} />                             
              </div>
            </div>
        </td>:
            <></>
        
        }
         
          {
            pokedex ? <Pokedex getestpokedex={ (value) => {setpokedex(value); setseccionini('inline');  } } settidentrenador={stridentrenador}/>
            :
            
            <td style={{width:'80%'}}>   
            { team ? <Equipo getestpokedex={  (value) => {setteam(value); setseccionini('inline');  }}  settidentrenador={stridentrenador} /> : <></> }      
            {
              PkmnImg ? 
              <Pelea setPkmnData={PkmnData} setPkmnprin={Pkmnprin} setnamepkmndata={pkmndataname} setnameprinname={pkmnprinname} getboolBuscarpkmn={Buscarpkmn} settidentrenador={stridentrenador} setidpkmnene={pkmnidene}  setidpkmnmy={pkmnidmy}  />:
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
                <div style={ { display:seccionini }  } >
                  <Inicio getboolBuscarpkmn={Buscarpkmn} setname={strname} getidpkmnfirst={ (idfirst) =>  mipkmn(idfirst)} settidentrenador={stridentrenador}/>
                </div>
              : 
              <div  >
                <Ingreso getuserbool={(value) => {setislogin(value)}} getnameusuario={(value) => {setstrname(value)}} getidentrenador={(value) => {setstridentrenador(value)}}
                getsexo={(value) => {setintsexo(value)}} />
              </div> 
              }
            </td>
          } 
        
      </tr>
    </table>
    </>
  );
}

export default App;
