import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaCoinDetailComponent } from './ana-coin-detail.component';

describe('AnaCoinDetailComponent', () => {
  let component: AnaCoinDetailComponent;
  let fixture: ComponentFixture<AnaCoinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaCoinDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaCoinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
