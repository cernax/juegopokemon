export default function searchuser(username, password) {
    return new Promise((resolve, reject) => {
        debugger;
        let url = 'http://localhost:4000/api/getOne/';
        fetch(url + username + '/' + password)
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