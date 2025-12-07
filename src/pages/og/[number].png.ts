import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

const fontPath = path.resolve('./public/fonts/Satoshi-Variable.woff');
const fontData = fs.readFileSync(fontPath);

export const getStaticPaths: GetStaticPaths = async () => {
  const items = await getCollection('manifesto');
  return items.map((item) => ({
    params: { number: String(item.data.number) },
    props: {
      number: item.data.number,
      title: item.data.title,
      lightBg: item.data.lightBg || '#fff',
      lightFg: item.data.lightFg || '#111',
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { number, title, lightBg, lightFg } = props;
  const paddedNumber = String(number).padStart(2, '0');

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: lightBg,
          color: lightFg,
          padding: '80px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontSize: '32px',
                fontFamily: 'Satoshi',
                opacity: 0.6,
                marginBottom: '16px',
              },
              children: paddedNumber,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '72px',
                fontWeight: 700,
                fontFamily: 'Satoshi',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                marginTop: 'auto',
                gap: '16px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '24px',
                      fontFamily: 'Satoshi',
                      opacity: 0.7,
                    },
                    children: 'Manifesto',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Satoshi',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Satoshi',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
