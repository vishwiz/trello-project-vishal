const boardId = "O4tQgVOf";
const boardKey = "99efb8cb50c735eac0a0c07ca429258b";
const token =
  "bc12ead460e5ca779805c5ca5b31b9be4c4ae53875db937264f968698c5a5fc3";

const getBoardData = () => {
  return fetch(
    `https://api.trello.com/1/boards/5c134bfcad278f7183afb7a6?actions=all&boardStars=none&cards=none&card_pluginData=false&checklists=none&customFields=false&fields=name%2Cdesc%2CdescData%2Cclosed%2CidOrganization%2Cpinned%2Curl%2CshortUrl%2Cprefs%2ClabelNames&lists=open&members=none&memberships=none&membersInvited=none&membersInvited_fields=all&pluginData=false&organization=false&organization_pluginData=false&myPrefs=false&tags=false&key=${boardKey}&token=${token}`
  );
};

const deleteBoardList = listId => {
  return fetch(
    `https://api.trello.com/1/lists/${listId}/closed?value=true&key=${boardKey}&token=${token}`,
    {
      method: "PUT"
    }
  );
};
const getBoardCard = () => {
  return fetch(
    `https://api.trello.com/1/boards/${boardId}/cards?key=${boardKey}&token=${token}`
  );
};
const addNewCard = (name, listId) => {
  return fetch(
    `https://api.trello.com/1/cards?name=${name}&pos=bottom&idList=${listId}&keepFromSource=all&key=${boardKey}&token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

const deleteBoardCard = cardId => {
  return fetch(
    `https://api.trello.com/1/cards/${cardId}?&key=${boardKey}&token=${token}`,
    {
      method: "Delete"
    }
  );
};

const addList = (name, boardLongId) => {
  return fetch(
    `https://api.trello.com/1/lists?name=${name}&idBoard=${boardLongId}&pos=bottom&key=${boardKey}&token=${token}`,
    {
      method: "POST",
      header: {
        "Content-Type": "application/json"
      }
    }
  );
};

const getChecklist = cardId => {
  return fetch(
    `https://api.trello.com/1/cards/${cardId}/checklists?&key=${boardKey}&token=${token}`,
    {
      method: "GET"
    }
  );
};

const addChecklist = (cardId, name) => {
  return fetch(
    `https://api.trello.com/1/cards/${cardId}/checklists?name=${name}&key=${boardKey}&token=${token}`,
    {
      method: "POST"
    }
  );
};
const deleteChecklist = checkListId => {
  return fetch(
    `https://api.trello.com/1/checklists/${checkListId}?key=${boardKey}&token=${token}`,
    {
      method: "DELETE"
    }
  );
};

const onCheckItems = (cardId, _id, cState) => {
  return fetch(
    `https://api.trello.com/1/cards/${cardId}/checkItem/${_id}?state=${cState}&key=${boardKey}&token=${token}`,
    {
      method: "PUT"
    }
  );
};

const addCheckItems = (checkListId, name) => {
  return fetch(
    `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${name}&pos=bottom&checked=false&key=${boardKey}&token=${token}`,
    {
      method: "POST"
    }
  );
};

const deleteCheckItems = (checkListId, _id) => {
  return fetch(
    `https://api.trello.com/1/checklists/${checkListId}/checkItems/${_id}?key=${boardKey}&token=${token}`,
    {
      method: "DELETE"
    }
  );
};
export default {
  getBoardData,
  deleteBoardList,
  getBoardCard,
  addNewCard,
  deleteBoardCard,
  addList,
  getChecklist,
  addChecklist,
  deleteChecklist,
  onCheckItems,
  addCheckItems,
  deleteCheckItems
};
