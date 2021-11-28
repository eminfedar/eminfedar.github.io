---
templateKey: blog-post
path: /plymouth-tema-olusturma-rehberi
title: Plymouth Tema Oluşturma Rehberi
image: /static/linux/plymouth.png
tags: ["Linux", "Plymouth"]
date: 2020-08-12T22:00:00.000Z
description: Kendi boot ekranınızı tasarlayın!
---
Merhabalar, bu yazıda Pardus gibi GNU/Linux sistemlerde sistem boot olurken karşınıza çıkan ekranı tasarlayacağız.

# 1. Kurulum:
Plymouth'u bilgisayarınız açıkken test edebilmek için aşağıdaki paketi sisteminize kurun: (debian)

```bash
sudo apt-get install plymouth-x11
```

## Tema klasörü örneği:
Temalar `/usr/share/plymouth/themes/` dizininde bulunur.

Basit bir tema aşağıdaki dosyalardan oluşur:
```bash
tema/
├── tema.plymouth
├── tema.script
```
**tema.plymouth** dosyası Plymouth'un tema hakkında bilgi edindiği dosyadır.

Örnek bir **.plymouth** dosyası:
```
[Plymouth Theme]
Name=Ornek bir Plymouth Temasi
Description=Bu temada sunlar sunlar vardir.
ModuleName=script

[script]
ImageDir=/usr/share/plymouth/themes/tema
ScriptFile=/usr/share/plymouth/themes/tema/tema.script
```
- **ImageDir**: Temada kullanacağımız fotoğrafların kaynağı olan dizin.
- **ScriptFile**: Temanın kodlarını yazacağımız dosya.

Örnek bir **.script** dosyası:
> 2. Kısımda detaylı anlatacağız.

## Oluşturduğunuz temayı varsayılan yapma:
Yukarıdaki şekilde oluşturduğumuz temayı sistem açılırken gözükecek tema olarak seçmek için aşağıdaki dosyayı düzenliyoruz:

**/etc/plymouth/plymouthd.conf**:
```
[Daemon]
Theme=tema
```

## Oluşturduğunuz temayı test etme:
Temanızı test edebilmek için size lazım olan 3 komut var:
- `plymouthd`: (plymouth'u çalıştırır)
- `plymouth --show-splash`: (temanızı ekranda gösterir)
- `plymouth --quit`: (plymouth'u kapatır)

İsterseniz kolayca test edebilmeniz için hazırladığım şu scripti de kullanarak temalarınızı test edebilirsiniz:

**plymouth_test.sh**:
```bash
#!/bin/bash
(plymouthd &);
plymouth --show-splash;

read -p "Kapatmak icin [ENTER] tusuna basiniz.";
echo "";

plymouth --quit;
```

> Not: Eğer plymouth tam ekran açılırsa Alt-Tab ile scripti çalıştırdığınız terminale gelip ENTER tuşuna basarak kapatabilirsiniz.

# 2. Kodlama:
Temamızı genel yapısıyla oluşturduktan sonra artık kodlamaya başlayabiliriz.

Kodlarımızı **tema.script** dosyasına yazıyoruz.

Plymouth, temaları **bash + C dili** karışımı gibi kendine has basit bir script dili ile yazılır.

Bu script diliyle neler yapabileceğinize dair birkaç örnek verelim:

## Fotoğraf ekleme:
```bash
# Kaynak dizini içindeki manzara.png'yi okuduk
manzara = Image("manzara.png");

manzara.GetWidth(); # Fotoğrafın genişliğini okuyabiliriz
manzara.GetHeight(); # Fotoğrafın yüksekliğini okuyabiliriz

manzara = manzara.Scale(2, 2); # İstersek fotoğrafı 2 katına büyütebiliriz.
manzara = manzara.Rotate(Math.Pi/2); # İstersek fotoğrafı döndürebiliriz (radyan cinsinden değer)


# Fotoğrafı ekrana eklemek için Sprite oluşturmalıyız.
spr_manzara = Sprite(manzara); # Ekrana eklendi.

spr_manzara.SetPosition(100, 200); # Ekranda X:100, Y:200 konumunda
# veya
spr_manzara.SetX(100);
spr_manzara.SetY(200);
```

## Yazı ekleme:
Yazıyı da eklerken aynı yöntemi kullanıyoruz tek fark Image ile bir kaynak dosya yerine yazı oluşturuyoruz:
```bash
yazi = Image.Text("Selamlar");
yazi = Image.Text("Kirmizi yazi", 1, 0, 0); #(R,G,B) değerleri 0.0 - 1.0 arası.
yazi = Image.Text("Yesil yazi", 0, 1, 0);

# Yazıyı ekrana eklemek için Sprite oluşturmalıyız.
spr_yazi = Sprite(yazi);
spr_yazi.SetPosition(10, 200);
```

## Arkaplan rengini değiştirme:
```bash
# Farkli renkler ile yukarıdan aşağıya bir gradyan oluşturabilirsiniz:

Window.SetBackgroundTopColor(0, 0, 1); # (R, G, B)
Window.SetBackgroundBottomColor(0.8, 0.2, 0.1); # (R, G, B)
```

## Animasyon ekleme:
Temamıza animasyon veya zamana bağlı değişen şeyler eklemek için saniyede 50 kere çalıştırılan hazır bir plymouth fonksiyonunu kullanacağız.
```bash
fun refresh_callback ()
{
    // Buradaki kodlar saniyede 50 kere calisacak.
}
Plymouth.SetRefreshFunction(refresh_callback);
```

Örneğin bir logoyu veya yüklenme resmini sürekli olarak çevirmek için:
```bash
img_logo = Image("logo.png")
spr_logo = Sprite(img_logo)

rotate = 0;
fun refresh_callback (){
    rotate = (rotate + 0.035) % (Math.Pi*2);

    spr_logo.SetImage(img_logo.Rotate(rotate));
}
Plymouth.SetRefreshFunction(refresh_callback);
```

# 3. Faydalı linkler:

- https://freedesktop.org/wiki/Software/Plymouth/Scripts/
- https://wiki.ubuntu.com/Plymouth
---

Evet, sanırım bu rehberde çoğu şeyi ele aldık.

Artık kendi boot ekranınızı tasarlayabilirsiniz :)

Eğer eksik bıraktığımız veya eklenmesini istediğiniz bir şey var ise yorumlarda yazmayı unutmayın.

Selametle.