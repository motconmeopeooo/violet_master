import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductFacade } from 'src/libs/cores/services/product/product.facade';
import { LoadingComponent } from 'src/libs/cores/components';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IProductForm } from './product.form';
import { IProduct } from '../../cores/models/product.model';
import { tap } from 'rxjs';
import { CartFacade } from 'src/libs/cores/services/cart/cart.facade';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ReactiveFormsModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  product$ = this.productFacade.product$;
  isLoading = false;
  form!: FormGroup<IProductForm>;
  activeIndex = 0;
  constructor(
    private route: ActivatedRoute,
    private productFacade: ProductFacade,
    private cartFacade: CartFacade
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      const id = params['id']; // 'id' should match the parameter name in the route
      if (id) {
        this.productFacade
          .getById(id)
          .pipe(tap((prd) => this.createForm(prd)))
          .subscribe(() => (this.isLoading = false));
      }
    });
  }
  private createForm(product: IProduct) {
    this.form = new FormGroup({
      name: new FormControl(product.name, {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      id: new FormControl(product._id, {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      size: new FormControl(product.size[0], {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),

      quantity: new FormControl(1, {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      price: new FormControl(product.price, {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      image: new FormControl(product.image, {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
    });
  }
  convertColor(colorCode: string) {
    return `bg-[${colorCode}]`;
  }
  setSize(size: string, index: number) {
    this.activeIndex = index;
    this.form.controls.size.setValue(size);
  }

  addToCart() {
    const { image, name, price, quantity, size, id } = this.form.value;
    this.cartFacade.addToCart({
      image,
      name,
      price,
      quantity,
      size,
      id,
    });
    console.log(this.form.value);
  }

  setQuantity(event: any) {
    const value = +event.target.value;
    if (value > 99) {
      this.form.controls.quantity.setValue(99);
    }
    if (value < 99 && value > 0) {
      this.form.controls.quantity.setValue(value);
    }
    if (value < 0) {
      this.form.controls.quantity.setValue(0);
    }
  }
}
