import {Store, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {SearchResponseItem} from '../models/SearchResponseItem';
import {SearchSuggestion} from '../models/SearchSuggestion';

export interface SearchState {
  images: SearchResponseItem[];
  creations: SearchResponseItem[];
  audios: SearchResponseItem[];
  videos: SearchResponseItem[];
  suggestions: SearchSuggestion[];
}


const initialState = {
  images: [],
  creations: [],
  audios: [],
  videos: [],
  suggestions: [],
};

export function createInitialState(): SearchState {
  return initialState;
}

export function createSuggestion(suggestion: Partial<SearchSuggestion>): SearchSuggestion {
  return {
    _id: undefined,
    updatedAt: undefined,
    createdAt: undefined,
    results: [],
    lastUsedAt: undefined,
    useCount: undefined,
    __v: undefined,
    search: undefined,
    searchMd5: undefined,
    type: undefined,
    ...suggestion,
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'search', resettable: true})
export class SearchStore extends Store<SearchState> {
  constructor() {
    super(createInitialState());
  }
}
