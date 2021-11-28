---
templateKey: blog-post
path: /sifirdan-islemci-0-islemci-mimarisi-ve-riscv
title: Sıfırdan İşlemci | 0) İşlemci mimarisi ve RISC-V
image: /static/riscv/sifirdan-islemci-0.jpg
tags: ["Sıfırdan İşlemci", "RISCV"]
date: 2020-10-19T23:00:00.000Z
description: "Sıfırdan RISC-V İşlemci tasarlıyoruz!"
---

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8q-Oz_DO4Mw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Merhabalar, bu seride birlikte RISC-V Komut Setini işleyebilen Tek çekirdekli, Tek çevrimli ve 32 Bit bir işlemci tasarlayacağız.

Daha sonra da bu işlemcimizi [Pipelined](https://en.wikipedia.org/wiki/Instruction_pipelining) hale getirip performansını arttıracağız.

## Seriye başlamadan önce gereksinimler 

- **Mantık Devreleri** bilgisi
- İkili *(Binary)* sistemler ve aritmetiği
- Basit elektrik bilgisi (kabloları birbirine bağlama :))
- Yanmaya hazır bir beyin 🤯

> **Hazırsanız başlayalım!**

## İşlemci nasıl çalışır?

Bir bilgisayar temel olarak iki birimden oluşur: **İşlemci ve RAM(Bellek)**

RAM işlemcinin **yazıp okuyabildiği** bir bellektir. İşlemcinin temelde yaptığı aslında RAM bellekteki komutları okuyup işlemek ve yine RAM belleğe değerler kaydetmektir. Mesela gerçek hayatta şöyledir:

Bir programı açarsınız, işletim sistemi işlemcinin çalıştıracağı program önce kalıcı bellekten(Disk) geçici belleğe(RAM) birebir kopyalar.

İşlemci RAM'e kopyalanmış komutları yani programı sırayla okumaya ve çalıştırmaya başlar.

İşlemcide hangi işlemin gerçekleşeceği RAM'de okunan **"Instruction(Komut)"**'ın ne olduğuna bağlıdır. Bu komutlar RAM'de saklanabilen sayılardan ibarettir, işlemcide manalandırılıp hesaplamalar yapılır.

## RAM'deki 0'lar ve 1'ler nasıl bir komut ifade edebiliyor?

Örneğin kendimiz bir **Instruction Set**(Komut Seti) uyduralım:

4 tane komutumuz olsun:

0. TOPLA
1. ÇIKAR
2. KAYDET
3. OKU

Bu komutları işlemcide işleyebilmek için aynı yukarıdaki gibi numaralandıralım. Böylece hangi işlemi yapmamız gerektiğini bilmek için 2 tane bit işimizi görecektir:

- 00 = 0
- 01 = 1
- 10 = 2
- 11 = 3

Peki, ilk 2 bit komutun tipini belirtiyor. Şimdi işlenecek değerleri de komutumuza ekleyelim. Yani "TOPLA" ya da "ÇIKAR" ama hangi iki sayıyı? :)

Topla ve Çıkar işlemleri için **8 bitlik 2 sayıyı** da komutumuza ekleyelim. Bir komut şuan 18 Bit ( 2 + 8 + 8 ) genişliğinde oldu.

### Şimdi bu komut setiyle "2 + 2" işlemini yapmak isteyelim:


= TOPLA 2, 2 <br>
= 00 00000010 00000010 <br>
= **000000001000000010** <- İşte bizim komutumuz.<br>


> Sadece 0 ve 1'lerden oluşan bu sayı aslında 2 ile 2 sayısını toplamayı ifade eden bir komut: **000000001000000010**

Mesela **"2 - 2"** işlemini yapmak isteseydik şöyle bir komutumuz olacaktı:

= ÇIKAR 2, 2 <br>
= 01 00000010 00000010 <br>
= **010000001000000010** <br>

### İyi de bu topladıklarımızın sonucu nerede tutuluyor?
Güzel soru! 2 + 2'yi yaptık fakat 4'ü nerede saklayacağız?

İşte burada **"Registers(Kaydediciler)"** devreye giriyor.

## Register(Kaydedici) nedir?
Registerlar bir kelimelik *(Genelde işlemcinin bit sayısıdır)* veri tutan belleklerdir.

