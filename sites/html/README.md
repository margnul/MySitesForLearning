# Margnul — портфолио

## Как устроены стили

Два разных файла в HTML — это не дубли сборки, а два слоя загрузки:

1. `styles/main-fast.css` — маленький critical CSS. Правишь его руками. Подключается **первым** обычным `<link rel="stylesheet">`, поэтому браузер рисует цвета секций сразу.
2. `styles/main.min.css` — полный набор стилей. Собирается из SCSS.

Сборка полного CSS:

```text
main.scss  →  sass  →  main.css (читаемый)  →  clean-css  →  main.min.css (сжатый)
```

`main-fast.css` в эту цепочку не входит.

## Установка

```bash
npm install
```

## Разработка

Одновременно:

1. `npm run watch` — следит за SCSS, пишет `main.css`, сразу сжимает в `main.min.css`
2. Live Server на `index.html`

Правишь `_globals.scss` или другой SCSS → обновляешь страницу. Watch не останавливай.

Правишь первый кадр (цвета hero, спиннер) — правишь `styles/main-fast.css` напрямую, сборка не нужна.

## Перед деплоем

```bash
npm run build
```

Потом подними `?v=` у CSS в `index.html`.

## Команды

| Команда | Назначение |
|---|---|
| `npm run watch` | разработка: SCSS → `main.css` → `main.min.css` на каждое изменение |
| `npm run build` | то же один раз, перед выкладкой |

## Файлы

```text
styles/
  main.scss        ← пишешь обычные стили
  main.css         ← читаемый результат Sass (можно смотреть в DevTools)
  main.min.css     ← сжатый, его грузит сайт асинхронно
  main-fast.css    ← critical, грузится первым, правишь руками
```
