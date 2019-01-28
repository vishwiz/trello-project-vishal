import React, { Component } from 'react';
import '../componentCss/checkItems.css'
class CheckItems extends Component{
    constructor(props){
        super(props)
        this.state ={
            checkItemsData :this.props.checkItems,
            inputValue: ""
        
        }
        console.log(this.props.cardId)
    }

onClickCheckBox=(event,_id)=>{

    console.log(event.target)

    let cState;
    if(event.target.id==='complete') {
        cState="incomplete"
    }else{
        cState='complete';
    }

   return fetch(`https://api.trello.com/1/cards/${this.props.cardId}/checkItem/${_id}?state=${cState}&key=${this.props.boardKey}&token=${this.props.token}`,{
       method: 'PUT'
   })
   .then(res=>res.json())
   .then(data=>{console.log(data)
     let checkItem = this.state.checkItemsData
     checkItem.map((item,index)=>{
         if(item.id===_id){
         checkItem.splice(index,1,data)
         } 

       return  this.setState({
            checkItemData : checkItem
        })
    })
})
}

onInputChange=(event)=>{
    return this.setState({
        inputValue : event.target.value
    })
}

addCheckItems=(event,checkListId)=>{
    event.preventDefault()
    return fetch(`https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${this.state.inputValue}&pos=bottom&checked=false&key=${this.props.boardKey}&token=${this.props.token}`,{
        method: 'POST'
    })
    .then(res=>res.json())
    .then(checkItemData=>{
        console.log(checkItemData)
        let checkItems = this.state.checkItemsData
        checkItems.push(checkItemData)
        return this.setState({
            checkItemsData : checkItems,
            inputValue:""
        })
    })
}

deleteCheckItems=(_id,checkListId)=>{
     console.log(_id,checkListId)
     let checkItems = this.state.checkItemsData;
     let deleteItem = checkItems.filter(data=>data.id!==_id)
     return fetch(`https://api.trello.com/1/checklists/${checkListId}/checkItems/${_id}?key=${this.props.boardKey}&token=${this.props.token}`,{
         method:"DELETE"
     })
     .then(res=>res.json())
     .then(data=>{
        console.log(data)
        return this.setState({
            checkItemsData : deleteItem
        })
     })
 }
    render(){
        this.state.checkItemsData.map((item)=>{
            console.log(item.id)
            return <p><input type="checkbox" />{item.name}</p>
        })
        console.log(this.state.checkItemsData)
        return(
            
            <section>
               <div> {
                   this.state.checkItemsData.map((item)=>{
                        return <div>
                            <div className="check-items">
                            <p><input type="checkbox" id={item.state} onChange={(e)=>this.onClickCheckBox(e,item.id)} checked={item.state==="complete"?true:false} />{item.name}</p>
                            <button onClick={()=>this.deleteCheckItems(item.id,item.idChecklist)}>close</button>
                        </div>

                        </div>
                    }) 

                    
                }
                </div>
                <form onSubmit={(event)=>this.addCheckItems(event,this.props.checkListId)}><input value={this.state.inputValue} onChange={this.onInputChange} placeholder="new check Items" /></form>
                                     

                </section>
        )
    }
}

export default CheckItems 