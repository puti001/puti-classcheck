/**
 * Puti Classroomscreen - Complete 28-Widget Flagship Library
 * Covering all Classroomscreen widgets + Exquisite Giant 3D Dice/Coin,
 * Homework Contact Book, Quick Buzzer, and Font-Scale Systems.
 */

// Global Helper to open Giant QR Code Lightbox
window.openQRLightbox = (title, url, desc) => {
  const modal = document.getElementById('qr-lightbox-modal');
  const titleEl = document.getElementById('qr-lightbox-title');
  const imgBox = document.getElementById('qr-lightbox-img');
  const descEl = document.getElementById('qr-lightbox-desc');
  const closeBtn = document.getElementById('qr-lightbox-close');

  titleEl.textContent = title || '📱 學生掃碼連線';
  descEl.textContent = desc || '請拿出平板或手機相機對準條碼掃描';
  imgBox.innerHTML = '';

  if (typeof QRCode !== 'undefined') {
    try {
      new QRCode(imgBox, { text: url, width: 260, height: 260, colorDark: "#1A202C", colorLight: "#FFFFFF", correctLevel: QRCode.CorrectLevel.H });
    } catch(e) {
      imgBox.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(url)}" width="260" height="260">`;
    }
  } else {
    imgBox.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(url)}" width="260" height="260">`;
  }

  modal.classList.add('show');
  const close = () => modal.classList.remove('show');
  closeBtn.onclick = close;
  modal.onclick = (e) => { if (e.target === modal) close(); };
};

// =========================================================================
// Puti-AI Universal Zhuyin Engine (繁體中文通用注音與排版引擎)
// =========================================================================
window.PutiZhuyin = {
  pinyinToZhuyin(rawPinyin) {
    if (!rawPinyin) return '';
    let p = rawPinyin.toLowerCase();

    // 1. 抓取聲調
    let tone = '';
    if (/[āēīōūǖ]/.test(p)) tone = '';
    else if (/[áéíóúǘ]/.test(p)) tone = 'ˊ';
    else if (/[ǎěǐǒǔǚ]/.test(p)) tone = 'ˇ';
    else if (/[àèìòùǜ]/.test(p)) tone = 'ˋ';
    else if (/[1-5]/.test(p)) {
      const m = p.match(/([1-5])/);
      const num = m ? m[1] : '';
      tone = num === '1' ? '' : num === '2' ? 'ˊ' : num === '3' ? 'ˇ' : num === '4' ? 'ˋ' : '˙';
      p = p.replace(/[1-5]/g, '');
    }

    // 2. 還原為無聲調字母
    p = p.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ü/g, 'v');

    // 特殊整音直接轉換
    const wholeMap = {
      'zhi': 'ㄓ', 'chi': 'ㄔ', 'shi': 'ㄕ', 'ri': 'ㄖ',
      'zi': 'ㄗ', 'ci': 'ㄘ', 'si': 'ㄙ',
      'yi': 'ㄧ', 'wu': 'ㄨ', 'yu': 'ㄩ',
      'ye': 'ㄧㄝ', 'yue': 'ㄩㄝ', 'yuan': 'ㄩㄢ',
      'yin': 'ㄧㄣ', 'yun': 'ㄩㄣ', 'ying': 'ㄧㄥ'
    };
    if (wholeMap[p]) return wholeMap[p] + tone;

    // 3. 聲母表 (長者優先)
    const initials = [
      ['zh', 'ㄓ'], ['ch', 'ㄔ'], ['sh', 'ㄕ'],
      ['b', 'ㄅ'], ['p', 'ㄆ'], ['m', 'ㄇ'], ['f', 'ㄈ'],
      ['d', 'ㄉ'], ['t', 'ㄊ'], ['n', 'ㄋ'], ['l', 'ㄌ'],
      ['g', 'ㄍ'], ['k', 'ㄎ'], ['h', 'ㄏ'],
      ['j', 'ㄐ'], ['q', 'ㄑ'], ['x', 'ㄒ'],
      ['r', 'ㄖ'], ['z', 'ㄗ'], ['c', 'ㄘ'], ['s', 'ㄙ'],
      ['w', 'ㄨ'], ['y', 'ㄧ']
    ];

    let initZh = '';
    let finalPart = p;
    for (const [ini, zh] of initials) {
      if (p.startsWith(ini)) {
        initZh = zh;
        finalPart = p.substring(ini.length);
        break;
      }
    }

    // 4. 韻母表 (長者優先)
    const finals = [
      ['iang', 'ㄧㄤ'], ['iong', 'ㄩㄥ'], ['uang', 'ㄨㄤ'],
      ['ang', 'ㄤ'], ['eng', 'ㄥ'], ['ing', 'ㄧㄥ'], ['ong', 'ㄨㄥ'],
      ['ian', 'ㄧㄢ'], ['iao', 'ㄧㄠ'], ['uai', 'ㄨㄞ'], ['uan', 'ㄨㄢ'],
      ['van', 'ㄩㄢ'], ['uen', 'ㄨㄣ'],
      ['ai', 'ㄞ'], ['ei', 'ㄟ'], ['ao', 'ㄠ'], ['ou', 'ㄡ'],
      ['an', 'ㄢ'], ['en', 'ㄣ'], ['in', 'ㄧㄣ'], ['un', 'ㄨㄣ'],
      ['vn', 'ㄩㄣ'], ['ia', 'ㄧㄚ'], ['ie', 'ㄧㄝ'], ['ua', 'ㄨㄚ'],
      ['uo', 'ㄨㄛ'], ['ve', 'ㄩㄝ'], ['ue', 'ㄩㄝ'], ['ui', 'ㄨㄟ'],
      ['iu', 'ㄧㄡ'],
      ['a', 'ㄚ'], ['o', 'ㄛ'], ['e', 'ㄜ'], ['i', 'ㄧ'],
      ['u', 'ㄨ'], ['v', 'ㄩ'], ['er', 'ㄦ']
    ];

    let finalZh = '';
    for (const [fin, zh] of finals) {
      if (finalPart === fin) {
        finalZh = zh;
        break;
      }
    }

    if (!initZh && !finalZh) return p + tone;
    return initZh + finalZh + tone;
  },

  textToRubyHtml(text) {
    if (!text) return '';
    if (typeof pinyinPro === 'undefined' || !pinyinPro.pinyin) {
      // 降級純文字
      return text.replace(/\n/g, '<br>');
    }
    try {
      const items = pinyinPro.pinyin(text, { type: 'all' });
      return items.map(item => {
        const char = item.origin;
        if (!item.pinyin || !char.trim()) {
          return char === '\n' ? '<br>' : `<span class="zy-plain">${char}</span>`;
        }
        const zhuyin = this.pinyinToZhuyin(item.pinyin);
        let tone = '';
        let letters = '';
        for (const ch of zhuyin) {
          if ('ˊˇˋ˙'.includes(ch)) {
            tone = ch;
          } else {
            letters += ch;
          }
        }
        const lettersHtml = Array.from(letters).map(s => `<span class="zy-letter">${s}</span>`).join('');
        const topToneHtml = tone === '˙' ? '<span class="zy-top-tone">˙</span>' : '';
        const toneClass = tone === 'ˊ' ? 'tone-2' : tone === 'ˇ' ? 'tone-3' : tone === 'ˋ' ? 'tone-4' : '';
        const sideToneHtml = (tone && tone !== '˙') ? `<span class="zy-side-tone ${toneClass}">${tone}</span>` : '';
        return `<ruby class="zy-box"><rb class="zy-char">${char}</rb><rt class="zy-rt">${topToneHtml}<div class="zy-body"><div class="zy-letters">${lettersHtml}</div>${sideToneHtml}</div></rt></ruby>`;
      }).join('');
    } catch (e) {
      console.warn('Zhuyin parse error:', e);
      return text.replace(/\n/g, '<br>');
    }
  }
};

