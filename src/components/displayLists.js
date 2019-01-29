import React, { Component } from 'react';
import DeleteList from './deleteList';
import DisplayCards from './displayCards'
import '../componentCss/displayList.css'
// import AddCards from './addCards';
class DisplayList extends Component{
       constructor(props){
           super(props)
           this.state={}
        //    console.log(this.props)
        }        

       
    render(){
      
        return(

           <section className="board-list">
                    <div>
                    <div className="board-list-name">
                    <DeleteList 
                      deleteBoardLists = {this.props.deleteBoardLists}  
                      listId = {this.props.listId}
                      boardKey = {this.props.boardKey}
                      token = {this.props.token} /> 
                  <h1>{
                     this.props.listCardsDetails
                  }</h1>
                  </div>
                 <div className="board-list-cards">
                 <DisplayCards
                  boardId = {this.props.boardId}
                  listId = {this.props.listId}
                  boardKey = {this.props.boardKey}
                  token = {this.props.token} />
                     </div>
                    </div>
                  
                   </section>
        )
    }
}


export default DisplayList;