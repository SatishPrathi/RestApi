import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '@syncfusion/ej2-angular-navigations'; // Import the Syncfusion Menu module
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'; // Import AuthGuard if necessary
import { WelcomeComponent } from './welcome/welcome.component';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeModule } from './employee/employee.module';
import { ProductModule } from './product/product.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent
    // Any other components that belong directly to the AppModule
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
  providers: [ AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
