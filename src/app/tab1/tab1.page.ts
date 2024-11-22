import { Component } from '@angular/core';
import { DogServices } from './services/dog.service';
import { ToastController } from '@ionic/angular';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  imagenesDePerros: any[] = [];
  libros: any[] = [];

  /**
   * Constructor
   *
   * Inyecta el servicio DogServices y ToastController
   * @param dogServices Servicio que devuelve una lista de perros
   * @param toastController Controlador de Toasts
   */
  constructor(
    private dogServices: DogServices,
    private toastController: ToastController
  ) {
    // Inyectar ToastController
    console.log('Constructor Tab1Page');
    console.log('dogServices:', dogServices);
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.obtenerLibros();
    this.obtenerImagenesDePerros();
  }

  /**
   * Obtiene los libros de la API de Gutendex y los carga en el
   * arreglo "libros".
   */
  obtenerLibros() {
    this.dogServices
      .obtenerLibros()
      .then((libros) => {
        console.log('libros obtenidos:', libros);
        this.libros = libros;
        console.log('arreglo:', this.libros);
      })
      .catch((error) => {
        console.error('error:', error);
      });
  }

  /**
   * Obtiene 10 imagenes de perros y las carga en el arreglo
   * imagenesDePerros
   */
  obtenerImagenesDePerros() {
    for (let i = 0; i < 10; i++) {
      this.dogServices
        .obtenerImagenDePerro()
        .then((imagen) => {
          console.log('imagen obtenida:', imagen);
          this.imagenesDePerros.push(imagen);
          console.log('arreglo:', this.imagenesDePerros);
        })
        .catch((error) => {
          console.error('error:', error);
        });
    }
  }
  /**
   * Guarda el título de un libro y la URL de una imagen en Firebase, y muestra un toast de confirmación.
   * @param {any} libro - El objeto del libro que contiene el título.
   * @param {any} imagen - La URL de la imagen a guardar.
   * @returns {Promise<void>} Una promesa que se resuelve cuando la operación de guardado se completa.
   */

  async guardarLibro(libro: any, imagen: any) {
    try {
      await this.dogServices.guardarEnFirebase(libro.title, imagen); // Esperar a que se guarde
      this.mostrarToast(); // Mostrar el toast después de guardar
    } catch (error) {
      console.error('Error al guardar el libro:', error);
    }
  }

  /**
   * Muestra un toast con un mensaje de confirmación de guardado.
   * @returns {Promise<void>} Promesa que se resuelve cuando se cierra el toast.
   */
  async mostrarToast() {
    const toast = await this.toastController.create({
      message: 'La imagen se ha guardado correctamente.',
      duration: 2000, // Duración en milisegundos
      position: 'bottom', // Posición del toast
    });
    toast.present(); // Presentar el toast
  }
}
