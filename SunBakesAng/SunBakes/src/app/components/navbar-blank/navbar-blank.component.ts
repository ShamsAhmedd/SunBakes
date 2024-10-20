import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderAndFooterService } from '../../shared/Services/headerAndFooter/header-and-footer.service';
import { AuthService } from '../../shared/Services/authServices/auth-service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.css'
})
export class NavbarBlankComponent implements OnInit {
  isScrolled = false;
  logo: string = '';
  headerImage: string = '';

  constructor(private _HeaderAndFooterService: HeaderAndFooterService , private _AuthService:AuthService) {}

  ngOnInit() {
    this.getHeaderAndFooter();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; 
  }
  getHeaderAndFooter(): void {
    this._HeaderAndFooterService.getHeaderAndFooter().subscribe({
      next: (headerAndFooter) => {
        if (headerAndFooter.length) {
          const headerData = headerAndFooter[0];
          this.logo = headerData.logo;
          this.headerImage = headerData.headerImg; 
        }
      },
      error: (err) => console.error('Error fetching header data:', err)
    });
  }

  logOutUser(): void {
    this._AuthService.logOut();
  }

}
