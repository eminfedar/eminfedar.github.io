---
templateKey: blog-post
path: /c++11-lambda
title: "C++11: Lambda"
image: /static/cpp/kapak-lambda.png
tags: ["C++11", "C++"]
date: 2020-03-11T00:00:00.000Z
description: C++11'de "Lambda Fonksiyonlar" nedir?
---
Merhabalar, bu yazıda C++11 sürümünde dile eklenmiş **Lambda Fonksiyonlar**ı inceleyeceğiz.

---
## Nasıl kullanılır?

```cpp
// Tanım:
[&, =, Ek scope değişkenleri] (fonksiyonun parametreleri...)
{
    // Kodlar...
}
```
* **&**  : Üst scope'taki değişkenlerin **bizzat kendilerini** al.
* **=**  : Üst scope'taki değişkenlerin sadece **değerlerini** al.

**&** kullanımına örnek:
```cpp
int a = 5;

auto fonksiyon = [&]() {
    a = 10;
    std::cout << a; // 10
};

fonksiyon();

```
**=** kullanına örnek:
```cpp
int a = 5;

auto fonksiyon = [=]() {
    // a = 10; ERROR: expression must be a modifiable lvalue
    std::cout << a; // Değerini kullanabiliriz.
};

fonksiyon();
```
**Not:** Varsayılan olarak scope "değer" olarak çalışır. *(yani boş bırakırsanız [] ile [=] aynı)*
<br> **Not2:** Eğer parametre girmeyecekseniz parametre parantezlerini `()` yazmayabilirsiniz:
```cpp
auto f = [] {
    // ...
};
```

**Ek scope değişkenleri** kullanımına örnek:
```cpp
int a = 5;
int b = 6;

auto fonksiyon = [=, &b]() {
    b = 10; // b'yi özellikle adresiyle aldık, bizzat kendisini kullanabiliriz.
    // a = 10; ERROR: expression must be a modifiable lvalue

    std::cout << a; // 5 (Değer olarak kullanabiliyoruz.)
    std::cout << b; // 10
};

fonksiyon(); // 5 10
```
Bu örneğin **tam tersi** de mümkündür:
```cpp
int a = 5;
int b = 6;

auto fonksiyon = [&, b]() {
    // b = 10; b'yi sadece verisiyle aldık, bizzat kendisini değiştiremiyoruz.
    a = 10; // Üst Scopetaki değişkenlerin hepsini adresleriyle(bizzat kendilerini) alıyoruz.

    std::cout << a; // 10
    std::cout << b; // 6 (Değer olarak kullanabiliyoruz.)
};

fonksiyon(); // 10 6
```
Eğer dönüş yani `return` tipiyle bir lambda fonksiyon tanımlamak isterseniz:
```cpp
auto fonksiyon = []() -> int {
    return 0;
}
```
## Ne işe yarar?
### 1. Satır içinde fonksiyon tanımlayabilmeyi sağlar:

Normal:
```cpp
void fonksiyon(int deger)
{
    // ...
}
onClick( &fonksiyon );

```
Lambda:
```cpp
onClick( [](int deger) {
    // ...
});
```
### 2. Kodun çok ve karmaşık gözükmesini engeller:
Geçici veya tek kullanımlık bir fonksiyonu tanımlamak için .h'ta tanımını, .cpp'de içini yazıp sonra kullanmak yerine direk tanımladığınız gibi kullanabilirsiniz.

Normal:
```cpp
// A.h
void fonksiyon(int deger);

-------------
// A.cpp:
#include "A.h"

void fonksiyon(int deger) {
    // ...
}
```
```cpp
// Main.cpp:
#include "A.h"

int main() {
    fonksiyon(5);

    return 0;
}
```

Lambda:
```cpp
// Main.cpp:

int main() {
    auto fonksiyon = [] (int deger) {
        // ...
    }

    fonksiyon(5);
    return 0;
}
```

---

### Kıyaslama: Javascript vs. C++:
```js
// Javascript'te ek bir scope filtresi belirtmemize gerek yok.
// Varsayılan olarak C++'taki [&] gibi çalışr.
var fonksiyon = ( parametre ) => {
    console.log("Merhaba")
}
```
```cpp
// auto != var (unutmayalım)
auto fonksiyon = [&] (int parametre) {
    std::cout << "Merhaba";
};
```
C++'ta lambdanın veri tipi her tanımlanmış lambdanın kendisine has **unique bir tiptir**. Bu yüzden dönüş tipini `auto` yapmalısınız.

