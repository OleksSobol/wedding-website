/**
 * No-account guest uploader.
 * Requests a resumable upload session from the Apps Script backend, then sends
 * the file bytes straight from the guest's browser to Google Drive (with a
 * progress bar). No Google login required for the guest.
 *
 * SETUP: paste your deployed Apps Script /exec URL into GAS_UPLOAD_URL.
 * Keep UPLOAD_TOKEN identical to SHARED_TOKEN in scripts/apps-script-upload.gs.
 */
(function () {
  'use strict';

  // ▼▼▼ FILL THIS IN (from the Apps Script "Web app" deployment) ▼▼▼
  var GAS_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbzsyjIxacT8hryVbDUC-zoQk0Kw_nLmoL-BD95yLg3UyJH-4-6jCeUiEnwFHwPdr6xT/exec';
  var UPLOAD_TOKEN = 'solstice2026';
  // ▲▲▲ FILL THIS IN ▲▲▲

  var isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  var isConfigured = GAS_UPLOAD_URL.indexOf('PASTE_') === -1;

  // --- Elements ---
  var toggleBtn = document.getElementById('no-account-toggle');
  var panel = document.getElementById('uploader-panel');
  var nameInput = document.getElementById('uploader-name');
  var fileInput = document.getElementById('uploader-files');
  var startBtn = document.getElementById('uploader-start');
  var listEl = document.getElementById('uploader-list');
  var statusEl = document.getElementById('uploader-status');

  if (!toggleBtn || !panel) return;

  toggleBtn.addEventListener('click', function () {
    var open = panel.hasAttribute('hidden');
    if (open) {
      panel.removeAttribute('hidden');
      toggleBtn.setAttribute('aria-expanded', 'true');
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      panel.setAttribute('hidden', '');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Render the chosen files with a per-file progress row.
  fileInput.addEventListener('change', function () {
    listEl.innerHTML = '';
    statusEl.textContent = '';
    Array.prototype.forEach.call(fileInput.files, function (file, i) {
      var row = document.createElement('div');
      row.className = 'uploader-item';
      row.id = 'uitem-' + i;
      row.innerHTML =
        '<div class="uploader-item-name">' + escapeHtml(file.name) +
        ' <span class="uploader-item-size">' + humanSize(file.size) + '</span></div>' +
        '<div class="uploader-bar"><div class="uploader-bar-fill" style="width:0%"></div></div>' +
        '<div class="uploader-item-state">Ready</div>';
      listEl.appendChild(row);
    });
    startBtn.disabled = fileInput.files.length === 0;
  });

  startBtn.addEventListener('click', function () {
    var files = fileInput.files;
    if (!files.length) return;

    var guestName = (nameInput.value || '').trim();
    if (!guestName) {
      statusEl.textContent = 'Please add your name first 🙂';
      nameInput.focus();
      return;
    }

    if (!isConfigured && !isLocal) {
      statusEl.textContent = 'Uploads aren’t set up yet — please use the album button above for now.';
      return;
    }

    setBusy(true);
    uploadAll(files, guestName)
      .then(function (results) {
        var ok = results.filter(function (r) { return r.ok; }).length;
        var failed = results.length - ok;
        if (failed === 0) {
          statusEl.textContent = 'Thank you, ' + guestName + '! ' + ok + ' file' + (ok === 1 ? '' : 's') + ' uploaded 🎉';
          fileInput.value = '';
          nameInput.value = '';
          listEl.innerHTML = '';
          fileInput.disabled = false;
          nameInput.disabled = false;
          startBtn.disabled = true;
          startBtn.textContent = 'Upload';
        } else {
          statusEl.textContent = ok + ' uploaded, ' + failed + ' failed. You can retry the failed ones.';
          setBusy(false);
        }
      })
      .catch(function (err) {
        statusEl.textContent = 'Something went wrong: ' + err.message;
        setBusy(false);
      });
  });

  function uploadAll(files, guestName) {
    // Sequential — most reliable on mobile/spotty connections.
    var results = [];
    var chain = Promise.resolve();
    Array.prototype.forEach.call(files, function (file, i) {
      chain = chain.then(function () {
        return uploadOne(file, guestName, i)
          .then(function () { results.push({ ok: true }); setState(i, 'Done ✓', 'done'); })
          .catch(function (err) {
            results.push({ ok: false });
            setState(i, 'Failed — ' + err.message, 'error');
          });
      });
    });
    return chain.then(function () { return results; });
  }

  function uploadOne(file, guestName, i) {
    if (isLocal && !isConfigured) {
      // Local UI test: simulate progress without touching Drive.
      return simulate(i);
    }
    setState(i, 'Starting…', '');
    return startSession(file, guestName).then(function (sessionUrl) {
      return putBytes(sessionUrl, file, i);
    });
  }

  function startSession(file, guestName) {
    // text/plain avoids a CORS preflight to Apps Script; the body is still JSON.
    return fetch(GAS_UPLOAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        token: UPLOAD_TOKEN,
        guestName: guestName,
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream',
        origin: location.origin
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data.success || !data.sessionUrl) {
          throw new Error(data.error || 'no session');
        }
        return data.sessionUrl;
      });
  }

  function putBytes(sessionUrl, file, i) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', sessionUrl, true);
      if (file.type) xhr.setRequestHeader('Content-Type', file.type);
      xhr.upload.onprogress = function (ev) {
        if (ev.lengthComputable) setProgress(i, ev.loaded / ev.total);
      };
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) { setProgress(i, 1); resolve(); }
        else reject(new Error('HTTP ' + xhr.status));
      };
      xhr.onerror = function () { reject(new Error('network error')); };
      xhr.send(file);
    });
  }

  function simulate(i) {
    return new Promise(function (resolve) {
      var p = 0;
      var t = setInterval(function () {
        p += 0.15; setProgress(i, Math.min(p, 1));
        if (p >= 1) { clearInterval(t); resolve(); }
      }, 120);
    });
  }

  // --- UI helpers ---
  function setProgress(i, frac) {
    var fill = document.querySelector('#uitem-' + i + ' .uploader-bar-fill');
    if (fill) fill.style.width = Math.round(frac * 100) + '%';
    if (frac < 1) setState(i, 'Uploading… ' + Math.round(frac * 100) + '%', '');
  }
  function setState(i, text, cls) {
    var el = document.querySelector('#uitem-' + i + ' .uploader-item-state');
    if (el) { el.textContent = text; el.className = 'uploader-item-state ' + (cls || ''); }
  }
  function setBusy(busy) {
    startBtn.disabled = busy;
    startBtn.textContent = busy ? 'Uploading…' : 'Upload';
    fileInput.disabled = busy;
    nameInput.disabled = busy;
  }
  function humanSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(0) + ' KB';
    if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    return (bytes / 1073741824).toFixed(2) + ' GB';
  }
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
