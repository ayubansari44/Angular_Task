// import { Component, OnInit } from '@angular/core';
// import { Ingredient } from '../shared/ingredient.model';

// @Component({
//   selector: 'app-shopping-list',
//   templateUrl: './shopping-list.component.html',
//   styleUrls: ['./shopping-list.component.css']
// })
// export class ShoppingListComponent implements OnInit {
//   ingredients: Ingredient[] =[
//     new Ingredient('Apple', 5),
//     new Ingredient('Tomatoes', 10)
//   ];

//   constructor() { }

//   ngOnInit(): void {
//   }

//     onIngredientAdded(ingredient: Ingredient)
//     {
//       this.ingredients.push(ingredient);
//     }
// }
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private idChangeSub: Subscription

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.slService.getIngredients();
    this.idChangeSub= this.slService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients=ingredients;
      }
    );
  }

  onEditItem(index:number)
  {
    this.slService.startedEditing.next(index);
  }
  ngOnDestroy(): void{
    this.idChangeSub.unsubscribe();
  }
  
}
