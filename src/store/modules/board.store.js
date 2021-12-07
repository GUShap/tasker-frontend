import { boardService } from "../../services/board.service.js";

export const boardStore = {
  state: {
    boards: null,
    currBoard: null,
    currBoardIdx: null,
    sortedBoard: null,
    sortBy: {
      val: "",
      order: "",
    },
    isTaskDetailsHover: false,
  },
  getters: {
    currBoard(state) {
      return JSON.parse(JSON.stringify(state.currBoard));
    },
    allBoards(state) {
      return JSON.parse(JSON.stringify(state.boards));
    },
    sortBoard(state) {
      const filteredTasks = [];
      state.sortedBoard = JSON.parse(JSON.stringify(state.currBoard));
      // state.sortBy = JSON.parse(JSON.stringify(sortBy));
      // const regex = new RegExp(state.sortBy.val.name, 'i');
      state.sortedBoard.groups.forEach((group) => {
        group.tasks.sort((task1, task2) => {
          task1.title.toLowerCase() > task2.title.toLowerCase() ? 1 : -1;
        });
      });
      return (state.boards.tasks = filteredTasks);
    },
    taskHover(state) {
      return state.isTaskDetailsHover;
    },
  },
  mutations: {
    setBoards(state, { boards, currBoardIdx }) {
      state.boards = boards;
      state.currBoard = boards[currBoardIdx];
      state.currBoardIdx = currBoardIdx;
    },
    saveBoard(state, { board }) {
      console.log('label',board.groups.map(g=>g.tasks.map(t=>t.id)));
      state.currBoard = board;
    },
    updateTask(state, { boards, currBoardIdx }) {
      state.boards = boards;
      state.currBoard = boards[currBoardIdx];
      state.currBoardIdx = currBoardIdx;
    },
    setSort(state, { sortBy }) {
      state.sortBy = sortBy;
    },
    saveGroup(state, { groupInfo }) {
      const { group, groupIdx } = groupInfo;
      state.currBoard.groups.splice(groupIdx, 1, group);
    },
    saveGroups(state, { groupsInfo }) {
      const { groups } = groupsInfo;
      state.currBoard.groups = groups;
    },
    hover(state, { isHover }) {
      state.isTaskDetailsHover = isHover;
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
    async saveBoard({ commit, state }, { board }) {
      try {
        // console.log('board',board);
        const currBoard = await boardService.saveBoard(board, state.currBoardIdx);
        commit({ type: "saveBoard", board: currBoard });
      } catch (err) {
        console.log(err);
      }
    },
    async editTask({ state, dispatch, commit }, { task }) {
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
    async removeGroup({ commit, state }, { groupId }) {
      try {
        await boardService.removeGroup(state.currBoardIdx, groupId);
        // commit({ type: "removeGroup", currBoardIdx: state.currBoardIdx });
      } catch (err) {
        console.log(err);
      }
    },

    async getTaskById({ state }, { taskId }) {
      try {
        const currTask = await boardService.getTaskById(taskId);
        return currTask;
      } catch (err) {
        console.log(err);
      }
    },
    async saveGroup({ commit, state }, { groupInfo }) {
      try {
        groupInfo.boardIdx = state.currBoardIdx;
        const currGroup = await boardService.saveGroup(groupInfo);
        commit({ type: "saveGroup", groupInfo });
        return currGroup;
      } catch (err) {
        console.log(err);
      }
    },
    async saveGroups({ commit, state }, { groupsInfo }) {
      try {
        console.log("groups", groupsInfo);
        groupsInfo.boardIdx = state.currBoardIdx;
        const currGroups = await boardService.saveGroups(groupsInfo);
        commit({ type: "saveGroups", groupsInfo });
        return currGroups;
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
};
