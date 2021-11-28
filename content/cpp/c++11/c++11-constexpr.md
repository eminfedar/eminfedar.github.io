---
templateKey: blog-post
path: /c++11-constexpr
title: "C++11: constexpr"
image: /static/cpp/kapak-constexpr.png
tags: ["C++11", "C++"]
date: 2020-05-14T00:06:03.066Z
description: constexpr mi? const olmasın o?
---
Merhabalar, bu yazıda C++11 sürümünde dile eklenmiş **constexpr** terimini inceleyeceğiz.

---
## Nedir?
**constexpr** derleme esnasında(compile-time) sonucu belli olan, sabit değer döndüren bir fonksiyon, hatta ifadelerin tanımlanması için kullanılır.

"İyi de bunu zaten makrolar yapıyor?" diyebilirsiniz.
<br>
Örneğin `#define UZUNLUK 10` gibi. *(bu da derleme esnasında bilinen sabit bir değer?)*

Veya sabit bir değişkene ihtiyacımız varsa zaten **const** ile tanımlayabiliyoruz. 
<br>
Örneğin `const int UZUNLUK = 10;` gibi.

**constexpr** ise derleme esnasında yapılacak işlemi basit makro kopyala-yapıştırı ve sabit değişken tanımlayabilmenin de ötesine çıkarıp, bu ikisinin birleşerek daha kapsamlı ve dilin kendisine ait bir işlevi olmuş halidir diyebiliriz.

### Nasıl yani?

Mesela genel olarak dereceler ile çalışmanıza rağmen programınızdaki formüllerde o derecenin radyan cinsinden değerine ihtiyaç duyuyorsunuz. Bunun için bir **constexpr** çevirici fonksiyon tanımlayıp kullanabilirsiniz:

```cpp
const double PI = 3.1415926535;
constexpr double radyan(double derece) { return derece*180/PI; }

int sonuc = radyan(180); // Derleme esnasında hesaplanır. Çünkü sonucu belli ve sabit.
```
> Bu işlemlerin sonucu program daha derlenirken bellidir ve bir daha hesaplanmazlar.


Fakat makrolar gibi "sadece derleme esnasında" da değiller. Aynı zamanda **çalışma esnasında(runtime)** olarak da kullanılabilirler:

(işte dışardan makrolarla değil de dilin kendi içindeki bir özelliği olunca böyle güzel şeyler yapabiliyorsunuz :))
```cpp
#include <iostream>
#include <string>

constexpr int KARESI(int sayi) { return sayi*sayi; }

int main()
{
    // Derleme esnasında: (compile-time)
    const int a = 5;
    int b = KARESI(a);
    std::cout << a << ", " << b << std::endl;

    // Çalışma esnasında: (run-time)
    int c;
    std::cin >> c; // Kullanıcıdan değeri aldık
    int d = KARESI(c);
    std::cout << c << ", " << d << std::endl;

    return 0;
}

//Derlemek için: g++ dosya.cpp --std=c++11
```
Şimdi constexpr'in etkisini bir inceleyelim.

**constexpr** sayesinde kodumuz şöyle bir **Assembly** çıktısı oluşturuyor (**int b** için 1 işlem):

```asm6502
main:
    ; ...
    mov     DWORD PTR [rbp-4], 5 ; const int a = 5;
    mov     DWORD PTR [rbp-8], 25 ; int b = KARESI(a);

; Gördüğünüz gibi sonuç direk 25, hesaplama yok.
```
Yukarıdaki kod eğer **constexpr**'siz derlenseydi, değer çalışma esnasında hesaplanacaktı.
```cpp
int KARESI(int sayi) { return sayi*sayi; }

const int a = 5;
int b = KARESI(a);
```
Assembly Çıktısı (`int b` için 9 işlem):
```asm6502
KARESI(int): ; "int KARESI(int sayi)" fonksiyonu
    push    rbp
    mov     rbp, rsp
    mov     DWORD PTR [rbp-4], edi
    mov     eax, DWORD PTR [rbp-4]
    imul    eax, eax
    pop     rbp
    ret

main:
    ; ...
    mov     DWORD PTR [rbp-4], 5 ; const int a = 5
    mov     edi, 5
    call    KARESI(int) ; KARESI çağırılıp değer hesaplanıyor.
    mov     DWORD PTR [rbp-16], eax ; hesaplanan değer int b'ye atanıyor
```

Kısaca: makro katili, derleyici ve dil dostu, bol bol kullanmamız gereken bir nimet :)

---

Evet **constexpr** pek çok kişi tarafından "bu ne ya karışık karışık şeyler, *const* neyimize yetmiyor" diye itilen bir keyword olmasına rağmen çok yenilikçi, çok da işlevsel ve kullanılmaya pek elzem bir keywordümüzdü :).

Eksik bir kısım veya eklememizi istediğiniz bir şey varsa yorumlara yazmayı unutmayın :)

Hayırlı sağlıklı ve huzurlu günler!