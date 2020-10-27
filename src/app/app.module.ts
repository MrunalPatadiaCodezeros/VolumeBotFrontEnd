import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./_services/script-loader.service";
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { AuthModule } from "./auth/auth.module";
import { AutoVolumePriceGenratorComponent } from './auto-volume-price-genrator/auto-volume-price-genrator.component';



@NgModule({
  declarations: [
    ThemeComponent,
    AppComponent,
    AutoVolumePriceGenratorComponent,
    
  ],
  imports: [
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeRoutingModule,
    AuthModule,
    HttpClientModule,

  ],
  providers: [ScriptLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }