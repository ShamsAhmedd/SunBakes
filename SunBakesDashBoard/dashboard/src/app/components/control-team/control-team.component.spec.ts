import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTeamComponent } from './control-team.component';

describe('ControlTeamComponent', () => {
  let component: ControlTeamComponent;
  let fixture: ComponentFixture<ControlTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
