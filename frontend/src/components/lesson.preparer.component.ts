import { Component, ElementRef, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BackendService } from "src/services/backend.service";
import { PleaseWaitComponent } from "./waiter.component";

@Component({
    selector: 'app-lesson-preparer',
    templateUrl: '../templates/lesson.preparer.template.html',
    styleUrls: []
})
export class LessonPreparerComponent {
    @ViewChild(PleaseWaitComponent) waiter!: PleaseWaitComponent;


    public identified: boolean = true;
    public currentPage: string = "add";
    public processedText: boolean = false;
    public posData: any;
    public stepTwo: boolean = false;
    public validPos = ["NOUN", "VERB", "ADJ", "ADV", "PRON", "NUM", "ART", "SUBJ", "INTJ"];
    public showValidPos: boolean = false;

    public currentPageNumber: number = 0;

    private validPages = ["home", "add", "view", "options"];
    private disabledNumbers: any = [];


    private lessonNumber: string = "";
    private lessonTitle: string = "";

    constructor(private backend: BackendService, private snack: MatSnackBar, private elem: ElementRef) {}

    identify(me: string, pass: string) {
        this.waiter.on();
        this.backend.identify(me, pass).subscribe({
            next: (v: any) => {
                if (v["statuscode"]===200) {
                    this.identified = true;
                 } else {
                     this.snack.open("Invalid username or password!", "OK", {duration: 5000});
                 }
            },
            error: (msg) => {
                console.log(msg);
                this.snack.open("Unknown error!", "OK", {duration: 5000});
            },
            complete: () => {
                this.waiter.off();
            }
        });
    }

    navigate(page: string) {
        if (this.validPages.includes(page)) {
            this.currentPage = page;
        } else {
            this.snack.open("Invalid page!", "OK", {duration: 5000});
        }
    }

    process(ln: string, title: string, text: string) {
        if (!ln || !title || !text) {
            this.snack.open("Please fill out all fields!", "OK", {duration: 5000});
            return;
        }
        this.lessonNumber = ln;
        this.lessonTitle = title;
        this.waiter.on();
        this.backend.process(text).subscribe({
            next: (v) => {
            this.posData = v;
            this.waiter.off();
            this.processedText = true;
        }, error: (error) => {
            this.snack.open("Something went wrong!", "OK", {duration: 5000});
        }});
        this.next();
    }

    next() {
        //this.stepTwo = true;
        this.currentPageNumber++;
    }

    back() {
        this.currentPageNumber--;
    }

    discard() {
        this.posData = "";
        this.processedText = false;
        this.stepTwo = false;
        this.disabledNumbers = [];
    }

    insertLinebreak(i: number) {
        this.posData.splice(i+1, 0, {"lemma": "<br/><br/>", "pos": "LINEBREAK", "text": "<br/><br/>", "sent_id": -1, "max_sent_id": 0});
        this.disabledNumbers.push(i);
    }

    deleteWord(i: number) {
        this.posData.splice(i, 1);
    }

    togglePos() {
        this.showValidPos = !this.showValidPos;
    }

    getIsDisabled(i: number) {
        if (this.disabledNumbers.includes(i)) {
            return true;
        }
        return false;
    }

    preview() {

    }

    debug() {
        this.backend.process2(this.posData, true, true, 4).subscribe({
            next: (v) => {
                console.log(v);
            },
            error: (msg) => {},
            complete: () => {}
        })
    }
}
