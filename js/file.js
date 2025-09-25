
document.addEventListener('DOMContentLoaded', () => {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});

function updateClock() {
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();

  // اين دو خط يک صفر قبل از دقيقه و ثانيه در صورتي که کمتر از 10 باشند اضافه مي کند
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

  // عبارت صبح يا عصر را طبق ساعت انتخاب مي‌کند
  var timeOfDay = (currentHours < 12) ? "" : "";

  // ساعت 24 ساعته را به 12 ساعته تبديل مي‌کند
  currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

  // ساعت صفر بامداد را به 12 تبديل مي‌کند
  currentHours = (currentHours == 0) ? 12 : currentHours;

  // متن ساعت را براي نمايش ايجاد مي‌کند
  var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

  // در عنصري با شناسه خاص ساعت را نمايش مي‌دهد
  $("#clock").html(currentTimeString);

} // تابع در اينجا به پايان رسيد. حالا بايد اين تابع فراخواني بشود

$(document).ready(function () // وقتي صفحه کاملا لود شد تابع فراخواني مي شود
{
  setInterval('updateClock()', 1000);
});



var apiKey = "3bff8c7466b5a4927bad5f5ade01623d"; // کلید API شما
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch(`https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=USD&currencies=XAU`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result); // چاپ داده‌ها برای بررسی
        if (result && result.rates && result.rates.XAU) {
            let goldPriceUSD = parseFloat(result.rates.XAU); // قیمت طلا به دلار
            let additionalAmount = 4614000; // عدد ۴۳۴۸۰۰۰ که می‌خواهیم به قیمت طلا اضافه کنیم

            // محاسبه قیمت نهایی
            let finalPrice = goldPriceUSD + additionalAmount; // قیمت طلا به دلار به اضافه عدد ۴۳۴۸۰۰۰
            let formattedPrice = finalPrice.toLocaleString(); // فرمت کردن عدد به وسیله کاما

            // فقط نمایش قیمت طلا به دلار + عدد اضافه شده
            document.getElementById("goldPrice").innerText = "" + formattedPrice + " تومان";
        } else {
            document.getElementById("goldPrice").innerText = "خطا در دریافت قیمت طلا.";
        }
    })
    .catch(error => {
        document.getElementById("goldPrice").innerText = "خطا در بارگذاری قیمت.";
        console.log('error', error);
    });
 
