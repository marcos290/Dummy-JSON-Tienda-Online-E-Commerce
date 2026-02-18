import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * COMPONENTE: EditarProducto
 * Actúa como controlador para la ventana modal de edición.
 * Utiliza el sistema de inyección de Angular Material para recibir y devolver datos.
 */
@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.html',
  standalone: false
})
export class EditarProducto {
  // Objeto local donde almacenaremos los cambios temporales
  productoEditado: any;

  constructor(
    /**
     * MatDialogRef: Referencia a la ventana abierta. 
     * Permite controlar el cierre del modal y enviar datos de vuelta al Dashboard.
     */
    public dialogRef: MatDialogRef<EditarProducto>,

    /**
     * @Inject(MAT_DIALOG_DATA): 
     * Es el "túnel" por el que entran los datos. 
     * Recibimos el producto seleccionado desde el Dashboard mediante este token de inyección.
     */
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    /**
     * CLAVE DE CIBERSEGURIDAD Y UX: Inmutabilidad.
     * Usamos el operador spread { ...data } para crear una COPIA del objeto.
     * De esta forma, si el usuario edita algo y luego cancela, los cambios 
     * no se verán reflejados en la lista principal por error.
     */
    this.productoEditado = { ...data }; 
  }

  /**
   * Cierra el modal enviando el objeto modificado.
   * El Dashboard recibirá este objeto en la suscripción 'afterClosed'.
   */
  guardarCambios() {
    this.dialogRef.close(this.productoEditado); 
  }

  /**
   * Cierra el modal sin enviar ningún dato (null/undefined).
   * Indica al Dashboard que no debe realizar ninguna actualización.
   */
  cancelar() {
    this.dialogRef.close(); 
  }
}