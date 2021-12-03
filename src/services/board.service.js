import { boardDb } from "../../database.js";

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
  removeGroup
};

const gBoards = [boardDb];

function query() {
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
function saveTask(taskInfo) {
  console.log("saveTask", taskInfo);
  const task = {
    title: taskInfo.title,
  };
  return
  const boards = query();
  boards[bIdx].groups[gIdx].tasks[tIdx].push(task);
}


async function removeGroup(boardIdx, { groupId }) {
  try {
    const idx = await getGroupIdx(gBoards[boardIdx]._id, groupId)
    gBoards[boardIdx].groups.splice(idx, 1)
    // console.log(gBoards[boardIdx])
  } catch (err) {
    console.log(err)
  }
}

async function remove(taskId) {
  try {
    const idx = gBoards.map((board) => {
      board.groups.map((group) => {
        var tasks = group.tasks;
        var idx = tasks.findIndex((task) => task.id === taskId);
        if (idx >= 0) {
          tasks.splice(idx, 1);
          console.log(tasks);
        }
      });
    });
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

function getById(boardId) {
  const board = gBoards.find((board) => board._id === boardId);
  return board;
}

async function getTaskById(taskId) {
  try {
    const task = gBoards.map(board => {
      board.groups.map(group => {
        group.tasks.map(task => task.id === taskId)
      })
    })
    console.log(task);
    return task;

  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

async function getTaskIdx(boardId, groupId, taskId) {
  try {
    const boardIdx = await getBoardIdx(boardId)
    const groupIdx = await getGroupIdx(boardId, groupId)
    const taskIdx = gBoards[boardIdx].groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    return taskIdx
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

async function getGroupIdx(boardId, groupId) {
  try {

    const boardIdx = await getBoardIdx(boardId)

    return gBoards[boardIdx].groups.findIndex(group => {
      console.log(groupId, group.id)
      // console.log(group.id === groupId)
      return group.id === groupId

    })
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

async function getBoardIdx(boardId) {
  try {
    return gBoards.findIndex((board) => board._id === boardId);
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
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
