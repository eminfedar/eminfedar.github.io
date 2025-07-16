---
title: "RISC-V Nedir?"
author: "Emin Fedar"
date: "2020-10-10T22:00:00.000Z"
brief: "RISC-V Nedir? Türkiye'de işlemci üretmek mümkün mü?"
meta_img: "/images/riscv/yunsup_lee_holding_risc_v_prototype_chip.jpg"
tags:
    - risc-v
---
Merhabalar, bu yazıda **RISC-V**(risk fayf)'ı ele alacağız.

Ama RISC-V'tan bahsetmeden önce "**RISC** ne ola ki 5. sürümü çıkmış" bir onu açıklığa kavuşturalım:

# RISC nedir?

**RISC**, Reduced Instruction Set Computer, yani **İndirgenmiş Komut Seti Bilgisayarı** bir işlemci mimari çeşididir.

Bir başka işlemci mimari çeşidi ise **CISC**, Complex Instruction Set Computer yani **Karmaşık Komut Seti Bilgisayarı** diye.

**Bunlar arasındaki farkı kısaca ele alırsak:**

CISC işlemciler bir komut gerçekleştirmek için birden fazla clock cycle kullanabilir. Örneğin aşağıdaki Assembly komutunu ele alalım:
```asm
MULT adres1, adres2
```
Bu komut Multiplication yani Çarpma işlemini temsil ediyor. RAM'deki adres2'de tutulan sayıyı adres1'de tutulan sayı ile çarpıp adres1'e kaydediyor.

Gördüğünüz gibi tek bir işlemci komutu ile A ve B'yi çarpıp A'ya yazabiliyoruz. Bunun C dilindeki karşlığı aşağıdaki gibi olacaktır:
```cpp
// a RAM'de adres1'de tutulsun
// b RAM'de adres2'de tutulsun
a = a * b
```
**CISC**'te tek bir komutla yazılan **MULT** işlemi aslında birkaç işlemci döngüsüyle gerçekleşir.

Örneğin MULT komutu 4 cycle(çevrim) gerektirsin ve bizim elimizde 4 Hz'lik bir işlemcimiz olsun.

Bu durumda MULT komutu tek bir komut olmasına rağmen, 4 cycle sonra sona ereceği için 1 saniyede ancak 1 tane MULT komutu çalıştırabiliriz.

### Peki bu durum RISC'te nasıl?

RISC'te ise bütün komutlar 1 cycle'da biter.

Aynı Multiplication işlemini RISC'te gerçekleştirmek için 4 komuta ihtiyacımız var:
```asm
lw  a0, 0xA0    ; Load Word (a0 register'ına 0xA0'daki değeri yükle)
lw  a1, 0xB0
mul a0, a0, a1  ; a0 ile a1'i çarpıp a0'a yaz.
sw  0xA0, a0    ; Store Word (a0'daki değeri 0xA0 adresine kaydet)
```

Şimdi diyebilirsiniz ki:
> Eee, toplam yine 4 cycle tuttu? Ne olayı var yani bunun?

Öyleyse RISC'in CISC'e göre farklarına bir göz atalım:

## RISC'in CISC'e göre artıları
| RISC ++ | CISC  --|
|-|-|
| Tek çevrimde gerçekleşen basit komutlar, donanımsal olarak daha az transistör ile gerçekleştirilir| Kompleks komutları icra eden donanımlar daha fazla transistör gerektirir ve karmaşık bir mimariye sahiptir |
| Her komut tek çevrimde gerçekleştiği için Pipelining mümkündür | Komutlar farklı çevrimlerde bittiği için Pipelining zorlaşır|
| Az sayıda işlemci komutu ile tüm işlemler gerçekleştirilir. Sade ve kolay bir Instruction Set'e sahiptir| Çok fazla farklı işlemci komutu vardır ve Instruction Set'i karmaşıktır |
| Komutlar basit olduğu için donanımsal olarak gerçeklenirken basittirler ve az yer kaplarlar. | Komutlar karmaşık olduğu için donanımsal yapılar karmaşık ve çok yer kaplar |
| Transistör sayısı az ve donanımı basit olduğu, çalışma frekansı da düşük olduğu için çok daha az enerji tüketir (4-5W) | Yüksek enerji tüketimi (90-100W) |


