import { Component, ViewChild } from '@angular/core';
import { MenuComponent, MenuItemModel, MenuAnimationSettingsModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MenuComponent) menuObj: MenuComponent | undefined;

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
      text: 'Services',
      items: [
        {
          text: 'Consulting',
          items: [
            { text: 'Service A' },
            { text: 'Service B' }
          ]
        },
        {
          text: 'Support',
          items: [
            { text: 'Technical Support' },
            { text: 'Customer Support' }
          ]
        }
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
    { text: 'Careers' },
    { text: 'Sign In' }
  ];

  public beforeOpen(args: any): void {
    // Additional handling if needed
  }

  public onClick(args: any): void {
    // Handle submenu actions based on item clicked
  }
}
