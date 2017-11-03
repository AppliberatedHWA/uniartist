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

        this.htmlElement.addEventListener("touchstart", UnicodeItem.handleMouseDown);
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
        event.preventDefault();

        event.target.dataset.keepAlive = true;

        
        document.addEventListener("touchmove", UnicodeItem.handleMouseMove);
        document.addEventListener("mousemove", UnicodeItem.handleMouseMove);
        document.addEventListener("touchend", UnicodeItem.handleMouseUp);
        document.addEventListener("mouseup", UnicodeItem.handleMouseUp);
        
        let touch = event.touches ? event.touches[0] : event;
        UnicodeItem.currentOffsetX = event.target.offsetLeft - touch.pageX;
        UnicodeItem.currentOffsetY = event.target.offsetTop - touch.pageY;

        UnicodeItem.current = event.target;
    }
    
    static handleMouseMove(event) {
        event.preventDefault();
        
        let touch = event.touches ? event.touches[0] : event;
        UnicodeItem.current.style.left = touch.pageX + UnicodeItem.currentOffsetX + "px";
        UnicodeItem.current.style.top = touch.pageY + UnicodeItem.currentOffsetY + "px";
    }

    static handleMouseUp() {
        event.preventDefault();
        document.removeEventListener("touchmove", UnicodeItem.handleMouseMove);
        document.removeEventListener("mousemove", UnicodeItem.handleMouseMove);
        document.removeEventListener("touchend", UnicodeItem.handleMouseUp);
        document.removeEventListener("mouseup", UnicodeItem.handleMouseUp);
    }

    static handleDblClick(event) {
        document.body.removeChild(event.target);
    }
}