import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardItemPageComponent } from './board-item-page.component';

describe('BoardItemPageComponent', () => {
  let component: BoardItemPageComponent;
  let fixture: ComponentFixture<BoardItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardItemPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
