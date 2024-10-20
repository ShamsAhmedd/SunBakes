import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlHeaderAndFooterComponent } from './control-header-and-footer.component';

describe('ControlHeaderAndFooterComponent', () => {
  let component: ControlHeaderAndFooterComponent;
  let fixture: ComponentFixture<ControlHeaderAndFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlHeaderAndFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlHeaderAndFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
