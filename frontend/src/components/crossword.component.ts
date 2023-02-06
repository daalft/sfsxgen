import { getHtmlTagDefinition } from "@angular/compiler";
import { AfterViewInit, Component, ElementRef } from "@angular/core";
import { EMPTY } from "rxjs";
import { LocalizerService } from "src/services/localizer.service";

@Component({
    selector: 'crossword',
    templateUrl: '../templates/crossword.template.html',
    styleUrls: []
})
export class CrosswordComponent {

    public cwdata = [
        ["*","*","*","*","*","*","*","*","*","*","p","*","*","*","*","*","*","*","*","*","*"],
        ["*","*","*","*","*","*","*","*","*","p","å","s","k","m","u","s","t","*","*","*","*"],
        ["*","*","*","*","g","o","d","i","s","*","s","*","*","*","*","k","*","*","*","*","*"],
        ["*","f","e","m","*","*","*","*","v","*","k","*","*","*","*","o","*","*","*","*","*"],
        ["*","*","*","y","*","*","*","*","e","*","ä","*","*","*","*","l","e","d","i","g","t"],
        ["*","v","*","c","*","*","*","*","r","*","g","*","d","*","*","l","*","*","*","*","*"],
        ["p","å","s","k","k","ä","r","r","i","n","g","a","r","*","*","o","*","*","*","*","*"],
        ["*","r","*","e","*","*","*","*","g","*","*","*","i","*","*","v","*","*","*","*","*"],
        ["*","*","*","t","*","*","*","*","e","*","*","*","c","*","b","*","*","*","*","*","*"],
        ["*","*","*","*","*","*","*","*","*","p","*","*","k","*","a","*","*","l","*","*","*"],
        ["*","*","*","*","*","*","*","*","*","å","*","*","e","*","r","*","*","ö","*","*","*"],
        ["*","*","*","*","*","*","*","*","*","s","*","g","r","a","n","n","a","r","*","*","*"],
        ["*","*","*","*","*","*","*","*","*","k","*","*","*","*","*","*","*","d","*","*","*"],
        ["*","*","*","*","*","*","*","*","*","m","*","*","*","s","k","o","l","a","n","*","*"],
        ["*","*","*","*","*","*","*","*","h","a","l","v","a","*","*","*","*","g","*","*","*"],
        ["*","*","*","*","*","*","*","*","*","t","*","*","*","*","*","*","*","*","*","*","*"]
        ];

    private previousMovement: string = "";

    constructor(private elem: ElementRef, public ls: LocalizerService) {

    }

    getId(i:number, j:number) {
        return "cw-" + i + "-" + j; 
    }

    jumpTo(i: number, j: number) {
        const el = this.elem.nativeElement.querySelector(`#cw-${i}-${j}`);
        if (el) {
            el.focus();
        }
    }

