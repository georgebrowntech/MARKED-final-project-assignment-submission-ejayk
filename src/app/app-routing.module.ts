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

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'players' },
  { path: 'add-player', component: AddPlayerComponent },
  { path: 'update-player/:id', component: EditPlayerComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'add-game', component: AddGameComponent },
  { path: 'update-game/:id', component: EditGameComponent },
  { path: 'games', component: GamesComponent },
  { path: 'join-game/:id', component: JoinGameComponent },
  { path: 'admin-login', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
