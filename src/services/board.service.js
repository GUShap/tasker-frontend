import { board } from "../../database.js"


export const boardService = {
    query,
    save,
    remove,
    getById,
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

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
