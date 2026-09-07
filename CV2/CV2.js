
async function initDropdowns() {
  const cv = await fetch('cv-data.json').then(r => r.json());

  document.querySelectorAll('.dropdown').forEach(container => {
    const key = container.dataset.key;       // "CvData" or "CvUddData"
    const field = container.dataset.field;   // "workstation" or "station"
    const data = cv[key];
    const list = container.querySelector('.dropdown-list');
    const btn = container.querySelector('.show-more');
    const btnText = btn.querySelector('.btn-text');

    list.innerHTML = data.map((item, i) => `
      <li class="entry ${i >= 2 ? 'hidden' : ''}">
        <h3>${item.headline}</h3>
        <i>${item[field]}</i>
        <p><strong>${item.date}</strong></p>
      </li>
    `).join('');

    const setCollapsedHeight = () => {
        const visible = [...list.querySelectorAll('.entry:not(.hidden)')];
        const height = visible.reduce((sum, el) => {
            const style = getComputedStyle(el);
            const marginTop = parseFloat(style.marginTop);
            const marginBottom = parseFloat(style.marginBottom);
            return sum + el.offsetHeight + marginTop + marginBottom;
        }, 0);

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
       
        list.style.maxHeight = list.scrollHeight + 'px';
        btnText.textContent = 'Se mindre';
      } else {
        
        setCollapsedHeight();
        btnText.textContent = 'Se mere';
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