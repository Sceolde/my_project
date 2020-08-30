// ==UserScript==
// @name         bot_for_yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==


let btnK = document.getElementsByClassName("mini-suggest__button")[0];
let textField=document.getElementById("text");
let nextPageBtn=document.getElementsByClassName("pager__item_kind_next")[0];
let links = document.links;
let site = location.host;
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
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
 }
if (btnK != undefined && textField!=undefined){
    let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Как звучит флейта","Тромбон","Что такое валторна","Фагот","Скрипка","Виолончель"],
    "crushdrummers.ru":["Шоу барабанщиков","Барабанное шоу","Заказать барабанное шоу","Crush барабанщиков"]
    };
    let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
    let keywords = sites[site];
    let keyword = keywords[getRandom(0,keywords.length)];
    document.cookie = "site="+site;
    writeKeyword(keyword);

}else if (location.hostname == "yandex.ru"){
    let flag = true;
    let site = getCookie("site");
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf(site)!=-1){
            flag=false;
            links[i].target="_self";
            setTimeout(()=>{links[i].click()},getRandom(1000,3000));
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
            if(links[index].href.indexOf(site)!=-1)
                links[index].click();
        }
    },getRandom(2000,6000));
}
