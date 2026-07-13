import { products } from '../../data/products';

export async function GET() {
  const siteUrl = 'https://anti-profi.ru';
  const currentDate = new Date().toISOString();
  const performerName = 'Antiprofi';
  const companyName = 'Агентство нестандартных услуг Antiprofi';
  const serviceSetId = '1';
  const serviceSetName = 'Услуги напрокат в Москве — Antiprofi';
  const serviceSetUrl = `${siteUrl}/`;
  const offerRegion = 'Москва и Московская область';

  const escapeXml = (value: string) =>
    value.replace(/[&<>'"]/g, (tag) => (
      {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag] as string
    ));

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${currentDate}">
  <shop>
    <name>Antiprofi</name>
    <company>Агентство нестандартных услуг Antiprofi</company>
    <url>${siteUrl}</url>
    <currencies>
      <currency id="RUB" rate="1"/>
    </currencies>
    <categories>
      <category id="1">Услуги напрокат</category>
      <category id="2">Кейтеринг</category>
    </categories>
    <sets>
      <set id="${serviceSetId}">
        <name>${escapeXml(serviceSetName)}</name>
        <url>${serviceSetUrl}</url>
      </set>
    </sets>
    <offers>
`;

  products.forEach((product) => {
    // Определяем категорию в зависимости от названия
    const categoryId = product.name.includes('пигоди') || product.name.includes('манты') ? 2 : 1;
    
    // Формируем краткое описание из intro
    const productIntro = typeof product.description === 'string' 
      ? product.description 
      : product.description.intro;
    const serviceDescription = `${product.name} — ${productIntro}`;

    xml += `      <offer id="${product.id}">
        <url>${siteUrl}/product/${product.id}</url>
        <price>5000</price>
        <currencyId>RUB</currencyId>
        <categoryId>${categoryId}</categoryId>
        <picture>${siteUrl}${product.image}</picture>
        <name>${escapeXml(performerName)}</name>
        <vendor>${escapeXml(companyName)}</vendor>
        <description>${escapeXml(serviceDescription)}</description>
        <set-ids>${serviceSetId}</set-ids>
        <param name="Рейтинг">5.0</param>
        <param name="Число отзывов">12</param>
        <param name="Годы опыта">7</param>
        <param name="Регион">${escapeXml(offerRegion)}</param>
        <param name="Конверсия">1</param>
      </offer>
`;
  });

  xml += `    </offers>
  </shop>
</yml_catalog>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
