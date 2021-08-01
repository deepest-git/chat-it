import React from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class main extends React.Component{

    interval;

    handleBack=()=>{
        this.setState({view:this.state.lview[1],Hview:this.state.lview[0]});
    }

    gotoChat=async(event)=>{
        let hview=<button onClick={this.handleBack}>Back</button>
        let view=<div style={{display:'flex',flexDirection:'column',alignItems:'stretch',marginTop:'20px'}}>
            <div className='card' style={{alignSelf:'center'}}>Chat with {event.target.firstChild.data}</div>
            <div className='card' style={{alignSelf:'center',marginTop:'10em'}}>
                <input placeholder='Type Message'/>
                <button>Send</button>
            </div>
        </div>
        clearInterval(this.interval);
        this.setState({lview:[this.state.Hview,this.state.view],view:view,Hview:hview});
    }

    getUserList=async()=>{
        axios.get('https://chat-it-backend.herokuapp.com/api/user')
        .then(res=>{
            let l=res.data.map(element => {return (<li key={element.userEmail} className='card' style={{margin:'15px',display:'flex',flexDirection:'row'}} onClick={this.gotoChat}>
                <div className='card-body'>{element.userName}</div>
                <div style={{alignSelf:'center',marginRight:'10px'}}>{element.logged}</div></li>)})
            
            this.setState({usersView:<ul style={{listStyleType:'none'}}>{l}</ul>});
        });
        this.interval=setTimeout(await this.getUserList,2*1000);
    }

    showChats=()=>{
        this.setState({view:<p>No Chats</p>});
    }

    showUserList=()=>{
        this.setState({view:this.state.usersView})
    }

    hview=<div style={{display:'flex',flexDirection:'row'}}><button onClick={this.showChats}>Chats</button><button onClick={this.showUserList}>Users</button><h1>{this.props.userName}</h1></div>;

    state={view:'',usersView:'',Hview:this.hview,lview:''};

    componentDidMount(){
        this.getUserList()
    }

    render(){
        this.getUserList();
        return(
            <React.Fragment>
            {this.state.Hview}
            <React.Fragment>{this.state.view}</React.Fragment>
            </React.Fragment>
        );
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

}

export default main;