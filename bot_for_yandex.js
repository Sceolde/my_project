// ==UserScript==
// @name         bot_for_yandex
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

let keywords = ["Гобой","Как звучит флейта","Тромбон","Что такое валторна","Фагот","Скрипка","Виолончель"];
let keyword = keywords[getRandom(0,keywords.length)];
let btnK = document.getElementsByClassName("mini-suggest__button")[0];
let textField=document.getElementById("text");
let nextPageBtn=document.getElementsByClassName("pager__item_kind_next")[0];
let links = document.links;
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function writeKeyword(word){
    let i=0;
    let timerId = setInterval(()=>{
        textField.value+=word[i];
        i++;
        if(i==word.length){
            clearInterval(timerId);
            btnK.click();
        }
    },500);
}
if (btnK != undefined && textField!=undefined){
    writeKeyword(keyword);
}else if (location.hostname == "yandex.ru"){
    let flag = true;
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1){
            flag=false;
            links[i].target="_self";
            links[i].click();
            break;
        }
    }
    if (document.getElementsByClassName("pager__item_current_yes")[0].textContent >9){
        flag = false;
        location.href = "https://yandex.ru/";
    }
    if (flag) setTimeout(()=>{nextPageBtn.click()},getRandom(3000,6000));
} else {
    setInterval(()=>{
        if (getRandom(0,101)>=70) location.href = "https://yandex.ru/";
        else{
            let index= getRandom(0,links.length);
            if(links[index].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1)
                links[index].click();
        }
    },getRandom(2000,6000));
}
