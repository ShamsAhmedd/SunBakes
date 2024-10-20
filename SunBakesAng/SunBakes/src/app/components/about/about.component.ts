import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../shared/Services/about/about.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  headerImg: string = '';
  messageError: string | null = null;
  aboutData: any[] = []; 
  teamData: any[] = []; 

  constructor(private _AboutService: AboutService) {}

  ngOnInit(): void {
    this.getAbout(); 
    this.getTeam();  
  }

  getAbout(): void {
    this._AboutService.getAbout().subscribe({
      next: (about) => {
        if (about && about.length > 0) {
          const foundItem = about.find((item:any) => item.headerImg);

          if (foundItem) {
            this.headerImg = foundItem.headerImg; 
          }

          this.aboutData = about; 
        }
      },
      error: (err: HttpErrorResponse) => {
        this.messageError = 'Error fetching About data';
        console.error('Error fetching about data:', err);
      }
    });
  }

  getTeam(): void {
    this._AboutService.getTeam().subscribe({
      next: (response) => {
        this.teamData = response;
      },
      error: (err: HttpErrorResponse) => {
        this.messageError = 'Error fetching Team members';
        console.error('Error fetching team data:', err);
      }
    });
  }
}
