import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoardButtonComponent } from './create-board-button.component';

describe('CreateBoardButtonComponent', () => {
  let component: CreateBoardButtonComponent;
  let fixture: ComponentFixture<CreateBoardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBoardButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBoardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
