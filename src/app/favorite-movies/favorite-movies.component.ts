import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenrePageComponent } from '../genre-page/genre-page.component';
import { DirectorPageComponent } from '../director-page/director-page.component';
import { SynopsisPageComponent } from '../synopsis-page/synopsis-page.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {
  favorites: any[] = [];
  favoriteMovies: any[] = [];



  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getFavoriteMovies();
  }


  getFavoriteMovies(): void {
    this.favorites, this.favoriteMovies = [];
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      this.favorites.map((favorite: any) => {
        console.log(favorite);
        this.fetchApiData.getMovieById(favorite).subscribe((resp: any) => {
          this.favoriteMovies.push(resp);
        });
      });
    });
  }
  //check if a movie is a user's favorite
  isFavorite(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }

  //add a movie to a user's favorites
  addToFavorites(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  //remove a movie from a user's favorites
  deleteFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((results) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  //open genre info from GenrePageComponent
  openGenre(name: string, description: string): void {
    this.dialog.open(GenrePageComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  //open director info from DirectorPageComponent
  openDirector(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorPageComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
      width: '400px',
    });
  }

  //open movie details from SynopsisPageComponent
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
