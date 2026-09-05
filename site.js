const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (nav) {
  const partyLink = nav.querySelector('.party-link');
  const extraLinks = [
    ['stypy.html', 'Stypy'],
    ['uroczyste-kolacje.html', 'Uroczyste kolacje']
  ];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  extraLinks.forEach(([href, label]) => {
    if (nav.querySelector(`a[href="${href}"]`)) return;
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (currentPage === href) link.classList.add('active');
    nav.insertBefore(link, partyLink);
  });
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const quoteForm = document.querySelector('#quote-form');

if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const eventType = data.get('event');
    const subject = `Zapytanie ze strony — ${eventType}`;
    const body = [
      `Rodzaj wydarzenia: ${eventType}`,
      `Liczba gości: ${data.get('guests')}`,
      `Miejscowość: ${data.get('location')}`,
      `Telefon kontaktowy: ${data.get('phone')}`,
      '',
      'Dodatkowe informacje:',
      data.get('details') || 'Brak'
    ].join('\n');

    const recipient = String(eventType).includes('PARTY TENT') ? 'partytent@vp.pl' : 'knajpkarodzinna@vp.pl';
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const quickContact = document.createElement('div');
quickContact.className = 'quick-contact';
quickContact.setAttribute('aria-label', 'Szybki kontakt');
const onPartyTentPage = window.location.pathname.endsWith('/party-tent.html');
quickContact.innerHTML = onPartyTentPage
  ? '<a class="quick-phone" href="tel:+48690200072">Zadzwoń</a><a class="quick-facebook" href="https://www.facebook.com/PARTY.TENT.IMPREZY.PLENEROWE/" target="_blank" rel="noopener noreferrer">Facebook</a>'
  : '<a class="quick-phone" href="tel:+48519489185">Zadzwoń</a><a class="quick-facebook" href="https://www.facebook.com/Knajpka.Rodzinna/" target="_blank" rel="noopener noreferrer">Facebook</a>';
document.body.appendChild(quickContact);
