(() => {
  const webModal = document.getElementById('web-renewal-modal');
  if (webModal) {
    const images = [
      'assets/web-renewal/kizukai-product-hero-screen.jpg',
      'assets/web-renewal/kizukai-product-problem-screen.jpg',
      'assets/web-renewal/kizukai-product-intelligence-os-screen.jpg',
      'assets/web-renewal/kizukai-product-features-screen.jpg',
      'assets/web-renewal/kizukai-professional-hero-screen.jpg',
      'assets/web-renewal/kizukai-professional-model-screen.jpg'
    ];
    const captions = [
      'プロダクト：Store Management AI',
      'プロダクト：判断が属人化する課題',
      'プロダクト：KiZUKAI Intelligence OS',
      'プロダクト：3つの機能',
      'プロフェッショナルサービス：ヒーロー',
      'プロフェッショナルサービス：個社最適化した予測モデル'
    ];
    webModal.dataset.galleryImages = images.join('|');
    webModal.dataset.galleryCaptions = captions.join('|');

    // Replace the gallery node to remove listeners that captured the former
    // placeholder data, then bind the finished visual set once.
    const currentGallery = webModal.querySelector('[data-gallery]');
    const gallery = currentGallery?.cloneNode(true);
    if (currentGallery && gallery) currentGallery.replaceWith(gallery);

    const main = gallery?.querySelector('.modal-gallery-main img');
    const caption = gallery?.querySelector('[data-gallery-caption]');
    const thumbnails = gallery?.querySelector('.modal-thumbnails');
    if (thumbnails) {
      thumbnails.replaceChildren(...images.map((src, index) => {
        const button = document.createElement('button');
        const image = document.createElement('img');
        button.type = 'button';
        button.className = 'modal-thumb';
        button.dataset.galleryIndex = String(index);
        button.setAttribute('aria-current', String(index === 0));
        button.setAttribute('aria-label', captions[index] + 'を表示');
        image.src = src;
        image.alt = captions[index];
        button.append(image);
        return button;
      }));
    }
    const thumbs = [...(gallery?.querySelectorAll('[data-gallery-index]') || [])];
    let activeIndex = 0;

    const render = nextIndex => {
      activeIndex = (nextIndex + images.length) % images.length;
      if (main) {
        main.src = images[activeIndex];
        main.alt = captions[activeIndex];
      }
      if (main?.parentElement) main.parentElement.dataset.activeIndex = String(activeIndex);
      if (caption) caption.textContent = captions[activeIndex];
      thumbs.forEach((button, index) => {
        button.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
      });
    };

    thumbs.forEach((button, index) => {
      const image = button.querySelector('img');
      button.dataset.galleryIndex = String(index);
      if (!image || !images[index]) return;
      image.src = images[index];
      image.alt = captions[index];
      button.setAttribute('aria-label', captions[index] + 'を表示');
      button.addEventListener('click', event => {
        event.preventDefault();
        render(index);
      });
    });
    gallery?.querySelector('[data-gallery-prev]')?.addEventListener('click', event => {
      event.preventDefault();
      render(activeIndex - 1);
    });
    gallery?.querySelector('[data-gallery-next]')?.addEventListener('click', event => {
      event.preventDefault();
      render(activeIndex + 1);
    });
    render(0);
  }

  const exhibitionModal = document.getElementById('exhibition-modal');
  if (exhibitionModal) {
    const sourceImages = (exhibitionModal.dataset.galleryImages || '').split('|').filter(Boolean);
    const sourceCaptions = (exhibitionModal.dataset.galleryCaptions || '').split('|');
    const hiddenIndexes = new Set([3, 4, 5]);
    const visibleItems = sourceImages
      .map((src, index) => ({ src, caption: sourceCaptions[index] || '' }))
      .filter((_, index) => sourceImages.length < 10 || !hiddenIndexes.has(index));
    const images = visibleItems.map(item => item.src);
    const captions = visibleItems.map(item => item.caption);

    if (images.length) {
      exhibitionModal.dataset.galleryImages = images.join('|');
      exhibitionModal.dataset.galleryCaptions = captions.join('|');

      // Replace the gallery node so the original listeners no longer reference
      // the removed exhibition visuals.
      const currentGallery = exhibitionModal.querySelector('[data-gallery]');
      const gallery = currentGallery?.cloneNode(true);
      if (currentGallery && gallery) currentGallery.replaceWith(gallery);

      const main = gallery?.querySelector('.modal-gallery-main img');
      const caption = gallery?.querySelector('[data-gallery-caption]');
      const originalThumbs = [...(gallery?.querySelectorAll('[data-gallery-index]') || [])];
      originalThumbs.slice(images.length).forEach(button => button.remove());
      const thumbs = [...(gallery?.querySelectorAll('[data-gallery-index]') || [])];
      let activeIndex = 0;

      const render = nextIndex => {
        activeIndex = (nextIndex + images.length) % images.length;
        if (main) {
          main.src = images[activeIndex];
          main.alt = captions[activeIndex];
        }
        if (main?.parentElement) main.parentElement.dataset.activeIndex = String(activeIndex);
        if (caption) caption.textContent = captions[activeIndex];
        thumbs.forEach((button, index) => {
          button.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
        });
      };

      thumbs.forEach((button, index) => {
        const image = button.querySelector('img');
        button.dataset.galleryIndex = String(index);
        if (!image || !images[index]) return;
        image.src = images[index];
        image.alt = captions[index];
        button.setAttribute('aria-label', captions[index] + 'を表示');
        button.addEventListener('click', event => {
          event.preventDefault();
          render(index);
        });
      });
      gallery?.querySelector('[data-gallery-prev]')?.addEventListener('click', event => {
        event.preventDefault();
        render(activeIndex - 1);
      });
      gallery?.querySelector('[data-gallery-next]')?.addEventListener('click', event => {
        event.preventDefault();
        render(activeIndex + 1);
      });
      render(0);
    }
  }

})();
