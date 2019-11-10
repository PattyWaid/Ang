import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Comments } from '../shared/comments.model';

export class Recipe {
  public recId: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public category: string;
  public user: string;
  public ingredients: Ingredient[];
  public comments?: Comments[]

  constructor(recId: number, name: string, desc: string, imagePath: string, category: string, 
    user: string, 
    ingredients: Ingredient[],
    comments: Comments[]) {
    this.recId = recId;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.category = category;
    this.user = user;
    this.ingredients = ingredients;
    this.comments = comments
  }
}
