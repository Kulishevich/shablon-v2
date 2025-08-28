import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const host = request.headers.get('host') || '';
  const originalUrl = request.url;

  // Полностью исключаем localhost из обработки
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return NextResponse.next();
  }

  // Создаем финальный URL, который будет результатом всех нормализаций
  const finalUrl = new URL(request.url);
  let needsRedirect = false;

  // Определяем целевой hostname (убираем www если есть)
  const targetHostname = host.startsWith('www.') ? host.replace('www.', '') : host;

  // 1. HTTPS нормализация
  if (finalUrl.protocol === 'http:') {
    finalUrl.protocol = 'https:';
    finalUrl.hostname = targetHostname;
    finalUrl.port = ''; // Убираем порт для продакшн HTTPS
    needsRedirect = true;
  }

  // 2. WWW нормализация (убираем www)
  if (host.startsWith('www.') && finalUrl.protocol === 'https:') {
    finalUrl.hostname = targetHostname;
    finalUrl.port = ''; // Убираем порт для продакшн HTTPS
    needsRedirect = true;
  }

  // 3. Нормализация URL - проверяем на множественные слеши в оригинальном URL
  const urlParts = originalUrl.split('://');
  let hasMultipleSlashes = false;
  if (urlParts.length === 2) {
    const pathPart = urlParts[1].substring(urlParts[1].indexOf('/'));

    // Проверяем наличие множественных слешей в пути после домена
    if (/\/\/+/.test(pathPart)) {
      hasMultipleSlashes = true;
      needsRedirect = true;
    }
  }

  // 4. Нормализация пути
  let normalizedPath = pathname;

  // Если в оригинальном URL были множественные слеши, нормализуем путь
  if (hasMultipleSlashes) {
    // Для главной страницы с множественными слешами (например //) устанавливаем /
    if (pathname === '/') {
      normalizedPath = '/';

    } else {
      // Для других путей убираем множественные слеши
      normalizedPath = normalizedPath.replace(/\/\/+/g, '/');
    }
  }

  // Множественные слеши в пути (дополнительная проверка)
  if (/\/\/+/.test(normalizedPath)) {
    normalizedPath = normalizedPath.replace(/\/\/+/g, '/');
  }

  // Верхний регистр
  if (/[A-Z]/.test(normalizedPath)) {
    normalizedPath = normalizedPath.toLowerCase();
  }

  // Завершающий слеш (кроме корня)
  if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  if (normalizedPath !== pathname) {
    finalUrl.pathname = normalizedPath;
    needsRedirect = true;
  }

  if (needsRedirect) {
    const finalUrlString = finalUrl.toString();

    // Защита от циклических редиректов
    if (finalUrlString === originalUrl) {
      return NextResponse.next();
    }

    // Временное логирование для отладки
    return NextResponse.redirect(finalUrlString, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Применяем middleware ко всем путям кроме:
     * - api (API routes)
     * - _next/static (статические файлы)
     * - _next/image (оптимизированные изображения)
     * - favicon.ico (иконка)
     * - robots.txt, sitemap.xml (SEO файлы)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|feed.xml).*)',
  ],
};
