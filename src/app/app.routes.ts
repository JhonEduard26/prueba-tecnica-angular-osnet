import { Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard/pages/dashboard-page/dashboard-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { ProductsPageComponent } from './dashboard/pages/products-page/products-page.component';
import { ChartsPageComponent } from './dashboard/pages/charts-page/charts-page.component';
import { authGuardFn } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [authGuardFn],
    children: [
      {
        path: '',
        component: ChartsPageComponent,
      },
      {
        path: 'productos',
        component: ProductsPageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
