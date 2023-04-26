import { Component, OnInit } from '@angular/core';
import { DirectorPageComponent } from '../director-page/director-page.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenrePageComponent } from '../genre-page/genre-page.component';
import { SynopsisPageComponent } from '../synopsis-page/synopsis-page.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

/**
 * the MovieCardComponent class fetches and displays all movies in card format
 */
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }
  /**
   * fetch all movies with FetchApiService.getAllMovies()
   * @returns all movies in an array of objects
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
   * fetch user's favorite movies with FetchApiService.getUser()
   * @returns an empty array or an array of movies favored by the user
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
   * check if a movie is included in user's favorites
   * @param id 
   * @returns a boolean value
   */
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
   * add one movie id into the user's favorite with FetchApiService.addFavoriteMovie()
   * @param id 
   */
  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * removes a movie id from the user's favorites with FetchApiService.deleteFavoriteMovie()
   * @param id 
   */
  deleteFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * opens the Director dialog modal displaying director info
   * @param name 
   * @param bio 
   * @param birthday 
   * @param death
   */
  openDirector(name: string, bio: string, birthdate: string, death: string): void {
    this.dialog.open(DirectorPageComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthdate: birthdate,
        Death: death,
      },
      width: '400px',
    });
  }

  /**
   * opens the Genre dialog modal displaying the genre info
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

  /**
   * opens the Synopsis dialog modal displaying the synopsis info
   * @param title 
   * @param description 
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
