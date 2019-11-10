import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentsService } from 'src/app/shared/comments.service';
import { AuthFormService } from 'src/app/auth/auth-form.service';
import { Reply } from 'src/app/shared/reply.model';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html'
})
export class ReplyComponent implements OnInit{
    replyForm: FormGroup;
    @Input() replyEl;
    @Output() replyTriggered = new EventEmitter<Reply>();

    constructor(private commentService: CommentsService,
        private authService: AuthFormService) {}

    ngOnInit() {
        this.replyForm = new FormGroup({
            replyText: new FormControl()
        });
    }

    onSubmit() {
        let replyId = this.commentService.getReplyCount();
        let replyUser = this.authService.getLoginData();
        
        if(this.authService.getLoginData()){
            this.replyForm = new FormGroup({
                replyId: new FormControl(replyId),
                replyText: new FormControl(this.replyForm.get('replyText').value),
                replyUser: new FormControl(replyUser),
                replyTime: new FormControl(new Date()),
            });

            this.replyTriggered.emit(this.replyForm.value);
            //this.commentService.updateReplyToComments(this.singleRecipe.recId, this.commentsForm.value);
            this.commentService.setReplyCount(replyId+1);
        }

        this.replyForm.patchValue({
            replyText: ''
        }); 

}
}