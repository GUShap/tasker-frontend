import { boardService } from "../../services/board.service.js";

export const boardStore = {
  state: {
    boards: null,
    currBoard: null,
  },
  getters: {
    currBoard(state) {
      return JSON.parse(JSON.stringify(state.currBoard));
    },
    allBoards(state) {
      return JSON.parse(JSON.stringify(state.boards));
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards;
      state.currBoard = boards[0];
    },
  },
  actions: {
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query();
        commit({ type: "setBoards", boards: boards });
      } catch (err) {
        console.log(err);
      }
    },
    async editTask({ commit }, { task }) {
      try {
        const currTask = await boardService.save(task);
        if (task._id) {
          commit({ type: "updateTask", task: currTask });
        } else {
          commit({ type: "addTask", task: currTask });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async removeTask({ dispatch }, { boardId, groupId, taskId }) {
      try {
        boardService.remove(boardId, groupId, taskId);
        dispatch({ type: "loadBoards"});
      } catch (err) {
        console.log(err);
      }
    },
    async getTaskById({taskId}) {
      try {
      return boardService.getTaskById(taskId);
      } catch (err) {
        console.log(err);
      }
    },
    
  },
  modules: {},
};
