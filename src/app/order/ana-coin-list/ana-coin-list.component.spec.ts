import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaCoinListComponent } from './ana-coin-list.component';

describe('AnaCoinListComponent', () => {
  let component: AnaCoinListComponent;
  let fixture: ComponentFixture<AnaCoinListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaCoinListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaCoinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
