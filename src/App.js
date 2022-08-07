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
  const [strpass, setstrpass] = useState('');

  const [Pkmn, setPkmn] = useState(Math.floor(Math.random() * (151 - 1 + 1)) + 151);
  const [PkmnData, setPkmnData] = useState([]);
  const [Pkmnprin, setPkmnprin] = useState([]);

  {/* cambio de escenarios */}
  const [PkmnImg, setPkmnImg] = useState(false);  
  const [Pkmnbuscando, setPkmnbuscando] = useState(false);
  const [Pkmnatapear, setPkmnatapear] = useState(false);
  const [Pkmnfirst, setPkmnfirst] = useState(false);
  const [islogin, setislogin] = useState(false);

  const funcsearchpkmn = () => {
      searchpkmn(Pkmn).then(data => {          
          setPkmnData(data.sprites.front_default);
      }).catch(err => {
          console.log(err);
      }
      );
  }

  const mipkmn = () => {
    searchpkmn(4).then(data => {          
      setPkmnprin(data.sprites.back_default);
    }).catch(err => {
        console.log(err);
    }
    );
}

  const Buscarpkmn = async () => {    
    setPkmnbuscando(true);
    setTimeout(() => {
      setPkmnImg(true); 
      setPkmnbuscando(false)}, 10000);
    funcsearchpkmn();
    mipkmn();
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
      <div className="nes-table-responsive">
        {/* pelea */}
        <img src={PkmnData} alt="pkmn" style={{width:'7rem', position: 'absolute', left:'58%', top:'3%'}} />
        <img src={Pkmnprin} alt="pkmn" style={{width:'14rem', position: 'absolute', right:'50%', top:'4.9%'}} />
        <img src={pelea} alt="loading..." style={{width:'28.7rem'}} />
        <br />
        <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />
        <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />
        <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />
        <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />
        <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />
        <img src="https://w7.pngwing.com/pngs/57/434/png-transparent-8-bit-pokemon-pixel-art-poke-ball-others-rectangle-bitcoin-pokemon-thumbnail.png" alt="loading..." style={{width:'2rem'}} />
        <br />
        <table className="nes-table is-bordered is-centered" style={{width:'28rem'}}>
          <tbody>
            <tr>
              <td>              
              <div style={{padding:'1rem 0', width:'70%'}}>
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
      </div> :
      <></>
    }
    {
      Pkmnbuscando ?
      
      <div className="nes-table-responsive">
        {/* busqueda */}
        <img src={walking} alt="loading..." style={{width:'28.7rem'}} />
      </div>
      :
      <></>
    }
    <div className="nes-table-responsive">
     { islogin ? <>
        <Inicio 
          getboolBuscarpkmn={Buscarpkmn} 
          setname={strname}
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
