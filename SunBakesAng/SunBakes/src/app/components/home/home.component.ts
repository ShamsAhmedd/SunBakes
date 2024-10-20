import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderAndFooterService } from '../../shared/Services/headerAndFooter/header-and-footer.service';
import { CategoriesService } from '../../shared/Services/categories/categories.service';
import { ProductsService } from '../../shared/Services/products/products.service';
import { Category, Product } from '../../shared/interfaces/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categories: Category[] = []; 
  products: Product[] = []; 
  headerImage: string = '';
  searchTerm: string = ''; 

  @ViewChild('productsSection', { static: false }) productsSection!: ElementRef; 

  constructor(
    private _HeaderAndFooterService: HeaderAndFooterService,
    private _CategoriesService: CategoriesService,
    private _ProductsService: ProductsService  
  ) {}

  ngOnInit() {
    this.getHeaderAndFooter();
    this.getCategory();
    this.getProducts();
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

  getProducts(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (productsData) => {
        this.products = this.getRandomProducts(productsData, 8);
      },
      error: (err) => console.error('Error fetching products:', err) 
    });
  }

  getRandomProducts(products: any[], count: number): any[] {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  scrollToProducts() {
    this.productsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
