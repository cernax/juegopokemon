import React, { useState, useEffect } from "react";
import searchteampkmn from "./searchteampkmn";
import searchpkmn from "../escenarios/searchpkmn";

export default function Inicio(props){   
    const [Pkmnfirst, setPkmnfirst] = useState(false);
    const [strname, setstrname] = useState("");
    const [pkmnteam, setpkmnteam] = useState([]);
    const [imgpkmnfirst, setimgpkmnfirst] = useState([]);
    const [imgpkmnsecond, setimgpkmnsecond] = useState([]);
    const [imgpkmntreeth, setimgpkmntreeth] = useState([]);

    const firstpkmn = async () => {
        setPkmnfirst(true);
        searchpkmns();
    }

    const searchpkmns = async () => {
        searchpkmn(1).then(data => {          
            setimgpkmnfirst(data.sprites.front_default);
          }).catch(err => {
              console.log(err);
        });
        searchpkmn(4).then(data => {          
            setimgpkmnsecond(data.sprites.front_default);
          }).catch(err => {
              console.log(err);
        }); 
        searchpkmn(7).then(data => {          
            setimgpkmntreeth(data.sprites.front_default);
          }).catch(err => {
              console.log(err);
        }); 
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
            <section className="nes-container icon-list is-centered">                
                <img src={imgpkmnfirst} alt="pkmn" style={{width:'7rem', left:'58%', top:'3%'}} />
                <img src={imgpkmnsecond} alt="pkmn" style={{width:'7rem', left:'58%', top:'3%'}} />
                <img src={imgpkmntreeth} alt="pkmn" style={{width:'7rem', left:'58%', top:'3%'}} />
            </section>
            :
            <></>
        }
        <div className="nes-container with-title is-centered">
        <p className="title">{props.setname}</p>            
        <div className="nes-container is-rounded is-dark" style={{width:'98%'}}>
                        <p>Bienvenido, desea empezar a buscar pkmns?</p>
                    </div>
                    { pkmnteam.length > 0 ? 
                    <button className="nes-btn is-success" onClick={props.getboolBuscarpkmn} >Buscar</button>
                    : <button className="nes-btn is-primary" onClick={firstpkmn} >Elegir Inicial</button>
                    }                    
        </div>
        </>
    );    
}