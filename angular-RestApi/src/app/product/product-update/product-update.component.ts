import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  product: Product = {
    productId: '',
    name: '',
    price: 0,
    discount: 0,
    location: '',
    category: '',
    owner: ''
  };
  id!: number;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProduct(this.id).subscribe(
      (data: Product) => this.product = data,
      (error) => console.error(error)
    );
  }

  updateProduct(): void {
    this.productService.updateProduct(this.id, this.product).subscribe(
      () => this.router.navigate(['/products']),
      (error) => console.error(error)
    );
  }
}
