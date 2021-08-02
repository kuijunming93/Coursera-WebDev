$(function () { //download jQuery snippet for vscode  + this is nothing of document.addEventListener("DOMContentLoaded")

    $("#myNavTogglebtn").blur(function(event){ //same as document.querySelector("navbarToggle").addEventListener("blur")
        var screenWidth =  window.innerWidth;
        if (screenWidth<768){
            $("#myNavbar").collapse('hide'); //part of JQuery func
        }
    });
});