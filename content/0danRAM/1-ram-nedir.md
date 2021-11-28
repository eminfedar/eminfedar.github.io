---
templateKey: blog-post
path: /0-dan-ram-1-ram-nedir
title: 0 → RAM | 1) RAM Nedir?
image: /static/ram/kapak-ram-nedir.png
tags: ["RAM"]
date: 2020-03-02T19:00:03.066Z
description: Sıfırdan RAM tasarladığımız bir seri.
---

## Merhabalar!

**(0 → RAM)*** *serisinde sizlerle beraber **sıfırdan** kendi **RAM**’imizi tasarlayacağız. Bu yazıda tasarıma hemen geçmesek de genel bir bilgi edinmek için okumanız faydalı olacaktır. Başarılar!

### Ram Nedir?

**R**andom **A**ccess **M**emory, yani Rastgele Erişimli Bellek.

“Rastgele Erişimli” denilmesinin sebebi bellekteki hafıza bölümlerine “kaotik” veya “neresi rast gelirse” şeklinde erişmemiz değil.

İstediğimiz (yani herhangi bir, yani rastgele), hafıza bölümüne **tek seferde** erişebildiğimiz için böyle tesmiye edilmiş.

![Bellekteki bir adrese erişim türü farkları [ Rastgele | Sıralı ]](https://eminfedar.com/static/ram/rastgele-vs-sirali.gif)
<br> *Bellekteki bir adrese erişim türü farkları [ Rastgele | Sıralı ]*

### Ram Ne İşe Yarar?

İşlemcimizin en çok konuştuğu donanımlardan biri olan RAM, işlemciye lazım olacak **veriler ve komutları** geçici olarak saklayan ve istenildiğinde de tekrar okumamızı sağlayan bir elektronik devredir.

Mesela bilgisayarınızda bir program çalıştırdığınız zaman bu program **kalıcı ve yavaş** bellekten okunarak (yani sabit diskinizden) **geçici ve hızlı** (yani RAM) belleğe aktarılır. Daha sonra İşlemci bu programın RAM’de tutulan komutlarını tek tek okuyup çalıştırmaya başlar.
> Mesela a ile b’yi topla, RAM’de diğer bir adrese şu veriyi yaz, şu adresteki veriyi 1 arttır gibi komutlar…

İşlemcinin programları sabit diskinizden okuyup çalıştırmama sebebi okuma-yazma hızının çok düşük olmasıdır.
> Örneğin ortalama bir **RAM** 15–20GB/s okuma-yazma hızına sahipken, ortalama bir **SSD** 0.4–0.5GB/s hızlarında. ortalama bir **HDD** ise 0.02–0.03GB/s.

Eğer sabit diskten çalıştırsa idi işlemci çok hızlı olmasına rağmen sabit diski sürekli beklemek zorunda kalacaktı, böylece zaman kaybı had safhada olacaktı.

### “RAM’i anladım, fakat bir veri elektrik ile nasıl saklanabilir ki? Sabit disk üzerindeki kabartılar ile veriyi kolayca saklayabiliyor. Elektrik nasıl saklanır?”

Elektrik tek başına saklanabilen bir şey değil evet, ama basit devreler yardımıyla elektriği saklayabiliyoruz.

Mesela “veri saklama” dediğimiz işini gerçekleştirebilen en basit devrelerden biri **AND-OR Latche** yani **Ve-Veya Mandalı**’dır.

Bu ismin verilme sebebi sadece 1 VE ve 1 VEYA kapısıyla oluşturulabilmesidir. *(bir tane de DEĞİL kapısı var aşağıda tabiki :))*

![1 bit veri saklayabilen AND-OR-Latche çalışma şekli](https://eminfedar.com/static/ram/ve-veya-mandali.gif)*1 bit veri saklayabilen AND-OR-Latche çalışma şekli*

Bu devreyi Mantık Devreleri (veya Elektrik Devreleri) tasarlama programları aracılığıyla kendiniz de tasarlayıp simüle edebilirsiniz. Ayrıca ilerideki tasarımlarımızı da kendi bilgisayarınızda gerçeklemek için bu programlara ihtiyacınız olacak.

Kullanabileceğiniz zordan kolaya sıralı bazı bedava programlar:

* **Logisim** ([https://sourceforge.net/projects/circuit/](https://sourceforge.net/projects/circuit/))
*(Kapsamlılık: 15, Zorluk: 2) ***kullandığım***

* **Logic Circuit** ([https://logiccircuit.org/](https://logiccircuit.org/))
*(Kapsamlılık: 10, Zorluk: 4)*

* **Logic Circuit Designer** ([https://sourceforge.net/projects/logiccircuitd/](https://sourceforge.net/projects/logiccircuitd/))
*(Kapsamlılık: 7, Zorluk: 2)*

* **Multimedia Logic** ([https://sourceforge.net/projects/multimedialogic/](https://sourceforge.net/projects/multimedialogic/))
*(Kapsamlılık: 4, Zorluk: 1)*

Bu devreyi nasıl oluşturacağımız, kapıların nasıl çalıştığı, doğruluk tabloları, karnaugh haritaları gibi teknik meselelere artık başlayabiliriz sanırım.

Şimdilik bu kadar :)

Bir sonraki yazımız olan **[0 → RAM | 2) Mantık Kapıları](0-dan-ram-2-mantik-kapilari)**'ında görüşmek üzere!
