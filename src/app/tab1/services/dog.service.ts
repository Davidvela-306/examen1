import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class DogServices {
  obtenerImagenDePerro() {
    console.log('obtenerImagenDePerro');
    return axios
      .get('https://dog.ceo/api/breed/beagle/images/random')
      .then((response) => {
        console.log('respuesta del servidor:', response);
        return response.data.message;
      })
      .catch((error) => {
        console.error('error:', error);
        throw error;
      });
  }

  obtenerLibros() {
    console.log('obtenerLibros');
    return axios
      .get('https://gutendex.com/books/?ids=1,2,3,4,5,6,7,8,9,10')
      .then((response) => {
        console.log('libros:', response);
        return response.data.results;
      })
      .catch((error) => {
        console.error('error:', error);
        throw error;
      });
  }
  
}
