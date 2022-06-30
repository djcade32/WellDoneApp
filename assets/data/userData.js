const User = [
  {
    id: 94134,
    first: "Norman",
    last: "Cade",
    gender: "Male",
    houseHoldInvites: [
      {
        userId: 23454,
        houseHoldId: 321,
        status: "PENDING",
      },
    ],
    houseHoldIds: [123, 321, 334],
    userDoneChores: [
      {
        houseHoldId: 123,
        choreId: 2341,
        timeCompleted: "12:00:32",
        dateCompleted: "12/30/2021",
      },
    ],
  },

  {
    id: 23454,
    first: "Chloe",
    last: "Habelreeh",
    gender: "Female",
    houseHoldIds: [123, 321, 334],
    userDoneChores: [
      {
        houseHoldId: 123,
        choreId: 2341,
        timeCompleted: "12:00:32",
        dateCompleted: "12/30/2021",
      },
    ],
  },

  {
    id: 23111,
    first: "David",
    last: "Spencer",
    gender: "Male",
    houseHoldIds: [123, 321, 334],
    userDoneChores: [
      {
        houseHoldId: 123,
        choreId: 2341,
        timeCompleted: "12:00:32",
        dateCompleted: "12/30/2021",
      },
    ],
  },
];

const HouseHold = [
  {
    id: 123,
    createdBy: 94134,
    houseHoldUsers: [94134, 43221, 99001],
    numberOfMembers: 3,
    availableChores: [
      {
        id: 2341,
        name: "Clean kitchen",
        points: 25,
        icon: "dish",
      },
      {
        id: 2451,
        name: "Clean bathroom",
        points: 25,
        icon: "bath",
      },
      {
        id: 1241,
        name: "Vaccum floors",
        points: 15,
        icon: "vaccum",
      },
    ],
  },
];

export default { User, HouseHold };
