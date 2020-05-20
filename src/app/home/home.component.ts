import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";

import { ElectronService } from "../core/services";
import { DataService } from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  channelInfo: any;
  channelSubscription: Subscription;

  constructor(
    private router: Router,
    private electron: ElectronService,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    this.channel('UCVyRiMvfUNMA1UP1DPzG5Ow')
  }

  minimizeWindow() {
    this.electron.window.minimize();
  }

  closeWindow() {
    this.electron.window.close();
  }

  channel(name: string) {
    if (this.channelSubscription) {
      this.channelSubscription.unsubscribe();
    }

    this.channelSubscription = this.dataService.getStats(name)
      .subscribe(res => {
        this.channelInfo = res;
      })
  }
}

