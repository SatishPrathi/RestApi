import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../rest/rest.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  product: any = {};

  constructor(private restService: RestService, private router: Router) {}

  createProduct(): void {
    this.restService.genericRestService(JSON.stringify(this.product), 'api/products').subscribe(
      () => this.router.navigate(['/product-list']),
      error => console.error('Error creating product', error)
    );
  }
}
