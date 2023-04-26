import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * declaring an API URL that will provide 
 * the data for the client app
 */
const apiUrl = 'https://mynoirmovies.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  /**
   * creates new user and expects a JSON in the request body
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError)
      );
  }
  /**
   * allows user login with authorization of credentials
  */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError)
      );
  }

  /**
   * get JSON object of all movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies`,
        {
          headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })
        })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * get JSON object of a single movie by _id
  */
  getMovieById(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/${title}`,
        {
          headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })
        })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * get JSON object of director by name
  */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/directors/${directorName}`,
        {
          headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })
        })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * get genre description by name
  */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/genre/${genreName}`,
        {
          headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })
        })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * get JSON object of user by username
  */
  getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/users/${username}`,
        {
          headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })
        })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * get array of favorite movies for user by username
  */
  getFavoriteMovies(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * add a movie to user's Favorite Movies by _id
  */
  addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .post(`${apiUrl}/users/${username}/movies/${movieId}`,
        { FavoriteMovie: movieId },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }
  /**
   * edit user info by username
   */
  editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}/users/${username}`, updatedUser, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * delete existing user by username
   */
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * delete movie from Favorite Movies by _id
   */
  deleteFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${username}/movies/${movieId}`,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

