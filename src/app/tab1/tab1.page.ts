import { Component } from '@angular/core';
import { DogServices } from './services/dog.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  imagenesDePerros: any[] = [];
  libros: any[] = [];

  constructor(private dogServices: DogServices) {
    console.log('Constructor Tab1Page');
    console.log('dogServices:', dogServices);
  }

  ngOnInit() {
    console.log('ngOnInit');
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
}
