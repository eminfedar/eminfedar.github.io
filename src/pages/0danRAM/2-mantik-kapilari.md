---
templateKey: blog-post
path: /0-dan-ram-2-mantik-kapilari
title: 0 → RAM | 2) Mantık Kapıları
image: /static/ram/kapak-mantik-kapilari.png
tags: ["RAM"]
date: 2020-03-03T18:57:03.066Z
description: İleride sıkça kullanacağımız mantık kapılarına bir el atalım.
---
## Merhabalar!

Bu derste mantıksal elektronik devreleri kurmak için olmazsa olmazımız olan Mantık Kapılarına göz atacağız.

### Mantığın kapısı mı olur?

Mantık ilmi, bizim günlük hayatta **karar** verirken beynimiz ile yaptığımız işlemleri matematiğe uyarlayan bir ilim. Bu ilim pek çok devasa ilim dalının temellerini oluşturuyor.

Bugün bilgisayarda yaptığımız işlerin büyük çoğunluğu mantıksal çıkarımlar sayesinde olmakta.
> Mesela bu yazıyı beğenmek için beğen butonuna tıklamak. Bilgisayar sizin başka bir yere değil de özel olarak o butona tıkladığınızı nasıl anlar ki?

**İşte burada mantık ilmi devreye girer.** Kendi aklımızla bir butona tıklama işini nasıl tahayyül ediyorsak onu formülize edip bilgisayarın da aynı şeyi algılamasını sağlayabiliriz.

Matematikte kullanılan mantıksal işaretler:

* **Λ** | **.** | **x** = Ve

* **V** | **+** = Veya

* **‘** = Değil

* **⇒** = İse

* ⇔ = Çift yönlü ise (Ancak ve ancak)

### Bir mantıksal işlem örneği yapalım:

Mesela benim aklım o butona basabilmek için 2 şart koşuyor:

1. Ekrandaki imleç butonun üzerinde olmalı

1. Elimdeki farenin sol tuşuna basmalıyım

Bu işlemi matematiksel mantık ile yazmak istersek basitçe şöyle yazabiliriz:
> A: İmlecin buton üzerinde olması
B: Farenin sol tuşuna basılması
> Butonun tıklanmasına ise C diyelim.
C, A ve B aynı anda sağlandığında doğru olur. Yani:

C = A ve B

veya matematiksel olarak ifade edersek.

C = A Λ B <br>
C = A.B

Bu işlemi biraz daha açarsak, A işlemi aslında imlecin koordinatları ile butonun koordinatları arasında bir hesaptan ibaret. Öyleyse şöyle yazabiliriz:

*(buradaki b.y b.x gibi '.' kullanımı butonun y,x gibi özelliklerine erişme manasında kullanılmıştır.)*

**b:** Buton <br>
**f:** Fare <br>
**A:** (f.x ≥ b.x) Λ (f.x < (b.x + b.genişlik)) Λ (f.y ≥ b.y) Λ (f.y < (b.y + b.yükseklik)) <br>
**B:** f.SolTuşuTıklandıMı <br>
> Bugün neredeyse bütün tıklanma kontrolleri ve basit çarpışma kontrolü A ve B formülünün 1 veya 0 sonuçlanmasına göre kontrol edilmekte.

Koşullarımızı detaylandırdıysak artık **C = A Λ B** *(veya A.B, biz genelde yaygın olan nokta (.) gösterimini kullanacağız)* bize butonun tıklanıp tıklanmadığını veren mantıksal formül oldu.

### Birkaç basit sözlü ifadeyi mantıksal ifadeye çevirelim:

“A butonuna basılır ve B butonuna basılmaz ise C koşulu doğrudur”:
> C = A.B’

“T düğmesi veya J düğmesine basılırsa K kliması açılsın”:
> K = T+J

“O ve P tuşları basılmıyor **veya **O ve P tuşları aynı anda basılıyor ise U koşulu doğrudur”:
> U = (O’.P’) + (O.P)

U = (O+P)’ + (O.P) şeklinde de yazılabilir. — “O veya P basılıyor değilse”

Gördüğünüz gibi mantıksal ifadeler oluşturmak gayet kolay :)

Mantıksal ifadeler hakkında daha fazla bilgiyi ve bazı matematiksel kuramları *(De Morgan Kuralları gibi)* pek çok internet sayfasında ve YouTube kanallarında bulabilirsiniz.

### Mantık güzel, peki “Kapıları” nedir?

