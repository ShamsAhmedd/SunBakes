import { Component, OnInit } from '@angular/core';
import { HeaderAndFooterService } from '../../shared/Services/headerAndFooter/header-and-footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  logo: string = '';
  address: string = '';
  phone: string = '';
  gmail: string = '';
  image1: string = '';
  image2: string = '';
  image3: string = '';

  constructor(private _HeaderAndFooterService: HeaderAndFooterService) {}

  ngOnInit() {
    this.getHeaderAndFooter();
  }

  getHeaderAndFooter(): void {
    this._HeaderAndFooterService.getHeaderAndFooter().subscribe({
      next: (headerAndFooter) => {
        if (headerAndFooter.length) {
          const footerData = headerAndFooter[0];
          this.logo = footerData.logo;
          this.address = footerData.address;
          this.phone = footerData.phone;
          this.gmail = footerData.gmail;
          this.image1 = footerData.image1;
          this.image2 = footerData.image2;
          this.image3 = footerData.image3;
        }
      },
      error: (err) => console.error('Error fetching footer data:', err)
    });
  }
}
