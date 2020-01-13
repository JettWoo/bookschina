class RegConf {
    constructor() {

        this.phoneNumInput = $(".phoneNum");
        this.pwd = $(".pwd");
        this.pwdConfirm = $(".pwdConfirm");
        this.confirmCode = $(".confirmCode");
        this.submit = $("input[type='submit']");
        this.confirms = {
            checkPhone: false,
            checkPwd: false,
            checkPwdConf: false,
            checkConf: false
        }

    }

    init() {
        this.checkPhoneNum();
        this.checkPwd();
        this.confirmPwd();
        this.checkConfirmCode();
        this.checkSubmit();

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
        let _this =this;
        this.phoneNumInput.blur(function () {
            $(this).attr("placeholder", tipText.placeholder);
            let value = $(this).val();
            if (!phoneReg.test(value)) {
                wrap.addClass("danger");
                tip.addClass("danger");
                tip.html(tipText.danger);
                info.hide();
                _this.confirms.checkPhone = false;
            } else {
                wrap.removeClass("danger")
                tip.removeClass("danger");
                tip.html(tipText.normal);
                tip.hide();
                info.show();

                _this.confirms.checkPhone = true;
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
        let _this = this;
        this.pwd.focus(() => {
            this.pwd.attr("placeholder", "");
            tip.show();
            info.hide();
        });

        this.pwd.blur(function () {
            $(this).attr("placeholder", tipText.placeholder);
            let value = $(this).val();
            //console.log("val:", value)
            if (!value) {
                wrap.addClass("danger");
                tip.addClass("danger");
                tip.html(tipText.danger);
                info.hide();
                _this.confirms.checkPwd = false;
            } else {
                console.log(pwdReg.test(value))
                if (!pwdReg.test(value)) {
                    wrap.addClass("danger");
                    tip.addClass("danger");
                    tip.html(tipText.error);
                    info.hide();
                    _this.confirms.checkPwd = false;
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
                    //console.log(complicate)
                    if (complicate == 1) {
                        wrap.addClass("danger");
                        tip.addClass("danger");
                        tip.html(tipText.warn);
                        info.hide();
                        _this.confirms.checkPwd = false;
                    } else {
                        wrap.removeClass("danger")
                        tip.removeClass("danger");
                        tip.html(tipText.normal);
                        tip.hide();
                        info.show();
                        _this.confirms.checkPwd = true;
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
        let _this = this;

        this.pwdConfirm.focus(() => {
            this.pwd.attr("placeholder", "");
            tip.show();
            info.hide();
            _this.confirms.checkPwdConf = false;
        });

        this.pwdConfirm.blur(()=> {
            let firstValue = this.pwd.val();
            let value = this.pwdConfirm.val();

            if (!value) {
                wrap.addClass("danger");
                tip.addClass("danger");
                tip.html(tipText.danger);
                info.hide();
                _this.confirms.checkPwdConf = false;
            } else {
                if (!pwdReg.test(value)) {
                    wrap.addClass("danger");
                    tip.addClass("danger");
                    tip.html(tipText.error);
                    info.hide();
                    _this.confirms.checkPwdConf = false;
                } else {
                    //console.log("val:", value, "first:", firstValue)
                    if (value !== firstValue) {
                        wrap.addClass("danger");
                        tip.addClass("danger");
                        tip.html(tipText.warn);
                        info.hide();
                        _this.confirms.checkPwdConf = false;
                    } else {
                        wrap.removeClass("danger")
                        tip.removeClass("danger");
                        tip.html(tipText.normal);
                        tip.hide();
                        info.show();
                        _this.confirms.checkPwdConf = true;
                    }
                }
            }
        })
    }

    checkConfirmCode(){
        var verifyCode = new GVerify("v_container");

        let tipText = {
            normal: '请输入图片验证码',
            danger: "验证码不能为空",
            error: "验证码错误，请重新输入",
            placeholder: "请输入右图验证码"
        }
        let wrap = this.confirmCode.parents(".inputWrap");
        let info = this.confirmCode.parents(".item").find(".info");
        let tip = this.confirmCode.parents(".item").find(".tip p");
        let _this = this;

        this.confirmCode.focus(() => {
            this.confirmCode.attr("placeholder", "");
            tip.show();
            info.hide();
            _this.confirms.checkConf = false;
        });

        this.confirmCode.blur(function(){
            if(!$(this).val()){
                wrap.addClass("danger");
                tip.addClass("danger");
                tip.html(tipText.danger);
                info.hide();
                _this.confirms.checkConf = false;
            }else{
                if(verifyCode.validate($(this).val())){
                    wrap.removeClass("danger")
                    tip.removeClass("danger");
                    tip.html(tipText.normal);
                    tip.hide();
                    info.show();
                    _this.confirms.checkConf = true;
                }else{
                    wrap.addClass("danger");
                    tip.addClass("danger");
                    tip.html(tipText.error);
                    info.hide();
                    _this.confirms.checkConf = false;
                }
            }
        })
    }


    checkSubmit(){
        this.submit.click(()=>{
            if(this.confirms.checkPhone && this.confirms.checkPwd && this.confirms.checkPwdConf && this.confirms.checkConf){
                console.log("可以提交");
                return false;
            }else{
                console.log("无法提交");
                return false;
            }
        })
        
    }
}


class LoginConf{
    constructor(){
        this.phoneNumInput = $(".phoneNum");
        this.pwd = $(".pwd");
        this.confirmCode = $(".confirmCode");
        this.submit = $(".subButton");
        this.confirms = {
            checkPhone: false,
            checkPwd: false,
            checkConf: false
        }
    }

    init(){
        this.checkPhoneNum();
        this.checkPwd();
        this.checkConfirmCode();
        this.checkSubmit();
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
        let _this =this;
        this.phoneNumInput.blur(function () {
            $(this).attr("placeholder", tipText.placeholder);
            let value = $(this).val();
            if (!phoneReg.test(value)) {
                wrap.addClass("danger");
                tip.addClass("danger");
                tip.html(tipText.danger);
                info.hide();
                _this.confirms.checkPhone = false;
            } else {
                wrap.removeClass("danger")
                tip.removeClass("danger");
                tip.html(tipText.normal);
                tip.hide();
                info.show();

                _this.confirms.checkPhone = true;
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
        let _this = this;
        this.pwd.focus(() => {
            this.pwd.attr("placeholder", "");
            tip.show();
            info.hide();
        });

        this.pwd.blur(function () {
            $(this).attr("placeholder", tipText.placeholder);
            let value = $(this).val();
            //console.log("val:", value)
            if (!value) {
                wrap.addClass("danger");
                tip.addClass("danger");
                tip.html(tipText.danger);
                info.hide();
                _this.confirms.checkPwd = false;
            } else {
                console.log(pwdReg.test(value))
                if (!pwdReg.test(value)) {
                    wrap.addClass("danger");
                    tip.addClass("danger");
                    tip.html(tipText.error);
                    info.hide();
                    _this.confirms.checkPwd = false;
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
                    //console.log(complicate)
                    if (complicate == 1) {
                        wrap.addClass("danger");
                        tip.addClass("danger");
                        tip.html(tipText.warn);
                        info.hide();
                        _this.confirms.checkPwd = false;
                    } else {
                        wrap.removeClass("danger")
                        tip.removeClass("danger");
                        tip.html(tipText.normal);
                        tip.hide();
                        info.show();
                        _this.confirms.checkPwd = true;
                    }

                }
            }

        })
    }


    checkConfirmCode(){
        var verifyCode = new GVerify("v_container");

        let tipText = {
            normal: '请输入图片验证码',
            danger: "验证码不能为空",
            error: "验证码错误，请重新输入",
            placeholder: "请输入右图验证码"
        }
        let wrap = this.confirmCode.parents(".inputWrap");
        let info = this.confirmCode.parents(".item").find(".info");
        let tip = this.confirmCode.parents(".item").find(".tip p");
        let _this = this;

        this.confirmCode.focus(() => {
            this.confirmCode.attr("placeholder", "");
            tip.show();
            info.hide();
            _this.confirms.checkConf = false;
        });

        this.confirmCode.blur(function(){
            if(!$(this).val()){
                wrap.addClass("danger");
                tip.addClass("danger");
                tip.html(tipText.danger);
                info.hide();
                _this.confirms.checkConf = false;
            }else{
                if(verifyCode.validate($(this).val())){
                    wrap.removeClass("danger")
                    tip.removeClass("danger");
                    tip.html(tipText.normal);
                    tip.hide();
                    info.show();
                    _this.confirms.checkConf = true;
                }else{
                    wrap.addClass("danger");
                    tip.addClass("danger");
                    tip.html(tipText.error);
                    info.hide();
                    _this.confirms.checkConf = false;
                }
            }
        })
    }


    checkSubmit(){
        this.submit.click(()=>{
            if(this.confirms.checkPhone && this.confirms.checkPwd && this.confirms.checkConf){
                console.log("可以提交");
                return false;
            }else{
                console.log("无法提交");
                return false;
            }
        })
        
    }
}


define([], function (reg) {
    return {
        RegConf: new RegConf().init(),
        LoginConf: new LoginConf().init()
    }
});