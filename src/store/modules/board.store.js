import { boardService } from "../../services/board.service.js";

export const boardStore = {
  state: {
    boards: null,
    currBoard: null,
    currBoardIdx: null,
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
      state.currBoardIdx = currBoardIdx;
    },
    updateTask(state, { boards, currBoardIdx }) {
      state.boards = boards;
      state.currBoard = boards[currBoardIdx];
      state.currBoardIdx = currBoardIdx;
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
        const currTask = await boardService.saveTask(task);
        return
        if (task._id) {
          commit({ type: "updateTask", task: currTask });
        } else {
          commit({ type: "addTask", task: currTask });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async removeTask({ state, dispatch  }, { taskId }) {
      try {
        await boardService.remove(taskId);
        dispatch({ type: "loadBoards", currBoardIdx: state.currBoardIdx });
      } catch (err) {
        console.log(err);
      }
    },

    async getTaskById({ taskId }) {
      console.log(taskId);
      try {
        const currTask = await boardService.getTaskById(taskId);
        return currTask;
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
};
