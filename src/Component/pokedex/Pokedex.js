import searchpkmn from '../escenarios/searchpkmn';
import React, { useState, useEffect } from "react";

export default function Pokedex(props){
    const [pkmnteam, setpkmnteam] = useState([]);
    const [pkmn, setpkmn] = useState(false);
    const [position, setposition] = useState(0);
    
    const [namepokemon, setnamepokemon] = useState("");
    const [imgpokemon, setimgpokemon] = useState("");
    const [idpkmn, setidpkmn] = useState(0);
     
    const [firstippkm, setfirstippkm] = useState("");
    const [secondippkm, setsecondippkm] = useState("");

    function getAssetTypeEn(type){
        switch(type){
            case 'normal':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/3/32/latest/20170114100442/Tipo_normal.gif';
            case 'fighting':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/b/b7/latest/20170114100336/Tipo_lucha.gif';
            case 'flying':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/e/e1/latest/20191118232224/Tipo_volador.gif';
            case 'poison':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/1/10/latest/20191118232220/Tipo_veneno.gif';
            case 'ground':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/1/1d/latest/20191118232216/Tipo_tierra.gif';
            case 'rock':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/e/e0/latest/20170114100446/Tipo_roca.gif';
            case 'bug':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/f/fe/latest/20191118232226/Tipo_bicho.gif';
            case 'ghost':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/4/47/latest/20170114100329/Tipo_fantasma.gif';
            case 'steel':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/d/d9/latest/20191118232245/Tipo_acero.gif';
            case 'fire':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/c/ce/latest/20170114100331/Tipo_fuego.gif';
            case 'water':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/9/94/latest/20191118232235/Tipo_agua.gif';
            case 'grass':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/d/d6/latest/20170114100444/Tipo_planta.gif';
            case 'electric':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/1/1b/latest/20170114100155/Tipo_el%C3%A9ctrico.gif';
            case 'psychic':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/1/15/latest/20170114100445/Tipo_ps%C3%ADquico.gif';
            case 'ice':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/4/40/latest/20170114100333/Tipo_hielo.gif';
            case 'dragon':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/0/01/latest/20170114100154/Tipo_drag%C3%B3n.gif';
            case 'dark':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/8/82/latest/20191118232327/Tipo_siniestro.gif';
            case 'fairy':
                return 'https://images.wikidexcdn.net/mwuploads/wikidex/b/bc/latest/20170114100332/Tipo_hada.gif';
            default:
                return 'https://cdn2.bulbagarden.net/upload/3/3c/UnknownIC_Big.png';
        }
    }

    const getpokemon = async (idpkmn) => {
        const pkmn = await fetch('https://pokeapi.co/api/v2/pokemon/' + idpkmn)
            .then(res => res.json())
            .then(data => {
                setidpkmn(data.id);
                setnamepokemon(data.name);
                setimgpokemon(data.sprites.front_default);
                if(data.types.length > 1)
                {
                    setfirstippkm(getAssetTypeEn(data.types[0].type.name));
                    setsecondippkm(getAssetTypeEn(data.types[1].type.name));
                }
                else{
                    setfirstippkm(getAssetTypeEn(data.types[0].type.name));
                    setsecondippkm(getAssetTypeEn("NN"));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    const funcsearchpkmn = async () => {
        let url = 'http://localhost:4000/api/entrenador/getOne/';
        const data = await fetch(url + props.settidentrenador);
        const result = await data.json();
        const teamid = result[0].team.sort((a, b) => a.id - b.id);

        let pkmnid = teamid[position].id;
        setpkmnteam(teamid);
        
        getpokemon(pkmnid);

    }

    const restpkm = () => {
        let pos = position;
        if (position == 0) {
            pos = pkmnteam.length - 1;
        }
        else{
            pos = pos  - 1;
        }
        let pkmnid = pkmnteam[pos].id;
        setposition(pos)
        
        getpokemon(pkmnid);
        setpkmn(true);
    };

    const sumpkm = () => {
        let pos = position;
        if (position == pkmnteam.length - 1) {
            pos = 0;
        }
        else{
            pos = pos + 1;
        }
        let pkmnid = pkmnteam[pos].id;
        setposition(pos)
        
        getpokemon(pkmnid);
        setpkmn(true);
    };

    useEffect(() => {
        funcsearchpkmn();
    } ,[pkmn]);

    return (
        <div className="nes-container is-centered" style={{ width:'60%', margin:'1rem auto' }}>
            <i class="nes-icon close is-large" style={{ position:"absolute", left:'90%', top:'1%' }} onClick={ () => {props.getestpokedex(false)} } ></i>
            <h1>Pokedex</h1>
            <img src='https://ih1.redbubble.net/image.733115337.2227/flat,1000x1000,075,f.jpg' alt="loading..." style={{width:'43rem'}} />  
            
            <img src={imgpokemon} alt={namepokemon} style={{width:'8rem', left:'21%', top:'43%', margin:'10px', position:'absolute' }} />
            <img src={firstippkm} style={{width: "8%", position:'absolute', top:'82.2%', left:'57%' }} alt={firstippkm} />
            <img src={secondippkm} style={{width: "8%", position:'absolute', top:'82.2%', left:'73%'}} alt={secondippkm} />
            <h1 style={{position:'absolute', top:'44%', left:'61%', fontSize:'100%', color:'white'}}>{namepokemon}</h1>
            <h1 style={{position:'absolute', top:'82%', left:'23%', fontSize:'100%', color:'white'}}>#{idpkmn}</h1>
            <a  style={{position:'absolute', top:'79%', left:'42%', fontSize:'100%', color:'white', width:'3%'}} onClick={() => {sumpkm();}} >+</a>
            <a  style={{position:'absolute', top:'79%', left:'36%', fontSize:'100%', color:'white', width:'3%'}} onClick={() => {restpkm();}} >-</a>
        </div>
    )
}