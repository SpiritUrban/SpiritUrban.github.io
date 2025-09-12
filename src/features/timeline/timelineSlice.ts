import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ScreenPosition {
  viewport: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
  };
  absolute: {
    top: number;
    left: number;
  };
}

interface TechnologyPosition {
  name: string;
  position: ScreenPosition;
}

interface TimelineItem {
  index: number;
  title: string;
  year: string;
  visibility: string;
  screenPosition: ScreenPosition & {
    percentage: {
      fromTop: string;
      fromLeft: string;
      visibleHeight: string;
    };
  };
  technologies: TechnologyPosition[];
  viewport: {
    width: number;
    height: number;
    scrollY: number;
    scrollX: number;
  };
}

interface TimelineState {
  visibleItems: TimelineItem[];
  lastUpdated: string | null;
}

const initialState: TimelineState = {
  visibleItems: [],
  lastUpdated: null,
};

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    setVisibleItems: (state, action: PayloadAction<TimelineItem[]>) => {
      state.visibleItems = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    clearVisibleItems: (state) => {
      state.visibleItems = [];
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const { setVisibleItems, clearVisibleItems } = timelineSlice.actions;
export default timelineSlice.reducer;
