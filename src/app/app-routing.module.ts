import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout/auth-layout.component';
import { AuthenticatedLayoutComponent } from './components/layout/authenticated-layout/authenticated-layout/authenticated-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            '../app/components/layout/auth-layout/auth-layout.module'
          ).then((m) => m.AuthLayoutModule),
      },
    ],
  },
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            '../app/components/layout/authenticated-layout/authenticated-layout.module'
          ).then((m) => m.AuthenticatedLayoutModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
