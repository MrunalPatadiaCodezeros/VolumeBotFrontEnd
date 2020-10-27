import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrderbookComponent } from './orderbook.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  {
      "path": "",
      "component": DefaultComponent,
      "children": [
          {
              "path": "",
              "component": OrderbookComponent
          }
      ]
  }
];

@NgModule({imports: [
  CommonModule,RouterModule.forChild(routes),LayoutModule,NgxPaginationModule
  ],exports: [
  RouterModule
  ],declarations: [
  OrderbookComponent
  ]})
  export class orderbookModule  {}