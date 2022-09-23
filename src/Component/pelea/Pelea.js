import React , {useEffect, useState} from 'react';
import './pelea.css';
import barenemig from '../imgif/blue_line.png';
import barmy from '../imgif/red_line.png';
import hp from '../imgif/hp.png';
import level from '../imgif/level.png';
import pelea from '../imgif/pelea.png';
import pokeball from '../imgif/pokeball.png';
import { motion } from "framer-motion";
import searchpkmn from "../escenarios/searchpkmn";
import curandopkmn from '../imgif/curandopkmn.gif';


export default function Pelea(props) {

    const [atrapar, setatrapar] = useState(false);
    const [pelear, setpelear] = useState(false);
    const [pkmnatacando, setpkmnatacando] = useState([]);
    const [curando, setcurando] = useState(false);

    const [pkmnenemigovida, setpkmnenemigovida] = useState(100);
    const [pkmnvida, setpkmnvida] = useState(100);
    const [checkataque, setcheckataque] = useState(false);
    /*pkmn enemigo*/
    const [pkmnenemigoimg, setpkmnenemigoimg] = useState("");
    const [pkmnenemigonombre, setpkmnenemigonombre] = useState("");

    /*pkmnmy*/
    const [pkmnmyid, setpkmnmyid] = useState(0);
    const [pkmnmyimg, setpkmnmyimg] = useState("");
    const [pkmnmynombre, setpkmnmynombre] = useState("");


    const getvida = async () => {

      let url = 'http://localhost:4000/api/entrenador/getOne/';
      const data = await fetch(url + props.settidentrenador);
      const result = await data.json();
      const teamid = result[0].team;
      
      for (let index = 0; index < teamid.length; index++) {        
        if(teamid[index].vida > 0){
          setpkmnvida(teamid[index].vida);
          break;
        }        
      }

    } 

    const atraparpkmn = () => {
      setatrapar(true);
      let pkmnene = document.getElementById("pkmnene"); 
      pkmnene.className = "slide-out-bck-center";  
      guarduarini();
      setTimeout(() => {
        props.getboolBuscarpkmn();
      }, 5100);
     
    }

    const guarduarini = async () => {
      fetch('http://localhost:4000/api/entrenador/update/' + props.settidentrenador ,{
          method: 'PATCH',
          body: JSON.stringify({id: props.setidpkmnene, vida:100}),
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
          
    }

    const updatevidapkmn = (identrenador, idpkmn, vidapkmn) => {
      fetch('http://localhost:4000/api/entrenador/update/' + identrenador + '/' + idpkmn + '/' + vidapkmn ,{
          method: 'PUT',
          headers:{
            "Accept": "*/*",
            'Content-Type': '*/*',
          },
          body: "",
      })
          .then(res => res.json())
          .then(data => {
              console.log(data);
          })
          .catch(err => {
              console.error(err);
          });
    }

    const pelearpkmn = () => {
      setpelear(true);
      const movepokmn = [];
      searchpkmn(pkmnmyid).then((resultpkmn) => {
        
        resultpkmn.moves.map( (pkmn) => {
          if(movepokmn.length < 4){
            movepokmn.push({
              name: pkmn.move.name
            });
          }
          else{
            setpkmnatacando(movepokmn);
            return;
          }
        } );
      });

    }

    const ataque = () => {
      let pkmnene = document.getElementById("pkmnene"); 
      pkmnene.className = "bounce-right";
      let vida = pkmnenemigovida - generadordedanio();
      setpkmnenemigovida(vida);
      setTimeout(() => {
        pkmnene.classList.remove("bounce-right");
      }, 1000);

      if(vida <= 0){
        pkmnene.className = "slide-out-bottom";
        setTimeout(() => {
          props.getboolBuscarpkmn();
        }, 1000);
      }
      setTimeout(() => {
        if(vida > 0){
        let pkmnmy = document.getElementById("pkmmy"); 
        pkmnmy.className = "bounce-right";
        let vidapkmnmy = pkmnvida - generadordedanio();
  
        setpkmnvida(vidapkmnmy);
        
        updatevidapkmn(props.settidentrenador, pkmnmyid, vidapkmnmy);
        
        setTimeout(() => {
          pkmnmy.classList.remove("bounce-right");
        }, 1000);

        if(vidapkmnmy <= 0){
          pkmnmy.className = "slide-out-bottom";
          setTimeout(() => {
            setpelear(false);
            pkmnene.classList.remove("slide-out-bottom");
            nextpkmn();            
            pkmnmy.className = "slide-in-left";
            //props.getboolBuscarpkmn();
          }, 1000);
        }
      }
      }, 1000);

      return false;
    }

    const generadordedanio = () => {
      return Math.floor(Math.random() * ((100 - 1 )+ 1)) + 1;
    }

    const getpkmnene = async () => {
      searchpkmn(props.setidpkmnene).then((resultpkmn) => {
        setpkmnenemigoimg(resultpkmn.sprites.front_default);
        setpkmnenemigonombre(resultpkmn.name);
      });
    }
    
    const getpkmy = async () => {
      let url = 'http://localhost:4000/api/entrenador/getOne/';
      const data = await fetch(url + props.settidentrenador);
      const result = await data.json();
      const teamid = result[0].team;
      let idpkn = 0;
      let boolequipo = false;
      for (let index = 0; index < teamid.length; index++) {        
        if(teamid[index].vida > 0){
          boolequipo = true;
          idpkn = teamid[index].id;
          setpkmnmyid(idpkn);
          break;
        }        
      }
      
      searchpkmn(idpkn).then((resultpkmn) => {
        setpkmnmyimg(resultpkmn.sprites.back_default);
        setpkmnmynombre(resultpkmn.name);
      });
      
      if(!boolequipo){
        document.getElementById('dialog-default').showModal();
      }
    }

    const nextpkmn = async () => {
      let url = 'http://localhost:4000/api/entrenador/getOne/';
      const data = await fetch(url + props.settidentrenador);
      const result = await data.json();
      const teamid = result[0].team;

      let boolequipo = false;

      for (let index = 0; index < teamid.length; index++) {        
        if(teamid[index].vida > 0){      
          boolequipo = true;
          setpkmnmyid(teamid[index].id);

          searchpkmn(teamid[index].id).then((resultpkmn) => {
            setpkmnmyimg(resultpkmn.sprites.back_default);
            setpkmnmynombre(resultpkmn.name);
          });
          break;
        }       
      }      
      getvida();

      if(!boolequipo){
        setpkmnmyimg("");
        setpkmnmynombre("");
        document.getElementById('dialog-default').showModal();
      }

    }

    const curarpkmn = () => {
      fetch('http://localhost:4000/api/entrenador/update/' + props.settidentrenador ,{
          method: 'PUT',
          headers:{
            "Accept": "*/*",
            'Content-Type': '*/*',
          },
          body: "",
      })
          .then(res => res.json())
          .then(data => {
              console.log(data);
          })
          .catch(err => {
              console.error(err);
          });

      setcurando(true);          
      setTimeout(() => {
        props.getboolBuscarpkmn();
      }, 7500);  
    }
    
    useEffect(() => {
      getpkmnene();
      getpkmy();
      getvida();
    }, []);

  return (
    <>    
        <div className="nes-container is-centered" style={{ width:'75%', margin:'1rem auto' }}>
            <div className="nes-table-responsive"  style={{ width:'100%', overflow:'hidden'}}>
              <>
              {/* pelea  style={{ width:'100%', height:'213px', backgroundImage:`url(${pelea})`, backgroundRepeat:'no-repeat', backgroundSize:'100%', bordercollapse: 'collapse'}} */}
              <div id='pkmnene' className='jello-vertical' style={{backgroundImage:`url(${pkmnenemigoimg})`, position: 'absolute', width: '100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'26%', backgroundPosition:'70% 3%'}}></div>          
              <div id='pkmmy' style={{backgroundImage:`url(${pkmnmyimg})`, position: 'absolute', width: '100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'29%', backgroundPosition:'10% 60%'}}></div>

              <div style={{backgroundImage:`url(${barenemig})`, position: 'absolute', width: '100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'29%', backgroundPosition:'10% 10%'}}></div>
              <div style={{backgroundImage:`url(${hp})`, position: 'absolute', width: '13%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'22%', backgroundPosition:'85% 13%'}}></div>
              <div style={{backgroundImage:`url(${level})`, position: 'absolute', width: '20%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'10%', backgroundPosition:'100% 6%'}}></div>
              <progress class="nes-progress is-primary" value={pkmnenemigovida} max="100" style={{ position:'absolute', width:'20%', height:'1rem', top:'15.5%', left:'15.5%' }}  ></progress>
              <div style={{position:'absolute', left:'68%', top:'51%'}}><p>{pkmnmynombre}</p></div>
              <div style={{position:'absolute', left:'80%', top:'56%'}}><p>{'5'}</p></div>

              <div style={{backgroundImage:`url(${barmy})`, position: 'absolute', width: '100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'29%', backgroundPosition:'85% 57%'}}></div>
              <div style={{backgroundImage:`url(${hp})`, position: 'absolute', width: '78%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'4%', backgroundPosition:'86% 60%'}}></div>
              <div style={{backgroundImage:`url(${level})`, position: 'absolute', width: '100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'2%', backgroundPosition:'74% 54%'}}></div>
              <progress class="nes-progress is-primary" value={pkmnvida} max="100" style={{ position:'absolute', width:'19%', height:'1rem', top:'61.5%', left:'71.5%' }}  ></progress>
              <div style={{position:'absolute', left:'12%', top:'5%'}}><p>{pkmnenemigonombre}</p></div> 
              <div style={{position:'absolute', left:'25%', top:'9.3%'}}><p>{'5'}</p></div>
              {/* level <div style={{backgroundImage:`url(${pelea})`, width: '100%', height: '100px', backgroundRepeat:'no-repeat', backgroundSize:'100%'}}></div> */}
              </>
              {/* atrapar */}
              { atrapar ?
                  <>
                  <div  className="pokeball" style={{position: 'absolute', left: '65%', top:'33%'}}>
                    <img src={pokeball} alt="loading..." style={{width:'2rem'}} />   

                    <div className="star star1">
                      <svg id="star1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.95 50.35">
                        <title>star</title>
                        <polygon className="cls-1" points="26.47 0 32.72 19.23 52.95 19.23 36.58 31.12 42.83 50.35 26.47 38.47 10.11 50.35 16.36 31.12 0 19.23 20.22 19.23 26.47 0"/>
                      </svg>
                    </div>

                    <div className="star star2">
                      <svg id="star2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.95 50.35">
                        <title>star</title>
                        <polygon className="cls-1" points="26.47 0 32.72 19.23 52.95 19.23 36.58 31.12 42.83 50.35 26.47 38.47 10.11 50.35 16.36 31.12 0 19.23 20.22 19.23 26.47 0"/>
                      </svg>
                    </div>

                    <div className="star star3">
                      <svg id="star3" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.95 50.35">
                        <title>star</title>
                        <polygon className="cls-1" points="26.47 0 32.72 19.23 52.95 19.23 36.58 31.12 42.83 50.35 26.47 38.47 10.11 50.35 16.36 31.12 0 19.23 20.22 19.23 26.47 0"/>
                      </svg>
                    </div>
                  </div>

                  </>
                  : <></>
              }

              <img src={pelea} alt="loading..." style={{width:'100%'}} id='imgpelea' />
              <table className="nes-table is-bordered is-centered" style={{width:'99%', textAlign:'start'}} border={0}>
                <tbody>
                  <tr>
                    <td style={{width:'65%', backgroundColor:'rgb(205, 92, 92)', borderRadius:'23px 1px 1px 23px'}}>                          
                        <div className="nes-container" style={{width:'100%', backgroundColor:'rgb(5, 171, 164)', borderRadius:'23px 1px 1px 23px'}}>
                          { !pelear ? 
                            <p>¿Que deberia hacer {pkmnmynombre}?</p> 
                            : 
                            <>                               
                              <div style={{width:'35rem'}}>
                              { pkmnatacando.map((item, index) => {
                                  return (                                                               
                                  <label style={{ width:'50%', textAlign:'left' }}>
                                    <input type="radio" className="nes-radio" name="answer-dark" onChange={ataque}  id={item.name} checked={checkataque} />
                                    <span>{item.name}</span>
                                  </label>
                                  )
                                })            
                              }
                              </div>
                            </>
                          }
                        </div>     
                    </td>
                    <td>              
                    <div style={{padding:'1rem 0', width:'17rem', margin:'auto'}}>
                      <label style={{ width:'50%', textAlign:'left' }}>
                        <input type="radio" className="nes-radio" name="answer-dark" onChange={pelearpkmn} />
                        <span>PELEAR</span>
                      </label>

                      <label style={{ width:'50%', textAlign:'left' }}>
                        <input type="radio" className="nes-radio" name="answer-dark" />
                        <span>BOLSA</span>
                      </label>
                      
                      <label style={{ width:'50%', textAlign:'left' }}>
                        <input type="radio" className="nes-radio" name="answer-dark" onChange={atraparpkmn}  />
                        <span>ATRAPAR</span>
                      </label>
                      
                      <label style={{ width:'50%', textAlign:'left' }}>
                        <input type="radio" className="nes-radio" name="answer-dark" onChange={() => props.getboolBuscarpkmn()} />
                        <span>CORRER</span>
                      </label>
                    </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> 
          
          <dialog class="nes-dialog" id="dialog-default">
              <form method="dialog">
                <h1 class="title">{ curando ? "Curando" : "Informacion" }</h1>                
                {
                  curando ?
                  
                  <img src={curandopkmn} alt="loading..." style={{width:'100%'}} />
                  
                  :
                  <>                  
                    <p>Has perdido te llevaremos a curar a tus pokemons, ¿Quieres ir?.</p>
                    <menu class="dialog-menu" style={{textAlign:'center'}}>
                      <button class="nes-btn">Cancelar</button>
                      <button class="nes-btn is-primary" onClick={curarpkmn} >Confirmar</button>
                    </menu>
                  </>
                }
              </form>
            </dialog>
    </>
  );
}