Yapıları basittir, 1 tane D-Tipi Flip-Flop ile 1 bitlik bir Register elde edebilirsiniz. Yani 32 bitlik bir register için 32 tane D-Tipi Flip-Flop kullanabiliriz.

İşlemcimiz 32 bit olacağına göre registerlarımız da 32 bit olacaktır.

Şimdi komutlarımıza bir de hangi registerda tutulacakları bilgisini de ekleyelim. Örneğin 4 tane registerımız olsun. Yine 2 bit ile bu 4 registeri gösterebiliriz.

> Komutumuz toplam 20 bit oldu:
> Komut Tipi[2] + Sayı[8] + Sayı[8] + Register[2] = 20 Bit

Registerlarımızın sırası şöyle olsun:

0. r0
1. r1
2. r2
3. r3

**Artık TOPLA komutumuza sonucu nereye yazacağını da ekleyebiliriz:**

= TOPLA 2, 2, r0 <br>
= 00 00000010 00000010 00 <br>
= **00000000100000001000**

İşte karşınızda 2 ile 2'yi toplayıp 0. Registera kaydetme işlemini simgeleyen komut: **00000000100000001000**!

İşlemcimiz(eğer bu komut setini işleyen bir işlemci yapmış olsaydık) RAM'i kelime kelime okuyup (örneğin 32 bit) bizim komutumuzu parametrelerine ayırıp işleyecekti. Mesela ilk iki bite göre toplama mı çıkarma mı yapacağına karar veren bir devreye sahip olacaktı.

### Komutların RAM'de nasıl tutulduğunu anladık, peki işlemci bu komutları nasıl işliyor?

Öncelikle işlemcimizin yaptığı işlemleri genel olarak belirleyelim.

İşlemcimiz bir çevrim çalışmak için 4 işlemi sırayla yapar:

> FETCH → DECODE → EXECUTE → WRITE BACK

1. **FETCH**: Yani "Getir". <br>İşlemcinin ilk işi RAM'deki sıradaki komutu okumak.
2. **DECODE**: Yani "Çöz". <br>Getirdiği komutu parametrelerine ayırıp ne komutu olduğunu "çözdüğü" aşama.
3. **EXECUTE**: Yani "Çalıştır". <br>Her şeyini bildiğimiz komutun geriye sadece çalıştırılması kalıyor. Yani komutun "TOPLA, 2, 2, r0" olduğunu anladık, burası 2 ve 2'yi ALU'da topladığımız kısım.
4. **WRITE BACK**: Yani "Geri yaz". <br>2 + 2 = "4" sonucunu "r0"a yazdığımız kısım.

Bu 4 aşama bittiğinde işlemcimiz 1 cycle(çevrim) çalışmış oluyor.

> Bir Komut Seti nasıl oluşturuluyor ve işlemci nasıl çalışıyor basit bir şekilde öğrenmiş olduk. Şimdi sıra hayali komut setimizi bir kenara bırakıp gerçekten işlemcimizi üzerine bina edeceğimiz RISC-V Komut Setini ele alalım.

## RISC-V Komut Setini inceleyelim

RISC-V Komut seti RISC prensipleriyle hazırlanmış, devresini kurmak için gayet az sayıda eleman ve bağlantı gerektiren, tasarruf açısından verimli olması için akıllıca tasarlanmış bir komut setidir.

Ayrıca açık kaynaktır. İsteyen herkes RISC-V komut setini işleyen işlemcileri üretip bastırabilir.

Biz de RISC-V komut setini işleyen bir işlemci yapacağız. Bu yüzden komutları kolayca işleyebilmek için sınıflarına ayıralım, ki zaten bu düşünülerek tasarlanmış bir komut seti olduğundan tipleri bizim kolayca DECODE etmemiz için hazır.
### Komut Tipleri:

![RISC-V Komut Tipleri](/static/riscv/riscv-instructions.png)

RISC-V Komut Seti temel olarak 6 adet komut tipi içerir:

