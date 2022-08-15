import React, { useState, useEffect } from "react";
import searchteampkmn from "./searchteampkmn";
import searchpkmn from "../escenarios/searchpkmn";

const pkmns = [
    { id: 1, value: "bulbasaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
    { id: 2, value: "charmander", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" },
    { id: 3, value: "squirtle", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" }
    ];

export default function Inicio(props){   
    const [Pkmnfirst, setPkmnfirst] = useState(false);
    const [strname, setstrname] = useState("");
    const [pkmnteam, setpkmnteam] = useState([]);

    const firstpkmn = () => {
        setPkmnfirst(true);
    }

    const funcsearchpkmn = () => {
        searchteampkmn(strname).then(data => {
            setpkmnteam(data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        funcsearchpkmn();
    } ,[strname]);

    return (
        <>
        { Pkmnfirst ?   
            <>    
                <section className="nes-container icon-list is-centered">                
                {
                    pkmns.map((pkmn) => {
                        return (
                            <>
                                <img src={pkmn.img} alt={pkmn.id} style={{width:'7rem', left:'58%', top:'3%'}} />
                            </>
                        );
                    })    
                }
                </section>          
            </>
            :
            <></>
        }
        <div className="nes-container with-title is-centered" style={{ width:'42%', margin:'1rem', marginLeft:'auto', marginRight:'auto' }}>
        <p className="title">{props.setname}</p>            
        <div className="nes-container is-rounded is-dark" style={{width:'98%'}}>
                        <p>Bienvenido, desea empezar a buscar pkmns?</p>
                    </div>
                    { pkmnteam.length > 0 ? 
                    <button className="nes-btn is-success" onClick={ () => { props.getidpkmnfirst(pkmnteam[0].idpkmn); props.getboolBuscarpkmn(); }} >Buscar</button>
                    : <button className="nes-btn is-primary" onClick={() => setPkmnfirst(true)} >Elegir Inicial</button>
                    }             
        </div>
        </>
    );    
}