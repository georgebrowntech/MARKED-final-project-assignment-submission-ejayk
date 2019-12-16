import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { ApiService } from './../../shared/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  currentUser: Object = {};
  isAdmin: boolean;
  Player: any = [];
  Game: any = [];
  table: String;

  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg;
    });
  }

  ngOnInit() {
    this.isAdmin = this.authService.isUserLogged();
    this.table = 'players';
   }

  changeTable(table: String){
    if (this.isAdmin && table == 'games')
      this.table = 'games'
    else if (table == 'players')
      this.table = 'players'
  }
}