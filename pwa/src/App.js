import logo from './logo.svg';
import md5 from 'md5'
import React, { useEffect, useState } from "react";



function App() {

const [supers, setSupers] = useState([])

useEffect(()=>{
    console.log(navigator.onLine)


    if(!navigator.onLine){
        if(localStorage.getItem("characters") === null) {
            setSupers({name:"Cargando...", description:"Cargando..."})
        } else {
            setSupers(localStorage.getItem("characters"));
        }
    } else {
      const ts = new Date().valueOf()
      const privateKey = '60cd48ac5a16e52d93358bef972a23b49f5670be'
      const publicKey = '1a41b76ad073cfe50f1d7e7b2b3d4c8f'

      const hash = md5(ts+privateKey+publicKey)
      const request = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`

       
      fetch(request).then(res=>res.json()).then(res=>{
            setSupers(res.data.results)
            localStorage.setItem("characters", res.value);
       })
    }
}, []);

  return (
  <div className="container">
      <table className="table">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Descripción</th>

    </tr>
  </thead>
  <tbody>
  {supers.map(s => {
     return (
     <tr>
       <td>{s.name}</td>
       <td>{s.description}</td>
    </tr>)
  })}
  </tbody>
  </table>
  </div>

  );

}

export default App;
