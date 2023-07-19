import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseUfsComponent } from './analise-ufs.component';

describe('AnaliseUfsComponent', () => {
  let component: AnaliseUfsComponent;
  let fixture: ComponentFixture<AnaliseUfsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnaliseUfsComponent]
    });
    fixture = TestBed.createComponent(AnaliseUfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
