const CLOSE_ICON = './assets/icons/close.png'
let modal;
let nameInput;

export function initBookingModal() {
  if (modal) return;

  modal = createModal();
  document.body.append(modal);

  const buttons = document.querySelectorAll('.price-card__button');

  buttons.forEach(button => {
    button.addEventListener('click', openModal);
  });
}

function openModal() {
  if (!modal) return;

  modal.showModal();
  document.body.classList.add('modal-open');

  nameInput?.focus();
}

function closeModal() {
  if (!modal?.open) return;

  modal.close();
  document.body.classList.remove('modal-open');
}

function createModal() {
  const dialog = document.createElement('dialog');
  dialog.className = 'modal';
  dialog.setAttribute('aria-modal', 'true');

  const container = document.createElement('div');
  container.className = 'modal__container';

  const closeBtn = createCloseButton();

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeModal();
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
  });

  dialog.addEventListener('cancel', () => {
    closeModal();
  });

  const content = document.createElement('div');
  content.className = 'modal__content';
  content.append(
    createTitle(),
    createForm()
  );

  container.append(
    closeBtn,
    content
  );

  dialog.append(container);

  return dialog;
}

function createCloseButton() {
  const button = document.createElement('button');

  button.className = 'modal__close';
  button.type = 'button';
  button.setAttribute('aria-label', 'Close modal');

  const icon = document.createElement('img');
  icon.className = 'modal__close-icon';
  icon.src = CLOSE_ICON;
  icon.alt = '';
  icon.setAttribute('aria-hidden', 'true');

  button.append(icon);

  button.addEventListener('click', closeModal);

  return button;
}

function createTitle() {
  const title = document.createElement('h2');

  title.className = 'form__title';
  title.textContent = 'Like my portfolio? Sign up for a shoot!';

  return title;
}

function createForm() {
  const form = document.createElement('form');

  form.className = 'form modal__form';

  const nameField = document.createElement('label');
  nameField.className = 'form__field';

  nameInput = document.createElement('input');
  nameInput.className = 'form__input';
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameInput.placeholder = 'Your name';
  nameInput.required = true;

  nameField.append(nameInput);

  const phoneField = document.createElement('label');
  phoneField.className = 'form__field';

  const phoneInput = document.createElement('input');
  phoneInput.className = 'form__input';
  phoneInput.type = 'tel';
  phoneInput.name = 'phone';
  phoneInput.placeholder = '+1';
  phoneInput.required = true;

  phoneField.append(phoneInput);

  const submit = document.createElement('button');
  submit.className = 'form__button';
  submit.type = 'submit';
  submit.textContent = 'Book now';

  form.append(nameField, phoneField, submit);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal();
    form.reset();
  });

  return form;
}