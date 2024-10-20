import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { CartsComponent } from './components/carts/carts.component';
import { NavbarBlankComponent } from './components/navbar-blank/navbar-blank.component';
import { NavbarAuthComponent } from './components/navbar-auth/navbar-auth.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { NavbarDefaultComponent } from './components/navbar-default/navbar-default.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { SearchPipe } from './search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactUsComponent,
    NotfoundComponent,
    DetailsComponent,
    CartsComponent,
    NavbarBlankComponent,
    NavbarAuthComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    DefaultLayoutComponent,
    NavbarDefaultComponent,
    CategoriesComponent,
    ProductsComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
