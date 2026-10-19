(() => {
  const root = document.querySelector('#case-intelligence-os.case-study-v2');
  if (!root || root.dataset.intelligenceVersion === '4') return;

  const main = root.querySelector('main#top');
  const tocNav = root.querySelector('.case-toc nav');
  if (!main || !tocNav) return;

  root.dataset.intelligenceVersion = '4';
  root.classList.add('case-intelligence-v3', 'case-intelligence-v4');

  const assetPath = file => location.pathname.includes('/public/')
    ? `assets/intelligence-os/generated/${file}`
    : `public/assets/intelligence-os/generated/${file}`;

  const processAssetPath = file => location.pathname.includes('/public/')
    ? `assets/intelligence-os/process/${file}`
    : `public/assets/intelligence-os/process/${file}`;

  const prose = paragraphs => {
    const node = document.createElement('div');
    node.className = 'v2-prose';
    node.innerHTML = paragraphs.map(text => `<p>${text}</p>`).join('');
    return node;
  };

  const chapter = (id, title, paragraphs = []) => {
    const section = document.createElement('section');
    section.className = 'v2-chapter v3-chapter v4-chapter';
    section.id = id;
    const intro = document.createElement('div');
    intro.className = 'v2-chapter-intro';
    intro.innerHTML = `<div class="v2-chapter-intro-inner"><h2 class="v2-chapter-name">${title}</h2></div>`;
    if (paragraphs.length) intro.firstElementChild.appendChild(prose(paragraphs));
    section.appendChild(intro);
    return section;
  };

  const subhead = (title, body = '') => {
    const node = document.createElement('div');
    node.className = 'v4-subhead';
    node.innerHTML = `<h3>${title}</h3>${body ? `<p>${body}</p>` : ''}`;
    return node;
  };

  const embedSection = (target, source, title = '') => {
    if (!target || !source) return null;
    const group = document.createElement('div');
    group.className = 'v4-subsection-group';
    group.id = source.id;
    const sourceTitle = title || source.querySelector('h2')?.textContent || '';
    group.appendChild(subhead(sourceTitle));
    const sourceProse = source.querySelector(':scope > .v2-chapter-intro .v2-prose');
    if (sourceProse) group.appendChild(sourceProse);
    [...source.children].filter(child => !child.classList.contains('v2-chapter-intro')).forEach(child => group.appendChild(child));
    target.appendChild(group);
    return group;
  };

  const lead = text => {
    const node = document.createElement('p');
    node.className = 'v2-artifact-lead';
    node.textContent = text;
    return node;
  };

  const caption = text => {
    const node = document.createElement('p');
    node.className = 'v2-artifact-note';
    node.textContent = text;
    return node;
  };

  const conceptIllustration = (file, alt, captionText) => {
    const node = document.createElement('figure');
    node.className = 'v3-photo-slot v3-generated-artifact v4-concept-illustration';
    node.innerHTML = `<img src="${assetPath(file)}" alt="${alt}" loading="lazy" decoding="async"><figcaption>${captionText}</figcaption>`;
    return node;
  };

  const handdrawnDiagram = (file, alt, captionText) => {
    const node = conceptIllustration(file, alt, captionText);
    node.classList.add('v4-handdrawn-diagram');
    return node;
  };

  const scopeCriteria = items => {
    const node = document.createElement('div');
    node.className = 'v4-scope-criteria';
    node.innerHTML = items.map((item, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><p>${item}</p></article>`).join('');
    return node;
  };

  const experienceFlow = items => {
    const node = document.createElement('ol');
    node.className = 'v4-experience-flow';
    node.setAttribute('aria-label', '初期スコープで成立させる体験');
    node.innerHTML = items.map((item, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><strong>${item}</strong></li>`).join('');
    return node;
  };

  const deferredScope = items => {
    const node = document.createElement('div');
    node.className = 'v4-deferred-scope';
    node.innerHTML = items.map((item, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><div><h4>${item.title}</h4><p>${item.reason}</p></div></article>`).join('');
    return node;
  };

  const photoCarousel = ({ title, body, slides }) => {
    const gallery = document.createElement('div');
    gallery.className = 'v3-process-gallery v4-photo-gallery';

    const carousel = document.createElement('article');
    carousel.className = 'v3-artifact-carousel v4-real-photo-carousel';
    carousel.tabIndex = 0;
    carousel.setAttribute('aria-label', `${title}の画像ギャラリー`);

    const header = document.createElement('header');
    header.innerHTML = `<span>検討資料</span><h3>${title}</h3><p>${body}</p>`;

    const media = document.createElement('div');
    media.className = 'v3-artifact-media';
    const previous = document.createElement('button');
    previous.className = 'v3-process-arrow is-prev';
    previous.type = 'button';
    previous.setAttribute('aria-label', '前の画像を表示');
    previous.textContent = '‹';
    const next = document.createElement('button');
    next.className = 'v3-process-arrow is-next';
    next.type = 'button';
    next.setAttribute('aria-label', '次の画像を表示');
    next.textContent = '›';

    const stage = document.createElement('div');
    stage.className = 'v3-process-stage';
    const figures = slides.map(slide => {
      const figure = document.createElement('figure');
      figure.className = 'v3-photo-slot v4-real-photo';
      figure.dataset.title = slide.title;
      const image = document.createElement('img');
      image.src = processAssetPath(slide.file);
      image.alt = slide.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = slide.caption;
      figure.append(image, figcaption);
      stage.appendChild(figure);
      return figure;
    });

    media.append(previous, stage, next);
    const meta = document.createElement('div');
    meta.className = 'v3-process-meta';
    meta.setAttribute('aria-live', 'polite');
    const count = document.createElement('span');
    const currentTitle = document.createElement('strong');
    meta.append(count, currentTitle);
    carousel.append(header, media, meta);
    gallery.appendChild(carousel);

    let index = 0;
    const showSlide = target => {
      index = (target + figures.length) % figures.length;
      figures.forEach((figure, figureIndex) => { figure.hidden = figureIndex !== index; });
      count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(figures.length).padStart(2, '0')}`;
      currentTitle.textContent = slides[index].title;
    };

    previous.addEventListener('click', () => showSlide(index - 1));
    next.addEventListener('click', () => showSlide(index + 1));
    carousel.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      showSlide(index + (event.key === 'ArrowLeft' ? -1 : 1));
    });

    let touchStartX = null;
    stage.addEventListener('touchstart', event => {
      touchStartX = event.changedTouches[0]?.clientX ?? null;
    }, { passive: true });
    stage.addEventListener('touchend', event => {
      if (touchStartX === null) return;
      const distance = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
      touchStartX = null;
      if (Math.abs(distance) < 42) return;
      showSlide(index + (distance < 0 ? 1 : -1));
    }, { passive: true });

    showSlide(0);
    return gallery;
  };

  const transition = text => {
    const node = document.createElement('p');
    node.className = 'v3-transition';
    node.textContent = text;
    return node;
  };

  const cards = (items, className = '') => {
    const node = document.createElement('div');
    node.className = `v3-card-grid v4-card-grid ${className}`.trim();
    node.innerHTML = items.map((item, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><h3>${item.title}</h3><p>${item.body}</p>${item.note ? `<small>${item.note}</small>` : ''}</article>`).join('');
    return node;
  };

  const insightCards = items => {
    const node = document.createElement('div');
    node.className = 'v4-insight-grid';
    node.innerHTML = items.map((item, index) => `
      <article>
        <span>${String(index + 1).padStart(2, '0')}</span>
        <h3>${item.title}</h3>
        <dl>
          <div><dt>課題の具体</dt><dd>${item.problem}</dd></div>
          <div><dt>調査で得た根拠</dt><dd>${item.evidence}</dd></div>
          <div><dt>インサイト</dt><dd>${item.insight}</dd></div>
          <div><dt>設計への示唆</dt><dd>${item.implication}</dd></div>
        </dl>
      </article>
    `).join('');
    return node;
  };

  const table = (headers, rows, className = '') => {
    const wrap = document.createElement('div');
    wrap.className = `v4-table-wrap ${className}`.trim();
    wrap.innerHTML = `<table><thead><tr>${headers.map(text => `<th>${text}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((text, index) => `<${index === 0 ? 'th' : 'td'}>${text}</${index === 0 ? 'th' : 'td'}>`).join('')}</tr>`).join('')}</tbody></table>`;
    return wrap;
  };

  const list = items => {
    const node = document.createElement('ul');
    node.className = 'v4-list';
    node.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    return node;
  };

  const flow = (items, className = '') => {
    const node = document.createElement('div');
    node.className = `v3-sequence v4-sequence ${className}`.trim();
    node.innerHTML = items.map((item, index) => `<div><span>${String(index + 1).padStart(2, '0')}</span><p>${item}</p></div>`).join('');
    return node;
  };

  const callout = (label, text) => {
    const node = document.createElement('div');
    node.className = 'v3-hmw v4-callout';
    node.innerHTML = `<span>${label}</span><p>${text}</p>`;
    return node;
  };

  const cleanArtifact = node => {
    if (!node) return null;
    node.querySelectorAll(':scope > .v2-artifact-lead, :scope > .v2-artifact-note').forEach(item => item.remove());
    return node;
  };

  const detach = selector => {
    const node = root.querySelector(selector);
    if (node) node.remove();
    return cleanArtifact(node);
  };

  const artifacts = {
    context: detach('#context'),
    workflow: detach('#workflow'),
    principles: detach('#insights'),
    scope: detach('#scope'),
    architecture: detach('#architecture'),
    decisions: detach('#decisions')
  };

  const hero = main.querySelector(':scope > section.hero');
  [...main.children].forEach(child => {
    if (child !== hero) child.remove();
  });

  const heroTitle = hero?.querySelector('h1');
  const heroSummary = hero?.querySelector('.hero-summary');
  const heroSupport = hero?.querySelector('.case-hero-support');
  if (heroTitle) heroTitle.textContent = 'KiZUKAI Intelligence OS';
  if (heroSummary) heroSummary.textContent = 'AIで、小売のデータを「見える」から「判断できる」へ';
  if (heroSupport) heroSupport.remove();

  const overview = chapter('overview', '概要', [
    'KiZUKAI Intelligence OSは、売上・店舗・商品データと企業固有のナレッジをもとに、AIが考察と示唆を含むレポートを定期生成し、店舗・SV・本部の施策判断を支援する小売企業向けBtoB SaaSです。',
    '2025年7月から10月まで、CEO・PM・営業が持つ顧客知見と事業上の方向性、データサイエンス・エンジニアが確認するAI品質と実装上の制約をチームで議論しました。私はProduct Designerとして、議論を業務フローと要求へ整理し、合意した方針を情報構造、UI、状態・権限仕様へ具体化しました。実装支援、QA、利用状況確認まで関与しています。'
  ]);
  const challenge = chapter('challenge', '課題', [
    'CEO・PM・営業が把握していた顧客要望と既存業務を持ち寄り、データサイエンス・エンジニアの制約も踏まえて議論した結果、チームでは次の課題を初期リリースで扱う対象として整理しました。',
    'BIの導入によってデータの可視化は進んでいました。しかし、可視化された数値をどう解釈し、何を変化要因として捉え、次にどのようなアクションを取るかは、利用者に委ねられていました。そのため、同じデータを見ても担当者によって考察や施策判断が異なり、報告業務が属人化していました。',
    '店舗責任者には、データの収集・集計から報告書作成までの作業負荷が集中していました。また、数値を確認できても、変化要因の考察や次のアクションは店長個人の経験や分析スキルに依存していました。',
    '一方、SV・本部には、店舗ごとに形式や情報の粒度、考察内容の異なる報告が届いていました。そのため、全店舗を比較するには再集計や再編集が必要で、共通の視点から店舗の状態を把握し、施策を判断することが難しい状態でした。'
  ]);
  challenge.appendChild(subhead('役割ごとに発生していた課題', '店舗では、データ集計の負荷と、可視化後の考察・アクション判断の属人化が発生していました。その結果、SV・本部には店舗ごとに異なる報告が届き、全店舗を同じ視点で比較するための再集計・再編集が必要になっていました。'));
  challenge.appendChild(handdrawnDiagram(
    'diagram-fragmented-reporting-v1.png',
    '共通データをBIで可視化した後、店舗ごとに解釈と報告形式が分かれ、SV・本部で再集計と再編集が発生していた報告業務の構造',
    '図01 — 分断された報告業務｜可視化後の解釈が店舗ごとに分かれ、SV・本部で再集計が発生していた'
  ));
  challenge.appendChild(callout('THE OPPORTUNITY', 'データの取得・集計を自動化し、可視化にとどまらず、変化要因の考察と次のアクション案までを共通フォーマットで提示する。店舗責任者が内容を確認・編集し、店舗・SV・本部が同じ視点から施策を判断できる状態をつくる。'));
  const glance = chapter('project-at-a-glance', 'プロジェクトの全体像', [
    'このプロジェクトでは、AIレポートの閲覧画面だけでなく、生成条件の設定、データとナレッジの参照、人による確認・編集、組織への配信、権限管理までを一つの業務体験として設計しました。ここでは、プロジェクトの設計範囲、設計方針、成果を四つの観点から要約します。'
  ]);
  glance.appendChild(cards([
    {title:'0→1のプロダクト具体化', body:'チームで合意したAIレポート構想を、定期生成、レポート設定、データ・ナレッジ参照、組織・権限管理を含むBtoB SaaSへ具体化しました。'},
    {title:'業務全体を設計対象に', body:'関係者との議論を業務フローへ整理し、初期設定からレポート生成、配信、確認・編集までを一連の体験として設計しました。'},
    {title:'AIと人の協働', body:'AI品質の制約を踏まえ、AIの出力を最終回答とせず、利用者が考察を確認・編集して施策を判断できるUIと仕様へ落とし込みました。'},
    {title:'実運用への到達', body:'2025年10月に初期プロダクトをリリースし、月間約4,000件規模のAIレポート生成を自動化しました。'}
  ], 'v4-four'));
  const market = chapter('market-context', '市場・事業背景', [
    '企業によってはすでにBIツールが導入されていました。しかし、数値を可視化するだけでは、その変化の理由や次の施策までは提示されません。利用者は必要な数値を探し、自分で意味を読み解き、報告書を作成する必要がありました。',
    'Intelligence OSでは、新しい分析画面を増やすのではなく、既存の定期報告業務にAIを組み込み、利用者がAIの考察と示唆を確認するところから業務を始められる状態を目指しました。'
  ]);
  market.appendChild(subhead('データ可視化から意思決定支援へ', '従来のBIでは、数値の可視化後に分析・報告書作成・共有を人が行っていました。Intelligence OSでは、データと企業ナレッジをAIが考察・示唆へ変換し、人が確認・編集してから組織へ配信することで、業務の起点を「作成」から「判断」へ移しました。'));
  market.appendChild(conceptIllustration(
    'concept-bi-decision-v1.png',
    '従来のBI中心の報告業務と、Intelligence OSによる意思決定支援の違いを比較した手描き概念図',
    '図 — データ可視化から意思決定支援へ｜作成中心の業務から、確認・判断中心の業務へ'
  ));
  const discovery = chapter('discovery', 'リサーチと課題整理', [
    '0→1の初期開発では、営業商談や展示会で得られた反応、既存顧客の要望、現場を支援していた営業・コンサルタントの知見を、関係者と確認しながら顧客・業務のエビデンスとして整理しました。さらに、既存プロダクトの画面・データ構造・現行レポートと、データサイエンス・エンジニアが確認したデータや生成処理の制約を照合しました。',
    'それぞれの情報は確度が異なるため、実際の業務や顧客要望から確認できた事実、複数の情報源で繰り返し現れた共通課題、検証が必要な仮説を分けて扱いました。'
  ]);
  discovery.appendChild(handdrawnDiagram(
    'diagram-evidence-synthesis-v4.png',
    '顧客・業務、既存プロダクト、技術制約を照合し、レポート形式と確認観点のばらつき、解釈とアクションの属人化、数値の変化要因を特定できないという共通課題を設計上の問いへ変換した図',
    '図02 — 根拠の統合｜複数の情報源から共通課題を抽出し、設計上の問いへ変換する'
  ));
  discovery.appendChild(lead('これらの共通課題をもとに、CEO・PM・開発メンバーと「何を共通化するか」「判断をどのように支援するか」「変化の背景をどのように補うか」を議論しました。私は、その合意を後続の情報設計とUI・仕様へ接続できる判断軸として整理しました。'));
  const insights = chapter('critical-insights', 'リサーチから得られたインサイト', [
    '顧客・業務、既存プロダクト、技術制約に関する情報を関係者と照合し、チームで検討するための共通課題として整理しました。店舗横断で比較・解釈する負荷、担当者の経験に依存する判断、データと分離した現場情報という問題の構造を示しています。'
  ]);
  insights.appendChild(handdrawnDiagram(
    'diagram-critical-insights-v1.png',
    '店舗ごとのレポート形式と確認観点のばらつき、解釈とアクションの属人化、数値の変化要因を特定できないというリサーチインサイトを示した図',
    '図 — リサーチから得られたインサイト｜比較・解釈・要因把握を妨げていた問題の構造'
  ));
  const principles = chapter('design-principles', '設計原則', [
    'リサーチから得られたインサイトに、AIの技術的な制約と定期報告業務の運用要件を加え、設計判断の軸となる五つの原則を定義しました。ソリューションを機能・仕様・UIへ具体化するときは、利用者が作成ではなく判断から始められること、AIと人の責任を分けること、組織全体で継続運用できることを基準にしました。'
  ]);
  principles.appendChild(subhead(
    '五つの判断基準',
    '「作成から判断へ」では自由分析より定期レポートを優先し、「数値ではなく意味まで伝える」では変化要因・アクション候補・参照ナレッジを主要コンテンツにしました。「AIが提案し、人が決める」ではAIの出力をドラフトとして扱い、「個人ではなく組織を設計する」ではユーザー・グループ単位のアプリ内配信と閲覧・編集権限を設計しました。「一度作れるより、繰り返し運用できる」では生成スケジュール、処理状態、エラーやデータ不足までを設計対象にしました。'
  ));
  principles.appendChild(handdrawnDiagram(
    'diagram-design-principles-v2.png',
    '作成から判断へ、数値ではなく意味まで伝える、AIが提案し人が決める、個人ではなく組織を設計する、繰り返し運用できる状態をつくるという五原則を示す図',
    '図05 — 設計原則｜五つの原則を、一つの判断軸としてつなぐ'
  ));
  const solution = chapter('solution', '解決策', [
    '初期構想と顧客要件をもとに、チームでは、売上・店舗・商品データと企業固有のナレッジからAIが考察とアクション候補を含む定期レポートを生成する「KiZUKAI Intelligence OS」を解決方針として具体化しました。',
    'CEO・PM・営業・データサイエンス・エンジニアとの議論を通じて、AIの出力を担当者が確認・編集し、店舗・SV・本部へ共通フォーマットで配信する初期体験に合意しました。私はこの方針を、業務フロー、情報構造、画面、状態、権限仕様へ展開しました。'
  ]);
  solution.appendChild(subhead('導入前と導入後の業務フロー', '既存の報告業務では、データの集計・考察・資料作成が店舗、SV、本部で繰り返されていました。KiZUKAI Intelligence OSでは、取得と集計を自動化し、AIが考察とアクション候補を生成します。担当者は内容の確認・編集と施策判断に集中できる流れへ変更しました。'));
  solution.appendChild(handdrawnDiagram(
    'diagram-before-after-workflow-v1.png',
    '導入前と導入後の報告業務を、データ確認から施策判断まで六つの工程で比較した図',
    '図03 — 導入前／導入後の業務フロー｜作成中心から、確認・判断中心へ'
  ));
  solution.appendChild(subhead('プロダクトを構成する三つの領域', '導入後の業務を成立させるため、プロダクトを「データとナレッジ」「AI考察とレポート」「組織と配信」の三領域に分けました。定量データに企業固有の背景を加え、AIの提案を人が確認し、組織単位で継続運用できる構造です。'));
  solution.appendChild(handdrawnDiagram(
    'diagram-product-areas-v1.png',
    'データとナレッジ、AI考察とレポート、組織と配信の三領域と、それぞれが解決する課題を示した図',
    '図04 — プロダクトを構成する三つの領域｜データ・AI・組織を一つの業務システムとして接続する'
  ));
  /* 解決策の検討資料カルーセルは一時的に非表示。必要になった場合はコメントを解除する。
  solution.appendChild(photoCarousel({
    title:'プロダクト構想をシステム構造へ具体化する',
    body:'このソリューション構想を実装可能な形へ変換するため、生データの取得からデータセットの生成、AIによる考察、レポート出力までの関係を整理しました。入力経路やデータの保持方法を比較しながら、定期的なAIレポート生成が成立するシステム構造へ具体化しました。',
    slides:[
      {file:'solution-data-report-map.jpg', title:'データ・AI・レポートの全体像', alt:'生データ、S3、データセット、AI、レポートを接続した構造図', caption:'生データ、S3、データセット、AI考察、レポートを一つの構造として整理。'},
      {file:'discovery-workshop-cropped.png', title:'データ・AI・レポートを接続', alt:'ホワイトボードにPOS、データ、AI、レポートの関係を描いた議論記録', caption:'POS・既存データ・AI・レポートの関係をホワイトボードで整理。'},
      {file:'discovery-system-map.jpg', title:'初期システム構想', alt:'顧客データ、既存サービス、AIレポート、一覧と出力の関係を描いたスケッチ', caption:'顧客データ、既存サービス、AIレポート、一覧・出力の関係を分解した初期スケッチ。'}
    ]
  }));
  */
  const strategy = chapter('release-strategy', '初期リリースのスコープ', [
    '初期リリースでは、機能数を増やすのではなく、レポートの生成から確認・編集、組織への共有、施策判断までが一巡することをチームで優先しました。私は候補機能と四つの判断観点を可視化し、関係者が初期スコープを比較・合意できるように整理しました。'
  ]);
  strategy.appendChild(subhead('MVPスコープに含める判断基準'));
  strategy.appendChild(scopeCriteria([
    '初期顧客の業務に必要',
    '他社へ共通化できる',
    '初期段階で利用できる',
    '期限内に体験が成立する'
  ]));
  strategy.appendChild(subhead('初期リリースに含めた内容', '定期レポートを軸に、生成条件の設定からAI考察の確認・編集、組織への配信と権限管理までを一連の体験として実装しました。'));
  strategy.appendChild(handdrawnDiagram(
    'diagram-initial-scope-included-v2.png',
    '生成条件とナレッジから定型レポートを生成し、AI考察を確認・編集してグループへ配信する初期スコープの図',
    '図08 — 初期リリースに含めた内容｜生成から確認・編集、組織への共有までを一巡させる'
  ));
  strategy.appendChild(subhead('初期リリースでは採用しなかった内容', '自由度や機能数を広げる案は、学習負荷、AI品質、共通化、開発期限への影響が大きいため、初期体験の検証後に判断する対象としました。'));
  strategy.appendChild(deferredScope([
    {title:'自由探索型の分析', reason:'入力スキルへの依存が大きく、問いによってAIの回答品質が変わるため、初期段階では安定した体験を保証しにくい。'},
    {title:'多機能なレポート作成', reason:'機能が複雑になり、顧客ごとの個別要件が増えることで、他社へ共通化しにくい。'},
    {title:'高度なカスタマイズ', reason:'設定項目と開発範囲が広がり、期限内に一連の体験を成立させることが難しい。'}
  ]));
  strategy.appendChild(subhead('初期スコープで成立させる体験', '利用者がレポートを受け取るだけで終わらず、AIの考察を人が確認・編集し、組織へ共有したうえで施策を判断できるところまでを、初期リリースで検証する一連の体験としました。'));
  strategy.appendChild(experienceFlow([
    '生成条件を設定',
    'レポートが届く',
    'AI考察を確認',
    '必要に応じて編集',
    '組織で共有',
    '施策を判断'
  ]));
  const decisions = chapter('key-decisions', '設計判断と完成UI', [
    'チームで合意した解決方針をUIへ落とし込む過程で、設定と生成結果の関係、編集条件、情報への到達経路までを整理しました。ここでは、実際の運用を成立させる三つの設計判断を、課題・判断・UIへの反映の順で説明します。'
  ]);
  if (artifacts.decisions) {
    artifacts.decisions.remove();
    decisions.appendChild(artifacts.decisions);
  }

  embedSection(solution, strategy, '初期リリースのスコープ');

  const outcomesReflection = chapter('outcomes-reflection', '成果と振り返り', [
    'リリースによって実現したこと、運用後に残った課題、次のプロジェクトへ持ち越した学びをまとめます。'
  ]);
  outcomesReflection.appendChild(subhead('成果と到達点', '2025年10月、AIレポートの定期生成、生成条件の設定、AI考察の確認・編集、ナレッジ参照、ユーザー・グループ・権限管理を含む初期プロダクトをリリースしました。リリース後は、月間約4,000件規模のレポート生成が稼働しています。構想段階だったAIレポートを、企業内で継続運用できるBtoB SaaSとして具体化しました。'));
  const outcomeStat = document.createElement('div');
  outcomeStat.className = 'v3-outcome-stat';
  outcomeStat.innerHTML = '<span>運用実績</span><strong>月間約4,000件のレポート作成を自動化</strong>';
  outcomesReflection.appendChild(outcomeStat);
  outcomesReflection.appendChild(subhead('残った課題', 'レポートの生成と提供までは自動化できましたが、利用者がレポートへ再訪し、施策を判断・実行するところまでは十分に計測できていません。また、AIの考察に利用する企業ナレッジは、何を登録すべきかが伝わりにくく、登録・更新・再利用が一部の用途に偏っていました。'));
  outcomesReflection.appendChild(list([
    '通知や未読管理がなく、レポートへの再訪を利用者に依存している',
    'レポート確認後の施策判断や行動を計測できていない',
    '何をナレッジとして登録すべきかが伝わりにくい',
    '人による確認・編集結果をAI品質の改善へ戻せていない'
  ]));
  outcomesReflection.appendChild(subhead('振り返り', '運用後に見えた課題から、次のプロジェクトへ持ち越す三つの学びを整理しました。'));
  outcomesReflection.appendChild(cards([
    {title:'一次情報を早く取得する', body:'関係者が把握している顧客課題だけでなく、実際の利用者へのインタビューや業務観察を早い段階で行い、設計仮説と照合する必要がありました。'},
    {title:'意思決定までを成果として計測する', body:'生成件数や閲覧数だけでなく、レポートが施策判断や行動につながったかまでを成功指標として設計する必要がありました。'},
    {title:'AI品質を支える運用を設計する', body:'参照データ、企業ナレッジ、人による確認・編集、その結果を次の生成へ戻す運用全体が必要です。'}
  ], 'v4-three'));
  outcomesReflection.appendChild(subhead('次のプロジェクトへ', '企業ナレッジの登録・品質管理・発見・更新が十分に成立していなかったことから、ナレッジ機能そのものを見直す必要が生まれました。この課題が、次のKnowledge Management Renewalプロジェクトにつながりました。'));
  const next = document.createElement('a');
  next.className = 'v4-next-case';
  next.href = 'case-knowledge-renewal.html';
  next.innerHTML = '<span>次のケーススタディ</span><strong>Knowledge Management Renewal</strong><p>企業ナレッジを、蓄積・発見・更新・再利用できる情報基盤へ再設計しました。</p><i>→</i>';
  outcomesReflection.appendChild(next);

  const sections = [overview, glance, challenge, discovery, insights, solution, principles, decisions, outcomesReflection];
  sections.forEach(section => main.appendChild(section));

  const tocItems = [
    ['overview','概要'],['project-at-a-glance','プロジェクトの全体像'],['challenge','課題'],['discovery','リサーチと課題整理'],['critical-insights','リサーチから得られたインサイト'],['solution','解決策'],['design-principles','設計原則'],['key-decisions','設計判断と完成UI'],['outcomes-reflection','成果と振り返り']
  ];
  tocNav.innerHTML = tocItems.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('');

  const toc = root.querySelector('.case-toc');
  const links = [...tocNav.querySelectorAll('a')];
  let lastCurrent = '';
  const syncToc = () => {
    let current = 'overview';
    tocItems.forEach(([id]) => {
      const section = root.querySelector(`#${id}`);
      if (section && section.getBoundingClientRect().top <= 190) current = id;
    });
    links.forEach(link => {
      const active = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (current !== lastCurrent && toc) {
      links.find(link => link.getAttribute('href') === `#${current}`)?.scrollIntoView({block:'nearest'});
      lastCurrent = current;
    }
  };
  window.addEventListener('scroll', syncToc, {passive:true});
  syncToc();
})();
