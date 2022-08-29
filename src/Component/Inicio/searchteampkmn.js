export default function searchteampkmn(idEntrenador) {
    return new Promise((resolve, reject) => {
        let url = 'http://localhost:4000/api/entrenador/getOne/';
        fetch(url + idEntrenador)
        .then(res => res.json())
        .then(data => {
            resolve(data);
        })
        .catch(err =>
            reject(err)
        );

      }
    );
}