import {
    getElementClientPos
} from "./tool.js";


class Detail {
    constructor() {
        this.outer = document.querySelector("#popbigpic");
        this.small = document.querySelector("#popbigpic a");
        this.smallPic = document.querySelector("#popbigpic img")
        this.larger = document.querySelector(".zoomMask");
        this.detailPic = document.querySelector("#detailPic");

        this.large = document.querySelector(".zoomDiv");
        this.largePic = document.querySelector("#detailPic");

        this.$bookInfoWrap = $(".w1200 .bookInfoWrap");

        this.baseUrl = 'http://10.31.152.26:8080/bookschina/php/';
    }
    init() {
        this.detailRender();
        this.magnifier();
        this.addToCart();
    }

    detailRender() {
        let queryId = location.search.substring(1);
        let _this = this;
        $.ajax({
            url: this.baseUrl + 'sendDetail.php',
            data: {
                'sid': queryId
            },
            type: 'POST',
            dataType: 'json'
        }).done(function (data) {
            // 价格节点
            let $priceDom = $(".priceWrap .sellPrice");
            // 作者节点
            let $authorDom = $(".padLeft10 .author a");
            // 标题节点
            let $titleDom = $(".padLeft10 h1");
            // 简述节点
            let $narrative = $(".padLeft10 .recomand");

            let $imgDom = $(".coverImg a img");

            let $detailPic = $("#detailPic");

            $imgDom.attr("src", data.imgUrl);
            $narrative.html(data.narrative);
            $titleDom.html(data.title);
            $authorDom.html(data.author + " 著");
            $priceDom.html('<i>¥</i>' + data.price);
            $detailPic.attr("src", data.imgUrl);

            _this.$bookInfoWrap.attr("sid", data.id);
        })
        /* $.ajax({
            //url: this.baseUrl + "sendDetail.php",
            url: this.baseUrl,
            method: 'POST',
            data:{
                'sid': queryId
            }
            }).done(data){
            console.log(data)
        } */
    }


    magnifier() {
        // 私有属性
        /* let $outer = $("#popbigpic");
        let $small = $("#popbigpic a");
        let $smallPic = $("#popbigpic img")
        let $larger = $(".zoomMask");


        let $large = $(".zoomDiv");
        let $largePic = $("#detailPic"); */

        // 放大的比率

        let rate = this.largePic.offsetWidth / this.smallPic.offsetWidth;
        // 获得元素的视口位置
        let smallPos = getElementClientPos(this.small);

        let smallWidth = this.small.offsetWidth,
            smallHeight = this.small.offsetHeight;

        let largerWidth = smallWidth * this.large.offsetWidth / this.largePic.offsetWidth,
            largerHeight = smallHeight * this.large.offsetHeight /
            this.largePic.offsetHeight;
        // 初始化放大镜的大小
        let initLarger = () => {
            //console.log(largerWidth, largerHeight)
            this.larger.style.width = largerWidth + "px";
            this.larger.style.height = largerHeight + "px";
        }
        window.onscroll = () => {
            smallPos = getElementClientPos(this.small);
        }
        // 鼠标移入显示隐藏元素
        this.small.addEventListener("mouseenter", (e) => {
            console.log("ooooo");
            this.larger.style.visibility = "visible";
            this.large.style.visibility = "visible";

            this.small.addEventListener("mousemove", (e) => {
                e = e || window.event;
                let clientX = e.clientX,
                    clientY = e.clientY;
                let left = clientX - smallPos.x - largerWidth / 2,
                    top = clientY - smallPos.y - largerHeight / 2;
                if (left <= 0) left = 0;
                else if (left >= smallWidth - largerWidth) left = smallWidth - largerWidth;
                if (top <= 0) top = 0;
                else if (top >= smallHeight - largerHeight) top = smallHeight - largerHeight;
                this.larger.style.left = left + "px";
                this.larger.style.top = top + "px";
                this.largePic.style.left = -left * rate + "px";
                this.largePic.style.top = -top * rate + 'px';
            })
        });

        this.small.addEventListener("mouseleave", () => {
            this.larger.style.visibility = "hidden";
            this.large.style.visibility = "hidden";
        });

        /**
         * 当元素正在被拖动时，捕获mousemove的事件处理程序
         */
        function moveHandler(e) {
            e = e || window.event;
            // 移动这个元素到当前的鼠标位置， 通过滚动条的位置和初始单击偏移量来调整
            var scroll = getScrollOffsets();
            e.clientX + scroll.x - deltaX;
            elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
            elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";
            // 同时不让其他元素看到这个事件
            if (e.stopPropagation) e.stopPropagation();
            else e.cancelBubble = true;
        }


        initLarger();
    }


    addToCart(){
        let $buy = $(".oparateButton .buyButton");

        $buy.on('click', ()=>{
            console.log("aaaaa")
            let cartData = JSON.parse(localStorage.getItem("cartData"));
            if(!cartData){
                cartData = {};
            }
            //console.log("cartData:", cartData);
            let sid = this.$bookInfoWrap.attr("sid");
            //console.log("sid:", this.$bookInfoWrap.attr("sid"));
            if(cartData[sid]){
                cartData[sid].productNum += 1;
                cartData[sid].choose = true;
            }else{
                cartData[sid] = {};
                cartData[sid].productNum = 1;
                cartData[sid].choose = true;
            }

            localStorage.setItem("cartData", JSON.stringify(cartData));
        })
    }
}


/* export {
    Detail
} */
export {
   Detail
}