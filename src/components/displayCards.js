import React, { Component } from 'react';
import '../componentCss/displayCards.css';
import CheckList from './checkList';
import DeleteCards from './deleteCards';
import AddCards from './addCards';
class DisplayCards extends Component{
    constructor(props){
        super(props)
        this.deleteCard = this.deleteCard.bind(this)
        this.state = {
            listCardData:[]
        }

    }
    
    componentDidMount(){
        return fetch(`https://api.trello.com/1/boards/${this.props.boardId}/cards?key=${this.props.boardKey}&token=${this.props.token}`)
        .then(res=>res.json())
        .then(listCardData=>{
            this.setState({
                listCardData
            })
        })
    }

    addCard = (newList)=>{
        let list =  this.state.listCardData
        list.push(newList)
        return this.setState({
            listCardData : list
         })
       }
    
    deleteCard = (cardId)=>{
        let card = this.state.listCardData
       card = card.filter(data=>data.id!==cardId)
    //    console.log(k) 
       return this.setState({
            listCardData : card
        })
    }
    check = ()=>{
        return <CheckList />
    }

    render(){
       let listId = this.props.listId
    //    console.log(listId)
        // console.log(this.state.listCardData)
        if(this.state.listCardData.length!==0){
           return ( <div className="fixed-cards">
                    {this.state.listCardData.map(cardDetails=>{
                        console.log(cardDetails.id)
                        return( 
                        <div> 
                            <div  className="cards">{cardDetails.idList===listId?<p onClick={this.check}><div className="cards-title">{cardDetails.name} </div><div className="card-delete"><DeleteCards 
                                       cardId = {cardDetails.id}
                                       deleteCard = {this.deleteCard}
                                       boardKey = {this.props.boardKey}
                                       token = {this.props.token}
                                       /></div>
                            </p> : null}</div>
                            
                        </div> 
            
           )})
        }
        <div className="card-input">
        <AddCards 
         listId = {listId}
         addCard = {this.addCard}
         boardKey = {this.props.boardKey}
         token = {this.props.token} /></div>
        </div>)
        }else return null
    }
}

export default DisplayCards