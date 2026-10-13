export { validateProject } from "../shared/project";
export type { ProjectData, Errors } from "../shared/project";

export async function submitDemoProject(): Promise<{
  mode: "demo";
  message: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return {
    mode: "demo",
    message:
      "Proje özetin kontrol edildi. Gönderim bağlantısı henüz açık olmadığı için bilgiler Bürküt'e iletilmedi; bu sayfada kaldı.",
  };
}

export function demoReply(input: string): string {
  const text = input.toLocaleLowerCase("tr");
  if (/fiyat|bütçe|ücret|kaç para|süre|zaman|teslim/.test(text))
    return "Fiyat ve süre, kapsam ve gereksinimler netleşince proje özelinde değerlendirilir. Burada kesin bir teklif veremem. Proje özetini hazırlamak için “Fikrimi netleştir” seçeneğini kullanabilirsin.";
  if (/oyun/.test(text))
    return "Oyun fikrinde önce temel oynanışı, hedef platformu ve ilk prototipin kapsamını netleştirebiliriz. Bürküt oyun prototipi, oynanış ve oyun arayüzü üzerine çalışır.";
  if (/uygulama|mobil/.test(text))
    return "Uygulama için kullanıcıların hangi ihtiyacını çözeceğini ve temel akışları belirlemek iyi bir başlangıç. Platform ve araçlar projenin ihtiyacına göre değerlendirilir.";
  if (/web|site/.test(text))
    return "Bürküt kurumsal siteler, tanıtım sayfaları ve ihtiyaca göre web uygulamaları geliştirir. Önce sitenin amacı, hedef kitlesi ve gerekli içerikleri netleştirebiliriz.";
  if (/merhaba|selam/.test(text))
    return "Merhaba! Web sitesi, uygulama veya oyun fikrini konuşabiliriz. “Fikrimi netleştir” ile birlikte bir proje özeti hazırlayalım.";
  return "Web, uygulama, oyun ve proje süreci hakkında yardımcı olabilirim. Fikrini yapılandırmak için “Fikrimi netleştir” seçeneğini kullanabilirsin.";
}
