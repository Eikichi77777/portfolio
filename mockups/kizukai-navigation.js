(() => {
  const icon = (name) => {
    const paths = {
      report:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h8M8 17h8"/>',
      agent:'<path d="M22 17a2 2 0 0 1-2 2H7l-5 3V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>',
      bookmark:'<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
      book:'<path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
      settings:'<path d="M9.7 4.1a2.3 2.3 0 0 1 4.6 0 2.3 2.3 0 0 0 3.3 1.9 2.3 2.3 0 0 1 2.3 4 2.3 2.3 0 0 0 0 3.9 2.3 2.3 0 0 1-2.3 4 2.3 2.3 0 0 0-3.3 1.9 2.3 2.3 0 0 1-4.6 0 2.3 2.3 0 0 0-3.4-1.9 2.3 2.3 0 0 1-2.3-4 2.3 2.3 0 0 0 0-3.9 2.3 2.3 0 0 1 2.3-4 2.3 2.3 0 0 0 3.4-1.9"/><circle cx="12" cy="12" r="3"/>',
      users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
      account:'<circle cx="9" cy="7" r="3.5"/><path d="M2.5 20v-1.5a6.5 6.5 0 0 1 13 0V20M17 8h5M19.5 5.5v5"/>',
      data:'<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"/>',
      master:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
      bot:'<rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 3v4M9 13h.01M15 13h.01M9 17h6"/>',
      chart:'<path d="M4 20V4M4 20h17"/><path d="M8 16v-4M13 16V8M18 16V5"/>',
      info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
      down:'<path d="m6 9 6 6 6-6"/>'
    };
    const modifiers = `${name === 'info' ? ' sm' : ''}${name === 'down' ? ' chevron' : ''}`;
    return `<svg class="icon${modifiers}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
  };

  const mount = () => {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar || sidebar.dataset.sharedNavigation) return;
    const page = location.pathname;
    const isReports = sidebar.dataset.navigationContext === 'reports';
    const isReportMaster = isReports && page.includes('report-master');
    const isReportActive = isReports && !isReportMaster;
    const isGroups = !isReports && page.includes('access-groups');
    const isQuality = !isReports && page.includes('quality');
    const knowledgeListActive = !isGroups && !isQuality;
    const accountName = isReports ? '永吉 佑介' : '佐藤 直子';
    const accountEmail = isReports ? 'yusuke.nagayoshi@kizukai...' : 'naoko.sato@example.com';
    const accountInitial = isReports ? '永' : '佐';
    sidebar.dataset.sharedNavigation = 'true';
    sidebar.innerHTML = `
      <a class="brand" href="#"><span class="brand-mark">Ki</span><span class="wordmark">KiZUKAI</span></a>
      <div class="nav-label">メインメニュー</div>
      <nav class="nav-list">
        <a class="nav-item${isReportActive ? ' active' : ''}">${icon('report')}レポート</a>
        <a class="nav-item">${icon('agent')}エージェント</a>
        <a class="nav-item">${icon('bookmark')}ブックマーク</a>
        <div class="nav-item">${icon('book')}ナレッジ${icon('down')}</div>
        ${isReports || isGroups ? '' : `<div class="subnav"><a class="nav-item${knowledgeListActive ? ' active' : ''}">${icon('book')}ナレッジ一覧</a><a class="nav-item${isQuality ? ' active' : ''}">${icon('book')}品質管理</a></div>`}
      </nav>
      <div class="settings">
        <div class="nav-label">設定</div>
        <div class="nav-item">${icon('settings')}設定${icon('down')}</div>
        ${isGroups || isReportMaster ? `<div class="subnav"><a class="nav-item${isGroups ? ' active' : ''}">${icon('users')}グループ管理</a><a class="nav-item">${icon('account')}アカウント管理</a><a class="nav-item">${icon('data')}データ管理</a><a class="nav-item${isReportMaster ? ' active' : ''}">${icon('master')}レポートマスター設定</a><a class="nav-item">${icon('bot')}エージェント設定</a><a class="nav-item">${icon('chart')}利用状況</a></div>` : ''}
      </div>
      <div class="help">${icon('info')}機能でお困りの方はこちら</div>
      <div class="account"><div class="avatar">${accountInitial}</div><div class="account-copy"><strong>${accountName}</strong><span>${accountEmail}</span></div>${icon('down')}</div>`;
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
  window.KiZUKAINavigation = { mount };
})();
