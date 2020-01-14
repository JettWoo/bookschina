import "babel-polyfill";

import "../stylesheets/bootstrap.min.css";
import '../stylesheets/index.css';
import '../stylesheets/cartlist.css';
import '../stylesheets/detail.css';
import '../stylesheets/register.css';

import 'jquery';
import '../scripts/bootstrap.min.js'
import {
    Swiper
} from "./banner.js";

new Swiper().init();

$(".certifica").load("./footer.html", function () {});

$("#tabSwitch a").hover(function (e) {
    e.preventDefault();
    $(this).tab("show");
});