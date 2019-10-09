import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, flatMap, switchMap } from 'rxjs/operators';

import { User } from './user';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnDestroy {
  
  control = new FormControl();
  user: User;

  destroy = new Subject<void>();

  constructor(private appService: AppService) {
    const observer = u => {
      console.log(u);
      this.user = u;
    };
    
    this.control.valueChanges.pipe(
      takeUntil(this.destroy)
    ).subscribe(id => 
      this.appService.getUser(id).subscribe(observer)
    );

    /*
    this.control.valueChanges.pipe(
      flatMap(this.appService.getUser),
      takeUntil(this.destroy)
    ).subscribe(observer);
    this.control.valueChanges.pipe(
      switchMap(this.appService.getUser),
      takeUntil(this.destroy)
    ).subscribe(observer);
    */


  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
