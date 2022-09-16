export default function Pokedex(props){
    return (
        <div className="nes-container is-centered" style={{ width:'60%', margin:'1rem auto' }}>
            <i class="nes-icon close is-large" style={{ position:"absolute", left:'90%', top:'1%' }} onClick={ () => {props.getestpokedex(false)} } ></i>
            <h1>Pokedex</h1>
            <img src='https://ih1.redbubble.net/image.733115337.2227/flat,1000x1000,075,f.jpg' alt="loading..." style={{width:'43rem'}} />  
        </div>
    )
}