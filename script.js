const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav a');
const signalCard = document.querySelector('.signal-card');
const flowItems = document.querySelectorAll('.flow-item');
const stepCounter = document.querySelector('.signal-top strong');
const heroTitle = document.querySelector('h1');
const heroLead = document.querySelector('.lead');

if (heroTitle) {
  heroTitle.textContent = 'QA for product flows and APIs.';
}

if (heroLead) {
  heroLead.textContent = 'Manual testing, REST validation and Java automation growth.';
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

if (signalCard) {
  signalCard.addEventListener('pointermove', (event) => {
    const rect = signalCard.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    signalCard.style.setProperty('--mx', `${x}%`);
    signalCard.style.setProperty('--my', `${y}%`);
  });
}

let currentStep = 0;
let loopTimer;

function setFlowStep(index) {
  if (!flowItems.length) return;

  currentStep = index;

  flowItems.forEach((item, itemIndex) => {
    item.classList.toggle('active', itemIndex === currentStep);
    item.setAttribute('aria-pressed', String(itemIndex === currentStep));
  });

  if (stepCounter) {
    stepCounter.textContent = `${String(currentStep + 1).padStart(2, '0')} / ${String(flowItems.length).padStart(2, '0')}`;
  }
}

function startFlowLoop() {
  if (!flowItems.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  clearInterval(loopTimer);
  loopTimer = setInterval(() => {
    setFlowStep((currentStep + 1) % flowItems.length);
  }, 2200);
}

flowItems.forEach((item, index) => {
  item.setAttribute('role', 'button');
  item.setAttribute('tabindex', '0');
  item.setAttribute('aria-pressed', String(index === 0));

  item.addEventListener('click', () => {
    setFlowStep(index);
    startFlowLoop();
  });

  item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setFlowStep(index);
      startFlowLoop();
    }
  });
});

setFlowStep(0);
startFlowLoop();

const sections = [...document.querySelectorAll('main section[id]')];

if ('IntersectionObserver' in window && sections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );

  sections.forEach((section) => navObserver.observe(section));
}

const animatedItems = document.querySelectorAll('[data-animate]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  animatedItems.forEach((item) => observer.observe(item));
} else {
  animatedItems.forEach((item) => item.classList.add('is-visible'));
}
