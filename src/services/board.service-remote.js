import { httpService } from "./http.service";
import { utilService } from "./util.service";
import { storageService } from "./storage.service";

const KEY = "gBoards";

export const remoteBoardService = {
  query,
  remove,
  save,
  getById,
  getEmptyGroup,
  getColors,
  getTaskById,
  getTaskRouteIdx,
  filterBy,
};

const BASE_URL = process.env.NODE_ENV !== "development" ? "board" : "board";

async function query(filterBy = null) {
  try {
    return await httpService.get(BASE_URL, filterBy);
  } catch (err) {
    console.log("error:", err);
  }
}

async function getById(id) {
  try {
    return await httpService.get(BASE_URL + `/${id}`);
  } catch (err) {
    console.log("error:", err);
  }
}

async function remove(id) {
  try {
    return await httpService.delete(BASE_URL + `/${id}`);
  } catch (err) {
    console.log("error:", err);
  }
}

async function save(board) {
  try {
    return board._id
      ? await httpService.put(BASE_URL + `/${board._id}`, { board })
      : await httpService.post(BASE_URL, { board });
  } catch (err) {
    console.log("error:", err);
  }
}

async function getTaskById(taskId) {
  try {
    const boards = await query();
    var currTask;
    boards.forEach((board) => {
      board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.id === taskId) currTask = task;
        });
      });
    });
    return currTask;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

async function getTaskRouteIdx(task, boardIdx) {
  try {
    const boards = await query();

    var groupIdx = null;
    var taskIdx = null;
    const groups = boards[boardIdx].groups;
    groups.forEach((g, idx) => {
      if (
        g.tasks.some((t, idx) => {
          if (t.id === task.id) {
            taskIdx = idx;
            return true;
          }
        })
      ) {
        groupIdx = idx;
      }
    });
    return {
      task,
      taskIdx,
      groupIdx,
      activity: { type: "title", newVal: task.title },
    };
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}

function _getBoardCopy(boardId) {
  const board = todoService.getById(boardId);
  return JSON.parse(JSON.stringify(board));
}

function filterBy(board, filterBy) {
  const regex = new RegExp(filterBy.val, "i");
  console.log(regex)
  var boardCopy = JSON.parse(JSON.stringify(board));
  if (filterBy.filter === "searchKey") {
    if (!filterBy.filter.type) {
      boardCopy.groups = boardCopy.groups.map((group) => {
        group.tasks = group.tasks.filter((task) => {
          if (!filterBy.val) return true;
          console.log("task", task);
          return regex.test(task.title)
            ? true
            : regex.test(task.status)
              ? true
              : regex.test(task.priority);
        });
        return group;
      });
    }
  }
  else if (filterBy.filter === 'all') {
    return boardCopy;
  }
  else if (filterBy.filter === 'title') {
    boardCopy.groups = boardCopy.groups.filter((group) => {
      return regex.test(group.title)
    })
  }
  // else if (filterBy.filter === 'member') {
  //   boardCopy.groups = boardCopy.groups.map((group) => {
  //     group.tasks.map((task) => {
  //       task.members.filter((member) => {
  //         return regex.test(member.fullname)
  //       })
  //     })
  //   })
  // }
  else if (filterBy.filter === 'status') {
    boardCopy.groups = boardCopy.groups.map((group) => {
      group.tasks.filter((task) => {
        return regex.test(task.status)
      })
    })
  }
  return boardCopy;
}

async function getEmptyGroup() {
  try {
    return {
      title: "New group",
      id: utilService.makeId(),
      tasks: [],
      style: {
        color: "#579bfc",
      },
    };
  } catch (err) {
    console.log(err);
  }
}

function getColors() {
  return [
    {
      name: "darkGreen",
      hexCode: "#037f4",
    },
    {
      name: "green",
      hexCode: "#00c875",
    },

    {
      name: "yellowGreen",
      hexCode: "#9cd326",
    },
    {
      name: "beige",
      hexCode: "#cab641",
    },
    {
      name: "yellow",
      hexCode: "#ffcb00",
    },
    {
      name: "darkPurple",
      hexCode: "#784bd1",
    },
    {
      name: "purple",
      hexCode: "#a25ddc",
    },
    {
      name: "turquoise",
      hexCode: "#0086BE",
    },
    {
      name: "blue",
      hexCode: "#579bfc",
    },
    {
      name: "lightBlue",
      hexCode: "#66ccff",
    },
    {
      name: "darkRed",
      hexCode: "#bb3354",
    },
    {
      name: "red",
      hexCode: "#e2445c",
    },
    {
      name: "darkOrange",
      hexCode: "#ff642e",
    },
    {
      name: "orange",
      hexCode: "#fdab3d",
    },
    {
      name: "brown",
      hexCode: "#7f5347",
    },
  ];
}
