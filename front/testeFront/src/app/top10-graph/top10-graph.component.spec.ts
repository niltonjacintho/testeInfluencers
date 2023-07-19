import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10GraphComponent } from './top10-graph.component';

describe('Top10GraphComponent', () => {
  let component: Top10GraphComponent;
  let fixture: ComponentFixture<Top10GraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Top10GraphComponent]
    });
    fixture = TestBed.createComponent(Top10GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
