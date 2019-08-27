import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHouseholdComponent } from './edit-household.component';

describe('EditHouseholdComponent', () => {
  let component: EditHouseholdComponent;
  let fixture: ComponentFixture<EditHouseholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHouseholdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHouseholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
