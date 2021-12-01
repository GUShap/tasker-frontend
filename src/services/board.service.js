import { board } from "../../database.js"


export const boardService = {
    query,
    save,
    remove,
    getById,
    getTaskById
}

const gBoards = [board];

function query() {
    return gBoards
}

function save(board) {
    if (board._id) {
        console.log('board', board);
        const idx = gBoards.findIndex(currBoard => currBoard._id === board._id)
        gBoards[idx] = board
    }
    else {
        board._id = _makeId()
        gBoards.push(board)
    }
    return board
}

function remove(boardId) {
    const idx = gBoards.findIndex(board => board._id === boardId)
    gBoards.splice(idx, 1)
    return gBoards
}

function getById(boardId) {
    const board = gBoards.find(board => board._id === boardId)
    return board
}

function getTaskById(taskId) {
    const task = gBoards.map(brd => {
        brd.groups.map(group => {
            group.tasks.map(task => {
                return task.id === taskId
            })
        })
    })
    return task
}
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