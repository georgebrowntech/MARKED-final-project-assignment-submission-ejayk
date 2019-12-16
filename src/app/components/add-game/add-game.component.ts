import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  submitted = false;
  gameForm: FormGroup;
  genres: any = ['Action', 'Adventure', 'Fighting', 'Platform', 'Puzzle', 'Racing', 'Role-playing', 'Shooter',
  'Simulation', 'Sports', 'Strategy', 'Misc'];
  ratings: any = [1, 2, 3, 4, 5];
  status: any = ['Active', 'Inactive'];

  constructor(
    private location: Location,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() {
  }
  mainForm() {
    this.gameForm = this.fb.group({
      title: ['', [Validators.required]],
      platform: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      release: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }
  // Choose status with select dropdown
  updateRating(e) {
    this.gameForm.get('rating').setValue(e, {
      onlySelf: true
    })
  }
  // Choose status with select dropdown
  updateGenre(e) {
    this.gameForm.get('genre').setValue(e, {
      onlySelf: true
    })
  }
  updateStatus(e) {
    this.gameForm.get('status').setValue(e, {
      onlySelf: true
    })
  }
  // Getter to access form control
  get myForm() {
    return this.gameForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.gameForm.valid) {
      return false;
    } else {
      this.apiService.AddGame(this.gameForm.value).subscribe(
        (res) => {
          console.log('Game successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/user-profile/'))
        }, (error) => {
          console.log(error);
        });
    }
  }

  onBack() {
    this.location.back();
  }

}
