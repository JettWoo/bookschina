function renderHeadAndFooter(){
    if ($(".head")) {
        $(".head").load("./header.html");
    };
    if ($(".foot")) {
        $(".foot").load("./footer.html");
    };
}

class Render{
    constructor(){
        
    }
    renderNew(){
        let ids = ['news', 'week', 'speed', 'hotCritical']
        $.ajax({
            url: "http://10.31.152.26:8080/bookschina/php/sendData.php",
            dataType: 'json'
        }).done(function(data){
            //console.log(data);
            let htmlStr = "";
            for(let i = 0; i < ids.length; i++){
                let active = "";
                if(i == 0) active = "active";
                else active = "";
                htmlStr += `
                <div role="tabpanel" class="tab-pane ${active}" id="${ids[i]}">
                <div class="mainEditor">
                  <div class="mainCover">
                    <a href="">
                      <img src="${data[i*4].imgUrl}" alt="" />
                    </a>
                  </div>
                  <div class="mainText">
                    <h2>
                      <a href="" title="${data[i*4].title}">${data[i*4].title}</a>
                    </h2>
                    <div class="priceWrap">
                      <span class="nowPrice">￥${data[i*4].price}</span>
                      <span class="oldPrice">￥45.0</span>
                    </div>
                    <div class="mainFont">
                      <p>
                      ${data[i*4].narrative}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="tabBook">`
                for(let j = 1; j <= 4; j++){
                    htmlStr += `
                    <div class="bookItem">
                    <div class="bookWrap">
                      <a href="">
                        <div class="bookImg">
                          <img src="${data[i*4 + j].imgUrl}" alt="" />
                          <img src="../images/tubiao48.png" alt="" class="discount" />
                        </div>
                        <p class="bookDisc">
                        ${data[i*4 + j].narrative}
                        </p>
                      </a>
                    </div>
                    <p class="bookPrice">
                      <span class="nowPrice">￥${data[i*4 + j].price}</span>
                      <span class="oldPrice">￥28.0</span>
                    </p>
                  </div>
                    `
                }
                htmlStr += `
                </div>
              </div>
                `
            }
            $(".tab-content").html(htmlStr);

        })
    }


    renderHot(){
        $.ajax({
            url: "http://10.31.152.26:8080/bookschina/php/sendHotData.php",
            dataType: 'json'
        }).done(function(data){
            let $div = $(".hotBookWrap ul div");
            for(let j = 0; j < 2; j++){
                let htmlStr = ``;
                for(let i = 0; i < data.length/2; i++){
                    htmlStr += `
                    <li>
                    <div class="bookCover">
                      <a href="">
                        <img src="${data[j * 4 + i].imgUrl}" alt="" />
                      </a>
                    </div>
                    <p class="bookName">
                      <a href="">
                        ${data[j * 4 + i].narrative}
                      </a>
                    </p>
                    <div class="priceWrap">
                      <span class="salePrice">
                        <b>团购价:</b>
                        <i>¥</i>
                        ${data[j * 4 + i].price}
                      </span>
                      <del class="price">¥98.0</del>
                      <span class="discount">4.6折</span>
                    </div>
                  </li>
                    `
                }
    
                //$(".hotBookWrap ul").html(htmlStr);
                $div.eq(j).html(htmlStr);
            }
           
        })
    }

    init(){
        this.renderNew();
        this.renderHot();
    }
}

export {
    renderHeadAndFooter,
    Render
}