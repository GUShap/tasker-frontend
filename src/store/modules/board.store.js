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
    setBoards(state, { boards, currBoardIdx }) {
      state.boards = boards;
      state.currBoard = boards[currBoardIdx];
    },
  },
  actions: {
    async loadBoards({ commit }, { currBoardIdx }) {
      try {
        const boards = await boardService.query();
        commit({ type: "setBoards", boards: boards, currBoardIdx });
        return boards;
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
        dispatch({ type: "loadBoards" });
      } catch (err) {
        console.log(err);
      }
    },
    async getTaskById({ state }, { taskId }) {
      try {
        const currTask = await boardService.getTaskById(
          state.currBoard._id,
          taskId
        );
        return currTask;
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
};
