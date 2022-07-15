import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lineOfBusiness-detail',
  templateUrl: './lineOfBusiness-detail.component.html',
  styleUrls: [ './lineOfBusiness-detail.component.css' ]
})
export class LineOfBusinessDetailComponent implements OnInit, OnDestroy {
  lineOfBusiness: LineOfBusiness | undefined;
  amountOfQuotes: number = 0;
  subscription: Subscription | undefined;
  subscription2: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private lineOfBusinessService: LineOfBusinessService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.getLineOfBusiness(id);
    this.getAmountOfQuotes(id);
  }

  getLineOfBusiness(id: number): void {
    this.subscription = this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe(lineOfBusiness => this.lineOfBusiness = lineOfBusiness);
  }

  getAmountOfQuotes(id: number): void {
    this.subscription2 = this.lineOfBusinessService.getRecentQuotes().subscribe(recentQuotes => {
      this.amountOfQuotes =  recentQuotes.filter(quote => quote.lineOfBusiness === id)?.length;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.lineOfBusiness) {
      this.lineOfBusinessService.updateLineOfBusiness(this.lineOfBusiness)
        .subscribe(() => this.goBack());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription2?.unsubscribe();
  }
}
