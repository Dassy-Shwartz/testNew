import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeetComponent } from './seet.component';

describe('SeetComponent', () => {
  let component: SeetComponent;
  let fixture: ComponentFixture<SeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
