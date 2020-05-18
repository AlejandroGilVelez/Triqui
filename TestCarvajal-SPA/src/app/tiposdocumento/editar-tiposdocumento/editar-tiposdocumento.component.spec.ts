import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTiposdocumentoComponent } from './editar-tiposdocumento.component';

describe('EditarTiposdocumentoComponent', () => {
  let component: EditarTiposdocumentoComponent;
  let fixture: ComponentFixture<EditarTiposdocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTiposdocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTiposdocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
