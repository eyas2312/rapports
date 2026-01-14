import { Routes } from '@angular/router';
import { RapportsComponent } from './rapports/rapports.component';
import { RapportDetailComponent } from './components/rapport-detail/rapport-detail.component';

export const routes: Routes = [
  { path: '', component: RapportsComponent },
  { path: 'rapport/:nom', component: RapportDetailComponent },
  { path: '**', redirectTo: '' }
];