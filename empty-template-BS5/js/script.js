$(function () { //download jQuery snippet for vscode  + this is nothing of document.addEventListener("DOMContentLoaded")

    $("#navbarToggle").blur(function(event){ //same as document.querySelector("navbarToggle").addEventListener("blur")
        var screenWidth =  window.innerWidth;
        if (screenWidth<768){
            $("#collapsable-nav").collapse('hide'); //part of JQuery func
        }
    }); 
});
