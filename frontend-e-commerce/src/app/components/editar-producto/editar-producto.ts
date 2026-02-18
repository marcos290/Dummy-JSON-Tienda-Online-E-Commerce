import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.html',
  standalone: false
})
export class EditarProducto {
  productoEditado: any;

  constructor(
    public dialogRef: MatDialogRef<EditarProducto>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    // Creamos una copia para no romper el original si cancelamos
    this.productoEditado = { ...data }; 
  }

  guardarCambios() {
    this.dialogRef.close(this.productoEditado); 
  }

  cancelar() {
    this.dialogRef.close(); 
  }
}