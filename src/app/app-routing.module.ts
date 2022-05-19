import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { FluxComponent } from './flux/flux.component';
import { LoginComponent } from './login/login.component';
import { NewPostComponent } from './new-post/new-post.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'flux', component: FluxComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: 'user', component: ProfilComponent },
  { path: 'newPost', component: NewPostComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
