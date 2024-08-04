import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/AuthService';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public menuData: MenuItemModel[] = [];
  public userRole: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
      this.setMenuBasedOnRole(role);
    });
  }

  private setMenuBasedOnRole(role: string) {
    switch(role) {
      case 'ROLE_ADMIN':
        this.menuData = [
          { text: 'Dashboard', items: [{ text: 'Admin Dashboard', url: '/admin-dashboard' }] },
          { text: 'Products', items: [{ text: 'Manage Products', url: '/owner-dashboard' }] },
          // Add more admin menu items here
        ];
        break;
      case 'ROLE_OWNER':
        this.menuData = [
          { text: 'Dashboard', items: [{ text: 'Owner Dashboard', url: '/owner-dashboard' }] },
          { text: 'Products', items: [{ text: 'Manage My Products', url: '/owner-dashboard' }] },
          // Add more owner menu items here
        ];
        break;
      case 'ROLE_USER':
        this.menuData = [
          { text: 'Dashboard', items: [{ text: 'User Dashboard', url: '/user-dashboard' }] },
          { text: 'Products', items: [{ text: 'View Products', url: '/user-dashboard' }] },
          // Add more user menu items here
        ];
        break;
      default:
        this.menuData = [];
        break;
    }
  }
}
