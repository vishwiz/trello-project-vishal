import React,{Component } from 'react';
import CheckItems from './checkItems';
import Button from '@material-ui/core/Button';
import '../componentCss/checkList.css';
class CheckList extends Component {
   constructor(props){
     super(props)
     this.state = {
       checkListData : [],
       inputValue:""
     }
   }
   onInputHandler=(event)=>{
      this.setState({
          inputValue : event.target.value
      })
   }
   componentDidMount=()=>{
    return fetch(`https://api.trello.com/1/cards/${this.props.cardId}/checklists?&key=${this.props.boardKey}&token=${this.props.token}`,{
      method: "GET"
    })
    .then(res=>res.json())
    .then(checkListData=>{
      this.setState({
       checkListData
      })
    })
  }

   addCardCheckList=(event)=>{
     event.preventDefault()
        return fetch(`https://api.trello.com/1/cards/${this.props.cardId}/checklists?name=${this.state.inputValue}&key=${this.props.boardKey}&token=${this.props.token}`,{
          method:"POST"
        })
        .then(res=>res.json())
        .then(data=>{
          let newCheckList = this.state.checkListData;
          newCheckList.push(data)
          this.setState({
            checkListData:newCheckList,
            inputValue:""
          })
        })
   }

   deleteCardCheckList= async(checkListId)=>{
     let newCheckList = await this.state.checkListData;
     let newData = newCheckList.filter(data=>data.id!==checkListId)
    await this.setState({
       checkListData:newData
     })
     return fetch(`https://api.trello.com/1/checklists/${checkListId}?key=${this.props.boardKey}&token=${this.props.token}`,{
       method:"DELETE"
     })
     .then(res=>res.json())
     .then(data=>console.log(data))
   }
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
              <section>
            <div className="close-button">  <button onClick={this.props.closePopup}>close</button> </div>
        {
             this.state.checkListData.map(checkListDetails=>{
               let checkListId = checkListDetails.id
               return <section>
                  <div className="check-list-delete">
                  <h1>{checkListDetails.name}</h1>
                  <Button variant="contained" color="primary"  onClick={()=>this.deleteCardCheckList(checkListId)}>X</Button>
                  </div>
                  <CheckItems
                  cardId = {this.props.cardId}
                    checkItems = {checkListDetails.checkItems}
                    checkListId = {checkListId}
                     boardKey ={this.props.boardKey}
                     token={this.props.token} /> 
                  </section>
             })
           }
          <form onSubmit={this.addCardCheckList}>
            <input value={this.state.inputValue} onChange={this.onInputHandler} />
          </form>
                </section>
          </div>
        </div>
      );
    }
  }

  export default CheckList