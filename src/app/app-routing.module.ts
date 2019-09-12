import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityDetailsComponent } from './city-details/city-details.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'detail/:city', component: CityDetailsComponent },
  { path: '', component: HomeComponent ,  pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
