// NGRX
import {ActionReducerMap} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';


// tslint:disable-next-line:no-empty-interface
export interface AppState {
}

export const reducers: ActionReducerMap<AppState> = {router: routerReducer};

