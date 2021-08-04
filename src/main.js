import React from 'react';
import axios from 'axios';
import Chat from './chat';
const io = require('socket.io-client');
const socket = io('http://localhost:8082/');


class main extends React.Component{

    constructor(props){
        super(props)
    }


    showChats=()=>{
        console.log(this.props.userName);
        socket.emit('rooms',{to:this.props.userName},(data)=>{
            console.log(data);
        });
    }

    componentWillUpdate(nprops,nstate){
        if(this.props!=nprops)this.getUserList()
    }

    getUserList=()=>{
        axios.get('http://localhost:8082/api/user')
        .then(res=>{
            let list=[];
            if(this.props.userlog!=undefined){
                res.data.forEach(ele => {
                    if(this.props.userlog[ele.userName]==undefined)
                    list.push( <li onClick={this.gotoChat} className='card' style={{margin:'1rem',display:'flex',flexDirection:'row',justifyContent:'space-between'}} key={ele._id}>
                        {ele.userName}  <p>Offline</p></li>);
                    else list.push( <li onClick={this.gotoChat} className='card' style={{margin:'1rem',display:'flex',flexDirection:'row',justifyContent:'space-between'}} key={ele._id}>
                        {ele.userName}  <p>{this.props.userlog[ele.userName]}</p></li>);
                });
            }
            this.setState({view:<ul>{list}</ul>})
        });
            // if(this.state.view==res)setTimeout(()=>this.getUserList(),1000);
    }


    hview=<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <h1>You:{this.props.userName}</h1>
        <div><button onClick={this.showChats}>Chats</button>
        <button onClick={this.getUserList.bind(this)}>Users</button></div>
        </div>;

    state={view:this.getUserList(),Hview:this.hview,log:this.props.userlog};

    handleBack=()=>{
        this.setState({view:this.state.lview[1],Hview:this.state.lview[0]});
    }

       
    gotoChat=(event)=>{
        console.log(this.props);
        this.setState({lview:[this.state.Hview,this.state.view],view:<Chat sender={event.target.firstChild.data} userName={this.props.userName} userlog={this.props.userlog} cb={this.handleBack}/>});
    }

    render(){
        return(
            <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
            {this.state.Hview}
            <React.Fragment>{this.state.view}</React.Fragment>
            </div>
        );
    }

}

export default main;