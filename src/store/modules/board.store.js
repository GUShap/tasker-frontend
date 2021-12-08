import { boardService } from "@/services/board.service.js";
import { remoteBoardService } from "@/services/board.service-remote.js";
import { utilService } from "@/services/util.service.js";

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
      // state.sortedBoard = JSON.parse(JSON.stringify(state.currBoard));
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
      state.currBoard = board;
    },
    updateBoard(state, { board }) {
      state.currBoard = board;
      state.boards.splice(state.currBoardIdx, 1, board);
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
      state.currBoard.groups[groupIdx] = group;
    },
    hover(state, { isHover }) {
      state.isTaskDetailsHover = isHover;
    },
  },
  actions: {
    async loadBoards({ commit }, { currBoardIdx }) {
      try {
        const boards = await remoteBoardService.query();
        commit({ type: "setBoards", boards: boards, currBoardIdx });
        return boards;
      } catch (err) {
        console.log(err);
      }
    },
    async saveBoard({ commit }, { board }) {
      try {
        console.log("board", board);
        await remoteBoardService.save(board);
        commit({ type: "saveBoard", board });
      } catch (err) {
        console.log(err);
      }
    },
    async editTask({ state, dispatch, commit }, { taskInfo }) {
      try {
        const { task, taskIdx, groupIdx } = taskInfo;
        const boardCopy = JSON.parse(JSON.stringify(state.currBoard));
        if (task.id) {
          boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1, task);
        } else {
          task.id = utilService.makeId();
          boardCopy.groups[groupIdx].tasks.push(task);
        }

        const updatedBoard = await remoteBoardService.save(boardCopy);
        commit({ type: "updateBoard", board: updatedBoard });
      } catch (err) {
        console.log(err);
      }
    },

    async removeTask({ state, dispatch, commit }, { taskInfo }) {
      try {
        const { task, taskIdx, groupIdx } = taskInfo;
        const boardCopy = JSON.parse(JSON.stringify(state.currBoard));
        boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1);

        const updatedBoard = await remoteBoardService.save(boardCopy);
        console.log("updatedBoard id:", updatedBoard._id);
        commit({ type: "updateBoard", board: updatedBoard });
      } catch (err) {
        console.log(err);
      }
    },

    async editGroup({ state, dispatch, commit }, { groupInfo }) {
      try {
        const { group, groupIdx } = groupInfo;
        console.log(group);
        const boardCopy = JSON.parse(JSON.stringify(state.currBoard));
        boardCopy.groups.splice(groupIdx, 1, group);

        const updatedBoard = await remoteBoardService.save(boardCopy);
        commit({ type: "updateBoard", board: updatedBoard });
      } catch (err) {
        console.log(err);
      }
    },

    async addNewGroup({ state, dispatch, commit }) {
      try {
        const newGroup = await remoteBoardService.getEmptyGroup();
        const boardCopy = JSON.parse(JSON.stringify(state.currBoard));
        boardCopy.groups.unshift(newGroup);

        const updatedBoard = await remoteBoardService.save(boardCopy);
        commit({ type: "updateBoard", board: updatedBoard });
      } catch (err) {
        console.log(err);
      }
    },

    async removeGroup({ state, dispatch, commit }, { groupInfo }) {
      try {
        const { groupIdx } = groupInfo;
        const boardCopy = JSON.parse(JSON.stringify(state.currBoard));
        boardCopy.groups.splice(groupIdx, 1);

        const updatedBoard = await remoteBoardService.save(boardCopy);
        commit({ type: "updateBoard", board: updatedBoard });
      } catch (err) {
        console.log(err);
      }
    },

    async addNewBoard({ state, dispatch, commit }) {
      try {
        // take to component and only save board with backend
        // const newBoard = remoteBoardService.getEmptyBoard()
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
    // async saveGroups({ commit, state }, { groupsInfo }) {
    //   try {
    //     console.log("groups", groupsInfo);
    //     groupsInfo.boardIdx = state.currBoardIdx;
    //     const currGroups = await boardService.saveGroups(groupsInfo);
    //     commit({ type: "saveGroups", groupsInfo });
    //     return currGroups;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
  modules: {},
};
