import { Component, OnInit, Input } from '@angular/core';
import {Categorie, CategoriesService} from '../../@core/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hexagone-big',
  templateUrl: './hexagone.component.html',
  styleUrls: ['./hexagone.component.scss']
})
export class HexagoneComponent implements OnInit {
  hexas = [/*9*/];
  hexas2 = [/*10*/];
  hexas3 = [/*9*/];
  hexas4 = [/*10*/];

  @Input() categories: Categorie[] | any = [];


  constructor(
    private router: Router,
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
      this.hexas = this.categories.slice(0, 8); // +odd
      this.hexas2 = this.categories.slice(8, 15); // even
      this.hexas3 = this.categories.slice(15, 23); // odd
      this.hexas4 = this.categories.slice(23, 30); // even
        // console.log('categories', categories);
        // console.log('categories hexa ', this.hexas, this.hexas.length);
        // console.log('categories hexa 2 ', this.hexas2, this.hexas2.length);

    });
  }

  navigateToDetail(name: string) {

    this.router.navigate([`/topic/${name}`]);
  }

}
