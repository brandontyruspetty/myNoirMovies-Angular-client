import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

/**
 * LoginFormComponent is a modal with inputs for 
 * username and password.  Successful login navigates to movies view.
 */
export class LoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Calls userLogin() found in FetchApiDataService
   * with user input field data (object) as an argument.
   */

  ngOnInit(): void {
  }
  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      let user = result.user.Username;
      let token = result.token;
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);
      console.log(user, token);

      this.dialogRef.close(); // This will close the modal on success!
      this.router.navigate(['movies']);
      this.snackBar.open('You are now logged in!', 'OK', {
        duration: 2000
      });
    },
      (result) => {
        this.snackBar.open('User login failed!', 'OK', {
          duration: 2000
        });
      });
  }

}
