import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public menuItems: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in; if not, redirect to login
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      // Setup the menu based on the user's role
      this.setupMenuBasedOnRole();
    }
  }

  private setupMenuBasedOnRole(): void {
    // Fetch user details from AuthService
    const userDetails = this.authService.getUserDetails();
    const userRole = userDetails.role;

    // Initialize an empty menuItems array
    this.menuItems = [];

    // Add role-specific menu items
    if (userRole === 'ROLE_EMPLOYEE') {
      this.menuItems.push({
        text: 'Employee',
        subItems: [
          { text: 'Create', url: '/employee/create' },
          { text: 'List', url: '/employee/list' }
        ]
      });
    }

    if (userRole === 'PRODUCT_OWNER' || userRole === 'PRODUCT_ADMIN') {
      this.menuItems.push({
        text: 'Products',
        subItems: [
          { text: 'Create', url: '/products/create' },
          { text: 'List', url: '/products/list' }
        ]
      });
    }

    // Common menu items for all users
    this.menuItems.push(
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
    );
  }

  public onClick(item: any): void {
    if (item.text === 'Logoff') {
      this.authService.logout();
      this.router.navigate(['/login']);
    } else if (item.url) {
      this.router.navigate([item.url]);  // Navigates to the item's URL
    }
  }
  

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
