---
title: "0 → RAM | 3) Karnaugh Haritaları"
author: "Emin Fedar"
date: "2020-03-04T09:00:03.066Z"
brief: 'Mantık devreleri inşa etmek için mühim yöntemlerden birisi "Karnaugh Haritaları"'
meta_img: "/images/ram/kapak-karnaugh.png"
tags:
    - ram
---
## Merhabalar!

Önceki derste **Mantık Kapıları**na ve **Doğruluk Tabloları**na giriş yapmıştık. Doğruluk Tabloları güzeldi fakat bir eksiği vardı ki; kapı sayısı arttıkça **Doğruluk Tabloları**nın çekilemez uzunluklara ulaşması ve sadeleştirme işlemlerinin biraz daha zor görülmesiydi.

İşte bu sıkıntıları çekmemek için Maurice Karnaugh ve Edward Veitch’in güzel bir çalışması olan Karnaugh (Karnaugh-Veitch) Haritalarını kullanacağız.

## Karnaugh Haritaları (Karnaugh-Veitch Maps)

Karnaugh Haritaları basitçe doğruluk tablosunun aşağıya doğru uzayan hali yerine **iki boyutlu bir tablo** haline getirilmesinden ibaret. **Fakat bize sağladığı kolaylıklar çok fazla. :)**

### Bir örnek yapalım:

Örneğimiz bir toplayıcı devresi olsun. Devremizde **Bit-1**, **Bit-2** butonları (girişleri) ve **SONUÇ** ve **ELDE** çıkışları (buralara LED bağlayabiliriz) olsun.

Gireceğimiz iki biti toplayan ve eğer **elde *(carry)*** değeri elde edersek **ELDE** çıkışını 1 yapan *(amma çok elde kelimesi geçti… :))*, toplama sounucunu da **SONUÇ** çıkışına veren bir devre yapalım. Bu devrenin doğruluk tablosunu çizersek şöyle bir sonuç elde ederiz:

![Yarım Toplayıcı(Half-Adder) Doğruluk Tablosu](/images/ram/halfadder-tablo.png)*Yarım Toplayıcı(Half-Adder) Doğruluk Tablosu*

**“Sonuç”** çıkışı görebileceğimiz üzere bir **Özel VEYA** (XOR) kapısı ile gerçeklenebilir, çünkü sadece tet bir bit **1** olduğu zaman çıkış **1**.

>XOR: ⊕
>
>XNOR: ⊙

**“Elde”** çıkışımız ise sadece iki bit de 1 olduğu zaman 1 oluyor. O halde Elde çıkışı bir **VE** kapısı ile gerçeklenebilir. Bu durumda devremizin Sonuç çıkışının mantık kapılarıyla formülünü çıkarmak istersek:
> **Sonuç** = **b1 ⊕ b2**
>
> **Elde** = **b1 . b2**

Tebrikler, bir **Yarım Toplayıcı** yaptınız :)

## İyi de neden “Yarım” oldu ki?

![Yarım Toplayıcı (Half-Adder) devresi](/images/ram/halfadder.gif)

*Yarım Toplayıcı (Half-Adder) devresi*

Bu devreye “**Yarım Toplayıcı**” denilmesinin sebebi işleme bir önceki sonucun eldesini katmıyor olması. Devre çıkış olarak ELDE veriyor, fakat giriş olarak başka bir toplayıcıdan gelen ELDE’yi **dikkate almıyor**.

O halde **girişlerimize** de bir **ELDE** ekleyip **TAM** bir toplayıcı yapalım :)

**Tam Toplayıcının doğruluk tablosunu çizersek**:

![b1, b2 ve Elde girişine sahip tam toplayıcının doğruluk tablosu](/images/ram/fulladder-tablo.png)

*b1, b2 ve Elde girişine sahip tam toplayıcının doğruluk tablosu*

*(eveeet işler biraz karıştı değil mi :))*

**Sonuç** ve **Elde** çıkışlarımızda 1'ler biraz karışık şekilde dağılmış. Örneğin yarım toplayıcıdaki gibi **“Sonuç”** çıkışı için hangi kapı veya kapılar gerekir kestiremiyoruz.

### O zaman Karnaugh!

![Sonuç ve Elde çıkışlarımızı elde etmek için kullandığımız Karnaugh Haritaları](/images/ram/fulladder-karnaugh-animasyon.gif)

*Sonuç ve Elde çıkışlarımızı elde etmek için kullandığımız Karnaugh Haritaları*

**Elde** ve **Sonuç** çıkışları için; **b1**, **b2** ve **E** girişlerine göre **Karnaugh Haritası** çizersek yukarıdaki gibi iki tane harita elde ederiz.

