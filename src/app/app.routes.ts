// Import our dependencies
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { GroupShuffleComponent } from './group/shuffle/group.shuffle.component';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: '',       component: LoginComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'home',   component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'groups',  component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'shuffle', component: GroupShuffleComponent, canActivate: [AuthGuard] },
  { path: '**',     component: LoginComponent },
];
