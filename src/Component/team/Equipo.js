import searchteampkmn from "../Inicio/searchteampkmn";
import searchpkmn from '../escenarios/searchpkmn';
import React, { useState, useEffect } from "react";

const pkmns = [];

export default function Equipo(props){
    
    const [pkmnteam, setpkmnteam] = useState([]);
    const [pkmn, setpkmn] = useState(false);
    const [pkmnvida, setpkmnvida] = useState(100);


    const funcsearchpkmn = async () => {

        let url = 'http://localhost:4000/api/entrenador/getOne/';
        const data = await fetch(url + props.settidentrenador);
        const result = await data.json();
        const teamid = result[0].team;
        let countequipopkmn = teamid.length > 6 ? 6 : teamid.length;


        const pkmonarr = [];
        teamid.map((pkmn) => {
            searchpkmn(pkmn.id).then((resultpkmn) => {    
                           
                if(pkmonarr.length < 6){
                    pkmonarr.push({
                        name: resultpkmn.name,
                        img: resultpkmn.sprites.front_default,
                        vida: pkmn.vida
                    });
                }
                debugger;
                if (pkmonarr.length === countequipopkmn) {
                    setpkmnteam(pkmonarr);
                    setpkmn(true);
                  return;
                }
            });
        });

        //setpkmnteam(pkmns);
    }

    useEffect(() => {
        funcsearchpkmn();
    } ,[pkmn]);

    return (
        <div className="nes-container is-centered" style={{ width:'60%', margin:'1rem auto', height:'75%' }}>
            <i class="nes-icon close is-large" style={{ position:"absolute", left:'90%', top:'1%' }} onClick={ () => {props.getestpokedex(false)} } ></i>
            <h1>Equipo</h1>
            { pkmnteam.map((pkmn, index) => {
                return (
                <div class="nes-container is-rounded" style={{ width:'30%', float:'left', margin:'10px 10px 0 0' }}>
                    <div>
                        <p>{pkmn.name}</p>
                        <img src={pkmn.img} alt={pkmn.name} style={{width:'7rem', left:'58%', top:'3%', margin:'10px', borderStyle:'solid', borderColor:pkmn.color }} />
                        <progress class="nes-progress is-primary" value={pkmn.vida} max="100" style={{ width:'70%', height:'1rem', top:'15.5%', left:'15.5%' }}  ></progress>              
                    </div>
                          
                </div>)
            }) 
            }
        </div>
    )
}