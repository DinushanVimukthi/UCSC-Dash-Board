import { objectToString } from "@vue/shared";
import Vue from "vue";
const userstore = (state, payload) => {
  state.users = payload;
};
const getcourse = (state, payload) => {
  state.courses[payload.ID] = payload.Type;
};
const updatecourse = (state, payload) => {
  Object.assign(state.courses[payload.ID], payload.Type);
};
const AddAllUsers = (state, payload) => {
  state.Allusers[payload.ID] = payload.Data;
};
const SetDate= (state, payload) => {
  state.Today = payload;
};
const UpdateAUser = (state, payload) => {
  Object.assign(state.Allusers[payload.ID], payload.Data);
};
const RemoveAUser = (state, ID) => {
  delete state.Allusers[ID];
};
const updateusers = (state, payload) => {
  console.log(payload);
  state.users = payload;
  // Object.assign(state.users[payload.ID],payload.Data)
};
const clearuser = (state) => {
  state.users = {};
  // console.log("Cleared");
};
const RemovecourseMut = (state, ID) => {
  delete state.courses[ID];
};
export {
  userstore,
  AddAllUsers,
  UpdateAUser,
  RemoveAUser,
  getcourse,
  clearuser,
  updatecourse,
  RemovecourseMut,
  updateusers,
  SetDate
};
