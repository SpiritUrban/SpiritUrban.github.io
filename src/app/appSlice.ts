import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  theme: 'light' | 'dark';
  language: 'en' | 'ru';
  isMenuOpen: boolean;
  // Add more state properties as needed
}

const initialState: AppState = {
  theme: 'light',
  language: 'en',
  isMenuOpen: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLanguage: (state, action: PayloadAction<'en' | 'ru'>) => {
      state.language = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    // Add more reducers as needed
  },
});

export const { toggleTheme, setLanguage, toggleMenu } = appSlice.actions;
export default appSlice.reducer;
