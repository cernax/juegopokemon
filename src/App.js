import './App.css';

function App() {
  return (
    <>
    <div class="nes-table-responsive">
      {/* api pokemon https://pokeapi.co/api/v2/pokemon/1?limit=150 */}
      {/* pokeballs*/}
      {/* https://i.pinimg.com/originals/27/ae/5f/27ae5f34f585523fc884c2d479731e16.gif */}
      <img src={'https://cdn.streamloots.com/uploads/5eb3db772a3fcd0035f7ff40/10172dc2-f05e-4804-948f-94ec8a1747ce.gif'} alt="loading..." style={{width:'78rem'}} />
      {/* pelea */}
      <img src={'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/26e9b446-eda5-41f1-9838-b06a36fee8f0/d4rbxni-d2515ef4-2f32-499e-af87-92c2040af945.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI2ZTliNDQ2LWVkYTUtNDFmMS05ODM4LWIwNmEzNmZlZThmMFwvZDRyYnhuaS1kMjUxNWVmNC0yZjMyLTQ5OWUtYWY4Ny05MmMyMDQwYWY5NDUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gmNK4GLZ40yH_0bn4MmUuDMYpsYQ5JkCNQWiZ_nZgYI'} alt="loading..." style={{width:'78rem'}} />
      {/* busqueda */}
      <img src={'https://i.imgur.com/0QvfQHI.gif'} alt="loading..." style={{width:'78rem'}} />
      <br /><br />
      <table class="nes-table is-bordered is-centered" style={{width:'117rem'}}>
        <tbody>
          <tr>
            <td>              
            <div style={{backgroundColor:'#212529', padding:'1rem 0'}}>
              <label>
                <input type="radio" className="nes-radio is-dark" name="answer-dark" checked />
                <span>ATRAPAR</span>
              </label>

              <label>
                <input type="radio" className="nes-radio is-dark" name="answer-dark" />
                <span>ESCAPAR</span>
              </label>
              
              <label>
                <input type="radio" className="nes-radio is-dark" name="answer-dark" />
                <span>ATRAPAR</span>
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