Eğer isterseniz `std::function` tipini de kullanabilirsiniz
> `std::function` ile değişkenin içinde tanımladığınız fonksiyonu sonradan değiştirebilirsiniz fakat performansı daha düşüktür):
```cpp
#include <functional>

std::function< void() > a = []() {
    std::cout << "Selam";
}
// void döndüren ve parametresiz bir fonksiyon

a = []() {
    std::cout << "Merhaba"; // fonksiyonun içini değiştirebiliyoruz.
}
```

Not: `auto` ile tanımlanan lambda kendine has basit bir fonksiyon tipinde olduğundan **performansı** `std::function`'a göre çok çok daha iyidir**:

### **Performans analizi:** std::function, auto, normal fonksiyon
```bash
# 1 Milyon defa std::function ve auto lambda ve normal fonksiyon fonksiyonu çağırma testi:
eminfedar@pardus:~$ g++ test.cpp --std=c++11 && ./a.out 
std::function: 17.3873 seconds
auto-lambda: 1.77092 seconds
normal fonksiyon: 2.24995 seconds

eminfedar@pardus:~$ ./a.out 
std::function: 15.4777 seconds
auto-lambda: 1.39287 seconds
normal fonksiyon: 1.86177 seconds

eminfedar@pardus:~$ ./a.out 
std::function: 19.1943 seconds
auto-lambda: 1.76885 seconds
normal fonksiyon: 2.3291 seconds

eminfedar@pardus:~$ ./a.out 
std::function: 15.2639 seconds
auto-lambda: 1.39298 seconds
normal fonksiyon: 1.85381 seconds
```

test.cpp:
```cpp
#include <functional>
#include <iostream>
#include <chrono>

std::function< void() > a = [] {

};

auto b = [] {
    
};

void c() {

}

int main()
{
    auto start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < 1000000; i++)
    {
        a();
    }    
    auto finish = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double, std::milli> elapsed = finish - start;
    std::cout << "std::function: " << elapsed.count() << " seconds" << std::endl;

    start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < 1000000; i++)
    {
        b();
    }
    finish = std::chrono::high_resolution_clock::now();
    elapsed = finish - start;
    std::cout << "auto-lambda: " << elapsed.count() << " seconds" << std::endl;

    start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < 1000000; i++)
    {
        c();
    }
    finish = std::chrono::high_resolution_clock::now();
    elapsed = finish - start;
    std::cout << "normal fonksiyon: " << elapsed.count() << " seconds" << std::endl;

    return 0;
}

```
### Nerelerde kullanalım?
Şahsen en çok kulandığım 2 alan var:

1. Olayları handle edecek fonksiyonlarda:
```cpp
Socket* socket = new Socket;
socket.onMesssage( [&](const char* message) {
        std::cout << "Mesaj: " << message;
});
```
2. Geçici olarak lazım olan ve sadece o iş için .h ve .cpp dosyalarında fonksiyon tanımlamak istemediğiniz durumlarda *(1. alan da bunun içine girer.)*
```cpp
    auto enBuyugu = [](int a, int b) -> int {
        return a > b ? a : b;
    }

    for (int i=0; i<100; i++) {
        // ... Kisi diye bir sınıf ve .yas diye bir alanı olsun.
        // Bir döngüde de elimizdeki kişilerin maks ebeveyn yaşını bulalım:
        int maxYas = enBuyugu(kisiler[i].anne.yas, kisilar[i].baba.yas);

        // ... maxYas'i kullanırız...
    }
```
Veya bundan daha kompleks kıyaslamaları yapmak için hemen döngünün üstünde bir **lambda** fonksiyon tanımlayıp kullanabiliriz.

Böylece sadece bir yerde kullanılacak lokal fonksiyonlar için global fonksiyonlar tanımlamayız.

> C++11'in dile getirdiği en güzel nimetlerden biri olan Lambda da kısaca böyleydi.

---

Eksik veya hatalı bıraktığımız bir yer görürseniz yorumlara yazmayı unutmayın :)

Hayırlı günleriniz olsun efendim.