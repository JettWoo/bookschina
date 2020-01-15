import "../stylesheets/bootstrap.min.css";
import '../stylesheets/index.css';
import '../stylesheets/detail.css';
import '../stylesheets/cartlist.css';
import '../stylesheets/register.css';

import 'jquery';
import '../scripts/bootstrap.min.js';


import {
    Swiper,
    Effect
} from "./banner.js";

import {
    LoginConf
} from "./login.js";

import {
    RegConf
}from "./registry";

import {
    renderHeadAndFooter,
    Render
} from "./render.js";

let page = $("body").attr("targetPage");




switch (page) {
    case 'index': {
        new Swiper().init();
        new Effect().init();
        if ($(".certifica")) {
            $(".certifica").load("./footer.html");
        };

        if ($("#tabSwitch a")) {
            $("#tabSwitch a").hover(function (e) {
                e.preventDefault();
                $(this).tab("show");
            });
        }

        //new Render().renderNew();
        new Render().init();
    };
    break;
case 'login': {
    renderHeadAndFooter();
    new LoginConf().init();
};
break;
case 'registry': {
   /*  if ($(".head")) {
        $(".head").load("./header.html");
    };
    if ($(".foot")) {
        $(".foot").load("./footer.html");
    }; */
    renderHeadAndFooter();
    new RegConf().init();
};
break;
case 'detail': {
    renderHeadAndFooter();
};
break;
case 'cartlist': {
    renderHeadAndFooter();
};
break;
}