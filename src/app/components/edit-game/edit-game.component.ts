import { Game } from '../../shared/game';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
  submitted = false;
  editGameForm: FormGroup;
  gameData: Game[];
  genres: any = ['Action', 'Adventure', 'Fighting', 'Platform', 'Puzzle', 'Racing', 'Role-playing', 'Shooter',
  'Simulation', 'Sports', 'Strategy', 'Misc'];
  ratings: any = [1, 2, 3, 4, 5];
  status: any = ['Active', 'Inactive'];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updateGame();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getGame(id);
    this.editGameForm = this.fb.group({
      title: ['', [Validators.required]],
      platform: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      release: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }
  updateRating(e) {
    this.editGameForm.get('rating').setValue(e, {
      onlySelf: true
    })
  }
  // Choose status with select dropdown
  updateGenre(e) {
    this.editGameForm.get('genre').setValue(e, {
      onlySelf: true
    })
  }
  updateStatus(e) {
    this.editGameForm.get('status').setValue(e, {
      onlySelf: true
    })
  }
  // Getter to access form control
  get editForm() {
    return this.editGameForm.controls;
  }
  getGame(id) {
    this.apiService.GetGame(id).subscribe(data => {
      this.editGameForm.setValue({
        title: data['title'],
        platform: data['platform'],
        genre: data['genre'],
        rating: data['rating'],
        publisher: ['publisher'],
        status: data['status']
      });
    });
  }

  updateGame() {
    this.editGameForm = this.fb.group({
      title: ['', [Validators.required]],
      platform: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      release: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editGameForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.UpdateGame(id, this.editGameForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/games');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }



}
