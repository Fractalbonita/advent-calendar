(function() {
  const awardImg = document.querySelector('.drinkdesc img');
  const $ = q => document.querySelector(q).textContent.trim();
  const $a = q => document.querySelector(q).href;
  const award = () => awardImg.getAttribute('alt');
  const textarea = document.createElement('textarea');
  textarea.style.position = 'absolute';
  textarea.style.top = textarea.style.left = '-999%';
  document.body.appendChild(textarea);
  awardImg.addEventListener('click', () => {
    let n = 0;
    if (document.querySelector('.drinkdesc span:nth-of-type(6) a')) {
      n = 1;
    }
    textarea.value = JSON.stringify(
      {
        award: award(),
        // eslint-disable-next-line no-useless-escape
        year: location.pathname.replace(/.*\-/, ''),
        name: $('h4'),
        brewery: $('h3'),
        tastingNote: '',
        category: $('.drinkdesc span:nth-of-type(' + (1 + n) + ')'),
        country: $('.drinkdesc span:nth-of-type(' + (2 + n) + ')'),
        style: $('.drinkdesc span:nth-of-type(' + (3 + n) + ')'),
        abv: n == 0 ? '0.00%' : $('.drinkdesc span:nth-of-type(1)'),
        website: $a('.drinkdesc span:nth-of-type(' + (5 + n) + ') a')
      },
      null,
      2
    );
    textarea.select();
    document.execCommand('copy');
  });
})();
