import './App.css';
import React, { useState } from 'react';
import Home from './Component/home/home';
import Inicio from './Component/Inicio/Inicio';
import searchpkmn from './Component/escenarios/searchpkmn';
import walking from './Component/imgif/walking.gif';
import pokeballs from './Component/imgif/atrapar.gif';
import pelea from './Component/imgif/pelea.png';
import boy from './Component/imgif/boy.gif';
import girl from './Component/imgif/girl.gif';

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
      setPkmnbuscando(false)}, 10000); //10000
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
          <div className="nes-container is-centered" style={{ width:'42%', margin:'1rem auto' }}>
            <div className="nes-table-responsive"  style={{ width:'100%', overflow:'hidden'}}>
              {/* pelea  style={{ width:'100%', height:'213px', backgroundImage:`url(${pelea})`, backgroundRepeat:'no-repeat', backgroundSize:'100%', bordercollapse: 'collapse'}} */}
              <div style={{backgroundImage:`url(${PkmnData})`, position: 'absolute', width: '100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'26%', backgroundPosition:'70% 3%'}}></div>          
              <div style={{backgroundImage:`url(${Pkmnprin})`, position: 'absolute', width: '100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'29%', backgroundPosition:'10% 44%'}}></div>
              {/* <div style={{backgroundImage:`url(${pelea})`, width: '100%', height: '100px', backgroundRepeat:'no-repeat', backgroundSize:'100%'}}></div> */}
              
              <img src={pelea} alt="loading..." style={{width:'100%'}} id='imgpelea' />
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
          <div className="nes-table-responsive"  style={{ width:'42%', margin:'1rem auto'}}>
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
            <Home getuserbool={(value) => {setislogin(value)}} getnameusuario={(value) => {setstrname(value)}} getidentrenador={(value) => {setstridentrenador(value)}}
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
