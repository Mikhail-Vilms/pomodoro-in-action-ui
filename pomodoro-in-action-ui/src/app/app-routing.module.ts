import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardCreateComponent } from './board-create/board-create.component';
import { BoardComponent } from './board/board.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { ContainerDetailsComponent } from './container-details/container-details.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-success', component: SignupSuccessComponent },
  { path: 'signin', component: SigninComponent },

  // { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'create-board', component: BoardCreateComponent},

  { path: 'boards/:id', component: BoardComponent},
  { path: 'tickets/:id', component: TicketDetailsComponent },
  { path: 'containers/:id', component: ContainerDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
