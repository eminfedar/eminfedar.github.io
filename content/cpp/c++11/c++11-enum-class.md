---
templateKey: blog-post
path: /c++11-enum-class
title: "C++11: enum class"
image: /static/cpp/kapak-enum.png
tags: ["C++11", "C++"]
date: 2020-03-16T12:00:03.066Z
description: C++11'de gelen "enum class" nedir? enum'dan farkı nedir?
---
Merhabalar, bu yazıda C++11 sürümünde dile eklenmiş `enum class`'ı inceleyeceğiz.

---
## Nasıl kullanılır?

```cpp
enum class Araba { TOGG, Tesla, Faraday };

Araba::TOGG;
Araba::Tesla;
```
*Not: enum + class kelimelerinin birleşmesi değildir, "enum class" kendi bir keyworddür.*

## Ne işe yarar?
**enum class** ile **enum** aynı amaçla yani **sabit tanımlı değerler** *(örneğin haftanın günleri, yıldaki aylar, yazı yaslama seçenekleri (LEFT, CENTER, RIGHT gibi))* oluşturmak için kullanılır.

**enum class**'ın ise normal **enum**'dan farkı var:

1. **enum class**'lar **int**, başka bir **enum** veya başka bir **enum class**'a dönüştürülemezler. Kendilerine hastırlar *(yani unique)*:
    ```cpp
    enum class Araba { TOGG, Tesla, Faraday };
    enum Hayvan { At, Leylek, Kedi };

    // Araba::TOGG == Hayvan::At; // Derleme hatası:
    // ERROR: no match for ‘operator==’ (operand types are ‘Araba’ and ‘Hayvan’)  
    ```
    ```cpp
    enum Hayvan { At, Leylek, Kedi };
    enum Elektronik { Bilgisayar, Telefon, Ekran };

    Elektronik::Bilgisayar == Hayvan::At; // 1 (true)
    ```
    Yukarıda Bilgisayar At'a eşit oldu. Çünkü **enum** ile tanımlanan değerler varsayılan olarak 0'dan başlayarak **int** değerlere atanırlar:
    ```cpp
    enum Hayvan { At=0, Leylek=1, Kedi=2 };
    enum Elektronik { Bilgisayar=0, Telefon=1, Ekran=2 };
    ```

Kıyaslamalar ve atamalar esnasında bu karışıklığın meydana gelmemesi için **enum class** anahtar kelimesi ortaya çıkmıştır.<br>*(yani At'ın Bilgisayar'a eşit çıkmaması için :))*

2. **enum class** lar sadece kendi tipleriyle kıyaslanabilirler:
    ```cpp
    enum class Araba { TOGG, Tesla, Faraday };
    enum class Hayvan { At, Leylek, Kedi };

    // Araba::TOGG == Hayvan::At; // Derleme Hatası:
    // no operator "==" matches these operands -- operand types are: Araba == Hayvan  
    
    Araba degisken = Araba::TOGG;
    degisken == Araba::TOGG; // 1 (true)

    Hayvan::At == Hayvan::Kedi; // 0 (false)

    //degisken == Hayvan::At; // Derleme Hatası:
    // no operator "==" matches these operands -- operand types are: Araba == Hayvan  

    ```
    **enum**'lar ise arkaplanda **int** değerler oldukları için herhangi bir **enum** veya **sayı** ile kıyaslanabilirler:
    ```cpp
    enum Gun { Pazartesi, Sali, Carsamba };
    enum Ay { Ocak, Subat, Mart };

    Gun::Pazartesi == 0; // 1 (true)
    Gun::Pazartesi == Ay::Ocak; // 1 (true)

    Ay::Subat == 1; // 1 (true)
    Ay::Mart == Gun::Carsamba; // 1 (true)
    ```

Tip güvenlikli olmaları ve daha az buga sebebiyet vermeleri sebebiyle **enum class** kullanmanız önerilen kullanımdır.

---

Bu yazımız kısa oldu, çünkü **enum class**'lar genel olarak bu kadar :)

Eksik bir kısım veya eklememizi istediğiniz bir şey varsa yorumlara yazmayı unutmayın :)

Hayırlı günler!