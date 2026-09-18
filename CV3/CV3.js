async function initDropdowns() {
  const cv = await fetch('cv-data.json').then(r => r.json());

  document.querySelectorAll('.dropdown-box').forEach(container => {
    const key = container.dataset.key;
    const field = container.dataset.field;
    const data = cv[key];
    const list = container.querySelector('.dropdown-list');
    const btn = container.querySelector('.show-more');
    const btnText = btn.querySelector('.btn-text');

    list.innerHTML = data.map((item, i) => `
      <li class="entry ${i >= 2 ? 'hidden' : ''}">
        <strong>${item.headline}</strong><br>
        ${item[field]}<br>
        ${item.date}
      </li>
    `).join('');

    const getEntryHeight = (el) => {
      const style = getComputedStyle(el);
      return el.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    };

    const setCollapsedHeight = () => {
      const visible = [...list.querySelectorAll('.entry:not(.hidden)')];
      const height = visible.reduce((sum, el) => sum + getEntryHeight(el), 0);
      list.style.maxHeight = height + 'px';
    };

    if (data.length <= 2) {
      btn.style.display = 'none';
      setCollapsedHeight();
      return;
    }

    setCollapsedHeight();

    btn.addEventListener('click', () => {
      const expanded = container.classList.toggle('expanded');

      if (expanded) {
        list.querySelectorAll('.entry.hidden').forEach(el => {
          el.style.display = 'block';
        });

        // cap growth at whatever space is left in the box, instead of full scrollHeight
        const available = container.clientHeight - btn.offsetHeight;
        const fullHeight = list.scrollHeight;
        list.style.maxHeight = Math.min(fullHeight, available) + 'px';

        btnText.textContent = 'Vis mindre';
      } else {
        setCollapsedHeight();
        btnText.textContent = 'Vis mere';
        list.addEventListener('transitionend', function hideAfterCollapse() {
          list.querySelectorAll('.entry.hidden').forEach(el => {
            el.style.display = 'none';
          });
          list.removeEventListener('transitionend', hideAfterCollapse);
        });
      }
    });
  });
}

initDropdowns();