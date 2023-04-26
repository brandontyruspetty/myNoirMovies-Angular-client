import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenrePageComponent } from '../genre-page/genre-page.component';
import { DirectorPageComponent } from '../director-page/director-page.component';
import { SynopsisPageComponent } from '../synopsis-page/synopsis-page.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})

/**
 * the FavoriteMoviesComponent class fetches and displays the user's
 * favorite movies in card format in the user profile page
 */
export class FavoriteMoviesComponent implements OnInit {
  movies: any[] = [];             // array of movie ids
  favoriteMovies: any[] = [];     // array of movie objects

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  /**
   * called OnInit and when the favorite (heart) icon is clicked
   * 
   * empties this.favorites[] and this.favoriteMovies[], an array of movie ids and movie objects
   * 
   * then fetches the user's favorite movies and sets this.favorites as the response.
   * 
   * then, using the map method, for each favorite (string) in this.favorites[],
   * fetch the movie (object) by the id and push the response into this.favoriteMovies[].
   */

  getFavoriteMovies(): void {
    this.movies, this.favoriteMovies = [];
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.movies = resp.FavoriteMovies;
      this.movies.map((favorite: any) => {
        console.log(favorite);
        this.fetchApiData.getMovieById(favorite).subscribe((resp: any) => {
          this.favoriteMovies.push(resp);
        });
      });
      console.log("*** DEBUG: favoriteMovies:", this.favoriteMovies)
    });
  }

  /**
   * Check if a movie id is included in the user's favorites
   * @param id
   * @returns a boolean value
   */
  isFavorite(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }

  /**
   * Add a movie id into the user's favorites with FetchApiDataService.addFavoriteMovie()
   * @param id
   */
  addToFavorites(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }


  /**
 * Delete one movie id from the user's favorites with FetchApiDataService.removeFavoriteMovie()
 * @param id
 */

  deleteFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((results) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**open genre info from GenrePageComponent displaying info
   * @param name
   * @param description
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenrePageComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  /**open director info from DirectorPageComponent displaying info
   * @param name
   * @param bio
   * @param birthday
   * @param death
   */
  openDirector(name: string, bio: string, birthday: string, death: string): void {
    this.dialog.open(DirectorPageComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday,
        Death: death,
      },
      width: '400px',
    });
  }

  /** open movie details from SynopsisPageComponent
   *@param title
   @param description 
   */
  openSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisPageComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '400px',
    });
  }
}
