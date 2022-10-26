import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileButtonComponent } from './edit-profile-button.component';

describe('EditProfileButtonComponent', () => {
  let component: EditProfileButtonComponent;
  let fixture: ComponentFixture<EditProfileButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
