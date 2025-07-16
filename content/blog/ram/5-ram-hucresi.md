---
title: "0 → RAM | 5) RAM Hücresi"
author: "Emin Fedar"
date: "2020-03-06T11:00:03.066Z"
brief: 'Bir RAM yapmak için bir RAM Hücresini yapabilmeli.'
meta_img: "/images/ram/kapak-ram-hucresi.png"
tags:
    - ram
---
## Merhabalar!

Bu yazımızda RAM’imizin iç devresini tasarlamaya başlayacağız. Atacağım devre dosyaları [**Logisim**](https://sourceforge.net/projects/circuit/) programından olacak. Tamamen sıfırdan kendi RAM’inizi inşa edip, simüle edip test edebileceksiniz :)

## RAM’imiz nasıl bir şey olacak?

RAM’imizin iç devresini tasarlamadan önce içi hazır bir eleman olarak düşünüp sadece giriş ve çıkışlarını tasarlayalım. **Yani genel hatlarını belli edelim.**

RAM’imiz **2⁸x8** boyutlarında olacak. Buradaki ilk değer RAM’in içindeki **hücre** sayısıdır. Yani 2⁸ tane **çekmeceden** oluşan bir dolap gibi düşünülebilir.

İkinci değer (8) ise her çekmecenin içinde saklanan bit sayısıdır.

Yani 2⁸=256 tane hücremiz var, her hücrede de 8 bit saklıyoruz.
> Dolayısıyla RAM’imiz **2048** adet **0** veya **1** saklıyor
**8 bit = 1 byte** olduğundan **256 Byte**’lık bir RAM’imiz olacak.

Eğer 1GB’lık bir RAM yapmak isteseydik:

**1GB için 2³⁰x8**<br>
**2GB için 2³¹x8**<br>
**4GB için 2³²x8**
bir RAM tasarlayacaktık.

32 bit işlemcilerin olduğu sistemlere 4GB’dan fazla RAM **takılamamasının** sebebi en fazla **2 üzeri 32'ye** kadar adres tutabilmesidir. Yani 2³²’den ekstra 1 tanecik fazla da olsa hücreyi adresleyemez, veriyi saklayamaz, tanımlayamaz, saklaması için 33. yeni bir bite ihtiyacı var.

64 bit sistemler ise 2⁶⁴ yani **“18 446 744 073 709 551 616 Byte”** hafızaya sahip olacak kadar adresleme yapabilir, bu da yaklaşık **“17 179 869 184 GB”** yapıyor :) *(4GB’ye göre gerçekten yüksek bir rakam)*
> Yani 64 bit işlemciye sahip bir bilgisayarınız varsa 17 Milyar GB RAM’e kadar yükseltme yapabilirsiniz (tabi gerçek hayatta adres tutmak için 64 bitin hepsi ayrılmaz :))
## RAM Çipimizin Genel Tasarımı

![RAM Çipimizin Genel Tasarımı.](/images/ram/ram-component.png)

*RAM Çipimizin Genel Tasarımı.*

**Y:** Yüksek Değerlikli Bit (**2⁷**)<br>
**D:** Düşük Değerlikli Bit (**2⁰**)<br>
**CS (Chip Select):** RAM çipimizi aktif eden giriş.<br>
**R’/W:** Okuma yapmak için **0 (R’)** Yazma yapmak için **1 (W)** değeri verilmesi gereken girişimiz.

--

Çipimiz tamam, peki işlemci ile veri alışverişini nasıl sağlayacak? Çıkışları direk işlemciye mi bağlayacağız? Eğer öyle ise her yaptığımız eleman için işlemcide ayrı ayrı çıkışların mı olması gerek?

## Veri Aktarım Yöntemi

Normal şartlarda iki şekilde bir çipi başka bir çip ile haberleştirebilirsiniz:

**1.** Direkt olarak birinin **çıkışlarını** diğerinin **girişlerine** bağlarsınız

**2.** İki veya daha fazla çipi ortak bir tane veri yoluna bağlayıp, **Çip Seçim** girişleri ile sadece konuşturmak istediğiniz çipleri aktif ederek veri aktarımını sağlarsınız.

