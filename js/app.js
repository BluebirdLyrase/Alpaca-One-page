// Your web app's Firebase configuration
var item = [];
var Resname = "";
var ResPic = "";
var ResStatus = false;
var firebaseConfig = {
    apiKey: "AIzaSyC2pyNOOA-f53D-UCcoGQPJECnEc5SLC6g",
    authDomain: "alpaca-one-page.firebaseapp.com",
    databaseURL: "https://alpaca-one-page.firebaseio.com",
    projectId: "alpaca-one-page",
    storageBucket: "alpaca-one-page.appspot.com",
    messagingSenderId: "598311265035",
    appId: "1:598311265035:web:602895d35ecefd48b8f80e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function setIDtoFoodMenu(ID) {
    // console.log("card pressed");
    localStorage.setItem("selected", ID);
    console.log(ID);
    document.querySelector('#myNavigator').pushPage('content/Food.html')
}

function setSelectedCatagory(Catagory) {
    localStorage.setItem("selectedCatagory", Catagory);
    console.log(Catagory);
    document.querySelector('#myNavigator').pushPage('content/Result.html')
}

function deletebtn(index,name) {
    item.splice(index, 1);
    ons.notification.alert(name + ' has been removed');
    document.querySelector('#myNavigator').pushPage('content/Order.html');
}

function buybtn(name, price) {
    console.log(ResStatus);
    var user = firebase.auth().currentUser;
    if(!user){
    ons.notification.alert('Please Sign-in! before place order');
    }else if(ResStatus){
    item.push([name, price]);
    console.log(item);
    ons.notification.alert(name + ' (฿' + price + ') ' + 'has been added');
    if(item.length!=0){
        $("#orderNoti").empty();
        $("#orderNoti").append(item.length);
        }
    }else{
    ons.notification.alert('This Resturant is close');
    }
}

function backbtn() {
    console.log("#backbtn");
    document.querySelector('#myNavigator').popPage();
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        console.log(email + " sign in");
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        ons.notification.alert('Successfully Sign-in!');
        // document.querySelector('ons-navigator').resetToPage('splitter.html');
        // ...
    } else {
        // User is signed out.
        // ...
    }
});

