import { createSlice } from "@reduxjs/toolkit"

interface State {
  projectModalOpen: boolean
}
const initialState: State = {
  projectModalOpen: false
}
export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    openProjectModal(state, action) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state, action) {
      state.projectModalOpen = false;
    }
  }
})