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
            { text: 'Create' },
            { text: 'Update' },
            { text: 'Delete' },
            { text: 'List' }
          ]
        },
        {
          text: 'Product Owner',
          items: [
            { text: 'Create' },
            { text: 'Update' },
            { text: 'Delete' },
            { text: 'List' }
          ]
        },
        {
          text: 'Product Admin',
          items: [
            { text: 'Create' },
            { text: 'Update' },
            { text: 'Delete' },
            { text: 'List' }
          ]
        }
      ]
    },
    {
      text: 'Employees',
      items: [
        { text: 'Create' },
        { text: 'Update' },
        { text: 'Delete' },
        { text: 'List' }
      ]
    },
    {
      text: 'About Us',
      items: [
        {
          text: 'Company',
          items: [
            { text: 'History' },
            { text: 'Mission' },
            { text: 'Vision' }
          ]
        },
        {
          text: 'Team',
          items: [
            { text: 'Leadership' },
            { text: 'Staff' }
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
    }
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
