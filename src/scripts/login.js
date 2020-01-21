

import {
    GVerify
} from "./picCode.js";

class LoginConf{
    constructor(){
        this.phoneNumInput = $(".phoneNum");
        this.pwd = $(".pwd");
        this.confirmCode = $(".confirmCode");
        this.submit = $(".subButton");
        this.hoverImg = $(".hoverImg img");

        this.confirms = {
            checkPhone: false,
            checkPwd: false,
            checkConf: false
        }

        this.hoverImgs = {
            normal: '../images/normal.0447fe9.png',
            phoneFocus: "../images/greeting.1415c1c.png",
            pwdFocus: '../images/blindfold.58ce423.png'
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
            this.hoverImg.attr("src", this.hoverImgs.phoneFocus);
        });
        let _this =this;
        this.phoneNumInput.blur(function () {
            $(this).attr("placeholder", tipText.placeholder);
            _this.hoverImg.attr("src", _this.hoverImgs.normal);
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
            this.hoverImg.attr("src", this.hoverImgs.pwdFocus);
        });

        this.pwd.blur(function () {
            $(this).attr("placeholder", tipText.placeholder);
            _this.hoverImg.attr("src", _this.hoverImgs.normal);
            let value = $(this).val();
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
        //console.log("------", GVerify)
        let verifyCode = new GVerify("v_container");

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
            this.hoverImg.attr("src", this.hoverImgs.phoneFocus);
        });

        this.confirmCode.blur(function(){
            $(this).attr("placeholder", tipText.placeholder);
            _this.hoverImg.attr("src", _this.hoverImgs.normal);
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
                //console.log("可以提交");
                //return false;
                $.ajax({
                   url: 'http://172.20.10.5/bookschina/php/login.php',
                   type: 'POST',
                   //dataType: 'json',
                   data: {
                       phoneNum: this.phoneNumInput.val(),
                       pwd: this.pwd.val()
                   }
                }).done((data)=>{
                    if(!data){
                        //
                        //console.log("登录成功")
                        alert("账号与密码不匹配请重新输入");
                    }else{
                        location.href = "http://172.20.10.5/bookschina/dist/html/index.html";
                    }
                });
            }else{
                //console.log("无法提交");
                return false;
            }
        })
        
    }
}
export{
    LoginConf
}