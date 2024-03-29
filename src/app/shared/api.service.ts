import { Injectable } from '@angular/core';
import { Player } from './player';
import { Game } from './game';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add player
  AddPlayer(data: Player): Observable<any> {
    let API_URL = `${this.endpoint}/add-player`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all players
  GetPlayers() {
    return this.http.get(`${this.endpoint}/players`);
  }

  // Get player
  GetPlayer(id): Observable<any> {
    let API_URL = `${this.endpoint}/get-player/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update player
  UpdatePlayer(id, data: Player): Observable<any> {
    let API_URL = `${this.endpoint}/update-player/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete player
  DeletePlayer(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-player/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorMgmt)
    )
  }



  // Add game
  AddGame(data: Game): Observable<any> {
    let API_URL = `${this.endpoint}/add-game`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all games
  GetGames() {
    return this.http.get(`${this.endpoint}/games`);
  }

  // Get game
  GetGame(id): Observable<any> {
    let API_URL = `${this.endpoint}/get-game/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update game
  UpdateGame(id, data: Game): Observable<any> {
    let API_URL = `${this.endpoint}/update-game/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete player
  DeleteGame(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-game/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorMgmt)
    )
  }


  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
