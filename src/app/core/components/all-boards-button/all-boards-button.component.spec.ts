import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBoardsButtonComponent } from './all-boards-button.component';

describe('AllBoardsButtonComponent', () => {
  let component: AllBoardsButtonComponent;
  let fixture: ComponentFixture<AllBoardsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBoardsButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBoardsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
