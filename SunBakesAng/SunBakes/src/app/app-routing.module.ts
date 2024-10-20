import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CartsComponent } from './components/carts/carts.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { authGuard } from './shared/guards/auth.guard';
import { ProductsComponent } from './components/products/products.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'products/:categoryId', component: ProductsComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'carts', component: CartsComponent, canActivate: [authGuard] }, // Guard applied here
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
  { path: '**', component: NotfoundComponent }, // 404 route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
