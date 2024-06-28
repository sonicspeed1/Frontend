import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { MenuComponent } from './menu/menu.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { ComidasService } from './comidas.service';
import { CalificacionesService } from './calificaciones.service';
import { HomeComponent } from './home/home.component';

const rutas: Routes=[
  {path:'menu',component: MenuComponent},
  {path:'calificacion',component: CalificacionComponent},
  {path:'home',component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    MenuComponent,
    CalificacionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(rutas),
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),ComidasService,CalificacionesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
