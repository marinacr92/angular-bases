import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
// El providedIn: 'root' permite que este servicio esté disponible a lo largo de la aplicación y todos los módulos que inyecten el servicio. Si no lo tuviéramos puesto habría que escribir en cada módulo en que lo requiramos, providers: [nombreDelServicio]
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'r8QvLrZknf3MmGqqMxYVA5FHTZibNUsO';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
    // Se usa el spread operator para no romper la referencia y que sea una copia de lo almacenado en la variable
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes( tag )) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ))
  }

  private loadLocalStorage(): void {
    if( !localStorage.getItem('history')) return
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if ( this._tagsHistory.length === 0 ) return
    this.searchTag( this._tagsHistory[0] )
  }

  // Típica forma de JS de hacer un fetch

  // searchTag( tag: string ): void {
  //   if ( tag.length === 0 ) return;
  //   this.organizeHistory( tag );

  //   fetch('https://api.giphy.com/v1/gifs/search?api_key=r8QvLrZknf3MmGqqMxYVA5FHTZibNUsO&q=valorant&limit=10')
  //     .then( resp => resp.json() )
  //     .then( data => console.log(data) );
  // }

  // También se podría hacer un fetch asíncrono

  // async searchTag( tag: string ): Promise<void> {
  //   if ( tag.length === 0 ) return;
  //   this.organizeHistory( tag );

  //   const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=r8QvLrZknf3MmGqqMxYVA5FHTZibNUsO&q=valorant&limit=10')
  //   const data = await resp.json();
  //   console.log(data);
  // }


  // Angular tiene la opción, preferida, de usar observables en vez de promesas

  searchTag( tag: string ): void {
    if ( tag.length === 0 ) return;
    this.organizeHistory( tag );

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

        this.gifList = resp.data;
      } )
  }

}
