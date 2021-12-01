import { boardService } from "./board.service"

export const groupService = {
    groupsQuery
}



function getGroups(boardId) {
    const board = boardService.getById(boardId)
    return board.groups
}

function save(group){

}