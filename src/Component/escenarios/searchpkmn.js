export default function searchpkmn(pkmn) {
    return new Promise((resolve, reject) => {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + pkmn;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            }
            );
    }
    );
}