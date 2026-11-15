(function () {
  var ENDPOINT = 'https://octash-forms.verspel.workers.dev/submit-waitlist';
  var form = document.getElementById('join-form');
  if (!form) return;
  var status = document.getElementById('join-status');
  var done = document.getElementById('join-done');
  var role = document.getElementById('f-role');

  // /join?as=partner (from the Partners page): show partner roles and ask for network size.
  if (new URLSearchParams(location.search).get('as') === 'partner') {
    Array.prototype.forEach.call(role.querySelectorAll('option[data-farm]'), function (o) { o.remove(); });
    document.getElementById('f-cows-label').textContent = 'Number of farms in your network';
  }

  function fail(msg, field) {
    status.textContent = msg;
    status.className = 'form-status error';
    if (field) field.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = {};
    Array.prototype.forEach.call(form.elements, function (el) { if (el.name) d[el.name] = el.value.trim(); });
    if (!d.name) return fail('Please enter your full name.', form.elements.name);
    if (!/^\+?[0-9 ()-]{7,}$/.test(d.phone)) return fail('Please enter a phone number we can reach on WhatsApp.', form.elements.phone);
    if (d.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) return fail('Please check your email address, or leave it empty.', form.elements.email);
    if (!d.role) return fail('Please choose what describes you.', role);

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.className = 'form-status';
    status.textContent = 'Sending...';

    fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.error || 'Send failed');
        form.hidden = true;
        done.hidden = false;
        done.focus();
        if (window.dataLayer) window.dataLayer.push({ event: 'join_submitted', role: d.role });
      })
      .catch(function () {
        btn.disabled = false;
        fail('That did not send. Please try again, or message us on WhatsApp at 0808 109 4648.');
      });
  });
})();
