import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest/rest.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private restService: RestService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.restService.genericRestService('', 'api/products').subscribe(
      data => this.products = data,
      error => console.error('Error fetching products', error)
    );
  }
}
