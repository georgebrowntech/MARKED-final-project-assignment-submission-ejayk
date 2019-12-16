import { Player } from '../../shared/player';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  playerData: Player[];
  playerStatus: any = ['Available', 'Unavailable'];
  ranks: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  games: any = ["Dota 2", "Fortnite", "PUBG"];

  
  constructor(
    private location: Location,
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updatePlayer();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getPlayer(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time_played: ['', [Validators.required]],
      game_played: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }
  // Choose options with select-dropdown
  updateRank(e) {
    this.editForm.get('rank').setValue(e, {
      onlySelf: true
    })
  }
  updateStatus(e) {
    this.editForm.get('status').setValue(e, {
      onlySelf: true
    })
  }
  updateGame(e) {
    this.editForm.get('game_played').setValue(e, {
      onlySelf: true
    })
  }
  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getPlayer(id) {
    this.apiService.GetPlayer(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        rank: data['rank'],
        score: data['score'],
        time_played: data['time_played'],
        game_played: ['game_played'],
        status: data['name']
      });
    });
  }

  updatePlayer() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time_played: ['', [Validators.required]],
      game_played: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.UpdatePlayer(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/user-profile/');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
  onBack() {
    this.location.back();
  }


}
