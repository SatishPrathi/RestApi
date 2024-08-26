import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Menu items array
  public menuItems: any[] = [
    {
      text: 'Products',
      subItems: [
        {
          text: 'Product User',
          subItems: [
            { text: 'Create', url: '/products/create' },
            { text: 'Update', url: '/products/update' },
            { text: 'Delete', url: '/products/delete' },
            { text: 'List', url: '/products/list' }
          ]
        },
        {
          text: 'Product Owner',
          subItems: [
            { text: 'Create', url: '/products/create' },
            { text: 'Update', url: '/products/update' },
            { text: 'Delete', url: '/products/delete' },
            { text: 'List', url: '/products/list' }
          ]
        },
        {
          text: 'Product Admin',
          subItems: [
            { text: 'Create', url: '/products/create' },
            { text: 'Update', url: '/products/update' },
            { text: 'Delete', url: '/products/delete' },
            { text: 'List', url: '/products/list' }
          ]
        }
      ]
    },
    {
      text: 'Employee',
      subItems: [
        { text: 'Create', url: '/employees/create' },
        { text: 'Update', url: '/employees/update/1' }, // Example of updating with a specific ID
        { text: 'Delete', url: '/employees/delete/1' }, // Example of deleting with a specific ID
        { text: 'List', url: '/employees/list' }
      ]
    },
    {
      text: 'About Us',
      subItems: [
        {
          text: 'Company',
          subItems: [
            { text: 'History', url: '/about/history' },
            { text: 'Mission', url: '/about/mission' },
            { text: 'Vision', url: '/about/vision' }
          ]
        },
        {
          text: 'Team',
          subItems: [
            { text: 'Leadership', url: '/about/leadership' },
            { text: 'Staff', url: '/about/staff' }
          ]
        }
      ]
    },
    { text: 'Logoff' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  public onClick(item: any): void {
    if (item.text === 'Logoff') {
      this.authService.logout();
      this.router.navigate(['/login']);
    } else if (item.url) {
      this.router.navigate([item.url]);
    }
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
