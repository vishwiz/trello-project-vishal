import React, { Component } from 'react';

class DeleteCards extends Component{

   deleteCards=()=>{
       this.props.deleteCard(this.props.cardId)
      return fetch(`https://api.trello.com/1/cards/${this.props.cardId}?&key=${this.props.boardKey}&token=${this.props.token}`,{
            method:'Delete'
      })
      .then(res=>res.json())
      .then(data=>console.log(data))
   }
   render(){
       return(
           <button onClick={this.deleteCards}>x</button>
       )
   }
}

export default DeleteCards