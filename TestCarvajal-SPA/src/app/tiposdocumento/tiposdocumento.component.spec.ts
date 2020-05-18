import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposdocumentoComponent } from './tiposdocumento.component';

describe('TiposdocumentoComponent', () => {
  let component: TiposdocumentoComponent;
  let fixture: ComponentFixture<TiposdocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposdocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposdocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
