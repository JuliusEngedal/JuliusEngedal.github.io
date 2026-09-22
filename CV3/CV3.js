async function initDropdowns() {
  const cv = await fetch('cv-data.json').then(r => r.json());

  document.querySelectorAll('.dropdown-box').forEach(container => {
    const key = container.dataset.key;
    const field = container.dataset.field;
    const data = cv[key];
    const list = container.querySelector('.dropdown-list');
    const btn = container.querySelector('.show-more');
    const btnText = btn.querySelector('.btn-text');
    const slot = container.parentElement; // .dropdown-slot

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

    setCollapsedHeight();

    // lock the slot's height to the collapsed box's natural size, once
    slot.style.minHeight = container.offsetHeight + 'px';

    if (data.length <= 2) {
      btn.style.display = 'none';
      return;
    }

    btn.addEventListener('click', () => {
  const isExpanding = !container.classList.contains('expanded');

  if (isExpanding) {
    container.classList.add('expanded');
    list.querySelectorAll('.entry.hidden').forEach(el => {
      el.style.display = 'block';
    });
    list.style.maxHeight = '500px';
    btnText.textContent = 'Vis mindre';
  } else {
    // start the collapse animation WHILE still absolute
    list.style.maxHeight = (() => {
      const visible = [...list.querySelectorAll('.entry:not(.hidden)')];
      return visible.reduce((sum, el) => sum + getEntryHeight(el), 0) + 'px';
    })();
    btnText.textContent = 'Vis mere';

    list.addEventListener('transitionend', function onCollapseEnd() {
      list.querySelectorAll('.entry.hidden').forEach(el => {
        el.style.display = 'none';
      });
      container.classList.remove('expanded'); // NOW switch back to normal flow
      list.removeEventListener('transitionend', onCollapseEnd);
    });
  }
});
  });
}

initDropdowns();