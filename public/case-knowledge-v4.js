(() => {
  const root = document.querySelector('#case-knowledge-renewal');
  if (!root || root.dataset.knowledgeVersion === '4') return;

  const main = root.querySelector('main#top');
  const tocNav = root.querySelector('.case-toc nav');
  if (!main || !tocNav) return;

  root.dataset.knowledgeVersion = '4';
  root.classList.add('case-knowledge-v4');

  const assetPath = file => {
    const optimizedFile = file.replace(/\.png$/, '.jpg');
    return location.pathname.includes('/public/')
      ? `assets/knowledge-renewal/generated/${optimizedFile}`
      : `public/assets/knowledge-renewal/generated/${optimizedFile}`;
  };

  const prose = paragraphs => {
    const node = document.createElement('div');
    node.className = 'kr-prose';
    node.innerHTML = paragraphs.map(text => `<p>${text}</p>`).join('');
    return node;
  };

  const chapter = (id, title, paragraphs = []) => {
    const section = document.createElement('section');
    section.className = 'kr-chapter';
    section.id = id;
    section.innerHTML = `<div class="kr-intro"><h2>${title}</h2></div>`;
    if (paragraphs.length) section.firstElementChild.appendChild(prose(paragraphs));
    return section;
  };

  const subhead = (title, body = '') => {
    const node = document.createElement('div');
    node.className = 'kr-subhead';
    node.innerHTML = `<h3>${title}</h3>${body ? `<p>${body}</p>` : ''}`;
    return node;
  };

  const embedSection = (target, source, title = '') => {
    if (!target || !source) return null;
    const group = document.createElement('div');
    group.className = 'kr-subsection-group';
    group.id = source.id;
    const sourceTitle = title || source.querySelector('h2')?.textContent || '';
    group.appendChild(subhead(sourceTitle));
    const sourceProse = source.querySelector(':scope > .kr-intro .kr-prose');
    if (sourceProse) group.appendChild(sourceProse);
    [...source.children].filter(child => !child.classList.contains('kr-intro')).forEach(child => group.appendChild(child));
    target.appendChild(group);
    return group;
  };

  const cards = (items, className = '') => {
    const node = document.createElement('div');
    node.className = `kr-cards ${className}`.trim();
    node.innerHTML = items.map((item, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><h3>${item.title}</h3><p>${item.body}</p>${item.note ? `<small>${item.note}</small>` : ''}</article>`).join('');
    return node;
  };

  const insightCards = items => {
    const node = document.createElement('div');
    node.className = 'kr-insight-grid';
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
    const node = document.createElement('div');
    node.className = `kr-table ${className}`.trim();
    node.innerHTML = `<table><thead><tr>${headers.map(text => `<th>${text}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((text, index) => `<${index === 0 ? 'th' : 'td'}>${text}</${index === 0 ? 'th' : 'td'}>`).join('')}</tr>`).join('')}</tbody></table>`;
    return node;
  };

  const flow = (items, className = '') => {
    const node = document.createElement('div');
    node.className = `kr-flow ${className}`.trim();
    node.innerHTML = items.map((item, index) => `<div><span>${String(index + 1).padStart(2, '0')}</span><p>${item}</p></div>`).join('');
    return node;
  };

  const callout = (label, text) => {
    const node = document.createElement('div');
    node.className = 'kr-callout';
    node.innerHTML = `<span>${label}</span><p>${text}</p>`;
    return node;
  };

  const transition = text => {
    const node = document.createElement('p');
    node.className = 'kr-transition';
    node.textContent = text;
    return node;
  };

  const note = text => {
    const node = document.createElement('p');
    node.className = 'kr-note';
    node.textContent = text;
    return node;
  };

  const diagram = (file, alt, captionText) => {
    const node = document.createElement('figure');
    node.className = 'kr-diagram';
    const src = file.startsWith('local:')
      ? `${location.pathname.includes('/public/') ? '' : 'public/'}generated-local/${file.slice(6).replace(/\.png$/, '.jpg')}`
      : assetPath(file);
    node.innerHTML = `<img src="${src}" alt="${alt}" loading="lazy" decoding="async"><figcaption>${captionText}</figcaption>`;
    return node;
  };

  const oldDecisions = root.querySelector('#decisions');
  const decisionStack = oldDecisions?.querySelector('.decision-stack');
  if (decisionStack) decisionStack.remove();

  const hero = main.querySelector(':scope > section.hero');
  const toc = tocNav.closest('.case-toc');
  [...main.children].forEach(child => {
    if (child !== hero && child !== toc) child.remove();
  });

  const heroSummary = hero?.querySelector('.hero-summary');
  const heroSupport = hero?.querySelector('.case-hero-support');
  if (heroSummary) heroSummary.textContent = 'AIレポート向けの施策データから、企業全体で蓄積・発見・再利用するナレッジ基盤へ';
  if (heroSupport) heroSupport.remove();

  const overview = chapter('overview', '概要', [
    '従来のナレッジは、売上・商品・店舗データと並び、施策情報をAIレポートへ渡す一つのデータセットとしての役割が強い機能でした。しかし、リリース後の利用状況から、利用者に「何を登録すればよいか」が十分に伝わらず、登録機能自体が十分に利用されていないことが分かりました。',
    'そこで、ナレッジをレポート向けの施策データから切り離し、現場と本部が持つ資料・業務知識・施策結果を、人とAIが共通して利用できる情報基盤へ再定義しました。課題整理、要件整理、業務フロー、情報設計、UI、プロトタイプ、権限・状態仕様、開発連携までを担当しました。'
  ]);
  const background = chapter('background', '課題', [
    '旧ナレッジ機能は、売上・商品・店舗データと並び、キャンペーン、売場変更、販売方針などの施策情報をAIレポートへ渡す、一つのデータセットとして設計されていました。登録した施策をレポート設定へ紐づけ、数値変化の背景をAIが考察する際に参照する仕組みでした。',
    '一方、この位置づけでは登録対象が施策情報に偏り、企業内に存在する資料、業務ルール、商品知識、成功事例などを広く蓄積する用途には広がりませんでした。さらに、入口となる登録機能自体が十分に利用されず、編集・検索・再閲覧・レポート参照にもつながっていませんでした。'
  ]);
  background.appendChild(diagram(
    'diagram-broken-loop-v2.png',
    '登録、品質維持、発見、再利用、更新の間でナレッジ循環が途切れていた状態を示す手描き図',
    'Figure 01 — Broken Knowledge Lifecycle｜登録できても、品質維持・発見・再利用・更新へつながっていなかった'
  ));
  background.appendChild(callout('CORE PROBLEM', '施策データを登録する機能は存在していても、企業の知識を継続的に蓄積・発見・補完・再利用する基盤にはなっていませんでした。'));
  const direction = chapter('product-direction', 'プロジェクトの全体像', [
    'AIレポート向けの施策データセットとしての役割が強かった既存のナレッジ機能を、企業内の資料・業務知識・施策結果を、人とAIが共通して利用できる情報基盤へリニューアルしました。',
    '既存資料からのAIドラフト生成、人による確認・公開、検索・発見、公開後の品質管理、組織単位の公開範囲、AIによる参照までを一連の体験として設計しました。課題整理から情報設計、UI・仕様、開発連携までを担当し、2026年6月にリリースしました。'
  ]);
  direction.appendChild(diagram(
    'diagram-before-after-v2.png',
    'レポート補助として一方向に利用される旧ナレッジと、人・レポート・Agentが共通利用する循環基盤を比較した手描き図',
    'Figure 02 — Product Direction｜レポート補助から、人とAIが共通利用するナレッジ基盤へ'
  ));
  direction.appendChild(callout('PRODUCT DIRECTION', '現場と本部が持つ資料・業務知識・施策結果を、少ない入力負荷で蓄積し、組織内で発見・改善・再利用できる情報基盤をつくる。'));
  const problem = chapter('problem-definition', '重要な洞察', [
    '調査で確認したGAの利用状況、既存のデータ構造と登録フロー、レポート考察に限定された利用目的を照合し、ナレッジ活用を阻んでいた要因を四つのインサイトへ整理しました。ここでは、確認した事実から何を読み取り、どの設計方針へつなげたのかを示します。'
  ]);
  problem.appendChild(insightCards([
    {
      title: '施策に閉じた情報設計',
      problem: '旧ナレッジで扱える情報は、キャンペーン、売場変更、価格変更などの施策情報に限定されていました。また、登録した情報の主な用途も、AIレポートの考察精度を高めることでした。',
      evidence: '既存のデータ構造、登録項目、レポートとの接続方法を確認すると、ナレッジは売上・商品・店舗データと並ぶ「施策データセット」として設計されていました。社内ルール、マニュアル、商品知識、成功事例などを蓄積・利用する構造にはなっていませんでした。',
      insight: 'ナレッジがレポートを支える従属データとして設計されている限り、企業知識を広く蓄積・発見・再利用する目的は生まれにくい。',
      implication: 'ナレッジをレポートから独立した情報として扱い、施策以外の資料・業務知識も蓄積できる構造へ広げます。人が直接利用するだけでなく、レポートや将来のAI利用にも接続できるようにします。'
    },
    {
      title: '価値より先に発生する登録負荷',
      problem: 'ナレッジを利用するには、情報を項目ごとに入力し、対象を設定し、レポートへ接続する必要がありました。一方、登録の価値は、その後に生成されるAIレポートの考察として間接的にしか現れませんでした。',
      evidence: 'GAでは、入口となる登録機能自体が十分に利用されていませんでした。また、既存フローを確認すると、登録から利用までに複数の入力・設定工程がありました。',
      insight: '利用者が価値を実感する前に、多くの入力と設定を求めると、登録は始まらない。',
      implication: 'フォームへ一項目ずつ入力する方式ではなく、既存資料のアップロードを起点にします。AIが内容を整理して下書きを作成し、利用者は確認・修正を中心にすることで、登録開始の負荷を下げます。'
    },
    {
      title: '登録後の品質維持が設計されていない',
      problem: '情報を一度登録した後に、不足している項目や古くなった情報を確認し、継続的に補完・更新するための状態や導線がありませんでした。',
      evidence: 'GAでは、登録後の編集・再閲覧が十分に利用されていませんでした。また、既存仕様を確認すると、情報不足、鮮度低下、最終確認日などを管理する仕組みがありませんでした。',
      insight: 'ナレッジの品質を登録時点だけで完成させることはできない。公開後も不足と鮮度を継続的に管理する必要がある。',
      implication: 'すべての情報が揃っていなくても公開できるようにし、公開後に「情報不足」と「鮮度低下」を別の状態として表示します。ナレッジ管理者は公開前の承認者ではなく、公開後の補完・更新を促す役割として設計します。'
    },
    {
      title: '発見・再利用につながらない',
      problem: '旧ナレッジは、レポート考察の裏側で参照される情報としての役割が強く、利用者がナレッジ自体を探し、読み、業務へ再利用する目的が弱い状態でした。',
      evidence: 'GAでは、検索・再閲覧・レポート参照が十分に利用されていませんでした。また、既存の閲覧導線を確認すると、登録後の情報を発見し、他の利用者が補足し、再利用へつなげる体験が不足していました。',
      insight: '情報を保存できるだけではナレッジ活用は成立しない。必要な人へ発見され、利用され、その結果が次の更新へ戻る必要がある。',
      implication: '検索だけでなく、フィードや関連情報からナレッジを発見できるようにします。コメントや反応によって内容を補完し、レポートや将来のAI利用へ接続することで、利用結果を次の更新へ戻します。'
    }
  ]));
  problem.querySelector('.kr-insight-grid')?.remove();
  problem.appendChild(diagram(
    'local:diagram-critical-insights-v3.png',
    '施策に閉じた情報設計、価値より先に発生する登録負荷、登録後の品質維持不足、発見と再利用につながらないという四つのインサイトを示す手描き図',
    '図04 — リサーチから得られたインサイト｜ナレッジの蓄積・品質維持・発見・再利用を止めていた四つの障壁'
  ));
  const users = chapter('users-responsibilities', '利用者と責任分担', [
    'リニューアル後は、店舗と本部のどちらもナレッジの作成者・利用者になり得ます。一方、公開後の情報を横断的に確認し、品質と鮮度を維持する役割は必要ですが、その担当部門は企業によって異なります。そこで特定の職種へ固定せず、内容を整える役割と、ユーザー・組織・権限を管理する役割を分けて設計しました。'
  ]);
  users.appendChild(diagram(
    'diagram-stakeholders-v2.png',
    '作成者、利用者、ナレッジ管理者、システム管理者がナレッジを作る、使う、整える、守る関係を示す手描き図',
    'Figure 03 — Stakeholders & Responsibilities｜作る・使う・整える・守る責任を分ける'
  ));
  users.appendChild(note('ナレッジ管理者は公開前の承認者ではありません。公開済み情報の不足と鮮度を確認し、継続的な補完を促す役割です。'));
  const concept = chapter('core-concept', '解決策', [
    '旧ナレッジは、施策情報を登録し、AIレポートの考察精度を高めるための補助データとして利用する機能でした。リニューアルでは、既存資料から企業知識を構造化し、人が確認・公開した後、組織内で発見・利用・補完・更新できるナレッジ基盤へ再設計しました。',
    '単に資料をアップロードして保存するのではなく、ナレッジを起点に利用者同士が情報を補足し、利用結果を共有し、その内容を次の更新やAI利用へ戻せる循環を設計しました。'
  ]);
  concept.appendChild(subhead(
    '旧機能とリニューアル後の利用フロー',
    '旧機能では、利用者が施策情報を入力してレポートへ紐づけ、その情報をAIレポートの考察に利用する一方向の流れを想定していました。一方、登録機能自体は十分に利用されず、ナレッジを発見・補完・更新する流れにはつながっていませんでした。リニューアル後は、既存資料をAIが整理し、人が確認・公開した後、組織内で発見・利用され、コメントや補足を通して更新・再利用される流れへ変更しました。'
  ));
  concept.appendChild(diagram(
    'local:diagram-solution-workflow-v1.png',
    '施策情報の入力からAIレポートの参照で利用が途切れていた旧機能と、既存資料の登録から発見、コメント、更新、再利用までが循環するリニューアル後を比較した図',
    '図06 — 旧機能／リニューアル後の利用フロー｜保存から、使いながら育てる基盤へ'
  ));
  concept.appendChild(subhead(
    '企業ナレッジを育てる三つの領域',
    'リニューアル後の体験を「登録と構造化」「発見と対話」「品質と再利用」の三領域に分けました。AIによって登録負荷を下げるだけでなく、利用者がナレッジを起点にコメントや補足、利用結果を共有し、その知見を品質管理と更新へ戻すことで、企業内で継続的に利用される基盤を目指しました。'
  ));
  concept.appendChild(diagram(
    'local:diagram-solution-areas-v1.png',
    '既存資料をAIと人が構造化し、組織内で発見・対話し、品質管理を通して人とAIが再利用する三つの領域を示した図',
    '図07 — プロダクトを構成する三つの領域｜登録・対話・品質管理を一つの循環として接続する'
  ));
  concept.appendChild(note('AIエージェントによる本格的な参照や、施策結果を次のAI提案へ自動的に反映する学習ループは、今回の実装範囲と分けた将来構想です。'));
  const registration = chapter('registration-publication', '登録と公開', [
    'ナレッジはフォームへ一項目ずつ入力するのではなく、既存ファイルのアップロードを起点にしました。AIが内容を読み取り、一つの資料に複数のテーマがあれば、実際に再利用できる単位へ分解します。',
    'AIが整理したタイトル、カテゴリ、タグ、商品、期間、対象組織、要約、本文、公開範囲を人が確認・修正します。すべての項目が揃っていなくても公開でき、不足は公開後の品質管理へ送ります。'
  ]);
  registration.appendChild(diagram(
    'diagram-one-to-many-v2.png',
    '一つの資料をAIが解析し、人が確認した上で施策、商品知識、接客、運用、売場変更の複数ナレッジとして公開する手描き図',
    '図07 — 一つの資料から複数のナレッジへ｜既存資料を、実際に再利用できる単位へ分解する'
  ));
  registration.appendChild(subhead('一つの資料から複数のナレッジへ', '「2026年春販促ガイドライン.pdf」のような一つの資料から、施策、オペレーション、商品特徴、接客、売場変更などを別々のナレッジとして生成します。'));
  registration.appendChild(table(['設計判断', '理由'], [
    ['手動で一から作成しない', 'すでに存在する資料を利用し、新しい入力業務を増やさないため'],
    ['空欄でも登録可能', '完全性を求めすぎて情報が集まらない状態を避けるため'],
    ['不足を公開後に管理', '登録のしやすさと、継続的な品質維持を両立するため'],
    ['対象と公開範囲を分離', '扱う店舗・商品と、閲覧できる組織は一致しないため'],
    ['全体公開を初期値にする', '限定公開を選んだ場合だけ公開先を設定するため']
  ]));
  const detail = chapter('detail-collaboration', 'ナレッジ詳細と共同編集', [
    'ナレッジ詳細では、基本情報、本文、元ファイル、品質、公開範囲、利用状況、関連レポートをまとめて確認します。コメント、返信、いいね、添付、利用報告を通じて、元資料に含まれない現場の知見を周辺情報として蓄積します。'
  ]);
  detail.appendChild(cards([
    {title:'Content', body:'AI要約、本文、元ファイル、ファイルプレビュー、不足項目、編集導線'},
    {title:'Usage', body:'総閲覧数、閲覧者、最終閲覧、ブックマーク、コメント'},
    {title:'Report Connection', body:'レポートマスターからの参照と、関連するレポートを確認'},
    {title:'Collaboration', body:'コメント、返信、いいね、添付、店舗で試した結果、更新依頼'}
  ], 'kr-four'));
  detail.appendChild(callout('COLLABORATIVE KNOWLEDGE', '利用者の反応を人気競争ではなく、補足・更新・再利用へつなげる最小限のフィードバックとして扱いました。'));
  const quality = chapter('quality-trust', '品質管理と信頼性', [
    '品質管理は、公開前の承認・却下・差し戻しを行うワークフローではありません。抜けがある状態でも公開し、公開後に情報不足と鮮度低下を区別して補完する機能として設計しました。',
    'ナレッジ管理者は内容を一方的に書き換えるのではなく、不足を確認し、自分で補完するか、作成者へ依頼します。具体的な担当者や確認頻度は企業ごとに設定できます。'
  ]);
  quality.appendChild(diagram(
    'diagram-quality-loop-v2.png',
    '公開後に不足を検知し、鮮度を確認し、補完や依頼を経て確認済みへ戻す品質管理ループの手描き図',
    'Figure 08 — Quality Management｜承認で止めず、公開後に不足と鮮度を補完する'
  ));
  const decisions = chapter('decisions', '設計判断と完成UI', [
    'ここでは機能一覧を繰り返さず、リニューアル後の体験を形づくった四つのUI判断に絞ります。各項目を「どの課題に対して、画面上で何を優先したか、その判断をどのUIへ反映したか」の順で紹介します。'
  ]);
  if (decisionStack) {
    // 公開範囲・グループ管理は運用設定であり、ケースの設計判断からは外す。
    [...decisionStack.querySelectorAll('.decision-block')].slice(4).forEach(block => block.remove());
    decisionStack.querySelectorAll('.decision-ui-caption').forEach(node => node.remove());

    const decisionContent = [
      {
        title: '既存資料からAIドラフトを作り、人が確認して公開する',
        background: '一項目ずつ入力する登録フローは負荷が高く、入口となる登録機能自体が十分に利用されていませんでした。また、一つの資料には施策、商品知識、接客方法など複数のテーマが含まれる場合があります。',
        ui: 'PDFや画像などの既存資料を入口にし、AIが内容を再利用できる単位へ整理・分解します。画面では元資料とドラフトを並べ、人が内容と公開範囲を確認・修正してから公開できる構成にしました。'
      },
      {
        title: '登録時に止めず、公開後に品質を維持する',
        background: '登録時にすべての項目を必須にすると、情報が揃う前に登録が止まります。一方、公開後に不足や古さを確認する仕組みがなければ、ナレッジの信頼性を維持できません。',
        ui: '不足があっても公開できるようにし、公開後は「情報不足」と「鮮度低下」を分けて表示します。品質管理画面では、最終確認日と不足項目から対応対象を見つけ、補完または作成者への確認へ進めるようにしました。'
      },
      {
        title: '検索だけに依存せず、一覧で情報に出会えるようにする',
        background: '検索は、探す対象や検索語を知っているときに有効です。しかし、どのようなナレッジが登録されているか分からない利用者は、検索画面だけでは利用を始められません。',
        ui: 'ナレッジ一覧に、おすすめ、新着、最近見た情報、ブックマークをまとめました。目的が明確なときは検索し、目的が曖昧なときも一覧を眺めながら必要な情報へ到達できる構成にしました。'
      },
      {
        title: '詳細画面を、読むだけでなく知識を補完する場所にする',
        background: '閲覧と保存だけでは、利用者が業務で得た補足や例外条件が元のナレッジへ戻らず、情報が古くなっていきます。',
        ui: '本文と元資料を確認し、ブックマークやコメントを同じ詳細画面で行えるようにしました。利用者の質問や補足を会話として残し、作成者や管理者が次の更新へ反映できる入口にしています。'
      }
    ];

    [...decisionStack.querySelectorAll('.decision-block')].forEach((block, index) => {
      const content = decisionContent[index];
      if (!content) return;
      const heading = block.querySelector('header h3');
      if (heading) heading.textContent = content.title;
      const copy = block.querySelector('.decision-copy');
      if (copy) copy.innerHTML = `<div><h4>背景</h4><p>${content.background}</p></div><div><h4>UI上の判断</h4><p>${content.ui}</p></div>`;
      block.querySelector('.decision-abstract')?.remove();
    });

    const shots = [...decisionStack.querySelectorAll('.product-shot')];
    const shotTitles = [
      ['01', 'AIドラフトの確認・公開', '元資料とAIドラフトを照合し、人が内容を確定する'],
      ['02', '公開後の品質管理', '情報不足と鮮度低下を分け、補完すべき情報へ到達する'],
      ['03', '発見から始まるナレッジ一覧', '検索・おすすめ・新着・履歴・ブックマークから情報へ到達する'],
      ['04', 'ナレッジ詳細とコメント', '内容と元資料を確認し、補足や質問を次の更新へつなげる']
    ];
    const annotationNotes = [
      [['AIの整理結果を確認', 'AIが整理した内容を、確定情報と分けて表示。'], ['元資料へ戻れる', '参照元のファイルを並べ、人が内容を照合できる。'], ['人が内容を確定', '確認・修正後に公開する責任範囲を明示。']],
      [['状態を俯瞰', '情報不足と鮮度低下を分けて把握。'], ['確認対象へ到達', '不足項目と最終確認日から対応対象を見つける。'], ['公開後に補完', '公開を止めず、必要な情報を後から整える。']],
      [['おすすめ・新着', '検索語がなくても関連する情報に出会える。'], ['履歴・ブックマーク', '一度利用した情報へ戻りやすくする。'], ['検索を併用', '目的が明確な場合は横断検索から到達する。']],
      [['内容と元資料を確認', '本文と根拠となる資料を同じ画面で読む。'], ['コメントで補足', '質問や現場の知見をナレッジの周辺に残す。'], ['更新の入口にする', '会話の内容を作成者や管理者の補完につなげる。']]
    ];
    shots.forEach((shot, index) => {
      const title = shot.querySelector('.ui-title-block');
      const spec = shotTitles[index];
      if (title && spec) {
        title.querySelector('span').textContent = spec[0];
        title.querySelector('strong').textContent = spec[1];
        title.querySelector('small').textContent = spec[2];
      }
      const cards = [...shot.querySelectorAll('.ui-annotation-card')];
      cards.forEach((card, cardIndex) => {
        const noteSpec = annotationNotes[index]?.[cardIndex];
        if (!noteSpec) return;
        const label = card.querySelector('b');
        const body = card.querySelector('p');
        if (label) label.textContent = noteSpec[0];
        if (body) body.textContent = noteSpec[1];
      });
    });

    const replaceText = (selector, from, to) => {
      decisionStack.querySelectorAll(selector).forEach(node => {
        if (node.textContent.trim() === from) node.textContent = to;
      });
    };
    replaceText('*', 'AI参照可能', '確認済み');
    replaceText('*', 'AI参照可', '公開中');
    replaceText('*', 'AI参照停止', '情報不足');
    replaceText('*', '停止中', '要補完');
    replaceText('*', 'AI参照', '不足項目');
    replaceText('*', '更新依頼として登録', '返信する');
    replaceText('*', '対応中', '返信済み');

    decisionStack.querySelectorAll('.ka-quality-gate').forEach(node => {
      node.innerHTML = '<div><small>公開後に確認する品質状態</small><strong>情報不足 ／ 鮮度低下 ／ 最終確認日</strong></div><span>対象を確認 →</span>';
    });
    decisionStack.querySelectorAll('.ka-detail-head .ka-status.ai').forEach(node => node.remove());
    decisionStack.querySelectorAll('.ka-visibility span').forEach(node => {
      node.textContent = '閲覧 11名 / 編集 3名';
    });
    decisions.appendChild(decisionStack);
  }
  const collaboration = chapter('collaboration-delivery', '協働と開発連携', [
    'Product Managerとはリニューアル目的、スコープ、機能間の関係、優先順位を整理しました。AI・Data Science担当とはファイル解析、分割、要約、タグ付け、不足判定を確認しました。',
    'Engineersとは、ファイルとナレッジの一対多関係、非同期処理、生成状態、公開設定、組織マスター、権限、プレビュー、コメント、閲覧履歴、エラーを仕様化し、実装フィードバックまで行いました。'
  ]);
  collaboration.appendChild(table(['Partner', '主な論点'], [
    ['Product Manager', '目的、スコープ、機能関係、優先順位、未確定仕様'],
    ['Data Scientist / AI', '抽出、分割、要約、タグ、不足判定'],
    ['Engineers', 'リレーション、非同期状態、権限、組織、プレビュー、例外'],
    ['Product Designer', '課題、業務フロー、情報設計、登録・発見・品質・共有の体験、UI、状態・権限仕様、実装確認']
  ]));
  collaboration.appendChild(subhead('設計成果物', '既存機能の課題整理、リレーション図、登録・確認・公開フロー、情報設計、カテゴリ・タグ、公開範囲、品質管理、画面UI、プロトタイプ、状態・例外仕様、実装フィードバックを作成しました。'));
  const validation = chapter('release-validation', 'リリースと検証', [
    '本リニューアルはリリース済みです。一方、未計測の工数削減率や利用率向上は成果として扱わず、具体化できた設計と、リリース後に検証が必要な仮説を分けています。'
  ]);
  validation.appendChild(table(['確認・具体化できたこと', '今後の検証'], [
    ['既存機能の利用上の偏りと「何を登録するか」が伝わりにくい課題', '登録作業が実際にどの程度短縮されるか'],
    ['ナレッジを独立機能として扱う方針と、ファイル起点のAI整理', 'AI分割の精度と、利用者が修正する量'],
    ['不完全な公開、公開後の品質管理、対象と公開範囲の分離', 'デフォルト公開範囲、管理者の作業量、鮮度判定期間'],
    ['検索、コメント、閲覧履歴、レポートとの関係', 'おすすめの有用性、継続登録と再利用']
  ], 'kr-validation'));
  validation.appendChild(callout('RELEASED', 'レポート向けの施策データセットとしての役割が強かった機能を、登録・構造化・発見・共有・品質管理・AIレポート参照までを含むナレッジ基盤としてリリースしました。'));
  const contribution = chapter('contribution', '自分の貢献', [
    'このプロジェクトでの主な貢献は、既存のナレッジ画面を見た目として改善したことではありません。AIレポート向けの施策データセットとしての役割が強かった機能を、登録、構造化、発見、共有、品質管理までを含むナレッジマネジメント基盤へ再定義したことです。'
  ]);
  contribution.appendChild(cards([
    {title:'Reframe', body:'利用状況から課題を整理し、レポート向けの施策データセットから独立したナレッジ基盤へ再定義しました。'},
    {title:'Model', body:'ファイル、ナレッジ、レポート、組織、権限、状態の関係を整理しました。'},
    {title:'Experience', body:'AI自動整理、人の確認、不完全な公開、品質管理、検索、発見、コメントを一連の体験として設計しました。'},
    {title:'Delivery', body:'画面、データ構造、状態、権限、例外を開発可能な仕様へ落とし込み、実装確認まで担当しました。'}
  ], 'kr-four'));
  const reflection = chapter('reflection', '振り返り', [
    '今回、ナレッジを蓄積・発見・維持する構造までは具体化できました。次の課題は、おすすめやコメント、品質管理が継続的な再利用と更新につながっているかを、リリース後の利用から検証することです。'
  ]);
  reflection.appendChild(cards([
    {title:'既存業務に合わせて作る', body:'新しい入力作業を増やすだけでは蓄積されません。既存のPDF、Excel、画像、音声などを起点にする必要があります。'},
    {title:'品質管理で蓄積を止めない', body:'公開前の完全性と承認を強制せず、公開後に不足を補完することで、蓄積と品質を両立させます。'},
    {title:'保存と再利用を分ける', body:'登録件数だけでなく、検索、閲覧、反応、更新まで確認する必要があります。'},
    {title:'AI品質は運用で決まる', body:'登録内容、補完、鮮度、公開範囲を含む運用設計が、AIレポートの考察品質を支えます。'}
  ], 'kr-four'));
  const nextCase = document.createElement('a');
  nextCase.className = 'kr-next-case';
  nextCase.href = './case-intelligence-os.html';
  nextCase.innerHTML = '<span>NEXT CASE STUDY</span><strong>KiZUKAI Intelligence OS</strong><p>データと企業ナレッジから、組織の施策判断へつなげるAIレポート基盤。</p><i>→</i>';
  reflection.appendChild(nextCase);

  overview.querySelector('h2').textContent = '概要';
  background.id = 'challenge';
  background.querySelector('h2').textContent = '課題';
  direction.id = 'project-at-a-glance';
  direction.querySelector('h2').textContent = 'プロジェクトの全体像';
  problem.id = 'critical-insights';
  problem.querySelector('h2').textContent = '重要な洞察';
  concept.id = 'solution';
  concept.querySelector('h2').textContent = '解決策';

  const discovery = chapter('discovery', '調査と課題整理', [
    'ナレッジ活用がなぜ広がらなかったのかを明らかにするため、リリース後のGAによる利用状況、既存のデータ構造と登録フロー、旧機能が利用者へ提供していた価値を照合しました。その結果、登録機能自体が十分に利用されておらず、施策データセットとしての限定的な位置づけ、利用開始までの複雑な工程、登録価値がレポート考察の精度向上として間接的にしか現れないことが、利用の広がりを阻んでいると分かりました。'
  ]);
  discovery.appendChild(diagram(
    'local:diagram-discovery-evidence-v4.png',
    'GAで登録自体の利用が少なかった事実、施策データセットとしての既存構造と登録フロー、レポート考察の精度向上に限定された利用目的を整理した図',
    '図03 — 課題の根拠整理｜利用状況・既存構造・利用目的から、ナレッジ活用が広がらない要因を整理'
  ));

  const principles = chapter('design-principles', '設計原則', [
    '四つのインサイトを、ナレッジの登録・公開・発見・更新を一貫して判断する五つの原則へ変換しました。機能や画面を個別に考えるのではなく、レポート向けの施策データから、企業全体で利用され続けるナレッジ基盤へ変えるための判断軸として定義しました。'
  ]);
  principles.appendChild(subhead(
    '五つの判断基準',
    '「企業知識として扱う」では、ナレッジをレポートに従属する施策データから独立させました。「AIが整理し、人が確認する」では、既存資料からAIが下書きを作り、人が内容を確定します。「公開後に品質を高める」では、登録時の完全性を求めず、公開後に不足と鮮度を管理します。「検索せず発見」では、フィードや関連情報から必要な知識に出会える状態をつくります。「利用を更新へ」では、コメントや利用結果を次の補完・更新へ戻します。'
  ));
  principles.appendChild(diagram(
    'local:diagram-design-principles-v3.png',
    '企業知識として扱う、AIが整理して人が確認する、公開後に品質を高める、検索せず発見する、利用を更新へ戻すという五つの設計原則を示す図',
    '図05 — 設計原則｜施策データから、利用によって育つ企業ナレッジへ'
  ));


  const outcomesReflection = chapter('outcomes-reflection', '成果と振り返り', [
    'リニューアルによって実現したことと、次の改善へ持ち越す学びをまとめます。'
  ]);
  outcomesReflection.appendChild(subhead(
    '成果と到達点',
    '2026年6月、AIレポート向けの施策データとして提供していた既存機能を、企業内の資料や業務知識を蓄積・発見・補完できるナレッジ基盤へリニューアルしました。リリース後は、導入クライアントにおけるナレッジの活用率が向上しました。またKiZUKAI側でも、ナレッジ活用の具体像を商談で提示しやすくなり、商談が具体的な案件へ進む確率が大きく向上しました。'
  ));
  outcomesReflection.appendChild(cards([
    {
      title: '導入クライアントの活用率が向上',
      body: '登録するだけの補助機能から、発見・確認・更新・再利用までをつなぐ体験へ変えたことで、導入後のナレッジ活用が広がりました。'
    },
    {
      title: '商談の案件化率が向上',
      body: '企業ナレッジをAI活用へつなぐ具体的な体験を示せるようになり、KiZUKAIの商談が実際の案件へ進む確率が大きく向上しました。'
    }
  ], 'kr-two'));

  outcomesReflection.appendChild(subhead(
    '振り返り',
    'リニューアルを通して、ナレッジを保存できることと、企業内で継続的に利用されることは別の課題だと分かりました。次の改善へ持ち越す三つの学びを整理しました。'
  ));
  outcomesReflection.appendChild(cards([
    {
      title: '利用の循環までを成果として計測する',
      body: '登録件数だけでなく、発見、閲覧、コメント、補完、再利用までを追い、ナレッジが業務で活用されたかを成功指標として設計する必要があります。'
    },
    {
      title: 'AIと人の役割分担を継続的に調整する',
      body: 'AIによる整理・分割の精度と、人が修正する量を確認しながら、登録負荷と情報の信頼性が両立する範囲を継続的に調整する必要があります。'
    },
    {
      title: '品質管理を運用負荷と合わせて設計する',
      body: '情報不足や鮮度低下を表示するだけでなく、誰がどの頻度で確認し、どのように作成者へ補完を促すかまで、企業ごとの運用に合わせて改善する必要があります。'
    }
  ], 'kr-three'));
  outcomesReflection.appendChild(nextCase);

  const chapters = [overview, direction, background, discovery, problem, concept, principles, decisions, outcomesReflection];
  chapters.forEach(section => main.appendChild(section));

  tocNav.innerHTML = chapters.map(section => `<a href="#${section.id}">${section.querySelector('h2').textContent}</a>`).join('');

  const tocItems = [...tocNav.querySelectorAll('a')].map(link => ({ link, section: root.querySelector(link.getAttribute('href')) })).filter(item => item.section);
  const syncToc = () => {
    let current = tocItems[0];
    tocItems.forEach(item => {
      if (item.section.getBoundingClientRect().top <= 190) current = item;
    });
    tocItems.forEach(item => {
      const active = item === current;
      item.link.classList.toggle('is-active', active);
      if (active) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', syncToc, { passive: true });
  syncToc();
})();
