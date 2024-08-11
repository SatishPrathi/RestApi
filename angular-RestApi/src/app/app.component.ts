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
    // Check if the user is logged in
    if (!this.authService.isLoggedIn()) {
      // Redirect to the login page if not logged in
      this.router.navigate(['/login']);
    }
  }

  public onClick(args: any): void {
    if (args.item.text === 'Logoff') {
      // Log out the user and navigate to the login page
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  public isLoggedIn(): boolean {
    // Return the login status
    return this.authService.isLoggedIn();
  }
}
