import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {VerifieMobileComponent} from './verifie-mobile/verifie-mobile.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent  },
  { path: 'verifie', component: VerifieMobileComponent  },
  { path: 'register', component: RegisterComponent  },
  {path:'forgot',component:ForgotPasswordComponent},
  {path : 'home',component:RegisterComponent},

  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
    // other imports here
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

