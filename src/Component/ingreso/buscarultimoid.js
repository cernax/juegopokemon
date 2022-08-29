export default function searchlasid() {
    return new Promise((resolve, reject) => {
        let url = 'http://localhost:4000/api/entrenador/getLast';
        fetch(url)
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