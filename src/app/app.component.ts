import { Component } from '@angular/core';

@Component({   /// El decorador es una función que transforma mi clase para que sea un componente
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title: string = 'Hola Mundo';

}
