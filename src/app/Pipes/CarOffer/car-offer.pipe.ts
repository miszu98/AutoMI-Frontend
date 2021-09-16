import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carOffer'
})
export class CarOfferPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 35) {
      return value.substring(1, 35);
    } return value;
  }

}
