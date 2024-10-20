import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { ControlHeaderAndFooterComponent } from './components/control-header-and-footer/control-header-and-footer.component';
import { ControlCategoryComponent } from './components/control-category/control-category.component';
import { ControlProductsComponent } from './components/control-products/control-products.component';
import { ControlAuthStyleComponent } from './components/control-auth-style/control-auth-style.component';
import { ControlCartsComponent } from './components/control-carts/control-carts.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ControlAboutComponent } from './components/control-about/control-about.component';
import { ControlTeamComponent } from './components/control-team/control-team.component';

const routes: Routes = [{
  path: '',
  component: BlankLayoutComponent,
  children: [
    { path: 'headerAndFooter', component: ControlHeaderAndFooterComponent},
    {path: 'about',component:ControlAboutComponent},
    {path: 'team',component:ControlTeamComponent},
    { path: 'categories', component: ControlCategoryComponent },
    { path: 'products', component: ControlProductsComponent },
    { path: 'authStyle', component: ControlAuthStyleComponent },
    { path: 'carts', component: ControlCartsComponent},
  ],
},
{
  path: '',
  component: AuthLayoutComponent,
  children: [
    { path: 'login', component: LoginComponent },
  ],
},
{ path: '**', component: NotFoundComponent }, // 404 route

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
