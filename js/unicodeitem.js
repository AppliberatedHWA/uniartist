"use strict";

import Utils from "/js/utils.js";

export default class UnicodeItem {

    constructor(codePoint) {
        this.htmlElement = document.createElement("span");
        this.htmlElement.innerText = String.fromCodePoint(codePoint);
        this.htmlElement.dataset.codePoint = codePoint.toString(16);
        this.htmlElement.style.left = Utils.getRandomInt(0, window.innerWidth) + "px";
        this.htmlElement.style.top = Utils.getRandomInt(0, window.innerHeight) + "px";
        this.htmlElement.addEventListener("animationend", UnicodeItem.handleAnimationEnd);
        this.htmlElement.addEventListener("mousedown", UnicodeItem.handleMouseDown);
        this.htmlElement.addEventListener("dblclick", UnicodeItem.handleDblClick);
        document.body.appendChild(this.htmlElement);
    }

    static handleAnimationEnd(event) {
        if (!event.target.dataset.keepAlive) {
            document.body.removeChild(event.target);
        }
    }

    static handleMouseDown(event) {
        event.target.dataset.keepAlive = true;

        document.addEventListener("mousemove", UnicodeItem.handleMouseMove);
        document.addEventListener("mouseup", UnicodeItem.handleMouseUp);
        UnicodeItem.currentOffsetX = event.target.offsetLeft - event.pageX;
        UnicodeItem.currentOffsetY = event.target.offsetTop - event.pageY;

        UnicodeItem.current = event.target;
    }

    static handleMouseMove(event) {
        UnicodeItem.current.style.left = event.pageX + UnicodeItem.currentOffsetX + "px";
        UnicodeItem.current.style.top = event.pageY + UnicodeItem.currentOffsetY + "px";
    }

    static handleMouseUp() {
        document.removeEventListener("mousemove", UnicodeItem.handleMouseMove);
        document.removeEventListener("mouseup", UnicodeItem.handleMouseUp);
    }

    static handleDblClick(event) {
        document.body.removeChild(event.target);
    }
}