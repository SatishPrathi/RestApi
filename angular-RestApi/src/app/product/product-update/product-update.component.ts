import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../rest/rest.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  product: any = {};

  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.restService.genericRestService('', `api/products/${id}`).subscribe(
      data => this.product = data,
      error => console.error('Error fetching product', error)
    );
  }

  updateProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.restService.genericRestService(JSON.stringify(this.product), `api/products/${id}`).subscribe(
      () => this.router.navigate(['/product-list']),
      error => console.error('Error updating product', error)
    );
  }
}
