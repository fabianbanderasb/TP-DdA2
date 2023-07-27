import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LogsPage implements ViewWillEnter {
  logs$!: Observable<Log[]>;

  valveId!: number;

  isLoading$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(true);

  constructor(private logService: LogService, private actRout: ActivatedRoute) {}

  ionViewWillEnter(): void {
    this.getValveId();
    this.getLogs();
  }

  private getValveId(): void {
    this.valveId = Number(this.actRout.snapshot.paramMap.get('id'));
  }

  private getLogs(): void {
    this.logs$ = this.logService.getAll(this.valveId).pipe(finalize(() => {this.isLoading$.next(false);}));
  }

}
