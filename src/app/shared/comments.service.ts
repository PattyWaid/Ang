import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comments } from './comments.model';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from './data-storage.service';
import { Reply } from './reply.model';

@Injectable({providedIn: 'root'})
export class CommentsService {
    commentsChanged = new Subject<Comments[]>();
    comments: Comments[] = [];
    private count: number = 0;
    private replyCount: number = 0;
    

    constructor(private recipeService: RecipeService,
        private dataStorageService: DataStorageService) {}

    getCommentCount(recId: number) {
        const recipes = this.recipeService.getRecipes();
        for(let rec = 0; rec < recipes.length; rec++){
            if(recipes[rec].recId === recId){
                if(recipes[rec].comments){
                    for(let com = 0; com< recipes[rec].comments.length; com++){
                        this.count = recipes[rec].comments.length
                    }
                }else {
                    this.count = 0;
                }
                
            }
        }
        return this.count;
       }
     
    setComemntsCount(idCount: number) {
        this.count = idCount;
    }

    setComments(comment: Comments[]) {
        if(comment){
        this.comments = comment;
        this.commentsChanged.next(this.comments.slice());
        }
      }

    getComments() {
        this.commentsChanged.next(this.comments.slice());
    }

    getReplyCount() {
        return this.replyCount;
       }
     
    setReplyCount(idCount: number) {
        this.replyCount = idCount;
    }


    

    updateCommentToRecipe(index: number, comment: Comments) {
        const recipes = this.recipeService.getRecipes();
        for(const rec in recipes){
          if(recipes[rec].recId === index){
            let commentArray:Comments [] = recipes[rec].comments;
            if(commentArray){
                commentArray.push(comment); 
            } else {
                commentArray = [comment];
                
            }
            recipes[rec].comments = commentArray;
            this.dataStorageService.storeRecipes();
          }
        }
      }

      updateReplyToComments(index: number, commentId: number, reply: Reply) {
          const recipes = this.recipeService.getRecipes();
          for(const rec in recipes) {
              if(recipes[rec].recId === index){
              for(const comment in recipes[rec].comments){
                  if(recipes[rec].comments[comment].commentId === commentId){
                    let replyArr: Reply[] = recipes[rec].comments[comment].commentReply;
                    if(replyArr){
                        replyArr.push(reply);
                    } else {
                        replyArr = [reply];
                    }
                    recipes[rec].comments[comment].commentReply = replyArr;
                    this.dataStorageService.storeRecipes();
                  }
              }
            }
          }
      }



    getComment(index: number) {
        for(const com in this.comments){
          if(this.comments[com].commentId === index){
            return this.comments[this.comments.indexOf(this.comments[com])];
          }
        }
      }


}