const initialState = {
  user: null
  // {
  //   userId: null,
  //   userEmail: null
  // }
};

export default (state = initialState, action) => {
  //{ userId, userEmail } = action.payload;
  switch (action.type) {
    case "USER_SIGNUP":
      return {
        ...state,
        user: {
          userId: action.payload.userId,
          userEmail: action.payload.userEmail
        }
      };
      break;
    default:
      return state;
  }
};

//export default userReducer;
