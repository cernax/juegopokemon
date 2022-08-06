import React, { useState } from "react";

export default function Inicio(props){   
    const [Pkmnfirst, setPkmnfirst] = useState(false);
    const [strname, setstrname] = useState("Andres");

    const firstpkmn = async () => {
        setPkmnfirst(true);
        props.getboolfirstpkmn(Pkmnfirst);
    }

    return (
        <>
        
        <section className="icon-list">
            <i className="nes-bulbasaur"></i>
            <i className="nes-charmander"></i>
            <i className="nes-squirtle"></i>
        </section>
        <div class="nes-container with-title is-centered">
        <p class="title">{props.setname}</p>
            
        <div className="nes-container is-rounded is-dark" style={{width:'99%'}}>
                        <p>Bienvenido, desea empezar a buscar pkmns?</p>
                    </div>
                    
                    <button className="nes-btn is-primary" onClick={firstpkmn} >Elegir Inicial</button>
                    <button className="nes-btn is-success" onClick={props.getboolBuscarpkmn} >Buscar</button>
                    
        </div>
        </>
    );    
}