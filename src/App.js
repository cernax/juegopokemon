import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './Component/home/home';
import Inicio from './Component/Inicio/Inicio';
import searchpkmn from './Component/escenarios/searchpkmn';
import walking from './Component/imgif/walking.gif';
import pokeballs from './Component/imgif/atrapar.gif';
import pelea from './Component/imgif/pelea.png';
import userEvent from '@testing-library/user-event';

function App() {
  const [strname, setstrname] = useState('');

  const [Pkmn, setPkmn] = useState(1);
  const [PkmnData, setPkmnData] = useState([]);
  const [Pkmnprin, setPkmnprin] = useState([]);

  {/* cambio de escenarios */}
  const [PkmnImg, setPkmnImg] = useState(false);  
  const [Pkmnbuscando, setPkmnbuscando] = useState(false);
  const [Pkmnatapear, setPkmnatapear] = useState(false);
  const [pkmnini, setpkmnini] = useState(0);
  const [Pkmnfirst, setPkmnfirst] = useState(false);
  const [islogin, setislogin] = useState(false);

  const funcsearchpkmn = async () => {
    await setPkmn(generaridpkmnrandom());

      searchpkmn(Pkmn).then(data => {          
          setPkmnData(data.sprites.front_default);
      }).catch(err => {
          console.log(err);
      }
      );
  }
  const generaridpkmnrandom = () => {
    return Math.floor(Math.random() * ((151 - 1 )+ 1)) + 1;
  }

  const mipkmn = () => {
    searchpkmn(pkmnini).then(data => {          
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
      setPkmnbuscando(false)}, 10000);
    await funcsearchpkmn();
    await mipkmn();
  }

  const firstpkmn = async () => {    
    setPkmnfirst(true);
  }

  return (
    <>
    { Pkmnatapear ? 
    <div className="nes-table-responsive">
      {/* api pokemon https://pokeapi.co/api/v2/pokemon/1?limit=150 */}
      {/* pokeballs*/}
      {/* https://i.pinimg.com/originals/27/ae/5f/27ae5f34f585523fc884c2d479731e16.gif */}
      <img src={pokeballs} alt="loading..." style={{width:'29rem'}} />
      {/* pelea */}
      <img src={pelea} alt="loading..." style={{width:'15rem'}} />
    </div> :
    <></>
    }
    {
      PkmnImg ? 
      <div className="nes-container is-centered" style={{ width:'42%', margin:'1rem', marginLeft:'auto', marginRight:'auto' }}>
        <div className="nes-table-responsive"  style={{ width:'100%', overflow:'hidden'}}>
          {/* pelea */}
          <img src={PkmnData} alt="pkmn" style={{width:'15rem', position: 'absolute', left:'60%', top:'17%'}} />
          <img src={Pkmnprin} alt="pkmn" style={{width:'22rem', position: 'absolute', right:'62%', top:'33.4%'}} />
          <img src={pelea} alt="loading..." style={{width:'100%'}} />
          <br />
          <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />
          <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />
          <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />
          <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />
          <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />
          <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />
          <br />
          <table className="nes-table is-bordered is-centered" style={{width:'99%'}}>
            <tbody>
              <tr>
                <td>              
                <div style={{padding:'1rem 0', width:'23rem', margin:'auto'}}>
                  <label>
                    <input type="radio" className="nes-radio" name="answer-dark" />
                    <span>ATRAPAR</span>
                  </label>

                  <label>
                    <input type="radio" className="nes-radio" name="answer-dark" />
                    <span>PELEAR</span>
                  </label>
                  
                  <label>
                    <input type="radio" className="nes-radio" name="answer-dark" />
                    <span>ESCAPAR</span>
                  </label>
                  
                  <label>
                    <input type="radio" className="nes-radio" name="answer-dark" />
                    <span>BOLSA</span>
                  </label>
                </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> :
      <></>
    }
    {
      Pkmnbuscando ?
      
      <div className="nes-table-responsive"  style={{ width:'43%', margin:'1rem', marginLeft:'auto', marginRight:'auto' }}>
        {/* busqueda */}
        <img src={walking} alt="loading..." style={{width:'100%'}} />
      </div>
      :
      <></>
    }
    <div className="nes-table-responsive">
     { islogin ? <>
        <Inicio 
          getboolBuscarpkmn={Buscarpkmn} 
          setname={strname}
          getidpkmnfirst={ async (idfirst) =>  {await setpkmnini(idfirst)} }
          /></>
      : 
      <><Home 
        getuserbool={(value) => {setislogin(value)}} 
        getnameusuario={(value) => {setstrname(value)}}
      /></> }
    </div>
    </>
  );
}

export default App;
