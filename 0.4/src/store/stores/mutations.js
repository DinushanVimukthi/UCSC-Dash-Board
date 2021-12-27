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
const Set_Special_Events= (state, payload) => {
  state.Special_Events[payload.EventName] = payload.EventData;
};
const update_Special_Events= (state, payload) => {
  // state.Special_Events[payload.EventName] = payload.EventData;
  Object.assign(state.Special_Events[payload.EventName],payload.EventData);
};
const ClearEvents=(state)=>{
  state.Special_Events = {};
}
const Remove_Special_Events= (state, EventName) => {
  delete state.Special_Events[EventName];
};
export {
  userstore,
  Remove_Special_Events,
  update_Special_Events,
  ClearEvents,
  AddAllUsers,
  UpdateAUser,
  RemoveAUser,
  getcourse,
  clearuser,
  updatecourse,
  RemovecourseMut,
  updateusers,
  SetDate,
  Set_Special_Events
};
