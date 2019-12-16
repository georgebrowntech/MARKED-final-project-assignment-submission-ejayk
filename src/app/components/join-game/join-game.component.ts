import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Game } from '../../shared/game';
import { Player } from '../../shared/player';
import { ApiService } from '../../shared/api.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  games: any = [];
  player: Player;
  value: String;
  selectedGame: Game;
  errorMessage: String;
  id: any
  constructor(
    private route: ActivatedRoute, 
    private location: Location, 
    private apiService: ApiService) { }


  ngOnInit() {
    this.getGames();
    this.id = this.route.snapshot.paramMap.get('id');
    this.apiService.GetPlayer(this.id).subscribe(data => {
      this.player = data;
    });
  }

  getGames(){
    this.apiService.GetGames().subscribe(data => this.games = data);
  }
  onJoin(f: NgForm){
    if (f.valid && this.selectedGame != null) {
      this.player.status = "Unavailable";
      this.apiService.UpdatePlayer(this.id, this.player).subscribe()

      this.onBack();
    }
    else {
      this.errorMessage = 'A Game must be selected';
    }
  }
  onBack() {
    this.location.back();
  }

}
