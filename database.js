export const boardDb = {
  _id: "b101",
  title: "Sprint 4",
  createdAt: 1589983468418,
  description:
    "Track your action items and improve for next sprint",
  createdBy: {
    _id: "u101",
    fullname: "Guy Shapira",
    imgUrl: "guy-img.jpeg",
  },
  style: {},
  labels: [
    {
      id: "l101",
      title: "Done",
      color: "#61bd4f",
    },
  ],
  members: [
    {
      _id: "u101",
      fullname: "Guy Shapira",
      imgUrl: "guy-img.jpeg",
    },
  ],
  groups: [
    {
      id: "g101",
      title: "Group 1",
      tasks: [
        {
          id: "t101",
          title: "Replace logo",
          labelId: "Done",
          description: "description",
          comments: [
            {
              id: "ZdPnm",
              txt: "also @yaronb please CR this",
              createdAt: 1590999817436,
              byMember: {
                _id: "u101",
                fullname: "Guy Shapira",
                imgUrl: "guy-img.jpeg",
              },
            },
            {
              id: "ZdPnm",
              txt: "also @yaronb please CR this",
              createdAt: 1590999817436,
              byMember: {
                _id: "u101",
                fullname: "Guy Shapira",
                imgUrl: "guy-img.jpeg",
              },
            },
          ],
        },
        {
          id: "t102",
          title: "Have to have full CRUD!",
          labelId: "Work",
          members: [
            {
              _id: "u101",
              username: "Guy",
              fullname: "Guy Shapira",
              imgUrl: "guy-img.jpeg",
            },
          ],
        },
        {
          id: "t103",
          title: "Let's do Dungeon & Dragons ",
          labelId: "Stuck",
          members: [
            {
              _id: "u101",
              username: "Ishay",
              fullname: "Ishay Nitzan",
              imgUrl:
                "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
            },
          ],
        },
      ],
      style: {},
    },
    {
      id: "g102",
      title: "Group 2",
      tasks: [
        {
          id: "t201",
          title: "Replace logo",
          labelId: "Stuck",
        },
        {
          id: "t202",
          title: "Add Samples",
          labelId: "Work",
        },
      ],
      style: {},
    },
    {
      id: "g103",
      title: "Group 3",
      tasks: [
        {
          id: "t301",
          title: "Do that",
          labelId: "Done",
          members: [
            {
              _id: "u101",
              username: "Sundos",
              fullname: "Sundos Gutty",
              imgUrl:
                "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
            },
            {
              _id: "u101",
              username: "Ishay",
              fullname: "Ishay Nitzan",
              imgUrl:
                "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
            },
          ],
        },
        {
          id: "t302",
          title: "Help me",
          description: "description",
          comments: [
            {
              id: "ZdPnm",
              txt: "also @yaronb please CR this",
              createdAt: 1590999817436.0,
              byMember: {
                _id: "u101",
                fullname: "Guy Shapira",
                imgUrl: "guy-img.jpeg",
              },
            },
          ],
          checklists: [
            {
              id: "YEhmF",
              title: "Checklist",
              todos: [
                {
                  id: "212jX",
                  title: "To Do 1",
                  isDone: false,
                },
              ],
            },
          ],
          members: [
            {
              _id: "u101",
              username: "Guy",
              fullname: "Guy Shapira",
              imgUrl: "guy-img.jpeg",
            },
          ],
          labelId: "Done",
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: "u101",
            username: "Guy",
            fullname: "Guy Shapira",
            imgUrl: "guy-img.jpeg",
          },
          style: {
            bgColor: "#26de81",
          },
        },
      ],
      style: {
        color: "#26de81",
        bgColor: "#26de81",
      },
    },
  ],
  activities: [
    {
      id: "a101",
      type: "name",
      createdAt: 154514,
      byMember: {
        _id: "u101",
        fullname: "Guy Shapira",
        imgUrl: "guy-img.jpeg",
      },
      task: {
        id: "t101",
        title: "Replace Logo",
      },
    },
    {
      id: "a102",
      type: "status",
      createdAt: 154514,
      byMember: {
        _id: "u101",
        fullname: "Guy Shapira",
        imgUrl: "guy-img.jpeg",
      },
      task: {
        id: "t101",
        title: "bipboop",
      },
    },
    {
      id: "a103",
      type: "member",
      createdAt: 154514,
      byMember: {
        _id: "u101",
        fullname: "Guy Shapira",
        imgUrl: "guy-img.jpeg",
      },
      task: {
        id: "t101",
        title: "say Hi",
      },
    },
  ],
  cmpsOrder: ["title-picker", "status-picker", "member-picker"],
};
