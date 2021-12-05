import { boardDb } from "../../database.js";
import { storageService } from "./storage.service";
import { utilService } from "./util.service";
export const boardService = {
  query,
  save,
  saveTask,
  remove,
  getById,
  getTaskById,
  getTaskIdx,
  getGroupIdx,
  getBoardIdx,
  removeGroup,
  addNewGroup,
  getEmptyComment,
  getEmptyActivity,
};

function query() {
  const boards = storageService.load("gBoards");
  if (boards) return boards;

  const gBoards = [boardDb];
  storageService.store("gBoards", gBoards);
  return JSON.parse(JSON.stringify(gBoards));
}

function save(board) {
  if (board._id) {
    console.log("board", board);
    const idx = gBoards.findIndex((currBoard) => currBoard._id === board._id);
    gBoards[idx] = board;
  } else {
    board._id = _makeId();
    gBoards.push(board);
  }
  return board;
}

async function saveTask(taskInfo) {
  console.log(taskInfo)
  try {
    if (taskInfo.id) {
      console.log("update task");
    } else {
      var currTask
      if (taskInfo.task.clone) {
        currTask = taskInfo.task
        currTask.id = utilService.makeId()
      } else {
        currTask = {
          title: taskInfo.title,
          id: utilService.makeId(),
        };
      }
      const bIdx = await getBoardIdx(taskInfo.boardId);
      const gIdx = await getGroupIdx(taskInfo.boardId, taskInfo.groupId);

      const gBoards = query();
      gBoards[bIdx].groups[gIdx].tasks.push(currTask);
      _loadToStorage(gBoards);
    }
    return;
  } catch (err) {
    console.log(err);
  }
}

async function removeGroup(boardIdx, { groupId }) {
  try {
    const gBoards = query();
    const idx = await getGroupIdx(gBoards[boardIdx]._id, groupId);
    gBoards[boardIdx].groups.splice(idx, 1);
    _loadToStorage(gBoards);
  } catch (err) {
    console.log(err);
  }
}

async function addNewGroup(boardIdx) {
  try {
    const gBoards = query();
    const currGroup = {
      title: "New group",
      id: utilService.makeId(),
      tasks: [],
    };
    gBoards[boardIdx].groups.unshift(currGroup);
    _loadToStorage(gBoards);
  } catch (err) {
    console.log(err);
  }
}

async function remove(taskId) {
  try {
    const gBoards = query();
    const idx = gBoards.map((board) => {
      board.groups.map((group) => {
        var tasks = group.tasks;
        var idx = tasks.findIndex((task) => task.id === taskId);
        if (idx >= 0) {
          tasks.splice(idx, 1);
        }
      });
    });
    _loadToStorage(gBoards);
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

function getById(boardId) {
  const gBoards = query();
  const board = gBoards.find((board) => board._id === boardId);
  return board;
}

async function getTaskById(taskId) {
  try {
    const gBoards = query();
    const task = gBoards.map((board) => {
      board.groups.map((group) => {
        group.tasks.map((task) => {
          return task.id === taskId;
        });
      });
    });
    return task;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

async function getTaskIdx(boardId, groupId, taskId) {
  try {
    const gBoards = query();
    const boardIdx = await getBoardIdx(boardId);
    const groupIdx = await getGroupIdx(boardId, groupId);
    const taskIdx = gBoards[boardIdx].groups[groupIdx].tasks.findIndex(
      (task) => task.id === taskId
    );
    return taskIdx;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

async function getGroupIdx(boardId, groupId) {
  try {
    const gBoards = query();
    const boardIdx = await getBoardIdx(boardId);
    return gBoards[boardIdx].groups.findIndex((group) => group.id === groupId);
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

async function getBoardIdx(boardId) {
  try {
    const gBoards = query();
    return gBoards.findIndex((board) => board._id === boardId);
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

function _loadToStorage(gBoards) {
  storageService.store("gBoards", gBoards);
}

function getEmptyComment() {
  return {
    txt: "",
    createdAt: Date.now(),
    byMember: {
      _id: null,
      fullname: null,
      imgUrl: "",
    },
  };
}

function getEmptyActivity() {
  return {
    txt: "",
    createdAt: Date.now(),
    byMember: {
      _id: "u101",
      fullname: "Abi Abambi",
      imgUrl: "http://some-img",
    },
    task: {
      id: "t101",
      title: "Replace Logo",
    },
  };
}

// console.log(getTaskIdx("b101","g101", "t102"))

// function updateTask(cmpType, data) {
//     // Switch
//     // task.members = data;
//     // task.status = data;
// }

// Store - saveTask
// function storeSaveTask(task, activity) {
//     const activity = {
//         "id": makeId(),
//         "txt": "Changed Color",
//         "createdAt": Date.now(),
//         "byMember": userService.getLoggedinUser(),
//         "task": task
//     }
//     board = boardService.saveTask(boardId, groupId, task, activity)
//     commit(board)
// }

// boardService
// function saveTask(boardId, groupId, task, activity) {
//     const board = getById(boardId)
//     // TODO: find the task, and update
//     board.activities.unshift(activity)
//     saveBoard(board)
//     return board
// }

// boardStore-action
// async function loadAndWatchBoard(boardId) {
//     // load from service
//     // subscribe to socket
// }
