import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { AuthService } from '../../shared/auth.service';
import { platform } from 'os';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  Player: any = [];
  isAdmin: boolean;
  @Input() searchText: String;

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
  removePlayer(player, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.DeletePlayer(player._id).subscribe((data) => {
        this.Player.splice(index, 1);
      }
      )
    }
  }
}
