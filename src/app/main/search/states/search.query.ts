import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {uniqBy} from 'lodash';
import {createSuggestion, SearchState, SearchStore} from './search.store';
import {SearchSuggestion} from '../models/SearchSuggestion';

@Injectable({
  providedIn: 'root'
})
export class SearchQuery extends Query<SearchState> {


  error$ = this.selectError();
  allState$ = this.select();
  selectImages$ = this.select('images');
  selectSuggestions$ = this.select('suggestions');
  selectCreations$ = this.select('creations');

  pushSuggestion = (suggestion: SearchSuggestion) => state => {
    let newState = {suggestion, ...state};
    newState = uniqBy(newState, 'searchMd5');
    return this.store.update(newState);
  }

  pushNewSuggestion = (searchText: string) => state => {
    this.pushSuggestion(createSuggestion({search: searchText}));
  }

  // Returns { name, age }
  // multiProps$ = this.select(['name', 'age']);

  // Returns [name, age]
  // multiPropsCallback$ = this.select(
  //   [state => state.name, state => state.age]
  // )

  constructor(protected store: SearchStore) {
    super(store);
  }
}
