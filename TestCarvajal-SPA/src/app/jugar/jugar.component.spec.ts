import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JugarComponent } from './jugar.component';

describe('JugarComponent', () => {
  let component: JugarComponent;
  let fixture: ComponentFixture<JugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
