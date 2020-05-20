import {Image} from './image.model';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';

export interface ImagesState extends EntityState<Image, string> {

}

const initialState = {};

@Injectable({
    providedIn: 'root'
})
@StoreConfig({name: 'images', idKey: '_id'})
export class ImagesStore extends EntityStore<ImagesState> {
    constructor() {
        super(initialState);
    }
}