**Pipelining:** [https://en.wikipedia.org/wiki/Instruction_pipelining](https://en.wikipedia.org/wiki/Instruction_pipelining)
![Pipelining](https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pipeline%2C_4_stage.svg/1024px-Pipeline%2C_4_stage.svg.png)

## RISC'in CISC'e göre eksileri
| RISC -- | CISC ++ |
|-|-|
| Derleyici güçlü ve gelişmiş olmalıdır, karmaşık kodları indirgenmiş temel komutlara çevirebilmelidir | Derleyicinin işi kolaydır çünkü karmaşık işlemlerin direkt olarak donanımsal karşılıkları vardır |
| Daha fazla RAM tüketir | Daha az RAM tüketir |
| Daha fazla kod boyutu kaplar (aynı işi yapmak için CISC'te 1, RISC'te 4 satır kod yazdık, bu da RISC için derlenen program diskte 3 kelime daha fazla yer kaplar demek) | Daha düşük kod boyutu kaplar |
| Daha düşük frekanslarda çalışır (1-2.5 GHz) (şimdilik?) | Daha yüksek frekanslarda çalışır (4-5 GHz) |

> Eskiden işlemciler oldukça sınırlı RAM ve hafıza ile çalıştıklarından CISC mimarisi biraz daha fazla ön plandaydı. <br>
> Fakat günümüzde RAM ve hafıza bellek boyutları oldukça yüksek olduğu için RISC'in enerji verimliliği ve performansı onu daha çok ön plana çıkıyor.

Özetle derleyicileriniz biraz daha gelişmiş ise, RAM ve hafıza bellek kaynağı sıkıntınız yok ise RISC daha avantajlı diyebiliriz.

# RISC'i anladık. Peki RISC-V nedir?

![RISC-V Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/RISC-V-logo.svg/1920px-RISC-V-logo.svg.png)

**RISC-V**(risk-fayf) RISC prensiplerini kullanan açık kaynak bir **Komut Seti Mimarisidir(ISA)**.


İşlemcilerini CISC mantığı ile yapan firmalara örnek olarak AMD ve Intel'i verebiliriz. İşlemcilerini RISC mantığı ile yapan firmalara örnek ise ARM verilebilir.

Bu firmalar oluşturdukları ISA'ler ile işlemci üretmek isteyen başka firmalara belirli bir lisans ücreti karşılığında izin verirler.

Örneğin Intel'in x86 işlemci mimarisi hoşunuza gitti ve siz de aynı protokolü kullanarak komut işleyen ve donanımlar ile haberleşen işlemcinizi yapmak istiyorsunuz. Bunun için Intel'den izin alıp belirli bir lisans parası ödeyerek işlemcinizi yapabilirsiniz.

Aynı şey ARM için de geçerli. Bugün ARM mimarilerini kullanarak işlemci üreten firmalar (Qualcomm, Broadcom, STM vb.) ARM şirketine lisans parası ödemek zorundalar. Mesela telefonunuzdaki Snapdragon bilmem kaç işlemcisi için Qualcomm ARM'a lisans parası ödüyor.

**İşte RISC-V burada devreye giriyor!**

University of California Berkeley'in oluşturduğu ve herkese açık (ister kişisel, ister ticari, ister akademik) bir ISA olan RISC-V, herhangi bir lisans parası ödemeden herkesin ortak kabul ettiği bir mimaride işlemci üretebilmenizi sağlıyor.

Sadece bununla da kalmıyor, aynı zamanda RISC-V işlemcilerinin çoğunun iç tasarımları herkese açık olarak paylaşılmış durumda: [https://github.com/riscv/riscv-cores-list](https://github.com/riscv/riscv-cores-list)

> Peki ben RISC-V mimarisiyle çalışan bir işlemci tasarlarsam bunu açık kaynak olarak paylaşmak zorunda mıyım? <br>

Hayır. İsterseniz paylaşmayabilirsiniz de, tamamen size bağlı.

## RISC-V'nin geleceği
RISC-V 2018-2020 yıllarında büyük bir ivme yakalamış durumda. Bugün içlerinde **Türkiye'den ASELSAN ve SystemPark** firmalarının da bulunduğu *(as bayrakları 🇹🇷)* 100'den fazla stratejik ve iş ortakları mevcut:
https://riscv.org/membership/members/

Mesela **NVIDIA**, yeni yapacağı işlemcilerde RISC-V'a geçeceğini duyurmuştu. Aynı zamanda RISC-V için grafik ve yapay zeka hızlandırıcıları(NVDLA) üzerine çalışıyor.

**Alibaba group** şirketi 2.5GHz ile çalışan 16 çekirdekli RISC-V işlemcisini (XuanTie C910) 2019 yılında duyurmuştu.

**Canaan** şirketinin [Kendryte K210](https://canaan.io/product/kendryteai) işlemcisi ile 0.3W enerji ile saniyede 60 kare yüz tanıma yapabilen uygulamalar geliştirebiliyorsunuz.

![](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fapplexgen.com%2Fwp-content%2Fuploads%2F2020%2F03%2FXuantie-910-procesador-16-n%25C3%25BAcleo-con-arquitectura-RISC-V-de-Alibaba.jpg)

Ve daha niceleri...

## Türkiye RISC-V mimarisini temel alarak kendi işlemcisini üretebilir mi?
Bu sorunun cevabını iki şirketimizin RISC-V'a sponsor ve ortak olduğunu düşünerek mutlulukla **EVET** demek istiyorum :).

ASELSAN **Çakıl** adında bir işlemci üzerine çalıştığını zaten duyurmuştu. [SystemPark Savunma](https://systempark.io) ve [DeepControl Teknoloji](https://deepcontrol.net) şirketleri de ortaklaşa yapay zeka geliştirmeleri için RISC-V işlemcili bir geliştirme kartı ve işlemci mimarisi çalışmaya başladı. Ben de bu ekibin bir parçası olarak destek vermeye devam ediyorum.

Türkiye otomobil sektörünü **Elektrikli otomobil çağına geçiş** esnasında yakaladığı gibi, işlemci sektöründe de **RISC-V** ile global pazarda bir yer yakalayabilir.

Ayrıca Üniversitelerimizin de x86, PIC veya ARM yerine akademik camiaya da uygun olan RISC-V ile derslerini şekillendirmeleri bu ivmelenmemizi büyük oranda hızlandıracaktır. Çok uzak olmayan gelecekte Türkiye'de işlemci firmaları görebiliriz :)

Duamız odur ki ülkemizde güzel işlere imza atılsın. Bekleyip hep birlikte göreceğiz :)

Umutla, şevkle ve azim ile kalın