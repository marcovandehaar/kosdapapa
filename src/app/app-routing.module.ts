import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { LynnComponent } from './lynn/lynn.component';
//import { EviComponent } from './evi/evi.component';

const routes: Routes = [
  { path: '', redirectTo: '/lynn', pathMatch: 'full' },
  { path: 'lynn', component: LynnComponent },
  { path: 'evi', component: EviComponent },
  // Add more routes for other components if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}