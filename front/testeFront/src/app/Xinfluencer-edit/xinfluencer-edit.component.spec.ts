import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerEditComponent } from './xinfluencer-edit.component';

describe('InfluencerEditComponent', () => {
  let component: InfluencerEditComponent;
  let fixture: ComponentFixture<InfluencerEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfluencerEditComponent]
    });
    fixture = TestBed.createComponent(InfluencerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
