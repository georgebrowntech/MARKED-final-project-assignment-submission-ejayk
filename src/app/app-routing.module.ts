import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { PlayersComponent } from './components/players/players.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';
import { GamesComponent } from './components/games/games.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from "./shared/auth.guard";


const routes: Routes = [
  { path: 'home', component: PlayersComponent },
  { path: '', redirectTo: "home", pathMatch: "full"},
  {path: 'join-game/:id', component: JoinGameComponent},
  { path: 'add-player', component: AddPlayerComponent, canActivate: [AuthGuard] },
  { path: 'update-player/:id', component: EditPlayerComponent, canActivate: [AuthGuard] },
  { path: 'add-game', component: AddGameComponent, canActivate: [AuthGuard] },
  { path: 'update-game/:id', component: EditGameComponent, canActivate: [AuthGuard] },
  { path: 'games', component: GamesComponent },
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
