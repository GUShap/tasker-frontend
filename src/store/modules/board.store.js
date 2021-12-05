import { boardService } from "../../services/board.service.js";

export const boardStore = {
  state: {
    boards: null,
    currBoard: null,
    currBoardIdx: null,
    sortedBoard: null,
    sortBy: {
      val: '',
      order: ''
    }
  },
  getters: {
    currBoard(state) {
      return JSON.parse(JSON.stringify(state.currBoard));
    },
    allBoards(state) {
      return JSON.parse(JSON.stringify(state.boards));
    },
    sortBoard(state) {
      const filteredTasks = []
      state.sortedBoard = JSON.parse(JSON.stringify(state.currBoard));
      // state.sortBy = JSON.parse(JSON.stringify(sortBy));
      // const regex = new RegExp(state.sortBy.val.name, 'i');
      state.sortedBoard.groups.forEach((group) => {
        group.tasks.sort((task1, task2) => { task1.title.toLowerCase() > task2.title.toLowerCase() ? 1 : -1 })
      })
      return state.boards.tasks = filteredTasks
    }
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
    setSort(state, { sortBy }) {
      state.sortBy = sortBy
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
    async editTask({ state, dispatch, commit }, { task }) {
      console.log(task)
      try {
        const currTask = await boardService.saveTask(task);
        if (task._id) {
          commit({ type: "updateTask", task: currTask });
        } else {
          dispatch({ type: "loadBoards", currBoardIdx: state.currBoardIdx });
          // commit({ type: "addTask", task: currTask });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async removeTask({ state, dispatch }, { taskId }) {
      try {
        await boardService.remove(taskId);
        dispatch({ type: "loadBoards", currBoardIdx: state.currBoardIdx });
      } catch (err) {
        console.log(err);
      }
    },
    async addNewGroup({ state, dispatch }) {
      try {
        await boardService.addNewGroup(state.currBoardIdx);
        dispatch({ type: "loadBoards", currBoardIdx: state.currBoardIdx });
      } catch (err) {
        console.log(err);
      }
    },
    // async cloneTask({ state, dispatch }, { task }) {
    //   try {
    //     await boardService.saveNewTask(task);
    //     dispatch({ type: "loadBoards", currBoardIdx: state.currBoardIdx });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async removeGroup({ state, dispatch }, { groupId }) {
      try {
        await boardService.removeGroup(state.currBoardIdx, groupId);
        dispatch({ type: "loadBoards", currBoardIdx: state.currBoardIdx });
      } catch (err) {
        console.log(err);
      }
    },

    async getTaskById({ state }, { taskId }) {
      try {
        const currTask = await boardService.getTaskById(taskId);
        console.log(taskId);
        return currTask;
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
};