    getHintText(i:number, j:number) {
        //console.log(i);
        //console.log(j);
        let hints = [];
        /*const targets = this.elem.nativeElement.querySelectorAll('.hint1');
        for (let i = 0; i < targets.length; i++) {
            targets[i].classList.add('active-hint');
        }*/
        if (i === 0) {
            // hint 1
            hints.push(1);
        }
        if (i === 1) {
            // hint 2
            hints.push(2);
            if (j === 10) {
                // hint 1
                hints.push(1);
            }
            if (j === 15) {
                hints.push(4);
            }
        }
        if (i === 2) {
            if (j < 9) {
                hints.push(3);
            }
            if (j === 8) {
                hints.push(6);
            }
            if (j === 10) {
                hints.push(1);
            }
            if (j >= 15) {
                hints.push(4);
            }
        }
        if (i === 3) {
            if (j < 4) {
                hints.push(5);
            }
            if (j === 3) {
                hints.push(10);
            }
            if (j === 8) {
                hints.push(6);
            }
            if (j === 10) {
                hints.push(1);
            }
            if (j === 15) {
                hints.push(4);
            }
        }
        if (i === 4) {
            if (j === 3) {
                hints.push(10);
            }
            if (j === 8) {
                hints.push(6);
            }
            if (j === 10) {
                hints.push(1);
            }
            if (j === 15) {
                hints.push(4);
                hints.push(7);
            }
        }
        if (i === 5) {
            if (j === 1) {
                hints.push(9);
            }
            if (j === 3) {
                hints.push(10);
            }
            if (j === 8) {
                hints.push(6);
            }
            if (j === 10) {
                hints.push(1);
            }
            if (j === 12) {
                hints.push(11);
            }
            if (j === 15) {
                hints.push(4);
            }
        }
        if (i === 6) {
            if (j < 13) {
                hints.push(8);
            }
            if (j === 1) {
                hints.push(9);
            }
            if (j === 3) {
                hints.push(10);
            }
            if (j === 8) {
                hints.push(6);
            }
            if (j === 10) {
                hints.push(1);
            }
            if (j === 12) {
                hints.push(11);
            }
            if (j === 15) {
                hints.push(4);
            }
        }
        if (i === 7) {
            if (j === 1) {
                hints.push(9);
            }
            if (j === 3) {
                hints.push(10);
            }
            if (j === 8) {
                hints.push(6);
            }
            if (j === 12) {
                hints.push(11);
            }
            if (j === 15) {
                hints.push(4);
            }
        }
        if (i === 8) {
            if (j === 3) {
                hints.push(10);
            }
            if (j === 8) {
                hints.push(6);
            }
            if (j === 12) {
                hints.push(11);
            }
            if (j === 14) {
                hints.push(12);
            }
        }
        if (i === 9) {
            if (j === 9) {
                hints.push(13);
            }
            if (j === 12) {
                hints.push(11);
            }
            if (j === 14) {
                hints.push(12);
            }
            if (j === 17) {
                hints.push(15);
            }
        }
        if (i === 10) {
            if (j === 9) {
                hints.push(13);
            }
            if (j === 12) {
                hints.push(11);
            }
            if (j === 14) {
                hints.push(12);
            }
            if (j === 17) {
                hints.push(15);
            }
        }
        if (i === 11) {
            if (j === 9) {
                hints.push(13);
            }
            if (j >= 11 && j <= 17) {
                hints.push(14);
            }
            if (j === 12) {
                hints.push(11);
            }
            if (j === 14) {
                hints.push(12);
            }
            if (j === 17) {
                hints.push(15);
            }
        }
        if (i === 12) {
            if (j === 9) {
                hints.push(13);
            }
            if (j === 17) {
                hints.push(15);
            }
        }
        if (i === 13) {
            if (j === 9) {
                hints.push(13);
            }
            if (j >= 13 && j <= 18) {
                hints.push(16);
            }
            if (j === 17) {
                hints.push(15);
            }
        }
        if (i === 14) {
            if (j >= 8 && j <= 12) {
                hints.push(17);
            }
            if (j === 9) {
                hints.push(13);
            }
            if (j === 17) {
                hints.push(15);
            }
        }
        if (i === 15) {
            hints.push(13);
        }
        const currentActiveHints = this.elem.nativeElement.querySelectorAll('.active-hint');
        for (let i = 0; i < currentActiveHints.length; i++) {
            currentActiveHints[i].classList.remove("active-hint");
        }
        for (let i = 0; i < hints.length; i++) {
            const hintNumber = hints[i];
            const targets = this.elem.nativeElement.querySelectorAll(`.hint${hintNumber}`);
            for (let j = 0; j < targets.length; j++) {
                targets[j].classList.add("active-hint");
            }
        }
    }

