---
title: "0 → RAM | 4) Kod Çözücüler"
author: "Emin Fedar"
date: "2020-03-05T10:57:03.066Z"
brief: 'Temel RAM bileşenlerimizin sonuncusu "Kod Çözücüler"'
meta_img: "/images/ram/kapak-decoder.png"
tags:
    - RAM
---
## Merhabalar!

Bu yazımızda RAM’imizin içindeki belirli adreslere erişmek için devremizde kullanacağımız **Kod Çözücüleri** ve **Kodlayıcıları** ele alacağız.

## Kod Çözücüler ne işe yarar?

Bir Kod Çözücü kısaca: **seçim elemanıdır.**

Girişlerine ikilik tabanda verilen girdiye göre sadece bir çıkışını aktif eder. Örneğin **2 girişli** ve **4 çıkışlı** (2x4) bir Kod Çözücü aşağıdaki gibi çalışır:
> 00 -> **0**
> 
> 01 -> **1**
> 
> 10 -> **2**
> 
> 11 -> **3**

![2 Giriş, 4 Çıkışlı bir kod çözücünün çalışma şekli.](/images/ram/decoder-animasyon.gif)

*2 Giriş, 4 Çıkışlı bir kod çözücünün çalışma şekli.*

Gördüğünüz gibi burada decoderin(kod çözücünün) iç devre tasarımı yok, bize sadece giriş ve çıkış uçları olan bir devre elemanı olarak verilmiş.

Bu olaya **abstraction** yani **soyutlama** denir.

Çoğu zaman yaptığımız ve bir işlevi gerçekleştirebilen küçük devreleri her seferinde tekrardan çizmeyiz. Bir kere çizdikten sonra onları bir eleman haline getirip sonra çoğaltarak istediğimiz kadar kullanırız. *(Bu düstur yazılımda da sıkça kullanılmaktadır)*

Fakat biz yine de kendi decoderimizi de yapmayı öğrenebilmek adına içine bir göz atalım :)

*Aslında gayet basit bir iç devresi var.*

![2x4 Kod Çözücünün içi.](/images/ram/decoder-ic-gorunum.gif)*2x4 Kod Çözücünün içi.*

Siz de kolayca çıkışlarımızın mantıksal durumlarını yazarak devreyi rahatlıkla bulabilirdiniz. Nitekim biz de öyle yaptık:
> Y0= X1’.X0’ (00)
> 
> Y1= X1’.X0 (01)
> 
> Y2= X1.X0’ (10)
> 
> Y3= X1.X0 (11)

### “İyi güzel de, bu RAM yaparken ne işimize yarayacak?”

Eğer yazılım ile uğraşıyorsanız, özellikle C/C++ gibi adreslemelerin *(pointer)* bolca kullanıldığı dillerde tanımladığınız **değişkenlerin** bir **adresi** olduğunu fark etmişsinizdir.

Bu adres genelde **0x123456** şeklinde onaltılık tabanda gösterilen bir sayı olur ve değişkeninizdeki **verinin** RAMinizde 0x123456 nolu bellek hücresinde tutulduğunu belirtir.

### Mesela:

![a isminde bir değişkenin RAM’deki bir hücrede saklanması.](/images/ram/degisken-gosterim.png)

*a isminde bir değişkenin RAM’deki bir hücrede saklanması.*

### İşte tam burada kod çözücüler devreye giriyor.

Bilgisayarda tüm işlemlerimiz İkilik (Binary) sistemde, yani 0 veya 1.

0x100002 nolu hücreye erişebilmek için **örneğin 4GB**’lik bir RAM’de **4,294,967,296** tane hücreden **sadece 1 tanesini** seçip okumamız/yazmamız gerek ve bunu ikilik sistemde çalışan işlemcimizden aldığımız bitler ile yapabilmeliyiz.

Kod Çözücüler ise seçim elemanlarıydı ve tam da aradığımız gibi; girişlerine ikilik sistemden bir sayı alıp, çıkışlarından sadece o sayıya karşılık gelen çıkışı aktif hale getiriyordu.

Bu şekilde eğer bir Kod çözücüye **2³² = 4,294,967,296** hesabıyla **32 giriş** ve **4,294,967,296** farklı çıkış verirsek tüm hücrelere rahatlıkla erişebiliriz değil mi?

### Aslında pek de sayılmaz :)

4,294,967,296 tane kabloyu teker teker bir hücreye bağlamak hem kablo, hem alan hem de işlem israfı olacaktır. Bu yüzden tek boyutlu olarak düşündüğümüz hücreleri adresleme işlemini iki boyutlu düşünmeliyiz. Yani 1 boyutlu bir dizi değil de, 2 boyutlu bir Matris olarak hücrelerimizi tutmalıyız.

![2 boyutlu matris kullanarak daha az kablo kullanımını sağlamak.](/images/ram/1d-2d.gif)*2 boyutlu matris kullanarak daha az kablo kullanımını sağlamak.*

4GB’lik bir RAM için ise 2³² şeklinde tek bir decoder yerine, 2⁸’lik 4 tane decoder kullanılabilir. Böylece kablo sayısı 4,294,967,296'dan 128'e düşüyor. Bu da bize **33 milyon kat** daha az kablo kullanımı ile muazzam bir tasarruf sağlıyor.

## Kod çözücüler de tamam!

Artık RAM yapabilmek için temel bileşenlerin çoğunun çalışma şeklini biliyoruz.

Şimdi geriye bu bileşenleri kullanarak bir RAM tasarlamak kaldı.

Bir sonraki yazımız olan **[0 → RAM | 5) RAM Hücresi](0-dan-ram-5-ram-hucresi)**'inde görüşmek üzere!
