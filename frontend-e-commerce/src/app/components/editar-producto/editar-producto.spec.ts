import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProducto } from './editar-producto';

describe('EditarProducto', () => {
  let component: EditarProducto;
  let fixture: ComponentFixture<EditarProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProducto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
