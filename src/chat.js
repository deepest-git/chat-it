import React from 'react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
const io = require('socket.io-client');
const socket = io('http://localhost:8082/');


const Chat=(props)=>{    

    var msgList=[];
    
    socket.on('msg',(data)=>{
            let item;
            console.log(data);
            if(data.frm==props.sender && data.to==props.userName || data.frm==props.userName && data.to==props.sender ){
                item=<li>{data.frm}:{data.msg}</li>
                msgList.push(item);
            }
            setChatView(<ul>{msgList}</ul>)
    })

    // const getChatView=()=>{
    //     socket.emit('chkFrmTo',{to:props.userName,frm:props.sender},(data)=>{
    //         console.log(data);
    //     });

    //     setTimeout(() => {
    //         getChatView();
    //     }, 100);
    // }
    
    let getActive=()=>{
        if(props.userlog[props.sender]==undefined)return 'offline';
        else return 'online';
    }

    const[active,setActive]=React.useState(getActive());
    const[msgIn,setMsgIn]=React.useState();
    const[chatView,setChatView]=React.useState('');
    
    socket.on('typing',(frmTo)=>{
        if(frmTo.frm==props.sender && frmTo.to==props.userName && active!='typing'){
        handleActiveTimer('typing')
    }
    });


    const handleActiveTimer=(data)=>{
        if(data=='typing'){
            setActive('Typing...');
            setTimeout(()=>{
            handleActiveTimer();
        },500)}
        else setActive(getActive());
    }

    const setMsg=(event)=>{
        setMsgIn(event.target.value);
    }

    const sendMsg=()=>{
        socket.emit('msg',{frm:props.userName,to:props.sender,msg:msgIn},(data)=>{
            console.log(data);
        });
    }

    let handleBack=()=>{
        props.cb();
    }

    return(
        <React.Fragment>
        <button onClick={handleBack} style={{marginTop:'2rem'}}>Back</button>
        <div style={{display:'flex',flexDirection:'column',alignItems:'stretch',marginTop:'20px'}}>
            <div className='card' style={{alignSelf:'center',display:'flex',flexDirection:'column'}}>
                <div>Chat with {props.sender}</div>
                <div>{active}</div>
            </div>

            {chatView}

            <div className='card' style={{alignSelf:'center',marginTop:'10em'}}>
            <input placeholder='Type Message' onChange={setMsg} onKeyPress={async()=>{socket.emit('typing',{frm:props.userName,to:props.sender})}}/>
            <button onClick={sendMsg}>Send</button>
            </div>
        </div>
        </React.Fragment>
    );
}

export default Chat;