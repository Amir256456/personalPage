import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	tasks: {},
	isLoading: false,
}

// export const createUser = createAsyncThunk(
// 	'user/createUser',
// 	async function ({ email, password, userName }) {
// 		const response = await UserService.createUser(email, password, userName)
// 		return response.data
// 	}
// )

export const TasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// 	builder.addCase(createUser.pending, (state, action) => {
		// 		state.isLoading = true
		// 	})
		// 	builder.addCase(createUser.fulfilled, (state, action) => {
		// 		if (action.payload.status === 'SUCCESS') {
		// 			localStorage.setItem('user', JSON.stringify(action.payload.data))
		// 			state.user = action.payload.data
		// 			state.error = ''
		// 		} else {
		// 			if (action.payload.message === 'User with this email already exists') {
		// 				state.error = 'Пользователь с таким e-mail уже существует'
		// 			}
		// 		}
		// 		state.isLoading = false
		// 	})
		// 	builder.addCase(createUser.rejected, (state, action) => {
		// 		state.isLoading = false
		// 	})
	},
})

export const {} = TasksSlice.actions
export default TasksSlice.reducer
