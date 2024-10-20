import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/Services/categories/categories.service';
import { HeaderAndFooterService } from '../../shared/Services/headerAndFooter/header-and-footer.service';
import { Category } from '../../shared/interfaces/product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'] 
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = []; 
  headerImage: string = '';
  searchTerm: string = ''; 
  searchResult: any[] = [];

  constructor(
    private _CategoriesService: CategoriesService,
    private _HeaderAndFooterService: HeaderAndFooterService
  ) {}

  ngOnInit(): void {
    this.getHeaderAndFooter();
    this.getCategory();
  }

  getHeaderAndFooter(): void {
    this._HeaderAndFooterService.getHeaderAndFooter().subscribe({
      next: (headerAndFooter) => {
        if (headerAndFooter.length) {
          const headerData = headerAndFooter[0];
          this.headerImage = headerData.headerImg; 
        }
      },
      error: (err) => console.error('Error fetching header data:', err)
    });
  }

  getCategory(): void {
    this._CategoriesService.getCategory().subscribe({
      next: (categoryData) => {
        this.categories = categoryData; 
      },
      error: (err) => console.error('Error fetching category data:', err)
    });
  }

  handleSearch(): void {
    if (this.searchTerm) {
      this.searchResult = this.categories.filter(category =>
        category.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.searchResult = [];
    }
  }
}
