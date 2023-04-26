import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

/**
 * the WelcomePageComponent is the default view if the user is not logged in, 
 * displaying a welcome message, a login button and a new user registration button
 */
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void { }


  /** 
   * this is the function that will open the dialog 
   * when the signup button is clicked
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      //assigning the dialog a width
      width: '280px'
    });
  }
  /** 
   * this is the function that will open the 
   * dialog when the login button is clicked 
  */
  openLoginFormDialog(): void {
    this.dialog.open(LoginFormComponent, {
      //assigning the dialog a width
      width: '280px'
    });
  }

}
