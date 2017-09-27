import { Component, Input, NgZone, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import { AbstractCameraService } from '../../core/services/camera.service';
import { FoodItem } from '../../shared/models/foodItem.model';

@Component({
  selector: 'sneakpeek',
  templateUrl: 'sneakpeek.component.html'
})

export class SneakPeekComponent implements OnInit {

  @Input() foodItem: FoodItem;

  constructor(private cameraService: AbstractCameraService,
    private electronService: ElectronService,
    private ngZone: NgZone) { }

  ngOnInit() { }

  takePicture($event: any, foodItem: FoodItem) {
    $event.preventDefault();
    this.cameraService.getPhoto().subscribe((imageString: string) => {
      this.ngZone.run(() => {
        foodItem.imageString = imageString;
      });
    });
  }

  saveImage($event: any, foodItem: FoodItem) {
    $event.preventDefault();
    if (this.electronService.isElectronApp) {
      console.log('sending ...');
      this.electronService.ipcRenderer.send('save-picture', foodItem.imageString);
    }
  }
}
