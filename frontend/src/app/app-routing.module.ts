import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { ArticlesComponent } from './articles/articles.component';
import { AccountComponent } from './account/account.component';
import { ConditionPageComponent } from './condition-page/condition-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign', component: SignComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'profil/:userId', component: AccountComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'condition', component: ConditionPageComponent },
  { path :'publication', component : ArticleFormComponent },
  { path: '', component: AuthPageComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found'} /* path wildcard show an inexistant route, and redirect the user to a 404 page */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
