import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  Player: any = [];

  constructor(private apiService: ApiService) {
    this.readPlayers();
  }

  ngOnInit() {
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
