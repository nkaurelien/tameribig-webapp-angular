import { Component, OnInit } from '@angular/core';
import {Categorie, CategoriesService} from '../../@services/categories.service';

@Component({
  selector: 'app-hexagone',
  templateUrl: './hexagone.component.html',
  styleUrls: ['./hexagone.component.scss']
})
export class HexagoneComponent implements OnInit {
  hexas = [/*9*/];

  hexas2 = [/*10*/];
  private categories: Categorie[] | any;


  constructor(
    private  categoriesService: CategoriesService,
  ) { }

  hexaRandomClass () {
    const min = 1;
    const max = 8;
    const random =  Math.floor(Math.random() * (+max - +min)) + +min;
    return 'hexagon hexagon' + random;
  }

  ngOnInit() {
    this.categoriesService.categories$.subscribe(categories => {
      this.categories = categories.map( cat => {
        cat.subclass = this.hexaRandomClass();
        return cat;
      });
      this.hexas = this.categories.slice(0, 8);
      this.hexas2 = this.categories.slice(8, 15);
      console.log('categories', categories);
      console.log('categories hexa ', this.hexas, this.hexas.length);
      console.log('categories hexa 2 ', this.hexas2, this.hexas2.length);

    });
  }

}
