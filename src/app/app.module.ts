import { DetailComponent } from './routes/account/detail/detail.component';
import { AccountComponent } from './routes/account/acount.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './modules/header/header.module';
import { DataTableModule } from './modules/datatable/datatable.module';
import { AccountDetailsHeaderModule } from './modules/account-details-header/account-details-header.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    HeaderModule,
    AccountDetailsHeaderModule,
    DataTableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
