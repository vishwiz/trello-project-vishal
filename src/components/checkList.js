import React, { Component } from "react";
import CheckItems from "./checkItems";
import TextField from "@material-ui/core/TextField";
import Api from "./api";
import "../componentCss/checkList.css";
class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkListData: [],
      inputValue: ""
    };
  }
  onInputHandler = event => {
    this.setState({
      inputValue: event.target.value
    });
  };
  componentDidMount = () => {
    Api.getChecklist(this.props.cardId)
      .then(res => res.json())
      .then(checkListData => {
        this.setState({
          checkListData
        });
      });
  };

  addCardCheckList = event => {
    event.preventDefault();
    Api.addChecklist(this.props.cardId, this.state.inputValue)
      .then(res => res.json())
      .then(data => {
        let newCheckList = this.state.checkListData;
        newCheckList.push(data);
        this.setState({
          checkListData: newCheckList,
          inputValue: ""
        });
      });
  };

  deleteCardCheckList = async checkListId => {
    let newCheckList = await this.state.checkListData;
    let newData = newCheckList.filter(data => data.id !== checkListId);
    await this.setState({
      checkListData: newData
    });
    Api.deleteChecklist(checkListId)
      .then(res => res.json())
      .then(data => console.log(data));
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <section>
            <div className="close-button">
              {" "}
              <button onClick={this.props.closePopup}>-</button>{" "}
            </div>
            {this.state.checkListData.map(checkListDetails => {
              let checkListId = checkListDetails.id;
              return (
                <section>
                  <div className="check-list-delete">
                    <h1>{checkListDetails.name}</h1>
                    <button
                      variant="contained"
                      color="primary"
                      onClick={() => this.deleteCardCheckList(checkListId)}
                    >
                      delete
                    </button>
                  </div>
                  <CheckItems
                    cardId={this.props.cardId}
                    checkItems={checkListDetails.checkItems}
                    checkListId={checkListId}
                  />
                </section>
              );
            })}
            <div />
            <form className="new-check-list" onSubmit={this.addCardCheckList}>
              {/* <input placeholder="Add Checklist" value={this.state.inputValue} onChange={this.onInputHandler} /> */}
              <TextField
                id="outlined-dense"
                label="Add Checklist"
                value={this.state.inputValue}
                onChange={this.onInputHandler}
                margin="dense"
                variant="outlined"
              />
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default CheckList;