*(Karnaugh’da her çıkış için ayrı tablo çizilir.)*

Önemli NOT:
> Karnaugh’da sütun veya satırlar sırayla **00–01–10–11** şeklinde **DEĞİL**, **GrayCode** dizilimi olan ve bir sonraki durumla arasında sadece 1 bit fark olan **00–01–11–10** formatında yazılır.
> **GrayCode** formatına göre eğer bir satırda üç tane değişkenimiz olsaydı: **000–001–011–010–110–111–101–100** şeklinde yazacaktık. (iki durum arası sadece 1 bit farklı.)

### Haritanın üzerine niye kutular çizdik ki?

Karnaugh Haritalarını özel kılan şey de bu.

Doğruluk Tablosunda göremediğimiz “1'ler arasındaki ilişkiyi” burada gözle görebiliyoruz, bu da bize **1'leri gruplandırıp**, aynı sonucu verecek devre için **fazladan** kullanacağımız elemanlardan kurtulabilmemizi sağlıyor.

Mesela **ELDE**’nin haritasındaki mavi kutuyu düşünelim. E b1 b2 sırasıyla yazarsam 101 ve 111 aynı sonucu veriyor *(yani 1)*. Yani ortadaki değerin (b1) 0 veya 1 olması sonucu etkilemiyor. Bu yüzden b1 girişini devreye katmayıp, **E** ve **b2**'yi bir **VE** kapısına bağlıyoruz.

### Peki neyi sadeleştirdi bu?

Eğer b1'i de kaale alsaydık aynı sonucu elde edebilen şöyle bir devre kurabilirdik:
> ELDE = E.**(b1.b2 + b1’.b2)** + …

Halbuki Karnaugh sayesinde yukarıda 5 kapı kullanırken, sadeleştirdiğimiz sonuçta 2 kapı kullanıyoruz:
> ELDE = **E.b2** + …

## “ELDE” tablosundaki yan yana üç tane 1'i neden bir grup yapıp daha fazla sadeleştirme yapmadık?

Karnaugh Haritalarıda gruplama yaparken elbette belirli kurallarımız var, gruplama yaparken bu kurallara göre yapıyoruz:
> Sadece **2ᶰ katları** kadar 1'ler **gruplanabilir:**

![Sadece **2ᶰ katları** kadar 1'ler **gruplanabilir**](/images/ram/karna-kural-1.gif)
> Gruplamaya önce **en az komşuya sahip** 1'lerden başla:

![*Gruplamaya önce **en az komşuya sahip** 1'lerden başla.*](/images/ram/karna-kural-2.gif)

Çok da değil aslında 2 tane mühim kuralımız varmış :)

### Konumuza geri dönelim: “Tam Toplayıcı”

Karnaugh haritasını çizdiğimiz çıkışların denklemlerini yazalım:

**SONUÇ** = E.b1'.b2' + E’.b1'.b2 + E.b1.b2 + E’.b1.b2'
**ELDE** = E.b2 + E.b1 + b1.b2

Karnaugh’daki grupları yazdığımızda elde ettiğimiz sonuçlar böyle, fakat yine de tam istediğimiz sadelikte değil. Mantık ilminin matematiksel özelliklerini kullanarak buradan da sadeleştirmeler yapabiliriz.

**SONUÇ** = E.(b1'.b2' + b1.b2) + E’.(b1'.b2 + b1.b2')

Dikkatli bakarsak 1. parantez içinin XNOR, (00 veya 11 koşulu)
2. parantez içinin ise XOR (01 veya 10 koşulu) olduğunu görebiliriz.

En sade haliyle **SONUÇ **çıkışımızın formülü şöyle olacaktır:

**SONUÇ** = E.(b1 ⊙ b2) + E’.(b1 ⊕ b2)
**SONUÇ** = E.**(b1 ⊕ b2)’** + E’.(b1 ⊕ b2)
> A.B’ + A’.B = A⊕B

**SONUÇ** = E ⊕ b1 ⊕ b2
(2 XOR)

ELDE çıkışında ise E’leri paranteze alabiliriz:

**ELDE** = E.(b1⊕b2) + b1.b2
*(2 VE, 1 XOR (yukarıdan), 1 VEYA)*

Devremizi gerçekleyelim:

![Tam Toplayici](/images/ram/fulladder.gif)

### Karnaugh’yı da hallettik!

Temel derslerden en önemlisi olarak gördüğüm Karnaugh Haritalarını da bu yazıda bitirelim. **0'dan RAM yapma hedefimize adım adım ilerliyoruz.**

Bir sonraki yazımız olan [**0 → RAM | 4) Kod çözücüler**](0-dan-ram-4-kod-cozuculer)'de görüşmek üzere.


