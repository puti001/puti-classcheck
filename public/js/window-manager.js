/**
 * Puti Classroomscreen - Window Manager
 * Handles floating windows, drag & drop, 8-directional resizing, z-indexing,
 * minimization, maximization, and touch/mouse multi-platform support.
 */

class WindowManager {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.windows = new Map();
    this.topZIndex = 10;
    this.staggerOffset = 30;
    this.spawnCounter = 0;
  }

  createWindow(options) {
    const {
      id = 'win_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      title = '工具視窗',
      icon = 'fa-shapes',
      iconColor = '#FF9F1C',
      width = 340,
      height = 280,
      x = null,
      y = null,
      minWidth = 240,
      minHeight = 160,
      contentHtml = '',
      onInit = null,
      onClose = null,
      type = 'generic'
    } = options;

    // Calculate smart initial coordinates
    const canvasRect = this.canvas.getBoundingClientRect();
    const spawnIndex = this.spawnCounter % 6;
    this.spawnCounter++;

    let finalX = x !== null ? x : 40 + spawnIndex * this.staggerOffset;
    let finalY = y !== null ? y : 30 + spawnIndex * this.staggerOffset;

    // Bounds checking
    if (finalX + width > canvasRect.width) finalX = Math.max(10, canvasRect.width - width - 20);
    if (finalY + height > canvasRect.height) finalY = Math.max(10, canvasRect.height - height - 20);

    const winEl = document.createElement('div');
    winEl.className = 'floating-window active';
    winEl.id = id;
    winEl.dataset.type = type;
    winEl.style.width = width + 'px';
    winEl.style.height = height + 'px';
    winEl.style.left = finalX + 'px';
    winEl.style.top = finalY + 'px';
    winEl.style.zIndex = ++this.topZIndex;

    winEl.innerHTML = `
      <div class="window-header">
        <div class="window-title-group">
          <div class="window-title-icon" style="color: ${iconColor};">
            <i class="fa-solid ${icon}"></i>
          </div>
          <span class="window-title-text">${title}</span>
        </div>
        <div class="window-controls">
          <button class="win-btn btn-min" title="最小化/展開"><i class="fa-solid fa-minus"></i></button>
          <button class="win-btn btn-max" title="最大化/還原"><i class="fa-solid fa-expand"></i></button>
          <button class="win-btn btn-close" title="關閉"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
      <div class="window-body">
        ${contentHtml}
      </div>
      <div class="resize-handle" title="縮放大小"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></div>
    `;

    this.canvas.appendChild(winEl);

    const winObj = {
      id,
      type,
      element: winEl,
      width,
      height,
      x: finalX,
      y: finalY,
      minWidth,
      minHeight,
      isMaximized: false,
      isMinimized: false,
      preMaxState: null,
      preMinHeight: null,
      onClose
    };

    this.windows.set(id, winObj);

    // Setup interactions
    this.setupWindowInteractions(winObj);

    if (typeof onInit === 'function') {
      try {
        onInit(winEl, winObj);
      } catch (err) {
        console.error('Window onInit error:', err);
      }
    }

    this.bringToFront(winObj);
    return winObj;
  }

  bringToFront(winObj) {
    this.windows.forEach(w => w.element.classList.remove('active'));
    winObj.element.classList.add('active');
    winObj.element.style.zIndex = ++this.topZIndex;
  }

  setupWindowInteractions(winObj) {
    const el = winObj.element;
    const header = el.querySelector('.window-header');
    const resizeHandle = el.querySelector('.resize-handle');
    const minBtn = el.querySelector('.btn-min');
    const maxBtn = el.querySelector('.btn-max');
    const closeBtn = el.querySelector('.btn-close');
    const body = el.querySelector('.window-body');

    // Click inside window to bring to front
    el.addEventListener('pointerdown', (e) => {
      this.bringToFront(winObj);
    }, { passive: true });

    // Dragging Logic via Pointer Events
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let winStartX = 0;
    let winStartY = 0;

    header.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.win-btn')) return;
      if (winObj.isMaximized) return;

      isDragging = true;
      header.setPointerCapture(e.pointerId);
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      winStartX = parseInt(el.style.left, 10) || 0;
      winStartY = parseInt(el.style.top, 10) || 0;
      this.bringToFront(winObj);
      e.preventDefault();
    });

    header.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;

      const canvasRect = this.canvas.getBoundingClientRect();
      let nextX = winStartX + dx;
      let nextY = winStartY + dy;

      // Keep inside bounds
      nextX = Math.max(-el.offsetWidth + 80, Math.min(canvasRect.width - 80, nextX));
      nextY = Math.max(0, Math.min(canvasRect.height - 48, nextY));

      el.style.left = nextX + 'px';
      el.style.top = nextY + 'px';
      winObj.x = nextX;
      winObj.y = nextY;
    });

    const stopDrag = (e) => {
      if (isDragging) {
        isDragging = false;
        try { header.releasePointerCapture(e.pointerId); } catch(err){}
      }
    };
    header.addEventListener('pointerup', stopDrag);
    header.addEventListener('pointercancel', stopDrag);

    // Resizing Logic via Pointer Events
    let isResizing = false;
    let resizeStartX = 0;
    let resizeStartY = 0;
    let winStartW = 0;
    let winStartH = 0;

    resizeHandle.addEventListener('pointerdown', (e) => {
      if (winObj.isMaximized || winObj.isMinimized) return;
      isResizing = true;
      resizeHandle.setPointerCapture(e.pointerId);
      resizeStartX = e.clientX;
      resizeStartY = e.clientY;
      winStartW = el.offsetWidth;
      winStartH = el.offsetHeight;
      this.bringToFront(winObj);
      e.stopPropagation();
      e.preventDefault();
    });

    resizeHandle.addEventListener('pointermove', (e) => {
      if (!isResizing) return;
      const dw = e.clientX - resizeStartX;
      const dh = e.clientY - resizeStartY;

      const newW = Math.max(winObj.minWidth, winStartW + dw);
      const newH = Math.max(winObj.minHeight, winStartH + dh);

      el.style.width = newW + 'px';
      el.style.height = newH + 'px';
      winObj.width = newW;
      winObj.height = newH;
    });

    const stopResize = (e) => {
      if (isResizing) {
        isResizing = false;
        try { resizeHandle.releasePointerCapture(e.pointerId); } catch(err){}
      }
    };
    resizeHandle.addEventListener('pointerup', stopResize);
    resizeHandle.addEventListener('pointercancel', stopResize);

    // Window Controls
    minBtn.addEventListener('click', () => {
      if (winObj.isMinimized) {
        // Restore
        body.style.display = 'flex';
        resizeHandle.style.display = 'flex';
        el.style.height = winObj.preMinHeight + 'px';
        winObj.isMinimized = false;
        minBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
      } else {
        // Minimize to header
        winObj.preMinHeight = el.offsetHeight;
        body.style.display = 'none';
        resizeHandle.style.display = 'none';
        el.style.height = '48px';
        winObj.isMinimized = true;
        minBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
      }
    });

    maxBtn.addEventListener('click', () => {
      const iconEl = maxBtn.querySelector('i');
      if (winObj.isMaximized) {
        // Restore
        el.style.left = winObj.preMaxState.x + 'px';
        el.style.top = winObj.preMaxState.y + 'px';
        el.style.width = winObj.preMaxState.width + 'px';
        el.style.height = winObj.preMaxState.height + 'px';
        winObj.isMaximized = false;
        iconEl.className = 'fa-solid fa-expand';
      } else {
        // Maximize
        winObj.preMaxState = {
          x: parseInt(el.style.left, 10),
          y: parseInt(el.style.top, 10),
          width: el.offsetWidth,
          height: el.offsetHeight
        };
        const cRect = this.canvas.getBoundingClientRect();
        el.style.left = '10px';
        el.style.top = '10px';
        el.style.width = (cRect.width - 20) + 'px';
        el.style.height = (cRect.height - 20) + 'px';
        winObj.isMaximized = true;
        iconEl.className = 'fa-solid fa-compress';
      }
    });

    closeBtn.addEventListener('click', () => {
      this.closeWindow(winObj.id);
    });
  }

  closeWindow(id) {
    const winObj = this.windows.get(id);
    if (!winObj) return;

    if (typeof winObj.onClose === 'function') {
      try {
        winObj.onClose();
      } catch (err) {
        console.error('onClose error:', err);
      }
    }

    winObj.element.style.opacity = '0';
    winObj.element.style.transform = 'scale(0.85)';
    setTimeout(() => {
      if (winObj.element.parentNode) {
        winObj.element.parentNode.removeChild(winObj.element);
      }
      this.windows.delete(id);
    }, 180);
  }

  closeAll() {
    this.windows.forEach(w => this.closeWindow(w.id));
  }
}

window.WindowManager = WindowManager;
