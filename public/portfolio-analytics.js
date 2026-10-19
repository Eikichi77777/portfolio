/* Portfolio analytics: collect anonymous reading behavior for GA4.
 * No form values, personal information, or full external URLs are sent.
 */
(() => {
  'use strict';

  const CASES = {
    'case-intelligence-os.html': 'intelligence_os',
    'case-knowledge-renewal.html': 'knowledge_management'
  };
  const path = location.pathname;
  const pageType = Object.entries(CASES).find(([file]) => path.endsWith(`/${file}`))?.[1] || 'portfolio_home';
  const sent = new Set();

  const track = (eventName, parameters = {}) => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, {
      page_type: pageType,
      ...parameters
    });
  };

  const text = node => (node?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
  const slug = value => (value || 'unknown')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40) || 'unknown';

  const root = () => document.querySelector('.case-study-v2') || document.querySelector('main');
  const getSectionNodes = () => {
    if (pageType === 'portfolio_home') {
      return [...document.querySelectorAll('main > section[id]')];
    }

    const main = root()?.querySelector('main#top') || document.querySelector('main#top');
    return main ? [...main.querySelectorAll(':scope > section[id]')] : [];
  };

  const observeSections = () => {
    const sections = getSectionNodes();
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.45) return;
        const section = entry.target;
        const id = section.id || 'unknown';
        const key = `section:${id}`;
        if (sent.has(key)) return;
        sent.add(key);
        const heading = text(section.querySelector('h1, h2, h3')) || id;
        track('portfolio_section_view', {
          section_id: slug(id),
          section_name: heading
        });
      });
    }, { threshold: [0.45, 0.65] });

    sections.forEach(section => observer.observe(section));
  };

  const observeReadingDepth = () => {
    const milestones = [25, 50, 75, 90];
    const onScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (documentHeight <= 0) return;
      const depth = Math.min(100, Math.round((window.scrollY / documentHeight) * 100));
      milestones.forEach(percent => {
        const key = `depth:${percent}`;
        if (depth < percent || sent.has(key)) return;
        sent.add(key);
        track('portfolio_reading_depth', { percent });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  const bindLinkEvents = () => {
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      const targetCase = Object.entries(CASES).find(([file]) => href.includes(file));
      if (targetCase) {
        track(pageType === 'portfolio_home' ? 'portfolio_case_open' : 'portfolio_case_transition', {
          target_case: targetCase[1],
          link_location: link.closest('.v4-next-case, .kr-next-case, [class*="next-case"]') ? 'next_case' : 'navigation'
        });
        return;
      }

      let url;
      try { url = new URL(href, location.href); } catch { return; }
      if (url.origin === location.origin || !/^https?:$/.test(url.protocol)) return;
      track('portfolio_external_link', {
        destination_domain: url.hostname.toLowerCase(),
        link_label: text(link) || link.getAttribute('aria-label') || 'external_link'
      });
    });
  };

  const start = () => {
    observeSections();
    observeReadingDepth();
    bindLinkEvents();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(start), { once: true });
  } else {
    requestAnimationFrame(start);
  }
})();
