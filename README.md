# Портфолио — MathematicLove

Статический сайт-портфолио. Легко обновляется благодаря декларативным данным в `assets/js/app.js`.

## Локальный просмотр

Откройте `index.html` в браузере. Никаких сборщиков не требуется.

## Как обновлять контент

- Навыки и разделы: редактируйте объект `profile.sections` в `assets/js/app.js` — добавляйте, удаляйте или переименовывайте карточки и элементы.
- Математика: список в `profile.math` в `assets/js/app.js`.
- Ссылки: поле `profile.github`.
- Стили/анимации: файл `assets/css/styles.css`.

Изменения отобразятся автоматически при перезагрузке страницы — скрипт заново отрисовывает карточки и списки.

## GitHub Pages

Добавьте репозиторий на GitHub и включите Pages:
1. Запушьте проект.
2. В настройках GitHub Pages укажите ветку `main` и папку `/` (корень).
3. Либо используйте workflow ниже.

### Автодеплой через workflow

Создайте файл `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

После пуша сайт будет доступен на GitHub Pages вашего репозитория.
