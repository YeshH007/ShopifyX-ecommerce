
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, get, ref, push, onValue, set, update, remove } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIImxZEkxs8C0j5F-VfkEcMpd81zaojbs",
  authDomain: "ecommercestore-a268f.firebaseapp.com",
  projectId: "ecommercestore-a268f",
  databaseURL: "https://ecommercestore-a268f-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "ecommercestore-a268f.appspot.com",
  messagingSenderId: "1017816960779",
  appId: "1:1017816960779:web:9b6b4f00b7a4067459dc0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


const getdata = async function () {
  const data = await get(ref(db, "/"));
  const values = await data.val();
  return values
}
async function renderdata() {
  const data = await getdata()
  for (let i = 0; i < productcards.length; i++) {
    productimage[i].src = data[i].img
    productname[i].innerText = data[i].name
    productprice[i].innerText = `$${data[i].price}`
  }
}
renderdata()

let cartbutton = document.querySelector("#cartbutton");
let closebutton = document.querySelector(".close");
let sidebar = document.querySelector(".sidebar");
let productcards = document.getElementsByClassName("productcard")
let productname = document.getElementsByClassName("productname")
let productprice = document.getElementsByClassName("productprice")
let productimage = document.getElementsByClassName("productimage")
let add = document.querySelectorAll(".productadd")
let cartcontainer = document.querySelector(".cartitems")
let cartitemcard = document.getElementsByClassName("cartitemcard")
let cartitemprice = document.getElementsByClassName("cartitemprice")
let cartitemquant = document.getElementsByClassName("quantity")
let totalpricediv = document.querySelector(".totalprice")
let plus = document.getElementsByClassName("plus")
let minus = document.getElementsByClassName("minus")
let searchbar = document.querySelector("#search")
cartcontainer.innerHTML = localStorage.getItem("cartitem")
totalpricediv.innerHTML = localStorage.getItem("cartitemprice")
let categoryitems = document.querySelectorAll(".categorieitems")
let pricerange = document.querySelector("#range")
let under = document.querySelector(".under")
let itemprice = document.querySelectorAll(".productprice")
let moreinfo = document.querySelectorAll(".moreinfo")
window.onload = () => {
  totalprice()
}
document.querySelectorAll(".remove").forEach((e) => {
  e.addEventListener("click", (f) => {
    f.target.parentElement.parentElement.remove()
    localStorage.setItem("cartitem", cartcontainer.innerHTML)
  })
})


function cartidcheck() {
  let cartitemids = [];
  for (let i = 0; i < cartitemcard.length; i++) {
    cartitemids.push(cartcontainer.children[i].id)
  }
  return cartitemids
}

function totalprice() {
  let total = 0;
  for (let i = 0; i < cartcontainer.children.length; i++) {
    total += cartitemprice[i].innerHTML * cartitemquant[i].innerHTML
  }
  let totalpriced = `Total Price $ ${Math.trunc(total)}`
  totalpricediv.innerHTML = totalpriced
  return totalpriced
}


function quanteventlist() {
  for (let i = 0; i < plus.length; i++) {
    plus[i].addEventListener("click", (f) => {
      f.target.nextElementSibling.innerHTML = String(Number(f.target.nextElementSibling.innerHTML) + 1)
      totalprice()
      plus[i].removeEventListener()
    })
  }
}

