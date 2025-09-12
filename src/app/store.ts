import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import timelineReducer from '../features/timeline/timelineSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    timeline: timelineReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.viewport'],
        // Ignore these paths in the state
        ignoredPaths: ['timeline.visibleItems'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
