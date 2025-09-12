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
      console.log('=== setVisibleItems called ===');
      state.visibleItems = action.payload;
      state.lastUpdated = new Date().toISOString();
      
      console.log('Processing', action.payload.length, 'timeline items');
      
      // Extract and deduplicate technologies
      const allTechnologies = action.payload.flatMap((item, index) => {
        console.log(`\nItem ${index}:`, item.title);
        console.log('Raw technologies:', item.technologies);
        
        const techNames = item.technologies.map(tech => {
          console.log('Tech object:', tech);
          return tech.name || 'Unknown';
        });
        
        console.log('Extracted tech names:', techNames);
        return techNames;
      });
      
      console.log('\nAll technologies before dedupe:', allTechnologies);
      
      const uniqueTechs = Array.from(new Set(allTechnologies))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));
        
      console.log('Unique technologies after processing:', uniqueTechs);
      state.uniqueTechnologies = uniqueTechs;
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
