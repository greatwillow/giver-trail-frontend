export const userSignup = (userId, userEmail) => ({
  type: "USER_SIGNUP",
  payload: {
    userId,
    userEmail
  }
});
