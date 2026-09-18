import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE } from '@/shared/config/site';

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

interface OgCardOptions {
  /** Маленькая подпись над заголовком. */
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Чипы под подзаголовком — 2–4 штуки. */
  tags: string[];
  /** Путь к фото относительно public/. */
  photo: string;
  /** Точка кадрирования фото, как object-position. */
  photoPosition?: string;
}

const FONT_DIR = join(process.cwd(), 'src/app/fonts');
const PUBLIC_DIR = join(process.cwd(), 'public');

async function loadAssets(photo: string) {
  const [display, body, bodyBold, photoBuffer] = await Promise.all([
    readFile(join(FONT_DIR, 'Unbounded-Bold.ttf')),
    readFile(join(FONT_DIR, 'GolosText-Medium.ttf')),
    readFile(join(FONT_DIR, 'GolosText-Bold.ttf')),
    readFile(join(PUBLIC_DIR, photo)),
  ]);
  return {
    display,
    body,
    bodyBold,
    photoSrc: `data:image/jpeg;base64,${photoBuffer.toString('base64')}`,
  };
}

/**
 * Единая карточка превью для ссылок (Telegram, WhatsApp, VK, Twitter, iMessage).
 * Фото на весь кадр, тёмная плашка слева, крупный заголовок.
 */
export async function renderOgCard(options: OgCardOptions) {
  const { eyebrow, title, subtitle, tags, photo, photoPosition = '50% 50%' } = options;
  const { display, body, bodyBold, photoSrc } = await loadAssets(photo);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#0b2a2e',
          fontFamily: 'Golos',
          color: '#f2fbfa',
        }}
      >
        {/* Фото на всю карточку */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: photoPosition,
          }}
        />
        {/* Затемнение слева, чтобы текст читался на любом фото */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            backgroundImage:
              'linear-gradient(90deg, rgba(8,34,38,0.96) 0%, rgba(8,34,38,0.88) 42%, rgba(8,34,38,0.45) 70%, rgba(8,34,38,0.08) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            backgroundImage: 'linear-gradient(180deg, rgba(8,34,38,0) 55%, rgba(8,34,38,0.7) 100%)',
          }}
        />

        {/* Контент */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '56px 64px 52px',
          }}
        >
          {/* Шапка: логотип + eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 52,
                height: 52,
                borderRadius: 16,
                backgroundColor: '#12d3c8',
                color: '#06282b',
                fontFamily: 'Unbounded',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              T
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontFamily: 'Unbounded',
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: -0.5,
                }}
              >
                {SITE.name}
              </div>
              <div style={{ fontSize: 18, color: '#9fd9d5', letterSpacing: 1.5 }}>
                {eyebrow.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Заголовок и подзаголовок */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 760 }}>
            <div
              style={{
                fontFamily: 'Unbounded',
                fontSize: 62,
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: -1.5,
              }}
            >
              {title}
            </div>
            <div style={{ fontSize: 27, lineHeight: 1.35, color: '#d7efed', maxWidth: 680 }}>
              {subtitle}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 6 }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: 'flex',
                    padding: '9px 18px',
                    borderRadius: 999,
                    border: '2px solid rgba(18,211,200,0.7)',
                    backgroundColor: 'rgba(6,40,43,0.55)',
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#c8f5f1',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Адрес сайта */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 20,
              color: '#9fd9d5',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 34,
                height: 3,
                backgroundColor: '#12d3c8',
                borderRadius: 2,
              }}
            />
            {SITE.host}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Unbounded', data: display, weight: 700, style: 'normal' },
        { name: 'Golos', data: body, weight: 500, style: 'normal' },
        { name: 'Golos', data: bodyBold, weight: 700, style: 'normal' },
      ],
    }
  );
}
