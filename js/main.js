"use strict";

import Utils from "/js/utils.js";
import UnicodeItem from "/js/unicodeitem.js";

const MAX_CODE_POINT = 0x10FFFF;

class App {

    addNewChar() {
        let codePoint = Utils.getRandomInt(0, MAX_CODE_POINT);
        new UnicodeItem(codePoint);

        document.title = document.body.childElementCount;

    }

    constructor() {
        console.log(window.innerHeight);
        console.log(window.screen.availHeight);
        setInterval(() => this.addNewChar(), 500);
    }
}

window.addEventListener("load", () => new App());