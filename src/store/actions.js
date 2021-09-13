'use strict';
import {post, get} from "@/store/ajaxUtil";
import {testList, testAdd, testRemove, testUpdate} from "@/store/api";

export default {
  setLoading(state, flag) {
    state.loading = flag;
    this.commit('session');
  },
  getTestList(store, {data, params, pathData}) {
    return post(testList, {data, params, pathData});
  },
  addTest(store, {data}){
    return post(testAdd, {data});
  },
  updateByIdTest(store, {data, pathData}){
    return post(testUpdate, {data, pathData});
  },
  removeTest(store, {pathData}){
    return get(testRemove, {pathData});
  }
}