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
        this.selectAll();
    }

    renderCart() {
        let cartData = JSON.parse(localStorage.getItem("cartData"));
        let _this = this;
        if (cartData) {
            //let ids = Object.keys(cartData);
            // let obj = {};
            // for(let i = 0; i < ids.length; i++){
            //     obj[i] = ids[i];
            // }

            $.ajax({
                //url: 'http://10.31.152.26:8080/bookschina/php/sendCartData.php',
                url: 'http://172.20.10.5/bookschina/php/sendCartData.php',
                type: 'POST',
                dataType: 'json',
                // data: {
                //     selects: JSON.stringify(obj)
                // }
            }).done(function (data) {
                let ids = Object.keys(cartData);
                let $shoppingListContent = $(".shoppingListContent");
                for (let i = 0; i < data.length; i++) {
                    if (ids.indexOf(data[i].id) !== -1) {
                        // 渲染购物车数据
                        //console.log(data[i]);
                        let $shoppingItem = $(".NoActivity").clone(true, true);
                        $shoppingItem.attr("sid", data[i].id);

                        $shoppingItem.removeClass("NoActivity");
                        let $bookImg = $shoppingItem.find(".bookImg");
                        let $bookTitle = $shoppingItem.find(".goodName a");
                        let $bookPrice = $shoppingItem.find(".goodPrice strong");
                        let $bookCount = $shoppingItem.find(".J_input");
                        let $totalPrice = $shoppingItem.find(".subtotal");
                        $bookImg.attr("src", data[i].imgUrl);
                        $bookTitle.html(data[i].title);
                        $bookPrice.html("￥" + data[i].price);
                        $bookCount.val(cartData[data[i].id].productNum);
                        $totalPrice.html("￥" + ($bookCount.val() * data[i].price).toFixed(2));
                        $shoppingItem.show();
                        $shoppingListContent.append($shoppingItem);
                        // 注册增加减少按钮功能
                        let $decrement = $shoppingItem.find(".decrement");
                        let $increment = $shoppingItem.find(".increment");
                        // 减少商品
                        $decrement.on("click", function () {
                            if ($bookCount.val() > 1) {
                                $bookCount.val(parseInt($bookCount.val()) - 1);
                                // 更新本地存储
                                cartData[data[i].id].productNum--;
                                localStorage.setItem("cartData", JSON.stringify(cartData));
                                // 更新该商品的总和
                                $totalPrice.html("￥" + ($bookCount.val() * data[i].price).toFixed(2));
                                // 更新所有商品的总价
                                _this.allPrice();
                            } else {
                                alert("宝贝数量不能在少了")
                            }
                        });
                        // 增加商品
                        $increment.on("click", () => {
                            $bookCount.val(parseInt($bookCount.val()) + 1);
                            // 更新本地存储
                            cartData[data[i].id].productNum++;
                            localStorage.setItem("cartData", JSON.stringify(cartData));
                            $totalPrice.html("￥" + ($bookCount.val() * data[i].price).toFixed(2));
                            _this.allPrice();
                        });

                        // 删除商品
                        let $goodRemove = $shoppingItem.find(".goodRemove");
                        $goodRemove.on("click", function () {
                            if (confirm("确认删除该商品？")) {
                                delete cartData[data[i].id];
                                localStorage.setItem("cartData", JSON.stringify(cartData));
                                //let $shoppingItem
                                //$shoppingListContent.remove($shoppingItem);
                                //$shoppingItem.remove();

                                let $shoppingItem = $(this).parents(".shoppingItem");
                                $shoppingItem.addClass("NoActivity");
                                $shoppingItem.remove();
                                _this.allPrice();
                            }
                        })


                        // 判断是否选中
                        let $check = $shoppingItem.find(".J_check");
                        $check.on("click", function () {
                            //console.log(this.classList);
                            if (Array.prototype.indexOf.call(this.classList, "selected") !== -1) {
                                $(this).removeClass("selected");

                                let $selectAll = $(".J_selectALL");
                                $selectAll.removeClass("selectAll");

                                _this.allPrice();
                            } else {
                                $(this).addClass("selected");
                                _this.allPrice();
                                _this.selectOne();
                            }
                        })
                    }
                }

                _this.allPrice();
            })
        }
    }

    allPrice() {
        let $shoppingItems = $(".shoppingItem:not('.NoActivity')");
        let totalSum = 0;
        let totalCount = 0;
        $shoppingItems.each(function () {
            let $check = $(this).find(".J_check");
            if (Array.prototype.indexOf.call($check[0].classList, "selected") !== -1) {
                let $totalPrice = $(this).find(".subtotal");
                let $totalCount = $(this).find(".J_input");
                totalCount += +$totalCount.val();
                totalSum += parseFloat($totalPrice.html().substring(1));
            }

            let $J_SumZongJia = $("#J_SumZongJia");
            let $J_SumCount = $("#J_SumCount");
            $J_SumZongJia.html(totalSum);
            $J_SumCount.html(totalCount);
        })
    }

    selectAll() {
        let $selectAll = $(".J_selectALL");
        let _this = this;

        $selectAll.on("click", function () {
            //console.log("aaaabbbb");
            if (Array.prototype.indexOf.call(this.classList, "selectAll") !== -1) {
                $selectAll.removeClass("selectAll");
                _this.selectEvery(false);
                _this.allPrice();
            } else {
                $selectAll.addClass("selectAll");
                _this.selectEvery(true);
                _this.allPrice();
            }
        })
    }

    selectEvery(bool) {
        let $checks = $(".shoppingItem .J_check");
        if (bool) {
            $checks.addClass("selected");
        } else {
            $checks.removeClass("selected");
        }
    }



    selectOne() {
        let $checks = $(".shoppingItem .J_check");
        let flag = true;
        $checks.each(function () {
            if (Array.prototype.indexOf.call(this.classList, "selected") === -1) {
                flag = false;
            }
        });
        if (flag) {
            /*  let $checks = $(".shoppingItem .J_check");
             $checks.addClass("selected"); */
            let $selectAll = $(".J_selectALL");
            $selectAll.addClass("selectAll");
        } else {
            /* let $checks = $(".shoppingItem .J_check");
            $checks.removeClass("selected"); */
            let $selectAll = $(".J_selectALL");
            $selectAll.removeClass("selectAll");
        }
    }
}


export {
    CartList
}