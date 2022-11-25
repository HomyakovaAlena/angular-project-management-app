import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskButtonComponent } from './create-task-button.component';

describe('CreateTaskButtonComponent', () => {
  let component: CreateTaskButtonComponent;
  let fixture: ComponentFixture<CreateTaskButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
