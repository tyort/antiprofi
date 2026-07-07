import { products } from '../../data/products';

export async function GET() {
  const siteUrl = 'https://anti-profi.ru';
  const currentDate = new Date().toISOString();

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
    <offers>
`;

  products.forEach((product) => {
    // Определяем категорию в зависимости от названия
    const categoryId = product.name.includes('пигоди') || product.name.includes('манты') ? 2 : 1;
    
    // Формируем краткое описание из intro
    const description = typeof product.description === 'string' 
      ? product.description 
      : product.description.intro;

    xml += `      <offer id="${product.id}">
        <url>${siteUrl}/product/${product.id}</url>
        <price>5000</price>
        <currencyId>RUB</currencyId>
        <categoryId>${categoryId}</categoryId>
        <picture>${siteUrl}${product.image}</picture>
        <name>${product.name}</name>
        <description>${description.replace(/[&<>'"]/g, 
          tag => ({
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              "'": '&#39;',
              '"': '&quot;'
            }[tag] as string)
          )}</description>
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
