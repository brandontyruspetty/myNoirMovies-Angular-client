import { Component, OnInit, Input } from '@angular/core';
//used to close dialog modal on success
import { MatDialogRef } from '@angular/material/dialog';
//used to bring in API calls 
import { FetchApiDataService } from '../fetch-api-data.service';
//used to display notifications back to user
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  //this is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(() => {
      //logic for a successful user resgistration goes here (to be implemented)
      this.dialogRef.close(); //this will close modal on success
      let welcomeString = 'Welcome, ' + this.userData.Username + 'You may now log in.';
      this.snackbar.open('welcomeString', 'OK', {
        duration: 2000
      });
    }, () => {
      this.snackbar.open('Something went wrong, please try again.', 'OK', {
        duration: 2000
      });
    })
  }
}
