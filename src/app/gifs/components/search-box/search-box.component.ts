import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input
    #txtTagInput
    type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    >
    <!-- #txtTagInput es una referencia local. Así es como se va a llamar el input en el html, no en el ts, solo en el html
    Con keyup.enter le decimos que la llamada al método sea solo cuando se presiona la tecla enter -->
  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  // El @ViewChild sirve para acceder a una referencia local desde el ts

  constructor( private gifsService: GifsService ) {

  }
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
