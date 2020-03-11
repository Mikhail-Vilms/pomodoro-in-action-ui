import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGridElementComponent } from './board-grid-element.component';

describe('BoardGridElementComponent', () => {
  let component: BoardGridElementComponent;
  let fixture: ComponentFixture<BoardGridElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardGridElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGridElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
