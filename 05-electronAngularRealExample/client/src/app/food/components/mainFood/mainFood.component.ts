import { SignalRService } from '../../../core/data-services/signalr.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as FoodActions from '../../store/actions/food.actions';
import { FoodState } from '../../store/reducer/food.reducer';
import { FoodItem } from './../../../shared/models/foodItem.model';

@Component({
  selector: 'app-main-food-component',
  templateUrl: './mainFood.component.html'
})

export class MainFoodComponent implements OnInit {
  foodState$: Observable<FoodState>;

  constructor(private store: Store<any>, private signalRService: SignalRService) {
    this.foodState$ = this.store.select<FoodState>(state => state.food.foodItems);

    signalRService.foodAdded.subscribe((foodItem: FoodItem) => {
      this.store.dispatch(new FoodActions.AddFoodSuccessAction(foodItem));
    });
  }

  ngOnInit() {
    this.store.dispatch(new FoodActions.LoadFoodAction());
  }

  setCurrentlySelectedFood(foodItem: FoodItem) {
    this.store.dispatch(new FoodActions.SelectFoodAction(foodItem));
  }

  addFood(foodItem: FoodItem) {
    this.store.dispatch(new FoodActions.AddFoodAction(foodItem));
  }

  updateFood(foodItem: FoodItem) {
    this.store.dispatch(new FoodActions.UpdateFoodAction(foodItem));
  }

  deleteFood(foodItem: FoodItem) {
    this.store.dispatch(new FoodActions.DeleteFoodAction(foodItem));
  }
}
