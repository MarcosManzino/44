const dir = window.location.href;
const paramsString = dir.split("?")[1];
const paramsArray = paramsString.split("&");
const params = {};
paramsArray.forEach(param => {
    const [key, value] = param.split("=");
    params[key] = value;
    });

let token = params.token;
document.getElementById('token').value = token



// async function putPass() {
//     const dir = window.location.href;
//     const paramsString = dir.split("?")[1];
//     const paramsArray = paramsString.split("&");
//     const params = {};
//     paramsArray.forEach(param => {
//         const [key, value] = param.split("=");
//         params[key] = value;
//         });

//     let token = params.token;
//     let email = document.getElementById("email").value
//     let password = parseFloat(document.getElementById("password").value)
//     let data = {
//         email:email,
//         password:password.toString(),
//         token: token
//     }
//     function location (){
//         window.location.assign("http://localhost:8080/")
//     }
   
//     let url = "http://localhost:8080/api/email/reset-password"

//     let options = {
//         body: JSON.stringify(data),
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json'},
//     }

//     fetch(url, options)
//         .then((response)=> response.json())
//         .then(()=>{
//             window.location.assign("http://localhost:8080/api/email/reset-form")
//         })
//         .catch(err => {
//             console.error(err);
//             alert("Error al Modificar")
//         })      
// }
