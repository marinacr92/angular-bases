/// Las interfaces no hay que importarlas en el módulo porque no tienen una traducción a JS, son propias de TS y generan 0 líneas de código en JS
export interface Character {
  id?: string;
  name: string;
  power: number
}
