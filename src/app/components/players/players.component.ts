import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  Player: any = [];
  isAdmin: boolean;

  constructor(private apiService: ApiService, public authService: AuthService,) {
    this.readPlayers();
  }

  ngOnInit() {
    this.isAdmin = this.authService.isUserLogged();
  }

  readPlayers() {
    this.apiService.GetPlayers().subscribe((data) => {
      this.Player = data;
    })
  }
}
