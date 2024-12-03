import {Routes} from "@angular/router";

export const complexFormRoutes: Routes = [
  {path: 'candidate', loadComponent:()=>import('./components/candidate-list/candidate-list.component').then(c=>c.CandidateListComponent)},
  {path: 'candidate/:id',loadComponent:()=>import('./components/single-candidate/single-candidate.component').then(c=>c.SingleCandidateComponent)},
  {path: '',pathMatch:'full', redirectTo: 'candidate'}
]
