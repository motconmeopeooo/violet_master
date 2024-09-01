import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductFacade } from 'src/libs/cores/services/product/product.facade';
import { debounce, delay, delayWhen, tap } from 'rxjs';
import { LoadingComponent } from 'src/libs/cores/components';
import { IBaseParams } from 'src/libs/cores/models/product.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  products$ = this.productFacade.products$;
  isLoading = false;
  sort = 1;
  sortObject!: IBaseParams;
  constructor(private productFacade: ProductFacade) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.productFacade
      .getAll()
      .pipe(
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }
  changeSort(e: any) {
    this.sort = +e.target.value;
    let sortObj: IBaseParams = {};
    switch (this.sort) {
      case 1:
        sortObj.sortBy = 'price';
        sortObj.sort = 1;
        break;
      case 2:
        sortObj.sortBy = 'price';
        sortObj.sort = -1;
        break;
      case 3:
        sortObj.sortBy = 'name';
        sortObj.sort = 1;
        break;
      case 4:
        sortObj.sortBy = 'name';
        sortObj.sort = -1;
        break;
    }
    this.isLoading = true;
    this.sortObject = sortObj;
    this.productFacade
      .getAll(sortObj)
      .pipe(
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  searchInput(e: any) {
    this.sortObject = { ...this.sortObject, search: e.target.value };
    this.isLoading = true;
    this.productFacade
      .getAll(this.sortObject)
      .pipe(
        delay(500),
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }
}
