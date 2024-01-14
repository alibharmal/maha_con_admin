import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedLayoutRoutingModule } from './authenticated-layout-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';
import { ActualBodyComponent } from './actual-body/actual-body.component';

@NgModule({
  declarations: [
    SidebarComponent,
    AuthenticatedLayoutComponent,
    ActualBodyComponent,
  ],
  imports: [CommonModule, AuthenticatedLayoutRoutingModule],
})
export class AuthenticatedLayoutModule {}
