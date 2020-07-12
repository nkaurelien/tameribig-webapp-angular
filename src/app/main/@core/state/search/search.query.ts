import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {SearchState, SearchStore} from './search.store';

@Injectable({
  providedIn: 'root'
})
export class SearchQuery extends Query<SearchState> {


  error$ = this.selectError();
  allState$ = this.select();
  selectImages$ = this.select('images');
  selectSuggestions$ = this.select('suggestions');
  selectCreations$ = this.select('creations');

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
