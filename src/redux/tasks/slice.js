import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../../redux/auth/operations';
import { fetchTasks, addTask, deleteTask } from './operation';

const handlePending = state => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    extraReducers: {
        [fetchTasks.pending]: handlePending,
        [addTask.pending]: handlePending,
        [deleteTask.pending]: handlePending,
        [fetchTasks.rejected]: handleRejected,
        [addTask.rejected]: handleRejected,
        [deleteTask.rejected]: handleRejected,
        [fetchTasks.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
        },
        [addTask.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload);
        },
        [deleteTask.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            const index = state.items.findIndex(
                task => task.id === action.payload.id
            );
            state.items.splice(index, 1);
        },
        [logOut.fulfilled](state) {
            state.items = [];
            state.error = null;
            state.isLoading = false;
        },
    },



    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchTasks.pending, handlePending)
    //         .addCase(addTask.pending, handlePending)
    //         .addCase(deleteTask.pending, handlePending)
    //         .addCase(fetchTasks.rejected, handleRejected)
    //         .addCase(addTask.rejected, handleRejected)
    //         .addCase(deleteTask.rejected, handleRejected)
    //         .addCase(fetchTasks.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.error = null;
    //             state.items = action.payload;
    //         })
    //         // .addCase(addTask.fulfilled, (state, action) => {
    //         //     state.isLoading = false;
    //         //     state.error = null;
    //         //     state.items.push(action.payload);
    //         // })

    //         .addCase(addTask.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.error = null;
    //             state.items.push(action.payload);
    //         })
    //         // .addCase(deleteTask.fulfilled, (state, action) => {
    //         //     state.isLoading = false;
    //         //     state.error = null;
    //         //     const index = state.items.findIndex(
    //         //         task => task.id === action.payload.id
    //         //     );
    //         //     state.items.splice(index, 1);
        
    //         .addCase(deleteTask.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.error = null;
    //             state.items = state.items.filter(
    //                 task => task.id !== action.payload.id
    //             )
    //         })
    //         .addCase(logOut.fulfilled, (state) => {
    //             state.items = [];
    //             state.error = null;
    //             state.isLoading = false;
    //         });
    // }

});

export const tasksReducer = tasksSlice.reducer;