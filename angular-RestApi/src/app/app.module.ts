import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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

// PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';  // For Toast notifications
import { MessagesModule } from 'primeng/messages';  // For p-messages component
import { MessageModule } from 'primeng/message';    // For individual p-message component

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    InvalidComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    EmployeeModule,
    ProductModule,
    ButtonModule,
    MenuModule,
    InputTextModule,
    TableModule,
    ToastModule,  // Add ToastModule if you plan to use notifications
    MessagesModule,  // Add MessagesModule
    MessageModule     // Add MessageModule
  ],
  providers: [AuthService, RestService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