1. R-Tip: **Register-Register** komutlarıdır. İşlemler Register'dan alınıp Register'a yazılır.
2. I-Tip: **Immediate**(Direkt Değerli) komutlarıdır. İşlemler Sayı-Register olarak işlenir. Mesela r0' registerine 5 sayısını eklemek komutu. Sabit sayı için ayrılan bit sayısı 12'dir.
3. U-Tip: **Upper Immediate** komutlarıdır. I-Tip ile aynıdır sadece sabit sayı için 20 bit ayrılmıştır. Örneğin 32 bitlik bir sabit sayı ile işlem yapmak tek başına I veya U tip yetmeyeceği için ilk 12 biti için I-Tip, sonraki yüksek değerlikli 20 biti için U-Tip komut çağrılır.
4. S-Tip: **Store**(Kayıt) komutlarıdır. RAM'e değer kaydetmek için kullanılır.
5. B-Tip: **Branch**(Dallanma) komutlarıdır. Registerların birbirine göre durumları baz alınarak programda başka bir yere dallanmak için kullanılır.
6. J-Tip: **Jump**(Atlama) komutlarıdır. Koşulsuz olarak programda başka bir yere atlamak için kullanılır.

### RV32IM Komut Seti:

![RISC-V Komut Seti](/static/riscv/riscv-isa.png)

Bizim devrelerini kuracağımız komut seti yukarıdaki RV32IM komut setidir.
(RV32I ve diğer tüm opcode'lar için: https://github.com/riscv/riscv-opcodes/blob/master/opcodes-rv32i)

RISC-V'ın 6 Temel çekirdek eklentisi(extension) var:
- I -> **Integer**, temel komut spesifikasyonu. Tüm işlemcilerde ortak bulunur. Diğerleri opsiyoneldir.
- M -> **Multiplication**, çarpma ve bölme işlemleri için.
- A -> **Atomic Operations**, mutex, semafor gibi atomik değişken işlemleri için.
- F -> **Floating Point**, ondalıklı sayılar için (32-bit)
- D -> **Double Precision Floating Point**, ondalıklı sayılar için (64-bit)
- C -> **Compressed**, temel komut spesifikasyonunun 16-bit'e indirgenmiş sıkıştırılmış halini işleyen eklenti.

> IMAFD eklentilerinin bir arada bulunma hali "G" takısıyla isimlendirilir. Örneğin RV64IMAFDC bir işlemciye RV64GC denir. "G" takılı işlemciler işletim sistemi çalıştırabilirler. "G" olmayanlarda ise daha çok RTOS(Real-Time Operating System) kullanılır.

Komut seti yukarıdaki komut tiplerine uygun olarak hazırlanmış komutlardan oluşuyor. Bu tipleri ise başlarındaki OPCODE'larından (ilk 7 bit) ayırt edebiliyoruz.

Daha sonraki Kod[3] ve Kod[7] ise komut tipine sahip ayrı ayrı komutları simgeliyor. Örneğin 0x33 OPCODE = Register-Register komutları. Bu Register-Register komutlarından hangisini çalıştırmak istediğimiz ise Kod[3] ve Kod[7] gösteriyor.

Örneğin:
- `add rd, rs1, rs2` bir Register-Register komutu.
- `sub rd, rs1, rs2` de öyle.

Bu komutların ikisinin de OPCODE'u aynı(0x33). Aralarındaki fark ise **funct3** ve **funct7** kodlarının farklı olması.

| Komut | Kod[3] | Kod[7] |
|-|-|-|
| add | 0x0 | 0x00 |
| sub | 0x0 | **0x20**|

Gördüğünüz gibi **OPCODE, Kod[3] ve Kod[7]** üçlüsüyle komutları birbirinden ayırt ediyoruz.

### Peki nasıl bir sistem yapacağız ona bir bakalım:

![Bilgisayar Sistemi](/static/riscv/bilgisayar-sistem.png)

Gördüğünüz üzere bir tane İşlemci, bir tane RAM'imiz var. Basit bir bilgisayar için bu ikisi yeterlidir. İşlemci RAM'den komutları(Instruction) okur, işler ve geri yazar. Geri kalan bütün şeyler ek olarak sonradan eklenir (klavye, ekran, fare gibi).

Şimdilik böyle bir giriş yapmış olalım ve burada bırakalım. İşlemcimizin içini tasarlamaya [Logisim](http://cburch.com/logisim/index.html) programıyla ikinci derste başlayacağız.

---
Bir sonraki ders: [Sıfırdan İşlemci | 1) Fetch (Getir)](/sifirdan-islemci-1-fetch)