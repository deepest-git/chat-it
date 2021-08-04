import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component{

  state={userName:'',userEmail:'',pass:'',passView:'',bVal:'Login'};


  handleValue=(event)=>{
    if(event.target.placeholder=='Email')this.setState({userEmail:(event.target.value),pass:(this.state.pass)});
    else if(event.target.placeholder=='Password'){this.setState({userEmail:(this.state.userEmail),pass:(event.target.value)})}
    else if(event.target.placeholder=='Username'){this.setState({userName:event.target.value})}
  }
   
  passV=<React.Fragment><input type='text' placeholder='Password' onChange={this.handleValue}></input></React.Fragment>
  regV=<React.Fragment>
    <input type='text' placeholder='Password' onChange={this.handleValue}></input>
    <input type='text' placeholder='Username' onChange={this.handleValue}></input>
    </React.Fragment>

  getReqData=()=>{
    if(this.state.bVal=='Create & Login')return({userEmail:this.state.userEmail,pass:this.state.pass,userName:this.state.userName});
    else if(this.state.userEmail!=='' && this.state.pass!=='')return({do:'login',userEmail:this.state.userEmail,pass:this.state.pass});
    else return({userEmail:this.state.userEmail,pass:this.state.pass});
  }

  handleLogin=(event)=>{

    if(this.state.bVal=='Login') axios({
      method: 'post',
      url: 'https://chat-it-backend.herokuapp.com/api/user/check',
      data: this.getReqData(),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'Token',
        "Access-Control-Allow-Origin": "*",
    }
    }).then(res=>{
      console.log(res);
      if(res.data.status=='valid')this.setState({userEmail:this.state.userEmail,pass:this.state.pass,passView:this.passV});
      else if(res.data.status=='invalid')this.setState({userEmail:this.state.userEmail,pass:this.state.pass,passView:this.regV,bVal:'Create & Login'});
      else if(res.data.status=='success')this.props.cb(['done',this.state.userEmail,res.data.userName]);
      else this.setState({userEmail:this.state.userEmail,pass:this.state.pass,passView:<p>Invalid Password</p>});
    });

    else axios({
      method: 'post',
      url: 'https://chat-it-backend.herokuapp.com/api/user/',
      data: this.getReqData(),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'Token',
        "Access-Control-Allow-Origin": "*",
    }
    }).then(res=>{
      console.log(res);
      if(res.data.status=='valid')this.setState({userEmail:this.state.userEmail,pass:this.state.pass,passView:this.passV});
      else if(res.data.status=='invalid')this.setState({userEmail:this.state.userEmail,pass:this.state.pass,passView:this.regV,bVal:'Create & Login'});
      else if(res.data.status=='added')this.props.cb(['done',this.state.userEmail,res.data.userName]);
      else this.setState({userEmail:this.state.userEmail,pass:this.state.pass,passView:<p>Invalid Password</p>});
    });
  }

  render(){
    return (
    <div className="App" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <form style={{display:'flex',flexDirection:'column','width':'max-content',marginTop:'25px'}}>
      <input type='text' placeholder='Email' onChange={this.handleValue}></input>
      <div>{this.state.passView}</div>

      {/* <input type='text' placeholder='Password' onChange={this.handleValue}></input> */}
      {/* <input type='submit' value='Login' onClick={this.handleLogin}/> */}
      </form>
      <button onClick={this.handleLogin}>{this.state.bVal}</button>
    </div>
  );}
}

export default App;
