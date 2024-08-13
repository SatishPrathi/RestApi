import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  product: Product = {
    productId: '',
    name: '',
    price: 0,
    discount: 0,
    location: '',
    category: '',
    owner: ''
  };

  constructor(private productService: ProductService, private router: Router) { }

  createProduct(): void {
    this.productService.createProduct(this.product).subscribe(
      () => this.router.navigate(['/products']),
      (error) => console.error(error)
    );
  }
}
