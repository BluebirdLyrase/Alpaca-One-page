function setIDtoFoodMenu(ID) {
    console.log("card pressed");
    localStorage.setItem("selected", ID);
    console.log(ID);
    content.load('Food.html')
}

function buybtn(name, price) {
    ons.notification.alert(name + ' (฿' + price + ') ' + 'has been added');
}

document.addEventListener('init', function (event) {
    var page = event.target;
    console.log(page.id);

    if (page.id === "tabbar") {
        //Code for tabbar
        $("#menubtn").click(function () {
            var menu = document.getElementById('menu');
            menu.open();
        });

        ///////////////////change tabbar color//////////////////
        $("#tabbar1").click(function () {
            $(this).attr("style", "background-color: rgb(173, 232, 105);");
            $("#tabbar2").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar3").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar4").attr("style", "background-color: rgb(255, 163, 26);");
            $("#title").empty();
            $("#title").append("Popular");
        });
        $("#tabbar2").click(function () {
            $(this).attr("style", "background-color: rgb(173, 232, 105);");
            $("#tabbar1").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar3").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar4").attr("style", "background-color: rgb(255, 163, 26);");
            $("#title").empty();
            $("#title").append("Resturant List");
        });
        $("#tabbar3").click(function () {
            $(this).attr("style", "background-color: rgb(173, 232, 105);");
            $("#tabbar1").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar2").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar4").attr("style", "background-color: rgb(255, 163, 26);");
            $("#title").empty();
            $("#title").append("Food Category");
        });
        $("#tabbar4").click(function () {
            $(this).attr("style", "background-color: rgb(173, 232, 105);");
            $("#tabbar1").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar2").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar3").attr("style", "background-color: rgb(255, 163, 26);");
            $("#title").empty();
            $("#title").append("Basket");
        });
        ///////////////////end of change tabbar color//////////////////
    }

    if (page.id === "sidemenu") {
        //Code for sidemenu
        $("#regisbtn").click(function () {
            console.log('regisbtn pressed');
            var content = document.getElementById('content');
            var menu = document.getElementById('menu');
            content.load('regis.html')
                .then(menu.close.bind(menu));
        });
        $("#loginbtn").click(function () {
            console.log('loginbtn pressed');
            var content = document.getElementById('content');
            var menu = document.getElementById('menu');
            content.load('login.html')
                .then(menu.close.bind(menu));
        });

    }


    if (page.id === "Resturant") {
        /////////////////////Append Resturant Card////////////////////////////////////
        $.get("js/data.json", function (data, status) {
            for (var index in data) {
                var Res = data[index];
                var Rescard = `<ons-card style="height : auto; margin-top:0px;" onclick="setIDtoFoodMenu(${index})"><ons-row>
                    <ons-col width="25%"><img src=${Res.img} alt="Onsen UI"style="width: 65px; height :55px;"></ons-col>
                    <ons-col width="75%">
                    <div style="font-size: 17px; white-space: nowrap;">&nbsp;&nbsp;<b>${Res.Name}</b></div>
                    <div style="color:grey">&nbsp;&nbsp;&nbsp;Distance :${Res.Distance}</div>
                    <ons-row>&nbsp;&nbsp;
                    <ons-col width="50%">` //for starrate
                for (var i = Res.Star; i > 0; i--) {
                    Rescard += '<i class="fas fa-star" style="color: rgb(255, 163, 26)"></i>';
                }
                for (var i = (5 - Res.Star); i > 0; i--) {
                    Rescard += '<i class="fas fa-star" style="color:grey"></i>';
                }
                Rescard += '</ons-col>';
                if (Res.Status === "open") Rescard += '<ons-col width="45%"  style="text-align: right ;color:green;" ><b>Open</b></ons-col>';
                else if (Res.Status === "close") Rescard += '<ons-col width="45%"  style="text-align: right ;color:red;" ><b>Close</b></ons-col>';
                else Rescard += '<ons-col width="45%"  style="text-align: right ;color:grey;" ><b>Unknown</b></ons-col>';
                Rescard += '</ons-row></ons-col></ons-row></ons-card>'
                console.log(Rescard);
                $('#Resturantcard').append(Rescard);
                $('#Popularcard').append(Rescard);
            }
            ///////////////////////End of Append Resturant Card///////////////////////////////////////

        });
    }

    if (page.id === "Food") {

       

        /////////////////////Append Food Menu Card////////////////////////////////////
        $.get("js/data.json", function (data, status) {
            ID = localStorage.getItem("selected");
            var Res = data[ID];
            console.log(Res.Name);
            var Menucard = `<div style="text-align: center">
            <img src=${Res.img} alt="Onsen UI"style="width: 80%; height :auto; text-align: center">
            </div>
            <div style="font-size: 17px; margin-top:10px;"><b${Res.Name}</b></div>
            <div style="color:grey">Distance :${Res.Distance}</div>
            <ons-row style = "margin-top:7px;">
            <ons-col width="50%">`
            for (var i = Res.Star; i > 0; i--) {
                Menucard += '<i class="fas fa-star" style="color: rgb(255, 163, 26)"></i>';
            }
            for (var i = (5 - Res.Star); i > 0; i--) {
                Menucard += '<i class="fas fa-star" style="color:grey"></i>';
            }
            Menucard += '</ons-col>';

            if (Res.Status === "open") Menucard += '<ons-col width="45%"  style="text-align: right ;color:green;" ><b>Open</b></ons-col>';
            else if (Res.Status === "close") Menucard += '<ons-col width="45%"  style="text-align: right ;color:red;" ><b>Close</b></ons-col>';
            else Menucard += '<ons-col width="45%"  style="text-align: right ;color:grey;" ><b>Unknown</b></ons-col>';


            Menucard += '</ons-col>';
            Menucard += '</ons-row>';
            Menucard += '<hr>';
            Menucard += '<div style="font-size: 16px; margin-top:10px;"><b>Menu</b></div>';
            console.log(Menucard);
            $('#foodcard').append(Menucard);
            for (var index in Res.Food) {
                var Food = Res.Food[index];
                Foodcard = '<ons-row><ons-col width="60%">';
                Foodcard += '<div style="font-size: 15px; margin-top:10px;">' + Food.name + '</div>';
                Foodcard += '<div style="font-size: 12px; color:grey ">' + Food.des + '</div>';
                Foodcard += '</ons-col>';
                Foodcard += '<ons-col width="20%" style="margin-top:8%">฿' + Food.price + '</ons-col>';
                Foodcard += '<ons-col width="11%" style="margin-left:8px; margin-top:7%">';
                Foodcard += '<ons-button onclick="buybtn(`' + Food.name + '`,`' + Food.price + '`)" style="background-color: rgb(255, 163, 26); color:white; width: 45px; height: 25px; ">';
                Foodcard += '<div class="buybtn">+</div></ons-button></ons-col></ons-row>';
                $('#foodcard').append(Foodcard);
            }
        });
        /////////////////////End of Append Food Menu Card////////////////////////////////////

 

    }







    $("#signinbtn").click(function () {
        console.log("signinbtn pressed");
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (username === 'Admin' && password === '123') {
            document.querySelector('ons-navigator').resetToPage('splitter.html');
        } else {
            ons.notification.alert('Incorrect username or password.');
        }

    });

    $("#facebookbtn").click(function () {
        console.log("facebookbtn pressed");
        document.querySelector('ons-navigator').resetToPage('splitter.html');
    });

    $("#googlebtn").click(function () {
        console.log("googlebtn pressed");
        document.querySelector('ons-navigator').resetToPage('splitter.html');
    });

    $("#regisbtn2").click(function () {
        console.log('regisbtn pressed');
        content.load('regis.html')
    });

    $("#regisNsigninbtn").click(function () {
        console.log("signinbtn pressed");
        document.querySelector('ons-navigator').resetToPage('splitter.html');
    });


    $("#backbtn").click(function () {
        document.querySelector('ons-navigator').resetToPage('splitter.html');
    });





});