const ClassroomWidgets = {
  // Registry metadata for the "More Tools" drawer/modal
  registry: [
    { id: 'attendance', category: 'admin', name: '課堂點名簿', icon: 'fa-user-check', color: '#10B981', desc: '全班出勤點名、一鍵全到復原、假別標記、複製LINE出勤日報' },
    { id: 'homework-check', category: 'admin', name: '作業收發通', icon: 'fa-box-archive', color: '#F59E0B', desc: '各科作業繳交點收、一鍵全收復原、進度百分比、複製未交催繳清單' },
    { id: 'seating', category: 'admin', name: '班級座位表', icon: 'fa-border-all', color: '#3B82F6', desc: '班級座位排定、支援拖曳對調、點選對調、欄數切換與前後翻轉，支援拖曳縮放' },
    { id: 'contact', category: 'admin', name: '家庭聯絡簿', icon: 'fa-book-open-reader', color: '#3A86FF', desc: '每日各科作業清單、自訂快捷標籤、字級放大、一鍵複製LINE格式' },
    { id: 'timetable', category: 'admin', name: '班級功課表', icon: 'fa-calendar-week', color: '#8B5CF6', desc: '週一至週五課堂科目表、當日課程自動高亮、課前預備提醒' },
    { id: 'user-guide', category: 'admin', name: '使用說明', icon: 'fa-circle-question', color: '#2563EB', desc: '點名作業通使用指南與班務小技巧' }
  ],

      // =========================================================================
  // 家庭聯絡簿 (Homework & Contact Book) - 使用者自由自訂項目、動態增減與登記繳交連動
  // =========================================================================
  spawnContactBook(wm) {
    let activeClass = 'default';
    try {
      const classData = JSON.parse(localStorage.getItem('puti_classes_data'));
      if (classData && classData.activeId) activeClass = classData.activeId;
    } catch(e){}

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    let currentDate = localStorage.getItem('puti_active_contact_date') || todayStr;

    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    const getContactStorageKey = (d) => `puti_contact_${activeClass}_${d}`;

    // 載入資料（相容舊版 chinese/math/english/other，並轉為動態項目陣列）
    const loadContactData = (d) => {
      let raw = JSON.parse(localStorage.getItem(getContactStorageKey(d)) || 'null');
      if (!raw && d === todayStr) {
        raw = JSON.parse(localStorage.getItem('puti_hw_data') || 'null');
      }

      const defaultItems = [
        { id: 'item_1', title: '作業1', content: '' },
        { id: 'item_2', title: '作業2', content: '' },
        { id: 'item_3', title: '作業3', content: '' },
        { id: 'item_4', title: '攜帶物品', content: '' }
      ];

      if (!raw) {
        return {
          items: defaultItems.map(it => ({ ...it, id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4) })),
          memo: ''
        };
      }

      // Convert legacy object format if needed
      if (!Array.isArray(raw.items)) {
        const converted = [];
        if (raw.chinese !== undefined) converted.push({ id: 'item_1', title: '作業1', content: raw.chinese || '' });
        if (raw.math !== undefined) converted.push({ id: 'item_2', title: '作業2', content: raw.math || '' });
        if (raw.english !== undefined) converted.push({ id: 'item_3', title: '作業3', content: raw.english || '' });
        if (raw.other !== undefined) converted.push({ id: 'item_4', title: '攜帶物品', content: raw.other || '' });
        raw = {
          items: converted.length > 0 ? converted : defaultItems,
          memo: raw.memo || ''
        };
      }

      // Force sanitize any leftover subject names in user's localStorage
      if (Array.isArray(raw.items)) {
        raw.items.forEach((it, idx) => {
          if (!it.title || it.title === '國語作業' || it.title.includes('國語')) it.title = '作業1';
          else if (it.title === '數學校訂' || it.title.includes('數學')) it.title = '作業2';
          else if (it.title === '英語專科' || it.title.includes('英語')) it.title = '作業3';
          else if (it.title.includes('攜帶') || it.title.includes('物品')) it.title = '攜帶物品';
        });
      }

      return raw;
    };

    let contactData = loadContactData(currentDate);

    const defaultTags = ['國習 P.', '數習 P.', '社習 P.', '攜帶美勞用具', '發下成績單', '簽名回條', '明日聽寫考', '帶彩色筆', '體育服裝', '帶剪刀膠水'];
    let customTags = JSON.parse(localStorage.getItem('puti_hw_custom_tags') || '[]');

    let fontSize = 1.05;
    let isZhuyin = localStorage.getItem('puti_hw_zhuyin') === 'true';

    const content = `
      <div class="homework-container" style="display: flex; flex-direction: column; height: 100%; gap: 6px; user-select: none;">
        <!-- Header & Date Toolbar -->
        <div class="hw-header-bar" style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; padding: 6px 10px; border-radius: 12px; border: 1.5px solid #E2E8F0; gap: 6px; flex-wrap: wrap;">
          <div class="hw-title-group" style="display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-book-open-reader" style="color: #3A86FF;"></i>
            <span style="font-weight: 900; font-size: 0.95rem; color: #1E293B;">家庭聯絡簿</span>
            <input type="date" id="contact-date-picker" value="${currentDate}"
              style="padding: 2px 6px; border-radius: 6px; border: 1.5px solid #CBD5E1; font-weight: 800; color: #334155; font-size: 0.82rem; outline: none; background: #FFF; cursor: pointer;">
            <span id="contact-day-str" style="font-size: 0.8rem; color: #64748B; font-weight: 800;"></span>
          </div>
          <div style="display: flex; gap: 6px; align-items: center;">
            <button class="scale-btn" id="hw-zhuyin-btn" style="font-size: 0.74rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; border: 1.5px solid ${isZhuyin ? '#8B5CF6' : '#CBD5E1'}; color: ${isZhuyin ? '#6D28D9' : '#64748B'}; background: ${isZhuyin ? '#F5F3FF' : '#FFF'}; cursor: pointer;" title="切換注音模式">
              ㄅ 注音模式
            </button>
            <div class="font-scale-controls">
              <button class="font-scale-btn" id="hw-font-minus" title="縮小字體">A-</button>
              <button class="font-scale-btn" id="hw-font-reset" title="重置字體">A</button>
              <button class="font-scale-btn" id="hw-font-plus" title="放大字體">A+</button>
            </div>
            <button class="action-btn-secondary" id="hw-copy-btn" style="height: 28px; padding: 0 8px; font-size: 0.78rem;" title="複製文字貼至 LINE 群組">
              <i class="fa-solid fa-copy"></i> LINE 複製
            </button>
          </div>
        </div>

        <!-- Quick Snippet Tags Bar -->
        <div class="hw-quick-tags-bar" style="display: flex; flex-wrap: wrap; gap: 5px; margin: 2px 0 4px 0; background: #FFF9DB; padding: 6px; border-radius: 10px; border: 1px dashed #FFE066;">
          <div id="hw-tags-container" style="display: flex; flex-wrap: wrap; gap: 5px; align-items: center;"></div>
          <button type="button" class="action-btn-secondary" id="hw-add-tag-btn" style="height: 24px; font-size: 0.72rem; padding: 0 8px; border-style: dashed;" title="新增自訂聯絡簿標籤">
            <i class="fa-solid fa-plus"></i> 新標籤
          </button>
        </div>

        <!-- Dynamic Customizable Items List -->
        <div class="hw-fields-list" id="hw-dynamic-items-list" style="flex: 1; display: flex; flex-direction: column; gap: 8px; overflow-y: auto; padding: 2px;">
          <!-- Generated Dynamically -->
        </div>

        <!-- Action Bar: Add Item + Memo Section -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 2px;">
          <button type="button" class="action-btn-secondary" id="contact-add-item-btn" style="height: 28px; font-size: 0.78rem; font-weight: 800; color: #2563EB; border-color: #93C5FD; background: #EFF6FF; border-style: dashed;" title="新增一列聯絡簿項目">
            <i class="fa-solid fa-plus"></i> 新增聯絡簿項目
          </button>
          <span style="font-size: 0.72rem; color: #64748B;">💡 每一項作業與攜帶物品皆可點擊【登記繳交】進入作業收發通！</span>
        </div>

        <!-- Important Memo Section -->
        <div class="hw-field-card" style="background: #FFFDF5; border: 1.5px solid #FDE68A; border-radius: 12px; padding: 6px 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <span style="font-weight: 800; font-size: 0.82rem; color: #B45309; display: flex; align-items: center; gap: 5px;">
              <i class="fa-solid fa-bell"></i> 重要叮嚀 / 備忘事項
            </span>
          </div>
          <input type="text" id="contact-memo-input" value="${contactData.memo || ''}" placeholder="明日生活叮嚀、校園作息公告或活動通知..." style="width: 100%; border: 1.5px solid #FCD34D; border-radius: 8px; padding: 5px 10px; font-size: 0.95rem; outline: none; box-sizing: border-box; background: #FFF;">
          <div id="contact-memo-zy" class="hw-zhuyin-view" style="display: none; padding: 5px; border: 1.5px solid #FDE68A; border-radius: 8px; background: #FFFBEB; min-height: 34px;"></div>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '家庭聯絡簿',
      icon: 'fa-book-open-reader',
      width: 600,
      height: 560,
      type: 'contact',
      contentHtml: content,
      onInit: (el, winInstance) => {
        const datePicker = el.querySelector('#contact-date-picker');
        const dayStrEl = el.querySelector('#contact-day-str');
        const zhuyinBtn = el.querySelector('#hw-zhuyin-btn');
        const fontMinus = el.querySelector('#hw-font-minus');
        const fontReset = el.querySelector('#hw-font-reset');
        const fontPlus = el.querySelector('#hw-font-plus');
        const copyBtn = el.querySelector('#hw-copy-btn');
        const addTagBtn = el.querySelector('#hw-add-tag-btn');
        const tagsContainer = el.querySelector('#hw-tags-container');
        const itemsContainer = el.querySelector('#hw-dynamic-items-list');
        const addItemBtn = el.querySelector('#contact-add-item-btn');
        const memoInput = el.querySelector('#contact-memo-input');
        const memoZy = el.querySelector('#contact-memo-zy');

        let lastFocusedInput = null;

        const updateDayString = () => {
          const dObj = new Date(currentDate);
          if (!isNaN(dObj.getTime())) {
            dayStrEl.textContent = `(${days[dObj.getDay()]})`;
          }
        };
        updateDayString();

        const save = () => {
          contactData.memo = memoInput.value.trim();
          localStorage.setItem(getContactStorageKey(currentDate), JSON.stringify(contactData));
          localStorage.setItem('puti_active_contact_date', currentDate);

          // Legacy sync for today
          if (currentDate === todayStr) {
            const legacy = {
              chinese: (contactData.items[0] && contactData.items[0].content) || '',
              math: (contactData.items[1] && contactData.items[1].content) || '',
              english: (contactData.items[2] && contactData.items[2].content) || '',
              other: (contactData.items[3] && contactData.items[3].content) || '',
              memo: contactData.memo
            };
            localStorage.setItem('puti_hw_data', JSON.stringify(legacy));
          }

          if (isZhuyin) updateAllZhuyin();
        };

        const updateAllZhuyin = () => {
          if (!window.PutiZhuyin) return;
          // Memo
          if (memoInput.value.trim()) {
            memoZy.innerHTML = window.PutiZhuyin.textToRubyHtml(memoInput.value.trim());
          } else {
            memoZy.innerHTML = '<span style="color: #94A3B8; font-style: italic;">(未填寫)</span>';
          }
          // Dynamic items
          itemsContainer.querySelectorAll('.hw-item-row').forEach(row => {
            const input = row.querySelector('.hw-item-input');
            const zy = row.querySelector('.hw-item-zy');
            if (input && zy) {
              const val = input.value.trim();
              zy.innerHTML = val ? window.PutiZhuyin.textToRubyHtml(val) : '<span style="color: #94A3B8; font-style: italic;">(未填寫)</span>';
            }
          });
        };

        const applyZhuyinDisplay = () => {
          zhuyinBtn.style.border = isZhuyin ? '1.5px solid #8B5CF6' : '1.5px solid #CBD5E1';
          zhuyinBtn.style.color = isZhuyin ? '#6D28D9' : '#64748B';
          zhuyinBtn.style.background = isZhuyin ? '#F5F3FF' : '#FFF';
          zhuyinBtn.innerHTML = isZhuyin ? '<i class="fa-solid fa-check"></i> ㄅ 注音中' : 'ㄅ 注音模式';

          if (isZhuyin) {
            updateAllZhuyin();
            memoInput.style.display = 'none';
            memoZy.style.display = 'block';
            itemsContainer.querySelectorAll('.hw-item-input').forEach(i => i.style.display = 'none');
            itemsContainer.querySelectorAll('.hw-item-zy').forEach(z => z.style.display = 'flex');
          } else {
            memoZy.style.display = 'none';
            memoInput.style.display = 'block';
            itemsContainer.querySelectorAll('.hw-item-zy').forEach(z => z.style.display = 'none');
            itemsContainer.querySelectorAll('.hw-item-input').forEach(i => i.style.display = 'block');
          }
        };

        const renderItems = () => {
          itemsContainer.innerHTML = contactData.items.map((item, idx) => {
            const isCarry = item.title.includes('攜帶') || item.title.includes('物品');
            const accentColor = isCarry ? '#D97706' : '#2563EB';
            const iconClass = isCarry ? 'fa-bag-shopping' : 'fa-pen-to-square';
            const placeholder = isCarry ? '請輸入攜帶物品 (例：彩色筆、美勞剪刀、回條)' : `請輸入 ${item.title} 內容 (例：習作第 42~45 頁)`;

            return `
              <div class="hw-item-row" data-id="${item.id}" style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: 12px; padding: 7px 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; gap: 6px;">
                  <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
                    <i class="fa-solid ${iconClass}" style="color: ${accentColor}; font-size: 0.85rem;"></i>
                    <input type="text" class="hw-item-title-input" value="${item.title}" title="可點擊修改項目名稱"
                      style="font-weight: 800; font-size: 0.84rem; color: ${accentColor}; border: 1px dashed transparent; border-radius: 4px; padding: 1px 4px; background: transparent; outline: none; width: 110px;"
                      onfocus="this.style.borderColor='#CBD5E1'; this.style.background='#FFF';"
                      onblur="this.style.borderColor='transparent'; this.style.background='transparent';">
                  </div>
                  <div style="display: flex; gap: 4px; align-items: center;">
                    <button type="button" class="contact-hw-link-btn" data-id="${item.id}"
                      style="height: 24px; padding: 0 8px; font-size: 0.72rem; border-radius: 6px; background: #FFF7ED; border: 1.2px solid #FDBA74; color: #C2410C; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;" title="呼叫作業收發通，登記此項目的繳交情形">
                      <i class="fa-solid fa-box-archive"></i> 登記繳交
                    </button>
                    ${contactData.items.length > 1 ? `
                      <button type="button" class="contact-hw-del-btn" data-id="${item.id}"
                        style="height: 24px; width: 24px; border-radius: 6px; background: transparent; border: 1px solid #FECDD3; color: #E11D48; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-size: 0.72rem;" title="刪除此項目">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    ` : ''}
                  </div>
                </div>
                <input type="text" class="hw-item-input" value="${item.content || ''}" placeholder="${placeholder}"
                  style="width: 100%; border: 1.5px solid #CBD5E1; border-radius: 8px; padding: 6px 10px; font-size: ${fontSize}rem; outline: none; box-sizing: border-box;">
                <div class="hw-item-zy hw-zhuyin-view" style="display: none; padding: 6px; border: 1.5px solid #E2E8F0; border-radius: 8px; background: #F8FAFC; min-height: 38px;"></div>
              </div>
            `;
          }).join('');

          // 綁定輸入與焦點
          itemsContainer.querySelectorAll('.hw-item-row').forEach(row => {
            const id = row.getAttribute('data-id');
            const it = contactData.items.find(x => x.id === id);
            const titleInput = row.querySelector('.hw-item-title-input');
            const contentInput = row.querySelector('.hw-item-input');
            const zyView = row.querySelector('.hw-item-zy');
            const linkBtn = row.querySelector('.contact-hw-link-btn');
            const delBtn = row.querySelector('.contact-hw-del-btn');

            if (titleInput && it) {
              titleInput.addEventListener('input', () => {
                it.title = titleInput.value.trim() || '自訂項目';
                save();
              });
            }

            if (contentInput && it) {
              contentInput.addEventListener('focus', () => {
                lastFocusedInput = contentInput;
                contentInput.style.borderColor = '#3A86FF';
                contentInput.style.boxShadow = '0 0 0 2px rgba(58, 134, 255, 0.2)';
              });
              contentInput.addEventListener('blur', () => {
                contentInput.style.borderColor = '';
                contentInput.style.boxShadow = '';
                if (isZhuyin) {
                  updateAllZhuyin();
                  contentInput.style.display = 'none';
                  zyView.style.display = 'flex';
                }
              });
              contentInput.addEventListener('input', () => {
                it.content = contentInput.value.trim();
                save();
              });
            }

            if (zyView && contentInput) {
              zyView.addEventListener('click', () => {
                zyView.style.display = 'none';
                contentInput.style.display = 'block';
                contentInput.focus();
                window.soundEngine.playTick();
              });
            }

            // 登記繳交連動按鈕
            if (linkBtn && it) {
              linkBtn.addEventListener('click', () => {
                const text = (it.content && it.content.trim()) ? it.content.trim() : it.title;

                // 呼叫作業收發通，傳入日期與該項目的完整作業名稱
                ClassroomWidgets.spawnHomeworkCheck(wm, {
                  date: currentDate,
                  subject: text,
                  title: it.title
                });

                if (window.soundEngine && typeof window.soundEngine.playPop === 'function') {
                  window.soundEngine.playPop();
                }
              });
            }

            // 刪除項目按鈕
            if (delBtn) {
              delBtn.addEventListener('click', () => {
                const idx = contactData.items.findIndex(x => x.id === id);
                if (idx !== -1) {
                  contactData.items.splice(idx, 1);
                  save();
                  renderItems();
                  if (window.soundEngine) window.soundEngine.playTick();
                }
              });
            }
          });

          if (!lastFocusedInput) {
            const firstInput = itemsContainer.querySelector('.hw-item-input');
            if (firstInput) lastFocusedInput = firstInput;
          }

          if (isZhuyin) applyZhuyinDisplay();
        };

        // 新增自訂項目按鈕
        addItemBtn.addEventListener('click', () => {
          let maxNum = 0;
          contactData.items.forEach(it => {
            const m = it.title.match(/^作業(\d+)$/);
            if (m) {
              const num = parseInt(m[1], 10);
              if (num > maxNum) maxNum = num;
            }
          });
          const nextNum = Math.max(contactData.items.filter(x => x.title.startsWith('作業')).length + 1, maxNum + 1);
          const newItem = {
            id: 'item_' + Date.now(),
            title: `作業${nextNum}`,
            content: ''
          };
          contactData.items.push(newItem);
          save();
          renderItems();
          if (window.soundEngine) window.soundEngine.playPop();

          setTimeout(() => {
            const newRow = itemsContainer.querySelector(`[data-id="${newItem.id}"] .hw-item-input`);
            if (newRow) newRow.focus();
          }, 50);
        });

        // 叮嚀備忘事件
        memoInput.addEventListener('focus', () => { lastFocusedInput = memoInput; });
        memoInput.addEventListener('input', save);
        memoInput.addEventListener('blur', () => {
          if (isZhuyin) {
            updateAllZhuyin();
            memoInput.style.display = 'none';
            memoZy.style.display = 'block';
          }
        });
        memoZy.addEventListener('click', () => {
          memoZy.style.display = 'none';
          memoInput.style.display = 'block';
          memoInput.focus();
        });

        // 日期切換
        datePicker.addEventListener('change', (e) => {
          currentDate = e.target.value;
          localStorage.setItem('puti_active_contact_date', currentDate);
          updateDayString();
          contactData = loadContactData(currentDate);
          memoInput.value = contactData.memo || '';
          renderItems();
        });

        // 注音切換
        zhuyinBtn.addEventListener('click', () => {
          isZhuyin = !isZhuyin;
          localStorage.setItem('puti_hw_zhuyin', isZhuyin);
          applyZhuyinDisplay();
          window.soundEngine.playPop();
        });

        // 標籤快速填入
        const renderTags = () => {
          tagsContainer.innerHTML = '';
          defaultTags.forEach(tag => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'hw-tag-chip';
            btn.textContent = '+ ' + tag;
            btn.style.cssText = 'height: 24px; font-size: 0.72rem; padding: 0 8px; border-radius: 999px; background: #FFF; border: 1px solid #CBD5E1; cursor: pointer; color: #475569; font-weight: 700;';
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              const target = lastFocusedInput || itemsContainer.querySelector('.hw-item-input') || memoInput;
              if (target) {
                const cur = target.value;
                target.value = cur ? cur + ' ' + tag : tag;
                target.dispatchEvent(new Event('input'));
                target.focus();
              }
            });
            tagsContainer.appendChild(btn);
          });
        };
        renderTags();

        // 字級縮放
        fontPlus.addEventListener('click', () => {
          fontSize = Math.min(1.4, fontSize + 0.1);
          el.querySelectorAll('.hw-item-input, .hw-zhuyin-view, #contact-memo-input').forEach(i => i.style.fontSize = fontSize + 'rem');
        });
        fontMinus.addEventListener('click', () => {
          fontSize = Math.max(0.85, fontSize - 0.1);
          el.querySelectorAll('.hw-item-input, .hw-zhuyin-view, #contact-memo-input').forEach(i => i.style.fontSize = fontSize + 'rem');
        });
        fontReset.addEventListener('click', () => {
          fontSize = 1.05;
          el.querySelectorAll('.hw-item-input, .hw-zhuyin-view, #contact-memo-input').forEach(i => i.style.fontSize = fontSize + 'rem');
        });

        // 複製 LINE
        copyBtn.addEventListener('click', () => {
          let text = `【家庭聯絡簿】${currentDate} ${dayStrEl.textContent}\n`;
          contactData.items.forEach((it, idx) => {
            if (it.content && it.content.trim()) {
              text += `${idx + 1}. ${it.title}：${it.content.trim()}\n`;
            }
          });
          if (memoInput.value.trim()) {
            text += `⭐ 重要叮嚀：${memoInput.value.trim()}\n`;
          }

          navigator.clipboard.writeText(text).then(() => {
            alert('📋 家庭聯絡簿內容已複製至剪貼簿，可直接貼至 LINE 家長群！\n\n' + text);
          }).catch(() => {
            prompt('請手動複製聯絡簿內容：', text);
          });
        });

        renderItems();
        if (isZhuyin) applyZhuyinDisplay();
      }
    });
  },
  spawnBuzzer(wm) {
    let buzzerState = 'STANDBY'; // 'STANDBY' | 'ACTIVE' | 'LOCKED'
    let buzzStartTime = 0;
    let buzzHistory = [];
    let buzzFontSize = 1.0; // rem

    const teams = [
      { id: 1, name: '第一組', key: '1', color: '#E63946' },
      { id: 2, name: '第二組', key: '2', color: '#3A86FF' },
      { id: 3, name: '第三組', key: '3', color: '#2EC4B6' },
      { id: 4, name: '第四組', key: '4', color: '#FF9F1C' }
    ];

    const getRoom = () => window.realtimeEngine ? window.realtimeEngine.room : (localStorage.getItem('puti_classroom_room') || 'C1000');

    const content = `
      <div class="buzzer-container" style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <!-- Top Control Bar (Room Code + Font Scale) -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #F8F9FA; padding: 6px 10px; border-radius: 10px; border: 1px solid #E9ECEF; flex-wrap: wrap; gap: 4px;">
          <!-- Room Code Info & Change Button -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 0.74rem; font-weight: 800; color: #495057;">
              <i class="fa-solid fa-tower-broadcast" style="color: #FF7B00;"></i> 教室代碼: <strong id="buzz-room-label" style="color: #E8590C; font-family: var(--font-num);">${getRoom()}</strong>
            </span>
            <button type="button" class="action-btn-secondary" id="buzz-change-room-btn" style="height: 22px; padding: 0 6px; font-size: 0.68rem;" title="更換教室房間代碼（全國各班獨立隔離，不互相干擾）">
              <i class="fa-solid fa-arrows-rotate"></i> 換代碼
            </button>
          </div>

          <!-- Font Scale Controls (使用者要求：字體放大功能) -->
          <div class="font-scale-controls" style="display: flex; gap: 3px; align-items: center;">
            <span style="font-size: 0.72rem; color: #718096; font-weight: bold;"><i class="fa-solid fa-text-height"></i> 字級:</span>
            <button type="button" class="font-scale-btn" id="buzz-font-minus" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="縮小搶答字級">A-</button>
            <button type="button" class="font-scale-btn" id="buzz-font-reset" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="預設字級">A</button>
            <button type="button" class="font-scale-btn" id="buzz-font-plus" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="放大搶答字級">A+</button>
          </div>
        </div>

        <!-- Status Banner -->
        <div class="buzzer-status-banner" id="buzz-banner" style="background: #FFF9DB; color: #D9480F; border: 1.5px solid #FFE066; border-radius: 12px; padding: 10px; text-align: center; font-weight: 800; font-size: 0.95rem; transition: all 0.2s ease;">
          ⏳ 搶答待機中！請老師點擊下方【開始搶答 🔥】（或按空白鍵）發布信號
        </div>

        <!-- 4 Teams On-Screen Quick Buzzer Grid (現場觸控 / 鍵盤 1~4 搶答) -->
        <div style="font-size: 0.72rem; font-weight: 800; color: #718096; display: flex; justify-content: space-between; align-items: center;">
          <span>👉 現場分組卡片搶答（開始後按 1 ~ 4 或觸控點擊；未開始前按將判定偷跑）：</span>
        </div>
        <div class="buzzer-teams-grid" id="buzz-teams-box" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin: 2px 0;">
          ${teams.map(t => `
            <div class="team-buzz-card" data-id="${t.id}" id="buzz-card-${t.id}" style="background: #FFF; border: 2px solid ${t.color}33; border-radius: 12px; padding: 10px 4px; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: all 0.15s ease; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
              <div class="team-buzz-icon" style="font-size: 1.8rem; color: ${t.color}; margin-bottom: 2px;"><i class="fa-solid fa-bell"></i></div>
              <div class="team-buzz-name" style="font-weight: 900; font-size: 0.95rem; color: #2D3748;">${t.name}</div>
              <div class="team-buzz-key-badge" style="font-size: 0.7rem; color: #718096; background: #F1F3F5; padding: 2px 6px; border-radius: 4px; margin-top: 4px; font-weight: bold;">[ 按鍵 ${t.key} ]</div>
            </div>
          `).join('')}
        </div>

        <!-- Live Online Student Buzzers List (線上學生手機搶答榜 Top 3) -->
        <div style="flex: 1; background: #FFFDF9; border: 1.5px solid #FFE8CC; border-radius: 12px; padding: 8px; display: flex; flex-direction: column; overflow-y: auto;">
          <div style="font-size: 0.78rem; font-weight: 800; color: #D9480F; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span><i class="fa-solid fa-trophy"></i> 線上即時搶答榜 (毫秒反應時間)：</span>
            <span id="buzz-online-status" style="font-size: 0.72rem; color: #475569; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-signal" style="color: #10b981;"></i> <span id="buzz-status-desc">等待學生連線...</span> (<strong id="buzz-online-num" style="color: #2563EB;">0</strong> 人已就緒)</span>
          </div>
          <div id="buzz-history-list" style="display: flex; flex-direction: column; gap: 4px; flex: 1;">
            <div style="text-align: center; color: #A0AEC0; font-size: 0.85rem; padding: 16px 0;">尚未有人搶答，點擊「開始搶答」發布訊號</div>
          </div>
        </div>

        <!-- Controls Toolbar -->
        <div style="display: flex; gap: 6px; width: 100%;">
          <button class="action-btn-main" id="buzz-start-btn" style="flex: 1.3; height: 38px; font-size: 0.92rem; background: linear-gradient(135deg, #2B8A3E, #20C997); font-weight: 900;">
            <i class="fa-solid fa-play"></i> 開始搶答 (Space)
          </button>
          <button class="action-btn-secondary" id="buzz-reset-btn" style="flex: 0.9; height: 38px; font-size: 0.88rem;">
            <i class="fa-solid fa-rotate-left"></i> 重置待機
          </button>
          <button class="action-btn-secondary" id="buzz-qr-btn" style="height: 38px; font-size: 0.82rem; padding: 0 12px;" title="放大手機搶答 QR Code">
            <i class="fa-solid fa-qrcode"></i> 手機掃碼
          </button>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '課堂搶答神器',
      icon: 'fa-bell',
      iconColor: '#E63946',
      width: 500,
      height: 480,
      type: 'buzzer',
      contentHtml: content,
      onInit: (el) => {
        const banner = el.querySelector('#buzz-banner');
        const startBtn = el.querySelector('#buzz-start-btn');
        const resetBtn = el.querySelector('#buzz-reset-btn');
        const qrBtn = el.querySelector('#buzz-qr-btn');
        const cards = el.querySelectorAll('.team-buzz-card');
        const historyList = el.querySelector('#buzz-history-list');
        const onlineDesc = el.querySelector('#buzz-status-desc');
        const onlineNum = el.querySelector('#buzz-online-num');
        const connectedStudents = new Set();

        const updateOnlineDisplay = () => {
          if (!onlineNum) return;
          onlineNum.textContent = connectedStudents.size;
          if (connectedStudents.size === 0) {
            if (onlineDesc) onlineDesc.textContent = '等待學生連線...';
          } else {
            if (onlineDesc) onlineDesc.textContent = '學生已連線';
          }
        };
        const roomLabel = el.querySelector('#buzz-room-label');
        const changeRoomBtn = el.querySelector('#buzz-change-room-btn');

        const fontPlusBtn = el.querySelector('#buzz-font-plus');
        const fontMinusBtn = el.querySelector('#buzz-font-minus');
        const fontResetBtn = el.querySelector('#buzz-font-reset');

        let room = getRoom();

        const applyFontSize = () => {
          banner.style.fontSize = (buzzFontSize * 0.95) + 'rem';
          el.querySelectorAll('.team-buzz-name').forEach(nameEl => {
            nameEl.style.fontSize = (buzzFontSize * 0.95) + 'rem';
          });
          el.querySelectorAll('.team-buzz-icon').forEach(iconEl => {
            iconEl.style.fontSize = (buzzFontSize * 1.8) + 'rem';
          });
          renderHistory();
        };

        fontPlusBtn.addEventListener('click', () => {
          buzzFontSize = Math.min(1.8, buzzFontSize + 0.15);
          applyFontSize();
          window.soundEngine.playTick();
        });
        fontMinusBtn.addEventListener('click', () => {
          buzzFontSize = Math.max(0.85, buzzFontSize - 0.15);
          applyFontSize();
          window.soundEngine.playTick();
        });
        fontResetBtn.addEventListener('click', () => {
          buzzFontSize = 1.0;
          applyFontSize();
          window.soundEngine.playPop();
        });

        // Change Room Code
        changeRoomBtn.addEventListener('click', () => {
          const newRoom = prompt('請輸入自訂教室代碼（例如：PUTI601、CLASS2）：', room);
          if (newRoom && newRoom.trim()) {
            room = newRoom.trim().toUpperCase();
            localStorage.setItem('puti_classroom_room', room);
            roomLabel.textContent = room;
            if (window.realtimeEngine) {
              window.realtimeEngine.room = room;
              window.realtimeEngine.initMqtt();
            }
            alert(`教室代碼已變更為【${room}】！學生重新掃碼即可連線。`);
          }
        });

        // Warn for false start (偷跑警告)
        const warnFalseStart = (culprit) => {
          banner.innerHTML = `⚠️ <strong>【${culprit}】偷跑違規！</strong>老師尚未發布「開始搶答」！`;
          banner.style.background = '#FFE3E3';
          banner.style.color = '#C92A2A';
          banner.style.borderColor = '#FFA8A8';
          banner.classList.add('animate-shake');
          setTimeout(() => banner.classList.remove('animate-shake'), 400);
          window.soundEngine.playTick();
        };

        const triggerWinner = (winnerTitle, reactionMs, seatNum = null) => {
          if (buzzerState !== 'ACTIVE') return;
          buzzerState = 'LOCKED';

          banner.innerHTML = `🎉 恭喜【<strong>${winnerTitle}</strong>】第一名搶得回答權！(${reactionMs}s)`;
          banner.style.background = '#EBFBEE';
          banner.style.color = '#2B8A3E';
          banner.style.borderColor = '#69DB7C';

          window.soundEngine.playFanfare();
          if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 70 });

          // Broadcast to mobile devices
          if (window.realtimeEngine) {
            window.realtimeEngine.publish('buzzer/state', {
              type: 'BUZZER_WINNER',
              winner: winnerTitle,
              seat: seatNum
            });
          }
        };

        const renderHistory = () => {
          if (buzzHistory.length === 0) {
            historyList.innerHTML = '<div style="text-align: center; color: #A0AEC0; font-size: 0.85rem; padding: 16px 0;">尚未有人搶答，點擊「開始搶答」發布訊號</div>';
            return;
          }

          historyList.innerHTML = buzzHistory.map((h, idx) => `
            <div style="display: flex; justify-content: space-between; align-items: center; background: ${idx === 0 ? '#FFE8CC' : '#FFF'}; border: 1px solid ${idx === 0 ? '#FF922B' : '#E9ECEF'}; padding: 6px 10px; border-radius: 8px;">
              <div style="font-weight: 800; font-size: ${buzzFontSize * 0.9}rem; color: #2D3748; display: flex; align-items: center; gap: 6px;">
                <span>${idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</span>
                <span>${h.name}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: ${buzzFontSize * 0.85}rem; font-weight: 800; color: #E8590C; font-family: var(--font-num);">${h.reaction}s</span>
                <button type="button" class="buzz-award-btn" data-name="${h.name}" style="background: #2B8A3E; color: white; border: none; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: bold; cursor: pointer;" title="在個人計分器加 1 分">+1分</button>
              </div>
            </div>
          `).join('');

          // Bind award +1 score buttons
          historyList.querySelectorAll('.buzz-award-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const name = btn.getAttribute('data-name');
              const scores = JSON.parse(localStorage.getItem('puti_individual_scores') || '{}');
              scores[name] = (scores[name] || 0) + 1;
              localStorage.setItem('puti_individual_scores', JSON.stringify(scores));
              window.dispatchEvent(new CustomEvent('rosterUpdated'));
              btn.textContent = '已加分✔';
              btn.style.background = '#40C057';
              window.soundEngine.playBell();
            });
          });
        };

        const resetAll = () => {
          buzzerState = 'STANDBY';
          buzzStartTime = 0;
          buzzHistory = [];
          banner.innerHTML = '⏳ 搶答待機中！請老師點擊下方【開始搶答 🔥】（或按空白鍵）發布信號';
          banner.style.background = '#FFF9DB';
          banner.style.color = '#D9480F';
          banner.style.borderColor = '#FFE066';
          cards.forEach(c => {
            c.style.background = '#FFF';
            c.style.borderColor = '';
          });
          renderHistory();

          if (window.realtimeEngine) {
            window.realtimeEngine.publish('buzzer/state', { type: 'BUZZER_STANDBY' });
          }
          window.soundEngine.playTick();
        };

        // Start Buzzer Round (老師發令解鎖)
        const startRound = () => {
          buzzerState = 'ACTIVE';
          buzzStartTime = Date.now();
          buzzHistory = [];
          banner.innerHTML = '🔥 搶答進行中！請立即按下卡片、鍵盤 1~4 或手機按鈕搶答！';
          banner.style.background = '#FFE3E3';
          banner.style.color = '#C92A2A';
          banner.style.borderColor = '#FFA8A8';
          cards.forEach(c => {
            c.style.background = '#FFFDF0';
          });
          renderHistory();

          if (window.realtimeEngine) {
            window.realtimeEngine.publish('buzzer/state', { type: 'BUZZER_START' });
          }
          window.soundEngine.playPop();
        };

        startBtn.addEventListener('click', startRound);
        resetBtn.addEventListener('click', resetAll);

        // QR Code Big
        qrBtn.addEventListener('click', () => {
          const origin = window.location.origin;
          const buzzerUrl = origin + (origin.includes('github.io') ? '/puti-classroomscreen' : '') + '/student-buzzer.html?room=' + room;
          if (typeof window.openQRLightbox === 'function') {
            window.openQRLightbox('📱 學生手機/平板即時搶答端', buzzerUrl, `全班拿出手機對準掃描 (教室代碼: ${room})，秒速搶答！`);
          }
        });

        // Click on team card
        cards.forEach(card => {
          card.addEventListener('click', () => {
            const teamId = card.dataset.id;
            const t = teams.find(item => item.id == teamId);
            if (!t) return;

            if (buzzerState === 'STANDBY') {
              warnFalseStart(t.name);
              return;
            }
            if (buzzerState !== 'ACTIVE') return;

            const reaction = ((Date.now() - buzzStartTime) / 1000).toFixed(2);
            if (!buzzHistory.some(h => h.name === t.name)) {
              buzzHistory.push({ name: t.name, reaction: reaction });
              renderHistory();
            }
            triggerWinner(t.name, reaction);
          });
        });

        // Keyboard triggers: 1, 2, 3, 4 (主鍵盤與數字鍵盤皆支援) + Space to Start
        const keyHandler = (e) => {
          if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

          // Space key triggers Start Buzzer
          if (e.code === 'Space' || e.key === ' ') {
            e.preventDefault();
            if (buzzerState === 'STANDBY') {
              startRound();
            } else if (buzzerState === 'LOCKED') {
              resetAll();
            }
            return;
          }

          const keyMap = {
            '1': 1, 'Numpad1': 1,
            '2': 2, 'Numpad2': 2,
            '3': 3, 'Numpad3': 3,
            '4': 4, 'Numpad4': 4
          };
          const teamId = keyMap[e.key] || keyMap[e.code];
          if (teamId) {
            const t = teams.find(item => item.id == teamId);
            if (t) {
              const card = el.querySelector(`#buzz-card-${teamId}`);
              if (card) {
                card.style.transform = 'scale(0.92)';
                setTimeout(() => { if (card) card.style.transform = ''; }, 160);
              }

              if (buzzerState === 'STANDBY') {
                warnFalseStart(t.name);
                return;
              }
              if (buzzerState !== 'ACTIVE') return;

              const reaction = ((Date.now() - buzzStartTime) / 1000).toFixed(2);
              if (!buzzHistory.some(h => h.name === t.name)) {
                buzzHistory.push({ name: t.name, reaction: reaction });
                renderHistory();
              }
              triggerWinner(t.name, reaction);
            }
          }
        };

        window.addEventListener('keydown', keyHandler);

        // Realtime Listener for Mobile Students
        if (window.realtimeEngine) {
          window.realtimeEngine.subscribe('buzzer/buzz', (data) => {
            if (data.type === 'BUZZ_TRIGGERED') {
              if (buzzerState === 'STANDBY') {
                warnFalseStart(data.name);
                return;
              }
              if (buzzerState !== 'ACTIVE') return;

              const reaction = ((Date.now() - buzzStartTime) / 1000).toFixed(2);
              if (!buzzHistory.some(h => h.name === data.name)) {
                buzzHistory.push({ name: data.name, reaction: reaction });
                renderHistory();
              }
              triggerWinner(data.name, reaction, data.seat);
            }
          });
        }
      },
      onClose: () => {
        // cleanup key handler if needed
      }
    });
  },
  spawnDice(wm) {
    let diceCount = 1;
    let mode = 'dice';

    const renderDiceHtml = (val) => {
      // Return realistic pip pattern
      const redClass = val === 1 ? 'red' : '';
      let pips = '';
      for (let i = 0; i < val; i++) pips += `<span class="pip ${redClass}"></span>`;
      return `<div class="die-face-3d die-pips-${val}">${pips}</div>`;
    };

    const content = `
      <div class="dice-container">
        <!-- Giant 3D Display Stage -->
        <div class="dice-display-area-giant" id="dice-stage">
          ${renderDiceHtml(5)}
        </div>

        <div style="font-size: 1.15rem; font-weight: 900; color: var(--text);" id="dice-sum-text">點數：5 點</div>

        <div style="display: flex; gap: 8px; width: 100%;">
          <button class="preset-chip active" id="btn-dice-1">1 顆</button>
          <button class="preset-chip" id="btn-dice-2">2 顆</button>
          <button class="preset-chip" id="btn-dice-3">3 顆</button>
          <button class="preset-chip" id="btn-dice-coin">🪙 3D 金幣</button>
        </div>

        <button class="action-btn-main" id="dice-roll-btn" style="height: 44px; font-size: 1.1rem;">
          <i class="fa-solid fa-dice-d6"></i> 擲骰子
        </button>
      </div>
    `;

    wm.createWindow({
      title: '3D 骰子與金幣',
      icon: 'fa-dice',
      iconColor: '#9A8CFF',
      width: 330,
      height: 360,
      type: 'dice',
      contentHtml: content,
      onInit: (el) => {
        const stage = el.querySelector('#dice-stage');
        const rollBtn = el.querySelector('#dice-roll-btn');
        const sumText = el.querySelector('#dice-sum-text');

        const updateDisplay = () => {
          stage.innerHTML = '';
          if (mode === 'coin') {
            stage.innerHTML = '<div class="gold-coin-3d" id="gold-coin">正</div>';
            sumText.textContent = '結果：正面';
            rollBtn.innerHTML = '<i class="fa-solid fa-coins"></i> 擲硬幣';
          } else {
            rollBtn.innerHTML = '<i class="fa-solid fa-dice-d6"></i> 擲骰子';
            let initialHtml = '';
            for (let i = 0; i < diceCount; i++) initialHtml += renderDiceHtml(5);
            stage.innerHTML = initialHtml;
            sumText.textContent = `點數：${diceCount * 5} 點`;
          }
        };

        const diceChips = [
          { el: el.querySelector('#btn-dice-1'), count: 1, m: 'dice' },
          { el: el.querySelector('#btn-dice-2'), count: 2, m: 'dice' },
          { el: el.querySelector('#btn-dice-3'), count: 3, m: 'dice' },
          { el: el.querySelector('#btn-dice-coin'), count: 1, m: 'coin' }
        ];
        diceChips.forEach(item => {
          item.el.addEventListener('click', () => {
            diceChips.forEach(c => c.el.classList.remove('active'));
            item.el.classList.add('active');
            mode = item.m;
            diceCount = item.count;
            updateDisplay();
            window.soundEngine.playPop();
          });
        });

        rollBtn.addEventListener('click', () => {
          window.soundEngine.playDiceRoll();

          if (mode === 'coin') {
            const coin = stage.querySelector('.gold-coin-3d');
            if (coin) coin.classList.add('flipping');
            let ticks = 0;
            const interval = setInterval(() => {
              if (coin) coin.textContent = Math.random() > 0.5 ? '正' : '反';
              ticks++;
              if (ticks >= 8) {
                clearInterval(interval);
                if (coin) coin.classList.remove('flipping');
                const res = Math.random() > 0.5 ? '正面' : '反面';
                if (coin) coin.textContent = res === '正面' ? '正' : '反';
                sumText.textContent = `結果：${res}`;
                window.soundEngine.playBell();
              }
            }, 60);
          } else {
            const faces = stage.querySelectorAll('.die-face-3d');
            faces.forEach(f => f.classList.add('rolling'));
            let ticks = 0;
            const interval = setInterval(() => {
              faces.forEach(f => {
                const rand = Math.floor(Math.random() * 6) + 1;
                f.className = `die-face-3d rolling die-pips-${rand}`;
                const red = rand === 1 ? 'red' : '';
                let p = '';
                for (let k = 0; k < rand; k++) p += `<span class="pip ${red}"></span>`;
                f.innerHTML = p;
              });
              ticks++;
              if (ticks >= 8) {
                clearInterval(interval);
                let sum = 0;
                faces.forEach(f => {
                  f.classList.remove('rolling');
                  const finalVal = Math.floor(Math.random() * 6) + 1;
                  sum += finalVal;
                  f.className = `die-face-3d die-pips-${finalVal}`;
                  const red = finalVal === 1 ? 'red' : '';
                  let p = '';
                  for (let k = 0; k < finalVal; k++) p += `<span class="pip ${red}"></span>`;
                  f.innerHTML = p;
                });
                sumText.textContent = `總點數：${sum} 點`;
                window.soundEngine.playBell();
              }
            }, 65);
          }
        });
      }
    });
  },

  // =========================================================================
  // 4. 課堂大公告板 (Announcement Board - 支援字級無級放大)
  // =========================================================================
  spawnAnnouncement(wm) {
    let fontSize = 1.15;
    let isZhuyin = localStorage.getItem('puti_ann_zhuyin') === 'true';
    const savedText = localStorage.getItem('puti_ann_text') || '1. 國語習作寫至第 45 頁\n2. 數學習作單元四練習\n3. 明天請攜帶彩色筆與剪刀';

    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px;">
          <div style="font-weight: 800; font-size: 1.15rem; color: var(--primary); display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-bullhorn"></i>
            <span contenteditable="true">📢 今日黑板公告與作業</span>
          </div>
          <div style="display: flex; gap: 6px; align-items: center;">
            <button class="scale-btn" id="ann-zhuyin-btn" style="font-size: 0.74rem; font-weight: 800; padding: 1px 8px; border-radius: 6px; border: 1.5px solid ${isZhuyin ? '#8B5CF6' : '#CBD5E1'}; color: ${isZhuyin ? '#6D28D9' : '#64748B'}; background: ${isZhuyin ? '#F5F3FF' : '#FFF'}; cursor: pointer; transition: all 0.2s;" title="切換低年級注音黑板模式">
              ㄅ 注音模式
            </button>
            <div class="font-scale-controls">
              <button class="font-scale-btn" id="ann-font-minus" title="縮小字體">A-</button>
              <button class="font-scale-btn" id="ann-font-reset" title="重置字體">A</button>
              <button class="font-scale-btn" id="ann-font-plus" title="放大字體">A+</button>
            </div>
          </div>
        </div>
        <textarea id="ann-textarea" style="flex: 1; border: 2px dashed var(--secondary); border-radius: var(--radius-sm); padding: 14px; font-family: var(--font-main); font-size: ${fontSize}rem; line-height: 1.8; background: #FFFDF9; outline: none; resize: none;"
          placeholder="1. 國語習作寫至第 45 頁&#10;2. 數學習作單元四練習&#10;3. 明天請攜帶彩色筆與剪刀">${savedText}</textarea>
        <div id="ann-zhuyin-box" style="display: none; flex: 1; border: 2px dashed var(--secondary); border-radius: var(--radius-sm); padding: 14px; font-size: ${fontSize}rem; background: #FFFDF9; outline: none; overflow-y: auto; cursor: pointer;" title="點擊切回編輯文字"></div>
      </div>
    `;

    wm.createWindow({
      title: '課堂公告黑板',
      icon: 'fa-chalkboard',
      iconColor: '#2D3748',
      width: 480,
      height: 360,
      type: 'announcement',
      contentHtml: content,
      onInit: (el) => {
        const textarea = el.querySelector('#ann-textarea');
        const zhuyinBox = el.querySelector('#ann-zhuyin-box');
        const zhuyinBtn = el.querySelector('#ann-zhuyin-btn');

        const updateZhuyinView = () => {
          const text = textarea.value.trim();
          if (text) {
            zhuyinBox.innerHTML = window.PutiZhuyin.textToRubyHtml(text);
          } else {
            zhuyinBox.innerHTML = '<span style="color: #94A3B8; font-style: italic;">（點此輸入黑板公告或作業）</span>';
          }
        };

        const applyZhuyinMode = () => {
          zhuyinBtn.style.border = isZhuyin ? '1.5px solid #8B5CF6' : '1.5px solid #CBD5E1';
          zhuyinBtn.style.color = isZhuyin ? '#6D28D9' : '#64748B';
          zhuyinBtn.style.background = isZhuyin ? '#F5F3FF' : '#FFF';
          zhuyinBtn.innerHTML = isZhuyin ? '<i class="fa-solid fa-check"></i> ㄅ 注音開啟' : 'ㄅ 注音模式';

          if (isZhuyin) {
            updateZhuyinView();
            textarea.style.display = 'none';
            zhuyinBox.style.display = 'block';
          } else {
            zhuyinBox.style.display = 'none';
            textarea.style.display = 'block';
            textarea.focus();
          }
        };

        textarea.addEventListener('input', () => {
          localStorage.setItem('puti_ann_text', textarea.value);
          if (isZhuyin) updateZhuyinView();
        });

        zhuyinBtn.addEventListener('click', () => {
          isZhuyin = !isZhuyin;
          localStorage.setItem('puti_ann_zhuyin', isZhuyin);
          applyZhuyinMode();
          window.soundEngine.playPop();
        });

        zhuyinBox.addEventListener('click', () => {
          isZhuyin = false;
          localStorage.setItem('puti_ann_zhuyin', false);
          applyZhuyinMode();
          window.soundEngine.playTick();
        });

        el.querySelector('#ann-font-plus').addEventListener('click', () => {
          fontSize = Math.min(2.5, fontSize + 0.2);
          textarea.style.fontSize = fontSize + 'rem';
          zhuyinBox.style.fontSize = fontSize + 'rem';
        });
        el.querySelector('#ann-font-minus').addEventListener('click', () => {
          fontSize = Math.max(0.85, fontSize - 0.2);
          textarea.style.fontSize = fontSize + 'rem';
          zhuyinBox.style.fontSize = fontSize + 'rem';
        });
        el.querySelector('#ann-font-reset').addEventListener('click', () => {
          fontSize = 1.15;
          textarea.style.fontSize = fontSize + 'rem';
          zhuyinBox.style.fontSize = fontSize + 'rem';
        });

        if (isZhuyin) {
          applyZhuyinMode();
        }
      }
    });
  },
  // =========================================================================
  // 5. 課堂即時投票 (Poll - 支援大圖投影 QR Code)
  // =========================================================================
  spawnPoll(wm) {
    let currentIdx = 0;
    let isBlind = false;
    let pollFontSize = 1.0; // rem

    // Default question bank
    const defaultBank = [
      {
        question: "今日上課重點都聽懂了嗎？",
        options: ["😃 非常清楚 (聽懂了)", "😐 還好 (尚可理解)", "🙁 需加油 (還不太懂)"],
        votes: [0, 0, 0]
      },
      {
        question: "下列哪一項是正確的乘法交換律概念？",
        options: ["🅰️ a × b = b × a", "🅱️ (a + b) × c", "🅲️ a × (b × c)", "🅳️ a ÷ b = b ÷ a"],
        votes: [0, 0, 0, 0]
      },
      {
        question: "這週各組專案準備進行到哪個階段？",
        options: ["👍 資料蒐集齊全", "🏃 進行報告統整中", "💪 準備正式彩排", "🆘 需要老師指導"],
        votes: [0, 0, 0, 0]
      }
    ];

    // Load or initialize question bank from localStorage
    let questionBank = [];
    try {
      const savedBank = localStorage.getItem('puti_poll_question_bank');
      if (savedBank) {
        questionBank = JSON.parse(savedBank);
      }
    } catch (e) {}

    if (!questionBank || !Array.isArray(questionBank) || questionBank.length === 0) {
      questionBank = defaultBank;
      localStorage.setItem('puti_poll_question_bank', JSON.stringify(questionBank));
    }

    const saveBank = () => {
      localStorage.setItem('puti_poll_question_bank', JSON.stringify(questionBank));
    };

    const getRoom = () => window.realtimeEngine ? window.realtimeEngine.room : (localStorage.getItem('puti_classroom_room') || 'C1000');

    const content = `
      <div class="poll-container" style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <!-- Top Bar: Room Code & Question Nav & Font Size -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #F8F9FA; padding: 6px 10px; border-radius: 10px; border: 1px solid #E9ECEF; flex-wrap: wrap; gap: 4px;">
          <!-- Room Code Info & Change Button -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 0.74rem; font-weight: 800; color: #495057;">
              <i class="fa-solid fa-tower-broadcast" style="color: #4EA8DE;"></i> 教室代碼: <strong id="poll-room-label" style="color: #1971C2; font-family: var(--font-num);">${getRoom()}</strong>
            </span>
            <button type="button" class="action-btn-secondary" id="poll-change-room-btn" style="height: 22px; padding: 0 6px; font-size: 0.68rem;" title="更換教室房間代碼（全國各班獨立隔離，不互相干擾）">
              <i class="fa-solid fa-arrows-rotate"></i> 換代碼
            </button>
          </div>

          <!-- Font Scaling Controls -->
          <div class="font-scale-controls" style="display: flex; gap: 3px; align-items: center;">
            <span style="font-size: 0.72rem; color: #718096; font-weight: bold;"><i class="fa-solid fa-text-height"></i> 字級:</span>
            <button type="button" class="font-scale-btn" id="poll-font-minus" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="縮小投票字級">A-</button>
            <button type="button" class="font-scale-btn" id="poll-font-reset" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="預設字級">A</button>
            <button type="button" class="font-scale-btn" id="poll-font-plus" style="width: 24px; height: 24px; font-size: 0.72rem; border-radius: 4px; border: 1px solid #CED4DA; background: #FFF; cursor: pointer;" title="放大投票字級">A+</button>
          </div>
        </div>

        <!-- Question Navigation Bar (切換題目 / 題庫管理) -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #EBF8FF; padding: 6px 10px; border-radius: 10px; border: 1.5px solid #BEE3F8; gap: 6px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <button type="button" class="action-btn-secondary" id="poll-prev-q-btn" style="height: 26px; padding: 0 8px; font-size: 0.75rem;" title="上一題">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <span id="poll-index-badge" style="font-size: 0.8rem; font-weight: 900; color: #2B6CB0; font-family: var(--font-num);">第 1 / 1 題</span>
            <button type="button" class="action-btn-secondary" id="poll-next-q-btn" style="height: 26px; padding: 0 8px; font-size: 0.75rem;" title="下一題">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          <div style="display: flex; gap: 4px;">
            <button type="button" class="action-btn-secondary" id="poll-add-q-btn" style="height: 26px; padding: 0 8px; font-size: 0.75rem;" title="新增題目">
              <i class="fa-solid fa-plus"></i> 新增題
            </button>
            <button type="button" class="action-btn-secondary" id="poll-bank-modal-btn" style="height: 26px; padding: 0 8px; font-size: 0.75rem; background: #3182CE; color: #FFF; border-color: #2B6CB0;" title="批次匯入/匯出題庫 (純文字或JSON)">
              <i class="fa-solid fa-file-import"></i> 題庫匯入/匯出
            </button>
          </div>
        </div>

        <!-- Question Input -->
        <input type="text" class="poll-question-input" id="poll-q-input" value="" placeholder="在此輸入投票題目..." style="width: 100%; padding: 8px 12px; font-size: 1.05rem; font-weight: 800; border: 2px solid #E2E8F0; border-radius: 10px; outline: none; background: #FFF;">

        <!-- Options Voting List -->
        <div class="poll-options-list" id="poll-list" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;"></div>

        <!-- Bottom Actions -->
        <div style="display: flex; gap: 6px; margin-top: 4px;">
          <button class="action-btn-main" id="poll-qr-big-btn" style="flex: 1.4; height: 36px; font-size: 0.84rem; background: linear-gradient(135deg, #1971C2, #4EA8DE);">
            <i class="fa-solid fa-expand"></i> 學生手機掃碼投票
          </button>
          <button class="action-btn-secondary" id="poll-blind-toggle-btn" style="height: 36px; font-size: 0.84rem; padding: 0 10px;" title="盲投模式 (隱藏長條圖)">
            <i class="fa-solid fa-eye-slash"></i> 盲投
          </button>
          <button class="action-btn-secondary" id="poll-reset-btn" style="height: 36px; font-size: 0.84rem; padding: 0 10px;" title="重置本題票數">
            <i class="fa-solid fa-rotate-left"></i> 重置票數
          </button>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '課堂即時投票',
      icon: 'fa-square-poll-vertical',
      iconColor: '#4EA8DE',
      width: 480,
      height: 490,
      type: 'poll',
      contentHtml: content,
      onInit: (el) => {
        const qInput = el.querySelector('#poll-q-input');
        const listEl = el.querySelector('#poll-list');
        const resetBtn = el.querySelector('#poll-reset-btn');
        const qrBigBtn = el.querySelector('#poll-qr-big-btn');
        const blindToggleBtn = el.querySelector('#poll-blind-toggle-btn');
        const roomLabel = el.querySelector('#poll-room-label');
        const changeRoomBtn = el.querySelector('#poll-change-room-btn');

        const prevBtn = el.querySelector('#poll-prev-q-btn');
        const nextBtn = el.querySelector('#poll-next-q-btn');
        const idxBadge = el.querySelector('#poll-index-badge');
        const addQBtn = el.querySelector('#poll-add-q-btn');
        const bankModalBtn = el.querySelector('#poll-bank-modal-btn');

        const fontPlusBtn = el.querySelector('#poll-font-plus');
        const fontMinusBtn = el.querySelector('#poll-font-minus');
        const fontResetBtn = el.querySelector('#poll-font-reset');

        let room = getRoom();

        // Change Room Code
        changeRoomBtn.addEventListener('click', () => {
          const newRoom = prompt('請輸入自訂教室代碼（例如：PUTI601、CLASS2）：', room);
          if (newRoom && newRoom.trim()) {
            room = newRoom.trim().toUpperCase();
            localStorage.setItem('puti_classroom_room', room);
            roomLabel.textContent = room;
            if (window.realtimeEngine) {
              window.realtimeEngine.room = room;
              window.realtimeEngine.initMqtt();
            }
            alert(`教室代碼已變更為【${room}】！學生重新掃碼即可連線。`);
          }
        });

        const syncCurrentToBank = () => {
          if (!questionBank[currentIdx]) return;
          questionBank[currentIdx].question = qInput.value.trim();
          saveBank();
        };

        const broadcastPoll = () => {
          syncCurrentToBank();
          const cur = questionBank[currentIdx];
          if (!cur) return;
          const pollData = { question: cur.question, options: cur.options };
          localStorage.setItem('puti_active_poll', JSON.stringify(pollData));
          if (window.realtimeEngine) {
            window.realtimeEngine.publish('poll/state', { type: 'POLL_SYNC', poll: pollData }, true);
          }
        };

        const render = () => {
          if (currentIdx >= questionBank.length) currentIdx = questionBank.length - 1;
          if (currentIdx < 0) currentIdx = 0;

          const cur = questionBank[currentIdx];
          if (!cur) return;

          idxBadge.textContent = `第 ${currentIdx + 1} / ${questionBank.length} 題`;
          qInput.value = cur.question;
          qInput.style.fontSize = (pollFontSize * 1.05) + 'rem';

          if (!cur.votes || cur.votes.length !== cur.options.length) {
            cur.votes = cur.options.map(() => 0);
          }

          const totalVotes = cur.votes.reduce((sum, v) => sum + v, 0);

          listEl.innerHTML = cur.options.map((opt, i) => {
            const count = cur.votes[i] || 0;
            const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
            return `
              <div class="poll-opt-row" style="background: #FFF; border: 1.5px solid #E9ECEF; border-radius: 12px; padding: 8px 12px; display: flex; flex-direction: column; gap: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <button type="button" class="poll-opt-btn" data-idx="${i}" style="border: none; background: none; font-weight: 800; font-size: ${pollFontSize}rem; color: #2D3748; cursor: pointer; text-align: left; padding: 0;">
                    ${opt}
                  </button>
                  <span style="color: #FF7B00; font-weight: 900; font-size: ${pollFontSize * 0.95}rem; font-family: var(--font-num);">
                    ${isBlind ? '🔒 盲投中' : `${count} 票 (${pct}%)`}
                  </span>
                </div>
                <div class="poll-bar-outer" style="height: 10px; background: #EDF2F7; border-radius: 999px; overflow: hidden; margin-top: 2px; ${isBlind ? 'opacity: 0.3;' : ''}">
                  <div class="poll-bar-fill" style="height: 100%; border-radius: 999px; width: ${isBlind ? '0%' : pct + '%'}; background: linear-gradient(90deg, #FF9F1C, #FF7B00); transition: width 0.4s ease;"></div>
                </div>
              </div>
            `;
          }).join('');

          // Bind click to manually cast vote on smartboard
          listEl.querySelectorAll('.poll-opt-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const idx = parseInt(btn.dataset.idx, 10);
              cur.votes[idx] = (cur.votes[idx] || 0) + 1;
              saveBank();
              window.soundEngine.playTick();
              render();
            });
          });
        };

        // Font scaling actions
        fontPlusBtn.addEventListener('click', () => {
          pollFontSize = Math.min(1.8, pollFontSize + 0.15);
          render();
          window.soundEngine.playTick();
        });
        fontMinusBtn.addEventListener('click', () => {
          pollFontSize = Math.max(0.85, pollFontSize - 0.15);
          render();
          window.soundEngine.playTick();
        });
        fontResetBtn.addEventListener('click', () => {
          pollFontSize = 1.0;
          render();
          window.soundEngine.playPop();
        });

        // Question navigation
        prevBtn.addEventListener('click', () => {
          if (currentIdx > 0) {
            currentIdx--;
            render();
            broadcastPoll();
            window.soundEngine.playPop();
          }
        });

        nextBtn.addEventListener('click', () => {
          if (currentIdx < questionBank.length - 1) {
            currentIdx++;
            render();
            broadcastPoll();
            window.soundEngine.playPop();
          }
        });

        addQBtn.addEventListener('click', () => {
          const qText = prompt('請輸入新題目名稱：', `課堂思考題 ${questionBank.length + 1}`);
          if (!qText || !qText.trim()) return;
          questionBank.push({
            question: qText.trim(),
            options: ['🅰️ 選項 A', '🅱️ 選項 B', '🅲️ 選項 C', '🅳️ 選項 D'],
            votes: [0, 0, 0, 0]
          });
          currentIdx = questionBank.length - 1;
          saveBank();
          render();
          broadcastPoll();
          window.soundEngine.playBell();
        });

        qInput.addEventListener('input', () => {
          syncCurrentToBank();
          broadcastPoll();
        });

        blindToggleBtn.addEventListener('click', () => {
          isBlind = !isBlind;
          blindToggleBtn.innerHTML = isBlind ? '<i class="fa-solid fa-eye"></i> 開箱' : '<i class="fa-solid fa-eye-slash"></i> 盲投';
          blindToggleBtn.style.color = isBlind ? '#E03131' : '#495057';
          if (!isBlind) {
            window.soundEngine.playFanfare();
            if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60 });
          }
          render();
        });

        resetBtn.addEventListener('click', () => {
          const cur = questionBank[currentIdx];
          if (cur) {
            cur.votes = cur.options.map(() => 0);
            cur.voters = {};
            saveBank();
            render();
            if (window.realtimeEngine) {
              window.realtimeEngine.publish('poll/state', { type: 'POLL_RESET' });
            }
            window.soundEngine.playTick();
          }
        });

        qrBigBtn.addEventListener('click', () => {
          const origin = window.location.origin;
          const pollUrl = origin + (origin.includes('github.io') ? '/puti-classroomscreen' : '') + '/student-poll.html?room=' + room;
          if (typeof window.openQRLightbox === 'function') {
            window.openQRLightbox('📊 學生手機/平板即時投票', pollUrl, `全班拿出手機對準掃描 (教室代碼: ${room})，投票即時同步大螢幕！`);
          }
        });

        // Question Bank Modal (純文字批次匯入 / JSON匯出匯入)
        bankModalBtn.addEventListener('click', () => {
          const modalBackdrop = document.createElement('div');
          modalBackdrop.className = 'modal-backdrop show'; modalBackdrop.style.display = 'flex'; modalBackdrop.style.opacity = '1';
          modalBackdrop.style.zIndex = '10006';

          modalBackdrop.innerHTML = `
            <div class="modal-box" style="max-width: 580px; width: 90%; background: #FFF; border-radius: 20px; padding: 22px; box-shadow: 0 20px 50px rgba(0,0,0,0.25); display: flex; flex-direction: column; gap: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #EDF2F7; padding-bottom: 10px;">
                <h3 style="margin: 0; font-size: 1.2rem; font-weight: 900; color: #2D3748;"><i class="fa-solid fa-folder-open" style="color: #3182CE;"></i> 投票題庫管理與批次匯入</h3>
                <button type="button" id="modal-close-x" style="background: none; border: none; font-size: 1.2rem; color: #A0AEC0; cursor: pointer;">&times;</button>
              </div>

              <!-- Format Guide -->
              <div style="background: #EBF8FF; border: 1px solid #BEE3F8; border-radius: 10px; padding: 10px 12px; font-size: 0.8rem; color: #2B6CB0; line-height: 1.5;">
                <strong>💡 純文字匯入格式（一行一題，題目與選項用 <code>|</code> 隔開）：</strong><br>
                <code>地球自轉一圈需要多久？ | 12小時 | 24小時 | 365天</code><br>
                <code>下列何者不是哺乳類動物？ | 鯨魚 | 企鵝 | 蝙蝠 | 狗</code>
              </div>

              <!-- Textarea for Batch Text Import -->
              <textarea id="batch-text-input" rows="7" style="width: 100%; border: 2px solid #CBD5E0; border-radius: 10px; padding: 10px; font-size: 0.88rem; font-family: monospace; outline: none;" placeholder="在此貼上您的多道題目文字...">${questionBank.map(q => q.question + ' | ' + q.options.join(' | ')).join('\n')}</textarea>

              <!-- Actions: Batch Text Import, JSON Export, JSON Import -->
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button type="button" class="action-btn-main" id="btn-import-text" style="flex: 1.4; height: 36px; font-size: 0.84rem; background: #3182CE;">
                  <i class="fa-solid fa-file-import"></i> 解析並匯入文字題庫
                </button>
                <button type="button" class="action-btn-secondary" id="btn-export-json" style="flex: 1; height: 36px; font-size: 0.84rem;">
                  <i class="fa-solid fa-download"></i> 匯出 JSON
                </button>
                <label class="action-btn-secondary" style="flex: 1; height: 36px; font-size: 0.84rem; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; margin: 0;">
                  <i class="fa-solid fa-upload"></i> 匯入 JSON
                  <input type="file" id="json-file-input" accept=".json" style="display: none;">
                </label>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #EDF2F7; padding-top: 10px;">
                <button type="button" class="action-btn-secondary" id="btn-clear-bank" style="color: #E53E3E; border-color: #FEB2B2; height: 30px; font-size: 0.78rem;">
                  <i class="fa-solid fa-trash"></i> 重置回預設題庫
                </button>
                <button type="button" class="action-btn-secondary" id="modal-close-btn" style="height: 30px; font-size: 0.78rem; padding: 0 16px;">
                  關閉
                </button>
              </div>
            </div>
          `;

          document.body.appendChild(modalBackdrop);

          const closeModal = () => modalBackdrop.remove();
          modalBackdrop.querySelector('#modal-close-x').addEventListener('click', closeModal);
          modalBackdrop.querySelector('#modal-close-btn').addEventListener('click', closeModal);

          // 1. Batch Text Import
          modalBackdrop.querySelector('#btn-import-text').addEventListener('click', () => {
            const raw = modalBackdrop.querySelector('#batch-text-input').value.trim();
            if (!raw) return alert('請先貼入文字題目！');

            const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            const parsed = [];
            lines.forEach(line => {
              const parts = line.split('|').map(p => p.trim()).filter(p => p.length > 0);
              if (parts.length >= 2) {
                parsed.push({
                  question: parts[0],
                  options: parts.slice(1),
                  votes: parts.slice(1).map(() => 0)
                });
              }
            });

            if (parsed.length === 0) {
              return alert('解析失敗！請確保每行至少有題目與一個選項，並用「|」分隔。');
            }

            questionBank = parsed;
            currentIdx = 0;
            saveBank();
            render();
            broadcastPoll();
            window.soundEngine.playBell();
            closeModal();
            alert(`成功匯入 ${parsed.length} 道投票題目！`);
          });

          // 2. Export JSON
          modalBackdrop.querySelector('#btn-export-json').addEventListener('click', () => {
            const jsonStr = JSON.stringify(questionBank, null, 2);
            const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const dlAnchor = document.createElement('a');
            dlAnchor.href = url;
            dlAnchor.download = `puti-poll-bank-${new Date().toISOString().slice(0,10)}.json`;
            document.body.appendChild(dlAnchor);
            dlAnchor.click();
            setTimeout(() => {
              document.body.removeChild(dlAnchor);
              URL.revokeObjectURL(url);
            }, 100);
          });

          // 3. Import JSON
          modalBackdrop.querySelector('#json-file-input').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (evt) => {
              try {
                const imported = JSON.parse(evt.target.result);
                if (Array.isArray(imported) && imported.length > 0 && imported[0].question && imported[0].options) {
                  questionBank = imported;
                  currentIdx = 0;
                  saveBank();
                  render();
                  broadcastPoll();
                  window.soundEngine.playBell();
                  closeModal();
                  alert(`成功從 JSON 匯入 ${imported.length} 道題庫！`);
                } else {
                  alert('JSON 格式不符！請確保包含 question 與 options 陣列。');
                }
              } catch (err) {
                alert('JSON 解析失敗，請確認檔案格式是否正確。');
              }
            };
            reader.readAsText(file);
          });

          // 4. Reset to Default Bank
          modalBackdrop.querySelector('#btn-clear-bank').addEventListener('click', () => {
            if (confirm('確定要清除自訂題庫並恢復預設題庫嗎？')) {
              questionBank = defaultBank;
              currentIdx = 0;
              saveBank();
              render();
              broadcastPoll();
              window.soundEngine.playTick();
              closeModal();
            }
          });
        });

        // Realtime Listener for Mobile Students Voting with single-vote per student & vote revision
        if (window.realtimeEngine) {
          window.realtimeEngine.subscribe('poll/vote', (data) => {
            if (data.type === 'VOTE_SUBMITTED') {
              const cur = questionBank[currentIdx];
              if (!cur || !cur.votes) return;
              if (!cur.voters) cur.voters = {};

              const vId = data.voterId;
              const newIdx = data.optionIndex;

              if (vId) {
                // If student has already voted this option, ignore duplicate
                if (cur.voters[vId] === newIdx) return;

                // If student is changing vote from previous option, decrement previous
                if (cur.voters[vId] !== undefined) {
                  const oldIdx = cur.voters[vId];
                  if (cur.votes[oldIdx] > 0) cur.votes[oldIdx]--;
                } else if (data.previousOptionIndex !== undefined && data.previousOptionIndex !== null) {
                  const oldIdx = data.previousOptionIndex;
                  if (cur.votes[oldIdx] > 0) cur.votes[oldIdx]--;
                }

                // Record new vote
                cur.voters[vId] = newIdx;
                cur.votes[newIdx] = (cur.votes[newIdx] || 0) + 1;
              } else {
                cur.votes[newIdx] = (cur.votes[newIdx] || 0) + 1;
              }

              saveBank();
              window.soundEngine.playPop();
              render();
            }
          });

          // Mobile device requesting initial poll state
          window.realtimeEngine.subscribe('poll/req', () => {
            broadcastPoll();
          });
        }

        render();
        broadcastPoll();
      }
    });
  },
  spawnStickyNote(wm) {
    const colors = [
      { name: 'yellow', bg: '#FFF9DB', border: '#FFE066' },
      { name: 'pink', bg: '#FFE3E8', border: '#FFA8BA' },
      { name: 'green', bg: '#EBFBEE', border: '#8CE99A' },
      { name: 'blue', bg: '#E7F5FF', border: '#74C0FC' }
    ];

    let fontSize = 1.15;

    const content = `
      <div class="sticky-container">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="sticky-palette-row">
            ${colors.map((c) => `
              <div class="sticky-color-btn" data-bg="${c.bg}" data-border="${c.border}" style="background: ${c.bg}; border-color: ${c.border};"></div>
            `).join('')}
          </div>
          <div class="font-scale-controls">
            <button class="font-scale-btn" id="stk-font-minus">A-</button>
            <button class="font-scale-btn" id="stk-font-reset">A</button>
            <button class="font-scale-btn" id="stk-font-plus">A+</button>
          </div>
        </div>
        <textarea class="sticky-textarea" id="stk-text" placeholder="在此輸入課堂重要提醒或備忘..."></textarea>
      </div>
    `;

    wm.createWindow({
      title: '課堂隨手便利貼',
      icon: 'fa-note-sticky',
      iconColor: '#FFA502',
      width: 290,
      height: 250,
      type: 'sticky',
      contentHtml: content,
      onInit: (el) => {
        const colorBtns = el.querySelectorAll('.sticky-color-btn');
        const text = el.querySelector('#stk-text');

        colorBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            el.style.background = btn.dataset.bg;
            el.style.borderColor = btn.dataset.border;
          });
        });
        el.style.background = colors[0].bg;
        el.style.borderColor = colors[0].border;

        el.querySelector('#stk-font-plus').addEventListener('click', () => {
          fontSize = Math.min(2.2, fontSize + 0.2);
          text.style.fontSize = fontSize + 'rem';
        });
        el.querySelector('#stk-font-minus').addEventListener('click', () => {
          fontSize = Math.max(0.85, fontSize - 0.2);
          text.style.fontSize = fontSize + 'rem';
        });
        el.querySelector('#stk-font-reset').addEventListener('click', () => {
          fontSize = 1.15;
          text.style.fontSize = fontSize + 'rem';
        });
      }
    });
  },

  // =========================================================================
  // 其餘經典 22 種工具保持健壯完整運作
  // =========================================================================
  spawnClock(wm) {
    const content = `
      <div class="clock-container">
        <div class="clock-time" id="clk-time">12:00:00</div>
        <div class="clock-date" id="clk-date">2026 年 10 月 26 日</div>
        <div class="clock-extra" id="clk-day">星期一 · 把握當下</div>
      </div>
    `;
    wm.createWindow({
      title: '課堂時鐘',
      icon: 'fa-clock',
      iconColor: '#4EA8DE',
      width: 290,
      height: 200,
      type: 'clock',
      contentHtml: content,
      onInit: (el) => {
        const timeEl = el.querySelector('#clk-time');
        const dateEl = el.querySelector('#clk-date');
        const dayEl = el.querySelector('#clk-day');
        const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const update = () => {
          const now = new Date();
          timeEl.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
          dateEl.textContent = `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日`;
          dayEl.textContent = `${days[now.getDay()]} · 把握當下`;
        };
        update();
        setInterval(update, 1000);
      }
    });
  },

  spawnCalendar(wm) {
    let now = new Date();
    let viewYear = now.getFullYear();
    let viewMonth = now.getMonth();

    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <!-- Calendar Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #F8F9FA; padding: 6px 8px; border-radius: 10px; border: 1px solid #E9ECEF;">
          <button type="button" class="action-btn-secondary" id="cal-prev-btn" style="height: 26px; padding: 0 8px; font-size: 0.75rem;" title="上個月">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span id="cal-title" style="font-weight: 800; font-size: 0.95rem; color: #2D3748;"></span>
            <button type="button" class="action-btn-secondary" id="cal-today-btn" style="height: 22px; padding: 0 6px; font-size: 0.68rem; font-weight: 800; color: #3A86FF;" title="跳回今天">今天</button>
          </div>
          <button type="button" class="action-btn-secondary" id="cal-next-btn" style="height: 26px; padding: 0 8px; font-size: 0.75rem;" title="下個月">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <!-- Weekdays Header -->
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; font-weight: 800; font-size: 0.78rem; color: var(--text-muted); text-align: center;">
          <span style="color: #FA5252;">日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span style="color: #228BE6;">六</span>
        </div>

        <!-- Days Grid -->
        <div id="cal-days-grid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; flex: 1;"></div>
      </div>
    `;

    wm.createWindow({
      title: '課堂日曆',
      icon: 'fa-calendar-days',
      iconColor: '#3A86FF',
      width: 310,
      height: 310,
      type: 'calendar',
      contentHtml: content,
      onInit: (el) => {
        const titleEl = el.querySelector('#cal-title');
        const gridEl = el.querySelector('#cal-days-grid');
        const prevBtn = el.querySelector('#cal-prev-btn');
        const nextBtn = el.querySelector('#cal-next-btn');
        const todayBtn = el.querySelector('#cal-today-btn');

        const renderCalendar = () => {
          titleEl.textContent = `${viewYear} 年 ${viewMonth + 1} 月`;
          const firstDay = new Date(viewYear, viewMonth, 1).getDay();
          const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
          const realToday = new Date();
          const isCurrentMonth = realToday.getFullYear() === viewYear && realToday.getMonth() === viewMonth;
          const todayDate = realToday.getDate();

          let daysHtml = '';
          for (let i = 0; i < firstDay; i++) {
            daysHtml += `<div style="text-align: center; color: #CBD5E1; padding: 6px;"></div>`;
          }
          for (let d = 1; d <= daysInMonth; d++) {
            const isToday = isCurrentMonth && d === todayDate;
            daysHtml += `
              <div style="display: flex; align-items: center; justify-content: center; height: 32px; font-weight: 800; font-size: 0.88rem; font-family: var(--font-num); font-variant-numeric: tabular-nums; cursor: pointer; border-radius: 8px; transition: background 0.15s ease; ${isToday ? 'background: linear-gradient(135deg, #FF9F1C, #FF7B00); color: #FFF; box-shadow: 0 2px 6px rgba(255,159,28,0.4);' : 'color: var(--text);'}">
                ${d}
              </div>
            `;
          }
          gridEl.innerHTML = daysHtml;
        };

        prevBtn.addEventListener('click', () => {
          viewMonth--;
          if (viewMonth < 0) {
            viewMonth = 11;
            viewYear--;
          }
          renderCalendar();
          window.soundEngine.playTick();
        });

        nextBtn.addEventListener('click', () => {
          viewMonth++;
          if (viewMonth > 11) {
            viewMonth = 0;
            viewYear++;
          }
          renderCalendar();
          window.soundEngine.playTick();
        });

        todayBtn.addEventListener('click', () => {
          const t = new Date();
          viewYear = t.getFullYear();
          viewMonth = t.getMonth();
          renderCalendar();
          window.soundEngine.playPop();
        });

        renderCalendar();
      }
    });
  },

  spawnTimer(wm) {
    let totalSeconds = 300, remainingSeconds = 300, timerInterval = null, isRunning = false;
    const radius = 68, circumference = 2 * Math.PI * radius;
    const content = `
      <div class="timer-container" style="position: relative;">
        <div class="timer-circle-wrap">
          <svg class="timer-svg" viewBox="0 0 170 170">
            <circle class="timer-bg-circle" cx="85" cy="85" r="${radius}"></circle>
            <circle class="timer-progress-circle" id="t-prog" cx="85" cy="85" r="${radius}" stroke-dasharray="${circumference}" stroke-dashoffset="0"></circle>
          </svg>
          <div class="timer-digits-overlay" id="t-digits-box" style="cursor: pointer;" title="點擊直接修改自訂時間">
            <div class="timer-digits" id="t-digits">05:00</div>
            <div class="timer-millis" id="t-sub">5 分鐘</div>
          </div>
        </div>
        <div class="timer-preset-row" id="t-presets" style="flex-wrap: wrap; justify-content: center;">
          <button class="preset-chip" data-sec="30">+30秒</button>
          <button class="preset-chip" data-sec="60">+1分</button>
          <button class="preset-chip" data-sec="180">+3分</button>
          <button class="preset-chip" data-sec="300">+5分</button>
          <button class="preset-chip" data-sec="600">+10分</button>
          <button class="preset-chip" id="t-custom-btn" style="border: 1px dashed #FF7B00; color: #E8590C; font-weight: 800;"><i class="fa-solid fa-pen"></i> 自訂</button>
        </div>
        <div class="timer-controls-row">
          <button class="action-btn-main" id="t-start-btn"><i class="fa-solid fa-play"></i> 開始</button>
          <button class="action-btn-secondary" id="t-reset-btn" title="重置"><i class="fa-solid fa-rotate-left"></i></button>
        </div>
      </div>
    `;
    wm.createWindow({
      title: '課堂計時器',
      icon: 'fa-hourglass-half',
      iconColor: '#FF6B6B',
      width: 320,
      height: 390,
      type: 'timer',
      contentHtml: content,
      onInit: (el) => {
        const digitsEl = el.querySelector('#t-digits');
        const digitsBox = el.querySelector('#t-digits-box');
        const subEl = el.querySelector('#t-sub');
        const progCircle = el.querySelector('#t-prog');
        const startBtn = el.querySelector('#t-start-btn');
        const resetBtn = el.querySelector('#t-reset-btn');
        const presetsRow = el.querySelector('#t-presets');
        const customBtn = el.querySelector('#t-custom-btn');

        const formatTime = (secs) => `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
        
        // 修正文字不一致：精準顯示 X分Y秒，避免5分30秒被無條件進位為6分鐘
        const formatSubText = (secs) => {
          if (secs <= 0) return '時間到！';
          const m = Math.floor(secs / 60);
          const s = secs % 60;
          if (m > 0 && s > 0) return `${m} 分 ${s} 秒`;
          if (m > 0) return `${m} 分鐘`;
          return `${s} 秒`;
        };

        const render = () => {
          digitsEl.textContent = formatTime(remainingSeconds);
          subEl.textContent = formatSubText(remainingSeconds);
          const percent = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
          progCircle.style.strokeDashoffset = circumference * (1 - percent);
          progCircle.style.stroke = remainingSeconds <= 10 ? '#FF4757' : '#FF9F1C';
        };

        const stop = () => {
          if (timerInterval) clearInterval(timerInterval);
          timerInterval = null; isRunning = false;
          startBtn.innerHTML = '<i class="fa-solid fa-play"></i> 開始';
          startBtn.style.background = 'linear-gradient(135deg, #FF9F1C, #FF7B00)';
        };

        const askCustomTime = () => {
          stop();
          const currentM = Math.floor(remainingSeconds / 60);
          const currentS = remainingSeconds % 60;
          const currentStr = currentS > 0 ? `${currentM}:${String(currentS).padStart(2, '0')}` : `${currentM}`;
          const input = prompt('請輸入自訂倒數時間（例如 2.5 或 7 或 07:30）：', currentStr);
          if (input === null) return;
          const trimmed = input.trim();
          let sec = 0;
          if (trimmed.includes(':')) {
            const [m, s] = trimmed.split(':').map(Number);
            if (!isNaN(m) && !isNaN(s)) sec = m * 60 + s;
          } else {
            const num = parseFloat(trimmed);
            if (!isNaN(num) && num > 0) sec = Math.round(num * 60);
          }
          if (sec > 0) {
            totalSeconds = sec;
            remainingSeconds = sec;
            render();
            if (window.soundEngine) window.soundEngine.playPop();
          } else {
            alert('請輸入有效的大於 0 的時間數字！');
          }
        };

        if (customBtn) customBtn.addEventListener('click', askCustomTime);
        if (digitsBox) digitsBox.addEventListener('click', askCustomTime);

        startBtn.addEventListener('click', () => {
          if (isRunning) { stop(); return; }
          if (remainingSeconds <= 0) remainingSeconds = totalSeconds;
          isRunning = true;
          startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> 暫停';
          startBtn.style.background = 'linear-gradient(135deg, #2EC4B6, #20A498)';
          timerInterval = setInterval(() => {
            if (remainingSeconds > 0) {
              remainingSeconds--; render();
            } else {
              stop(); if (window.soundEngine) window.soundEngine.playChime();
              if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 70 });
            }
          }, 1000);
        });

        resetBtn.addEventListener('click', () => { stop(); remainingSeconds = totalSeconds; render(); if (window.soundEngine) window.soundEngine.playTick(); });
        presetsRow.querySelectorAll('.preset-chip[data-sec]').forEach(chip => {
          chip.addEventListener('click', () => {
            totalSeconds = remainingSeconds + parseInt(chip.dataset.sec, 10);
            remainingSeconds = totalSeconds; render(); if (window.soundEngine) window.soundEngine.playTick();
          });
        });
        render();
      },
      onClose: () => { if (timerInterval) clearInterval(timerInterval); }
    });
  },

  spawnVisualTimer(wm) {
    let totalSec = 180, remainSec = 180, timerId = null, running = false;
    const content = `
      <div class="visual-timer-container">
        <div class="visual-pie-wrap" id="vt-pie-box" style="cursor: pointer;" title="點擊直接修改自訂時間"><canvas id="vt-canvas" width="300" height="300"></canvas></div>
        <div style="font-family: var(--font-num); font-size: 2.2rem; font-weight: 800; color: var(--text); cursor: pointer;" id="vt-digits" title="點擊自訂時間">03:00</div>
        <div class="timer-preset-row" style="flex-wrap: wrap; justify-content: center;">
          <button class="preset-chip" data-sec="60">1分</button>
          <button class="preset-chip" data-sec="180">3分</button>
          <button class="preset-chip" data-sec="300">5分</button>
          <button class="preset-chip" data-sec="600">10分</button>
          <button class="preset-chip" id="vt-custom-btn" style="border: 1px dashed #FF9F1C; color: #D9480F; font-weight: 800;"><i class="fa-solid fa-pen"></i> 自訂</button>
        </div>
        <div class="timer-controls-row">
          <button class="action-btn-main" id="vt-start-btn"><i class="fa-solid fa-play"></i> 開始</button>
          <button class="action-btn-secondary" id="vt-reset-btn"><i class="fa-solid fa-rotate-left"></i></button>
        </div>
      </div>
    `;
    wm.createWindow({
      title: '視覺計時器',
      icon: 'fa-chart-pie',
      iconColor: '#FF9F1C',
      width: 310,
      height: 390,
      type: 'visual-timer',
      contentHtml: content,
      onInit: (el) => {
        const canvas = el.querySelector('#vt-canvas'), ctx = canvas.getContext('2d'), digitsEl = el.querySelector('#vt-digits'), pieBox = el.querySelector('#vt-pie-box'), startBtn = el.querySelector('#vt-start-btn'), resetBtn = el.querySelector('#vt-reset-btn'), customBtn = el.querySelector('#vt-custom-btn');
        const drawPie = () => {
          const w = canvas.width, h = canvas.height, cx = w/2, cy = h/2, r = cx - 12;
          ctx.clearRect(0,0,w,h);
          ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fillStyle = '#F5F1E9'; ctx.fill();
          const frac = totalSec > 0 ? remainSec / totalSec : 0;
          ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,-Math.PI/2,-Math.PI/2 + frac*Math.PI*2); ctx.closePath();
          ctx.fillStyle = frac <= 0.25 ? '#FF4757' : (frac <= 0.5 ? '#FFA502' : '#52B788'); ctx.fill();
          ctx.beginPath(); ctx.arc(cx,cy,14,0,Math.PI*2); ctx.fillStyle = '#FFF'; ctx.fill();
          digitsEl.textContent = `${String(Math.floor(remainSec/60)).padStart(2,'0')}:${String(remainSec%60).padStart(2,'0')}`;
        };
        const stop = () => { if (timerId) clearInterval(timerId); timerId = null; running = false; startBtn.innerHTML = '<i class="fa-solid fa-play"></i> 開始'; };
        
        const askCustom = () => {
          stop();
          const currentM = Math.floor(remainSec / 60);
          const currentS = remainSec % 60;
          const currentStr = currentS > 0 ? `${currentM}:${String(currentS).padStart(2, '0')}` : `${currentM}`;
          const input = prompt('請輸入自訂視覺計時（分 或 分:秒，例如 2 或 15 或 07:30）：', currentStr);
          if (input === null) return;
          const trimmed = input.trim();
          let sec = 0;
          if (trimmed.includes(':')) {
            const [m, s] = trimmed.split(':').map(Number);
            if (!isNaN(m) && !isNaN(s)) sec = m * 60 + s;
          } else {
            const num = parseFloat(trimmed);
            if (!isNaN(num) && num > 0) sec = Math.round(num * 60);
          }
          if (sec > 0) {
            totalSec = sec;
            remainSec = sec;
            drawPie();
            if (window.soundEngine) window.soundEngine.playPop();
          } else {
            alert('請輸入有效的大於 0 的時間！');
          }
        };

        if (customBtn) customBtn.addEventListener('click', askCustom);
        if (digitsEl) digitsEl.addEventListener('click', askCustom);
        if (pieBox) pieBox.addEventListener('click', askCustom);

        startBtn.addEventListener('click', () => {
          if (running) { stop(); return; }
          if (remainSec <= 0) remainSec = totalSec;
          running = true; startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> 暫停';
          timerId = setInterval(() => {
            if (remainSec > 0) { remainSec--; drawPie(); }
            else { stop(); if (window.soundEngine) window.soundEngine.playChime(); if (typeof confetti === 'function') confetti({ particleCount: 60, spread: 80 }); }
          }, 1000);
        });
        resetBtn.addEventListener('click', () => { stop(); remainSec = totalSec; drawPie(); if (window.soundEngine) window.soundEngine.playTick(); });
        el.querySelectorAll('.preset-chip[data-sec]').forEach(c => c.addEventListener('click', () => { stop(); totalSec = parseInt(c.dataset.sec, 10); remainSec = totalSec; drawPie(); }));
        drawPie();
      },
      onClose: () => { if (timerId) clearInterval(timerId); }
    });
  },

  spawnStopwatch(wm) {
    let elapsedMs = 0, timerId = null, running = false, laps = [];
    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 10px; justify-content: space-between;">
        <div style="font-family: var(--font-num); font-size: 3rem; font-weight: 800; text-align: center; color: var(--primary);" id="sw-digits">00:00.0</div>
        <div style="flex: 1; overflow-y: auto; background: #FAF8F5; border-radius: var(--radius-sm); padding: 8px;" id="sw-laps"><div style="color: #A0AEC0; font-size: 0.8rem; text-align: center;">尚未有計圈紀錄</div></div>
        <div style="display: flex; gap: 8px;">
          <button class="action-btn-main" id="sw-start-btn"><i class="fa-solid fa-play"></i> 開始</button>
          <button class="action-btn-secondary" id="sw-lap-btn" title="計圈"><i class="fa-solid fa-flag"></i></button>
          <button class="action-btn-secondary" id="sw-reset-btn" title="重置"><i class="fa-solid fa-rotate-left"></i></button>
        </div>
      </div>
    `;
    wm.createWindow({
      title: '競賽碼錶', icon: 'fa-stopwatch', iconColor: '#2EC4B6', width: 300, height: 280, type: 'stopwatch', contentHtml: content,
      onInit: (el) => {
        const digits = el.querySelector('#sw-digits'), lapsEl = el.querySelector('#sw-laps'), startBtn = el.querySelector('#sw-start-btn'), lapBtn = el.querySelector('#sw-lap-btn'), resetBtn = el.querySelector('#sw-reset-btn');
        let lastTime = Date.now();
        const updateDisplay = () => {
          const s = Math.floor(elapsedMs / 1000);
          digits.textContent = `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}.${Math.floor((elapsedMs%1000)/100)}`;
        };
        startBtn.addEventListener('click', () => {
          if (running) { clearInterval(timerId); running = false; startBtn.innerHTML = '<i class="fa-solid fa-play"></i> 繼續'; }
          else {
            running = true; lastTime = Date.now(); startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> 暫停';
            timerId = setInterval(() => { const now = Date.now(); elapsedMs += (now - lastTime); lastTime = now; updateDisplay(); }, 80);
          }
        });
        lapBtn.addEventListener('click', () => {
          if (elapsedMs === 0) return;
          laps.push(digits.textContent);
          lapsEl.innerHTML = laps.map((l, i) => `<div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; padding:2px 4px;"><span>第 ${i+1} 圈</span><span style="color:var(--primary);">${l}</span></div>`).reverse().join('');
        });
        resetBtn.addEventListener('click', () => { clearInterval(timerId); running = false; elapsedMs = 0; laps = []; updateDisplay(); lapsEl.innerHTML = '<div style="color:#A0AEC0; font-size:0.8rem; text-align:center;">尚未有計圈紀錄</div>'; startBtn.innerHTML = '<i class="fa-solid fa-play"></i> 開始'; });
      },
      onClose: () => { if (timerId) clearInterval(timerId); }
    });
  },

  spawnAgenda(wm) {
    const presets = {
      default: ['1. 課前準備與點名', '2. 上節複習與檢討', '3. 本節核心概念教學', '4. 小組討論與實作', '5. 成果發表與總結'],
      fourLearn: [
        '1. 學生自學 (課前預習／閱讀講義／任務自探)',
        '2. 組內共學 (小組討論／對答案／彼此解題澄清)',
        '3. 組間互學 (跨組分享／提問質疑／發表辯證)',
        '4. 教師導學 (重點提煉／迷思釐清／引導統整總結)'
      ],
      examDay: [
        '1. 桌椅排正、抽屜書包清空',
        '2. 桌面僅留必備文具、墊板與手錶',
        '3. 考卷發放、核對座號與頁數',
        '4. 靜心作答、留意時間掌握節奏',
        '5. 仔細檢查每一題計算與劃卡、聽鐘響統一交卷'
      ]
    };

    let currentItems = [...presets.default];
    let fontSize = 0.9;

    const renderItemsHtml = (items) => {
      return items.map(item => `
        <div class="agenda-item">
          <input type="checkbox" class="agenda-checkbox">
          <span class="agenda-text" contenteditable="true" style="font-size: ${fontSize}rem;">${item}</span>
        </div>
      `).join('');
    };

    const content = `
      <div class="agenda-container" style="display: flex; flex-direction: column; height: 100%; gap: 6px;">
        <!-- Top Toolbar: Preset Chips + Font Scaling -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 4px;">
          <div style="display: flex; gap: 4px; overflow-x: auto;">
            <button class="preset-chip active" id="ag-pre-default" title="一般課堂標準流程">預設</button>
            <button class="preset-chip" id="ag-pre-four" style="color: #2B8A3E; font-weight: 800;" title="自主學習四學模式（自學、共學、互學、導學）">📖 四學</button>
            <button class="preset-chip" id="ag-pre-exam" style="color: #E03131; font-weight: 800;" title="定期評量考場紀律流程">📝 段考日</button>
          </div>
          <div class="font-scale-controls">
            <button class="font-scale-btn" id="ag-font-minus" title="縮小字級">A-</button>
            <button class="font-scale-btn" id="ag-font-reset" title="預設字級">A</button>
            <button class="font-scale-btn" id="ag-font-plus" title="放大字級">A+</button>
          </div>
        </div>

        <div class="agenda-list" id="agenda-items-box" style="flex: 1; overflow-y: auto;">
          ${renderItemsHtml(currentItems)}
        </div>

        <button class="action-btn-secondary" id="agenda-add-btn" style="height: 34px; font-size: 0.82rem;">
          <i class="fa-solid fa-plus"></i> 新增流程
        </button>
      </div>
    `;

    wm.createWindow({
      title: '流程作息表', icon: 'fa-list-check', iconColor: '#52B788', width: 390, height: 360, type: 'agenda', contentHtml: content,
      onInit: (el) => {
        const box = el.querySelector('#agenda-items-box');
        const addBtn = el.querySelector('#agenda-add-btn');

        const applyPreset = (key, btnEl) => {
          el.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
          btnEl.classList.add('active');
          currentItems = [...presets[key]];
          box.innerHTML = renderItemsHtml(currentItems);
          window.soundEngine.playPop();
        };

        el.querySelector('#ag-pre-default').addEventListener('click', (e) => applyPreset('default', e.currentTarget));
        el.querySelector('#ag-pre-four').addEventListener('click', (e) => applyPreset('fourLearn', e.currentTarget));
        el.querySelector('#ag-pre-exam').addEventListener('click', (e) => applyPreset('examDay', e.currentTarget));

        box.addEventListener('change', (e) => {
          if (e.target.classList.contains('agenda-checkbox')) {
            const item = e.target.closest('.agenda-item');
            if (e.target.checked) {
              item.classList.add('done');
              window.soundEngine.playTick();
            } else {
              item.classList.remove('done');
            }
          }
        });

        addBtn.addEventListener('click', () => {
          const count = box.querySelectorAll('.agenda-item').length + 1;
          const div = document.createElement('div');
          div.className = 'agenda-item';
          div.innerHTML = `<input type="checkbox" class="agenda-checkbox"><span class="agenda-text" contenteditable="true" style="font-size: ${fontSize}rem;">${count}. 請輸入流程事項</span>`;
          box.appendChild(div);
          window.soundEngine.playPop();
        });

        el.querySelector('#ag-font-plus').addEventListener('click', () => {
          fontSize = Math.min(1.8, fontSize + 0.15);
          box.querySelectorAll('.agenda-text').forEach(t => t.style.fontSize = fontSize + 'rem');
          window.soundEngine.playTick();
        });
        el.querySelector('#ag-font-minus').addEventListener('click', () => {
          fontSize = Math.max(0.75, fontSize - 0.15);
          box.querySelectorAll('.agenda-text').forEach(t => t.style.fontSize = fontSize + 'rem');
          window.soundEngine.playTick();
        });
        el.querySelector('#ag-font-reset').addEventListener('click', () => {
          fontSize = 0.9;
          box.querySelectorAll('.agenda-text').forEach(t => t.style.fontSize = fontSize + 'rem');
          window.soundEngine.playPop();
        });
      }
    });
  },
  spawnTrafficLight(wm) {
    const content = `
      <div class="traffic-light-container" id="tl-box">
        <div class="traffic-box">
          <div class="traffic-lamp red on" data-state="red" title="安靜專注"></div>
          <div class="traffic-lamp yellow" data-state="yellow" title="準備收尾"></div>
          <div class="traffic-lamp green" data-state="green" title="自由討論"></div>
        </div>
        <div class="traffic-status-text" id="tl-status">🤫 安靜專注時間</div>
        <button class="action-btn-secondary" id="tl-orient-btn" style="height: 32px; padding: 0 12px; font-size: 0.78rem;">
          <i class="fa-solid fa-rotate"></i> 切換橫向/直向
        </button>
      </div>
    `;
    wm.createWindow({
      title: '班級紅綠燈', icon: 'fa-traffic-light', iconColor: '#FF4757', width: 280, height: 380, type: 'traffic-light', contentHtml: content,
      onInit: (el) => {
        const lamps = el.querySelectorAll('.traffic-lamp'), statusEl = el.querySelector('#tl-status'), container = el.querySelector('#tl-box'), orientBtn = el.querySelector('#tl-orient-btn');
        const stateInfo = { red: { text: '🤫 安靜專注時間', color: '#FF4757' }, yellow: { text: '⚠️ 準備總結收尾', color: '#FFA502' }, green: { text: '🟢 自由討論與發言', color: '#2ED573' } };
        lamps.forEach(lamp => {
          lamp.addEventListener('click', () => {
            lamps.forEach(l => l.classList.remove('on'));
            lamp.classList.add('on');
            statusEl.textContent = stateInfo[lamp.dataset.state].text;
            statusEl.style.color = stateInfo[lamp.dataset.state].color;
            window.soundEngine.playBell();
          });
        });
        orientBtn.addEventListener('click', () => {
          container.classList.toggle('horizontal');
          el.style.width = container.classList.contains('horizontal') ? '380px' : '280px';
          el.style.height = container.classList.contains('horizontal') ? '270px' : '380px';
        });
      }
    });
  },

  spawnWorkSymbols(wm) {
    let wsScale = 1.0;
    let isZhuyin = localStorage.getItem('puti_ws_zhuyin') === 'true';

    // 依台灣國小課本標準產生字右側直排注音，採用正統中文字型天然字形，輕聲置頂、二三四聲置於韻母右上
    const makeZyHtml = (pairs) => {
      return pairs.map(([char, rawZy]) => {
        let tone = '';
        let letters = '';
        for (const ch of rawZy) {
          if ('ˊˇˋ˙'.includes(ch)) {
            tone = ch;
          } else {
            letters += ch;
          }
        }
        const lettersHtml = Array.from(letters).map(s => `<span class="zy-letter">${s}</span>`).join('');
        const topToneHtml = tone === '˙' ? '<span class="zy-top-tone">˙</span>' : '';
        const toneClass = tone === 'ˊ' ? 'tone-2' : tone === 'ˇ' ? 'tone-3' : tone === 'ˋ' ? 'tone-4' : '';
        const sideToneHtml = (tone && tone !== '˙') ? `<span class="zy-side-tone ${toneClass}">${tone}</span>` : '';
        return `<ruby class="zy-box"><rb class="zy-char">${char}</rb><rt class="zy-rt">${topToneHtml}<div class="zy-body"><div class="zy-letters">${lettersHtml}</div>${sideToneHtml}</div></rt></ruby>`;
      }).join('');
    };

    const symbols = [
      {
        id: 'silent',
        icon: '🤫',
        name: '保持安靜',
        desc: '獨立自主專注思考',
        rubyName: makeZyHtml([['保', 'ㄅㄠˇ'], ['持', 'ㄔˊ'], ['安', 'ㄢ'], ['靜', 'ㄐㄧㄥˋ']]),
        rubyDesc: makeZyHtml([['獨', 'ㄉㄨˊ'], ['立', 'ㄌㄧˋ'], ['自', 'ㄗˋ'], ['主', 'ㄓㄨˇ'], ['專', 'ㄓㄨㄢ'], ['注', 'ㄓㄨˋ'], ['思', 'ㄙ'], ['考', 'ㄎㄠˇ']])
      },
      {
        id: 'whisper',
        icon: '👂',
        name: '輕聲細語',
        desc: '相鄰同學悄悄交換意見',
        rubyName: makeZyHtml([['輕', 'ㄑㄧㄥ'], ['聲', 'ㄕㄥ'], ['細', 'ㄒㄧˋ'], ['語', 'ㄩˇ']]),
        rubyDesc: makeZyHtml([['相', 'ㄒㄧㄤ'], ['鄰', 'ㄌㄧㄣˊ'], ['同', 'ㄊㄨㄥˊ'], ['學', 'ㄒㄩㄝˊ'], ['悄', 'ㄑㄧㄠˇ'], ['悄', 'ㄑㄧㄠˇ'], ['交', 'ㄐㄧㄠ'], ['換', 'ㄏㄨㄢˋ'], ['意', 'ㄧˋ'], ['見', 'ㄐㄧㄢˋ']])
      },
      {
        id: 'group',
        icon: '🤝',
        name: '小組合作',
        desc: '同組夥伴熱烈討論交流',
        rubyName: makeZyHtml([['小', 'ㄒㄧㄠˇ'], ['組', 'ㄗㄨˇ'], ['合', 'ㄏㄜˊ'], ['作', 'ㄗㄨㄛˋ']]),
        rubyDesc: makeZyHtml([['同', 'ㄊㄨㄥˊ'], ['組', 'ㄗㄨˇ'], ['夥', 'ㄏㄨㄛˇ'], ['伴', 'ㄅㄢˋ'], ['熱', 'ㄖㄜˋ'], ['烈', 'ㄌㄧㄝˋ'], ['討', 'ㄊㄠˇ'], ['論', 'ㄌㄨㄣˋ'], ['交', 'ㄐㄧㄠ'], ['流', 'ㄌㄧㄡˊ']])
      },
      {
        id: 'class',
        icon: '📢',
        name: '全班發表',
        desc: '安靜聆聽他人發言分享',
        rubyName: makeZyHtml([['全', 'ㄑㄩㄢˊ'], ['班', 'ㄅㄢ'], ['發', 'ㄈㄚ'], ['表', 'ㄅㄧㄠˇ']]),
        rubyDesc: makeZyHtml([['安', 'ㄢ'], ['靜', 'ㄐㄧㄥˋ'], ['聆', 'ㄌㄧㄥˊ'], ['聽', 'ㄊㄧㄥ'], ['他', 'ㄊㄚ'], ['人', 'ㄖㄣˊ'], ['發', 'ㄈㄚ'], ['言', 'ㄧㄢˊ'], ['分', 'ㄈㄣ'], ['享', 'ㄒㄧㄤˇ']])
      }
    ];
    const content = `
      <div class="work-symbols-container" style="display: flex; flex-direction: column; height: 100%; gap: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 2px 4px;">
          <span style="font-size: 0.78rem; font-weight: 800; color: #718096;">點擊切換工作模式</span>
          <div style="display: flex; align-items: center; gap: 6px;">
            <button class="scale-btn" id="ws-zhuyin-btn" style="font-size: 0.74rem; font-weight: 800; padding: 1px 7px; border-radius: 6px; border: 1.5px solid ${isZhuyin ? '#8B5CF6' : '#CBD5E1'}; color: ${isZhuyin ? '#6D28D9' : '#64748B'}; background: ${isZhuyin ? '#F5F3FF' : '#FFF'}; cursor: pointer; transition: all 0.2s;" title="切換注音標注 (適合一、二年級)">ㄅ 注音</button>
            <div class="font-scale-controls">
              <button class="font-scale-btn" id="ws-font-minus" title="縮小符號與文字">A-</button>
              <button class="font-scale-btn" id="ws-font-reset" title="預設大小">A</button>
              <button class="font-scale-btn" id="ws-font-plus" title="放大符號與文字">A+</button>
            </div>
          </div>
        </div>
        <div class="symbol-grid" id="ws-symbol-grid" style="flex: 1;">
          ${symbols.map((s, idx) => `
            <div class="symbol-card ${idx === 0 ? 'active' : ''}" data-id="${s.id}">
              <div class="symbol-icon-wrapper" style="font-size: 2.2rem; transition: font-size 0.15s ease;">${s.icon}</div>
              <div class="symbol-name" style="font-size: 0.95rem; font-weight: 900; transition: font-size 0.15s ease;">${isZhuyin ? s.rubyName : s.name}</div>
              <div class="symbol-desc" style="font-size: 0.75rem; transition: font-size 0.15s ease;">${isZhuyin ? s.rubyDesc : s.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    wm.createWindow({
      title: '課堂工作符號', icon: 'fa-icons', iconColor: '#9A8CFF', width: 390, height: 380, minWidth: 330, minHeight: 330, type: 'work-symbols', contentHtml: content,
      onInit: (el) => {
        const grid = el.querySelector('#ws-symbol-grid');
        const zhuyinBtn = el.querySelector('#ws-zhuyin-btn');

        const renderSymbols = () => {
          grid.querySelectorAll('.symbol-card').forEach(card => {
            const sym = symbols.find(s => s.id === card.dataset.id);
            if (!sym) return;
            const nameEl = card.querySelector('.symbol-name');
            const descEl = card.querySelector('.symbol-desc');
            if (nameEl) nameEl.innerHTML = isZhuyin ? sym.rubyName : sym.name;
            if (descEl) descEl.innerHTML = isZhuyin ? sym.rubyDesc : sym.desc;
          });
          if (zhuyinBtn) {
            zhuyinBtn.style.borderColor = isZhuyin ? '#8B5CF6' : '#CBD5E1';
            zhuyinBtn.style.color = isZhuyin ? '#6D28D9' : '#64748B';
            zhuyinBtn.style.background = isZhuyin ? '#F5F3FF' : '#FFF';
          }
        };

        zhuyinBtn?.addEventListener('click', () => {
          isZhuyin = !isZhuyin;
          localStorage.setItem('puti_ws_zhuyin', isZhuyin);
          renderSymbols();
          applyScale();
          window.soundEngine.playPop();
        });

        const applyScale = () => {
          const nameBase = isZhuyin ? 1.15 : 0.95;
          const descBase = isZhuyin ? 0.92 : 0.76;
          grid.querySelectorAll('.symbol-icon-wrapper').forEach(i => i.style.fontSize = (2.2 * wsScale) + 'rem');
          grid.querySelectorAll('.symbol-name').forEach(n => n.style.fontSize = (nameBase * wsScale) + 'rem');
          grid.querySelectorAll('.symbol-desc').forEach(d => d.style.fontSize = (descBase * wsScale) + 'rem');
        };

        el.querySelector('#ws-font-plus').addEventListener('click', () => {
          wsScale = Math.min(1.8, wsScale + 0.15);
          applyScale();
          window.soundEngine.playTick();
        });
        el.querySelector('#ws-font-minus').addEventListener('click', () => {
          wsScale = Math.max(0.8, wsScale - 0.15);
          applyScale();
          window.soundEngine.playTick();
        });
        el.querySelector('#ws-font-reset').addEventListener('click', () => {
          wsScale = 1.0;
          applyScale();
          window.soundEngine.playPop();
        });

        el.querySelectorAll('.symbol-card').forEach(card => card.addEventListener('click', () => {
          el.querySelectorAll('.symbol-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          window.soundEngine.playTick();
        }));
      }
    });
  },
  spawnSoundMeter(wm) {
    let audioStream = null, audioContext = null, analyser = null, animFrame = null, threshold = 65, isWarning = false;
    const content = `
      <div class="sound-container">
        <div class="sound-status-display"><i class="fa-solid fa-microphone-lines" style="color: var(--primary);"></i><span id="sm-level-text">分貝監測：未啟動</span></div>
        <div class="sound-meter-bar-outer"><div class="sound-meter-bar-fill" id="sm-fill"></div><div class="sound-threshold-marker" id="sm-threshold" style="left: 65%;"></div></div>
        <div class="sound-warning-badge" id="sm-badge">🚨 警告：音量過大！請輕聲細語！</div>
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 0.8rem;">
          <span>靈敏度閥值: <b id="sm-threshold-val">65%</b></span>
          <input type="range" id="sm-slider" min="30" max="95" value="65" style="width: 130px; cursor: pointer;">
        </div>
        <button class="action-btn-main" id="sm-toggle-btn"><i class="fa-solid fa-play"></i> 開啟麥克風監測</button>
      </div>
    `;
    wm.createWindow({
      title: '教室音量監測儀', icon: 'fa-volume-high', iconColor: '#2ED573', width: 320, height: 290, type: 'sound-meter', contentHtml: content,
      onInit: (el) => {
        const toggleBtn = el.querySelector('#sm-toggle-btn'), fillEl = el.querySelector('#sm-fill'), levelText = el.querySelector('#sm-level-text'), badge = el.querySelector('#sm-badge'), slider = el.querySelector('#sm-slider'), thresholdVal = el.querySelector('#sm-threshold-val'), marker = el.querySelector('#sm-threshold');
        slider.addEventListener('input', (e) => { threshold = parseInt(e.target.value, 10); thresholdVal.textContent = threshold + '%'; marker.style.left = threshold + '%'; });
        const stopListening = () => {
          if (animFrame) cancelAnimationFrame(animFrame);
          if (audioStream) { audioStream.getTracks().forEach(t => t.stop()); audioStream = null; }
          if (audioContext) { audioContext.close(); audioContext = null; }
          fillEl.style.width = '0%'; levelText.textContent = '監測已停止'; badge.style.display = 'none';
          toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> 開啟麥克風監測'; toggleBtn.style.background = 'linear-gradient(135deg, #FF9F1C, #FF7B00)';
        };
        const startListening = async () => {
          try {
            audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser(); analyser.fftSize = 256;
            audioContext.createMediaStreamSource(audioStream).connect(analyser);
            toggleBtn.innerHTML = '<i class="fa-solid fa-stop"></i> 停止監測'; toggleBtn.style.background = 'linear-gradient(135deg, #FF4757, #E84118)';
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const loop = () => {
              analyser.getByteFrequencyData(dataArray);
              let sum = 0; for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
              const percent = Math.min(100, Math.round(((sum / dataArray.length) / 128) * 100));
              fillEl.style.width = percent + '%'; levelText.textContent = `即時音量：${percent}%`;
              if (percent > threshold) { if (!isWarning) { isWarning = true; badge.style.display = 'block'; window.soundEngine.playWarningBuzz(); } } else { isWarning = false; badge.style.display = 'none'; }
              animFrame = requestAnimationFrame(loop);
            };
            loop();
          } catch(err) { alert('⚠️ 無法存取麥克風！請確認瀏覽器網址列已允許麥克風權限，或檢查設備是否已連接收音麥克風。'); stopListening(); }
        };
        toggleBtn.addEventListener('click', () => { if (audioStream) stopListening(); else startListening(); });
      },
      onClose: () => { if (animFrame) cancelAnimationFrame(animFrame); if (audioStream) audioStream.getTracks().forEach(t => t.stop()); if (audioContext) audioContext.close(); }
    });
  },

  spawnScoreboard(wm) {
    let teams = [{ name: '第一組', score: 0 }, { name: '第二組', score: 0 }, { name: '第三組', score: 0 }, { name: '第四組', score: 0 }];
    const content = `
      <div class="scoreboard-container">
        <div class="scoreboard-teams-grid" id="sb-grid"></div>
        <div style="display: flex; gap: 8px;">
          <button class="action-btn-secondary" id="sb-add-team" style="flex: 1; height: 34px; font-size: 0.82rem;"><i class="fa-solid fa-plus"></i> 新增組別</button>
          <button class="action-btn-secondary" id="sb-reset-scores" style="height: 34px; font-size: 0.82rem;" title="比分歸零"><i class="fa-solid fa-rotate-left"></i> 歸零</button>
        </div>
      </div>
    `;
    wm.createWindow({
      title: '小組記分板', icon: 'fa-trophy', iconColor: '#FFA502', width: 440, height: 290, type: 'scoreboard', contentHtml: content,
      onInit: (el) => {
        const grid = el.querySelector('#sb-grid'), addBtn = el.querySelector('#sb-add-team'), resetBtn = el.querySelector('#sb-reset-scores');
        const render = () => {
          const maxScore = Math.max(...teams.map(t => t.score));
          grid.innerHTML = teams.map((t, idx) => `
            <div class="team-score-card ${t.score > 0 && t.score === maxScore ? 'leading' : ''}">
              <div class="team-name" contenteditable="true" data-idx="${idx}">${t.name}</div>
              <div class="team-points">${t.score}</div>
              <div class="team-ctrl-row"><button class="point-btn" data-action="minus" data-idx="${idx}">-</button><button class="point-btn" data-action="plus" data-idx="${idx}">+</button></div>
            </div>
          `).join('');
        };
        grid.addEventListener('click', (e) => {
          const btn = e.target.closest('.point-btn'); if (!btn) return;
          const idx = parseInt(btn.dataset.idx, 10);
          if (btn.dataset.action === 'plus') { teams[idx].score++; window.soundEngine.playBell(); }
          else { teams[idx].score = Math.max(0, teams[idx].score - 1); window.soundEngine.playTick(); }
          render();
        });
        grid.addEventListener('blur', (e) => { if (e.target.classList.contains('team-name')) teams[parseInt(e.target.dataset.idx, 10)].name = e.target.textContent.trim(); }, true);
        addBtn.addEventListener('click', () => { teams.push({ name: `第${teams.length + 1}組`, score: 0 }); render(); });
        resetBtn.addEventListener('click', () => { if (confirm('確定歸零？')) { teams.forEach(t => t.score = 0); render(); } });
        render();
      }
    });
  },

  spawnPicker(wm) {
    let pool = JSON.parse(localStorage.getItem('puti_student_roster') || 'null') || Array.from({ length: 30 }, (_, i) => `${i + 1} 號`);
    let drawn = [], isRolling = false, antiRepeat = true;

    const content = `
      <div class="picker-container">
        <div class="picker-display"><div class="picker-result" id="picker-result">點擊抽籤</div><div class="picker-subtext" id="picker-pool-count">待選名額：剩餘 ${pool.length} 位</div></div>
        <div class="picker-options-row">
          <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.85rem;"><input type="checkbox" id="picker-no-repeat" checked> 不重複抽選</label>
          <div class="picker-history-badge">已抽 <span id="picker-drawn-count">0</span> 人</div>
        </div>
        <div class="picker-btn-grid">
          <button class="action-btn-main" id="picker-roll-btn"><i class="fa-solid fa-dice"></i> 開始抽</button>
          <button class="action-btn-secondary" id="picker-config-btn" title="編輯學生名單（一行一個）"><i class="fa-solid fa-users-line"></i> 名單</button>
          <button class="action-btn-secondary" id="picker-reset-btn" title="重設抽取進度"><i class="fa-solid fa-rotate-left"></i></button>
        </div>
      </div>
    `;
    wm.createWindow({
      title: '隨機抽籤', icon: 'fa-bullseye', iconColor: '#FF9F1C', width: 340, height: 320, type: 'picker', contentHtml: content,
      onInit: (el) => {
        const resultEl = el.querySelector('#picker-result'), poolCountEl = el.querySelector('#picker-pool-count'), rollBtn = el.querySelector('#picker-roll-btn'), configBtn = el.querySelector('#picker-config-btn'), resetBtn = el.querySelector('#picker-reset-btn'), noRepeatCheckbox = el.querySelector('#picker-no-repeat'), drawnCountEl = el.querySelector('#picker-drawn-count');
        const updateStatus = () => {
          const available = antiRepeat ? pool.filter(i => !drawn.includes(i)) : pool;
          poolCountEl.textContent = `待選名額：剩餘 ${available.length} 位`;
          drawnCountEl.textContent = drawn.length;
        };
        noRepeatCheckbox.addEventListener('change', (e) => { antiRepeat = e.target.checked; updateStatus(); });
        resetBtn.addEventListener('click', () => { drawn = []; resultEl.textContent = '準備就緒'; updateStatus(); window.soundEngine.playTick(); });
        
        const onGlobalRosterUpdated = (e) => {
          if (e.detail && Array.isArray(e.detail)) {
            pool = [...e.detail];
            drawn = [];
            resultEl.textContent = '共用名單已同步';
            updateStatus();
          }
        };
        window.addEventListener('rosterUpdated', onGlobalRosterUpdated);

        configBtn.addEventListener('click', () => {
          if (typeof window.openRosterEditor === 'function') {
            window.openRosterEditor(pool, (newList) => {
              pool = newList;
              drawn = [];
              resultEl.textContent = '名單已更新';
              updateStatus();
            });
          }
        });

        rollBtn.addEventListener('click', () => {
          if (isRolling) return;
          const available = antiRepeat ? pool.filter(i => !drawn.includes(i)) : pool;
          if (available.length === 0) { alert('名單所有同學皆已抽過囉！'); return; }
          isRolling = true; rollBtn.disabled = true; let counter = 0;
          const rollInterval = setInterval(() => {
            resultEl.textContent = available[Math.floor(Math.random() * available.length)];
            window.soundEngine.playTick(); counter++;
            if (counter >= 18) {
              clearInterval(rollInterval);
              const winner = available[Math.floor(Math.random() * available.length)];
              resultEl.textContent = winner; if (antiRepeat) drawn.push(winner);
              updateStatus(); if (typeof confetti === 'function') confetti({ particleCount: 70, spread: 60 });
              window.soundEngine.playFanfare(); isRolling = false; rollBtn.disabled = false;
            }
          }, 65);
        });
        updateStatus();
      }
    });
  },

  spawnGroupMaker(wm) {
    let students = JSON.parse(localStorage.getItem('puti_student_roster') || 'null') || Array.from({ length: 30 }, (_, i) => `${i + 1} 號`);
    let currentGroups = [];

    const content = `
      <div class="groups-container" style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: #F8F9FA; padding: 6px 10px; border-radius: 10px; border: 1px solid #E9ECEF;">
          <span style="font-size: 0.82rem; font-weight: 800; color: #495057;">分組組數：</span>
          <select id="grp-count-select" style="padding: 4px 10px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); outline: none; font-weight: 800; font-size: 0.85rem;">
            <option value="2">2 組</option><option value="3">3 組</option><option value="4" selected>4 組</option><option value="5">5 組</option><option value="6">6 組</option><option value="8">8 組</option>
          </select>
          <button class="action-btn-secondary" id="grp-config-btn" style="height: 32px; padding: 0 10px; font-size: 0.8rem;" title="編輯班級名單">
            <i class="fa-solid fa-users-line"></i> 名單 (<span id="grp-roster-count">${students.length}</span>人)
          </button>
          <button class="action-btn-main" id="grp-make-btn" style="height: 32px; padding: 0 14px; font-size: 0.84rem; background: linear-gradient(135deg, #2B8A3E, #20C997);">
            <i class="fa-solid fa-shuffle"></i> 隨機分組
          </button>
          <span style="font-size: 0.72rem; color: #718096; margin-left: auto;">💡 支援滑鼠/觸控直接<b>拖曳學生姓名</b>跨組自由互換</span>
        </div>

        <div class="groups-result-grid" id="grp-result-area" style="flex: 1; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; padding: 4px;">
          <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 40px 0; font-size: 0.92rem;">
            點擊「隨機分組」立即產生分組，產生後可直接用滑鼠拖拉成員調整！
          </div>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '隨機與拖拉分組', icon: 'fa-people-group', iconColor: '#52B788', width: 620, height: 440, type: 'groups', contentHtml: content,
      onInit: (el) => {
        const makeBtn = el.querySelector('#grp-make-btn');
        const select = el.querySelector('#grp-count-select');
        const resultArea = el.querySelector('#grp-result-area');
        const configBtn = el.querySelector('#grp-config-btn');
        const countEl = el.querySelector('#grp-roster-count');

        let draggedItem = null;

        const renderGroups = () => {
          if (!currentGroups || currentGroups.length === 0) return;
          resultArea.innerHTML = currentGroups.map((g, gIdx) => `
            <div class="group-card" data-gidx="${gIdx}" style="background: #FFF; border: 2px dashed #CED4DA; border-radius: 12px; padding: 8px; display: flex; flex-direction: column; gap: 6px; min-height: 140px; transition: all 0.15s ease;">
              <div class="group-card-header" style="font-weight: 900; font-size: 0.9rem; color: #2B6CB0; display: flex; justify-content: space-between; border-bottom: 1.5px solid #EDF2F7; padding-bottom: 4px;">
                <span>第 ${gIdx + 1} 組</span>
                <span style="font-size: 0.75rem; color: #718096; font-family: var(--font-num);">(${g.length} 人)</span>
              </div>
              <div class="group-drop-zone" data-gidx="${gIdx}" style="display: flex; flex-wrap: wrap; gap: 5px; flex: 1; align-content: flex-start; padding: 4px 0;">
                ${g.map((name, mIdx) => `
                  <div class="draggable-student-tag" draggable="true" data-gidx="${gIdx}" data-midx="${mIdx}" data-name="${name}" style="background: #EBF8FF; border: 1.5px solid #BEE3F8; color: #2B6CB0; padding: 4px 8px; border-radius: 6px; font-weight: 800; font-size: 0.8rem; cursor: grab; user-select: none; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fa-solid fa-grip-lines" style="font-size: 0.65rem; color: #90CDF4;"></i>
                    <span>${name}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('');

          // Bind Drag and Drop Events
          const tags = resultArea.querySelectorAll('.draggable-student-tag');
          const cards = resultArea.querySelectorAll('.group-card');

          tags.forEach(tag => {
            tag.addEventListener('dragstart', (e) => {
              draggedItem = {
                fromGroup: parseInt(tag.dataset.gidx, 10),
                fromMember: parseInt(tag.dataset.midx, 10),
                name: tag.dataset.name
              };
              tag.style.opacity = '0.4';
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', tag.dataset.name);
            });

            tag.addEventListener('dragend', () => {
              tag.style.opacity = '1';
              cards.forEach(c => c.style.borderColor = '#CED4DA');
            });
          });

          cards.forEach(card => {
            card.addEventListener('dragover', (e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
              card.style.borderColor = '#3182CE';
              card.style.background = '#F7FAFC';
            });

            card.addEventListener('dragleave', () => {
              card.style.borderColor = '#CED4DA';
              card.style.background = '#FFF';
            });

            card.addEventListener('drop', (e) => {
              e.preventDefault();
              card.style.borderColor = '#CED4DA';
              card.style.background = '#FFF';

              if (!draggedItem) return;
              const targetGroupIdx = parseInt(card.dataset.gidx, 10);
              const { fromGroup, fromMember, name } = draggedItem;

              if (fromGroup === targetGroupIdx) return; // Dropped in same group

              // Move member
              currentGroups[fromGroup].splice(fromMember, 1);
              currentGroups[targetGroupIdx].push(name);

              draggedItem = null;
              window.soundEngine.playPop();
              renderGroups();
            });
          });
        };

        const onGroupRosterUpdated = (e) => {
          if (e.detail && Array.isArray(e.detail)) {
            students = [...e.detail];
            countEl.textContent = students.length;
          }
        };
        window.addEventListener('rosterUpdated', onGroupRosterUpdated);

        configBtn.addEventListener('click', () => {
          if (typeof window.openRosterEditor === 'function') {
            window.openRosterEditor(students, (newList) => {
              students = newList;
              countEl.textContent = students.length;
            });
          }
        });

        makeBtn.addEventListener('click', () => {
          const k = parseInt(select.value, 10);
          const shuffled = [...students];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          currentGroups = Array.from({ length: k }, () => []);
          shuffled.forEach((std, idx) => currentGroups[idx % k].push(std));

          renderGroups();
          window.soundEngine.playFanfare();
          if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60 });
        });
      }
    });
  },
  spawnRPS(wm) {
    const hands = ['✊', '✌', '✋'], names = ['石頭', '剪刀', '布'];
    const content = `
      <div class="rps-container">
        <div class="rps-display-card" id="rps-card">✊</div>
        <div style="font-size: 1.15rem; font-weight: 800; color: var(--text);" id="rps-text">準備出拳...</div>
        <button class="action-btn-main" id="rps-play-btn" style="width: 180px;"><i class="fa-solid fa-hand-back-fist"></i> 猜拳開始！</button>
      </div>
    `;
    wm.createWindow({
      title: '剪刀石頭布', icon: 'fa-hand-back-fist', iconColor: '#FF85A1', width: 270, height: 290, type: 'rps', contentHtml: content,
      onInit: (el) => {
        const card = el.querySelector('#rps-card'), text = el.querySelector('#rps-text'), playBtn = el.querySelector('#rps-play-btn');
        playBtn.addEventListener('click', () => {
          card.classList.add('rolling'); window.soundEngine.playDiceRoll(); let count = 0;
          const interval = setInterval(() => {
            card.textContent = hands[Math.floor(Math.random() * 3)]; count++;
            if (count >= 10) {
              clearInterval(interval); card.classList.remove('rolling');
              const finalIdx = Math.floor(Math.random() * 3);
              card.textContent = hands[finalIdx]; text.textContent = `出拳結果：${names[finalIdx]}！`; window.soundEngine.playBell();
            }
          }, 70);
        });
      }
    });
  },

  spawnWhiteboard(wm) {
    const content = `
      <div class="whiteboard-container">
        <div class="whiteboard-toolbar">
          <div class="wb-color-palette">
            <div class="color-dot active" data-color="#2D3748" style="background: #2D3748;"></div>
            <div class="color-dot" data-color="#E63946" style="background: #E63946;"></div>
            <div class="color-dot" data-color="#1D3557" style="background: #1D3557;"></div>
            <div class="color-dot" data-color="#2A9D8F" style="background: #2A9D8F;"></div>
            <div class="color-dot" data-color="#FF9F1C" style="background: #FF9F1C;"></div>
            <div class="color-dot" data-color="#FFE066" style="background: #FFE066;"></div>
          </div>
          <div class="wb-tools-row">
            <button class="wb-btn active" id="wb-pen-btn" title="畫筆"><i class="fa-solid fa-pen"></i></button>
            <button class="wb-btn" id="wb-eraser-btn" title="橡皮擦"><i class="fa-solid fa-eraser"></i></button>
            <button class="wb-btn" id="wb-theme-btn" title="背景切換"><i class="fa-solid fa-table-cells"></i></button>
            <button class="wb-btn" id="wb-undo-btn" title="復原"><i class="fa-solid fa-rotate-left"></i></button>
            <button class="wb-btn" id="wb-clear-btn" title="全清"><i class="fa-solid fa-trash-can"></i></button>
            <button class="wb-btn" id="wb-export-btn" title="匯出圖片"><i class="fa-solid fa-download"></i></button>
          </div>
        </div>
        <div class="canvas-wrapper" id="wb-wrapper"><canvas id="wb-canvas"></canvas></div>
      </div>
    `;
    wm.createWindow({
      title: '課堂自由白板', icon: 'fa-paintbrush', iconColor: '#2EC4B6', width: 460, height: 380, minWidth: 320, minHeight: 260, type: 'whiteboard', contentHtml: content,
      onInit: (el) => {
        const canvas = el.querySelector('#wb-canvas'), wrapper = el.querySelector('#wb-wrapper'), ctx = canvas.getContext('2d'), colorDots = el.querySelectorAll('.color-dot'), penBtn = el.querySelector('#wb-pen-btn'), eraserBtn = el.querySelector('#wb-eraser-btn'), themeBtn = el.querySelector('#wb-theme-btn'), undoBtn = el.querySelector('#wb-undo-btn'), clearBtn = el.querySelector('#wb-clear-btn'), exportBtn = el.querySelector('#wb-export-btn');
        let currentColor = '#2D3748', isEraser = false, isDrawing = false, lastX = 0, lastY = 0, history = [];
        const resizeCanvas = () => {
          const rect = wrapper.getBoundingClientRect(); if (rect.width === 0 || rect.height === 0) return;
          const tempCanvas = document.createElement('canvas'); tempCanvas.width = canvas.width; tempCanvas.height = canvas.height;
          tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
          canvas.width = rect.width * window.devicePixelRatio; canvas.height = rect.height * window.devicePixelRatio;
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
          ctx.drawImage(tempCanvas, 0, 0, rect.width, rect.height);
        };
        setTimeout(resizeCanvas, 50); new ResizeObserver(resizeCanvas).observe(wrapper);
        canvas.addEventListener('pointerdown', (e) => {
          if (history.length >= 15) history.shift(); history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
          isDrawing = true; canvas.setPointerCapture(e.pointerId); const rect = canvas.getBoundingClientRect(); lastX = e.clientX - rect.left; lastY = e.clientY - rect.top; e.preventDefault();
        });
        canvas.addEventListener('pointermove', (e) => {
          if (!isDrawing) return; const rect = canvas.getBoundingClientRect(); const currentX = e.clientX - rect.left; const currentY = e.clientY - rect.top;
          ctx.beginPath(); ctx.moveTo(lastX, lastY); ctx.lineTo(currentX, currentY);
          if (isEraser) { ctx.globalCompositeOperation = 'destination-out'; ctx.lineWidth = 24; }
          else { ctx.globalCompositeOperation = 'source-over'; ctx.strokeStyle = currentColor; ctx.lineWidth = currentColor === '#FFE066' ? 16 : 4; }
          ctx.stroke(); lastX = currentX; lastY = currentY;
        });
        const stop = (e) => { if (isDrawing) { isDrawing = false; try { canvas.releasePointerCapture(e.pointerId); } catch(err){} } };
        canvas.addEventListener('pointerup', stop); canvas.addEventListener('pointercancel', stop);
        colorDots.forEach(dot => dot.addEventListener('click', () => { colorDots.forEach(d => d.classList.remove('active')); dot.classList.add('active'); currentColor = dot.dataset.color; isEraser = false; penBtn.classList.add('active'); eraserBtn.classList.remove('active'); }));
        penBtn.addEventListener('click', () => { isEraser = false; penBtn.classList.add('active'); eraserBtn.classList.remove('active'); });
        eraserBtn.addEventListener('click', () => { isEraser = true; eraserBtn.classList.add('active'); penBtn.classList.remove('active'); });
        const themes = ['', 'theme-blackboard', 'theme-grid']; let themeIdx = 0;
        themeBtn.addEventListener('click', () => { if (themes[themeIdx]) wrapper.classList.remove(themes[themeIdx]); themeIdx = (themeIdx + 1) % themes.length; if (themes[themeIdx]) wrapper.classList.add(themes[themeIdx]); });
        undoBtn.addEventListener('click', () => { if (history.length > 0) ctx.putImageData(history.pop(), 0, 0); });
        clearBtn.addEventListener('click', () => { if (confirm('清空白板？')) ctx.clearRect(0, 0, canvas.width, canvas.height); });
        exportBtn.addEventListener('click', () => {
          try {
            const a = document.createElement('a');
            a.download = `白板_${Date.now()}.png`;
            a.href = canvas.toDataURL('image/png');
            document.body.appendChild(a);
            a.click();
            setTimeout(() => document.body.removeChild(a), 100);
            window.soundEngine.playPop();
            exportBtn.innerHTML = '<i class="fa-solid fa-check"></i> 已匯出';
            setTimeout(() => { exportBtn.innerHTML = '<i class="fa-solid fa-download"></i> 匯出'; }, 1500);
          } catch (e) {
            alert('匯出白板圖片失敗：' + e.message);
          }
        });
      }
    });
  },

  spawnImageViewer(wm) {
    const sampleImages = [
      { name: '植物細胞結構', url: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=800&q=80' },
      { name: '世界地圖', url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80' },
      { name: '自然科學插圖', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80' }
    ];
    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <div style="display: flex; gap: 6px;">
          <input type="text" id="img-url-input" placeholder="貼上圖片 URL 或拖曳圖片至此..." style="flex: 1; padding: 6px 12px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); font-size: 0.85rem; outline: none;">
          <button class="action-btn-main" id="img-load-btn" style="height: 32px; padding: 0 12px; font-size: 0.8rem;">載入</button>
          <label class="action-btn-secondary" style="height: 32px; padding: 0 12px; font-size: 0.8rem; display: flex; align-items: center; cursor: pointer;">
            <i class="fa-solid fa-upload"></i>
            <input type="file" id="img-file-input" accept="image/*" style="display: none;">
          </label>
        </div>
        <div style="display: flex; gap: 6px; overflow-x: auto;">
          ${sampleImages.map((s) => `<button class="preset-chip img-sample-btn" data-url="${s.url}" style="font-size: 0.75rem;">${s.name}</button>`).join('')}
        </div>
        <div style="flex: 1; background: #F8F6F0; border-radius: var(--radius-sm); border: 2px dashed var(--border-subtle); display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;" id="img-view-box">
          <img id="img-display" src="${sampleImages[0].url}" alt="課堂展示圖片" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
      </div>
    `;
    wm.createWindow({
      title: '教材圖片展示', icon: 'fa-image', iconColor: '#FF6B6B', width: 420, height: 360, type: 'image', contentHtml: content,
      onInit: (el) => {
        const urlInput = el.querySelector('#img-url-input'), loadBtn = el.querySelector('#img-load-btn'), fileInput = el.querySelector('#img-file-input'), display = el.querySelector('#img-display'), viewBox = el.querySelector('#img-view-box');
        loadBtn.addEventListener('click', () => { if (urlInput.value.trim()) display.src = urlInput.value.trim(); });
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) { const reader = new FileReader(); reader.onload = (ev) => { display.src = ev.target.result; }; reader.readAsDataURL(file); }
        });
        el.querySelectorAll('.img-sample-btn').forEach(btn => btn.addEventListener('click', () => { display.src = btn.dataset.url; }));
        viewBox.addEventListener('dragover', (e) => { e.preventDefault(); viewBox.style.borderColor = 'var(--primary)'; });
        viewBox.addEventListener('drop', (e) => {
          e.preventDefault(); viewBox.style.borderColor = 'var(--border-subtle)';
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const reader = new FileReader(); reader.onload = (ev) => { display.src = ev.target.result; }; reader.readAsDataURL(e.dataTransfer.files[0]);
          }
        });
      }
    });
  },

  spawnStickers(wm) {
    const stickers = ['💯', '🌟', '🎉', '🔥', '👑', '👍', '❤️', '👏', '🌈', '🏆', '🎯', '🚀', '⭐', '🦉', '🎨', '💡'];
    const soundEffects = [
      { id: 'clap', name: '熱烈鼓掌', icon: '👏', color: '#FF7B00', fn: () => window.soundEngine.playClap() },
      { id: 'cheer', name: '歡呼尖叫', icon: '🥳', color: '#E03131', fn: () => window.soundEngine.playCheer() },
      { id: 'fanfare', name: '勝利號角', icon: '🎺', color: '#2F9E44', fn: () => window.soundEngine.playFanfare() },
      { id: 'correct', name: '答對啦！', icon: '🔔', color: '#1971C2', fn: () => window.soundEngine.playCorrect() },
      { id: 'wrong', name: '再想想～', icon: '🤔', color: '#868E96', fn: () => window.soundEngine.playWrong() },
      { id: 'fireworks', name: '盛大煙火', icon: '🎆', color: '#9C36B5', fn: () => window.soundEngine.playFireworks() }
    ];

    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 10px;">
        <!-- Section 1: Classroom Interactive Sound Effects -->
        <div style="background: #FFF9DB; border: 1.5px solid #FFE066; border-radius: 12px; padding: 8px 10px;">
          <div style="font-size: 0.78rem; font-weight: 900; color: #D9480F; margin-bottom: 6px; display: flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-volume-high"></i> 課堂即時互動音效（點擊即時發聲）：
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
            ${soundEffects.map(s => `
              <button type="button" class="sfx-btn" data-id="${s.id}" style="background: #FFF; border: 1.5px solid ${s.color}44; border-radius: 8px; padding: 6px 4px; display: flex; align-items: center; justify-content: center; gap: 4px; font-weight: 800; font-size: 0.8rem; color: #2D3748; cursor: pointer; transition: all 0.12s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <span style="font-size: 1.1rem;">${s.icon}</span>
                <span>${s.name}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Section 2: Electronic Stickers -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.8rem; font-weight: 800; color: var(--text-muted);">榮譽貼紙（點擊印在黑板，可自由拖曳）：</span>
          <button type="button" class="action-btn-secondary" id="stickers-clear-all-btn" style="height: 24px; font-size: 0.72rem; padding: 0 8px; color: #E03131; border-color: #FFA8A8;" title="清除桌面上所有已蓋出的貼紙">
            <i class="fa-solid fa-trash-can"></i> 清除全部貼紙
          </button>
        </div>
        <div class="stickers-grid" style="flex: 1; overflow-y: auto;">
          ${stickers.map(s => `<div class="sticker-badge" data-emoji="${s}">${s}</div>`).join('')}
        </div>
      </div>
    `;

    wm.createWindow({
      title: '電子獎勵與互動音效', icon: 'fa-award', iconColor: '#FFD166', width: 360, height: 420, type: 'stickers', contentHtml: content,
      onInit: (el) => {
        // Bind Sound Effect Buttons
        el.querySelectorAll('.sfx-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const targetSfx = soundEffects.find(s => s.id === id);
            if (targetSfx) {
              btn.style.transform = 'scale(0.92)';
              setTimeout(() => btn.style.transform = '', 140);
              targetSfx.fn();
            }
          });
        });

        const clearBtn = el.querySelector('#stickers-clear-all-btn');
        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            const allStamps = document.querySelectorAll('.puti-screen-sticker-stamp');
            if (allStamps.length === 0) return alert('目前桌面上沒有蓋出的貼紙！');
            if (confirm(`確定要清除桌面上的 ${allStamps.length} 張貼紙嗎？`)) {
              allStamps.forEach(s => s.remove());
              window.soundEngine.playPop();
            }
          });
        }

        el.querySelectorAll('.sticker-badge').forEach(badge => {
          badge.addEventListener('click', () => {
            const emoji = badge.dataset.emoji;
            window.soundEngine.playFanfare();
            if (typeof confetti === 'function') confetti({ particleCount: 30, spread: 50 });
            const stamp = document.createElement('div');
            stamp.className = 'puti-screen-sticker-stamp';
            stamp.style.cssText = `position: absolute; left: ${Math.random()*300+100}px; top: ${Math.random()*200+80}px; font-size: 4.5rem; cursor: grab; user-select: none; z-index: 200; filter: drop-shadow(0 6px 14px rgba(0,0,0,0.25)); animation: stampBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);`;
            stamp.textContent = emoji;
            stamp.title = '雙擊可撕除此貼紙';
            let isDragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
            stamp.addEventListener('pointerdown', (e) => {
              isDragging = true;
              stamp.setPointerCapture(e.pointerId);
              sx = e.clientX;
              sy = e.clientY;
              ox = stamp.offsetLeft;
              oy = stamp.offsetTop;
            });
            stamp.addEventListener('pointermove', (e) => {
              if (!isDragging) return;
              stamp.style.left = (ox + e.clientX - sx) + 'px';
              stamp.style.top = (oy + e.clientY - sy) + 'px';
            });
            stamp.addEventListener('pointerup', (e) => {
              isDragging = false;
              try { stamp.releasePointerCapture(e.pointerId); } catch(err){}
            });
            stamp.addEventListener('dblclick', () => {
              stamp.remove();
              window.soundEngine.playPop();
            });
            document.getElementById('desktop-canvas').appendChild(stamp);
          });
        });
      }
    });
  },
  spawnPDFViewer(wm) {
    const sampleLessonDoc = `<div style="background: #FFF; padding: 24px; font-family: sans-serif; color: #2D3748; height: 100%; overflow-y: auto;"><h2 style="color: #FF9F1C; border-bottom: 2px solid #FF9F1C; padding-bottom: 6px; margin-bottom: 14px;">國小自然科學 · 探索學習單</h2><div style="font-weight: 700; margin-bottom: 10px;">單元：植物的器官與光合作用</div><p style="line-height: 1.8; margin-bottom: 12px;">一、核心觀念：植物透過葉綠體吸收日光進行光合作用。</p><div style="border: 2px dashed #CBD5E1; border-radius: 12px; height: 120px; display: flex; align-items: center; justify-content: center; color: #94A3B8; margin-top: 20px;">請直接拖入電腦中的 PDF 檔案</div></div>`;
    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <label class="action-btn-main" style="height: 32px; font-size: 0.82rem; padding: 0 14px; cursor: pointer; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-file-arrow-up"></i> 載入電腦 PDF
            <input type="file" id="pdf-file-picker" accept="application/pdf" style="display: none;">
          </label>
          <button class="action-btn-secondary" id="pdf-sample-btn" style="height: 32px; font-size: 0.82rem;">範例學習單</button>
        </div>
        <div class="media-frame-wrapper" id="pdf-frame-box" style="border: 2px dashed var(--border-subtle);">${sampleLessonDoc}</div>
      </div>
    `;
    wm.createWindow({
      title: 'PDF 講義閱讀器', icon: 'fa-file-pdf', iconColor: '#E63946', width: 540, height: 440, type: 'pdf', contentHtml: content,
      onInit: (el) => {
        const picker = el.querySelector('#pdf-file-picker'), box = el.querySelector('#pdf-frame-box'), sampleBtn = el.querySelector('#pdf-sample-btn');
        const load = (url) => { box.innerHTML = `<embed src="${url}" type="application/pdf" style="width: 100%; height: 100%;">`; };
        picker.addEventListener('change', (e) => { if (e.target.files[0]) load(URL.createObjectURL(e.target.files[0])); });
        sampleBtn.addEventListener('click', () => { box.innerHTML = sampleLessonDoc; });
        box.addEventListener('dragover', (e) => e.preventDefault());
        box.addEventListener('drop', (e) => { e.preventDefault(); if (e.dataTransfer.files[0]) load(URL.createObjectURL(e.dataTransfer.files[0])); });
      }
    });
  },

  spawnQRCode(wm) {
    const content = `
      <div class="qrcode-container">
        <div style="display: flex; gap: 6px; width: 100%;">
          <input type="text" id="qr-input" value="https://padlet.com/clongwh/puti_ai_tools" placeholder="輸入網址..." style="flex: 1; padding: 6px 12px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); outline: none; font-size: 0.85rem;">
          <button class="action-btn-main" id="qr-gen-btn" style="height: 34px; padding: 0 14px; font-size: 0.82rem;">產生</button>
        </div>
        <div class="qrcode-box" id="qr-canvas-box" style="min-height: 180px; min-width: 180px;"></div>
        <button class="action-btn-secondary" id="qr-expand-btn" style="height: 32px; width: 100%; font-size: 0.8rem;">
          <i class="fa-solid fa-expand"></i> 巨幅投影放大
        </button>
      </div>
    `;
    wm.createWindow({
      title: 'QR Code 產生器', icon: 'fa-qrcode', iconColor: '#1B4965', width: 320, height: 350, type: 'qrcode', contentHtml: content,
      onInit: (el) => {
        const input = el.querySelector('#qr-input'), genBtn = el.querySelector('#qr-gen-btn'), box = el.querySelector('#qr-canvas-box'), expandBtn = el.querySelector('#qr-expand-btn');
        const makeCode = () => {
          box.innerHTML = '';
          const val = input.value.trim() || 'https://padlet.com/clongwh/puti_ai_tools';
          if (typeof QRCode !== 'undefined') {
            try { new QRCode(box, { text: val, width: 180, height: 180, colorDark: "#2D3748", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.H }); return; } catch(e){}
          }
          box.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(val)}" width="180" height="180">`;
        };
        genBtn.addEventListener('click', makeCode);
        expandBtn.addEventListener('click', () => {
          const val = input.value.trim() || 'https://padlet.com/clongwh/puti_ai_tools';
          window.openQRLightbox('QR Code 投影條碼', val, val);
        });
        makeCode();
      }
    });
  },

  spawnHyperlink(wm) {
    const links = [
      { name: 'Padlet 資源庫', url: 'https://padlet.com/clongwh/puti_ai_tools', icon: 'fa-paperclip', color: '#FF9F1C' },
      { name: 'Kahoot 遊戲', url: 'https://kahoot.com', icon: 'fa-gamepad', color: '#46178F' },
      { name: 'Google Classroom', url: 'https://classroom.google.com', icon: 'fa-graduation-cap', color: '#2BA640' },
      { name: 'Wordwall', url: 'https://wordwall.net', icon: 'fa-puzzle-piece', color: '#0077CC' },
      { name: 'Canva 簡報', url: 'https://www.canva.com', icon: 'fa-wand-magic-sparkles', color: '#00C4CC' },
      { name: 'YouTube', url: 'https://youtube.com', icon: 'fa-play', color: '#FF0000' }
    ];
    const content = `<div class="hyperlink-grid">${links.map(l => `<a href="${l.url}" target="_blank" class="hyperlink-card"><i class="fa-solid ${l.icon}" style="color: ${l.color}; font-size: 1.1rem;"></i><span>${l.name}</span></a>`).join('')}</div>`;
    wm.createWindow({ title: '常用教學連結', icon: 'fa-arrow-up-right-from-square', iconColor: '#3A86FF', width: 340, height: 250, type: 'hyperlink', contentHtml: content });
  },

  spawnVideo(wm) {
    const content = `
      <div class="video-container">
        <div style="display: flex; gap: 6px;">
          <input type="text" id="vid-url-input" placeholder="貼上 YouTube 影片網址..." style="flex: 1; padding: 6px 12px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); outline: none; font-size: 0.85rem;">
          <button class="action-btn-main" id="vid-play-btn" style="height: 32px; padding: 0 12px; font-size: 0.8rem;">播放</button>
        </div>
        <div style="display: flex; gap: 6px; overflow-x: auto;">
          <button class="preset-chip vid-chip" data-id="jfKfPfyJRdk">5分專注音樂</button>
          <button class="preset-chip vid-chip" data-id="5qap5aO4i9A">Lofi 輕音樂</button>
        </div>
        <div class="media-frame-wrapper" id="vid-box">
          <iframe id="vid-iframe" src="https://www.youtube.com/embed/jfKfPfyJRdk" allowfullscreen></iframe>
        </div>
      </div>
    `;
    wm.createWindow({
      title: '課堂影片播放', icon: 'fa-circle-play', iconColor: '#E63946', width: 480, height: 360, type: 'video', contentHtml: content,
      onInit: (el) => {
        const input = el.querySelector('#vid-url-input'), playBtn = el.querySelector('#vid-play-btn'), iframe = el.querySelector('#vid-iframe');
        const parseYoutube = (url) => {
          const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
          return match ? match[1] : '';
        };
        playBtn.addEventListener('click', () => { const id = parseYoutube(input.value.trim()); if (id) iframe.src = `https://www.youtube.com/embed/${id}`; });
        el.querySelectorAll('.vid-chip').forEach(c => c.addEventListener('click', () => { iframe.src = `https://www.youtube.com/embed/${c.dataset.id}`; }));
      }
    });
  },

  spawnEmbed(wm) {
    const embeds = [
      { name: 'PhET 能量模擬', url: 'https://phet.colorado.edu/sims/html/energy-skate-park-basics/latest/energy-skate-park-basics_all.html' },
      { name: 'GeoGebra 幾何', url: 'https://www.geogebra.org/classic' },
      { name: 'Padlet', url: 'https://padlet.com/clongwh/puti_ai_tools' }
    ];
    const content = `
      <div class="embed-container">
        <div style="display: flex; gap: 6px;">
          <input type="url" id="embed-url-input" value="${embeds[0].url}" placeholder="輸入網址..." style="flex: 1; padding: 6px 12px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); outline: none; font-size: 0.85rem;">
          <button class="action-btn-main" id="embed-go-btn" style="height: 32px; padding: 0 12px; font-size: 0.8rem;">前往</button>
        </div>
        <div style="display: flex; gap: 6px;">
          ${embeds.map(e => `<button class="preset-chip embed-chip" data-url="${e.url}">${e.name}</button>`).join('')}
        </div>
        <div class="media-frame-wrapper"><iframe id="embed-iframe" src="${embeds[0].url}" style="width: 100%; height: 100%; background: #FFF; border: none;"></iframe></div>
      </div>
    `;
    wm.createWindow({
      title: '網頁互動嵌入', icon: 'fa-code', iconColor: '#6A4C93', width: 520, height: 400, type: 'embed', contentHtml: content,
      onInit: (el) => {
        const input = el.querySelector('#embed-url-input'), goBtn = el.querySelector('#embed-go-btn'), iframe = el.querySelector('#embed-iframe');
        goBtn.addEventListener('click', () => { if (input.value.trim()) iframe.src = input.value.trim(); });
        el.querySelectorAll('.embed-chip').forEach(c => c.addEventListener('click', () => { input.value = c.dataset.url; iframe.src = c.dataset.url; }));
      }
    });
  },

  spawnWebcam(wm) {
    let stream = null;
    let mirrored = false;
    let isFrozen = false;
    let currentMode = 'webcam'; // 'webcam' | 'mobile'
    let peer = null;
    let peerCall = null;
    const room = (localStorage.getItem('puti_classroom_room') || 'C8888').toUpperCase();

    const content = `
      <div class="webcam-container" style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <!-- Top Controls Bar -->
        <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
          <select id="webcam-device-select" style="flex: 1; min-width: 170px; height: 32px; padding: 2px 10px; border-radius: var(--radius-pill); border: 1.5px solid #CBD5E1; outline: none; font-size: 0.82rem; font-weight: 700; background: #FFF; color: #1E293B; cursor: pointer;">
            <option value="">本機鏡頭 / USB實物投影機</option>
            <option value="mobile-cam" style="color: #2563EB; font-weight: 800;">📱 手機無線實物投影 (即時串流)</option>
          </select>
          <button class="action-btn-secondary" id="webcam-mirror-btn" style="height: 32px; padding: 0 10px; font-size: 0.78rem; flex: 0 0 auto;" title="左右翻轉鏡像">
            <i class="fa-solid fa-arrows-left-right"></i> 鏡像
          </button>
          <button class="action-btn-secondary" id="webcam-snap-btn" style="height: 32px; padding: 0 10px; font-size: 0.78rem; flex: 0 0 auto;" title="拍照定格 / 另存為圖片">
            <i class="fa-solid fa-camera"></i> 定格截圖
          </button>
          <button class="action-btn-secondary" id="webcam-mobile-btn" style="height: 32px; padding: 0 10px; font-size: 0.78rem; color: #2563EB; border-color: #BFDBFE; background: #EFF6FF; flex: 0 0 auto; font-weight: 800;" title="顯示手機掃碼連線 QR Code">
            <i class="fa-solid fa-qrcode"></i> 手機掃碼
          </button>
        </div>

        <!-- Video Frame Area (Preserves aspect ratio, never squashed) -->
        <div class="webcam-video-box" style="flex: 1; background: #0F172A; border-radius: var(--radius-sm); overflow: hidden; position: relative; display: flex; align-items: center; justify-content: center; min-height: 220px;">
          <video id="webcam-video" autoplay playsinline style="width: 100%; height: 100%; object-fit: contain; display: block; background: #000;"></video>
          <canvas id="webcam-canvas" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain;"></canvas>
          
          <!-- Empty View / Standby -->
          <div id="webcam-empty-tip" style="position: absolute; color: #94A3B8; font-size: 0.9rem; font-weight: 700; display: flex; flex-direction: column; align-items: center; gap: 8px; pointer-events: none; text-align: center; padding: 16px;">
            <i class="fa-solid fa-camera-retro" style="font-size: 2.2rem; color: #475569;"></i>
            <span>點擊下方「開啟鏡頭」或於上方選單切換「📱 手機無線實物投影」</span>
          </div>

          <!-- Mobile QR Code Overlay (shows when mobile mode is selected and waiting for phone) -->
          <div id="webcam-mobile-qr-box" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.95); flex-direction: column; align-items: center; justify-content: center; gap: 10px; z-index: 5; padding: 14px; text-align: center;">
            <div style="font-weight: 800; font-size: 0.95rem; color: #38BDF8; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-mobile-screen"></i> 手機無線實物投影機（頻道: ${room}）
            </div>
            <div id="webcam-qr-container" style="background: #FFF; padding: 8px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);"></div>
            <div style="font-size: 0.82rem; color: #E2E8F0; font-weight: 700;">
              請用手機掃描上方 QR 碼，手機鏡頭即刻在大螢幕 30fps 即時動態投影！
            </div>
          </div>

          <!-- Mobile Standby Overlay (shows when phone is connected but stream is loading) -->
          <div id="webcam-mobile-standby" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0F172A; flex-direction: column; align-items: center; justify-content: center; gap: 12px; z-index: 6; text-align: center; padding: 20px;">
            <div style="width: 58px; height: 58px; border-radius: 50%; background: rgba(56, 189, 248, 0.15); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: #38BDF8; border: 2px solid #38BDF8;">
              <i class="fa-solid fa-mobile-screen"></i>
            </div>
            <div style="font-size: 1.15rem; color: #F8FAFC; font-weight: 800;">📱 手機無線實物投影連線中...</div>
            <div style="font-size: 0.85rem; color: #94A3B8; max-width: 360px; line-height: 1.6;">
              正在建立 WebRTC 點對點即時影像串流，請保持手機螢幕開啟。
            </div>
          </div>

          <!-- Status Badges -->
          <div id="webcam-freeze-badge" style="display: none; position: absolute; top: 10px; left: 10px; background: rgba(220, 38, 38, 0.9); color: #FFF; padding: 3px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; box-shadow: 0 2px 8px rgba(0,0,0,0.4); z-index: 8;">
            ⏸️ 畫面已定格
          </div>
          <div id="webcam-source-badge" style="display: none; position: absolute; top: 10px; right: 10px; background: rgba(37, 99, 235, 0.9); color: #FFF; padding: 3px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; box-shadow: 0 2px 8px rgba(0,0,0,0.4); z-index: 8;">
            📱 手機即時視訊 (30fps)
          </div>
        </div>

        <!-- Bottom Controls Bar (Fixed height, no giant button) -->
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
          <div style="font-size: 0.78rem; color: #64748B; font-weight: 700;" id="webcam-status-tip">
            💡 支援 USB 實物投影機、電腦鏡頭或手機無線串流
          </div>
          <button id="webcam-toggle-btn" style="height: 34px; padding: 0 18px; font-size: 0.85rem; font-weight: 800; border: none; border-radius: var(--radius-pill); background: linear-gradient(135deg, #FF9F1C, #FF7B00); color: #FFF; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(255,159,28,0.3); flex: 0 0 auto; transition: all 0.2s;">
            <i class="fa-solid fa-video"></i> 開啟鏡頭
          </button>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '實物投影 / 鏡頭', icon: 'fa-camera', iconColor: '#0077B6', width: 560, height: 440, minWidth: 380, minHeight: 320, type: 'webcam', contentHtml: content,
      onInit: (el) => {
        const video = el.querySelector('#webcam-video');
        const canvas = el.querySelector('#webcam-canvas');
        const emptyTip = el.querySelector('#webcam-empty-tip');
        const freezeBadge = el.querySelector('#webcam-freeze-badge');
        const sourceBadge = el.querySelector('#webcam-source-badge');
        const toggleBtn = el.querySelector('#webcam-toggle-btn');
        const mirrorBtn = el.querySelector('#webcam-mirror-btn');
        const snapBtn = el.querySelector('#webcam-snap-btn');
        const mobileBtn = el.querySelector('#webcam-mobile-btn');
        const deviceSelect = el.querySelector('#webcam-device-select');
        const mobileQrBox = el.querySelector('#webcam-mobile-qr-box');
        const mobileStandby = el.querySelector('#webcam-mobile-standby');
        const qrContainer = el.querySelector('#webcam-qr-container');
        const statusTip = el.querySelector('#webcam-status-tip');

        const origin = window.location.origin;
        const mobileUrl = origin + (origin.includes('github.io') ? '/puti-classroomscreen' : '') + '/mobile-cam.html?room=' + room;

        // Generate in-box QR Code
        if (typeof QRCode !== 'undefined' && qrContainer) {
          qrContainer.innerHTML = '';
          new QRCode(qrContainer, {
            text: mobileUrl,
            width: 140,
            height: 140,
            colorDark: '#0f172a',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
          });
        }

        // Initialize PeerJS for WebRTC Live Stream from Phone
        const initPeerReceiver = () => {
          if (typeof Peer === 'undefined') return;
          const peerId = 'puti-cam-' + room.toLowerCase();
          try {
            if (peer) peer.destroy();
            peer = new Peer(peerId, { debug: 0 });

            peer.on('open', (id) => {
              console.log('[Webcam] PeerJS receiver ready with ID:', id);
            });

            peer.on('call', (call) => {
              peerCall = call;
              call.answer(); // Answer without sending local stream
              call.on('stream', (remoteStream) => {
                // LIVE 30FPS VIDEO STREAM FROM SMARTPHONE!
                video.srcObject = remoteStream;
                video.style.display = 'block';
                canvas.style.display = 'none';
                emptyTip.style.display = 'none';
                mobileQrBox.style.display = 'none';
                mobileStandby.style.display = 'none';
                sourceBadge.textContent = '📱 手機即時視訊 (30fps)';
                sourceBadge.style.display = 'block';
                statusTip.textContent = '🟢 手機實物投影即時串流中！';
                const mobileOpt = deviceSelect.querySelector('option[value="mobile-cam"]');
                if (mobileOpt) mobileOpt.textContent = '📱 手機無線實物投影 (已連線 🟢)';
                deviceSelect.value = 'mobile-cam';
                currentMode = 'mobile';
                toggleBtn.style.display = 'none';
                window.soundEngine.playSuccess();
              });

              call.on('close', () => {
                sourceBadge.style.display = 'none';
                statusTip.textContent = '📱 手機連線已關閉';
              });
            });
          } catch(e) {
            console.warn('[Webcam] PeerJS init error:', e);
          }
        };

        initPeerReceiver();

        // Enumerate local webcam devices
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          navigator.mediaDevices.enumerateDevices().then(devices => {
            const vds = devices.filter(d => d.kind === 'videoinput');
            if (vds.length > 0) {
              const optionsHtml = vds.map((d, i) => `<option value="${d.deviceId}">${d.label || `攝影機 ${i+1}`}</option>`).join('');
              deviceSelect.innerHTML = `<option value="">本機鏡頭 / USB實物投影機</option>${optionsHtml}<option value="mobile-cam" style="color: #2563EB; font-weight: 800;">📱 手機無線實物投影 (即時串流)</option>`;
            }
          }).catch(console.warn);
        }

        // Robust Local Webcam Start (Never throws OverconstrainedError)
        const startLocalWebcam = async () => {
          try {
            const id = deviceSelect.value;
            // Use simple constraint to guarantee compatibility with all hardware
            const constraints = {
              video: id && id !== 'mobile-cam' ? { deviceId: { exact: id } } : true,
              audio: false
            };
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = stream;
            video.style.display = 'block';
            emptyTip.style.display = 'none';
            mobileQrBox.style.display = 'none';
            mobileStandby.style.display = 'none';
            canvas.style.display = 'none';
            sourceBadge.style.display = 'none';
            isFrozen = false;
            freezeBadge.style.display = 'none';
            toggleBtn.innerHTML = '<i class="fa-solid fa-stop"></i> 關閉鏡頭';
            toggleBtn.style.background = '#EF4444';
            statusTip.textContent = '🟢 本機實物投影機/鏡頭運作中';
          } catch(e) {
            console.error('Webcam access error:', e);
            alert('⚠️ 無法存取本機鏡頭！請確認瀏覽器已允許相機權限，或檢查相機是否被其他軟體佔用。');
          }
        };

        const stopLocalWebcam = () => {
          if (stream) {
            stream.getTracks().forEach(t => t.stop());
            stream = null;
          }
          video.srcObject = null;
          if (currentMode === 'webcam') {
            emptyTip.style.display = 'flex';
            mobileQrBox.style.display = 'none';
          }
          canvas.style.display = 'none';
          isFrozen = false;
          freezeBadge.style.display = 'none';
          toggleBtn.innerHTML = '<i class="fa-solid fa-video"></i> 開啟鏡頭';
          toggleBtn.style.background = 'linear-gradient(135deg, #FF9F1C, #FF7B00)';
          statusTip.textContent = '💡 支援 USB 實物投影機、電腦鏡頭或手機無線串流';
        };

        // Switch source mode from Dropdown
        deviceSelect.addEventListener('change', () => {
          if (deviceSelect.value === 'mobile-cam') {
            currentMode = 'mobile';
            stopLocalWebcam();
            emptyTip.style.display = 'none';
            toggleBtn.style.display = 'none';
            if (video.srcObject && video.srcObject.active) {
              video.style.display = 'block';
              mobileQrBox.style.display = 'none';
            } else {
              mobileQrBox.style.display = 'flex';
              statusTip.textContent = '📱 請用手機掃描畫面中的 QR 碼即可即時投影！';
            }
          } else {
            currentMode = 'webcam';
            mobileQrBox.style.display = 'none';
            mobileStandby.style.display = 'none';
            toggleBtn.style.display = 'inline-flex';
            sourceBadge.style.display = 'none';
            startLocalWebcam();
          }
          window.soundEngine.playTick();
        });

        toggleBtn.addEventListener('click', () => {
          if (stream) stopLocalWebcam(); else startLocalWebcam();
          window.soundEngine.playPop();
        });

        mirrorBtn.addEventListener('click', () => {
          mirrored = !mirrored;
          const transformVal = mirrored ? 'scaleX(-1)' : 'scaleX(1)';
          video.style.transform = transformVal;
          canvas.style.transform = transformVal;
          window.soundEngine.playTick();
        });

        // Freeze / Snapshot
        snapBtn.addEventListener('click', () => {
          if (!video.srcObject && !isFrozen) {
            alert('請先開啟鏡頭或連線手機後再定格截圖！');
            return;
          }
          if (isFrozen) {
            // Unfreeze
            isFrozen = false;
            canvas.style.display = 'none';
            video.style.display = 'block';
            freezeBadge.style.display = 'none';
            snapBtn.innerHTML = '<i class="fa-solid fa-camera"></i> 定格截圖';
          } else {
            // Freeze
            isFrozen = true;
            canvas.width = video.videoWidth || 1280;
            canvas.height = video.videoHeight || 720;
            const ctx = canvas.getContext('2d');
            if (mirrored) {
              ctx.translate(canvas.width, 0);
              ctx.scale(-1, 1);
            }
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.style.display = 'block';
            video.style.display = 'none';
            freezeBadge.style.display = 'block';
            snapBtn.innerHTML = '<i class="fa-solid fa-play"></i> 恢復即時';
            window.soundEngine.playApplause();
          }
        });

        // Mobile Camera QR Code button
        mobileBtn.addEventListener('click', () => {
          if (typeof window.openQRLightbox === 'function') {
            window.openQRLightbox('📱 手機無線實物投影機', mobileUrl, `請用手機相機掃描 QR Code，即可將手機當作無線實物投影機，對準學生作業即時視訊投影至大螢幕！`);
          } else {
            prompt('請用手機開啟以下連結（或掃描 QR 碼）：', mobileUrl);
          }
          window.soundEngine.playBell();
        });

        // Realtime MQTT fallback listener
        if (window.realtimeEngine) {
          window.realtimeEngine.subscribe('webcam/join', (data) => {
            const mobileOpt = deviceSelect.querySelector('option[value="mobile-cam"]');
            if (mobileOpt) mobileOpt.textContent = '📱 手機無線實物投影 (已連線 🟢)';
            statusTip.textContent = '🟢 手機已連線！正在同步即時視訊...';
            window.soundEngine.playSuccess();
          });

          window.realtimeEngine.subscribe('webcam/snapshot', (data) => {
            if (data && data.imageUrl) {
              const img = new Image();
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                canvas.style.display = 'block';
                video.style.display = 'none';
                emptyTip.style.display = 'none';
                mobileQrBox.style.display = 'none';
                mobileStandby.style.display = 'none';
                sourceBadge.textContent = '📱 來自手機即時投影';
                sourceBadge.style.display = 'block';
                statusTip.textContent = '📷 已接收手機即時影像！';
              };
              img.src = data.imageUrl;
            }
          });
        }
      },
      onClose: () => {
        if (stream) {
          stream.getTracks().forEach(t => t.stop());
          stream = null;
        }
        if (peer) {
          peer.destroy();
          peer = null;
        }
      }
    });
  },
  spawnAmbientSound(wm) {
    let currentNoise = null, audioCtx = null;
    const sounds = [{ id: 'rain', name: '綿綿細雨', icon: 'fa-cloud-rain' }, { id: 'forest', name: '森林鳥語', icon: 'fa-tree' }, { id: 'waves', name: '海浪拍岸', icon: 'fa-water' }, { id: 'cafe', name: '午後咖啡', icon: 'fa-mug-hot' }];
    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 10px;">
        <div style="font-size: 0.85rem; color: var(--text-muted); text-align: center;">原生合成白噪音，烘托專注氣氛</div>
        <div class="ambient-grid">${sounds.map(s => `<button class="ambient-btn" data-sound="${s.id}"><i class="fa-solid ${s.icon}"></i><span>${s.name}</span></button>`).join('')}</div>
        <button class="action-btn-secondary" id="amb-stop-btn" style="height: 36px; font-size: 0.85rem;"><i class="fa-solid fa-stop"></i> 停止播放</button>
      </div>
    `;
    wm.createWindow({
      title: '專注音訊與白噪音', icon: 'fa-headphones', iconColor: '#2A9D8F', width: 310, height: 250, type: 'ambient', contentHtml: content,
      onInit: (el) => {
        const btns = el.querySelectorAll('.ambient-btn'), stopBtn = el.querySelector('#amb-stop-btn');
        const stop = () => { if (currentNoise) { try { currentNoise.stop(); } catch(e){} currentNoise = null; } btns.forEach(b => b.classList.remove('active')); };
        const playNoise = () => {
          stop(); if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const bufferSize = audioCtx.sampleRate * 2, buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate), data = buffer.getChannelData(0);
          let lastOut = 0.0; for (let i = 0; i < bufferSize; i++) { const w = Math.random() * 2 - 1; data[i] = (lastOut + (0.02 * w)) / 1.02; lastOut = data[i]; data[i] *= 1.8; }
          const noise = audioCtx.createBufferSource(); noise.buffer = buffer; noise.loop = true;
          const gain = audioCtx.createGain(); gain.gain.value = 0.15; noise.connect(gain); gain.connect(audioCtx.destination); noise.start(); currentNoise = noise;
        };
        btns.forEach(btn => btn.addEventListener('click', () => { btns.forEach(b => b.classList.remove('active')); btn.classList.add('active'); playNoise(); }));
        stopBtn.addEventListener('click', stop);
      },
      onClose: () => { if (currentNoise) { try { currentNoise.stop(); } catch(e){} } }
    });
  },

  // =========================================================================
  // 個人計分器 (Individual Score Counter)
  // =========================================================================
  spawnIndividualTally(wm) {
    let roster = JSON.parse(localStorage.getItem('puti_student_roster') || 'null') || Array.from({ length: 30 }, (_, i) => `${i + 1} 號同學`);
    let scores = JSON.parse(localStorage.getItem('puti_individual_scores') || '{}');
    let sortMode = 'number'; // 'number' | 'rank'

    roster.forEach(name => {
      if (scores[name] === undefined) scores[name] = 0;
    });

    const saveScores = () => {
      localStorage.setItem('puti_individual_scores', JSON.stringify(scores));
    };

    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 10px;">
        <!-- Top Action Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #FFF9DB; padding: 6px 12px; border-radius: 12px; border: 1px solid #FFE066; flex-wrap: wrap; gap: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 0.8rem; font-weight: 800; color: #D9480F;"><i class="fa-solid fa-trophy"></i> 學生個人點數榜</span>
            <div style="display: flex; gap: 4px;">
              <button type="button" class="action-btn-secondary" id="tally-sort-num" style="height: 26px; padding: 0 8px; font-size: 0.74rem; background: #FFF; font-weight: 800;">座號序</button>
              <button type="button" class="action-btn-secondary" id="tally-sort-rank" style="height: 26px; padding: 0 8px; font-size: 0.74rem; background: #FFF;">排行榜</button>
            </div>
          </div>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="action-btn-main" id="tally-all-plus" style="height: 28px; padding: 0 10px; font-size: 0.75rem; background: linear-gradient(135deg, #2B8A3E, #20C997);" title="全班每人加 1 分">
              <i class="fa-solid fa-star"></i> 全班+1
            </button>
            <button type="button" class="action-btn-secondary" id="tally-config-btn" style="height: 28px; padding: 0 8px; font-size: 0.75rem;" title="自訂學生名單（一行一個）">
              <i class="fa-solid fa-users-line"></i> 名單 (<span id="tally-roster-count">${roster.length}</span>人)
            </button>
            <button type="button" class="action-btn-secondary" id="tally-reset-btn" style="height: 28px; padding: 0 8px; font-size: 0.75rem; color: #FA5252;" title="全部個人分數歸零">
              <i class="fa-solid fa-rotate-left"></i> 歸零
            </button>
          </div>
        </div>

        <!-- Student Cards Grid -->
        <div class="tally-grid" id="tally-cards-grid" style="flex: 1; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(115px, 1fr)); gap: 8px; padding: 4px;"></div>
      </div>
    `;

    wm.createWindow({
      title: '個人計分器',
      icon: 'fa-user-check',
      iconColor: '#FF7B00',
      width: 580,
      height: 480,
      type: 'tally',
      contentHtml: content,
      onInit: (el) => {
        const grid = el.querySelector('#tally-cards-grid');
        const sortNumBtn = el.querySelector('#tally-sort-num');
        const sortRankBtn = el.querySelector('#tally-sort-rank');
        const allPlusBtn = el.querySelector('#tally-all-plus');
        const configBtn = el.querySelector('#tally-config-btn');
        const countSpan = el.querySelector('#tally-roster-count');
        const resetBtn = el.querySelector('#tally-reset-btn');

        const renderCards = () => {
          let list = [...roster];
          if (sortMode === 'rank') {
            list.sort((a, b) => (scores[b] || 0) - (scores[a] || 0));
          }

          if (countSpan) countSpan.textContent = roster.length;

          grid.innerHTML = list.map((name, idx) => {
            const sc = scores[name] || 0;
            let rankBadge = '';
            if (sortMode === 'rank') {
              if (idx === 0 && sc > 0) rankBadge = '🥇';
              else if (idx === 1 && sc > 0) rankBadge = '🥈';
              else if (idx === 2 && sc > 0) rankBadge = '🥉';
              else rankBadge = `<span style="font-size:0.7rem; color:#868E96;">#${idx+1}</span>`;
            }

            return `
              <div class="tally-card" data-name="${name}" style="background: #FFF; border: 1.5px solid #E9ECEF; border-radius: 12px; padding: 8px; display: flex; flex-direction: column; align-items: center; gap: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); transition: all 0.15s ease;">
                <div style="font-size: 0.78rem; font-weight: 800; color: #495057; display: flex; align-items: center; gap: 3px; width: 100%; justify-content: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  ${rankBadge} <span>${name}</span>
                </div>
                <div class="tally-score" style="font-size: 1.6rem; font-weight: 900; color: #E8590C; font-family: var(--font-num); line-height: 1.1; font-variant-numeric: tabular-nums;">
                  ${sc}
                </div>
                <div style="display: flex; gap: 4px; width: 100%; margin-top: 2px;">
                  <button type="button" class="tally-minus-btn" style="flex: 1; height: 26px; border: 1px solid #CED4DA; background: #F8F9FA; border-radius: 6px; font-weight: bold; cursor: pointer; color: #495057;">-</button>
                  <button type="button" class="tally-plus-btn" style="flex: 1.6; height: 26px; border: none; background: #FF922B; color: white; border-radius: 6px; font-weight: bold; cursor: pointer; box-shadow: 0 1px 4px rgba(255, 146, 43, 0.4);">+</button>
                </div>
              </div>
            `;
          }).join('');

          // Bind card buttons
          grid.querySelectorAll('.tally-card').forEach(card => {
            const name = card.getAttribute('data-name');
            const plusBtn = card.querySelector('.tally-plus-btn');
            const minusBtn = card.querySelector('.tally-minus-btn');

            plusBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              scores[name] = (scores[name] || 0) + 1;
              saveScores();
              renderCards();
              window.soundEngine.playPop();
            });

            minusBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              scores[name] = Math.max(0, (scores[name] || 0) - 1);
              saveScores();
              renderCards();
              window.soundEngine.playTick();
            });
          });
        };

        sortNumBtn.addEventListener('click', () => {
          sortMode = 'number';
          sortNumBtn.style.fontWeight = '800';
          sortRankBtn.style.fontWeight = 'normal';
          renderCards();
          window.soundEngine.playTick();
        });

        sortRankBtn.addEventListener('click', () => {
          sortMode = 'rank';
          sortRankBtn.style.fontWeight = '800';
          sortNumBtn.style.fontWeight = 'normal';
          renderCards();
          window.soundEngine.playTick();
        });

        allPlusBtn.addEventListener('click', () => {
          roster.forEach(name => {
            scores[name] = (scores[name] || 0) + 1;
          });
          saveScores();
          renderCards();
          window.soundEngine.playFanfare();
          if (typeof confetti === 'function') confetti({ particleCount: 60, spread: 60 });
        });

        resetBtn.addEventListener('click', () => {
          if (confirm('確定要將全班同學的個人點數全部歸零嗎？')) {
            roster.forEach(name => { scores[name] = 0; });
            saveScores();
            renderCards();
            window.soundEngine.playTick();
          }
        });

        const onTallyRosterUpdated = (e) => {
          if (e.detail && Array.isArray(e.detail)) {
            roster = [...e.detail];
            roster.forEach(name => {
              if (scores[name] === undefined) scores[name] = 0;
            });
            saveScores();
            renderCards();
          }
        };
        window.addEventListener('rosterUpdated', onTallyRosterUpdated);

        configBtn.addEventListener('click', () => {
          if (typeof window.openRosterEditor === 'function') {
            window.openRosterEditor(roster, (newList) => {
              roster = newList;
              roster.forEach(name => {
                if (scores[name] === undefined) scores[name] = 0;
              });
              saveScores();
              renderCards();
            });
          } else {
            // Fallback: direct prompt with multiline format
            const raw = prompt('請輸入全班名單（一行一位同學）：\n', roster.join('\n'));
            if (raw) {
              roster = raw.split(/\n+/).map(s => s.trim()).filter(Boolean);
              localStorage.setItem('puti_student_roster', JSON.stringify(roster));
              roster.forEach(name => { if (scores[name] === undefined) scores[name] = 0; });
              saveScores();
              renderCards();
            }
          }
        });

        renderCards();
      }
    });
  },

  // =========================================================================
  // 班級功課表 (Class Timetable) - 智慧色彩對比與蓋章筆
  // =========================================================================
  spawnTimetable(wm) {
    const subjectColors = {
      '國語': { bg: '#FFE3E3', color: '#C92A2A', dark: false },
      '數學': { bg: '#E7F5FF', color: '#1864AB', dark: false },
      '英語': { bg: '#FFF3BF', color: '#D9480F', dark: false },
      '自然': { bg: '#D3F9D8', color: '#2B8A3E', dark: false },
      '社會': { bg: '#FFE8CC', color: '#D9480F', dark: false },
      '體育': { bg: '#5F3DC4', color: '#FFFFFF', dark: true },
      '美勞': { bg: '#E64980', color: '#FFFFFF', dark: true },
      '音樂': { bg: '#1098AD', color: '#FFFFFF', dark: true },
      '資訊': { bg: '#1971C2', color: '#FFFFFF', dark: true },
      '綜合': { bg: '#F3D9FA', color: '#862E9C', dark: false },
      '彈性': { bg: '#0CA678', color: '#FFFFFF', dark: true },
      '晨讀': { bg: '#E9ECEF', color: '#495057', dark: false },
      '書法': { bg: '#343A40', color: '#FFFFFF', dark: true },
      '晨光': { bg: '#FFF9DB', color: '#D9480F', dark: false },
      '社團': { bg: '#FD7E14', color: '#FFFFFF', dark: true },
      '閱讀': { bg: '#E9ECEF', color: '#495057', dark: false },
      '午休': { bg: '#F8F9FA', color: '#868E96', dark: false },
      '放學': { bg: '#FFE8CC', color: '#D9480F', dark: false },
      '空白': { bg: 'transparent', color: '#ADB5BD', dark: false }
    };

    const getSubjectStyle = (sub) => {
      if (!sub || sub === '-' || sub === '空白') return 'background: transparent; color: #ADB5BD;';
      if (subjectColors[sub]) {
        const item = subjectColors[sub];
        return `background: ${item.bg}; color: ${item.color}; font-weight: 800; border: 1px solid ${item.dark ? 'transparent' : item.color + '33'};`;
      }
      // Dynamic hash fallback
      const hues = [210, 150, 45, 280, 340, 180, 20];
      const charCode = sub.charCodeAt(0) || 0;
      const hue = hues[charCode % hues.length];
      return `background: hsl(${hue}, 85%, 92%); color: hsl(${hue}, 90%, 25%); font-weight: 800;`;
    };

    const defaultTimetable = {
      periods: [
        { name: '早自習', time: '08:00~08:40', mon: '晨讀', tue: '晨光', wed: '書法', thu: '晨讀', fri: '社團' },
        { name: '第一節', time: '08:45~09:25', mon: '國語', tue: '數學', wed: '英語', thu: '國語', fri: '數學' },
        { name: '第二節', time: '09:35~10:15', mon: '國語', tue: '自然', wed: '數學', thu: '社會', fri: '英語' },
        { name: '第三節', time: '10:30~11:10', mon: '數學', tue: '自然', wed: '體育', thu: '數學', fri: '國語' },
        { name: '第四節', time: '11:20~12:00', mon: '社會', tue: '英語', wed: '綜合', thu: '美勞', fri: '音樂' },
        { name: '午餐午休', time: '12:00~13:20', mon: '午休', tue: '午休', wed: '放學', thu: '午休', fri: '午休' },
        { name: '第五節', time: '13:30~14:10', mon: '體育', tue: '國語', wed: '', thu: '美勞', fri: '綜合' },
        { name: '第六節', time: '14:20~15:00', mon: '音樂', tue: '社會', wed: '', thu: '資訊', fri: '彈性' },
        { name: '第七節', time: '15:15~15:55', mon: '彈性', tue: '彈性', wed: '', thu: '閱讀', fri: '彈性' }
      ]
    };

    let tableData = JSON.parse(localStorage.getItem('puti_class_timetable') || 'null') || defaultTimetable;
    const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
    const dayNames = ['週一', '週二', '週三', '週四', '週五'];
    const currentDayIdx = new Date().getDay(); // 1 = Mon, ..., 5 = Fri
    let selectedSubject = '國語';

    const subjects = ['國語', '數學', '英語', '自然', '社會', '體育', '美勞', '音樂', '資訊', '綜合', '彈性', '晨讀', '空白'];

    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
        <!-- Subject Quick Palette Bar with Adaptive Colors -->
        <div style="background: #FFF9DB; padding: 6px 10px; border-radius: 10px; border: 1px dashed #FFE066; display: flex; flex-direction: column; gap: 6px;">
          <div style="font-size: 0.76rem; font-weight: 800; color: #D9480F; display: flex; justify-content: space-between; align-items: center;">
            <span><i class="fa-solid fa-stamp"></i> 快速蓋章筆：當前選中【<strong id="tt-active-sub" style="color: #E8590C;">${selectedSubject}</strong>】（點擊格子直接蓋上）</span>
            <button class="action-btn-secondary" id="tt-print-btn" style="height: 24px; padding: 0 8px; font-size: 0.72rem;"><i class="fa-solid fa-print"></i> 列印課表</button>
          </div>
          <div id="tt-palette-chips" style="display: flex; flex-wrap: wrap; gap: 5px;">
            ${subjects.map(s => {
              const cfg = subjectColors[s] || { bg: '#EDF2F7', color: '#2D3748' };
              const isSel = s === selectedSubject;
              return `<button type="button" class="tt-sub-chip ${isSel ? 'active' : ''}" data-sub="${s}" style="background: ${cfg.bg}; color: ${cfg.color}; font-weight: 800; border: 1.5px solid ${isSel ? '#FF922B' : (cfg.dark ? 'transparent' : cfg.color + '44')}; box-shadow: ${isSel ? '0 0 0 2px #FF922B' : 'none'};">${s}</button>`;
            }).join('')}
          </div>
        </div>

        <!-- Timetable Grid with Adaptive Color Badges -->
        <div style="flex: 1; overflow-y: auto; background: white; border-radius: 12px; border: 1.5px solid #E9ECEF; padding: 4px;">
          <table class="timetable-table" style="width: 100%; border-collapse: collapse; text-align: center; font-size: 0.88rem;">
            <thead>
              <tr style="background: #F8F9FA; border-bottom: 2px solid #DEE2E6;">
                <th style="padding: 6px 4px; width: 16%; color: #495057;">節次 / 時間</th>
                ${dayNames.map((d, i) => `
                  <th style="padding: 6px 4px; width: 16.8%; ${i + 1 === currentDayIdx ? 'background: #FFF3BF; color: #D9480F; font-weight: 900; border-top-left-radius: 6px; border-top-right-radius: 6px;' : 'color: #495057;'}">
                    ${d} ${i + 1 === currentDayIdx ? '<span style="font-size:0.7rem; background:#FF922B; color:white; padding:1px 4px; border-radius:4px; margin-left:2px;">今日</span>' : ''}
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody id="tt-tbody"></tbody>
          </table>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '班級功課表',
      icon: 'fa-calendar-week',
      iconColor: '#3A86FF',
      width: 630,
      height: 500,
      type: 'timetable',
      contentHtml: content,
      onInit: (el) => {
        const tbody = el.querySelector('#tt-tbody');
        const activeSubEl = el.querySelector('#tt-active-sub');
        const paletteChips = el.querySelectorAll('.tt-sub-chip');
        const printBtn = el.querySelector('#tt-print-btn');

        const renderRows = () => {
          tbody.innerHTML = tableData.periods.map((p, rowIdx) => {
            const isNoon = p.name === '午餐午休' || p.name === '早自習';
            return `
              <tr style="border-bottom: 1px solid #E9ECEF; ${isNoon ? 'background: #FAFAFA;' : ''}">
                <td style="padding: 6px 2px; font-weight: 800; color: #495057; font-size: 0.78rem;">
                  <div>${p.name}</div>
                  <div style="font-size: 0.68rem; color: #868E96; font-family: var(--font-num); font-variant-numeric: tabular-nums;">${p.time}</div>
                </td>
                ${days.map((d, colIdx) => {
                  const val = p[d] || '';
                  const isToday = colIdx + 1 === currentDayIdx;
                  const styleStr = getSubjectStyle(val);
                  return `
                    <td class="tt-cell" data-row="${rowIdx}" data-day="${d}" style="padding: 6px 2px; cursor: pointer; transition: background 0.15s ease; ${isToday ? 'background: #FFFBEA;' : ''}">
                      <div class="tt-subject-badge" style="padding: 4px 6px; border-radius: 8px; font-size: 0.88rem; transition: transform 0.15s ease; ${styleStr}">
                        ${val || '-'}
                      </div>
                    </td>
                  `;
                }).join('')}
              </tr>
            `;
          }).join('');

          // Bind click to stamp subject
          tbody.querySelectorAll('.tt-cell').forEach(cell => {
            cell.addEventListener('click', () => {
              const r = parseInt(cell.getAttribute('data-row'), 10);
              const d = cell.getAttribute('data-day');
              tableData.periods[r][d] = selectedSubject === '空白' ? '' : selectedSubject;
              localStorage.setItem('puti_class_timetable', JSON.stringify(tableData));
              renderRows();
              window.soundEngine.playPop();
            });
          });
        };

        // Select palette subject
        paletteChips.forEach(chip => {
          chip.addEventListener('click', () => {
            paletteChips.forEach(c => {
              c.style.boxShadow = 'none';
              c.classList.remove('active');
            });
            chip.classList.add('active');
            chip.style.boxShadow = '0 0 0 2px #FF922B';
            selectedSubject = chip.getAttribute('data-sub');
            activeSubEl.textContent = selectedSubject;
            window.soundEngine.playTick();
          });
        });

        // Print Friendly
        printBtn.addEventListener('click', () => {
          const printWin = window.open('', '_blank');
          printWin.document.write(`
            <html>
              <head>
                <title>班級功課表列印</title>
                <style>
                  body { font-family: sans-serif; text-align: center; padding: 20px; }
                  table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                  th, td { border: 1.5px solid #333; padding: 10px; font-size: 15px; }
                  th { background: #eee; }
                </style>
              </head>
              <body>
                <h2>國小班級學生週功課表</h2>
                <table>
                  <thead>
                    <tr><th>節次 / 時間</th><th>週一</th><th>週二</th><th>週三</th><th>週四</th><th>週五</th></tr>
                  </thead>
                  <tbody>
                    ${tableData.periods.map(p => `
                      <tr>
                        <td><strong>${p.name}</strong><br><small>${p.time}</small></td>
                        <td>${p.mon || ''}</td><td>${p.tue || ''}</td><td>${p.wed || ''}</td><td>${p.thu || ''}</td><td>${p.fri || ''}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </body>
            </html>
          `);
          printWin.document.close();
          printWin.focus();
          setTimeout(() => { printWin.print(); }, 250);
        });

        renderRows();
      }
    });
  },

  // =========================================================================
  // 重要日子倒數 (Days Countdown)
  // =========================================================================
  spawnDaysCountdown(wm) {
    const saved = JSON.parse(localStorage.getItem('puti_days_countdown_target') || 'null') || {
      title: '第一次段考',
      date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
    };

    let targetTitle = saved.title;
    let targetDateStr = saved.date;

    const presets = [
      { name: '第一次段考', days: 14 },
      { name: '第二次段考', days: 45 },
      { name: '校外教學', days: 7 },
      { name: '校慶運動會', days: 30 },
      { name: '寒暑假倒數', days: 60 },
      { name: '畢業典禮', days: 90 }
    ];

    const content = `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 8px; justify-content: space-between;">
        <!-- Top Target Title & Date Picker -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #FFF9DB; padding: 6px 10px; border-radius: 10px; border: 1px dashed #FFE066; gap: 6px;">
          <input type="text" id="dc-title-input" value="${targetTitle}" placeholder="倒數事件名稱..." style="flex: 1; padding: 4px 8px; border: 1px solid #CED4DA; border-radius: 6px; font-weight: 800; font-size: 0.85rem; outline: none;">
          <input type="date" id="dc-date-input" value="${targetDateStr}" style="padding: 4px 6px; border: 1px solid #CED4DA; border-radius: 6px; font-weight: 800; font-size: 0.8rem; outline: none; cursor: pointer;">
        </div>

        <!-- Giant Countdown Display -->
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #FFFDF9 0%, #FFF5EA 100%); border-radius: 16px; border: 2px solid #FFE8CC; padding: 12px; box-shadow: 0 4px 12px rgba(255, 123, 0, 0.06); text-align: center;">
          <div style="font-size: 0.95rem; font-weight: 800; color: #495057; display: flex; align-items: center; gap: 6px;">
            <span>距離【<strong id="dc-event-label" style="color: #E8590C;">${targetTitle}</strong>】</span>
          </div>
          <div style="display: flex; align-items: baseline; gap: 6px; margin: 4px 0;">
            <span style="font-size: 1.2rem; font-weight: 800; color: #868E96;">還有</span>
            <span id="dc-days-num" class="time-num" style="font-size: 3.6rem; font-weight: 900; color: #D9480F; font-family: var(--font-num); line-height: 1;">--</span>
            <span style="font-size: 1.2rem; font-weight: 800; color: #868E96;">天</span>
          </div>
          <div id="dc-status-tip" style="font-size: 0.82rem; font-weight: 800; color: #2B8A3E;">目標日期：${targetDateStr}</div>
        </div>

        <!-- Quick Presets Bar -->
        <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 2px;">
          ${presets.map(p => `
            <button type="button" class="dc-preset-chip action-btn-secondary" data-name="${p.name}" data-days="${p.days}" style="height: 24px; padding: 0 8px; font-size: 0.72rem; white-space: nowrap; border-radius: 999px;">
              + ${p.name}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    wm.createWindow({
      title: '重要日子倒數',
      icon: 'fa-calendar-check',
      iconColor: '#E63946',
      width: 360,
      height: 330,
      type: 'days-countdown',
      contentHtml: content,
      onInit: (el) => {
        const titleInput = el.querySelector('#dc-title-input');
        const dateInput = el.querySelector('#dc-date-input');
        const eventLabel = el.querySelector('#dc-event-label');
        const daysNum = el.querySelector('#dc-days-num');
        const statusTip = el.querySelector('#dc-status-tip');
        const presetChips = el.querySelectorAll('.dc-preset-chip');

        const updateCountdown = () => {
          targetTitle = titleInput.value.trim() || '重要日子';
          targetDateStr = dateInput.value;
          eventLabel.textContent = targetTitle;

          localStorage.setItem('puti_days_countdown_target', JSON.stringify({
            title: targetTitle,
            date: targetDateStr
          }));

          const target = new Date(targetDateStr + 'T00:00:00');
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const diffMs = target - today;
          const diffDays = Math.round(diffMs / 86400000);

          if (diffDays > 0) {
            daysNum.textContent = diffDays;
            daysNum.style.color = '#D9480F';
            statusTip.textContent = `🎯 倒數計時中，大家一起加油！(${targetDateStr})`;
            statusTip.style.color = '#2B8A3E';
          } else if (diffDays === 0) {
            daysNum.textContent = '0';
            daysNum.style.color = '#E03131';
            statusTip.textContent = `🎉 就是今天！全力以赴！`;
            statusTip.style.color = '#E03131';
            if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60 });
          } else {
            daysNum.textContent = Math.abs(diffDays);
            daysNum.style.color = '#868E96';
            statusTip.textContent = `⏳ 此重要日子已過去 ${Math.abs(diffDays)} 天囉！`;
            statusTip.style.color = '#868E96';
          }
        };

        titleInput.addEventListener('input', updateCountdown);
        dateInput.addEventListener('change', () => {
          updateCountdown();
          window.soundEngine.playPop();
        });

        presetChips.forEach(chip => {
          chip.addEventListener('click', () => {
            const name = chip.getAttribute('data-name');
            const d = parseInt(chip.getAttribute('data-days'), 10);
            const future = new Date(Date.now() + d * 86400000);
            titleInput.value = name;
            dateInput.value = future.toISOString().split('T')[0];
            updateCountdown();
            window.soundEngine.playBell();
          });
        });

        updateCountdown();
      }
    });
  },

  // =========================================================================
  // 33. 段考日考試時程計時器 (Exam Schedule & Countdown Timer)
  // =========================================================================
    // =========================================================================
  // 使用說明 (User Guide) - Puti-AI 點名作業通專用完整手冊
  // =========================================================================
  spawnUserGuide(wm) {
    const content = `
      <div class="user-guide-container" style="display: flex; flex-direction: column; height: 100%; font-family: var(--font-base, system-ui); color: #1e293b; user-select: none;">
        <!-- Guide Tabs -->
        <div style="display: flex; border-bottom: 2px solid #e2e8f0; background: #f8fafc; border-radius: 8px 8px 0 0; padding: 4px 8px 0; gap: 4px; flex-shrink: 0; overflow-x: auto;">
          <button class="guide-tab-btn active" data-tab="tab-welcome" style="padding: 6px 12px; border: none; background: transparent; font-weight: 800; font-size: 0.85rem; color: #2563EB; border-bottom: 3px solid #2563EB; cursor: pointer; white-space: nowrap;">🌟 系統簡介</button>
          <button class="guide-tab-btn" data-tab="tab-attendance" style="padding: 6px 12px; border: none; background: transparent; font-weight: 700; font-size: 0.85rem; color: #64748b; cursor: pointer; white-space: nowrap;">📋 點名簿與備註</button>
          <button class="guide-tab-btn" data-tab="tab-homework-contact" style="padding: 6px 12px; border: none; background: transparent; font-weight: 700; font-size: 0.85rem; color: #64748b; cursor: pointer; white-space: nowrap;">📦 聯絡簿 ✕ 作業收發</button>
          <button class="guide-tab-btn" data-tab="tab-seating" style="padding: 6px 12px; border: none; background: transparent; font-weight: 700; font-size: 0.85rem; color: #64748b; cursor: pointer; white-space: nowrap;">🪑 班級排座技巧</button>
          <button class="guide-tab-btn" data-tab="tab-tools-vault" style="padding: 6px 12px; border: none; background: transparent; font-weight: 700; font-size: 0.85rem; color: #64748b; cursor: pointer; white-space: nowrap;">🎁 教學工具庫</button>
        </div>

        <!-- Tab Content Body -->
        <div style="flex: 1; overflow-y: auto; padding: 14px; font-size: 0.88rem; line-height: 1.6;">
          
          <!-- Tab 1: 系統簡介 -->
          <div id="tab-welcome" class="guide-tab-pane" style="display: block;">
            <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 14px; margin-bottom: 12px; border: 1.5px solid #bfdbfe;">
              <h3 style="margin: 0 0 6px; font-size: 1.15rem; color: #1e40af; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-clipboard-check"></i> 歡迎使用 Puti-AI 點名作業通！
              </h3>
              <p style="margin: 0; color: #1e3a8a; font-size: 0.88rem; font-weight: 600;">
                專為導師與科任老師打造的「每日班級事務」專用平台。完全獨立於上課遊戲大螢幕，免除複雜干擾，聚焦晨會點名、作業收發登記、家庭聯絡簿與班務座位管理。
              </p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">🌅 晨會開工最佳流程</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  開機載入即自動佈署<strong>【課堂點名簿】</strong>、<strong>【作業收發通】</strong>與<strong>【家庭聯絡簿】</strong>三大日常工具。座位表則收納於底部工具列，需要排座時隨開隨用，保持桌面寬敞乾淨。
                </div>
              </div>

              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">🔍 大螢幕無損拖曳等比放大</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  點名卡片與座位表全面搭載 <strong>動態尺寸監聽（ResizeObserver）</strong>。只要按住視窗右下角縮放手柄往外拉大，內部的學生姓名、座號、出勤假別等資訊會<strong>等比自動放大</strong>，在 75~86 吋電子白板上字字清晰。
                </div>
              </div>

              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">🎓 多班級與名冊一鍵切換</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  頂部提供班級切換選單與<strong>【名冊】</strong>編輯器。可建立多個班級名冊（如五年一班、五年二班），支援從 Excel 直接整排複製學生名單貼入，點名簿、座位表與作業箱即刻連動更新。
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 2: 點名簿與備註 -->
          <div id="tab-attendance" class="guide-tab-pane" style="display: none;">
            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px; padding: 12px; margin-bottom: 12px; border: 1.5px solid #a7f3d0;">
              <h3 style="margin: 0 0 4px; font-size: 1.05rem; color: #065f46; display: flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-user-check"></i> 課堂點名簿：8 大假別、註記備忘與歷史紀錄
              </h3>
              <p style="margin: 0; color: #047857; font-size: 0.84rem;">全面精準剔除「缺席」，符合學校請假常態分類，支援歷史查詢與報表匯出。</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px;">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">🎯 8 大假別循環切換</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  點擊學生卡片即可依序快速輪替假別：<br>
                  <span style="font-weight: 800; color: #166534;">【出席】</span> ➔ 
                  <span style="font-weight: 800; color: #1E40AF;">【病假】</span> ➔ 
                  <span style="font-weight: 800; color: #9A3412;">【事假】</span> ➔ 
                  <span style="font-weight: 800; color: #6B21A8;">【公假】</span> ➔ 
                  <span style="font-weight: 800; color: #334155;">【喪假】</span> ➔ 
                  <span style="font-weight: 800; color: #854D0E;">【遲到】</span> ➔ 
                  <span style="font-weight: 800; color: #B91C1C;">【早退】</span> ➔ 
                  <span style="font-weight: 800; color: #475569;">【其他】</span>。
                </div>
              </div>

              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px;">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">📝 學生出勤「註記」功能</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  點擊學生卡片右上角的 <strong>📝 圖示</strong>（或在卡片上按滑鼠右鍵），即可為該學生填寫具體原因（如：<em>發燒就醫、第4節早退看牙、市模範生公假</em>）。卡片下方會直接浮出備忘小氣泡，複製 LINE 通報時也會一併帶出！
                </div>
              </div>

              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px;">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">📜 歷史紀錄與請假累計總表</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  點擊工具列<strong>【📜 歷史紀錄】</strong>：<br>
                  1. <strong>每日出勤歷程</strong>：列出所有點名日期的實到人數與未出席名單，點擊「載入該日」可調閱或補登。<br>
                  2. <strong>學生請假累計表</strong>：統計全班每位學生整個學期的請假總次數與歷次備註。
                </div>
              </div>

              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px;">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">📤 Excel 匯出與備份還原</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  點擊<strong>【匯出】</strong>可輸出包含 UTF-8 BOM 的 CSV 檔案，Excel 開啟絕不亂碼，方便列印呈報學務處；亦支援匯出/匯入完整 JSON 備份檔，資料永久不遺失。
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 3: 聯絡簿 ✕ 作業收發連動 -->
          <div id="tab-homework-contact" class="guide-tab-pane" style="display: none;">
            <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-radius: 12px; padding: 12px; margin-bottom: 12px; border: 1.5px solid #fed7aa;">
              <h3 style="margin: 0 0 4px; font-size: 1.05rem; color: #c2410c; display: flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-arrows-split-up-and-left"></i> 家庭聯絡簿 ✕ 作業收發通：依日期雙向連動
              </h3>
              <p style="margin: 0; color: #ea580c; font-size: 0.84rem;">自訂作業項目，一鍵跨視窗登記繳交情形與快速催繳。</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px;">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">📖 聯絡簿項目自由自訂</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  系統預設<strong>【作業1】</strong>、<strong>【作業2】</strong>、<strong>【作業3】</strong>與<strong>【攜帶物品】</strong>。標題皆可自由點擊修改，並可點擊下方<strong>【➕ 新增聯絡簿項目】</strong>無限擴充。
                </div>
              </div>

              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px;">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">📦 每一項皆可「一鍵登記繳交」</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  聯絡簿每列作業右側皆有<strong>【📦 登記繳交】</strong>按鈕。點擊後會<strong>直接叫出／聚焦「作業收發通」</strong>，並自動將該日期與該項作業帶入分頁，立刻登記全班繳交或攜帶狀況！
                </div>
              </div>

              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px;">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">📅 作業箱反向調閱歷史作業</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  在「作業收發通」切換任一日期，點擊<strong>【📖 載入聯絡簿項目】</strong>下拉選單，會自動讀取該日聯絡簿的所有作業與攜帶物品，隨時可回頭核對歷史繳交紀錄。
                </div>
              </div>

              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px;">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">📢 LINE 催繳名單一鍵發送</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  點擊<strong>【📋 催繳名單】</strong>，自動複製格式化缺交通報（含作業名稱、尚未繳交座號名單），直接貼入班級家長群組，收發作業省時高效。
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 4: 班級排座技巧 -->
          <div id="tab-seating" class="guide-tab-pane" style="display: none;">
            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 12px; margin-bottom: 12px; border: 1.5px solid #86efac;">
              <h3 style="margin: 0 0 4px; font-size: 1.05rem; color: #166534; display: flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-border-all"></i> 班級座位表：純排座獨立功能
              </h3>
              <p style="margin: 0; color: #15803d; font-size: 0.84rem;">完全獨立於點名簿，專注於班級座位調配與大螢幕排座。</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px;">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">🖐️ 拖曳對調（Drag & Drop）</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  滑鼠或觸控直接按住任一張學生桌子拖到目標位置放開，兩位學生立即交換座位（空桌亦可直接換入）。
                </div>
              </div>

              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px;">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">📱 大螢幕推薦：點選對調（Tap-to-Swap）</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  在電子白板上如果長按拖曳不順暢，點擊上方<strong>【點選對調】</strong>按鈕，依序點選兩張桌子即可瞬間交換位置。
                </div>
              </div>

              <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px;">
                <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">🔀 多種排座輔助工具</div>
                <div style="color: #475569; font-size: 0.85rem;">
                  * <strong>5 欄 / 6 欄 / 7 欄 切換</strong>：配合班級桌椅格局快速重整欄數。<br>
                  * <strong>前後對調</strong>：前後排整班垂直對調換位。<br>
                  * <strong>隨機排座</strong>：全班隨機打散分配座位。<br>
                  * <strong>依號排列</strong>：一鍵復原為座號 1~30 順序。
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 5: 教學工具庫與版權 -->
          <div id="tab-tools-vault" class="guide-tab-pane" style="display: none;">
            <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 18px 16px; text-align: center; margin-top: 6px;">
              <div style="font-size: 1.2rem; font-weight: 900; color: #92400e; margin-bottom: 10px;">
                🎁 Puti-AI 教學工具庫
              </div>
              <p style="margin: 0 0 14px; color: #78350f; font-size: 0.9rem; line-height: 1.7;">
                屏東縣後庄國小黃朝榮老師作品，免費分享，歡迎擴散推廣，嚴禁商用與任何侵權、不尊重著作權的行為
              </p>
              <div style="font-size: 0.95rem; font-weight: 800; margin-top: 12px;">
                更多 Puti-AI 教學工具：
                <a href="https://padlet.com/clongwh/puti_ai_tools" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #d97706; color: #fff; padding: 6px 18px; border-radius: 20px; text-decoration: none; font-weight: bold; margin-left: 6px; box-shadow: 0 3px 8px rgba(217, 119, 6, 0.35);">
                  點此前往
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    wm.createWindow({
      title: '使用說明',
      icon: 'fa-circle-question',
      iconColor: '#2563EB',
      width: 620,
      height: 520,
      type: 'user-guide',
      contentHtml: content,
      onInit: (el) => {
        const tabBtns = el.querySelectorAll('.guide-tab-btn');
        const tabPanes = el.querySelectorAll('.guide-tab-pane');

        tabBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => {
              b.classList.remove('active');
              b.style.color = '#64748b';
              b.style.borderBottom = 'none';
              b.style.fontWeight = '700';
            });
            btn.classList.add('active');
            btn.style.color = '#2563EB';
            btn.style.borderBottom = '3px solid #2563EB';
            btn.style.fontWeight = '800';

            tabPanes.forEach(p => p.style.display = 'none');
            const activePane = el.querySelector('#' + targetTab);
            if (activePane) activePane.style.display = 'block';

            if (window.soundEngine) window.soundEngine.playTick();
          });
        });
      }
    });
  },

  spawnExamTimer(wm) {
    const defaultExamSchedule = {
      day1: [
        { period: '第 1 節', subject: '國語', start: '08:40', end: '09:20' },
        { period: '第 2 節', subject: '自然', start: '09:30', end: '10:10' },
        { period: '第 3 節', subject: '英語', start: '10:30', end: '11:10' }
      ],
      day2: [
        { period: '第 1 節', subject: '數學', start: '08:40', end: '09:20' },
        { period: '第 2 節', subject: '社會', start: '09:30', end: '10:10' }
      ]
    };

    let scheduleData = JSON.parse(localStorage.getItem('puti_exam_schedule') || 'null') || defaultExamSchedule;
    let activeDay = 'day1';
    let timerInterval = null;
    let examScale = 1.0;

    const content = `
      <div class="exam-timer-container" style="display: flex; flex-direction: column; height: 100%; gap: 8px; font-family: var(--font-base, system-ui); user-select: none;">
        <!-- 頂部切換與工具列 -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.03); padding: 6px 10px; border-radius: 8px; flex-shrink: 0;">
          <div style="display: flex; gap: 6px;">
            <button class="exam-day-btn active" data-day="day1" style="padding: 4px 12px; border-radius: 6px; font-weight: bold; border: 1px solid #ddd; background: var(--theme-color, #4A90E2); color: #fff; cursor: pointer; transition: all 0.2s;">第一天</button>
            <button class="exam-day-btn" data-day="day2" style="padding: 4px 12px; border-radius: 6px; font-weight: bold; border: 1px solid #ddd; background: #fff; color: #333; cursor: pointer; transition: all 0.2s;">第二天</button>
          </div>
          
          <!-- 字級縮放與設定 -->
          <div style="display: flex; gap: 4px; align-items: center;">
            <span style="font-size: 0.8rem; color: #666; margin-right: 2px;">字級:</span>
            <button id="exam-zoom-out" title="縮小字體" style="width: 28px; height: 26px; border: 1px solid #ccc; background: #fff; border-radius: 4px; cursor: pointer; font-size: 0.75rem; font-weight: bold;">A-</button>
            <button id="exam-zoom-reset" title="重置字體" style="padding: 0 6px; height: 26px; border: 1px solid #ccc; background: #fff; border-radius: 4px; cursor: pointer; font-size: 0.75rem; font-weight: bold;">100%</button>
            <button id="exam-zoom-in" title="放大字體" style="width: 28px; height: 26px; border: 1px solid #ccc; background: #fff; border-radius: 4px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">A+</button>
            <div style="width: 1px; height: 18px; background: #ddd; margin: 0 4px;"></div>
            <button id="exam-edit-btn" style="padding: 4px 8px; border-radius: 6px; border: 1px solid #ccc; background: #fff; font-size: 0.8rem; cursor: pointer;">⚙️ 編輯考程</button>
          </div>
        </div>

        <!-- 當前核心焦點看板 (科目極大化、物理獨立數字單元格 0 抖動) -->
        <div id="exam-hero-card" style="flex: 1; min-height: 155px; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #fff; border-radius: 12px; padding: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); text-align: center; position: relative; overflow: hidden;">
          <div id="exam-status-badge" style="display: inline-block; padding: 3px 12px; border-radius: 12px; font-size: 0.85rem; font-weight: bold; background: #3b82f6; margin-bottom: 4px; transition: background 0.3s;">
            正在準備中
          </div>
          
          <!-- 超大科目文字 (可縮放，預設超大醒目) -->
          <div id="exam-subject-display" style="font-size: 2.8rem; font-weight: 900; letter-spacing: 3px; color: #f8fafc; text-shadow: 0 2px 10px rgba(0,0,0,0.5); line-height: 1.1; margin: 4px 0; transition: font-size 0.2s;">
            --
          </div>
          <div id="exam-period-info" style="font-size: 0.95rem; color: #94a3b8; font-weight: 600; margin-bottom: 4px;">
            --:-- ~ --:--
          </div>

          <!-- 物理獨立槽位倒數計時（徹底消滅抖動：每個數字獨立固定寬度 inline-block 格子） -->
          <div id="exam-countdown-box" style="font-family: 'Roboto Mono', 'Courier New', Courier, Consolas, Monaco, monospace; font-variant-numeric: tabular-nums; font-feature-settings: 'tnum'; font-size: 3.8rem; font-weight: 900; color: #38bdf8; text-shadow: 0 0 16px rgba(56, 189, 248, 0.4); display: flex; justify-content: center; align-items: center; line-height: 1; transition: font-size 0.2s;">
            <span id="exam-d-m1" style="display: inline-block; width: 0.65em; text-align: center;">0</span>
            <span id="exam-d-m2" style="display: inline-block; width: 0.65em; text-align: center;">0</span>
            <span style="display: inline-block; width: 0.35em; text-align: center; position: relative; top: -0.04em;">:</span>
            <span id="exam-d-s1" style="display: inline-block; width: 0.65em; text-align: center;">0</span>
            <span id="exam-d-s2" style="display: inline-block; width: 0.65em; text-align: center;">0</span>
          </div>
          
          <div style="position: absolute; bottom: 6px; right: 12px; font-size: 0.75rem; color: #64748b; font-family: 'Roboto Mono', Consolas, monospace; font-variant-numeric: tabular-nums;">
            目前時刻 <span id="exam-current-time" style="color: #94a3b8; font-weight: bold;">--:--:--</span>
          </div>
        </div>

        <!-- 考試節次時程列表 -->
        <div id="exam-schedule-list" style="max-height: 130px; overflow-y: auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 4px; flex-shrink: 0;">
        </div>

        <!-- 編輯考程對話框 -->
        <div id="exam-edit-modal" style="display: none; position: absolute; inset: 0; background: rgba(255,255,255,0.98); z-index: 10; padding: 12px; flex-direction: column; gap: 8px; border-radius: 12px;">
          <div style="font-weight: bold; font-size: 1rem; color: #1e293b; display: flex; justify-content: space-between; align-items: center;">
            <span>編輯 <span id="modal-day-title">第一天</span> 考程</span>
            <button id="modal-close-btn" style="border: none; background: transparent; cursor: pointer; font-size: 1.2rem; line-height: 1;">✕</button>
          </div>
          <div style="font-size: 0.75rem; color: #64748b;">格式：節次, 科目, 起始時間, 結束時間 (每行一節，24小時制，如：第 1 節, 國語, 08:40, 09:20)</div>
          <div id="modal-error-msg" style="color: #ef4444; font-size: 0.8rem; font-weight: bold; min-height: 1.2em; padding: 2px 0;"></div>
          <textarea id="modal-schedule-text" style="flex: 1; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px; font-family: monospace; font-size: 0.85rem; resize: none;"></textarea>
          <div style="display: flex; justify-content: flex-end; gap: 6px;">
            <button id="modal-reset-btn" style="padding: 6px 12px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">恢復預設</button>
            <button id="modal-save-btn" style="padding: 6px 14px; border: none; background: #3b82f6; color: #fff; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: bold;">儲存考程</button>
          </div>
        </div>
      </div>
    `;

    wm.createWindow({
      title: '考試日程計時器',
      icon: 'fa-clock',
      iconColor: '#3B82F6',
      width: 440,
      height: 420,
      minWidth: 340,
      minHeight: 320,
      type: 'exam-timer',
      contentHtml: content,
      onInit: (winEl, winObj) => {
        const body = winEl.querySelector('.window-body') || winEl;
        const subjectDisplay = body.querySelector('#exam-subject-display');
        const countdownBox = body.querySelector('#exam-countdown-box');
        const dM1 = body.querySelector('#exam-d-m1');
        const dM2 = body.querySelector('#exam-d-m2');
        const dS1 = body.querySelector('#exam-d-s1');
        const dS2 = body.querySelector('#exam-d-s2');
        const statusBadge = body.querySelector('#exam-status-badge');
        const periodInfo = body.querySelector('#exam-period-info');
        const currentTimeDisplay = body.querySelector('#exam-current-time');
        const scheduleList = body.querySelector('#exam-schedule-list');
        const dayBtns = body.querySelectorAll('.exam-day-btn');
        const editBtn = body.querySelector('#exam-edit-btn');
        const editModal = body.querySelector('#exam-edit-modal');
        const modalCloseBtn = body.querySelector('#modal-close-btn');
        const modalSaveBtn = body.querySelector('#modal-save-btn');
        const modalResetBtn = body.querySelector('#modal-reset-btn');
        const modalText = body.querySelector('#modal-schedule-text');
        const modalDayTitle = body.querySelector('#modal-day-title');
        const zoomInBtn = body.querySelector('#exam-zoom-in');
        const zoomOutBtn = body.querySelector('#exam-zoom-out');
        const zoomResetBtn = body.querySelector('#exam-zoom-reset');

        function setCountdownDigits(mmStr, ssStr, color) {
          if (countdownBox && color) {
            countdownBox.style.color = color;
          }
          if (dM1) dM1.textContent = mmStr[0] || '0';
          if (dM2) dM2.textContent = mmStr[1] || '0';
          if (dS1) dS1.textContent = ssStr[0] || '0';
          if (dS2) dS2.textContent = ssStr[1] || '0';
        }

        function applyZoom(scale) {
          examScale = Math.min(1.8, Math.max(0.7, scale));
          if (subjectDisplay) subjectDisplay.style.fontSize = `${(2.8 * examScale).toFixed(2)}rem`;
          if (countdownBox) countdownBox.style.fontSize = `${(3.8 * examScale).toFixed(2)}rem`;
          if (zoomResetBtn) zoomResetBtn.textContent = `${Math.round(examScale * 100)}%`;
        }

        if (zoomInBtn) zoomInBtn.addEventListener('click', () => applyZoom(examScale + 0.15));
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => applyZoom(examScale - 0.15));
        if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => applyZoom(1.0));

        function renderScheduleList() {
          if (!scheduleList) return;
          const items = scheduleData[activeDay] || [];
          scheduleList.innerHTML = '';
          items.forEach((item, idx) => {
            const row = document.createElement('div');
            row.className = `exam-row exam-row-${idx}`;
            row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; border-radius: 4px;';
            row.innerHTML = `
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-weight: 600; color: #64748b; font-size: 0.85rem;">${item.period}</span>
                <span style="font-weight: 800; color: #1e293b; font-size: 1.15rem;">${item.subject}</span>
              </div>
              <div style="font-family: 'Roboto Mono', Consolas, monospace; font-variant-numeric: tabular-nums; color: #475569; font-size: 0.9rem;">
                ${item.start} ~ ${item.end}
              </div>
            `;
            scheduleList.appendChild(row);
          });
        }

        function timeToSeconds(str) {
          const [h, m] = str.split(':').map(Number);
          return h * 3600 + m * 60;
        }

        function updateExamStatus() {
          const now = new Date();
          const currentH = String(now.getHours()).padStart(2, '0');
          const currentM = String(now.getMinutes()).padStart(2, '0');
          const currentS = String(now.getSeconds()).padStart(2, '0');
          if (currentTimeDisplay) currentTimeDisplay.textContent = `${currentH}:${currentM}:${currentS}`;

          const nowSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
          const items = scheduleData[activeDay] || [];

          let currentExam = null;
          let nextExam = null;

          for (let i = 0; i < items.length; i++) {
            const startSec = timeToSeconds(items[i].start);
            const endSec = timeToSeconds(items[i].end);

            if (nowSec >= startSec && nowSec < endSec) {
              currentExam = { ...items[i], startSec, endSec, index: i };
              break;
            } else if (nowSec < startSec) {
              if (!nextExam) {
                nextExam = { ...items[i], startSec, endSec, index: i };
              }
            }
          }

          if (scheduleList) {
            const rows = scheduleList.querySelectorAll('.exam-row');
            rows.forEach(r => {
              r.style.background = 'transparent';
              r.style.boxShadow = 'none';
            });

            if (currentExam) {
              const remainSec = currentExam.endSec - nowSec;
              const mm = String(Math.floor(remainSec / 60)).padStart(2, '0');
              const ss = String(remainSec % 60).padStart(2, '0');

              if (statusBadge) {
                statusBadge.textContent = '● 考試進行中';
                statusBadge.style.background = '#ef4444';
              }
              if (subjectDisplay) subjectDisplay.textContent = currentExam.subject;
              if (periodInfo) periodInfo.textContent = `${currentExam.period} (${currentExam.start} ~ ${currentExam.end})`;
              
              const timerColor = remainSec <= 300 ? '#f87171' : '#38bdf8';
              setCountdownDigits(mm, ss, timerColor);

              if (rows[currentExam.index]) {
                rows[currentExam.index].style.background = '#fee2e2';
                rows[currentExam.index].style.fontWeight = 'bold';
              }
            } else if (nextExam) {
              const waitSec = nextExam.startSec - nowSec;
              const mm = String(Math.floor(waitSec / 60)).padStart(2, '0');
              const ss = String(waitSec % 60).padStart(2, '0');

              if (statusBadge) {
                statusBadge.textContent = '⏳ 距離下節考試開始';
                statusBadge.style.background = '#f59e0b';
              }
              if (subjectDisplay) subjectDisplay.textContent = `即將考：${nextExam.subject}`;
              if (periodInfo) periodInfo.textContent = `${nextExam.period} (${nextExam.start} ~ ${nextExam.end})`;
              
              setCountdownDigits(mm, ss, '#fbbf24');

              if (rows[nextExam.index]) {
                rows[nextExam.index].style.background = '#fef3c7';
              }
            } else {
              if (statusBadge) {
                statusBadge.textContent = '✓ 今日考試已結束';
                statusBadge.style.background = '#10b981';
              }
              if (subjectDisplay) subjectDisplay.textContent = '今日日程完畢';
              if (periodInfo) periodInfo.textContent = '辛苦了！請好好休息';
              
              setCountdownDigits('00', '00', '#94a3b8');
            }
          }
        }

        dayBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            dayBtns.forEach(b => {
              b.classList.remove('active');
              b.style.background = '#fff';
              b.style.color = '#333';
            });
            btn.classList.add('active');
            btn.style.background = 'var(--theme-color, #4A90E2)';
            btn.style.color = '#fff';
            activeDay = btn.getAttribute('data-day');
            renderScheduleList();
            updateExamStatus();
          });
        });

        if (editBtn) {
          editBtn.addEventListener('click', () => {
            if (modalDayTitle) modalDayTitle.textContent = activeDay === 'day1' ? '第一天' : '第二天';
            const items = scheduleData[activeDay] || [];
            if (modalText) modalText.value = items.map(it => `${it.period}, ${it.subject}, ${it.start}, ${it.end}`).join('\n');
            if (editModal) editModal.style.display = 'flex';
          });
        }

        if (modalCloseBtn) {
          modalCloseBtn.addEventListener('click', () => {
            if (editModal) editModal.style.display = 'none';
          });
        }

        if (modalResetBtn) {
          modalResetBtn.addEventListener('click', () => {
            scheduleData[activeDay] = JSON.parse(JSON.stringify(defaultExamSchedule[activeDay]));
            localStorage.setItem('puti_exam_schedule', JSON.stringify(scheduleData));
            renderScheduleList();
            if (editModal) editModal.style.display = 'none';
            updateExamStatus();
          });
        }

        if (modalSaveBtn) {
          modalSaveBtn.addEventListener('click', () => {
            if (!modalText) return;
            const errorMsgEl = editModal.querySelector('#modal-error-msg');
            const showError = (msg) => {
              if (errorMsgEl) errorMsgEl.textContent = msg;
              else alert(msg);
            };
            if (errorMsgEl) errorMsgEl.textContent = '';

            const rawLines = modalText.value.trim().split('\n').filter(l => l.trim().length > 0);
            if (rawLines.length === 0) {
              showError('❌ 請至少輸入一節考試日程！');
              return;
            }

            const parsed = [];
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

            for (let i = 0; i < rawLines.length; i++) {
              const lineNum = i + 1;
              const parts = rawLines[i].split(',').map(s => s.trim());
              if (parts.length < 4) {
                showError(`❌ 第 ${lineNum} 行欄位不足！請確認包含：節次, 科目, 起始時間, 結束時間`);
                return;
              }
              const [period, subject, startRaw, endRaw] = parts;
              if (!period || !subject) {
                showError(`❌ 第 ${lineNum} 行節次或科目名稱不可為空！`);
                return;
              }

              // 自動補齊 08:40 格式
              const formatT = (t) => t.length === 4 && t[1] === ':' ? '0' + t : t;
              const start = formatT(startRaw);
              const end = formatT(endRaw);

              if (!timeRegex.test(start)) {
                showError(`❌ 第 ${lineNum} 行開始時間「${startRaw}」格式有誤！請使用 24 小時制（如 08:40）`);
                return;
              }
              if (!timeRegex.test(end)) {
                showError(`❌ 第 ${lineNum} 行結束時間「${endRaw}」格式有誤！請使用 24 小時制（如 09:20）`);
                return;
              }

              const startSec = timeToSeconds(start);
              const endSec = timeToSeconds(end);

              if (endSec <= startSec) {
                showError(`❌ 第 ${lineNum} 行【${subject}】結束時間（${end}）不能早於或等於開始時間（${start}）！`);
                return;
              }

              parsed.push({ period, subject, start, end, startSec, endSec });
            }

            // 檢查節次重疊衝突
            for (let i = 0; i < parsed.length - 1; i++) {
              for (let j = i + 1; j < parsed.length; j++) {
                const a = parsed[i];
                const b = parsed[j];
                if (Math.max(a.startSec, b.startSec) < Math.min(a.endSec, b.endSec)) {
                  showError(`⚠️ 考程時間衝突！【${a.subject}】(${a.start}~${a.end}) 與【${b.subject}】(${b.start}~${b.end}) 發生重疊！`);
                  return;
                }
              }
            }

            // 驗證全部通過，儲存考程
            scheduleData[activeDay] = parsed.map(({ period, subject, start, end }) => ({ period, subject, start, end }));
            localStorage.setItem('puti_exam_schedule', JSON.stringify(scheduleData));
            renderScheduleList();
            updateExamStatus();
            if (editModal) editModal.style.display = 'none';
          });
        }

        renderScheduleList();
        updateExamStatus();
        timerInterval = setInterval(updateExamStatus, 1000);
      },
      onClose: () => {
        if (timerInterval) clearInterval(timerInterval);
      }
    });
  },

      // =========================================================================
  // 課堂點名簿 (Classroom Attendance) - 8大出勤狀態、備註註記、歷史紀錄與匯出匯入
  // =========================================================================
  spawnAttendance(wm) {
    let roster = JSON.parse(localStorage.getItem('puti_student_roster') || 'null') || Array.from({ length: 30 }, (_, i) => `${i + 1} 號同學`);
    let activeClass = 'default';
    try {
      const classData = JSON.parse(localStorage.getItem('puti_classes_data'));
      if (classData && classData.activeId) activeClass = classData.activeId;
    } catch(e){}

    const todayStr = new Date().toISOString().split('T')[0];
    let currentDate = localStorage.getItem('puti_active_att_date') || todayStr;

    // 8大出勤狀態定義（刪除缺席，加入病假、事假、公假、喪假、遲到、早退、其他）
    const statusMap = {
      present:      { label: '出席', bg: '#DCFCE7', color: '#166534', border: '#86EFAC', icon: 'fa-check', next: 'sick' },
      sick:         { label: '病假', bg: '#DBEAFE', color: '#1E40AF', border: '#93C5FD', icon: 'fa-heart-pulse', next: 'personal' },
      personal:     { label: '事假', bg: '#FFEDD5', color: '#9A3412', border: '#FDBA74', icon: 'fa-clipboard-user', next: 'official' },
      official:     { label: '公假', bg: '#F3E8FF', color: '#6B21A8', border: '#D8B4FE', icon: 'fa-award', next: 'bereavement' },
      bereavement:  { label: '喪假', bg: '#E2E8F0', color: '#334155', border: '#94A3B8', icon: 'fa-ribbon', next: 'late' },
      late:         { label: '遲到', bg: '#FEF9C3', color: '#854D0E', border: '#FDE047', icon: 'fa-clock', next: 'early' },
      early:        { label: '早退', bg: '#FEE2E2', color: '#B91C1C', border: '#FCA5A5', icon: 'fa-person-walking-dashed-line-arrow-right', next: 'other' },
      other:        { label: '其他', bg: '#F1F5F9', color: '#475569', border: '#CBD5E1', icon: 'fa-ellipsis', next: 'present' }
    };

    const getStorageKey = (d) => `puti_att_${activeClass}_${d}`;
    const getDatesIndexKey = () => `puti_att_dates_${activeClass}`;

    let attendanceData = JSON.parse(localStorage.getItem(getStorageKey(currentDate)) || '{}');

    const ensureData = () => {
      roster.forEach(name => {
        if (!attendanceData[name]) attendanceData[name] = { status: 'present', note: '' };
        // 若舊資料含有 absent，自動遷移為 other
        if (attendanceData[name].status === 'absent') attendanceData[name].status = 'other';
      });
    };
    ensureData();

    const saveAttendance = () => {
      localStorage.setItem(getStorageKey(currentDate), JSON.stringify(attendanceData));
      localStorage.setItem('puti_active_att_date', currentDate);

      // 維護歷史日期索引
      let datesList = JSON.parse(localStorage.getItem(getDatesIndexKey()) || '[]');
      if (!datesList.includes(currentDate)) {
        datesList.push(currentDate);
        datesList.sort((a, b) => b.localeCompare(a));
        localStorage.setItem(getDatesIndexKey(), JSON.stringify(datesList));
      }
    };

    const content = `
      <div class="attendance-container" style="display: flex; flex-direction: column; height: 100%; gap: 8px; user-select: none; position: relative;">
        <!-- Top Main Toolbar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; padding: 6px 10px; border-radius: 12px; border: 1.5px solid #E2E8F0; gap: 6px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <input type="date" id="att-date-picker" value="${currentDate}"
              style="padding: 3px 8px; border-radius: 8px; border: 1.5px solid #CBD5E1; font-weight: 800; color: #334155; font-size: 0.85rem; outline: none; background: #FFF; cursor: pointer;">
            <button type="button" class="action-btn-main" id="att-all-present-btn" style="height: 28px; padding: 0 10px; font-size: 0.78rem; background: #059669;" title="一鍵將今日全班設為出席">
              <i class="fa-solid fa-check-double"></i> 全員出席
            </button>
          </div>
          <div style="display: flex; gap: 5px; flex-wrap: wrap; align-items: center;">
            <button type="button" class="action-btn-secondary" id="att-history-btn" style="height: 28px; padding: 0 8px; font-size: 0.78rem; color: #4338CA; border-color: #C7D2FE;" title="查看與查詢歷史出勤紀錄與統計">
              <i class="fa-solid fa-clock-rotate-left"></i> 歷史紀錄
            </button>
            <button type="button" class="action-btn-secondary" id="att-copy-line-btn" style="height: 28px; padding: 0 8px; font-size: 0.78rem; color: #0284C7; border-color: #BAE6FD;" title="複製出勤通報（含請假備註），可直接貼至 LINE 班級群">
              <i class="fa-brands fa-line" style="color: #06C755; font-size: 0.95rem;"></i> LINE 通報
            </button>
            <button type="button" class="action-btn-secondary" id="att-export-btn" style="height: 28px; padding: 0 8px; font-size: 0.78rem;" title="匯出 Excel/CSV 表格或 JSON 備份檔">
              <i class="fa-solid fa-file-export"></i> 匯出
            </button>
            <button type="button" class="action-btn-secondary" id="att-import-btn" style="height: 28px; padding: 0 8px; font-size: 0.78rem;" title="匯入歷史出勤備份檔 (JSON)">
              <i class="fa-solid fa-file-import"></i> 匯入
            </button>
            <button type="button" class="action-btn-secondary" id="att-roster-btn" style="height: 28px; padding: 0 8px; font-size: 0.78rem;" title="查看與編輯學生名冊">
              <i class="fa-solid fa-users"></i> 名冊
            </button>
            <input type="file" id="att-file-input" accept=".json" style="display: none;">
          </div>
        </div>

        <!-- Quick Summary Counters (All 8 Statuses) -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #FFF7ED; padding: 5px 8px; border-radius: 10px; border: 1px solid #FFEDD5; font-size: 0.76rem; font-weight: 800; overflow-x: auto; gap: 4px;">
          <span style="color: #475569;" id="att-stat-total">應到: 0</span>
          <span style="color: #166534;" id="att-stat-present">實到: 0</span>
          <span style="color: #1E40AF;" id="att-stat-sick">病假: 0</span>
          <span style="color: #9A3412;" id="att-stat-personal">事假: 0</span>
          <span style="color: #6B21A8;" id="att-stat-official">公假: 0</span>
          <span style="color: #334155;" id="att-stat-bereavement">喪假: 0</span>
          <span style="color: #854D0E;" id="att-stat-late">遲到: 0</span>
          <span style="color: #B91C1C;" id="att-stat-early">早退: 0</span>
          <span style="color: #475569;" id="att-stat-other">其他: 0</span>
        </div>

        <!-- Students Grid -->
        <div id="att-grid-container" style="flex: 1; display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; padding: 2px; overflow-y: auto;">
        </div>

        <!-- Bottom Guidance -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: #64748B; background: #F8FAFC; padding: 3px 8px; border-radius: 8px;">
          <span>💡 點擊卡片循環切換假別（出席➔病假➔事假➔公假➔喪假➔遲到➔早退➔其他）；點擊右側 📝 或按右鍵可填寫/修改備註。</span>
          <span>📅 支援拖曳右下角無損等比放大字級與卡片</span>
        </div>

        <!-- History Modal Overlay -->
        <div id="att-history-modal" style="display: none; position: absolute; inset: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(4px); z-index: 50; border-radius: 12px; padding: 12px; box-sizing: border-box; flex-direction: column;">
          <div style="background: #FFF; border-radius: 14px; display: flex; flex-direction: column; height: 100%; box-shadow: 0 10px 25px rgba(0,0,0,0.2); overflow: hidden;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-bottom: 1.5px solid #E2E8F0; background: #F8FAFC;">
              <div style="font-weight: 900; font-size: 0.95rem; color: #334155; display: flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-clock-rotate-left" style="color: #4F46E5;"></i> 出勤歷史紀錄與學期查詢
              </div>
              <button type="button" class="win-btn btn-close" id="att-history-close" style="width: 26px; height: 26px;"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <!-- History Tabs -->
            <div style="display: flex; gap: 8px; padding: 8px 12px; border-bottom: 1px solid #E2E8F0; background: #FFF;">
              <button type="button" class="scale-btn active" id="att-tab-dates" style="font-size: 0.78rem; font-weight: 800; padding: 3px 10px; border-radius: 8px;">📅 每日出勤歷程</button>
              <button type="button" class="scale-btn" id="att-tab-students" style="font-size: 0.78rem; font-weight: 800; padding: 3px 10px; border-radius: 8px;">📊 學生請假累計表</button>
            </div>
            <!-- History Content Box -->
            <div id="att-history-content" style="flex: 1; overflow-y: auto; padding: 12px;">
            </div>
          </div>
        </div>
      </div>
    `;

    let resizeObserver = null;

    wm.createWindow({
      title: '課堂點名簿',
      icon: 'fa-user-check',
      width: 620,
      height: 540,
      type: 'attendance',
      contentHtml: content,
      onInit: (el) => {
        const grid = el.querySelector('#att-grid-container');
        const datePicker = el.querySelector('#att-date-picker');
        const allPresentBtn = el.querySelector('#att-all-present-btn');
        const copyBtn = el.querySelector('#att-copy-line-btn');
        const rosterBtn = el.querySelector('#att-roster-btn');
        const historyBtn = el.querySelector('#att-history-btn');
        const exportBtn = el.querySelector('#att-export-btn');
        const importBtn = el.querySelector('#att-import-btn');
        const fileInput = el.querySelector('#att-file-input');

        const historyModal = el.querySelector('#att-history-modal');
        const historyClose = el.querySelector('#att-history-close');
        const historyContent = el.querySelector('#att-history-content');
        const tabDatesBtn = el.querySelector('#att-tab-dates');
        const tabStudentsBtn = el.querySelector('#att-tab-students');

        const statTotal = el.querySelector('#att-stat-total');
        const statPresent = el.querySelector('#att-stat-present');
        const statSick = el.querySelector('#att-stat-sick');
        const statPersonal = el.querySelector('#att-stat-personal');
        const statOfficial = el.querySelector('#att-stat-official');
        const statBereavement = el.querySelector('#att-stat-bereavement');
        const statLate = el.querySelector('#att-stat-late');
        const statEarly = el.querySelector('#att-stat-early');
        const statOther = el.querySelector('#att-stat-other');

        // Dynamic Resize Scaling
        const updateAttScale = () => {
          const width = el.offsetWidth;
          const height = el.offsetHeight;
          const scale = Math.max(0.8, Math.min(2.5, Math.min(width / 560, height / 480)));
          const nameFontSize = (0.86 * scale).toFixed(2) + 'rem';
          const badgeFontSize = (0.72 * scale).toFixed(2) + 'rem';
          const noteFontSize = (0.68 * scale).toFixed(2) + 'rem';
          const cardMinH = Math.round(58 * scale) + 'px';
          const cardPadding = Math.round(6 * scale) + 'px ' + Math.round(4 * scale) + 'px';
          const gapSize = Math.round(6 * scale) + 'px';

          grid.style.gap = gapSize;
          grid.querySelectorAll('.att-card-item').forEach(c => {
            c.style.minHeight = cardMinH;
            c.style.padding = cardPadding;
            const nameEl = c.querySelector('.att-student-name');
            if (nameEl) nameEl.style.fontSize = nameFontSize;
            const badgeEl = c.querySelector('.att-status-badge');
            if (badgeEl) badgeEl.style.fontSize = badgeFontSize;
            const noteEl = c.querySelector('.att-note-bubble');
            if (noteEl) noteEl.style.fontSize = noteFontSize;
          });
        };

        resizeObserver = new ResizeObserver(() => updateAttScale());
        resizeObserver.observe(el);

        const editNoteForStudent = (name) => {
          const curNote = (attendanceData[name] && attendanceData[name].note) || '';
          const newNote = prompt(`請輸入【${name}】${currentDate} 出勤備註（例如：發燒就醫、看牙早退、比賽公假等）：`, curNote);
          if (newNote !== null) {
            if (!attendanceData[name]) attendanceData[name] = { status: 'present', note: '' };
            attendanceData[name].note = newNote.trim();
            saveAttendance();
            if (window.soundEngine && typeof window.soundEngine.playPop === 'function') {
              window.soundEngine.playPop();
            }
            render();
          }
        };

        const render = () => {
          ensureData();
          let countMap = { present: 0, sick: 0, personal: 0, official: 0, bereavement: 0, late: 0, early: 0, other: 0 };

          grid.innerHTML = roster.map((name) => {
            const item = attendanceData[name] || { status: 'present', note: '' };
            const conf = statusMap[item.status] || statusMap.present;
            if (countMap[item.status] !== undefined) countMap[item.status]++;

            const hasNote = Boolean(item.note && item.note.trim());

            return `
              <div class="att-card-item" data-name="${name}" style="background: ${conf.bg}; border: 1.5px solid ${conf.border}; border-radius: 12px; padding: 6px 4px; text-align: center; cursor: pointer; transition: transform 0.1s, box-shadow 0.1s; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; gap: 3px; min-height: 58px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <!-- Edit Note Button Top-Right -->
                <button type="button" class="att-note-icon-btn" data-name="${name}" title="填寫/修改出勤備註"
                  style="position: absolute; top: 3px; right: 4px; background: transparent; border: none; font-size: 0.7rem; color: ${hasNote ? '#D97706' : '#94A3B8'}; cursor: pointer; padding: 2px;">
                  <i class="${hasNote ? 'fa-solid fa-note-sticky' : 'fa-regular fa-pen-to-square'}"></i>
                </button>

                <div class="att-student-name" style="font-size: 0.86rem; font-weight: 800; color: #1E293B; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 82%;">${name}</div>
                <span class="att-status-badge" style="font-size: 0.72rem; font-weight: 900; background: ${conf.color}; color: #FFF; padding: 2px 9px; border-radius: 999px; line-height: 1.2;">${conf.label}</span>

                ${hasNote ? `
                  <div class="att-note-bubble" data-name="${name}" title="備註：${item.note}" style="font-size: 0.68rem; font-weight: 700; color: #92400E; background: #FEF3C7; border: 1px solid #FDE68A; border-radius: 6px; padding: 1px 6px; max-width: 92%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 1px;">
                    📝 ${item.note}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('');

          statTotal.textContent = `應到: ${roster.length}`;
          statPresent.textContent = `實到: ${countMap.present}`;
          statSick.textContent = `病假: ${countMap.sick}`;
          statPersonal.textContent = `事假: ${countMap.personal}`;
          statOfficial.textContent = `公假: ${countMap.official}`;
          statBereavement.textContent = `喪假: ${countMap.bereavement}`;
          statLate.textContent = `遲到: ${countMap.late}`;
          statEarly.textContent = `早退: ${countMap.early}`;
          statOther.textContent = `其他: ${countMap.other}`;

          // Card Click Event (Cycle status)
          grid.querySelectorAll('.att-card-item').forEach(card => {
            card.addEventListener('click', (e) => {
              if (e.target.closest('.att-note-icon-btn') || e.target.closest('.att-note-bubble')) return;
              const name = card.getAttribute('data-name');
              const cur = attendanceData[name] ? attendanceData[name].status : 'present';
              const next = statusMap[cur] ? statusMap[cur].next : 'present';
              attendanceData[name].status = next;
              if (window.soundEngine && typeof window.soundEngine.playTick === 'function') {
                window.soundEngine.playTick();
              }
              saveAttendance();
              render();
            });

            // Right Click to edit note directly
            card.addEventListener('contextmenu', (e) => {
              e.preventDefault();
              const name = card.getAttribute('data-name');
              editNoteForStudent(name);
            });
          });

          // Note Icon Buttons
          grid.querySelectorAll('.att-note-icon-btn, .att-note-bubble').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const name = btn.getAttribute('data-name');
              editNoteForStudent(name);
            });
          });

          updateAttScale();
        };

        datePicker.addEventListener('change', (e) => {
          currentDate = e.target.value;
          attendanceData = JSON.parse(localStorage.getItem(getStorageKey(currentDate)) || '{}');
          saveAttendance();
          render();
        });

        allPresentBtn.addEventListener('click', () => {
          roster.forEach(name => {
            if (!attendanceData[name]) attendanceData[name] = { status: 'present', note: '' };
            attendanceData[name].status = 'present';
          });
          if (window.soundEngine) {
            if (typeof window.soundEngine.playCoin === 'function') window.soundEngine.playCoin();
            else if (typeof window.soundEngine.playChime === 'function') window.soundEngine.playChime();
          }
          saveAttendance();
          render();
        });

        // LINE 通報複製
        copyBtn.addEventListener('click', () => {
          let catMap = { sick: [], personal: [], official: [], bereavement: [], late: [], early: [], other: [] };
          let presentCount = 0;

          roster.forEach(name => {
            const item = attendanceData[name] || { status: 'present', note: '' };
            const noteText = item.note ? ` (${item.note})` : '';
            if (item.status === 'present') presentCount++;
            else if (catMap[item.status]) catMap[item.status].push(`${name}${noteText}`);
          });

          let text = `【今日課堂出勤通報】${currentDate}\n`;
          text += `應到：${roster.length} 人 / 實到：${presentCount} 人\n`;
          if (catMap.sick.length > 0) text += `🏥 病假 (${catMap.sick.length})：${catMap.sick.join('、')}\n`;
          if (catMap.personal.length > 0) text += `📋 事假 (${catMap.personal.length})：${catMap.personal.join('、')}\n`;
          if (catMap.official.length > 0) text += `🎖️ 公假 (${catMap.official.length})：${catMap.official.join('、')}\n`;
          if (catMap.bereavement.length > 0) text += `🕊️ 喪假 (${catMap.bereavement.length})：${catMap.bereavement.join('、')}\n`;
          if (catMap.late.length > 0) text += `⏰ 遲到 (${catMap.late.length})：${catMap.late.join('、')}\n`;
          if (catMap.early.length > 0) text += `🏃 早退 (${catMap.early.length})：${catMap.early.join('、')}\n`;
          if (catMap.other.length > 0) text += `📌 其他 (${catMap.other.length})：${catMap.other.join('、')}\n`;

          const totalAbsent = roster.length - presentCount;
          if (totalAbsent === 0) {
            text += `✨ 全班到齊，表現優良！\n`;
          }

          navigator.clipboard.writeText(text).then(() => {
            alert('📋 今日出勤通報（含請假備註）已複製至剪貼簿，可直接貼至 LINE！\n\n' + text);
          }).catch(() => {
            prompt('請手動複製出勤通報：', text);
          });
        });

        // 歷史紀錄視窗渲染
        let activeHistoryTab = 'dates';

        const renderHistoryDates = () => {
          let datesList = JSON.parse(localStorage.getItem(getDatesIndexKey()) || '[]');
          if (datesList.length === 0) {
            historyContent.innerHTML = '<div style="text-align: center; color: #94A3B8; padding: 40px;">尚無歷史出勤紀錄，今日完成點名後將自動保存。</div>';
            return;
          }

          historyContent.innerHTML = `
            <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
              <thead>
                <tr style="background: #F1F5F9; color: #475569; font-weight: 800; border-bottom: 2px solid #CBD5E1;">
                  <th style="padding: 8px 10px;">日期</th>
                  <th style="padding: 8px 6px;">出席 / 應到</th>
                  <th style="padding: 8px 10px;">未出席名單與備註</th>
                  <th style="padding: 8px 10px; text-align: right;">操作</th>
                </tr>
              </thead>
              <tbody>
                ${datesList.map(d => {
                  const dayData = JSON.parse(localStorage.getItem(getStorageKey(d)) || '{}');
                  let present = 0;
                  let absList = [];
                  roster.forEach(n => {
                    const it = dayData[n] || { status: 'present', note: '' };
                    if (it.status === 'present') present++;
                    else {
                      const label = statusMap[it.status] ? statusMap[it.status].label : '請假';
                      const nStr = it.note ? ` (${it.note})` : '';
                      absList.push(`${n} [${label}${nStr}]`);
                    }
                  });
                  const isCurrent = d === currentDate;

                  return `
                    <tr style="border-bottom: 1px solid #E2E8F0; ${isCurrent ? 'background: #F0FDF4;' : ''}">
                      <td style="padding: 8px 10px; font-weight: 800; color: #334155;">${d} ${isCurrent ? '<span style="color: #16A34A; font-size: 0.72rem;">(當前)</span>' : ''}</td>
                      <td style="padding: 8px 6px; font-weight: 800; color: ${present === roster.length ? '#16A34A' : '#D97706'};">${present} / ${roster.length}</td>
                      <td style="padding: 8px 10px; color: #475569; font-size: 0.78rem;">${absList.length > 0 ? absList.join('、') : '<span style="color: #16A34A;">全勤</span>'}</td>
                      <td style="padding: 8px 10px; text-align: right;">
                        <button type="button" class="action-btn-secondary att-switch-date-btn" data-date="${d}" style="height: 24px; font-size: 0.72rem; padding: 0 8px;">
                          載入該日
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          `;

          historyContent.querySelectorAll('.att-switch-date-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              const targetDate = btn.getAttribute('data-date');
              currentDate = targetDate;
              datePicker.value = currentDate;
              attendanceData = JSON.parse(localStorage.getItem(getStorageKey(currentDate)) || '{}');
              saveAttendance();
              render();
              historyModal.style.display = 'none';
            });
          });
        };

        const renderHistoryStudents = () => {
          let datesList = JSON.parse(localStorage.getItem(getDatesIndexKey()) || '[]');
          if (datesList.length === 0) {
            historyContent.innerHTML = '<div style="text-align: center; color: #94A3B8; padding: 40px;">尚無歷史出勤紀錄。</div>';
            return;
          }

          // Aggregate per student stats
          const studentStats = {};
          roster.forEach(n => {
            studentStats[n] = { sick: 0, personal: 0, official: 0, bereavement: 0, late: 0, early: 0, other: 0, notes: [] };
          });

          datesList.forEach(d => {
            const dayData = JSON.parse(localStorage.getItem(getStorageKey(d)) || '{}');
            roster.forEach(n => {
              const it = dayData[n];
              if (it && it.status !== 'present') {
                if (studentStats[n][it.status] !== undefined) studentStats[n][it.status]++;
                if (it.note) {
                  studentStats[n].notes.push(`${d} ${statusMap[it.status].label}: ${it.note}`);
                }
              }
            });
          });

          historyContent.innerHTML = `
            <div style="margin-bottom: 8px; font-size: 0.78rem; color: #64748B;">
              統計自 ${datesList[datesList.length - 1]} 至 ${datesList[0]}，共 ${datesList.length} 個紀錄日
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; text-align: center;">
              <thead>
                <tr style="background: #F1F5F9; color: #475569; font-weight: 800; border-bottom: 2px solid #CBD5E1;">
                  <th style="padding: 6px; text-align: left;">座號 / 姓名</th>
                  <th style="padding: 6px; color: #1E40AF;">病假</th>
                  <th style="padding: 6px; color: #9A3412;">事假</th>
                  <th style="padding: 6px; color: #6B21A8;">公假</th>
                  <th style="padding: 6px; color: #334155;">喪假</th>
                  <th style="padding: 6px; color: #854D0E;">遲到</th>
                  <th style="padding: 6px; color: #B91C1C;">早退</th>
                  <th style="padding: 6px; color: #475569;">其他</th>
                  <th style="padding: 6px; text-align: left;">備註總覽</th>
                </tr>
              </thead>
              <tbody>
                ${roster.map(n => {
                  const s = studentStats[n];
                  const totalAbs = s.sick + s.personal + s.official + s.bereavement + s.late + s.early + s.other;
                  return `
                    <tr style="border-bottom: 1px solid #E2E8F0; ${totalAbs > 0 ? 'background: #FFFDF7;' : ''}">
                      <td style="padding: 6px; text-align: left; font-weight: 800; color: #334155;">${n}</td>
                      <td style="padding: 6px; font-weight: ${s.sick > 0 ? '800' : 'normal'}; color: ${s.sick > 0 ? '#1E40AF' : '#94A3B8'};">${s.sick}</td>
                      <td style="padding: 6px; font-weight: ${s.personal > 0 ? '800' : 'normal'}; color: ${s.personal > 0 ? '#9A3412' : '#94A3B8'};">${s.personal}</td>
                      <td style="padding: 6px; font-weight: ${s.official > 0 ? '800' : 'normal'}; color: ${s.official > 0 ? '#6B21A8' : '#94A3B8'};">${s.official}</td>
                      <td style="padding: 6px; font-weight: ${s.bereavement > 0 ? '800' : 'normal'}; color: ${s.bereavement > 0 ? '#334155' : '#94A3B8'};">${s.bereavement}</td>
                      <td style="padding: 6px; font-weight: ${s.late > 0 ? '800' : 'normal'}; color: ${s.late > 0 ? '#854D0E' : '#94A3B8'};">${s.late}</td>
                      <td style="padding: 6px; font-weight: ${s.early > 0 ? '800' : 'normal'}; color: ${s.early > 0 ? '#B91C1C' : '#94A3B8'};">${s.early}</td>
                      <td style="padding: 6px; font-weight: ${s.other > 0 ? '800' : 'normal'}; color: ${s.other > 0 ? '#475569' : '#94A3B8'};">${s.other}</td>
                      <td style="padding: 6px; text-align: left; font-size: 0.74rem; color: #64748B;">${s.notes.length > 0 ? s.notes.join('； ') : '-'}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          `;
        };

        historyBtn.addEventListener('click', () => {
          historyModal.style.display = 'flex';
          activeHistoryTab = 'dates';
          tabDatesBtn.classList.add('active');
          tabStudentsBtn.classList.remove('active');
          renderHistoryDates();
          if (window.soundEngine && typeof window.soundEngine.playPop === 'function') {
            window.soundEngine.playPop();
          }
        });

        historyClose.addEventListener('click', () => {
          historyModal.style.display = 'none';
        });

        tabDatesBtn.addEventListener('click', () => {
          activeHistoryTab = 'dates';
          tabDatesBtn.classList.add('active');
          tabStudentsBtn.classList.remove('active');
          renderHistoryDates();
        });

        tabStudentsBtn.addEventListener('click', () => {
          activeHistoryTab = 'students';
          tabStudentsBtn.classList.add('active');
          tabDatesBtn.classList.remove('active');
          renderHistoryStudents();
        });

        // 匯出功能（支援 CSV 試算表與 JSON 完整備份）
        exportBtn.addEventListener('click', () => {
          const mode = prompt('請選擇匯出格式：\n輸入 1：匯出 Excel/CSV 表格（含全學期出勤流水帳與備註）\n輸入 2：匯出 JSON 完整資料備份檔', '1');
          if (!mode) return;

          let datesList = JSON.parse(localStorage.getItem(getDatesIndexKey()) || '[]');
          if (datesList.length === 0) datesList = [currentDate];

          if (mode.trim() === '1') {
            // CSV Export with UTF-8 BOM
            let csv = '\uFEFF日期,班級,座號/姓名,出勤狀態,備註說明\n';
            datesList.forEach(d => {
              const dayData = JSON.parse(localStorage.getItem(getStorageKey(d)) || '{}');
              roster.forEach(n => {
                const it = dayData[n] || { status: 'present', note: '' };
                const label = statusMap[it.status] ? statusMap[it.status].label : '出席';
                const noteClean = (it.note || '').replace(/"/g, '""');
                csv += `"${d}","${activeClass}","${n}","${label}","${noteClean}"\n`;
              });
            });

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `點名簿出勤紀錄_${activeClass}_${todayStr}.csv`;
            a.click();
            URL.revokeObjectURL(url);
            if (window.soundEngine && typeof window.soundEngine.playFanfare === 'function') {
              window.soundEngine.playFanfare();
            }
          } else if (mode.trim() === '2') {
            // JSON Backup Export
            const backup = {
              version: '2.0',
              activeClass,
              exportTime: new Date().toISOString(),
              dates: datesList,
              records: {}
            };
            datesList.forEach(d => {
              backup.records[d] = JSON.parse(localStorage.getItem(getStorageKey(d)) || '{}');
            });

            const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `點名簿出勤備份_${activeClass}_${todayStr}.json`;
            a.click();
            URL.revokeObjectURL(url);
            if (window.soundEngine && typeof window.soundEngine.playFanfare === 'function') {
              window.soundEngine.playFanfare();
            }
          }
        });

        // 匯入功能 (JSON Restore)
        importBtn.addEventListener('click', () => {
          fileInput.value = '';
          fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const data = JSON.parse(event.target.result);
              if (!data.records || typeof data.records !== 'object') {
                alert('⚠️ 匯入失敗：檔案格式不正確，非合法的點名簿備份檔！');
                return;
              }

              const dates = Object.keys(data.records);
              let datesList = JSON.parse(localStorage.getItem(getDatesIndexKey()) || '[]');

              dates.forEach(d => {
                localStorage.setItem(getStorageKey(d), JSON.stringify(data.records[d]));
                if (!datesList.includes(d)) datesList.push(d);
              });
              datesList.sort((a, b) => b.localeCompare(a));
              localStorage.setItem(getDatesIndexKey(), JSON.stringify(datesList));

              attendanceData = JSON.parse(localStorage.getItem(getStorageKey(currentDate)) || '{}');
              saveAttendance();
              render();

              if (window.soundEngine && typeof window.soundEngine.playFanfare === 'function') {
                window.soundEngine.playFanfare();
              }
              alert(`🎉 成功匯入 ${dates.length} 個日期的歷史出勤紀錄！`);
            } catch(err) {
              alert('⚠️ 匯入失敗：解析 JSON 備份檔出錯！' + err.message);
            }
          };
          reader.readAsText(file);
        });

        rosterBtn.addEventListener('click', () => {
          const globalBtn = document.getElementById('btn-global-roster');
          if (globalBtn) globalBtn.click();
        });

        render();
      },
      onClose: () => {
        if (resizeObserver) resizeObserver.disconnect();
      }
    });
  },

    // =========================================================================
  // 作業收發通 (Homework Check & Collection Manager) - 支援指定日期與聯絡簿連動
  // =========================================================================
  spawnHomeworkCheck(wm, initialOptions = {}) {
    const getRoster = () => {
      try {
        const classData = JSON.parse(localStorage.getItem('puti_classes_data'));
        if (classData && classData.classes) {
          const act = classData.classes.find(c => c.id === classData.activeId) || classData.classes[0];
          if (act && Array.isArray(act.roster) && act.roster.length > 0) return act.roster;
        }
      } catch(e){}
      const saved = JSON.parse(localStorage.getItem('puti_student_roster') || 'null');
      if (Array.isArray(saved) && saved.length > 0) return saved;
      return Array.from({ length: 30 }, (_, i) => `${i + 1} 號同學`);
    };

    let roster = getRoster();
    let activeClass = 'default';
    try {
      const classData = JSON.parse(localStorage.getItem('puti_classes_data'));
      if (classData && classData.activeId) activeClass = classData.activeId;
    } catch(e){}

    const todayStr = new Date().toISOString().split('T')[0];
    let currentDate = initialOptions.date || localStorage.getItem('puti_active_hw_date') || todayStr;

    const getHwStorageKey = (d) => `puti_hw_check_${activeClass}_${d}`;
    const getContactStorageKey = (d) => `puti_contact_${activeClass}_${d}`;

    // 檢查現有已開啟的作業收發視窗
    let existingWin = null;
    wm.windows.forEach(w => {
      if (w.type === 'homework-check') existingWin = w;
    });

    if (existingWin) {
      wm.bringToFront(existingWin);
      if (existingWin.setExternalTarget && (initialOptions.date || initialOptions.subject)) {
        existingWin.setExternalTarget(initialOptions.date || currentDate, initialOptions.subject);
      }
      return existingWin;
    }

    const loadHwDataForDate = (d) => {
      let data = null;
      try {
        data = JSON.parse(localStorage.getItem(getHwStorageKey(d)) || 'null');
      } catch(e){}

      if (!data) {
        let contactData = null;
        try {
          contactData = JSON.parse(localStorage.getItem(getContactStorageKey(d)) || 'null');
          if (!contactData && d === todayStr) {
            contactData = JSON.parse(localStorage.getItem('puti_hw_data') || 'null');
          }
        } catch(e){}

        const autoSubjects = [];
        if (contactData && Array.isArray(contactData.items)) {
          contactData.items.forEach(it => {
            const name = (it.content && it.content.trim()) ? it.content.trim() : it.title;
            if (name && name.trim()) autoSubjects.push(name.trim());
          });
        }

        data = {
          subjects: autoSubjects.length > 0 ? autoSubjects : ['作業1', '作業2', '作業3', '攜帶物品'],
          activeSubject: autoSubjects.length > 0 ? autoSubjects[0] : '作業1',
          records: {}
        };
      }

      if (!data.records || typeof data.records !== 'object') data.records = {};
      if (!Array.isArray(data.subjects) || data.subjects.length === 0) {
        data.subjects = ['作業1', '作業2', '作業3', '攜帶物品'];
      }

      // 替換歷史寫死之科目
      data.subjects = data.subjects.map(s => {
        if (s === '國語作業' || s === '國語習作') return '作業1';
        if (s === '數學校訂' || s === '數學習作') return '作業2';
        if (s === '英語專科') return '作業3';
        if (s === '課堂學習單' || s === '美勞撕貼') return '攜帶物品';
        return s;
      });

      if (!data.activeSubject || !data.subjects.includes(data.activeSubject)) {
        data.activeSubject = data.subjects[0];
      }
      if (!data.records[data.activeSubject]) {
        data.records[data.activeSubject] = {};
      }

      return data;
    };

    let hwData = loadHwDataForDate(currentDate);

    // 若呼叫時傳入指定作業項目，確保加入並設為選中
    if (initialOptions.subject) {
      const cleanSub = initialOptions.subject.trim();
      if (!hwData.subjects.includes(cleanSub)) {
        hwData.subjects.push(cleanSub);
      }
      hwData.activeSubject = cleanSub;
      if (!hwData.records[cleanSub]) hwData.records[cleanSub] = {};
    }

    const saveHwData = () => {
      localStorage.setItem(getHwStorageKey(currentDate), JSON.stringify(hwData));
      localStorage.setItem('puti_active_hw_date', currentDate);
    };

    const content = `
      <div class="homework-check-container" style="display: flex; flex-direction: column; height: 100%; gap: 8px; user-select: none;">
        <!-- Top Toolbar: Date & Contact Link Selection -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; padding: 6px 10px; border-radius: 12px; border: 1.5px solid #E2E8F0; gap: 6px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <label style="font-size: 0.8rem; font-weight: 800; color: #475569;"><i class="fa-solid fa-calendar-day"></i> 登記日期:</label>
            <input type="date" id="hw-check-date-picker" value="${currentDate}"
              style="padding: 2px 6px; border-radius: 6px; border: 1.5px solid #CBD5E1; font-weight: 800; color: #334155; font-size: 0.82rem; outline: none; background: #FFF; cursor: pointer;">
            <select id="hw-from-contact-select" style="max-width: 170px; padding: 2px 6px; border-radius: 6px; border: 1.5px solid #FFC078; font-weight: 800; color: #9A3412; background: #FFF7ED; font-size: 0.78rem; outline: none; cursor: pointer;" title="從指定日期的聯絡簿直接叫出作業項目">
              <option value="">📖 載入聯絡簿作業...</option>
            </select>
          </div>
          <div style="display: flex; gap: 5px; align-items: center;">
            <button type="button" class="action-btn-secondary" id="hw-add-subject-btn" style="height: 26px; padding: 0 8px; font-size: 0.74rem; border-style: dashed;" title="自訂新增作業項目">
              <i class="fa-solid fa-plus"></i> 新增項目
            </button>
            <button type="button" class="action-btn-secondary" id="hw-del-subject-btn" style="height: 26px; padding: 0 6px; font-size: 0.74rem; color: #EF4444;" title="刪除此作業項目">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>

        <!-- Subject Tabs Bar -->
        <div style="display: flex; align-items: center; background: #FFF; padding: 4px 6px; border-radius: 10px; border: 1px solid #E2E8F0; gap: 6px;">
          <div id="hw-tabs-container" style="display: flex; gap: 5px; overflow-x: auto; flex: 1; align-items: center; padding-bottom: 2px;">
          </div>
        </div>

        <!-- Progress Bar & Batch Actions -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #FFF9DB; padding: 6px 12px; border-radius: 10px; border: 1px solid #FFE066; gap: 10px;">
          <div style="flex: 1; display: flex; flex-direction: column; gap: 3px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 800; color: #D9480F;">
              <span id="hw-stat-subject-title" style="max-width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">作業1</span>
              <span id="hw-stat-progress-text">已收 0 / 0 人 (0%)</span>
            </div>
            <div style="height: 7px; background: #E9ECEF; border-radius: 4px; overflow: hidden;">
              <div id="hw-stat-progress-bar" style="height: 100%; width: 0%; background: linear-gradient(90deg, #10B981, #059669); transition: width 0.25s ease;"></div>
            </div>
          </div>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="action-btn-main" id="hw-all-check-btn" style="height: 28px; padding: 0 10px; font-size: 0.76rem; background: linear-gradient(135deg, #10B981, #059669);" title="將全班標記為已繳">
              <i class="fa-solid fa-check"></i> 全收
            </button>
            <button type="button" class="action-btn-secondary" id="hw-copy-missing-btn" style="height: 28px; padding: 0 8px; font-size: 0.76rem; color: #D97706; font-weight: 800; border-color: #FCD34D;" title="複製未繳交學生名單（可直接發到 LINE 群催繳）">
              <i class="fa-solid fa-copy"></i> 催繳名單
            </button>
          </div>
        </div>

        <!-- Students Check Grid -->
        <div id="hw-students-grid" style="flex: 1; display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; padding: 2px; overflow-y: auto;">
        </div>

        <!-- Bottom Guidance -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: #64748B; background: #F8FAFC; padding: 3px 8px; border-radius: 8px;">
          <span>💡 點擊學生卡片切換【已繳 / 未交】；上方切換日期可調閱任一天的聯絡簿作業繳交紀錄。</span>
          <span>📦 支援拖曳右下角縮放，卡片等比放大</span>
        </div>
      </div>
    `;

    let resizeObserver = null;
    let onRosterUpdated = null;

    const winObj = wm.createWindow({
      title: '作業收發通',
      icon: 'fa-box-archive',
      width: 620,
      height: 520,
      type: 'homework-check',
      contentHtml: content,
      onInit: (el, winInstance) => {
        const datePicker = el.querySelector('#hw-check-date-picker');
        const contactSelect = el.querySelector('#hw-from-contact-select');
        const tabsContainer = el.querySelector('#hw-tabs-container');
        const grid = el.querySelector('#hw-students-grid');
        const addSubBtn = el.querySelector('#hw-add-subject-btn');
        const delSubBtn = el.querySelector('#hw-del-subject-btn');
        const allCheckBtn = el.querySelector('#hw-all-check-btn');
        const copyMissingBtn = el.querySelector('#hw-copy-missing-btn');
        const titleSpan = el.querySelector('#hw-stat-subject-title');
        const progressText = el.querySelector('#hw-stat-progress-text');
        const progressBar = el.querySelector('#hw-stat-progress-bar');

        // Dynamic Resize Scaling for Homework Check
        const updateHwScale = () => {
          const width = el.offsetWidth;
          const height = el.offsetHeight;
          const scale = Math.max(0.8, Math.min(2.5, Math.min(width / 560, height / 460)));
          const nameFontSize = (0.86 * scale).toFixed(2) + 'rem';
          const badgeFontSize = (0.72 * scale).toFixed(2) + 'rem';
          const cardMinH = Math.round(54 * scale) + 'px';
          const gapSize = Math.round(6 * scale) + 'px';

          grid.style.gap = gapSize;
          grid.querySelectorAll('.hw-check-card').forEach(c => {
            c.style.minHeight = cardMinH;
            const nameEl = c.querySelector('.hw-student-name');
            if (nameEl) nameEl.style.fontSize = nameFontSize;
            const badgeEl = c.querySelector('.hw-status-badge');
            if (badgeEl) badgeEl.style.fontSize = badgeFontSize;
          });
        };

        resizeObserver = new ResizeObserver(() => updateHwScale());
        resizeObserver.observe(el);

        const updateContactSelect = () => {
          let contactData = null;
          try {
            contactData = JSON.parse(localStorage.getItem(getContactStorageKey(currentDate)) || 'null');
            if (!contactData && currentDate === todayStr) {
              contactData = JSON.parse(localStorage.getItem('puti_hw_data') || 'null');
            }
          } catch(e){}

          contactSelect.innerHTML = '<option value="">📖 載入聯絡簿作業...</option>';
          if (contactData) {
            if (Array.isArray(contactData.items)) {
              contactData.items.forEach(it => {
                const name = (it.content && it.content.trim()) ? it.content.trim() : it.title;
                if (name && name.trim()) {
                  const opt = document.createElement('option');
                  opt.value = name.trim();
                  opt.textContent = `[${it.title}] ${name.trim()}`;
                  contactSelect.appendChild(opt);
                }
              });
            }
          }
        };

        const ensureActiveSubject = () => {
          if (!hwData.subjects || !Array.isArray(hwData.subjects) || hwData.subjects.length === 0) {
            hwData.subjects = ['作業1', '作業2', '作業3', '攜帶物品'];
          }
          if (!hwData.activeSubject || !hwData.subjects.includes(hwData.activeSubject)) {
            hwData.activeSubject = hwData.subjects[0];
          }
          if (!hwData.records || typeof hwData.records !== 'object') hwData.records = {};
          if (!hwData.records[hwData.activeSubject]) {
            hwData.records[hwData.activeSubject] = {};
          }
        };

        const renderTabs = () => {
          ensureActiveSubject();
          tabsContainer.innerHTML = hwData.subjects.map(sub => {
            const isActive = sub === hwData.activeSubject;
            const rec = hwData.records[sub] || {};
            const doneCount = roster.filter(name => rec[name]).length;

            return `
              <button type="button" class="hw-sub-tab ${isActive ? 'active' : ''}" data-sub="${encodeURIComponent(sub)}"
                style="height: 28px; padding: 0 10px; border-radius: 8px; font-size: 0.78rem; font-weight: 800; border: 1.5px solid ${isActive ? '#F59E0B' : '#E2E8F0'}; background: ${isActive ? '#FEF3C7' : '#FFF'}; color: ${isActive ? '#B45309' : '#64748B'}; cursor: pointer; white-space: nowrap; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s;">
                <span>${sub}</span>
                <span style="font-size: 0.7rem; background: ${isActive ? '#FDE68A' : '#F1F5F9'}; padding: 1px 5px; border-radius: 6px;">${doneCount}/${roster.length}</span>
              </button>
            `;
          }).join('');

          tabsContainer.querySelectorAll('.hw-sub-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              const chosen = decodeURIComponent(btn.getAttribute('data-sub'));
              hwData.activeSubject = chosen;
              ensureActiveSubject();
              saveHwData();
              render();
            });
          });
        };

        const render = () => {
          ensureActiveSubject();
          renderTabs();

          const sub = hwData.activeSubject;
          const rec = hwData.records[sub];
          let doneCount = 0;

          grid.innerHTML = roster.map(name => {
            const isDone = !!rec[name];
            if (isDone) doneCount++;

            return `
              <div class="hw-check-card" data-name="${name}" style="background: ${isDone ? '#DCFCE7' : '#FFF1F2'}; border: 1.5px solid ${isDone ? '#86EFAC' : '#FECDD3'}; border-radius: 12px; padding: 6px 4px; text-align: center; cursor: pointer; transition: transform 0.1s, box-shadow 0.1s; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; min-height: 54px;">
                <div class="hw-student-name" style="font-size: 0.86rem; font-weight: 800; color: #1E293B; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 95%;">${name}</div>
                <span class="hw-status-badge" style="font-size: 0.72rem; font-weight: 900; background: ${isDone ? '#10B981' : '#F43F5E'}; color: #FFF; padding: 2px 8px; border-radius: 999px; line-height: 1.2;">
                  ${isDone ? '✓ 已繳' : '✕ 未交'}
                </span>
              </div>
            `;
          }).join('');

          const total = roster.length;
          const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
          titleSpan.textContent = sub;
          progressText.textContent = `已收 ${doneCount} / ${total} 人 (${pct}%)`;
          progressBar.style.width = `${pct}%`;

          grid.querySelectorAll('.hw-check-card').forEach(card => {
            card.addEventListener('click', () => {
              const name = card.getAttribute('data-name');
              ensureActiveSubject();
              rec[name] = !rec[name];
              if (window.soundEngine && typeof window.soundEngine.playTick === 'function') {
                window.soundEngine.playTick();
              }
              saveHwData();
              render();
            });
          });

          updateHwScale();
        };

        // 外部呼叫切換日期與作業項目接口
        if (winInstance) {
          winInstance.setExternalTarget = (targetDate, targetSubject) => {
            currentDate = targetDate || currentDate;
            datePicker.value = currentDate;
            hwData = loadHwDataForDate(currentDate);

            if (targetSubject) {
              const clean = targetSubject.trim();
              if (!hwData.subjects.includes(clean)) hwData.subjects.push(clean);
              hwData.activeSubject = clean;
              if (!hwData.records[clean]) hwData.records[clean] = {};
            }
            saveHwData();
            updateContactSelect();
            render();
          };
        }

        // 日期變更
        datePicker.addEventListener('change', (e) => {
          currentDate = e.target.value;
          hwData = loadHwDataForDate(currentDate);
          saveHwData();
          updateContactSelect();
          render();
        });

        // 從聯絡簿選單挑選作業
        contactSelect.addEventListener('change', (e) => {
          const chosen = e.target.value;
          if (chosen) {
            if (!hwData.subjects.includes(chosen)) {
              hwData.subjects.push(chosen);
            }
            hwData.activeSubject = chosen;
            if (!hwData.records[chosen]) hwData.records[chosen] = {};
            saveHwData();
            render();
            contactSelect.value = '';
          }
        });

        // 新增作業
        addSubBtn.addEventListener('click', () => {
          const name = prompt('請輸入新作業項目名稱（例：數習第 38 頁、美勞撕貼畫）：');
          if (name && name.trim()) {
            const clean = name.trim();
            if (!hwData.subjects.includes(clean)) {
              hwData.subjects.push(clean);
              hwData.activeSubject = clean;
              if (!hwData.records[clean]) hwData.records[clean] = {};
              saveHwData();
              render();
            }
          }
        });

        // 刪除作業
        delSubBtn.addEventListener('click', () => {
          if (hwData.subjects.length <= 1) {
            alert('至少需保留一項作業項目！');
            return;
          }
          if (confirm(`確定要刪除作業項目【${hwData.activeSubject}】及其所有繳交紀錄嗎？`)) {
            const idx = hwData.subjects.indexOf(hwData.activeSubject);
            hwData.subjects.splice(idx, 1);
            delete hwData.records[hwData.activeSubject];
            hwData.activeSubject = hwData.subjects[0];
            saveHwData();
            render();
          }
        });

        // 一鍵全收
        allCheckBtn.addEventListener('click', () => {
          ensureActiveSubject();
          const sub = hwData.activeSubject;
          const rec = hwData.records[sub];
          const allDone = roster.every(name => !!rec[name]);
          roster.forEach(name => {
            rec[name] = !allDone;
          });
          if (window.soundEngine) {
            if (typeof window.soundEngine.playCoin === 'function') window.soundEngine.playCoin();
            else if (typeof window.soundEngine.playChime === 'function') window.soundEngine.playChime();
          }
          saveHwData();
          render();
        });

        // 複製催繳名單
        copyMissingBtn.addEventListener('click', () => {
          ensureActiveSubject();
          const sub = hwData.activeSubject;
          const rec = hwData.records[sub];
          const missing = roster.filter(name => !rec[name]);

          let text = `【作業收發催繳提醒】${currentDate}\n`;
          text += `作業項目：${sub}\n`;
          text += `應繳：${roster.length} 人 / 已繳：${roster.length - missing.length} 人\n`;

          if (missing.length === 0) {
            text += `✨ 太棒了！全班作業已全數繳齊！\n`;
          } else {
            text += `⚠️ 尚未繳交 (${missing.length} 人)：\n${missing.join('、')}\n請家長協助提醒孩子攜帶並補交，感謝配合！\n`;
          }

          navigator.clipboard.writeText(text).then(() => {
            alert('📋 作業催繳名單已複製至剪貼簿，可直接貼至 LINE 或聯絡簿！\n\n' + text);
          }).catch(() => {
            prompt('請手動複製催繳名單：', text);
          });
        });

        // 全域名冊連動更新監聽
        onRosterUpdated = (e) => {
          if (e.detail && Array.isArray(e.detail)) {
            roster = [...e.detail];
            render();
          }
        };
        window.addEventListener('rosterUpdated', onRosterUpdated);

        updateContactSelect();
        render();
      },
      onClose: () => {
        if (resizeObserver) resizeObserver.disconnect();
        if (onRosterUpdated) window.removeEventListener('rosterUpdated', onRosterUpdated);
      }
    });

    if (winObj && !winObj.setExternalTarget && typeof winInstance !== "undefined") {
      winObj.setExternalTarget = winInstance.setExternalTarget;
    }
    return winObj;
  },

    // 班級座位表 (Classroom Seating Chart) - 純排座功能、拖曳放大動態字級
  // =========================================================================
  spawnSeatingChart(wm) {
    let roster = JSON.parse(localStorage.getItem('puti_student_roster') || 'null') || Array.from({ length: 30 }, (_, i) => `${i + 1} 號同學`);
    let activeClass = 'default';
    try {
      const classData = JSON.parse(localStorage.getItem('puti_classes_data'));
      if (classData && classData.activeId) activeClass = classData.activeId;
    } catch(e){}

    let numCols = parseInt(localStorage.getItem(`puti_seats_cols_${activeClass}`) || '6', 10);
    const totalDesks = 30;

    const getSeatKey = () => `puti_seats_${activeClass}`;
    let seatLayout = JSON.parse(localStorage.getItem(getSeatKey()) || 'null');
    if (!seatLayout || !Array.isArray(seatLayout) || seatLayout.length !== totalDesks) {
      seatLayout = [...roster];
      while (seatLayout.length < totalDesks) seatLayout.push('');
    }

    const saveSeats = () => {
      localStorage.setItem(getSeatKey(), JSON.stringify(seatLayout));
    };

    let selectedSwapIdx = null; // 點選對調來源
    let draggedIdx = null;       // 拖曳對調來源

    const content = `
      <div class="seating-container" style="display: flex; flex-direction: column; height: 100%; gap: 8px; user-select: none;">
        <!-- Top Control Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #F1F5F9; padding: 6px 10px; border-radius: 12px; border: 1.5px solid #CBD5E1; flex-wrap: wrap; gap: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-weight: 800; font-size: 0.84rem; color: #334155;">
              <i class="fa-solid fa-chalkboard-user"></i> 講台 / 黑板方向
            </span>
            <div style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.78rem; font-weight: 800; color: #475569;">
              <span>欄數:</span>
              <select id="seat-cols-select" style="border: 1px solid #CBD5E1; border-radius: 6px; padding: 1px 4px; font-weight: 800; background: #FFF; cursor: pointer;">
                <option value="5" ${numCols === 5 ? 'selected' : ''}>5 欄</option>
                <option value="6" ${numCols === 6 ? 'selected' : ''}>6 欄</option>
                <option value="7" ${numCols === 7 ? 'selected' : ''}>7 欄</option>
              </select>
            </div>
          </div>
          <div style="display: flex; gap: 5px; flex-wrap: wrap;">
            <button type="button" class="action-btn-secondary" id="seat-tap-swap-btn" style="height: 26px; padding: 0 8px; font-size: 0.74rem;" title="大螢幕觸控推薦：點擊兩位同學可直接對調位置">
              <i class="fa-solid fa-arrow-right-arrow-left"></i> 點選對調
            </button>
            <button type="button" class="action-btn-secondary" id="seat-shuffle-btn" style="height: 26px; padding: 0 8px; font-size: 0.74rem;" title="全班隨機排座">
              <i class="fa-solid fa-shuffle"></i> 隨機排座
            </button>
            <button type="button" class="action-btn-secondary" id="seat-invert-rows-btn" style="height: 26px; padding: 0 8px; font-size: 0.74rem;" title="前後排整班垂直對調">
              <i class="fa-solid fa-up-down"></i> 前後對調
            </button>
            <button type="button" class="action-btn-secondary" id="seat-reset-btn" style="height: 26px; padding: 0 8px; font-size: 0.74rem;" title="依座號順序排列">
              <i class="fa-solid fa-arrow-rotate-left"></i> 依號排列
            </button>
          </div>
        </div>

        <!-- Seating Grid -->
        <div id="seat-grid-container" style="flex: 1; display: grid; grid-template-columns: repeat(${numCols}, 1fr); gap: 6px; padding: 4px; overflow-y: auto;">
        </div>

        <!-- Helper Instructions -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: #64748B; background: #F8FAFC; padding: 3px 8px; border-radius: 8px;">
          <span>💡 支援按住卡片「拖曳對調」位置；電子白板亦可按「點選對調」依序點兩張桌子互換。</span>
          <span>🪑 視窗支援拖曳右下角縮放，桌卡與姓名會自動等比放大！</span>
        </div>
      </div>
    `;

    let resizeObserver = null;

    wm.createWindow({
      title: '班級座位表',
      icon: 'fa-border-all',
      width: 640,
      height: 520,
      type: 'seating',
      contentHtml: content,
      onInit: (el) => {
        const grid = el.querySelector('#seat-grid-container');
        const shuffleBtn = el.querySelector('#seat-shuffle-btn');
        const resetBtn = el.querySelector('#seat-reset-btn');
        const invertBtn = el.querySelector('#seat-invert-rows-btn');
        const tapSwapBtn = el.querySelector('#seat-tap-swap-btn');
        const colsSelect = el.querySelector('#seat-cols-select');

        let isTapSwapMode = false;

        // Dynamic Resize Scaling for Seating Chart
        const updateSeatScale = () => {
          const width = el.offsetWidth;
          const height = el.offsetHeight;
          const scale = Math.max(0.8, Math.min(2.5, Math.min(width / 600, height / 460)));
          const nameFontSize = (0.88 * scale).toFixed(2) + 'rem';
          const numFontSize = (0.72 * scale).toFixed(2) + 'rem';
          const deskMinH = Math.round(56 * scale) + 'px';
          const gapSize = Math.round(6 * scale) + 'px';

          grid.style.gap = gapSize;
          grid.querySelectorAll('.seat-desk-cell').forEach(c => {
            c.style.minHeight = deskMinH;
            const nameEl = c.querySelector('.seat-student-name');
            if (nameEl) nameEl.style.fontSize = nameFontSize;
            const numEl = c.querySelector('.seat-num-tag');
            if (numEl) numEl.style.fontSize = numFontSize;
          });
        };

        resizeObserver = new ResizeObserver(() => updateSeatScale());
        resizeObserver.observe(el);

        const swapSeats = (fromIdx, toIdx) => {
          if (fromIdx === toIdx || fromIdx === null || toIdx === null) return;
          const temp = seatLayout[fromIdx];
          seatLayout[fromIdx] = seatLayout[toIdx];
          seatLayout[toIdx] = temp;
          saveSeats();
          if (window.soundEngine && typeof window.soundEngine.playPop === 'function') {
            window.soundEngine.playPop();
          }
          renderGrid();
        };

        const renderGrid = () => {
          grid.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;

          grid.innerHTML = seatLayout.map((name, idx) => {
            const isSelected = selectedSwapIdx === idx;
            if (!name) {
              return `
                <div class="seat-desk-cell empty ${isSelected ? 'swap-selected' : ''}" data-idx="${idx}" data-name=""
                  style="background: #F8FAFC; border: 2px dashed ${isSelected ? '#2563EB' : '#CBD5E1'}; border-radius: 12px; padding: 6px 4px; text-align: center; color: #94A3B8; min-height: 56px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; position: relative;">
                  <span class="seat-num-tag" style="position: absolute; top: 3px; left: 6px; font-size: 0.7rem; font-weight: 800; color: #CBD5E1;">${idx + 1}</span>
                  <span class="seat-student-name" style="font-size: 0.8rem; opacity: 0.6;">(空桌)</span>
                </div>
              `;
            }

            return `
              <div class="seat-desk-cell occupied ${isSelected ? 'swap-selected' : ''}" data-idx="${idx}" data-name="${name}" draggable="true"
                style="background: #FFFFFF; border: 2px solid ${isSelected ? '#2563EB' : '#CBD5E1'}; border-radius: 12px; padding: 6px 4px; text-align: center; cursor: grab; transition: transform 0.1s, box-shadow 0.1s; position: relative; min-height: 56px; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 1px 4px rgba(0,0,0,0.06);">
                <span class="seat-num-tag" style="position: absolute; top: 3px; left: 6px; font-size: 0.7rem; font-weight: 800; color: #94A3B8;">${idx + 1}</span>
                <div class="seat-student-name" style="font-size: 0.88rem; font-weight: 800; color: #1E293B; max-width: 90%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  ${name}
                </div>
              </div>
            `;
          }).join('');

          // 綁定拖曳與對調事件
          grid.querySelectorAll('.seat-desk-cell').forEach(cell => {
            const idx = parseInt(cell.getAttribute('data-idx'), 10);

            // Drag Start
            cell.addEventListener('dragstart', (e) => {
              draggedIdx = idx;
              cell.style.opacity = '0.4';
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', idx);
            });

            cell.addEventListener('dragend', () => {
              cell.style.opacity = '1';
              grid.querySelectorAll('.seat-desk-cell').forEach(c => c.style.outline = 'none');
            });

            cell.addEventListener('dragover', (e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
              cell.style.outline = '2px dashed #3B82F6';
            });

            cell.addEventListener('dragleave', () => {
              cell.style.outline = 'none';
            });

            cell.addEventListener('drop', (e) => {
              e.preventDefault();
              cell.style.outline = 'none';
              const from = draggedIdx !== null ? draggedIdx : parseInt(e.dataTransfer.getData('text/plain'), 10);
              if (!isNaN(from) && from !== idx) {
                swapSeats(from, idx);
              }
              draggedIdx = null;
            });

            // Click: Tap-to-Swap Mode
            cell.addEventListener('click', () => {
              if (isTapSwapMode) {
                if (selectedSwapIdx === null) {
                  selectedSwapIdx = idx;
                  renderGrid();
                } else if (selectedSwapIdx === idx) {
                  selectedSwapIdx = null;
                  renderGrid();
                } else {
                  swapSeats(selectedSwapIdx, idx);
                  selectedSwapIdx = null;
                }
              }
            });
          });

          updateSeatScale();
        };

        // 點選對調模式開關
        tapSwapBtn.addEventListener('click', () => {
          isTapSwapMode = !isTapSwapMode;
          selectedSwapIdx = null;
          if (isTapSwapMode) {
            tapSwapBtn.style.background = '#2563EB';
            tapSwapBtn.style.color = '#FFF';
            tapSwapBtn.innerHTML = '<i class="fa-solid fa-hand-pointer"></i> 對調中(點2桌)';
          } else {
            tapSwapBtn.style.background = '';
            tapSwapBtn.style.color = '';
            tapSwapBtn.innerHTML = '<i class="fa-solid fa-arrow-right-arrow-left"></i> 點選對調';
          }
          renderGrid();
        });

        // 欄數切換
        colsSelect.addEventListener('change', (e) => {
          numCols = parseInt(e.target.value, 10);
          localStorage.setItem(`puti_seats_cols_${activeClass}`, numCols);
          renderGrid();
        });

        // 隨機排座
        shuffleBtn.addEventListener('click', () => {
          if (!confirm('確定要打散全班座位並隨機排座嗎？')) return;
          for (let i = seatLayout.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [seatLayout[i], seatLayout[j]] = [seatLayout[j], seatLayout[i]];
          }
          saveSeats();
          if (window.soundEngine && typeof window.soundEngine.playFanfare === 'function') {
            window.soundEngine.playFanfare();
          }
          renderGrid();
        });

        // 前後對調
        invertBtn.addEventListener('click', () => {
          const rows = Math.ceil(totalDesks / numCols);
          const newLayout = new Array(totalDesks).fill('');
          for (let r = 0; r < rows; r++) {
            const targetRow = rows - 1 - r;
            for (let c = 0; c < numCols; c++) {
              const srcIdx = r * numCols + c;
              const dstIdx = targetRow * numCols + c;
              if (srcIdx < totalDesks && dstIdx < totalDesks) {
                newLayout[dstIdx] = seatLayout[srcIdx];
              }
            }
          }
          seatLayout = newLayout;
          saveSeats();
          if (window.soundEngine && typeof window.soundEngine.playPop === 'function') {
            window.soundEngine.playPop();
          }
          renderGrid();
        });

        // 依座號順序排列
        resetBtn.addEventListener('click', () => {
          seatLayout = [...roster];
          while (seatLayout.length < totalDesks) seatLayout.push('');
          saveSeats();
          if (window.soundEngine && typeof window.soundEngine.playTick === 'function') {
            window.soundEngine.playTick();
          }
          renderGrid();
        });

        renderGrid();
      },
      onClose: () => {
        if (resizeObserver) resizeObserver.disconnect();
      }
    });
  }
};

window.ClassroomWidgets = ClassroomWidgets;
