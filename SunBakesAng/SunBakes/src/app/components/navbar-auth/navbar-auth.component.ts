import { Component, OnInit } from '@angular/core';
import { HeaderAndFooterService } from '../../shared/Services/headerAndFooter/header-and-footer.service';

@Component({
  selector: 'app-navbar-auth',
  templateUrl: './navbar-auth.component.html',
  styleUrl: './navbar-auth.component.css'
})
export class NavbarAuthComponent implements OnInit {
  logo: string = '';

  constructor(private _HeaderAndFooterService: HeaderAndFooterService) {}

  ngOnInit() {
    this.getHeaderAndFooter();
  }

  getHeaderAndFooter(): void {
    this._HeaderAndFooterService.getHeaderAndFooter().subscribe({
      next: (headerAndFooter) => {
        if (headerAndFooter.length) {
          const headerData = headerAndFooter[0];
          this.logo = headerData.logo;
        }
      },
      error: (err) => console.error('Error fetching header data:', err)
    });
  }
}
