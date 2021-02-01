import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { ArticlesComponent } from './articles/articles.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountComponent } from './account/account.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConditionPageComponent } from './condition-page/condition-page.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign', component: SignComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'profile', component: AccountComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'condition', component: ConditionPageComponent },
  { path :'publication', component : ArticleFormComponent },
  { path: '', component: AuthPageComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found'} /* path wildcard show an inexistant route, and redirect the user to a 404 page */
];

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    HomePageComponent,
    LoginComponent,
    SignComponent,
    ArticlesComponent,
    NavbarComponent,
    AccountComponent,
    HeaderComponent,
    FooterComponent,
    ConditionPageComponent,
    FourOhFourComponent,
    ArticleFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
