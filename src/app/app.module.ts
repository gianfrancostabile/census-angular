import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';  
import { AppComponent } from './app.component';
import { FilterPeopleFormComponent } from './components/filter-people-container/filter-people-form/filter-people-form.component';
import { FilterPeopleContainerComponent } from './components/filter-people-container/filter-people-container.component';
import { FilterPersonCardContainerComponent } from './components/filter-people-container/filter-person-card-container/filter-person-card-container.component';
import { PersonCardComponent } from './components/filter-people-container/filter-person-card-container/person-card/person-card.component';
import { SpinnerComponent } from './components/common/spinner/spinner.component';
import { ComponentOrSpinnerComponent } from './components/common/component-or-spinner/component-or-spinner.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { FormComponent } from './components/common/form/form.component';
import { NavbarButtonComponent } from './components/common/navbar/navbar-button/navbar-button.component';
import { HomeComponent } from './components/home/home.component';
import { MessageComponent } from './components/common/message/message.component';
import { TitleComponent } from './components/common/title/title.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPeopleContainerComponent,
    FilterPeopleFormComponent,
    FilterPersonCardContainerComponent,
    PersonCardComponent,
    SpinnerComponent,
    ComponentOrSpinnerComponent,
    NavbarComponent,
    PageNotFoundComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FormComponent,
    NavbarButtonComponent,
    HomeComponent,
    MessageComponent,
    TitleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
