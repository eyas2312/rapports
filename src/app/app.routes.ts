import { Routes } from '@angular/router';
import { RapportsComponent } from './rapports/rapports.component';
import { RapportDetailComponent } from './components/rapport-detail/rapport-detail.component';
import { AuthComponent } from './components/auth.component';
import { AuthGuard } from './guards/auth.gard';

export const routes: Routes = [
  { 
    path: 'auth', 
    component: AuthComponent 
  },
  { 
    path: '', 
    component: RapportsComponent
      // Protège la page des rapports
  },
  { 
    path: 'rapport/:nom', 
    component: RapportDetailComponent
      // Protège les détails des rapports
  },
  { 
    path: '**', 
    redirectTo: 'auth'  // Redirige vers auth si route inconnue
  }
];