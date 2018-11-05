import { RouterModule, Routes } from '@angular/router';
import { Demo1Component } from './demo1.component';
import { Demo2Component } from './demo2.component';

export const ROUTE_PATHS = {
  DEMO1: 'demo1', 
  DEMO2: 'demo2'
};

export const routes: Routes = [
  { path: '', redirectTo: '/demo1', pathMatch: 'full' },
  { path: ROUTE_PATHS.DEMO1, component: Demo1Component },
  { path: ROUTE_PATHS.DEMO2, component: Demo2Component }
];


export const AppRoutes = RouterModule;