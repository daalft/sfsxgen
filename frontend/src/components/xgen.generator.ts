import { Component } from "@angular/core";

@Component({
    selector: 'xgen-generator',
    templateUrl: '../templates/xgen.generator.template.html',
    styleUrls: []
})
export class XGenGeneratorComponent {
    public selectedLesson: string = "1";
    public selectedPos: string = "NOUN";
    public selectedLanguage: string = "english";
    public forceStartExercise: boolean = false;

    public final_url: string = "";

    generateUrl(fxm: boolean) {
        let url = "https://spraakbanken.gu.se/larkalabb/sfs?lesson_number=" + this.selectedLesson + "&pos=" + this.selectedPos;
        if (this.selectedLanguage !== "english") {
            url += "&tl=" + this.selectedLanguage;
        }
        if (fxm) {
            url += "&fxm=true";
        }
        this.final_url = url;
    }
}