**Mantık Kapıları** yukarıda sadece kağıt üzerinde ifade ettiğimiz mantıksal ifadeleri gerçek hayatta donanımsal olarak gerçekleştirmemize olanak sağlayan elektronik devre elemanlarıdır.
> Örneğin bir kumandada iki butona birden basıldığında bir cihazın çalışması

Elektronikte
“VE kapısı” dediğimiz şey Mantıktaki **Ve (Λ)**’nin,
“VEYA” kapısı da **Veya (V)**’nın karşılığıdır.

![Mantık kapılarının tümü](https://eminfedar.com/static/ram/mantik-kapilari-hepsi.gif)

Çalışma şekilleri yukarıdaki gibi verilmiş kapıların matematiksel olarak da karşılıklarını bilmek isteriz. Çünkü her zaman ezbere iş yapamayız veya ilgilenen ifade git gide karmaşıklaşıp büyüyebilir.

Bu yüzden **Doğruluk Tablolarını** kullanırız. Doğruluk tabloları bir **elemanın** veya bir **ifadenin** tüm giriş kombinasyonları için çıkışlarını gösterdiğimiz bir tablodan ibaret. Çok basit fakat çok yararlı.

### Birkaç Doğruluk Tablosu örneği:

Mesela A ve B girişlerimiz olsun, bunlardan **sadece bir tanesi** 1 olduğu zaman doğru olan sonuçla Doğruluk Tablosunu çizelim:

![XOR Doğruluk Tablosu](https://eminfedar.com/static/ram/xor-tablo.png)

Bu gördüğümüz tablo aslında **Özel VEYA**(XOR veya EXOR) kapısının doğruluk tablosudur.

**Özel VEYA** da örnek ile aynı şeyi gerçekleştirmekte. (yani Farklıysa 1, aynısya 0)

Elinizdeki duruma göre istediğiniz girişlerde istediğiniz şekilde sonuçlar çıkaran doğruluk tabloları çizebilirsiniz.
> Matematiksel olarak ifade edilebilen her doğruluk tablosu gerçeğe dönüştürülebilir.
Bu yüzden bir olayı **doğruluk tablosuna** dökebilmek, onu elektronik ortama aktarabilmek demektir.

Mesela yine A ve B girişlerimiz olsun, fakat şimdi sadece A da B de 1 olduğu zaman sonuç doğru olsun:

![AND Doğruluk Tablosu](https://eminfedar.com/static/ram/and-tablo.png)

Bu gördüğümüz tablo da aslında **VE** (AND) kapısının doğruluk tablosudur.

**VE** kapısı sadece iki giriş de **1** olduğu, yani elektrik geldiği zaman 1 olur, sonuç olarak o da elektrik verir.

Doğruluk Tabloları küçük boyutlarda işimize yarıyor, fakat örneğin elimizde 5 tane durum var ise ne yapacağız? *(Bunun için 32 satırlık bir doğruluk tablosu yapmamız gerekir :))*

**Böyle durumlarda Karnaugh Haritaları kullanırız.** Karnaugh Haritaları doğruluk tablosunun iki boyutlu düzleme dökülmüş halidir. Yani durumlar tek bir sütun kaplamak yerine satır ve sütunlara dağıtılırlar.

![4 Duruma sahip basit bir karnaugh haritası. (Boş alanlar 0)](https://eminfedar.com/static/ram/karna-ornek.png)<br>
*4 Duruma sahip basit bir karnaugh haritası. (Boş alanlar 0)*

Karnaugh Haritalarının bir diğer bir avantajı ise işlemi sadeleştirmenin çok kolay yapılabilmesidir.

Örneğin biz A ve B’nin sadece 11'de 1 ürettiğini gördüğümüz için kolayca bu tablo tek bir **VE** kapısıyla gerçeklenebilir diyebildik.

**Fakat durum sayısı arttıkça birden fazla kapı gerekebilir. Ve bu durum işlem sadeleştirilmesi yapılmaz ise gereksiz kapı kullanımıyla sonuçlanabilir.**

**Bu da daha fazla Masraf+ Boyut + Enerji harcaması demek.**
> İleride 1 bit veri saklama için kullanacağımız VE-VEYA Mandalı devresi Karnaugh Haritası ile yapılan sadeleştirme ile sadece 3 tane kapıdan oluşmakta.)

**Mantık Kapıları** ve **Doğruluk Tablosu**’nu hallettiğimize göre bu yazıyı bitirebiliriz.

Bir sonraki yazımız olan [**0 → RAM | 3) Karnaugh Haritaları**](0-dan-ram-3-karnaugh-haritalari)'nda görüşmek üzere!
