import { Reply } from './reply.model';

export class Comments {
    public commentId: number;
    public commentText: string;
    public commentUser: string;
    public commentTime: Date;
    public commentReply?: Reply[];



    constructor(commentId: number, commentText: string, commentUser: string,
        commentTime: Date, commentReply: Reply[]) {

            this.commentId = commentId;
            this.commentReply = commentReply;
            this.commentText = commentText;
            this.commentTime = commentTime;
            this.commentReply = commentReply;

    }
}