function plusitem() {
  for (let i = 0; i < plus.length; i++) {
    plus[i].addEventListener("click", (f) => {
      f.target.nextElementSibling.innerHTML = Number(f.target.nextElementSibling.innerHTML) + Number(1)
      totalprice()
    })
    plus[i].removeEventListener("click", (f) => {
      f.target.nextElementSibling.innerHTML = Number(f.target.nextElementSibling.innerHTML) + Number(1)
    })
  }
}
function minusitem() {
  for (let i = 0; i < minus.length; i++) {
    minus[i].addEventListener("click", (f) => {
      if (Number(f.target.previousElementSibling.innerHTML) > 1) {
        f.target.previousElementSibling.innerHTML = String(Number(f.target.previousElementSibling.innerHTML) - 1);
        totalprice()
        localStorage.setItem("cartitem", cartcontainer.innerHTML)
        localStorage.setItem("cartitemprice", totalprice())
      }
    })
    minus[i].removeEventListener("click", (f) => {
      if (Number(f.target.previousElementSibling.innerHTML) > 1) {
        f.target.previousElementSibling.innerHTML = String(Number(f.target.previousElementSibling.innerHTML) - 1);
        totalprice()
        localStorage.setItem("cartitem", cartcontainer.innerHTML)
        localStorage.setItem("cartitemprice", totalprice())
      }
    })
  }
}
plusitem()
minusitem()
add.forEach(element => {
  element.addEventListener("click", async (e) => {
    const data = await getdata()
    let data_id = e.target.parentElement.parentElement.id
    if (cartidcheck().includes(data_id)) {
      for (let i = 0; i < cartcontainer.children.length; i++) {
        if (cartcontainer.children[i].id === data_id) {
          cartcontainer.children[i].children[2].children[1].innerHTML = String(Number(cartcontainer.children[i].children[2].children[1].innerHTML) + 1)
        };
      }
      totalprice()
      localStorage.setItem("cartitem", cartcontainer.innerHTML)
      localStorage.setItem("cartitemprice", totalprice())
    }
    else {
      data.forEach(ele => {
        if (ele.id === data_id) {
          cartcontainer.innerHTML += `
            <div class="cartitemcard" id=${ele.id}>
                <img src="${ele.img}" alt="" class="cartitemimage" >
                <div class="cartitemdetails">
                    <p class="cartitemname">${ele.name}</p>
                    <p class="cartitemprice">${Number(ele.price)}</p>
                    <button class="remove">remove</button>
                </div>
                <div class="cartitemquant">
                    <button  class="plus">+</button>
                    <p class="quantity" style="margin: 3px;">1</p>
                    <button  class="minus" >-</button>
                </div>
            </div>
          `
          plusitem()
          minusitem()
          totalprice()
          localStorage.setItem("cartitem", cartcontainer.innerHTML)
          localStorage.setItem("cartitemprice", totalprice())
        }
      })
    }
    document.querySelectorAll(".remove").forEach((e) => {
      e.addEventListener("click", (f) => {
        f.target.parentElement.parentElement.remove()
        totalprice()
        localStorage.setItem("cartitem", cartcontainer.innerHTML)
        localStorage.setItem("cartitemprice", totalprice())
      })
    })
  })
})
let prodarr = [...productname]
let debounce = (func, delay) => {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func();
    }, delay);
  }
}
if (searchbar) {
  searchbar.addEventListener('input', debounce((event) => {
    prodarr.forEach((e) => {
      e.parentElement.style.display = 'flex'
    })
    prodarr.forEach((e) => {
      if (!((e.innerHTML).toLowerCase().includes(searchbar.value))) {
        e.parentElement.style.display = 'none'
      }
    })

  }, 1000))
}
categoryitems.forEach((e) => {
  e.addEventListener("click", (event) => {
    prodarr.forEach((e) => {
      e.parentElement.style.display = 'flex'
    })
    if (event.target.id === "all") {
      prodarr.forEach((e) => {
        e.parentElement.style.display = 'flex'
      })
    }
    else {
      prodarr.forEach((e) => {
        if (!((e.innerHTML).includes(event.target.innerHTML))) {
          e.parentElement.style.display = 'none'
        }
      })
    }
  })
})
if (pricerange) {
  pricerange.addEventListener("input", (e) => {
    under.innerHTML = `Under $ ${e.target.value}`
    prodarr.forEach((e) => {
      e.parentElement.style.display = 'flex'
    })
    itemprice.forEach((i) => {
      if (!(Number((i.innerHTML).slice(1, 6)) < Number(e.target.value))) {
        i.parentElement.style.display = 'none'
      }
    })
  })
}

let itemname = document.querySelector(".itemname")
let itempageprice = document.querySelector(".itemprice")
let itemdisc = document.querySelector(".itemdisc")
let itemimg = document.querySelector(".img")
let eid;
moreinfo.forEach((f) => {
  f.addEventListener("click", function redirect(e) {
    eid = Number(e.target.parentElement.parentElement.id)
    localStorage.setItem("eid", eid)
    window.location.href = "item.html"
  })
})


document.addEventListener("DOMContentLoaded", async () => {
  let data = await getdata()

  let m = localStorage.getItem("eid")

  if (itemname) {
    data.map((a) => {
      if (a.id === String(m)) {
        itemname.innerHTML = a.name
        itempageprice.innerHTML = `$${a.price}`
        itemdisc.innerHTML = a.description
        itemimg.src = a.img
      }
    })

  }
})

cartbutton.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar.style.right = "0px";
  sidebar.style.display = "flex";
  document.body.style.overflowY = "hidden";
  sidebar.style.overflowY = "hidden";
  sidebar.style.position = "fixed";
  localStorage.setItem("cartitem", cartcontainer.innerHTML)
  localStorage.setItem("cartitemprice", totalprice())
});

closebutton.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar.style.right = "-390px";
  sidebar.style.display = "none";
  document.querySelector("*").style.overflowY = "auto";
  localStorage.setItem("cartitem", cartcontainer.innerHTML)
  localStorage.setItem("cartitemprice", totalprice())
});
