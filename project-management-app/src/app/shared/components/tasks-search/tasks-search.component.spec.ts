import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksSearchComponent } from './tasks-search.component';

describe('TasksSearchComponent', () => {
  let component: TasksSearchComponent;
  let fixture: ComponentFixture<TasksSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
