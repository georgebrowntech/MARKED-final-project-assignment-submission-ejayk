import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameSearch'
})
export class GameSearchPipe implements PipeTransform {

  transform(list: any[], filter: String): any {
    if (!list || !filter){
      return list;
    }

    return list.filter(game => game.title.toLowerCase().includes(filter.toLowerCase()))
  }

}
