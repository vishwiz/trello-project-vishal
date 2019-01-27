import React, { Component } from 'react';

class DeleteList extends Component{
    
    deleteList=()=>{
        this.props.deleteBoardLists(this.props.listId)
        return fetch(`https://api.trello.com/1/lists/${this.props.listId}/closed?value=true&key=${this.props.boardKey}&token=${this.props.token}`,{
            method:"PUT"
        }).then(res=>res.json())
        .then(data=>console.log(data))
    }
    render(){
        return(
            <button onClick={this.deleteList} >remove</button>
        )
    }
}
export default DeleteList