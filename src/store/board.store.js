import Vue from "vue";
import Vuex from "vuex";
import { boardService } from "../services/board.service.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boards: null,
    currBoard: null,
  },
  getters: {
    boardsToShow({ state }) {
      return state.boards;
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards;
    },
  },
  actions: {
    async loadBoards({ commit }, {}) {
      try {
        const boards = await boardService.query();
        commit({ type: "setBoards", boards });
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
  },
  modules: {},
});
