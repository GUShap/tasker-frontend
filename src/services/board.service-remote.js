import { httpService } from "./http.service";
import { utilService } from "./util.service";
import { storageService } from "./storage.service";

const KEY = "gBoards"


export const remoteBoardService = {
  query,
  remove,
  save,
  getById,
  getEmptyGroup,
  getEmptyBoard,
  getColors
}

const BASE_URL = process.env.NODE_ENV !== "development"
  ? "board"
  : "board";



async function query(filterBy = null) {
  // console.log('filterBy', filterBy);
  try {
    return await httpService.get(BASE_URL, filterBy);
  } catch (err) {
    console.log("error:", err);
  }
}


async function getById(id) {
  try {
    return await httpService.get(BASE_URL + `/${id}`);
  } catch (err) {
    console.log("error:", err);
  }
}


async function remove(id) {
  try {
    return await httpService.delete(BASE_URL + `/${id}`);
  } catch (err) {
    console.log("error:", err);
  }
}

async function save(board) {
  try {
    return board._id
      ? await httpService.put(BASE_URL + `/${board._id}`, { board })
      : await httpService.post(BASE_URL, { board });
  } catch (err) {
    console.log("error:", err);
  }
}

function _getBoardCopy(boardId) {
  const board = todoService.getById(boardId);
  return JSON.parse(JSON.stringify(board));
}

async function getEmptyBoard() {
  try {
    return {
      title: 'New Board',
      createdAt: Date.now(),
      createdBy: null,
      groups: [
        {
          id: utilService.makeId(),
          title: 'Group Title',
          tasks: [
            {
              id: utilService.makeId(),
              title: 'Item 1'
            },
            {
              id: utilService.makeId(),
              title: 'Item 2'
            },
            {
              id: utilService.makeId(),
              title: 'Item 3'
            },
          ],
          style: {
            color: "#579bfc"
          }
        },
        {
          id: utilService.makeId(),
          title: 'Group Title',
          tasks: [
            {
              id: utilService.makeId(),
              title: 'Item 4'
            },
            {
              id: utilService.makeId(),
              title: 'Item 5'
            }
          ],
          style: {
            color: "#579bfc"
          }
        }
      ]
    }

  } catch (err) {
    console.log(err);
  }
}

async function getEmptyGroup() {
  try {
    return {
      title: "New group",
      id: utilService.makeId(),
      tasks: [],
      style: {
        color: "#579bfc"
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function getColors() {
  return [
    {
      name: 'darkGreen',
      hexCode: '#037f4'
    },
    {
      name: 'green',
      hexCode: '#00c875'
    },

    {
      name: 'yellowGreen',
      hexCode: '#9cd326'
    },
    {
      name: 'beige',
      hexCode: '#cab641'
    },
    {
      name: 'yellow',
      hexCode: '#ffcb00'
    },
    {
      name: 'darkPurple',
      hexCode: '#784bd1'
    },
    {
      name: 'purple',
      hexCode: '#a25ddc'
    },
    {
      name: 'turquoise',
      hexCode: '#0086BE'
    },
    {
      name: 'blue',
      hexCode: '#579bfc'
    },
    {
      name: 'lightBlue',
      hexCode: '#66ccff'
    },
    {
      name: 'darkRed',
      hexCode: '#bb3354'
    },
    {
      name: 'red',
      hexCode: '#e2445c'
    },
    {
      name: 'darkOrange',
      hexCode: '#ff642e'
    },
    {
      name: 'orange',
      hexCode: '#fdab3d'
    },
    {
      name: 'brown',
      hexCode: '#7f5347'
    }
  ]
}