import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildComponent } from './child/child.component'; // Import your child component here

const routes: Routes = [
  // Define routes for each child component dynamically
  { path: 'child/:childName', component: ChildComponent },
  // Add any other routes if needed
  // ...
  // Define a default route (if no child name is provided)
  { path: '**', redirectTo: '/child/Lynn', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }