import React, { Component } from 'react';

class AddCards extends Component{
    constructor(props){
        super(props)
        this.state={
            inputValue :""
        }
    }

    inputValueHandler = (event) => {
        this.setState({
            inputValue:event.target.value
        })
    } 

    addCard = (event)=>{
        event.preventDefault()
     return fetch(`https://api.trello.com/1/cards?name=${this.state.inputValue}&pos=bottom&idList=${this.props.listId}&keepFromSource=all&key=${this.props.boardKey}&token=${this.props.token}`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            this.props.addCard(data)
            return this.setState({
                inputValue:""
            })
        })   
    }
    render(){
        return(
            <form onSubmit={this.addCard}>
                <input value={this.state.inputValue} onChange={this.inputValueHandler} placeholder="Type ....." />
                </form>
        )
    }
}

export  default AddCards