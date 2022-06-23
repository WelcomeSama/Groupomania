import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FluxComponent } from './flux/flux.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HeaderComponent } from './header/header.component';
import { ProfilComponent } from './profil/profil.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { NavComponent } from './nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FluxComponent,
    CreateUserComponent,
    HeaderComponent,
    ProfilComponent,
    NewPostComponent,
    PostListComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
