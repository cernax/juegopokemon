import React, { useState, useEffect } from "react";
import searchteampkmn from "./searchteampkmn";
import searchpkmn from "../escenarios/searchpkmn";

const pkmns = [
    { id: 1, value: "bulbasaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", color:'green' },
    { id: 4, value: "charmander", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", color:'red' },
    { id: 7, value: "squirtle", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", color:'blue' }
    ];

export default function Inicio(props){   
    const [Pkmnfirst, setPkmnfirst] = useState(false);
    const [strname, setstrname] = useState("");
    const [pkmnteam, setpkmnteam] = useState([]);
    
    const firstpkmn = () => {
        setPkmnfirst(true);
    }

    const guarduarini = async (e, pkmnid, pkmnname, pkmnimg) => {
        fetch('http://localhost:4000/api/entrenador/update/' + props.settidentrenador ,{
            method: 'PATCH',
            body: JSON.stringify({
                team: [{
                    id: pkmnid
                }]
            }),
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPkmnfirst(false);
                props.getboolBuscarpkmn();
                props.getidpkmnfirst(pkmnid);
                funcsearchpkmn();
            })
            .catch(err => {
                console.error(err);
            });

        e.preventDefault();
    }

    const funcsearchpkmn = async () => {
        await searchteampkmn(props.settidentrenador).then(data => {            
            setpkmnteam(data[0].team);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        funcsearchpkmn();
    } ,[]);

    return (
        <>
        { Pkmnfirst ?   
            <>    
                <section className="nes-container icon-list is-centered" style={{ width:'42%', margin:'1rem', marginLeft:'auto', marginRight:'auto' }}>                
                {
                    pkmns.map((pkmn) => {
                        return (
                            <>
                                <img onClick={ (event) => {guarduarini(event, pkmn.id, pkmn.value, pkmn.img);}}  src={pkmn.img} alt={pkmn.id} style={{width:'7rem', left:'58%', top:'3%', margin:'10px', borderStyle:'solid', borderColor:pkmn.color }} />
                            </>
                        );
                    })    
                }
                </section>          
            </>
            :
            <></>
        }
        <div className="nes-container with-title is-centered" style={{ width:'60%', margin:'1rem auto'}}>                     
            <div className="nes-container is-rounded is-dark" style={{width:'98%'}}>
                <p>Bienvenido, desea empezar a buscar pkmns?</p>
            </div>
            { pkmnteam.length > 0 ? 
                <button className="nes-btn is-success" onClick={ () => { props.getidpkmnfirst(pkmnteam[0].id); props.getboolBuscarpkmn(); }} >Buscar</button>
                : <button className="nes-btn is-primary" onClick={() => setPkmnfirst(true)} >Elegir Inicial</button>
            }             
        </div>
        </>
    );    
}