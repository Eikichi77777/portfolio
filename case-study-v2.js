(() => {
  const root = document.querySelector('#case-intelligence-os, #case-knowledge-renewal');
  if (!root || root.dataset.caseStudyVersion === '2') return;

  const configs = {
    'case-intelligence-os': {
      productIntro: {
        label: 'KiZUKAI Intelligence OSとは',
        paragraphs: [
          'KiZUKAI Intelligence OSは、小売企業の売上・店舗・商品データと、企業内に蓄積された施策や業務知識を組み合わせ、定期レポートとAI考察を生成するBtoB SaaSです。',
          '本部や店舗運営の担当者は、数値の変化だけでなく、その背景となる仮説を確認し、必要に応じて考察を編集・共有して次の施策判断に使います。このケーススタディでは、大枠の機能構想を実運用できるプロダクトへ具体化した過程を紹介します。'
        ]
      },
      overview: {
        thesis: '初期構想を、実運用できるレポートSaaSへ具体化しました。',
        paragraphs: [
          'プロジェクトは、経営から提示された大枠の機能構想を起点に始まりました。しかし、誰がどの業務で使うのか、どの情報を扱うのか、初期リリースに何を含めるのかは未定義でした。私は顧客知見と既存業務を整理し、構想を継続利用できるプロダクトの構造へ落とし込みました。',
          'Product Designerとして、業務フロー、情報設計、スコープ、UI、状態と権限の仕様、実装確認、テストまでを担当しました。画面を作ることだけではなく、レポートが生成され、確認され、組織へ届き、次の判断に使われるまでを一つの体験として設計しています。'
        ]
      },
      problem: {
        thesis: '数値は見えても、次に何をすべきか判断できないことが課題でした。',
        paragraphs: [
          'BIやデータ基盤の導入によって、売上やKPIを確認できる環境は整っていました。一方で、数値の変化理由や次に取るべき施策は、画面を見るだけでは分かりません。担当者は複数画面を確認し、Excelへ転記し、経験をもとに考察を作っていました。',
          'その後、報告資料を作り、メールや会議で共有してから施策を判断します。情報確認から判断までの工程が担当者へ集中し、同じ業務が組織ごとに繰り返されていることが本質的な課題でした。'
        ],
        legacyId: 'context',
        artifactNote: '現状の課題と、プロダクトが担う価値を対応づけ、単なる可視化ではなく判断支援を価値の中心に置きました。'
      },
      goal: {
        thesis: 'この課題に対して、データ確認から施策判断までを一つの業務体験にすることを目指しました。',
        paragraphs: [
          '目指したのは、高機能な分析ツールを作ることではありません。業務のタイミングに合わせて必要な情報が届き、AIが変化理由や考察の下書きを作り、人が内容を確認して次の施策を判断できる状態です。',
          '生成を自動化しても、最終判断まで自動化はしません。AIの速度と人の責任を両立させ、同じ情報を組織へ届けることで、報告から判断までが継続運用できる体験をゴールとしました。'
        ],
        stages: ['必要な情報が、業務のタイミングに合わせて届く。','AIが事実を整理し、考察の下書きを生成する。','人が確認・編集・共有し、次の施策を判断する。']
      },
      alignment: {
        thesis: 'このゴールを初期リリースで実現するため、守る前提を機能検討より先に揃えました。',
        paragraphs: [
          'CEO、PdM、営業、コンサルタントが持つ顧客知見を整理し、初期リリースの判断軸を定めました。自由度の高いBIを目指すのではなく、既存顧客が繰り返している報告業務に焦点を当て、定期レポートを体験の中心にします。',
          'AIは最終判断者ではなく提案者とし、個人利用より組織運用を優先しました。初期顧客の業務で必要か、他社へ共通化できるか、学習負荷を抑えられるか、期間内に成立するかという基準で、採用する範囲と見送る範囲を合意しています。'
        ],
        legacy: [
          ['process','構想理解から実装確認まで、設計と開発を分離せずに反復しました。'],
          ['insights','業務整理から、初期体験で一貫して守る4つの方針を導きました。'],
          ['scope','候補機能を比較し、初期リリースで成立させる範囲を限定しました。']
        ]
      },
      design: {
        thesis: '合意した前提をもとに、業務構造を情報・状態・権限・UIへ段階的に変換しました。',
        paragraphs: [
          '新しい画面から考えるのではなく、既存の報告・判断業務を起点にしました。作業と判断主体を整理し、自動化する範囲、人に残す責任、レポートを中心とした情報構造を定義してからUIへ進んでいます。',
          '当時のIAスケッチや初期UI、ワイヤーフレームでは複数案を比較しました。代表的な設計判断は、背景、選択肢、判断、対応する完成UIの順に示します。'
        ],
        foundation: {
          copy: 'まず、顧客知見と既存業務を設計可能なモデルへ変換しました。報告の流れをAs-Isとして可視化し、レポート、生成条件、組織、ナレッジの関係を整理しています。',
          legacy: [
            ['discovery','顧客から得られていた知見を、利用者・業務工程・課題・判断へ分解しました。'],
            ['workflow','既存の報告業務を可視化し、システム化する工程と人が担う判断を分けました。'],
            ['architecture','期間ごとに生成されるレポートを中心に、設定・組織・ナレッジを接続しました。']
          ]
        },
        explore: {
          copy: '次に、自由分析と定期配信、AIの完全自動化と人の確認、個別利用と組織配信、フォルダと検索という選択肢を比較しました。採用しなかった案も含め、なぜこのプロダクトが現在の形になったかを完成UIと対応づけています。',
          decisionId: 'decisions'
        },
        handoff: {
          copy: 'High-Fidelityでは見た目だけでなく、生成中、レビュー待ち、確認済み、配信済みといった状態、閲覧・編集・管理の権限差、設定変更の反映範囲まで設計しました。開発用Figmaと仕様を通じて、実装後も判断の意図が保たれる状態を目指しました。',
          stages: ['生成・確認状態を画面横断で定義する。','閲覧・編集・管理の権限差を整理する。','設定変更の反映範囲と例外を仕様化する。','実装確認とテストでデザイン意図を検証する。']
        }
      },
      release: {
        thesis: '設計した体験を、生成から組織配信まで一連のレポート機能としてリリースしました。',
        paragraphs: [
          '初期リリースでは、定期生成条件の設定、レポート生成、数値とAI考察の確認、考察の編集、組織単位の配信、検索と権限管理を一つの運用として実装しました。個別の画面ではなく、レポートが業務の中で継続的に届き、確認されることをリリースの単位としています。',
          '私は開発チームと仕様を確認し、実装された画面の状態、権限差、エラー、利用フローを検証しました。リリース後は、主要機能が実運用で使われているかを確認しています。'
        ],
        stages: ['生成条件を保存する。','業務のタイミングで生成する。','AI考察を人が確認・編集する。','組織へ配信し、施策判断へつなげる。'],
        note: 'リリース範囲は、定期生成、AI考察、人による確認、組織配信、検索・権限管理です。'
      },
      outcome: {
        thesis: 'リリース後は、月間約4,000件規模のレポート生成を自動化しました。',
        paragraphs: [
          'リリース後、月間約4,000件規模のレポート生成が自動化され、定期運用されていることを確認しました。レポート閲覧、編集、検索、権限設定など、設計した主要機能の利用も確認しています。',
          '一方で、判断時間がどれだけ短縮されたか、AI考察が施策実行へどの程度つながったかは十分に測定できていません。確認できた事実と、今後検証すべき効果を分けて扱っています。'
        ],
        legacyId: 'outcome'
      },
      reflection: {
        thesis: '一方で、構想の具体化だけでなく、成功条件も早期に設計する必要があると学びました。',
        paragraphs: [
          'CEO、営業、コンサルタントの顧客知見は設計に活用できましたが、現場ユーザーへの一次調査を初期段階から十分に組み込めたわけではありません。次のプロジェクトでは、利用者本人の業務観察とインタビューをより早く実施します。',
          'また、成功指標と計測方法をUIや仕様と同じタイミングで設計する必要がありました。生成件数だけでなく、確認時間、修正内容、施策への接続までを評価できると、AI考察の品質を継続的に改善できます。',
          'AIの出力を評価する際も、正誤だけではなく、人がどこを修正し、どの情報を判断に使ったかを学習ループへ戻す設計が必要だと考えています。'
        ]
      }
    },
    'case-knowledge-renewal': {
      overview: {
        thesis: '施策記録中心の機能を、企業ナレッジの共通基盤へ再設計しました。',
        paragraphs: [
          'Intelligence OSの初期リリースでは、AIレポートへ施策情報を与える補助機能としてナレッジを実装しました。その後、業務別AIエージェントを展開する構想が具体化し、マニュアル、社内ルール、商品知識などを横断して扱える基盤が必要になりました。',
          '私はPdMとともに、登録、品質管理、発見、公開範囲、コミュニケーションを一連の体験として再設計しました。データサイエンス、コンサル、開発チームと連携し、継続運用できるナレッジ基盤としてリリースまで担当しています。'
        ]
      },
      problem: {
        thesis: '情報が登録されても、組織の知識として使われ続けていないことが課題でした。',
        paragraphs: [
          '既存機能は施策記録を中心としており、扱える情報と用途が限られていました。ファイルの内容を確認しながら手動で入力する負荷も高く、登録後の品質、鮮度、公開状態を継続的に管理する仕組みがありませんでした。',
          '実際の利用状況を確認すると、登録された情報はほとんど再利用されていませんでした。明確な検索目的がなければ情報へ到達できず、利用者からの補足や質問も更新へ戻りません。登録して終わる構造そのものが課題でした。'
        ],
        legacyId: 'vision',
        artifactNote: '企業データと企業ナレッジをAI体験へ接続するには、登録数ではなく、品質と再利用までを扱う必要がありました。'
      },
      goal: {
        thesis: 'この課題に対して、登録して終わらず、利用と更新が循環する状態を目指しました。',
        paragraphs: [
          '目指したのは、AIによって登録を自動化することだけではありません。AIがドラフトを作り、人が内容と根拠を確認して公開し、その後も品質と鮮度を管理できる状態です。',
          '利用者は検索目的がなくても情報を発見でき、コメントや利用状況が更新へ戻ります。この循環によって、企業ナレッジが人の業務と将来のAIエージェントの双方から継続利用されることをゴールとしました。'
        ],
        stages: ['AIが情報を整理し、登録のドラフトを作る。','人が根拠・内容・公開範囲を確認する。','発見・利用・会話を更新へ戻し、知識を育てる。']
      },
      alignment: {
        thesis: 'このゴールを実現するため、AI構想を顧客ごとに運用できる仕組みへ変換しました。',
        paragraphs: [
          '将来の業務別AIエージェントが参照できることをプロダクトの前提としながら、初期リリースでは登録、品質、発見、公開、更新の循環を成立させることに集中しました。AIが直接公開するのではなく、ドラフトを人が確認する境界もここで定めています。',
          'ナレッジを管理する担当者は、本部や店舗運営支援などを想定していますが、実際の職種や責任者は企業ごとに異なります。そのため管理主体を一律に固定せず、所有者、公開範囲、権限を顧客組織に合わせて設定できることを合意しました。'
        ],
        legacy: [
          ['process','構想理解からリリースまで、業務・情報・UI・仕様を反復しながら具体化しました。'],
          ['scope','初期リリースでは、登録だけでなく、品質、発見、再利用までをスコープに含めました。']
        ]
      },
      design: {
        thesis: '合意した運用前提をもとに、登録画面だけでなくナレッジのライフサイクル全体を設計しました。',
        paragraphs: [
          '登録画面だけを改善しても、ナレッジが利用・更新される状態にはなりません。情報を入手してから、AIや業務で再利用されるまでを一つのライフサイクルとして整理し、各段階に必要な状態と責任を定義しました。',
          '当時のIAスケッチや初期UIでは、登録、品質管理、ホーム、詳細、公開範囲の関係を比較しています。代表的な5つの判断を、背景、選択肢、判断、対応する完成UIの順で示します。'
        ],
        foundation: {
          copy: 'まず、既存の登録業務と利用状況を整理し、情報の入手から再利用・更新までを可視化しました。その上で、ナレッジ、所有者、品質状態、公開範囲、AI参照条件の関係を情報構造として定義しています。',
          legacy: [
            ['discovery','登録負荷、品質、発見、更新という4つの運用条件を整理し、知識循環の業務モデルへ変換しました。'],
            ['architecture','登録画面ではなく、確認・公開・利用・更新までを含むナレッジライフサイクルを構造化しました。']
          ]
        },
        explore: {
          copy: '次に、AIによる直接登録と人の確認、登録時の完全性と公開後の品質管理、全件テーブルと発見型ホーム、保存とコミュニケーション、固定管理者と柔軟な管理主体を比較しました。採用案と見送り案を、完成UIへ対応づけています。',
          decisionId: 'decisions'
        },
        handoff: {
          copy: 'High-Fidelityでは、下書き、要確認、公開済み、更新推奨、AI参照停止などの状態を画面横断で定義しました。所有者、閲覧・編集権限、公開範囲、AI参照条件も同じ情報モデルへ接続し、開発用Figmaと仕様へ落としています。',
          stages: ['登録・確認・公開の状態を定義する。','品質と鮮度を継続管理できるようにする。','所有者・公開範囲・AI参照条件を接続する。','実装確認とテストで運用可能性を検証する。']
        }
      },
      release: {
        thesis: '設計した登録・維持・活用の体験を、一つのナレッジ基盤としてリリースしました。',
        paragraphs: [
          'リニューアルでは、ファイルからのAIドラフト、人による内容と根拠の確認、公開後の品質・鮮度管理、フィードや履歴による発見、コメントからの更新依頼、組織単位の公開範囲を一つの体験として実装しました。',
          'ナレッジの状態とAI参照条件を接続したことで、人が利用する情報と、将来のAIエージェントが参照する情報を同じ基盤で管理できます。リニューアルは初期スコープとして実際にリリースされています。'
        ],
        stages: ['AIが登録ドラフトを作る。','人が内容と根拠を確認して公開する。','品質・鮮度・公開範囲を管理する。','発見・利用・会話を更新へ戻す。'],
        note: 'リリース範囲は、AI登録支援、品質管理、発見型ホーム、詳細・コメント、組織単位の公開管理です。'
      },
      outcome: {
        thesis: 'リリースによって、企業ナレッジを蓄積・維持・再利用する共通基盤を提供しました。',
        paragraphs: [
          '施策中心だったナレッジを複数の情報種別へ拡張し、AIドラフト、人の確認、品質状態、公開範囲を一つのプロダクト構造として実装しました。これにより、業務別AIエージェントが参照できる企業ナレッジの基盤を用意できました。',
          '一方で、登録完了率、再閲覧率、発見経路、コメントから更新へ接続した割合などは今後の検証対象です。リリースした事実と、まだ測定できていない期待効果を分けて示します。'
        ],
        legacyId: 'outcome'
      },
      reflection: {
        thesis: '一方で、ナレッジの成功は登録数ではなく、利用と更新の循環で評価する必要があると学びました。',
        paragraphs: [
          '管理者像と利用者像は関係者の知見から整理しましたが、実際の運用担当者と現場利用者への一次調査を、設計初期から十分に組み込めたわけではありません。次は双方の業務観察とインタビューを早い段階で行います。',
          'また、ナレッジの成功を登録件数だけで評価すると、使われず更新されない情報が増える可能性があります。発見、再閲覧、業務利用、コメント、更新までを一つの循環として計測する必要があります。',
          'AIが担う範囲と人が責任を持つ範囲も固定ではありません。誤り、修正内容、利用場面を継続的に確認しながら、自動化と人の確認の境界を調整していきます。'
        ]
      }
    }
  };

  const config = configs[root.id];
  if (!config) return;
  root.dataset.caseStudyVersion = '2';
  root.classList.add('case-study-v2');

  const main = root.querySelector('main#top');
  const toc = root.querySelector('.case-toc');
  if (!main || !toc) return;

  const makeIntro = (number, label, content) => {
    const wrap = document.createElement('div');
    wrap.className = 'v2-chapter-intro';
    const [firstParagraph = '', ...remainingParagraphs] = content.paragraphs;
    const paragraphs = [`${content.thesis}${firstParagraph}`, ...remainingParagraphs];
    wrap.innerHTML = `<div class="v2-chapter-intro-inner"><h2 class="v2-chapter-name"><span>${number}</span>${label}</h2><div class="v2-prose">${paragraphs.map(text => `<p>${text}</p>`).join('')}</div></div>`;
    return wrap;
  };

  const makeChapter = (id, number, label, content) => {
    const section = document.createElement('section');
    section.className = 'v2-chapter';
    section.id = id;
    section.appendChild(makeIntro(number, label, content));
    return section;
  };

  const makeProductIntro = content => {
    if (!content) return null;
    const section = document.createElement('section');
    section.className = 'v2-product-intro';
    section.innerHTML = `<div class="v2-product-intro-inner"><p class="v2-product-intro-label">${content.label}</p><div class="v2-prose">${content.paragraphs.map(text => `<p>${text}</p>`).join('')}</div></div>`;
    return section;
  };

  const makeFlow = (items, className) => {
    const flow = document.createElement('div');
    flow.className = className;
    flow.innerHTML = items.map((text,index) => `<div><span>${String(index + 1).padStart(2,'0')}</span><p>${text}</p></div>`).join('');
    return flow;
  };

  const makeArtifactCaption = text => {
    const caption = document.createElement('p');
    caption.className = 'v2-artifact-note';
    caption.textContent = text;
    return caption;
  };

  const makeArtifactLead = text => {
    const lead = document.createElement('p');
    lead.className = 'v2-artifact-lead';
    lead.textContent = text;
    return lead;
  };

  const artifactCaptions = {
    'case-intelligence-os:context': '現状の課題と、プロダクトが提供する価値の対応。',
    'case-intelligence-os:insights': '初期リリースで一貫して守る4つの設計方針。',
    'case-intelligence-os:scope': '初期リリースのスコープを決める比較軸。',
    'case-intelligence-os:discovery': '顧客知見を、設計判断へ変換する整理プロセス。',
    'case-intelligence-os:workflow': '既存業務の工程と、システム・AI・人の役割分担。',
    'case-intelligence-os:architecture': 'レポートを中心としたIntelligence OSの情報構造。',
    'case-knowledge-renewal:vision': '既存のナレッジ機能が抱えていた課題と、リニューアルで目指す状態。',
    'case-knowledge-renewal:scope': '登録だけでなく、品質・発見・再利用までを含む初期スコープ。',
    'case-knowledge-renewal:discovery': '登録から再利用・更新までを循環させる業務モデル。',
    'case-knowledge-renewal:architecture': 'ナレッジの確認・公開・利用・更新をつなぐ情報構造。'
  };

  const captionFor = (id, fallback) => artifactCaptions[`${root.id}:${id}`] || fallback;

  const makePhase = (name, copy) => {
    const group = document.createElement('div');
    group.className = 'v2-chapter-group';
    group.innerHTML = `<div class="v2-phase-intro"><p class="v2-phase-name">${name}</p><p class="v2-phase-copy">${copy}</p></div>`;
    return group;
  };

  const originalSections = [...main.querySelectorAll(':scope > section.section[id]')];
  originalSections.forEach(section => section.remove());

  const overview = makeChapter('overview','01','概要',config.overview);
  const productIntro = makeProductIntro(config.productIntro);

  const problem = makeChapter('problem','02','課題',config.problem);
  const problemArtifact = originalSections.find(section => section.id === config.problem.legacyId);
  if (problemArtifact) {
    problemArtifact.classList.add('v2-legacy-section');
    problemArtifact.insertBefore(makeArtifactLead(config.problem.artifactNote), problemArtifact.firstChild);
    problemArtifact.appendChild(makeArtifactCaption(captionFor(config.problem.legacyId, config.problem.artifactNote)));
    problem.appendChild(problemArtifact);
  }

  const goal = makeChapter('goal','03','プロジェクトの全体像',config.goal);
  goal.appendChild(makeArtifactLead('このゴールを、利用者が情報を受け取ってから施策を判断するまでの3段階で整理しました。'));
  goal.appendChild(makeFlow(config.goal.stages,'v2-goal-flow'));
  goal.appendChild(makeArtifactCaption('目指す業務体験を、情報の生成から施策判断までの流れで整理した図解。'));

  const alignment = makeChapter('alignment','04','重要な洞察',config.alignment);
  config.alignment.legacy.forEach(([id,note]) => {
    if (id === 'process') return;
    const source = originalSections.find(section => section.id === id);
    if (!source) return;
    source.classList.add('v2-legacy-section');
    source.insertBefore(makeArtifactLead(note), source.firstChild);
    source.appendChild(makeArtifactCaption(captionFor(id, note)));
    alignment.appendChild(source);
  });

  const design = makeChapter('design-phases','05','設計原則',config.design);
  const foundation = makePhase('業務整理と構造設計',config.design.foundation.copy);
  config.design.foundation.legacy.forEach(([id,note]) => {
    const source = originalSections.find(section => section.id === id);
    if (!source) return;
    source.classList.add('v2-legacy-section');
    source.insertBefore(makeArtifactLead(note), source.firstChild);
    source.appendChild(makeArtifactCaption(captionFor(id, note)));
    foundation.appendChild(source);
  });
  design.appendChild(foundation);

  const explore = makePhase('比較検討と設計判断',config.design.explore.copy);
  const decisions = originalSections.find(section => section.id === config.design.explore.decisionId);
  if (decisions) {
    decisions.classList.add('v2-legacy-section');
    explore.appendChild(decisions);
  }
  design.appendChild(explore);

  const handoff = makePhase('UI設計と開発連携',config.design.handoff.copy);
  handoff.appendChild(makeArtifactLead('High-Fidelityから開発へ引き継ぐ際に、画面だけでは伝わらない状態・権限・反映範囲を次の4項目で定義しました。'));
  handoff.appendChild(makeFlow(config.design.handoff.stages,'v2-release-flow'));
  handoff.appendChild(makeArtifactCaption('High-Fidelityから実装確認までに定義した、状態・権限・仕様の設計項目。'));
  design.appendChild(handoff);

  const release = makeChapter('release','06','解決策',config.release);
  release.appendChild(makeArtifactLead('初期リリースで実装した体験を、設定から施策判断までの流れで示します。'));
  release.appendChild(makeFlow(config.release.stages,'v2-release-flow'));
  release.appendChild(makeArtifactCaption('初期リリースで実装した、生成・確認・活用までの業務フロー。'));
  const releaseNote = document.createElement('p');
  releaseNote.className = 'v2-release-note';
  releaseNote.textContent = config.release.note;
  release.appendChild(releaseNote);

  const outcome = makeChapter('outcome','07','成果と振り返り',config.outcome);
  const outcomeArtifact = originalSections.find(section => section.id === config.outcome.legacyId);
  if (outcomeArtifact) {
    outcomeArtifact.removeAttribute('id');
    outcomeArtifact.classList.add('v2-legacy-section');
    outcomeArtifact.insertBefore(makeArtifactLead('リリース後に確認できた事実と、まだ検証できていない効果を分けて整理しました。'), outcomeArtifact.firstChild);
    outcomeArtifact.appendChild(makeArtifactCaption('リリース後に確認できた事実と、今後継続して検証する指標。'));
    outcome.appendChild(outcomeArtifact);
  }

  const reflection = makeChapter('reflection','08','振り返り',config.reflection);
  const reflectionProse = document.createElement('div');
  reflectionProse.className = 'v2-reflection-prose';
  reflectionProse.innerHTML = config.reflection.paragraphs.map(text => `<p>${text}</p>`).join('');
  reflection.appendChild(reflectionProse);

  [productIntro,overview,problem,goal,alignment,design,release,outcome,reflection].filter(Boolean).forEach(section => main.appendChild(section));

  const tocItems = [
    ['overview','概要'],
    ['goal','プロジェクトの全体像'],
    ['problem','課題'],
    ['discovery','調査と課題整理'],
    ['alignment','重要な洞察'],
    ['release','解決策'],
    ['design-phases','設計原則'],
    ['architecture','情報設計'],
    ['decisions','設計判断と完成UI'],
    ['outcome','成果と振り返り']
  ];
  const tocNav = toc.querySelector('nav');
  if (tocNav) tocNav.innerHTML = tocItems.map(([id,label]) => `<a href="#${id}">${label}</a>`).join('');

  const newTocLinks = [...root.querySelectorAll('.case-toc a[href^="#"]')];
  const syncToc = () => {
    let currentId = 'overview';
    tocItems.forEach(([id]) => {
      const section = root.querySelector(`#${id}`);
      if (section && section.getBoundingClientRect().top <= 190) currentId = id;
    });
    newTocLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('is-active',active);
      if (active) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll',syncToc,{passive:true});
  syncToc();
})();
