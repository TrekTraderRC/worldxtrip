import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * @typedef {Object} AmorousMapCountry
 * @property {string} code
 * @property {string} nameZh
 * @property {string} nameEn
 * @property {number} count
 * @property {number} level
 * @property {string} label
 * @property {string=} note
 */

const NAME_TO_CODE = {
  Australia: 'AU',
  Japan: 'JP',
  'United States': 'US',
  'United States of America': 'US',

  China: 'CN',
  'Russian Federation': 'RU',
  Russia: 'RU',
  Malaysia: 'MY',

  Singapore: 'SG',
  Mauritius: 'MU',
  Venezuela: 'VE',
  'South Africa': 'ZA',
  Jamaica: 'JM',
  Iran: 'IR',
  Vietnam: 'VN',
  Philippines: 'PH',
  'New Zealand': 'NZ',
  'South Korea': 'KR',
  Brazil: 'BR',
  Spain: 'ES',
  France: 'FR',
  Laos: 'LA',
  Colombia: 'CO',
  'Hong Kong': 'HK',
  Taiwan: 'TW',
};

function normalize(value = '') {
  return value.trim().toLowerCase();
}

function getNodeCountryCode(node) {
  const id = node.getAttribute('id');
  const name = node.getAttribute('name');
  const className = node.getAttribute('class');

  if (id && /^[A-Za-z]{2}$/.test(id)) {
    return id.toUpperCase();
  }

  if (name && NAME_TO_CODE[name]) {
    return NAME_TO_CODE[name];
  }

  if (className && NAME_TO_CODE[className]) {
    return NAME_TO_CODE[className];
  }

  return null;
}

function getLevelColor(level) {
  if (level === 1) return 'rgba(122, 150, 255, 0.72)';
  if (level === 2) return 'rgba(158, 131, 255, 0.82)';
  if (level === 3) return 'rgba(255, 115, 218, 0.88)';
  if (level === 4) return 'rgba(243, 213, 136, 0.96)';
  return 'rgba(255, 255, 255, 0.08)';
}

function getLevelHoverColor(level) {
  if (level === 1) return 'rgba(150, 176, 255, 0.92)';
  if (level === 2) return 'rgba(188, 164, 255, 0.96)';
  if (level === 3) return 'rgba(255, 145, 232, 1)';
  if (level === 4) return 'rgba(255, 230, 166, 1)';
  return 'rgba(255, 255, 255, 0.14)';
}

function getLevelGlow(level) {
  if (level === 4) return 'drop-shadow(0 0 8px rgba(243, 213, 136, 0.42))';
  if (level === 3) return 'drop-shadow(0 0 7px rgba(255, 79, 216, 0.34))';
  if (level === 2) return 'drop-shadow(0 0 6px rgba(158, 131, 255, 0.28))';
  if (level === 1) return 'drop-shadow(0 0 5px rgba(122, 150, 255, 0.24))';
  return 'none';
}

/**
 * @param {{ countries?: AmorousMapCountry[] }} props
 */
export default function AmorousSvgWorldMap({ countries = [] }) {
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  const countryMap = useMemo(() => {
    const map = new Map();

    countries.forEach((country) => {
      map.set(country.code.toUpperCase(), country);
    });

    return map;
  }, [countries]);

  useEffect(() => {
    let cancelled = false;

    async function loadSvg() {
      const response = await fetch('/maps/world.svg');
      const svgText = await response.text();

      if (cancelled || !containerRef.current) return;

      containerRef.current.innerHTML = svgText;

      const svg = containerRef.current.querySelector('svg');
      if (!svg) return;

      svg.classList.add('amorous-world-svg');

      const lowerViewBox = svg.getAttribute('viewbox');
      const properViewBox = svg.getAttribute('viewBox');

      if (!properViewBox && lowerViewBox) {
        svg.setAttribute('viewBox', lowerViewBox);
      }

      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

      const shapes = svg.querySelectorAll('path, polygon');

      shapes.forEach((node) => {
        const code = getNodeCountryCode(node);
        const match = code ? countryMap.get(code) : null;
        const level = match?.level ?? 0;

        node.style.fill = getLevelColor(level);
        node.style.stroke = 'rgba(124, 156, 255, 0.18)';
        node.style.strokeWidth = '0.45';
        node.style.transition = 'fill 0.18s ease, filter 0.18s ease, opacity 0.18s ease';
        node.style.opacity = match ? '1' : '0.55';
        node.style.filter = getLevelGlow(level);
        node.style.cursor = match ? 'pointer' : 'default';

        if (match) {
          node.addEventListener('mouseenter', (event) => {
            node.style.fill = getLevelHoverColor(level);
            node.style.opacity = '1';

            setTooltip({
              x: event.clientX,
              y: event.clientY,
              country: match,
            });
          });

          node.addEventListener('mousemove', (event) => {
            setTooltip({
              x: event.clientX,
              y: event.clientY,
              country: match,
            });
          });

          node.addEventListener('mouseleave', () => {
            node.style.fill = getLevelColor(level);
            setTooltip(null);
          });
        }
      });
    }

    loadSvg();

    return () => {
      cancelled = true;
    };
  }, [countryMap]);

  return (
    <div className="amorous-svg-map-shell">
      <div ref={containerRef} className="amorous-svg-map-canvas" />

      {tooltip && (
        <div
          className="amorous-map-tooltip"
          style={{
            left: tooltip.x + 14,
            top: tooltip.y + 14,
          }}
        >
          <div className="tooltip-code">{tooltip.country.code}</div>
          <div className="tooltip-title">
            {tooltip.country.nameZh} / {tooltip.country.nameEn}
          </div>
          <div className="tooltip-meta">
            相逢 {tooltip.country.count} 次 · {tooltip.country.label}
          </div>
          {tooltip.country.note && (
            <div className="tooltip-note">{tooltip.country.note}</div>
          )}
        </div>
      )}
    </div>
  );
}