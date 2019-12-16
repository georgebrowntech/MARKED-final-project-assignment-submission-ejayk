import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerSearch'
})
export class PlayerSearchPipe implements PipeTransform {

  transform(list: any[], filter: String): any {
    if (!list || !filter){
      return list;
    }
    return list.filter(player => player.name.toLowerCase().includes(filter.toLowerCase()))
  }

}
