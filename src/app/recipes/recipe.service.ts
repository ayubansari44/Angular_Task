import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
    recipesChanged=new Subject<Recipe[]>();

    // private recipes: Recipe[] =[                //add recipes here
    //     new Recipe('Noodles', 
    //     'try tasty noodles',
    //      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/spaghetti-puttanesca_1-1ce4e81.jpg?quality=90&resize=440%2C400',
    //      [
    //          new Ingredient('Ketchup',1),
    //          new Ingredient('Vegetable', 5)
    //      ]),
    //      new Recipe('Burger', 
    //      'just launched today',
    //      'https://b.zmtcdn.com/data/pictures/3/19056703/a00611e60fce78cf0bed4d163d41d207_o2_featured_v2.jpg',
    //      [
    //         new Ingredient('Aloo tikki',1),
    //         new Ingredient('French fries', 20)
    //      ])     //calls to constructor which has 3 arguments
     // ];

     private recipes: Recipe[]=[];

      constructor(private slService: ShoppingListService){}

      setRecipes(recipes: Recipe[]){
          this.recipes=recipes;
          this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes()
      {
          return this.recipes.slice();
      }

      getRecipe(index: number){
          return this.recipes[index];
      }
      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe:Recipe){
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
          this.recipes[index]=newRecipe;
          this.recipesChanged.next(this.recipes.slice());

      }

      deleteRecipe(index: number){
          this.recipes.splice(index,1);
          this.recipesChanged.next(this.recipes.slice());
      }
}

