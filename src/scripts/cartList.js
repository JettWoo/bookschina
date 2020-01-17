class CartList {
    constructor() {
        // 全选按钮
        this.$selectAll = $(".selectAll");
        // 删除选中按钮
        this.$deleteAll = $(".J_deleteALL");
        // 选中的商品数量
        this.$sumCount = $(".J_SumCount");
        // 商品总金额
        this.$sumZongJia = $(".J_SumZongJia");
    }

    init() {
        this.renderCart();
    }

    renderCart() {
        //
       
        let cartData = JSON.parse(localStorage.getItem("cartData"));
        console.log("local", cartData);
        if (cartData) {
            let ids = Object.keys(cartData);
            console.log("ids:", ids);
            let obj = {};
            for(let i = 0; i < ids.length; i++){
                obj[i] = ids[i];
            }
            console.log(JSON.stringify(obj))
            //console.log("ids:", JSON.stringify(ids));
            
            $.ajax({
                url: 'http://10.31.152.26:8080/bookschina/php/sendCartData.php',
                type: 'POST',
                data: {
                    selects: JSON.stringify(obj)
                    //selects: JSON.stringify(cartData)
                }
            })
        }
    }
}


export {
    CartList
}