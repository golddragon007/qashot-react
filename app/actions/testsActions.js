import axios from '../utils/axios';
import {generateTestUrl} from "../utils/helper";
import store from "../store";

export function fetchTests() {
  let state = store.getState();
  if (!state.tests.pages[1]) {
    return {
      type: "FETCH_TESTS",
      payload: axios.get('api/rest/v1/test_list?_format=json')
    };
  }
  else {
    return {
      type: "UPDATE_CURRENT_PAGE_NUMBER",
      payload: 1,
    }
  }
}

export function fetchTestsByUrl(url) {
  let state = store.getState();
  let page = parseInt(url.match(/page=([0-9]*)/i)[1]);

  if (!state.tests.pages[page]) {
    return {
      type: "FETCH_TESTS",
      payload: axios.get(url)
    };
  }
  else {
    return {
      type: "UPDATE_CURRENT_PAGE_NUMBER",
      payload: page,
    }
  }
}

export function fetchTestsByPageAndLimit(page, limit) {
  let state = store.getState();
  if (!state.tests.pages[page]) {
    return {
      type: "FETCH_TESTS",
      payload: axios.get('api/rest/v1/test_list?_format=json&page=' + page + '&limit=' + limit)
    };
  }
  else {
    return {
      type: "UPDATE_CURRENT_PAGE_NUMBER",
      payload: page,
    }
  }
}

export function runTest(id) {
  return (dispatch) => {
    dispatch({type: "RUN_TEST_ONLY_ID", payload: id});
    dispatch({
      type: "RUN_TEST_ONLY_LISTER",
      payload: axios.post('api/rest/v1/qa_shot_test/' + id + '/queue?_format=json', {
        test_stage: "",
        type: "a_b",
        frontend_url: generateTestUrl(id),
      }),
    });
  };
}

export function deleteTest(id) {
  return (dispatch) => {
    dispatch({type: "DELETE_TEST_ID", payload: id});
    dispatch({
      type: "DELETE_TEST_LISTER",
      payload: axios.delete('api/rest/v1/qa_shot_test/' + id + '?_format=json'),
    });
  };
}