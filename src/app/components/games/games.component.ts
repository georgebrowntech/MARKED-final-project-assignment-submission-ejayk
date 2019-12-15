import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  Game: any = [];
  constructor(private apiService: ApiService) {
    this.readGames();
  }

  ngOnInit() {
  }
  readGames() {
    this.apiService.GetGames().subscribe((data) => {
      this.Game = data;
    })
  }
  removeGame(game, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.DeleteGame(game._id).subscribe((data) => {
        this.Game.splice(index, 1);
      }
      )
    }
  }
}
