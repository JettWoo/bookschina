class Swiper {
    constructor() {
        this.banner = $(".bannerSwiper");
        this.bannerList = $('.bannerSwiper ul li');
        this.dots = $('.bannerSwiper .bannerDot a');

        this.autoTimer = null;
        this.index = 0;
        this.leftArrow = $(".bannerSwiper .arrowLeft");
        this.rightArrow = $(".bannerSwiper .arrowRight");
    }

    init() {
        let _this = this;
        this.autoTimer = setInterval(function () {
            _this.bannerSwitch();
        }, 2000);
        this.banner.hover(() => {
            // 移入
            clearInterval(_this.autoTimer);
            this.autoTimer = null;

            this.leftArrow.show();
            this.rightArrow.show();
        }, () => {
            this.leftArrow.hide();
            this.rightArrow.hide();

            _this.autoTimer = setInterval(function () {
                _this.index++;
                if (_this.index > _this.bannerList.length - 1) {
                    _this.index = 0;
                }
                _this.bannerSwitch();
            }, 2000);
        })


        this.dots.hover(function () {
            _this.dots.removeClass("on");
            $(this).addClass("on");

            _this.index = $(this).index();
            _this.bannerList.hide().eq($(this).index()).show();

        }, function () {
            // 移出

        });


        this.leftArrow.on("click", () => {
            this.index--;
            if (this.index < 0) {
                this.index = this.bannerList.length - 1;
            }
            this.bannerSwitch();
        });

        this.rightArrow.on("click", () => {
            this.index++;
            if (this.index > this.bannerList.length - 1) {
                this.index = 0;
            }
            _this.bannerSwitch();
        })
    }

    bannerSwitch() {
        this.dots.removeClass("on");
        this.dots.eq(this.index).addClass("on");
        this.bannerList.hide().eq(this.index).show();
    }
}

/* new Swiper().init(); */
export {
    Swiper
}