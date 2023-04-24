import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

/**
 * the NavbarComponent provides a simple UI at the top of the screen for 
 * navigation to Movies view and Profile View and is where users can logout as well.
 */
export class NavbarComponent implements OnInit {
  constructor(public router: Router) { }
  ngOnInit(): void { }

  /**
   * navigates to Movies page
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /** 
   * navigates to user Profile page
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * logs out users, clears tokem and username from local storage
  */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}

