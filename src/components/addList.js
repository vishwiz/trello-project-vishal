import React, {Component} from 'react';

class AddList extends Component{
    constructor(props){
        super(props)
        this.state={
            inputValue :""
        }
        
        console.log(this.props)
        
    } 

    inputValueHandler = (event) => {
        // console.log(this, 'inputValuehandler')
        this.setState({
            inputValue:event.target.value
        })
    }

 addNewList=(event)=>{
     event.preventDefault()
          return fetch(`https://api.trello.com/1/lists?name=${this.state.inputValue}&idBoard=${this.props.boardLongId}&pos=bottom&key=${this.props.boardKey}&token=${this.props.token}`,{
         method:"POST",
         header:{
             'Content-Type': 'application/json'
         }

     })
     .then(res=>res.json())
     .then(data=>{
        console.log(data)
        this.props.addBoardLists(data)
        return this.setState({
            inputValue:""
        }) 
      })
        
 }
    render(){
        return(
            <form onSubmit={this.addNewList}>
                <input value={this.state.inputValue} onChange={this.inputValueHandler} placeholder="ADD LIST" />
                </form>
        )
    }
}

export default AddList