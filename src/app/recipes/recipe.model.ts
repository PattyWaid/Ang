import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';

export class Recipe {
  public recId: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public category: string;
  public user: string;
  public ingredients: Ingredient[];

  constructor(recId: number, name: string, desc: string, imagePath: string, category: string, 
    user: string, 
    ingredients: Ingredient[]) {
    this.recId = recId;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.category = category;
    this.user = user;
    this.ingredients = ingredients;
  }
}
