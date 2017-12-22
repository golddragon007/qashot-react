export default function reducer(state={
  user: {},
  loginname: "",
  password: "",
  csrfToken: "",
  success: false,
}, action) {

  switch (action.type) {
    case "LOAD_FROM_LOCAL_STORAGE": {
      if (typeof action.data !== "undefined" && typeof action.data.user !== "undefined") {
        return action.data.user;
      }
      return state;
    }
    case "LOGIN_PENDING": {
      return {...state, error: null};
    }
    case "LOGIN_REJECTED": {
      return {...state, success: false};
    }
    case "LOGIN_FULFILLED": {
      return {
        ...state,
        user: action.payload.data,
        success: true,
      };
    }
    case "GET_CSRF_TOKEN_FULFILLED": {
      return {
        ...state,
        csrfToken: action.payload.data,
      };
    }
    case "SET_LOGIN_DATA": {
      return {
        ...state,
        loginname: action.payload.loginname,
        password: action.payload.password,
      }
    }
  }

  return state;
}
