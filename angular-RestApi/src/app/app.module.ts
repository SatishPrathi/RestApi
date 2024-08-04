import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { LoginComponent } from './auth/login/login.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { OwnerDashboardComponent } from './dashboard/owner-dashboard/owner-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { MenuComponent } from './shared/menu/menu.component';  // Import Syncfusion Menu Module

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    OwnerDashboardComponent,
    AdminDashboardComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenuModule  // Include Syncfusion Menu Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
