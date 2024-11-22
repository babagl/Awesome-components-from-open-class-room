import {Routes} from "@angular/router";

export const complexeFormRoutes: Routes = [
  {path:'', loadComponent:()=>import('./components/complex-form/complex-form.component').then(c=>c.ComplexFormComponent)}
]
