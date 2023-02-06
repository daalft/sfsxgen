import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root',
})
export class BackendService {
    
    constructor(private http: HttpClient) {}

    private backendUrl:string = "http://localhost:5000/";

    fetch_lesson(lesson_number: string, part_of_speech: string, target_form: string) {
        let fn = "../";
        if (environment.production) {
            fn += "sfs/";
        }
        fn += "assets/lessons/lesson" + lesson_number + "_" + part_of_speech + "_" + target_form + ".json";
        return this.http.get(fn);
    }

    process(text: string) {
        const url = this.backendUrl + "process?text=" + encodeURIComponent(text);
        return this.http.get(url);
    }

    process2(jsonString: string, ex1: boolean, ex2: boolean, everyx: number) {
        const url = this.backendUrl + "process2?json=" + encodeURIComponent(JSON.stringify(jsonString)) + "&ex1=" + ex1 + "&ex2=" + ex2 + "&everyx=" + everyx;
        return this.http.get(url);
    }

    identify(me: string, pass: string) {
        const url = this.backendUrl + "identify?me=" + encodeURIComponent(me + pass);
        return this.http.get(url);
    }
}