---
templateKey: blog-post
path: /c++11-std-move
title: "C++11: std::move"
image: /static/cpp/kapak-move.png
tags: ["C++11", "C++"]
date: 2020-07-08T12:00:03.066Z
description: C++11'deki std::move'a bir bakalım.
---
Merhabalar, bu yazıda C++11 sürümünde dile eklenmiş `std::move` keywordünü inceleyeceğiz.

---
## Nasıl kullanılır?

```cpp
std::string a = "selam";
std::string b = "merhaba";

// a = "selam"
// b = "merhaba"

b = a;

// a = "selam"
// b = "selam"


b = std::move(a);

// a = ""
// b = "selam"
```

## Ne işe yarar?
Bir nesneyi taşıyarak başka bir değişkene aktarmaktadır. Normal eşitlemeden farkı ise, nesnenin taşınmasıyla eski değişkene artık ihtiyaç duyulmayan durumlarda kullanılır.

```cpp
std::vector<Mesaj> mesajlar;

void yeniMesajGeldi(Mesaj mesaj)
{
    // 'mesaj' nesnesi kopyalanır ve hem 'mesaj', hem 'mesajlar.at(i)' ile erişilebilir.
    mesajlar.push_back(mesaj);
    
    // 'mesaj' nesnesi taşınır. Artık 'mesaj' ile erişilemez. Sadece dizide vardır.
    mesajlar.push_back(std::move(mesaj));
}
```
Yukarıdaki örnekte bir diziyi doldururken elemanların sadece dizide var olmaya devam etmesini istediğimiz için `std::move` kullandık.

__

Evet `std::move` bu kadarcık.

Bir sonraki yazıda görüşmek üzere :)

Esenlikler!