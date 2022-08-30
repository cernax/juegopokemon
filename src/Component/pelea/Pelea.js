import React , {useEffect, useState} from 'react';
import './pelea.css';
import barenemig from '../imgif/blue_line.png';
import barmy from '../imgif/red_line.png';
import hp from '../imgif/hp.png';
import level from '../imgif/level.png';
import pelea from '../imgif/pelea.png';
import searchpkmn from '../escenarios/searchpkmn';

export default function Pelea(props) {


  return (
    <>    
        <div className="nes-container is-centered" style={{ width:'60%', margin:'1rem auto' }}>
            <div className="nes-table-responsive"  style={{ width:'100%', overflow:'hidden'}}>
              {/* pelea  style={{ width:'100%', height:'213px', backgroundImage:`url(${pelea})`, backgroundRepeat:'no-repeat', backgroundSize:'100%', bordercollapse: 'collapse'}} */}
              <div className='jello-vertical' style={{backgroundImage:`url(${props.setPkmnData})`, position: 'absolute', width: '100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'26%', backgroundPosition:'70% 3%'}}></div>          
              <div style={{backgroundImage:`url(${props.setPkmnprin})`, position: 'absolute', width: '100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'29%', backgroundPosition:'10% 60%'}}></div>

              <div style={{backgroundImage:`url(${barenemig})`, position: 'absolute', width: '100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'29%', backgroundPosition:'10% 10%'}}></div>
              <div style={{backgroundImage:`url(${hp})`, position: 'absolute', width: '13%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'22%', backgroundPosition:'85% 13%'}}></div>
              <div style={{backgroundImage:`url(${level})`, position: 'absolute', width: '20%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'10%', backgroundPosition:'100% 6%'}}></div>
              <progress class="nes-progress is-primary" value="100" max="100" style={{ position:'absolute', width:'20%', height:'1rem', top:'15.5%', left:'15.5%' }}  ></progress>

              <div style={{backgroundImage:`url(${barmy})`, position: 'absolute', width: '100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'29%', backgroundPosition:'85% 50%'}}></div>
              <div style={{backgroundImage:`url(${hp})`, position: 'absolute', width: '78%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'4%', backgroundPosition:'86% 53%'}}></div>
              <div style={{backgroundImage:`url(${level})`, position: 'absolute', width: '100%', height: '100%', backgroundRepeat:'no-repeat', backgroundSize:'2%', backgroundPosition:'74% 47%'}}></div>
              <progress class="nes-progress is-primary" value="100" max="100" style={{ position:'absolute', width:'20%', height:'1rem', top:'54.5%', left:'71.5%' }}  ></progress>

              {/* level <div style={{backgroundImage:`url(${pelea})`, width: '100%', height: '100px', backgroundRepeat:'no-repeat', backgroundSize:'100%'}}></div> */}
              
              <img src={pelea} alt="loading..." style={{width:'100%'}} id='imgpelea' />
              <table className="nes-table is-bordered is-centered" style={{width:'99%', textAlign:'start'}} border={0}>
                <tbody>
                  <tr>
                    <td style={{width:'65%', backgroundColor:'rgb(205, 92, 92)', borderRadius:'23px 1px 1px 23px'}}>                          
                        <div className="nes-container" style={{width:'100%', backgroundColor:'rgb(5, 171, 164)', borderRadius:'23px 1px 1px 23px'}}>
                          <p>¿Que deberia hacer charmander?</p>
                        </div>     
                    </td>
                    <td>              
                    <div style={{padding:'1rem 0', width:'16rem', margin:'auto'}}>
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
          </div> 
    </>
  );
}