import { Component, OnInit } from '@angular/core';
import { HeaderAndFooterService } from '../../shared/Services/headerAndFooter/header-and-footer.service';
import { AuthService } from '../../shared/Services/authServices/auth-service';
import { ContactService } from '../../shared/Services/contact/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  isLoading = false;
  address: string = '';
  phone: string = '';
  gmail: string = '';
  email: string = '';  
  message: string = '';  

  constructor(
    private _HeaderAndFooterService: HeaderAndFooterService,
    private _AuthService: AuthService,
    private _ContactService: ContactService
  ) {}

  ngOnInit() {
    this.getHeaderAndFooter();
    this.loadUserEmail();  
  }

  loadUserEmail(): void {
    this._AuthService.decodeUserData();  
    if (this._AuthService.userData && this._AuthService.userData.email) {
      this.email = this._AuthService.userData.email;  
    }
  }

  onSubmit(): void {
    const token = localStorage.getItem('token');  
    if (token && this.message.trim()) {
      this.isLoading = true;  
      this._ContactService.sendContactForm(token, this.message).subscribe({
        next: response => {
          console.log('Email sent successfully');
          this.isLoading = false; 
          this.message = ''; 
        },
        error: error => {
          console.error('Error sending email', error);
          this.isLoading = false;  
        }
      });
    } else {
      console.error('Message cannot be empty');
    }
  }

  getHeaderAndFooter(): void {
    this._HeaderAndFooterService.getHeaderAndFooter().subscribe({
      next: (headerAndFooter) => {
        if (headerAndFooter.length) {
          const footerData = headerAndFooter[0];
          this.address = footerData.address;
          this.phone = footerData.phone;
          this.gmail = footerData.gmail;
        }
      },
      error: (err) => console.error('Error fetching footer data:', err)
    });
  }
}
