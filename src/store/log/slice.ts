import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format, getDate, getMonth, getYear } from "date-fns";

export enum MediaType {
    Movie = "MOVIE",
    Short = "SHORT",
    TV = "TV",
    Book = "BOOK",
    Play = "PLAY",
    ShortStory = "SHORT_STORY"
}

interface Entry {
    id: string;
    type: MediaType;
    name: string;
    watchedTime: string;
    year: number;
    month: number;
    day: number;
}
  
interface LogState {
    readonly entries: {
      byId: {
        [id: string]: Entry
      };
      allIds: string[];
    };
}
  
export const initialState: LogState = {
    entries: {
        byId: {},
        allIds: [],
    },
};
  
export const { actions, reducer } = createSlice({
    name: "log",
    initialState,
    reducers: {
      logEntry: (state, action: PayloadAction<{ id: string; type: MediaType; name: string; watchedTime: Date; }>) => {
        const id = action.payload.id;

        const entrty: Entry = {
            id,
            name: action.payload.name,
            type: action.payload.type,
            watchedTime: format(action.payload.watchedTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
            year: getYear(action.payload.watchedTime),
            month: getMonth(action.payload.watchedTime),
            day: getDate(action.payload.watchedTime),
        };

        state.entries.byId[id] = entrty;

        state.entries.allIds.push(id);
      },
    }  
});
