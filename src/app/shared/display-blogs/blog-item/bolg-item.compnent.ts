import { Component, Input, Output, EventEmitter, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Subject, Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentsService } from '../../comments.service';
import { AuthFormService } from 'src/app/auth/auth-form.service';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Comments } from '../../comments.model';
import { Reply } from '../../reply.model';
import { DataStorageService } from '../../data-storage.service';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
    selector: 'app-blog-item',
    templateUrl: './blog-item.component.html',
    providers: [CommentsService]
})
export class BlogItem implements OnInit, DoCheck, OnDestroy{

    commentsForm: FormGroup;
    isReply: boolean = false;
    commentClicked:number = -1;
    clickedCommentReplyData: Reply = null;
    anotherSub: Subscription;
    @Input() singleRecipe: Recipe;
    @Output() closeBox = new Subject<void>();

    constructor(private commentService: CommentsService,
        private authService: AuthFormService,
        private dataStorageService: DataStorageService){}

    onClose() {
        this.closeBox.next();
    }

    ngOnInit() {
        this.commentsForm = new FormGroup({
            commentText: new FormControl()
        });
    }
    
    ngDoCheck() {
    }

    ngOnDestroy() {
        this.closeBox.next();
    }

    onReplyData(i:number, event: Reply) {
        this.clickedCommentReplyData = event;
        this.commentClicked = this.singleRecipe.comments[i].commentId;
        if(this.clickedCommentReplyData){
            this.commentService.updateReplyToComments(this.singleRecipe.recId, this.commentClicked, this.clickedCommentReplyData);
        }
    }

    onReplyClicked(i:number) {
        this.isReply = true;
        for(const comIn in this.singleRecipe.comments){
            const commentClicked = this.singleRecipe.comments[this.singleRecipe.comments
                .indexOf(this.singleRecipe.comments[i])].commentId;
            if(this.singleRecipe.comments[comIn].commentId === commentClicked){
                this.commentClicked = this.singleRecipe.comments[comIn].commentId;
            }
             
        }
        
    }

    onSubmit() {
        let commentId = this.commentService.getCommentCount(this.singleRecipe.recId);
        let commentUser = this.authService.getLoginData();
    
        
        if(this.authService.getLoginData()){
            this.commentsForm = new FormGroup({
                commentId: new FormControl(commentId),
                commentText: new FormControl(this.commentsForm.get('commentText').value),
                commentUser: new FormControl(commentUser),
                commentTime: new FormControl(new Date()),
                commentReply: new FormControl()
            });
            this.commentService.updateCommentToRecipe(this.singleRecipe.recId, this.commentsForm.value);
            this.commentService.setComemntsCount(commentId+1);
        }

        this.commentsForm.patchValue({
            commentText: ''
        }); 
        
    }

    
  

}