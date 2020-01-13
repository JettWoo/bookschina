class RegConf{
    constructor(){
        this.phoneNumInput = $(".phoneNum");
        this.pwd = $(".pwd");
        this.pwdConfirm = $(".pwdConfirm");
        this.confirmCode = $(".confirmCode");

        this.submit = $("input[type='submit']");

    }

    init(){
        console.log("aaaa");
    }
}


define([], function(){
    return{
        RegConf
    }
});