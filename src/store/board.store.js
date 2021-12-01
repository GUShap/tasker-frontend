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
    // addToy(state, { toy }) {
    //   state.toys.push(toy);
    // },

    updateBoard(state, { board }) {},
    remove(state, { id }) {
      const idx = state.toys.findIndex((currToy) => currToy._id === id);
      const toy = state.toys.splice(idx, 1);
      state.lastRemovedToy = toy;
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
        const currTask = await BoardsService.save(task);
        if (task._id) {
          commit({ type: "updateTask", task: currTask });
        } else {
          commit({ type: "addTask", task: currTask });
        }
      } catch (err) {
        console.log(err);
      }
    },
    removeTask({ commit }, { id }) {
      return BoardsService.remove(id).then(() => {
        commit("remove", { id });
      });
    },
  },
  modules: {},
});
