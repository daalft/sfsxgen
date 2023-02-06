import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LocalizerService {
    private currentLanguage: string;
    private languagePackage: any;

    private ready: boolean = false;

    private allowedLanguages = ["english", "russian", "swedish"];

    constructor(private http: HttpClient) {
        // try fetching language preference setting
        const prefLang = localStorage.getItem("pref-lang");
        if (prefLang) {
            this.currentLanguage = prefLang;
        } else {
            this.currentLanguage = "english";
        }
        this.reloadLanguagePack();
    }

    reloadLanguagePack() {
        const me = this;
        this.ready = false;
        console.log("Loading language pack " + this.currentLanguage);
        let url = "../assets/localizer/localizer." + this.currentLanguage + ".json";
        if (environment.production) {
            url = "../sfs/assets/localizer/localizer." + this.currentLanguage + ".json";
        }
        this.http.get(url).subscribe({
            next(value: Object) {
                me.languagePackage = value;
                me.ready = true;
            },
            error(msg: any) {
                console.log(msg);
            }
        }
        );
    }

    setLanguage(l: string) {
        let lang = "";
        if (this.allowedLanguages.includes(l)) {
            lang = l;
        } else {
            console.log("Invalid language parameter [" + l + "]!");
            return;
        }
        this.currentLanguage = lang;
        this.reloadLanguagePack();
    }

    localize(s: string) {
        if (!this.ready) {
            return;
        }
        return this.languagePackage[s];
    }
}