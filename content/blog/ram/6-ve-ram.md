---
title: "0 → RAM | 6) Ve RAM!"
author: "Emin Fedar"
date: "2020-03-07T12:00:03.066Z"
brief: "Ve RAM'imizin son hali :)"
meta_img: "/images/ram/kapak-ve-ram.png"
tags:
    - ram
---
## Merhabalar!

Bu yazımızda RAM’imizi tasarlamayı bitiriyoruz.

![Az kalorili ve rastgele erişteli belleğimiz yemeye hazır efenim.](/images/ram/emmi-ram.jpg) <br>*Az kalorili ve rastgele erişteli belleğimiz yemeye hazır efendim.*

## RAM’imizin içini adım adım tasarlayalım:

1. Adres girişlerinden aldığımız sayıyı 4. Yazıda ele aldığımız [Kod Çözücüleri](0-dan-ram-4-kod-cozuculer) kullanarak iki boyutlu [Ram Hücreleri](0-dan-ram-5-ram-hucresi) matrisi hazırlayalım.

2. Bu matrisin içine hücrelerimizi yerleştirip hücrenin “**EN**”*(aktif etme)* ucunu iki kod çözücüden gelen seçim uçlarına “**VE**” kapısı ile bağlayacağız. *(Mesela **0. satır** ve **4. sütun** seçim uçları **aktif ise** (0, 4)'teki hücreyi aktif et)*

3. RAM’e erişimin okumak için mi yazmak için mi olduğunu öğrendiğimiz **R/W’** girişini bütün **hücrelerin R/W**’ girişlerine **teker teker** bağlayacağız.

4. Seçtiğimiz RAM hücresinden veriyi okuyacağımız veya yazacağımız pin olan **I/O** (Giriş/Çıkış) pinini de bütün **hücrelerin I/O** girişine bağlayacağız.

5. Chip Select girişini ise direkt olarak bütün girişlerle VE kapılayabiliriz ama bu biraz uzun ve gereksiz bir uğraş olur gibi.
Onun yerine; eğer gerçekten yapacak olsaydık, decoder gibi komponentlerimizin VCC ve GND uçları olacağından sadece VCC uçlarını VE kapılayabilirdik. *(yani çipe elektriği verip vermeme şeklinde bir anahtarlama olabilir.)*
*(O yüzden CS pini görselde bir yere bağlı değil :))*

![4000x4000 çözünürlüğe sahip RAMcik içi.](/images/ram/ram-ic-gorunum.png)
<br>*4000x4000 çözünürlüğe sahip RAMcik içi.*

Bütün bunları sırasıyla yaptığımızda karşımızda RAM’imiz için 8 tanesini yan yana getireceğimiz 256 boyutunda 1 bit saklayabilen **“RAMcik”**leri elde ederiz :).

(😲)

<div style="width: 100%; height: 0px; position: relative; padding-bottom: 100.000%;"><iframe src="https://streamable.com/s/xwc8s/nrcvlh" frameborder="0" width="100%" height="100%" allowfullscreen style="width: 100%; height: 100%; position: absolute;"></iframe></div>

[> HD Video](https://streamable.com/xwc8s)

Şema olarak RAM’imizden tek farkı veri çıkışında sadece 1 tane pin olması. *(Çünkü 256 farklı adres için sadece 1 bit saklayan hücrelerden oluşuyor)*

Bu 256 farklı adreste 1 bit saklayan “RAMcik”lerimizden 8 tane yan yana getirip, veri çıkışlarını da yüksek önemli bitten düşük önemli bite göre bağlayıp CS ve R’/W uçlarını da RAM’in CS ve R’/W uçlarına bağlar isek, 256x8'lik bir RAM yapmış oluruz.

![Ve RAM!](/images/ram/ram-bitmis.gif)

## Ve RAM!

Tebrikler!

6 yazılık bu bloğu okuyup anlayarak kendi RAM’inizi sıfırdan tasarlamayı öğrendiniz. *(her yiğidin harcı değil )*

![Tebrikler!](/images/ram/congrats.jpg)<br>*Tebrikler!*
> Eğer babanızdan kalma fabrika zincirleriniz varsa veya milyoner bir iş adamıysanız bu bilgiler üzerine biraz daha koyarak (256 Byte yetmez şimdi tabi, bunu nano seviyede küçültüp 8GB yi sığdırmanız lazım oraya :)) gerçek ve elle tutulur bir RAM yapıp ülkeye güzel bir ihracat geliri getirebilirsiniz :)

Veya kişisel çaplı projelerde kullanılmak üzere (mesela bir arduino projesi) modül olarak takılabilir bir RAM yapıp insanlara sunabilirsiniz. *(veya satabilirsiniz :))*
> Tabi bu işin de kendince standartları var, bizim yaptığımız RAM tamamen kendi standartlarımız ve tercihlerimize dayalı oldu.

## Bundan Sonra

Daha da derinlere inip bu işin ehli olmak isterseniz inceleyebileceğiniz birkaç wikipedia linki ekleyelim:

RAM çeşitleri olarak [SRAM](https://www.wikiwand.com/en/images_random-access_memory), [DRAM](https://www.wikiwand.com/en/Dynamic_random-access_memory). 
*(RAM var RAM var, hepsi aynı değil tabi)*

İşlemci ile RAM’in arasındaki iletişim standartları olarak ise[ SDR, DDR, QDR](https://www.wikiwand.com/en/Double_data_rate) gibi konulara bakabilirsiniz.
*(Gözünüz korkmasın, bunlar sadece belirli standartlar, çok farklı ve gelişmiş şeyler değil, buraya kadar geldiyseniz bunları da kolayca anlayabilirsiniz.)*

Günleriniz ve ömrünüz bol bereketli ve hayırlı olsun.
<br> **İyi günler.**
