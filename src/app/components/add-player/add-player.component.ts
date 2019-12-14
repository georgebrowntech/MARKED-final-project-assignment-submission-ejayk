import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  submitted = false;
  playerForm: FormGroup;
  playerStatus: any = ['Available', 'Unavailable'];
  ranks: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  games: any = ["Dota 2", "Fortnite", "PUBG"];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() { }
  mainForm() {
    this.playerForm = this.fb.group({
      name: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time_played: ['', [Validators.required]],
      game_played: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  // Choose status with select dropdown
  updateStatus(e) {
    this.playerForm.get('status').setValue(e, {
      onlySelf: true
    })
  }
  // Choose status with select dropdown
  updateRank(e) {
    this.playerForm.get('rank').setValue(e, {
      onlySelf: true
    })
  }
  updateGame(e) {
    this.playerForm.get('game_played').setValue(e, {
      onlySelf: true
    })
  }
  // Getter to access form control
  get myForm() {
    return this.playerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.playerForm.valid) {
      return false;
    } else {
      this.apiService.AddPlayer(this.playerForm.value).subscribe(
        (res) => {
          console.log('Player successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/players'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
