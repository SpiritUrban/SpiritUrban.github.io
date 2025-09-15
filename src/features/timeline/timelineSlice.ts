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

interface TechnologyItem {
  name: string;
  position: ScreenPosition;
}

interface TimelineItem {
  index: number;
  title: string;
  year: string;
  company: string;
  technologies: TechnologyItem[];
  visibility: string;
  screenPosition: {
    viewport: ScreenPosition['viewport'];
    absolute: ScreenPosition['absolute'];
    percentage: {
      fromTop: string;
      fromLeft: string;
      visibleHeight: string;
    };
  };
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
  uniqueTechnologies: string[];
}

const initialState: TimelineState = {
  visibleItems: [],
  lastUpdated: null,
  uniqueTechnologies: [],
};

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    setVisibleItems(state, action: PayloadAction<TimelineItem[]>) {
      state.visibleItems = action.payload;
      state.lastUpdated = new Date().toISOString();
      
      // Extract and deduplicate technologies
      const allTechnologies = action.payload.flatMap((item) => {
        return item.technologies.map(tech => tech.name || 'Unknown');
      });
      
      state.uniqueTechnologies = Array.from(new Set(allTechnologies))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));
    },
    clearVisibleItems(state) {
      state.visibleItems = [];
      state.lastUpdated = new Date().toISOString();
      state.uniqueTechnologies = [];
    },
  },
});

export const { setVisibleItems, clearVisibleItems } = timelineSlice.actions;
export default timelineSlice.reducer;
