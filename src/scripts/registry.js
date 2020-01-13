class RegConf {
    constructor() {

        this.phoneNumInput = $(".phoneNum");
        this.pwd = $(".pwd");
        this.pwdConfirm = $(".pwdConfirm");
        this.confirmCode = $(".confirmCode");

        this.submit = $("input[type='submit']");

    }

    init() {
        this.checkPhoneNum();
        this.checkPwd();
        this.confirmPwd();
    }
    checkPhoneNum() {
        let phoneReg = /^1[3578]\d{9}$/;
        let tipText = {
            normal: '请输入常用手机号',
            danger: "手机格式不正确，请重新输入",
            placeholder: "请输入您的常用手机号码"
        }
        let wrap = this.phoneNumInput.parents(".inputWrap");
        let info = this.phoneNumInput.parents(".item").find(".info");
        let tip = this.phoneNumInput.parents(".item").find(".tip p");

        this.phoneNumInput.focus(() => {
            this.phoneNumInput.attr("placeholder", "");
            tip.show();
            info.hide();
        });

        this.phoneNumInput.blur(function () {
            $(this).attr("placeholder", tipText.placeholder);
            let value = $(this).val();
            if (!phoneReg.test(value)) {
                wrap.addClass("danger");
                tip.addClass("danger");
                tip.html(tipText.danger);
                info.hide();
            } else {
                wrap.removeClass("danger")
                tip.removeClass("danger");
                tip.html(tipText.normal);
                tip.hide();
                info.show();
            }
        })
    }

    checkPwd() {
        let pwdReg = /\w{6,16}/;
        let tipText = {
            normal: '请设置6-16位密码',
            danger: "请输入密码",
            error: "长度只能在6-16位",
            warn: '密码过于单一，建议两种以上字符组合',
            placeholder: "请输入密码"
        }
        let wrap = this.pwd.parents(".inputWrap");
        let info = this.pwd.parents(".item").find(".info");
        let tip = this.pwd.parents(".item").find(".tip p");

        this.pwd.focus(() => {
            this.pwd.attr("placeholder", "");
            tip.show();
            info.hide();
        });

        this.pwd.blur(function () {
            $(this).attr("placeholder", tipText.placeholder);
            let value = $(this).val();
            console.log("val:", value)
            if (!value) {
                wrap.addClass("danger");
                tip.addClass("danger");
                tip.html(tipText.danger);
                info.hide();
            } else {
                console.log(pwdReg.test(value))
                if (!pwdReg.test(value)) {
                    wrap.addClass("danger");
                    tip.addClass("danger");
                    tip.html(tipText.error);
                    info.hide();
                } else {
                    let num = /\d/;
                    let lower = /[a-z]/;
                    let upper = /[A-Z]/;
                    let other = /\W/;
                    let complicate = 0;
                    complicate = num.test(value) ? complicate + 1 : complicate;
                    complicate = lower.test(value) ? complicate + 1 : complicate;
                    complicate = upper.test(value) ? complicate + 1 : complicate;
                    complicate = other.test(value) ? complicate + 1 : complicate;
                    console.log(complicate)
                    if (complicate == 1) {
                        wrap.addClass("danger");
                        tip.addClass("danger");
                        tip.html(tipText.warn);
                        info.hide();
                    } else {
                        wrap.removeClass("danger")
                        tip.removeClass("danger");
                        tip.html(tipText.normal);
                        tip.hide();
                        info.show();
                    }

                }
            }

        })
    }

    confirmPwd() {
        let pwdReg = /\w{6,16}/;
        let tipText = {
            normal: '请再次输入密码',
            danger: "密码不能为空",
            error: "长度只能在6-16位",
            warn: '两次密码输入不一致，请重新输入',
            placeholder: "请再次输入密码"
        }
        let wrap = this.pwdConfirm.parents(".inputWrap");
        let info = this.pwdConfirm.parents(".item").find(".info");
        let tip = this.pwdConfirm.parents(".item").find(".tip p");

        this.pwdConfirm.focus(() => {
            this.pwd.attr("placeholder", "");
            tip.show();
            info.hide();
        });

        this.pwdConfirm.blur(function () {
            let firstValue = this.pwd.val();
            let value = $(this).val();

            if (!value) {
                wrap.addClass("danger");
                tip.addClass("danger");
                tip.html(tipText.danger);
                info.hide();
            } else {
                if (!pwdReg.test(value)) {
                    wrap.addClass("danger");
                    tip.addClass("danger");
                    tip.html(tipText.error);
                    info.hide();
                } else {
                    console.log("val:", value, "first:", firstValue)
                    if (value !== firstValue) {
                        wrap.addClass("danger");
                        tip.addClass("danger");
                        tip.html(tipText.warn);
                        info.hide();
                    } else {
                        wrap.removeClass("danger")
                        tip.removeClass("danger");
                        tip.html(tipText.normal);
                        tip.hide();
                        info.show();
                    }
                }
            }
        })
    }
}

define([], function (reg) {
    return {
        RegConf: new RegConf().init()
    }
});