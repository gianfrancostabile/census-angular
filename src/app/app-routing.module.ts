import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterPeopleContainerComponent } from './components/filter-people-container/filter-people-container.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { UnloggedGuard } from './guards/unlogged/unlogged.guard';


const routes: Routes = [
  { path: 'census', component: FilterPeopleContainerComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: UserLoginComponent, canActivate: [UnloggedGuard] },
  { path: 'register', component: UserRegisterComponent, canActivate: [UnloggedGuard] },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
