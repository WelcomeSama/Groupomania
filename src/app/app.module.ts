import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FluxComponent } from './flux/flux.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { NavComponent } from './nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { AuthGuard } from './services/auth.guards';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FluxComponent,
    CreateUserComponent,
    HeaderComponent,
    UserComponent,
    NewPostComponent,
    PostListComponent,
    NavComponent,
    PostComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
