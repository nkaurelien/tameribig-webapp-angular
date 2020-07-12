import {Store, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {SearchResponseItem} from './SearchResponseItem';
import {SearchSuggestion} from './SearchSuggestion';

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

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'search', resettable: true})
export class SearchStore extends Store<SearchState> {
  constructor() {
    super(createInitialState());
  }
}
