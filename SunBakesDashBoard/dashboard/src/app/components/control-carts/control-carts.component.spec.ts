import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCartsComponent } from './control-carts.component';

describe('ControlCartsComponent', () => {
  let component: ControlCartsComponent;
  let fixture: ComponentFixture<ControlCartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlCartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