*(Örneğin SSD’den veri okuyacağım, o zaman SSD’yi aktif edip diğerlerini pasif halde tutarım. Veya RAM’den veri okumak istiyorum, diğerlerini pasif hale getirip bu sefer de sadece RAM’i aktif ederim)*

![Ortak veri yolu kullanan çiplerin Chip Select girişi kullanılarak veri yoluna bağlanması.](/images/ram/ortak-veri-yolu.gif)
<br>*Ortak veri yolu kullanan çiplerin Chip Select girişi kullanılarak veri yoluna bağlanması.*

## Gelelim artık RAM Hücresine!

Güzel bir söz var:
> **"Baharı icad etmeyen, bir elmayı icad edemez. Zira o elma, o tezgâhta dokunuyor. Bir elmayı icad eden, bir baharı icad edebilir…"**

Bunun RAM ile alakası ise;
> Milyarlarca biti saklayabilmek için önce 1 biti saklayabilmek gerek,
1 biti saklayamayan milyarları saklayamaz.
Milyarları saklayabilen 1 biti saklayabilendir.

Yani önce **tek bir biti saklayabilen** bir **“RAM Hücresi”** yapıp sonra bunu istediğimiz sayıda kopyalarak istediğimiz boyutta RAM elde edeceğiz.

![Ramimize 1 bitlik veri saklama işini gerçekleştirecek temel RAM Hücresi. İç planı ve dışarıya soyutlanmış halleri.](/images/ram/ram-hucresi.gif)
<br> *Ramimize 1 bitlik veri saklama işini gerçekleştirecek temel RAM Hücresi. İç planı ve dışarıya soyutlanmış halleri.*

Hücremizin içinde kullandığımız devrede ilginç bir eleman görebilirsiniz. *(D Q ve CLK yazan)*

Bu eleman ilk derste gösterdiğim **AND-OR-LATCHE** yani Ve-Veya Mandalı’nın birazcık daha değişik hali.
> Ve-Veya mandalı **SET** kısmına 1 verilince verimiz **1**
**Reset** kısmına 1 verilince verimiz **0** oluyordu.

Biz ise Set-Reset mantığı yerine,**hangi veriyi verirsek onu saklayan** bir mandal *( veya daha gelişmişi: Flip/Flop )* istiyoruz.

**D-Tipi** Flip Floplar da bu görevi gerçekleştiriyor.

Merak etmeyin, baştaki mandalımıza **2 VE** ve **1 Değil** kapısı ekleyerek D-Tipi F/F elde edebiliriz.

Logisim programında tasarladığım çalışan bir D-Tipi F/F’nin görüntüsü şu şekilde: *(yani RAM hücremizin içindeki D Q ve CLK yazan devre elemanının içi)*

![D-Tipi F/F iç devresi](/images/ram/mandal-logisim.png) <br>
[Logisim programında çalışan bir D tipi F/F devre dosyası](https://shorturl.at/kyDOY)
> Kırmızı çizgi ile ayırdığım kısmın sağında kalan parçalar ilk dersimizdeki **Ve-Veya** mandalı. Ek olarak sadece soldaki **2 tane VE, 1 tane Değil** kapılarını ekledik.

**Bu bağlantıları neye göre yapacağımızı** ve hangi kapıları ekleyeceğimizi D-Tipi F/F’lerin doğruluk tablosunu çizerek kendiniz de elde edebilirsiniz. *(ipucu olarak Data ve CLK girişlerine karşılık Set ve Reset çıkışlarının durumları tablosunu kullanarak devreyi elde edebilirsiniz.)*

## RAM Hücremiz tamam. Hadi şimdi bununla bir RAM yapalım!

Bu yazı hem biraz uzun oldu, hem de RAM’in direkt olarak iç dizaynını ayrı bir yazıda ele almak amacıyla *(tüm her şey tek bir yazıda toplanıp çorba gibi olmasın, ayrı ayrı düzenli olsun)* en iyisi bir sonraki yazıya bırakalım :)

Serimizin son yazısı olacağını tahmin ettiğim [0 → RAM | 6) Ve RAM!](0-dan-ram-6-ve-ram) Yazımızda görüşmek üzere.

Esenlikler ve mutluluklar içinde kalınız.<br>
Selamün aleyküm.