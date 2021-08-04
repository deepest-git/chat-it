import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Main from './main';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const io = require('socket.io-client');
const socket = io('https://chat-it-backend.herokuapp.com/');

function HandleView(){
var usrName='';

const loginScs=(cb)=>{
  if(cb[0]=='done'){
    usrName=cb[2];
    socket.emit('log',usrName);
    setView(<Main userName={usrName}/>)
  }
  
  socket.on('userLog',(data)=>{setView(<Main userName={cb[2]} userlog={data}/>)});
};

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
