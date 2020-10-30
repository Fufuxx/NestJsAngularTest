import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './routes/account/detail/detail.component';
import { AccountComponent } from './routes/account/acount.component';

const routes: Routes = [
  {
    path: 'accounts',
    component: AccountComponent,
    data: { title: 'Accounts' }
  },
  {
    path: 'accounts/:id',
    component: DetailComponent,
    data: { title: 'Details' }
  },
  {
    path: '**',
    redirectTo: 'accounts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
