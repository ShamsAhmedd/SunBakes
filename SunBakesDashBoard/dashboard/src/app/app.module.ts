import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlHeaderAndFooterComponent } from './components/control-header-and-footer/control-header-and-footer.component';
import { ControlAuthStyleComponent } from './components/control-auth-style/control-auth-style.component';
import { ControlCategoryComponent } from './components/control-category/control-category.component';
import { ControlProductsComponent } from './components/control-products/control-products.component';
import { ControlCartsComponent } from './components/control-carts/control-carts.component';
import { LoginComponent } from './components/login/login.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { NavbarBlankComponent } from './components/navbar-blank/navbar-blank.component';
import { NavbarAuthComponent } from './components/navbar-auth/navbar-auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ControlAboutComponent } from './components/control-about/control-about.component';
import { ControlTeamComponent } from './components/control-team/control-team.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlHeaderAndFooterComponent,
    ControlAuthStyleComponent,
    ControlCategoryComponent,
   ControlAboutComponent,
    ControlProductsComponent,
    ControlCartsComponent,
    LoginComponent,
    BlankLayoutComponent,
    AuthLayoutComponent,
    NavbarBlankComponent,
    NavbarAuthComponent,
    NotFoundComponent,
    ControlTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
