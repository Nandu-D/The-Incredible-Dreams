import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomParticipantComponent } from './random-participant.component';

describe('RandomParticipantComponent', () => {
  let component: RandomParticipantComponent;
  let fixture: ComponentFixture<RandomParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
