import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAboutComponent } from './control-about.component';

describe('ControlAboutComponent', () => {
  let component: ControlAboutComponent;
  let fixture: ComponentFixture<ControlAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
