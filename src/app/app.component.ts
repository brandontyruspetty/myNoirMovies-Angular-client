import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myNoirMovies-Angular-client';

  constructor(public dialog: MatDialog) { }
  //this is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      //assigning the dialog a width
      width: '280px'
    });
  }
  //this is the function that will open the dialog when the login button is clicked
  openLoginFormDialog(): void {
    this.dialog.open(LoginFormComponent, {
      //assigning the dialog a width
      width: '280px'
    });
  }

}