    keyhandler(ev: any, i: number,j: number) {
        ev.preventDefault();
        //console.log(ev.keyCode);
        //this.getHintText(i,j);
        if ([9,13,37,38,39,40].includes(ev.keyCode)) {
            
            if (ev.keyCode === 9) {
                // TAB
                // navigate to next cell
                
            }
            if (ev.keyCode === 13) {
                // ENTER
                // navigate to next cell
            }
            if (ev.keyCode === 37) {
                // navigate left
                if (this.canMoveLeft(i,j)) {
                    //console.log("move left");
                    this.navigate(i, j-1);
                }
            }
            if (ev.keyCode === 39) {
                // navigate right
                if (this.canMoveRight(i,j)) {
                    //console.log("move right");
                    this.navigate(i, j+1);
                }
            }
            if (ev.keyCode === 38) {
                // navigate up
                if (this.canMoveUp(i,j)) {
                    //console.log("move up");
                    this.navigate(i-1, j);
                }
            }
            if (ev.keyCode === 40) {
                // navigate down
                if (this.canMoveDown(i,j)) {
                    //console.log("move down");
                    this.navigate(i+1, j);
                }
            }
        }
        //console.log(ev.keyCode);
        if (ev.keyCode === 8) {
            this.emptyCellValue(i,j);
        }
        if ((ev.keyCode >= 65 && ev.keyCode <= 90) || ev.keyCode === 221 || ev.keyCode === 222 || ev.keyCode === 192) {
            this.setCellValue(i,j,ev);
            this.getNextMove(i,j);
        }
    }

    private setCellValue(i: number, j: number, v: any) {
        const key = <string>v.key;
        const el = this.elem.nativeElement.querySelector(`#cw-${i}-${j}`);
        if (el) {
            el.value = key;
        }
    }

    private emptyCellValue(i: number, j: number) {
        const el = this.elem.nativeElement.querySelector(`#cw-${i}-${j}`);
        if (el) {
            el.value = "";
        }
    }

    private canMoveDown(i: number, j: number) {
        if (i > 14) {
            return;
        }
        if (this.cwdata[i+1][j]!=="*") {
            return true;
        }
        return false;
    }

    private canMoveUp(i: number, j: number) {
        if (i < 1) {
            return;
        }
        if (this.cwdata[i-1][j]!=="*") {
            return true;
        }
        return false;
    }

    private canMoveRight(i: number, j: number) {
        if (j > 19) {
            return;
        }
        if (this.cwdata[i][j+1]!=="*") {
            return true;
        }
        return false;
    }
    
    private canMoveLeft(i: number, j: number) {
        if (j < 1) {
            return;
        }
        if (this.cwdata[i][j-1]!=="*") {
            return true;
        }
        return false;
    }

    private getNextMove(i: number, j:number) {
        if (!this.previousMovement) {
            if (this.canMoveDown(i,j)) {
                this.navigate(i+1, j);
                this.previousMovement = "d";
            } else if (this.canMoveRight(i,j)) {
                this.navigate(i, j+1);
                this.previousMovement = "r";
            }
        } else {
            if (this.previousMovement === "d") {
                if (this.canMoveDown(i,j)) {
                    this.navigate(i+1, j);
                } else {
                    this.previousMovement = "";
                }
            } else if (this.previousMovement === "r") {
                if (this.canMoveRight(i,j)) {
                    this.navigate(i, j+1);
                } else {
                    this.previousMovement = "";
                }
            }
        }
    }

    getCurrentFocusIndex(i: number, j: number) {
        console.log(i);
        console.log(j);
    }

    navigate(i: number, j: number) {
        const el = this.elem.nativeElement.querySelector(`#cw-${i}-${j}`);
        if (el) {
            el.focus();
        }
    }

    checkSolution() {
        for (let i = 0; i < this.cwdata.length; i++) {
            for (let j = 0; j < this.cwdata[i].length; j++) {
                const el = this.elem.nativeElement.querySelector(`#cw-${i}-${j}`);
                const v = this.cwdata[i][j];
                const w = el.value;
                el.classList.remove("cw-correct-cell");
                el.classList.remove("cw-incorrect-cell");
                if (v !== "*") {
                    if (w === "") {
                        continue;
                    }
                    if (v === w) {
                        el.classList.add("cw-correct-cell");
                    } else {
                        el.classList.add("cw-incorrect-cell");
                    }
                }
            }
        }
    }

    showSolution() {
        for (let i = 0; i < this.cwdata.length; i++) {
            for (let j = 0; j < this.cwdata[i].length; j++) {
                const el = this.elem.nativeElement.querySelector(`#cw-${i}-${j}`);
                const v = this.cwdata[i][j];
                if (v !== "*") {
                    el.value = v;
                }
            }
        }
    }
}