import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LineOfBusiness, Quote } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.css']
})
export class MostPopularComponent {

  linesOfBusiness$: Observable<LineOfBusiness[]> = this.lineOfBusinessService.getLinesOfBusiness();
  recentQuotes$: Observable<Quote[]> = this.lineOfBusinessService.getRecentQuotes();
  popularLinesOfBusiness$: Observable<LineOfBusiness[]>;

  constructor(private lineOfBusinessService: LineOfBusinessService) {
    this.popularLinesOfBusiness$ = combineLatest(this.linesOfBusiness$, this.recentQuotes$)
    .pipe(
      map(([linesOfBusiness, recentQuotes]) => {
        linesOfBusiness.forEach(lineOfBusiness => {
          lineOfBusiness.quoteCount = recentQuotes.filter(quote => quote.lineOfBusiness === lineOfBusiness.id)?.length;
        });

        linesOfBusiness.sort((a, b) => (a.quoteCount > b.quoteCount) ? -1 : 1);
        return linesOfBusiness.slice(0, 2);
      }),
    );
  }

}
