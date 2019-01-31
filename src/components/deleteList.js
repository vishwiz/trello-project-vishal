import React, { Component } from "react";
import Api from "./api";

class DeleteList extends Component {
  deleteList = () => {
    console.log(this.props);
    this.props.deleteBoardLists(this.props.listId);
    Api.deleteBoardList(this.props.listId)
      .then(res => res.json())
      .then(data => console.log(data));
  };
  render() {
    return <button onClick={this.deleteList}> remove </button>;
  }
}
export default DeleteList;
