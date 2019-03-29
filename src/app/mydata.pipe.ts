import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'myData'
})
export class MyDataPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let str = moment(value);
    str.locale('ru');
    return str.format('LL');
  }

}
