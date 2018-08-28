import React,{Component} from 'react';
import AceEditor from 'react-ace';
import fire from "./fire";
import img10 from './Images/im10.jpg';
import 'brace/mode/java';
import 'brace/theme/github';
import './editor.css';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/js/dist/carousel.js';
import Chat from './Chat.js';


class Editor extends Component
{
	constructor(props)
	{
		super (props);
		this.state =
		{
			code : ""
		}

	}
componentDidMount()
{
  fire.database().ref("/doc").on("value",(snapshot)=>
  {
  	let val = snapshot.val();
  	this.setState({
  		code:val
  	})
  	
  })
}

handlechange(data)
{
	fire.database().ref("/doc").set(data);
}
render()
{
	return(
		<div >
<div className="heading">
  <p className="text">Collaborative Ace Editor </p>
<img src = {img10} alt="editor" className="img1" />
</div>
  <AceEditor
    mode="java"
    theme="github"
    className="text-danger editor"
    value= {this.state.code}
    onChange={(data)=>this.handlechange(data)}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{$blockScrolling: true}}
  >
  </AceEditor>
  <Chat />
 </div>
  )
}

}

export default Editor;