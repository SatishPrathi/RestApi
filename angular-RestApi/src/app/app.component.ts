import { Component, ViewChild, OnInit } from '@angular/core';
import { MenuComponent, MenuItemModel, MenuAnimationSettingsModel } from '@syncfusion/ej2-angular-navigations';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('menuContainer') menuObj: MenuComponent | undefined;

  public animationSettings: MenuAnimationSettingsModel = {
    effect: 'ZoomIn',
    duration: 800
  };

  public menuItems: MenuItemModel[] = [
    {
      text: 'Products',
      items: [
        {
          text: 'Product User',
          items: [
            { text: 'Create', url: '/products/create' },
            { text: 'Update', url: '/products/update' },
            { text: 'Delete', url: '/products/delete' },
            { text: 'List', url: '/products/list' }
          ]
        },
        {
          text: 'Product Owner',
          items: [
            { text: 'Create', url: '/products/create' },
            { text: 'Update', url: '/products/update' },
            { text: 'Delete', url: '/products/delete' },
            { text: 'List', url: '/products/list' }
          ]
        },
        {
          text: 'Product Admin',
          items: [
            { text: 'Create', url: '/products/create' },
            { text: 'Update', url: '/products/update' },
            { text: 'Delete', url: '/products/delete' },
            { text: 'List', url: '/products/list' }
          ]
        }
      ]
    },
    {
      text: 'Employees',
      items: [
        { text: 'Create', url: '/employees/create' },
        { text: 'Update', url: '/employees/update' },
        { text: 'Delete', url: '/employees/delete' },
        { text: 'List', url: '/employees/list' }
      ]
    },
    {
      text: 'About Us',
      items: [
        {
          text: 'Company',
          items: [
            { text: 'History', url: '/about/history' },
            { text: 'Mission', url: '/about/mission' },
            { text: 'Vision', url: '/about/vision' }
          ]
        },
        {
          text: 'Team',
          items: [
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

  public onClick(args: any): void {
    if (args.item.text === 'Logoff') {
      this.authService.logout();
      this.router.navigate(['/login']);
    } else if (args.item.url) {
      this.router.navigate([args.item.url]);
    }
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
