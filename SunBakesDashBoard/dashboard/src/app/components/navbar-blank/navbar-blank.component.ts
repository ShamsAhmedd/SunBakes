import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.css'
})
export class NavbarBlankComponent implements OnInit {
  isScrolled = false;

  constructor( private _AuthService:AuthService) {}

  ngOnInit() {
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  logOutUser(): void {
    this._AuthService.logOut();
  }


}
