import { RouterModule } from '@angular/router';

const appRoutes = [{ path: '**', pathMatch: 'full', redirectTo: '' }];
export const routing = RouterModule.forRoot(appRoutes);