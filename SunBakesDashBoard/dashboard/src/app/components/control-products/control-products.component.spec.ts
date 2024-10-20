import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlProductsComponent } from './control-products.component';

describe('ControlProductsComponent', () => {
  let component: ControlProductsComponent;
  let fixture: ComponentFixture<ControlProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
