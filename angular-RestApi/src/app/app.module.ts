import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthService } from './auth.service';
import { RestService } from './rest/rest.service';
import { AuthGuard } from './auth.guard';
import { InvalidComponent } from './employee/invalid/invalid.component';
//import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    InvalidComponent,
   // Page404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    EmployeeModule,
    ProductModule,
    MenuModule
  ],
  providers: [AuthService, RestService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
