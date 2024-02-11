import { TasksSlice } from './taskSlice'

const rootReducer = combineReducers({
	TasksSlice,
})

export const store = () => {
	return configureStore({
		reducer: rootReducer,
	})
}