document.addEventListener('init', function (event) {
    var page = event.target;
    console.log(page.id);


    if (page.id === "tabbar") {
        //Code for tabbar
        $("#menubtn").click(function () {
            $("#sidemenu")[0].open();
        });

        ///////////////////change tabbar color//////////////////
        $("#tabbar1").click(function () {
            $(this).attr("style", "background-color: rgb(173, 232, 105);");
            $("#tabbar2").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar3").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar4").attr("style", "background-color: rgb(255, 163, 26);");
            $("#title").empty();
            $("#title").append("Recommended");
        });
        $("#tabbar2").click(function () {
            $(this).attr("style", "background-color: rgb(173, 232, 105);");
            $("#tabbar1").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar3").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar4").attr("style", "background-color: rgb(255, 163, 26);");
            $("#title").empty();
            $("#title").append("Search for Resturant");
        });
        $("#tabbar3").click(function () {
            $(this).attr("style", "background-color: rgb(173, 232, 105);");
            $("#tabbar1").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar2").attr("style", "background-color: rgb(255, 163, 26);");
            $("#tabbar4").attr("style", "background-color: rgb(255, 163, 26);");
            $("#title").empty();
            $("#title").append("Setting");
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

    if (page.id === "menu") {
        //Code for sidemenu
        $("#regisbtn").click(function () {
            console.log('regisbtn pressed');
            document.querySelector('#myNavigator').pushPage('content/regis.html');
            $("#sidemenu")[0].close();
        });
        $("#loginbtn").click(function () {
            console.log('loginbtn pressed');
            document.querySelector('#myNavigator').pushPage('content/login.html');
            $("#sidemenu")[0].close();

        });
        $("#logoutbtn").click(function () {
            console.log('logoutbtn pressed');
            $("#sidemenu")[0].close();
            firebase.auth().signOut().then(function () {
                // Sign-out successful.
            }).catch(function (error) {
                // An error happened.
            });
        });


    }


    if (page.id === "Result") {
        localStorage.setItem("back", "Result.html");
        Catagory = localStorage.getItem("selectedCatagory");
        db.collection("Resturant").where("catagory", "==", Catagory)
            // .orderBy("star","desc")
            .get().then((querySnapshot) => {
                $('#Resturantcard').empty();
                querySnapshot.forEach((doc) => {
                    /////////////////////Append Resturant Card////////////////////////////////////
                    var Rescard = `<ons-card style="height : auto; margin-top:0px;" onclick="setIDtoFoodMenu('${doc.id}')"><ons-row>
                    <ons-col width="25%"><img src=${doc.data().img}} alt="Onsen UI"style="width: 65px; height :55px;"></ons-col>
                    <ons-col width="75%">
                    <div style="font-size: 17px; white-space: nowrap;">&nbsp;&nbsp;<b>${doc.data().name}</b></div>
                    <div style="color:grey">&nbsp;&nbsp;&nbsp;Distance : ${doc.data().distance}  km</div>
                    <ons-row>&nbsp;&nbsp;
                    <ons-col width="50%">` //for starrate
                    for (var i = doc.data().star; i > 0; i--) {
                        Rescard += '<i class="fas fa-star star"></i>';
                    }
                    for (var i = (5 - doc.data().star); i > 0; i--) {
                        Rescard += '<i class="fas fa-star grey"></i>';
                    }
                    Rescard += '</ons-col>';
                    if (doc.data().status) Rescard += '<ons-col width="45%"  class="open" ><b>Open</b></ons-col>';
                    else Rescard += '<ons-col width="45%"  class="close" ><b>Close</b></ons-col>';

                    Rescard += '</ons-row></ons-col></ons-row></ons-card>'
                    // console.log(Rescard);
                    $('#Resturantcard').append(Rescard);
                });
            });

        ///////////////////////End of Append Resturant Card///////////////////////////////////////


    }

    if (page.id === "Food") {

        // $("#backbtn2").click(function () {
        //     console.log("#backbtn");
        //     document.querySelector('#myNavigator').popPage();
        //     });
        
        ID = localStorage.getItem("selected");
        /////////////////////Append Food Menu Card////////////////////////////////////
        db.collection("Resturant").doc(ID).get().then(function (doc) {
            ResStatus = doc.data().status;
            Resname = doc.data().name;
            ResPic = doc.data().img;
            var Menucard = `<div style="text-align: center">
            <div style="font-size: 18px; margin-bottom:5px; text-align: center;"><b>${doc.data().name}</b></div>
            <img src=${doc.data().img} alt="Onsen UI"style="width: 80%; height :auto; text-align: center">
            </div>
            <div style="color:grey">Distance : ${doc.data().distance} km</div>
            <ons-row style = "margin-top:7px;">
            <ons-col width="50%">`
            for (var i = doc.data().star; i > 0; i--) {
                Menucard += '<i class="fas fa-star star"></i>';
            }
            for (var i = (5 - doc.data().star); i > 0; i--) {
                Menucard += '<i class="fas fa-star grey"></i>';
            }
            Menucard += '</ons-col>';

            if (doc.data().status) Menucard += '<ons-col width="45%"  class="open" ><b>Open</b></ons-col>';
            else Menucard += '<ons-col width="45%"  class="close" ><b>Close</b></ons-col>';


            Menucard += `</ons-col>
                         </ons-row>
                         <hr>
                         <div style="font-size: 16px; margin-top:10px;"><b>Menu</b></div>`;
            // console.log(Menucard);
            $('#foodcard').append(Menucard);
        });
        db.collection("Resturant").doc(ID).collection("Food").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                Foodcard = `<ons-row><ons-col width="60%">
             <div style="font-size: 15px; margin-top:10px;">${doc.data().name}</div>
             <div style="font-size: 12px; color:grey ">${doc.data().des}</div>
             </ons-col>
             <ons-col width="20%" style="margin-top:5%">฿${doc.data().price}</ons-col>
             <ons-col width="11%" style="margin-left:8px; margin-top:4%">
             <ons-button onclick="buybtn('${doc.data().name}',${doc.data().price})" class="buyBtn">
             <div class="buyBtntext">+</div></ons-button></ons-col></ons-row>`;
                $('#foodcard').append(Foodcard);
            });
        });

        /////////////////////End of Append Food Menu Card////////////////////////////////////

        $("#orderBtn").click(function () {
            var user = firebase.auth().currentUser;
            if(!user){
            ons.notification.alert('Please Sign-in! before place order');
            }else if(ResStatus){
            document.querySelector('#myNavigator').pushPage('content/Order.html');
            }else{
            ons.notification.alert('This Resturant is close');
            }
        });
        if(item.length!=0){
        $("#orderNoti").empty();
        $("#orderNoti").append(item.length);
        }
    }




    if (page.id === "Recommended") {
        localStorage.setItem("back", "splitter.html");
        db.collection("Resturant").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().status && doc.data().star >= 4) {
                    var carousel = `<ons-carousel-item modifier="nodivider" id="item1" class="recomended_item" onclick="setIDtoFoodMenu('${doc.id}')">
            <img  src=${doc.data().img}alt="Onsen UI" class="thumbnail">
            <div class="recomended_item_title" id="item1_name">${doc.data().name}</div>
            </ons-carousel-item>`;
                    $('#carousel').append(carousel);
                    $('#Recommended').append(carousel);
                }
            });
        });
        db.collection("Category").get().then((querySnapshot) => {
            $('#categorycard').empty();
            querySnapshot.forEach((doc) => {
                var Categorycard = `<ons-col width="50%" style="height: 80%;">
                <ons-card style="width: 90%;height: 90%; text-align: center;" onclick="setSelectedCatagory('${doc.data().name}')">
                    <img  src=${doc.data().img}alt="Onsen UI" style="width: 100px ; height: 75px;">
                    <div>${doc.data().name}</div>
                </ons-card>
            </ons-col>`;
                console.log(doc.id);
                $('#Recomcategorycard').append(Categorycard);
            });
        });
    }


    if (page.id === "Login") {
        $("#signinbtn").click(function () {
            console.log("signinbtn pressed");
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;

            firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode);
                console.log(errorMessage);
            });

        });

        var provider = new firebase.auth.GoogleAuthProvider();
        $("#googlebtn").click(function () {
            console.log("googlebtn pressed");
            firebase.auth().signInWithRedirect(provider);
            firebase.auth().getRedirectResult().then(function (result) {
                if (result.credential) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // ...
                }
                // The signed-in user info.
                var user = result.user;
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
            document.querySelector('ons-navigator').resetToPage('splitter.html');
        });

        $("#regisbtn2").click(function () {
            document.querySelector('#myNavigator').pushPage('content/regis.html');
        });
    }

    if (page.id === "Regis") {
        $("#registerAccountbtn").click(function () {
            console.log('registerAccountbtn pressed');
            var username = document.getElementById('Email').value;
            var password = document.getElementById('password').value;
            var password2 = document.getElementById('password2').value;

            if (!(username && password && password2)) {
                ons.notification.alert('You should fill everything');
            }
            else if (password.length < 6) {
                ons.notification.alert('Your password must contains at least 6 characters');
            }
            else if (password == password2) {
                firebase.auth().createUserWithEmailAndPassword(username, password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                });
                ons.notification.alert('Successfully Registered!');
            }
            else {
                ons.notification.alert('both password should be the same :-(');
            }

        });
    }

    if (page.id === "Order") {
        $("#Resname").empty();
        $("#Resname").append(Resname);
        $("#ResPic").attr('src', ResPic);
        var total = 0;
        $("#orderTable").empty();
        item.forEach((item, index) => {
            var orderTable = `<tr>              
            <td style="color:grey">${item[0]}</td>
            <td align="center" style="color:grey">${item[1]}</td>
            <td>
            <div class="deletebtn" onclick="deletebtn(${index},${item[0]})">x</div>
            </td>
            </tr>`;
            $("#orderTable").append(orderTable);
            total = total + item[1];
        });
        $("#total").empty();
        $("#total").append('<b>Total : </b> ฿ ' + total);

    }




});

