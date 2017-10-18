import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';
import { UserService } from './user/user.service';
import { GroupDetailComponent } from './group/detail/group.detail.component';
import { GroupService } from './group/group.service';
import { GroupListComponent } from './group/list/group.list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { routes } from './app.routes';
import { InputDirective } from './directives/input.directive';
import { GroupShuffleComponent } from './group/shuffle/group.shuffle.component';
import { UserComponent } from './user/user.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent, GroupDetailComponent, GroupListComponent, GroupShuffleComponent, HomeComponent, LoginComponent, InputDirective, UserComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthGuard, GroupService, UserService, AuthService, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [ Http, RequestOptions ]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
