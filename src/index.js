import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Main from './main';
import axios from 'axios';

function HandleView(){

const loginScs=(cb)=>{if(cb[0]=='done'){
  axios({
    method: 'post',
    url: 'https://chat-it-backend.herokuapp.com/api/user/log',
    data: {userEmail:cb[1]},
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'Token',
      "Access-Control-Allow-Origin": "*",
  }
  }).then(res=>console.log(res));
  
}setView(<Main userName={cb[2]}/>)};

const[view,setView]=React.useState(<App cb={loginScs}/>);

return(
  view
)
}

ReactDOM.render(
  <React.StrictMode>
    <HandleView/>
  </React.StrictMode>,
  document.getElementById('root')
);
