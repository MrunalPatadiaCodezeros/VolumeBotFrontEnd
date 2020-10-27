// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Routes, RouterModule } from '@angular/router';
// import { AutoComponent } from './auto.component';
// import { LayoutModule } from '../../../layouts/layout.module';
// import { DefaultComponent } from '../default.component';

// const routes: Routes = [
//     {
//         "path": "",
//         "component": DefaultComponent,
//         "children": [
//             {
//                 "path": "",
//                 "component": AutoComponent
//             }
//         ]
//     }
// ];
// @NgModule({imports: [
// CommonModule,RouterModule.forChild(routes),LayoutModule
// ],exports: [
// RouterModule
// ],declarations: [
// AutoComponent
// ]})
// export class AutoModule  {



// }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AutoComponent } from './auto.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { JoblistComponent } from '../joblist/joblist.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": AutoComponent
            }
        ]
    }
];
@NgModule({imports: [
CommonModule,RouterModule.forChild(routes),LayoutModule,FormsModule,ReactiveFormsModule,NgxPaginationModule
],exports: [
RouterModule
],declarations: [
    AutoComponent,
    JoblistComponent
]})
export class AutoModule  {
}