import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from "./auth/logout/logout.component";
import { ResetpasswordComponent } from "./auth/resetpassword/resetpassword.component";

const routes: Routes = [
	{path: 'login', loadChildren: './auth/auth.module#AuthModule'},
	{path: 'logout', component: LogoutComponent},
	{path:"resetpassword",component:ResetpasswordComponent},
	{path: '', redirectTo: 'index', pathMatch: 'full'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }