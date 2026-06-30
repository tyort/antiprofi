# Lighthouse Desktop Check

Короткое руководство по стабильной проверке `Performance` для `https://anti-profi.ru`.

## Цель проверки

Получить валидный Lighthouse-отчет и корректно отличать:

- реальную деградацию производительности;
- сбой самого прогона Lighthouse (`NO_FCP`, `NO_LCP` в stderr).

## Базовый прогон (desktop)

```bash
npx lighthouse https://anti-profi.ru \
  --preset=desktop \
  --output=json \
  --output-path=./lh-desktop-$(date +%s).json \
  --quiet \
  --chrome-flags="--headless --no-sandbox --disable-gpu --disable-dev-shm-usage --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-renderer-backgrounding"
```

Почему так:

- уникальный `output-path` исключает путаницу со старым отчетом;
- `chrome-flags` уменьшают нестабильность в Linux-окружении.

## Проверка последнего отчета

```bash
latest=$(ls -t ~/lh-desktop-*.json | head -n1)
node -e "const r=require(process.argv[1]); console.log(process.argv[1], {score:r.categories?.performance?.score,lcp:r.audits?.['largest-contentful-paint']?.displayValue,tbt:r.audits?.['total-blocking-time']?.displayValue,runtimeError:r.runtimeError});" "$latest"
```

## Как интерпретировать результат

### Отчет валидный

Если:

- `runtimeError: undefined`
- есть `score`, `lcp`, `tbt`

Тогда прогон успешный, и метрики можно использовать.

### Отчет невалидный

Если:

- `runtimeError.code = NO_FCP` (или другой код ошибки)
- `score: null`, `lcp/tbt: undefined`

Тогда этот конкретный прогон нужно отбросить и повторить.

## Важный нюанс про `LanternError: NO_LCP`

В CLI может печататься `LanternError: NO_LCP` в stderr даже при валидном итоговом JSON.

Правило:

- доверяем не тексту stderr, а полям в JSON (`runtimeError`, `score`, `audits`).

## Рекомендация по достоверности

Делайте 3 прогона подряд и сравнивайте медиану по `score` и `LCP`, а не один замер.
