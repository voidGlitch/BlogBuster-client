//So reducer is a function that accepts the state and action and then based on the action type it perform the logic inside the action.type
/*more specifically return the action or the state changed by the action */
import {
  FETCH_ALL,
  UPDATE,
  DELETE,
  LIKE,
  CREATE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
} from "../constants/actionTypes";
/*🤔As we are dealing with Posts data so we rename state as posts for now */
export default (state = { isLoading: true, posts: [] }, action) => {
  //State should always be equal to something we can set it as nothing or null
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL:
      console.log(state);
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberofPages: action.payload.numberofPages,
      };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };

    case FETCH_POST:
      return { ...state, post: action.payload };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
          //Return all the other post normally..
          //change the post that just received a comment...
        }),
      };

    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case LIKE:
      //Going to map inside the post to check if the currently selected post id is matched with updated post id
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case CREATE:
      //Gonna return the post previously on the array and then the new Post
      return { ...state, posts: [...state.posts, action.payload] };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};
