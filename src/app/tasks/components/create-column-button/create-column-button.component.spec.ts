import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateColumnButtonComponent } from './create-column-button.component';

describe('CreateColumnButtonComponent', () => {
  let component: CreateColumnButtonComponent;
  let fixture: ComponentFixture<CreateColumnButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateColumnButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateColumnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
