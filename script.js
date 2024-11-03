const WEATHER_API_KEY = '6841e5450643e5d4ff59981dbf58944e'; 

let sehirListesi = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", 
    "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", 
    "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", 
    "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", 
    "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul", 
    "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", 
    "Kırıkkale", "Kırklareli", "Kırşehir", "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya", 
    "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", 
    "Rize", "Sakarya", "Samsun", "Şanlıurfa", "Siirt", "Sinop", "Sivas", "Şırnak", 
    "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak", 
    "New York - USA", "Los Angeles - USA", "Chicago - USA", "Houston - USA", "Miami - USA",
    "London - United Kingdom", "Paris - France", "Berlin - Germany", "Rome - Italy", 
    "Madrid - Spain", "Barcelona - Spain", "Tokyo - Japan", "Osaka - Japan", 
    "Seoul - South Korea", "Beijing - China", "Shanghai - China", "Hong Kong - China", 
    "Bangkok - Thailand", "Dubai - UAE", "Singapore - Singapore", "Sydney - Australia", 
    "Melbourne - Australia", "Toronto - Canada", "Vancouver - Canada", "Mexico City - Mexico", 
    "Buenos Aires - Argentina", "Sao Paulo - Brazil", "Rio de Janeiro - Brazil", 
    "Moscow - Russia", "Saint Petersburg - Russia", "Cairo - Egypt", "Johannesburg - South Africa", 
    "Cape Town - South Africa", "Nairobi - Kenya", "Mumbai - India", "Delhi - India", 
    "Bangalore - India", "Chennai - India", "Karachi - Pakistan", "Dhaka - Bangladesh", 
    "Lagos - Nigeria", "Jakarta - Indonesia", "Kuala Lumpur - Malaysia", "Riyadh - Saudi Arabia", 
    "Jeddah - Saudi Arabia", "Baghdad - Iraq", "Tehran - Iran", "Kuwait City - Kuwait", 
    "Manila - Philippines", "Hanoi - Vietnam", "Ho Chi Minh City - Vietnam", 
    "Kathmandu - Nepal", "Islamabad - Pakistan", "Beirut - Lebanon", "Amman - Jordan", 
    "Athens - Greece", "Lisbon - Portugal", "Brussels - Belgium", "Vienna - Austria", 
    "Zurich - Switzerland", "Stockholm - Sweden", "Oslo - Norway", "Copenhagen - Denmark", 
    "Dublin - Ireland", "Edinburgh - United Kingdom", "Glasgow - United Kingdom", 
    "Warsaw - Poland", "Prague - Czech Republic", "Budapest - Hungary", "Bucharest - Romania", 
    "Sofia - Bulgaria", "Belgrade - Serbia", "Helsinki - Finland", "Vilnius - Lithuania", 
    "Tallinn - Estonia", "Riga - Latvia", "Reykjavik - Iceland"
];
let sehir;
let sicaklik;
let tahminHakki = 5;
let puan = 0;

document.getElementById("sehirKarti").classList.add("active");


async function havaDurumunuAl(sehir) {
    let [city, country] = sehir.includes(" - ") ? sehir.split(" - ") : [sehir, "TR"];
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},${country}&appid=${WEATHER_API_KEY}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === 200) {
            return Math.round(data.main.temp);
        } else {
            console.error("Şehir bulunamadı veya desteklenmiyor:", data.message);
            return null;
        }
    } catch (error) {
        console.error("Hava durumu alınamadı:", error);
        return null;
    }
}


async function yeniSehirSec() {
    if (sehirListesi.length === 0) {
        document.getElementById("geriBildirim").innerHTML = "Şehir bilgisi alınamadı, lütfen yeniden deneyin.";
        return;
    }

    sehir = sehirListesi[Math.floor(Math.random() * sehirListesi.length)];
    sicaklik = await havaDurumunuAl(sehir);

    if (sicaklik !== null) {
        tahminHakki = 5;
        document.getElementById("sehirAdi").innerHTML = sehir;
        document.getElementById("geriBildirim").innerHTML = "";
        document.getElementById("tahmin").value = "";
        document.getElementById("sehirKarti").classList.add("active");
        document.getElementById("oyunSonu").style.display = "none";
        document.getElementById("tahminAlani").style.display = "block";
    } else {
        document.getElementById("geriBildirim").innerHTML = "Şehir bilgisi alınamadı, lütfen tekrar deneyin.";
    }
}


function tahminEt() {
    let tahmin = parseInt(document.getElementById("tahmin").value);

    if (tahmin === sicaklik) {
        puan += 10;
        document.getElementById("geriBildirim").innerHTML = "Doğru tahmin! Puanınız: " + puan;
        document.getElementById("oyunSonu").style.display = "block";
        document.getElementById("sehirKarti").classList.remove("active");
        document.getElementById("tahminAlani").style.display = "none";
    } else if (tahmin < sicaklik) {
        tahminHakki--;
        document.getElementById("geriBildirim").innerHTML = "Daha yüksek! <i class='fas fa-arrow-up'></i>";
    } else {
        tahminHakki--;
        document.getElementById("geriBildirim").innerHTML = "Daha düşük! <i class='fas fa-arrow-down'></i>";
    }

    if (tahminHakki === 0) {
        document.getElementById("geriBildirim").innerHTML = "Hakkınız bitti. Doğru cevap: " + sicaklik + ". Puanınız: " + puan;
        document.getElementById("oyunSonu").style.display = "block";
        document.getElementById("sehirKarti").classList.remove("active");
        document.getElementById("tahminAlani").style.display = "none";
    }

    document.getElementById("kalanHak").innerHTML = "Kalan Hak: " + tahminHakki;
    document.getElementById("puan").innerHTML = "Puan: " + puan;
}

function oyunuBitir() {
    puan = 0;
    tahminHakki = 5;
    document.getElementById("puan").innerHTML = "Puan: " + puan;
    document.getElementById("kalanHak").innerHTML = "Kalan Hak: " + tahminHakki;
    document.getElementById("geriBildirim").innerHTML = "";
    document.getElementById("tahmin").value = "";
    document.getElementById("tahminAlani").style.display = "block";
    document.getElementById("oyunSonu").style.display = "none";
    yeniSehirSec();
}

yeniSehirSec();
