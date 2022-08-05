import './App.css';
import React from 'react';
import searchpkmn from './Component/escenarios/searchpkmn';
import walking from './Component/imgif/walking.gif';
import pokeballs from './Component/imgif/atrapar.gif';
import pelea from './Component/imgif/pelea.png';

function App() {

  const [pkmn, setPkmn] = React.useState('');
  const [pkmnData, setPkmnData] = React.useState(null);

  const funcsearchpkmn = () => {
      searchpkmn(pkmn).then(data => {
          setPkmnData(data);
      }).catch(err => {
          console.log(err);
      }
      );
  }
  return (
    <>
    <div class="nes-table-responsive">
      {/* api pokemon https://pokeapi.co/api/v2/pokemon/1?limit=150 */}
      {/* pokeballs*/}
      {/* https://i.pinimg.com/originals/27/ae/5f/27ae5f34f585523fc884c2d479731e16.gif */}
      <img src={pokeballs} alt="loading..." style={{width:'78rem'}} />
      {/* pelea */}
      <img src={pelea} alt="loading..." style={{width:'78rem'}} />
      {/* busqueda */}
      <img src={walking} alt="loading..." style={{width:'78rem'}} />
      <br /><br />
      <table class="nes-table is-bordered is-centered" style={{width:'117rem'}}>
        <tbody>
          <tr>
            <td>              
            <div style={{backgroundColor:'#212529', padding:'1rem 0', width:'15%'}}>
              <label>
                <input type="radio" className="nes-radio is-dark" name="answer-dark" />
                <span>ATRAPAR</span>
              </label>

              <label>
                <input type="radio" className="nes-radio is-dark" name="answer-dark" />
                <span>PELEAR</span>
              </label>
              
              <label>
                <input type="radio" className="nes-radio is-dark" name="answer-dark" />
                <span>ESCAPAR</span>
              </label>
              
              <label>
                <input type="radio" className="nes-radio is-dark" name="answer-dark" />
                <span>BOLSA</span>
              </label>
            </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="nes-table-responsive">
      <table className="nes-table is-bordered is-centered" style={{width:'117rem'}}>
        <tbody>
          <tr>
            <td>              
              <div className="nes-container is-rounded is-dark" style={{width:'99%'}}>
                <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
}

export default App;
