import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAuthStyleComponent } from './control-auth-style.component';

describe('ControlAuthStyleComponent', () => {
  let component: ControlAuthStyleComponent;
  let fixture: ComponentFixture<ControlAuthStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlAuthStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlAuthStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
