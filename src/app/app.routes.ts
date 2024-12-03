import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'social-media', loadChildren:()=>import('./social-media/social-media-routing.module').then(m => m.routesGeneral)},
  {path: 'complex-form', loadChildren:()=>import('./complex-form/complexe-form.routes').then(m=>m.complexeFormRoutes)},
  {path: 'reactive-state', loadChildren:()=>import('./reactive-state/reactive-state.routing').then(m=>m.complexFormRoutes)},
  {path: '**',redirectTo: 'social-media'},
];
