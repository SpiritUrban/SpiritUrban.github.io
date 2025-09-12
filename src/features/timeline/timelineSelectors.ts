import type { RootState } from '../../app/store';

export const selectVisibleItems = (state: RootState) => state.timeline.visibleItems;
export const selectUniqueTechnologies = (state: RootState) => state.timeline.uniqueTechnologies;
export const selectLastUpdated = (state: RootState) => state.timeline.lastUpdated;
