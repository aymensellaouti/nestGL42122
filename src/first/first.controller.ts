import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Controller()
export class FirstController {
  @Get('obs')
  asynchrone() {
    const observable = new Observable<number>((observer) => {
      let i = 3;
      setInterval(() => {
        if (!i) {
          observer.complete();
        } else {
          observer.next(i--);
        }
      }, 500);
    });

    observable
      .pipe(
        map((data) => data * 3),
        filter((data) => data % 2 == 0),
      )
      .subscribe(
        (maValeur) => console.log(`ceci es ce que j ai recu ${maValeur}`),
        (erreur) => console.log('erreur : ', erreur),
        () => console.log('it s over'),
      );
    observable.subscribe((data) => console.log(data));
    return of(5,7,6);
  }
}
