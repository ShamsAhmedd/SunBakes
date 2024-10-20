import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/Services/products/products.service';
import { Product } from '../../shared/interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categoryId: string = '';
  headerImg: string = ''; 
  searchTerm: string = ''; 
  @ViewChild('productsSection', { static: false }) productsSection!: ElementRef; 

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId')!;
    this.getProductsByCategory(this.categoryId);
  }

  getProductsByCategory(categoryId: string): void {
    this.productsService.getProductsByCategory(categoryId).subscribe({
      next: (productData) => {
        this.products = productData; 
        if (productData.length > 0) {
          this.headerImg = productData[0].headerImg;
        }
      },
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  scrollToProducts() {
    this.productsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
