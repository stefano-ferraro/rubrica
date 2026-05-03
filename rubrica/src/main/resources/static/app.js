const API = '/api/contatti';

async function caricaTutti() {
  const res = await fetch(API);
  const contatti = await res.json();
  renderTabella(contatti);
}

async function cerca() {
  const nome = document.getElementById('cercaNome').value;
  if (!nome) return caricaTutti();
  const res = await fetch(`${API}/cerca?nome=${nome}`);
  const contatti = await res.json();
  renderTabella(contatti);
}

async function aggiungi() {
  const nome = document.getElementById('nome').value.trim();
  const cognome = document.getElementById('cognome').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nome || !cognome || !telefono || !email) {
    mostraNotifica('Compila tutti i campi!', 'danger');
    return;
  }

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, cognome, telefono, email })
  });

  document.getElementById('nome').value = '';
  document.getElementById('cognome').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('email').value = '';

  mostraNotifica('Contatto aggiunto con successo!', 'success');
  caricaTutti();
}

async function elimina(id) {
  if (!confirm('Sei sicuro di voler eliminare questo contatto?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  mostraNotifica('Contatto eliminato.', 'warning');
  caricaTutti();
}

function apriModifica(id, nome, cognome, telefono, email) {
  document.getElementById('editId').value = id;
  document.getElementById('editNome').value = nome;
  document.getElementById('editCognome').value = cognome;
  document.getElementById('editTelefono').value = telefono;
  document.getElementById('editEmail').value = email;
  new bootstrap.Modal(document.getElementById('modalModifica')).show();
}

async function salvaModifica() {
  const id = document.getElementById('editId').value;
  const contatto = {
    nome: document.getElementById('editNome').value.trim(),
    cognome: document.getElementById('editCognome').value.trim(),
    telefono: document.getElementById('editTelefono').value.trim(),
    email: document.getElementById('editEmail').value.trim()
  };

  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contatto)
  });

  bootstrap.Modal.getInstance(document.getElementById('modalModifica')).hide();
  mostraNotifica('Contatto modificato con successo!', 'success');
  caricaTutti();
}

function renderTabella(contatti) {
  const tbody = document.getElementById('tabellaContatti');
  tbody.innerHTML = '';

  if (contatti.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted py-4">Nessun contatto trovato.</td>
      </tr>`;
    return;
  }

  contatti.forEach(c => {
    const tr = document.createElement('tr');
    tr.classList.add('fade-in');
    tr.innerHTML = `
      <td>${c.nome}</td>
      <td>${c.cognome}</td>
      <td>${c.telefono}</td>
      <td>${c.email}</td>
      <td>
        <button class="btn btn-warning btn-sm me-1" onclick="apriModifica(${c.id}, '${c.nome}', '${c.cognome}', '${c.telefono}', '${c.email}')">Modifica</button>
        <button class="btn btn-danger btn-sm" onclick="elimina(${c.id})">Elimina</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function mostraNotifica(messaggio, tipo) {
  const notifica = document.getElementById('notifica');
  notifica.className = `alert alert-${tipo}`;
  notifica.textContent = messaggio;
  notifica.classList.remove('d-none');
  setTimeout(() => notifica.classList.add('d-none'), 3000);
}

caricaTutti();