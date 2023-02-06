import { Component } from "@angular/core";

@Component({
    selector: "please-wait",
    templateUrl: "../templates/waiter.template.html",
    styleUrls: []
})
export class PleaseWaitComponent {
    public isWaiting: boolean = false;

    on () {
        this.isWaiting = true;
    }

    off () {
        this.isWaiting = false;
    }

}