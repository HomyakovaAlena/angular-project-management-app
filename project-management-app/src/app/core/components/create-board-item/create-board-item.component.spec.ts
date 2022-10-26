import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoardItemComponent } from './create-board-item.component';

describe('CreateBoardItemComponent', () => {
  let component: CreateBoardItemComponent;
  let fixture: ComponentFixture<CreateBoardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBoardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBoardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
