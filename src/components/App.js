import React, { Component } from 'react';
import DisplayList from './displayLists';
import AddList  from './addList';
import '../componentCss/App.css';
const boardId = 'O4tQgVOf'
const boardKey ='99efb8cb50c735eac0a0c07ca429258b';
const token = 'bc12ead460e5ca779805c5ca5b31b9be4c4ae53875db937264f968698c5a5fc3';

class App extends Component {
  constructor(props){
    super(props)
    this.addBoardLists = this.addBoardLists.bind(this)
    this.deleteBoardLists = this.deleteBoardLists.bind(this)
    this.state ={
      boardData: {}
    }    
  }
  componentDidMount(){
    fetch(`https://api.trello.com/1/boards/5c134bfcad278f7183afb7a6?actions=all&boardStars=none&cards=none&card_pluginData=false&checklists=none&customFields=false&fields=name%2Cdesc%2CdescData%2Cclosed%2CidOrganization%2Cpinned%2Curl%2CshortUrl%2Cprefs%2ClabelNames&lists=open&members=none&memberships=none&membersInvited=none&membersInvited_fields=all&pluginData=false&organization=false&organization_pluginData=false&myPrefs=false&tags=false&key=${boardKey}&token=${token}`)
    .then(res=>res.json())
    .then(boardData=>{
      this.setState({
             boardData
      })
    })
  }

  deleteBoardLists = (listId)=>{
    let list = this.state.boardData
  list.lists =  list.lists.filter(data=>data.id!==listId)
     return  this.setState({
       boardData :  list       
     })
  }

  addBoardLists = (newList)=>{
   let list =  this.state.boardData
   list.lists.push(newList)
   return this.setState({
      boardData : list
    })
  }

  render() {
   if(this.state.boardData.lists){
    //  console.log(this.state.boardData)
    return (
         <section>
           <header>
             <h1>Yeh Karna Hai</h1>
             </header>
                 
            
            
       <div className="board-data">
      {
        this.state.boardData.lists.map(boardListData=>{
          // console.log(boardListData.id)
          return(
               <div>
             <DisplayList 
              deleteBoardLists = {this.deleteBoardLists}
              listCardsDetails = {boardListData.name} 
              listId = {boardListData.id}
              key={boardListData.id}
              boardId = {boardId}
              boardKey = {boardKey}
              token = {token}/>
               </div>
          )
        })
      }  
                   <AddList 
               addBoardLists = {this.addBoardLists}    
               boardLongId = {this.state.boardData.id}
               boardKey = {boardKey}
               token = {token} />

</div>
           </section>
    );
      }else return <div>Loading.....</div>
  }
}

export default App;
