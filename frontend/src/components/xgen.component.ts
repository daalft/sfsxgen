import { Component, ElementRef, OnInit } from "@angular/core";
import { LocalizerService } from "src/services/localizer.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BackendService } from "src/services/backend.service";

@Component({
    selector: 'xgen-component',
    templateUrl: '../templates/xgen.template.html',
    styleUrls: []
})
export class XGenComponent implements OnInit {
;
    public lesson: string = "1";
    public pos: string = "NOUN";
    private target_form: string = "tokens";

    public dataLoaded: boolean = false;
    public doExercise: boolean = false;

    public mode: string;    
    public tokens: any;

    public lessonTitle: string = "";
    public uiHighlight: boolean = false;

    public targets: any = [];

    public errorMsg: string = "";
    public summary: string = "";

    public manualPos: string = "NOUN";
    public validPos = ["NOUN", "VERB", "ADJ", "ADV", "PRON", "NUM", "ART", "SUBJ", "INTJ"]

    public manualLesson: string = "1";
    public validLessons = ["1", "2", "3", "4", "5", "6"];

    private listTargetAlphabetically: boolean = false;
    private listTargetLemma: boolean = false;

    public showAdvancedMenu: boolean = false;

    public posFixed: boolean = false;
    public lessonFixed: boolean = false;

    constructor(public ls: LocalizerService, private route: ActivatedRoute, private backend: BackendService, private elem: ElementRef) {
        this.pos = "";
        this.lesson = "";
        this.mode = "";
        this.target_form = "token";
    }

    ngOnInit() {
        const prefLang  = window.localStorage.getItem("prefLang");
        if (prefLang) {
            this.changeLanguage(prefLang);
        }
        const me = this;
        this.route.queryParams.subscribe(params => {
            console.log(params);
            if (params["pos"]) {
                this.pos = params["pos"];
                this.manualPos = this.pos;
                this.posFixed = true;
            }
            if (params["lesson_number"]) {
                this.lesson = params["lesson_number"];
                this.manualLesson = this.lesson;
                this.lessonFixed = true;
            }
            if (params["tf"]) {
                this.target_form = params["tf"];
            }
            if (params["tl"]) {
                window.setTimeout(function() {me.ls.setLanguage(params["tl"]);}, 100);
            }
            if (params["fxm"]) {
                this.doExercise = true;
            } 
            if (params["alpha"]) {
                this.listTargetAlphabetically = true;
            }
            if (params["beta"]) {
                this.listTargetLemma = true;
            }
            if (this.pos && this.lesson) {
                this.mode = "static";
                this.loadLesson();
            } else {
                me.errorMsg = "Invalid parameter settings!";
            }
        });
    }

    loadLesson() {
        const me = this;
        this.errorMsg = "";
        this.backend.fetch_lesson(this.lesson, this.pos, this.target_form).subscribe({
            next(v: any) {
                me.lessonTitle = v["title"];
                me.tokens = v["tokens"];
                me.targets = v["targets"];
                if (me.listTargetLemma) {
                    me.targets = v["targets_lemma"];
                }
                if (me.listTargetAlphabetically) {
                    me.targets.sort();
                }
                me.dataLoaded = true;
            },
            error(msg: any) {
                console.log(msg);
                if (msg["status"] === 404) {
                    window.setTimeout(function() {me.errorMsg = me.ls.localize('error-lesson-not-found');}, 500);
                } else {
                   me.errorMsg = msg["statusText"];
            }
            }});
    }

    manualSet() {
        this.pos = this.manualPos;
        this.lesson = this.manualLesson;
        this.loadLesson();
    }

    manualPosSet() {
        this.pos = this.manualPos;
        this.loadLesson();
    }

    manualLessonSet() {
        this.lesson = this.manualLesson;
        this.loadLesson();
    }
    changeLanguage(lang: string) {
        this.ls.setLanguage(lang);
        window.localStorage.setItem("prefLang", lang);
    }

    highlight_words() {
        this.uiHighlight = !this.uiHighlight;
    }

    do_exercise() {
        this.doExercise = true;
        this.uiHighlight = false;
    }

    debug() {
        
    }

    checkAnswers() {
        const gaps = <any>document.getElementsByClassName("gap");
        let correctCount = 0;
        let totalCount = gaps.length;
        for (let i = 0; i < gaps.length; i++) {
            const cgap = gaps[i];
            const uval = cgap["value"].toLowerCase();
            const tval = cgap["accept"].split(",").map((x: string) => x.toLowerCase());
            cgap.classList.remove("provided-answer");
            if (uval !== "" && tval.includes(uval)) {
                cgap.classList.remove("incorrect-answer");
                cgap.classList.add("correct-answer");
                correctCount++;
            } else {
                cgap.classList.add("incorrect-answer");
                cgap.classList.remove("correct-answer");
            }
        }
        this.summary = correctCount + " " + this.ls.localize('results-of') + " " + totalCount;
    }

    showAnswers() {
        const gaps = this.elem.nativeElement.querySelectorAll(".gap");
        console.log(gaps);
        for (let i = 0; i < gaps.length; i++) {
            const cgap = gaps[i];
            const firstAnswer = cgap["accept"].split(",")[0]
            cgap.value = firstAnswer;

            cgap.classList.remove("incorrect-answer");
            const cgapCLArray = Array.from(cgap.classList);
            console.log(cgapCLArray);
            if (!cgapCLArray.includes("correct-answer")) {
                cgap.classList.add("provided-answer");
            }
        }
    }

    backToPosSelect() {
        if (!this.posFixed) {
            this.pos = "";
        }
        this.dataLoaded = false;
        this.summary = "";
        this.doExercise = false;
        if (!this.lessonFixed) {
            this.lesson = ""; 
        }
        this.uiHighlight = false;
    }
}