import React, { Component } from 'react';
import fire from './fire.js';
import './editor.css';
  var database = fire.database();
class Chat extends Component {
  constructor(props)
  {
    super(props);
    this.state =
    {
      messages: [],
      newMessage :""
    }
  }
  componentDidMount()
  {
  
    database.ref("/messages").on("child_added", (snapshot)=>{ 
      var msg = snapshot.val();
      var curr = this.state.messages;
      curr.push(msg);
      this.setState(
      {
        messages :curr
      })
      console.log(msg);
    })
  }
  sendMessage()
  {
  ;
   database.ref("/messages").push().set({
    body: this.state.newMessage,
    author: "Vaari"
   })
   this.setState(
   {
    newMessage :""
   })
  }

  render() {
    
    return (
      <div>
      <div className="container chatBox"> 
      <h1 className="text"> Chat  </h1>
      <div>
      {
        this.state.messages.map((msg,i)=>{
          return (
          <div key={i} className="text-danger chat">{msg.body} -------- {msg.author } </div>

          )
        })
      }
      </div>
      <div > 
      <input value ={this.state.newMessage}
       onChange={(e)=>{
        this.setState(
        {
          newMessage : e.target.value
        })
       }} ></input>
      <button className="btn-danger" onClick ={()=>{
          this.sendMessage();
        }
      }>Send</button>
      </div>
      </div>
      </div>
    );
  }
}

export default Chat;

