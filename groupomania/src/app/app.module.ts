import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { ArticlesComponent } from './articles/articles.component';
import { PicturesComponent } from './pictures/pictures.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountComponent } from './account/account.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConditionPageComponent } from './condition-page/condition-page.component';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign', component: SignComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'pictures', component: PicturesComponent },
  { path: 'profile', component: AccountComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'condition', component: ConditionPageComponent },
  { path: '', component: AuthPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    HomePageComponent,
    LoginComponent,
    SignComponent,
    ArticlesComponent,
    PicturesComponent,
    NavbarComponent,
    AccountComponent,
    HeaderComponent,
    FooterComponent,
    ConditionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
