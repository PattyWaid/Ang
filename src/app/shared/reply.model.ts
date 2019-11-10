export class Reply {
    public replyId: number;
    public replyText: string;
    public replyUser: string;
    public replyTime: Date;


constructor(replyId: number, replyText: string, replyUser: string, replyTime: Date) {
    this.replyId = replyId;
    this.replyText = replyText;
    this.replyUser = replyUser;
    this.replyTime = replyTime;
}

}