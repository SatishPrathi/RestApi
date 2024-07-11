import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  username: string | null = null;
  role: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      // Decode token and set username and role
      // Example: Replace this with your actual decoding logic
      const userDetails:any = this.authService.getUserDetails();
      this.username = userDetails.userName;
      this.role = userDetails.role;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
