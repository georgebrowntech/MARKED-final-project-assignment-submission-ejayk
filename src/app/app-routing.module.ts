import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { PlayersComponent } from './components/players/players.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';
import { GamesComponent } from './components/games/games.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ViewTablesComponent } from './components/view-tables/view-tables.component';
import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: ViewTablesComponent},
  { path: '', redirectTo: "home", pathMatch: "full"},
  { path: 'add-player', canActivate: [AuthGuard], component: AddPlayerComponent },
  { path: 'update-player/:id', canActivate: [AuthGuard], component: EditPlayerComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'add-game', canActivate: [AuthGuard], component: AddGameComponent },
  { path: 'update-game/:id', canActivate: [AuthGuard], component: EditGameComponent },
  { path: 'games', component: GamesComponent },
  { path: 'join-game/:id', component: JoinGameComponent },
  { path: 'admin-login', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
