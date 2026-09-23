/* My Pets app logic */
(function () {
  "use strict";

  var speciesState = { guide: "kitten", recipes: "kitten", timer: "kitten" };

  /* ---------- helpers ---------- */
  function el(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtTime(secs) {
    secs = Math.max(0, Math.floor(secs));
    var h = Math.floor(secs / 3600);
    var m = Math.floor((secs % 3600) / 60);
    var s = secs % 60;
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    return (h > 0 ? pad(h) + ":" : "") + pad(m) + ":" + pad(s);
  }
  function isoNow() {
    var d = new Date();
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  /* ---------- tabs ---------- */
  var tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      document.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
      el("tab-" + btn.dataset.tab).classList.add("active");
      window.scrollTo({ top: 0 });
    });
  });

  /* ---------- species switches (event delegation) ---------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".species-btn");
    if (!btn) return;
    var species = btn.dataset.species;
    var ctx = btn.dataset.context || btn.closest(".tab-panel").id.replace("tab-", "");
    if (!ctx || !species) return;
    speciesState[ctx] = species;

    var panel = el("tab-" + ctx);
    panel.querySelectorAll(".species-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.species === species);
      b.setAttribute("aria-selected", b.dataset.species === species ? "true" : "false");
    });

    if (ctx === "guide") renderGuide(species);
    if (ctx === "recipes") renderRecipes(species);
    if (ctx === "timer") renderTimerOptions(species);
  });

  /* ---------- guide ---------- */
  function renderGuide(id) {
    var s = FEED_DATA[id];
    var html = `
      <div class="card">
        <span class="stage-badge">Caring for an orphan</span>
        <h2>${s.emoji} Guide for ${s.name}</h2>
        <p>${esc(s.introduction)}</p>
      </div>

      <div class="card table-card">
        <span class="stage-badge">Bottle-feeding schedule by age</span>
        <h2>Amount &amp; frequency</h2>
        <table>
          <thead><tr><th>Age</th><th>Weight</th><th>Per feeding</th><th>How often</th><th>Notes</th></tr></thead>
          <tbody>
            ${s.schedules.map(function (r) {
              return `<tr>
                <td><strong>${esc(r.age)}</strong></td>
                <td>${esc(r.weight)}</td>
                <td>${esc(r.amount)}</td>
                <td>${esc(r.frequency)}</td>
                <td>${esc(r.note)}</td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>

      <div class="card">
        <span class="stage-badge">Bottle-feeding technique</span>
        <h2>How to feed safely</h2>
        <ul class="check-list">
          ${s.feedingGuide.map(function (g) { return `<li>${esc(g)}</li>`; }).join("")}
        </ul>
      </div>

      <div class="card">
        <span class="stage-badge">Amount calculator</span>
        <h2>How much per feeding?</h2>
        <p class="calc-hint" style="color:var(--ink-soft);font-size:13.5px;margin-top:0">${esc(s.calculator.rule)}</p>
        <div class="calc-grid" style="display:flex;gap:10px;flex-wrap:wrap">
          <div style="flex:1;min-width:140px">
            <label for="calc-weight-${id}" style="display:block;font-weight:600;font-size:13px;margin-bottom:4px">Weight (grams)</label>
            <input id="calc-weight-${id}" type="number" min="1" placeholder="e.g. 200" style="width:100%;font:inherit;padding:10px;border:1px solid var(--line);border-radius:10px;background:var(--bg-soft)">
          </div>
          <div style="flex:1;min-width:140px">
            <label for="calc-feeds-${id}" style="display:block;font-weight:600;font-size:13px;margin-bottom:4px">Feedings per day</label>
            <input id="calc-feeds-${id}" type="number" min="1" max="12" placeholder="e.g. 8" style="width:100%;font:inherit;padding:10px;border:1px solid var(--line);border-radius:10px;background:var(--bg-soft)">
          </div>
        </div>
        <p id="calc-result-${id}" class="calc-result" style="margin:10px 0 0;font-weight:700;color:var(--brand-dark)"></p>
        <p style="font-size:12.5px;color:var(--ink-soft);margin:6px 0 0">${esc(s.calculator.gain)} · ${esc(s.calculator.weigh)}</p>
      </div>

      <div class="card">
        <span class="stage-badge">Weaning (orphans start ~3 weeks)</span>
        <h2>Moving to solid food</h2>
        <ol>
          ${s.weaning.map(function (w) { return `<li>${esc(w)}</li>`; }).join("")}
        </ol>
      </div>

      <div class="card">
        <span class="stage-badge">Rules to live by</span>
        <h2>Do's</h2>
        <ul class="check-list">${s.dos.map(function (d) { return `<li>${esc(d)}</li>`; }).join("")}</ul>
        <h2 style="margin-top:14px">Don'ts</h2>
        <ul class="x-list">${s.donts.map(function (d) { return `<li>${esc(d)}</li>`; }).join("")}</ul>
      </div>
    `;
    el("guide-content").innerHTML = html;

    /* calculator wiring */
    var w = el("calc-weight-" + id);
    var f = el("calc-feeds-" + id);
    var out = el("calc-result-" + id);
    function update() {
      var g = parseFloat(w.value);
      var n = parseInt(f.value, 10);
      if (!g || g <= 0) { out.textContent = ""; return; }
      var dailyLow = (g / 100) * 22;
      var dailyHigh = (g / 100) * 26;
      if (n && n > 0) {
        out.innerHTML = "~<strong>" + Math.round(dailyLow / n) + "–" + Math.round(dailyHigh / n) +
          " ml</strong> per feeding · " + Math.round(dailyLow) + "–" + Math.round(dailyHigh) + " ml per day";
      } else {
        out.innerHTML = Math.round(dailyLow) + "–" + Math.round(dailyHigh) + " ml per day (24 total feedings split evenly)";
      }
    }
    w.addEventListener("input", update);
    f.addEventListener("input", update);
    f.value = 8;
    w.focus();
  }

  /* ---------- recipes ---------- */
  function renderRecipes(id) {
    var s = FEED_DATA[id];
    var html = `
      <div class="card">
        <span class="stage-badge">Best option · buy this first</span>
        <h2>Commercial milk replacer</h2>
        <p>${esc(s.commercial)}</p>
      </div>

      ${s.homemade.map(function (r) {
        return `
          <div class="recipe ${s.accent}">
            <span class="recipe-kind">${esc(r.kind)}</span>
            <h3>${esc(r.name)}</h3>
            <p class="purpose">${esc(r.purpose)}</p>
            <div class="ingredients">
              <strong>Ingredients</strong>
              <ul>${r.ingredients.map(function (i) { return `<li>${esc(i)}</li>`; }).join("")}</ul>
            </div>
            <strong style="display:block;margin-top:10px">Steps</strong>
            <ol>${r.steps.map(function (st) { return `<li>${esc(st)}</li>`; }).join("")}</ol>
            <p style="font-size:13.5px;color:var(--ink-soft)">🗄️ ${esc(r.shelf)}${r.warning ? " · " + esc(r.warning) : ""}</p>
          </div>`;
      }).join("")}

      <div class="alternatives card">
        <span class="stage-badge">Out of an ingredient? Substitutions</span>
        <h2>Alternatives &amp; swaps</h2>
        <div class="alt-grid">
          ${s.alternatives.map(function (a) {
            return `<div class="alt-card ${s.accent}">
              <strong>If you don't have: ${esc(a.had)}</strong>
              <span>→ ${esc(a.use)}</span>
              <small style="display:block;color:var(--ink-soft);margin-top:4px">${esc(a.note)}</small>
            </div>`;
          }).join("")}
        </div>
      </div>

      <div class="alert alert-danger">
        <strong>Never feed:</strong>
        Plain cow's milk as a diet · plant-based milks · human baby formula · "cat/cow milk" treats · pet-food brands meant for adults.
      </div>
    `;
    el("recipes-content").innerHTML = html;
  }

  /* ---------- emergency ---------- */
  function renderEmergency() {
    var e = FEED_DATA.emergency;
    var html = `
      <div class="alert alert-danger priority-card">
        <strong>⚠️ First, decide: emergency or not?</strong>
        ${esc(e.headerPriority)}
      </div>

      <div class="card priority-card">
        <span class="stage-badge">Failure to thrive</span>
        <h2>${esc(e.fading.title)}</h2>
        <p><strong>Watch for:</strong></p>
        <ul class="x-list">${e.fading.signs.map(function (x) { return `<li>${esc(x)}</li>`; }).join("")}</ul>
        <p><strong>Act NOW — in order:</strong></p>
        <ol class="emergency-steps">
          ${e.fading.steps.map(function (st) {
            return `<li><strong>${esc(st.title)}</strong><br>${esc(st.text)}</li>`;
          }).join("")}
        </ol>
      </div>

      <div class="card">
        <span class="stage-badge">#1 killer of orphans</span>
        <h2>${esc(e.hypothermia.title)}</h2>
        <p>${esc(e.hypothermia.text)}</p>
        <p><strong>Signs:</strong></p>
        <ul class="x-list">${e.hypothermia.signs.map(function (x) { return `<li>${esc(x)}</li>`; }).join("")}</ul>
        <p><strong>Safe temperatures:</strong></p>
        <div class="table-card">
          <table>
            <thead><tr><th>Age</th><th>Baby's temperature</th><th>Nest temperature</th></tr></thead>
            <tbody>
              ${e.hypothermia.temps.map(function (t) {
                return `<tr><td>${esc(t.week)}</td><td>${esc(t.rectal)}</td><td>${esc(t.nest)}</td></tr>`;
              }).join("")}
            </tbody>
          </table>
        </div>
        <p style="margin-bottom:4px"><strong>Do:</strong></p>
        <ul class="check-list">${e.hypothermia.do.map(function (d) { return `<li>${esc(d)}</li>`; }).join("")}</ul>
        <p style="margin-bottom:4px"><strong>Don't:</strong></p>
        <ul class="x-list">${e.hypothermia.dont.map(function (d) { return `<li>${esc(d)}</li>`; }).join("")}</ul>
      </div>

      <div class="card">
        <span class="stage-badge">Watch for</span>
        <h2>${esc(e.dehydration.title)}</h2>
        <p>${esc(e.dehydration.text)}</p>
        <ul class="x-list">${e.dehydration.signs.map(function (x) { return `<li>${esc(x)}</li>`; }).join("")}</ul>
      </div>

      <div class="card">
        <span class="stage-badge">Newborns can't go alone</span>
        <h2>${esc(e.elimination.title)}</h2>
        <p>${esc(e.elimination.text)}</p>
        <ol class="emergency-steps">
          ${e.elimination.steps.map(function (st) { return `<li>${esc(st)}</li>`; }).join("")}
        </ol>
      </div>

      <div class="card">
        <span class="stage-badge">Every single feed</span>
        <h2>${esc(e.feedingSafety.title)}</h2>
        <p style="margin-bottom:4px"><strong>Always:</strong></p>
        <ul class="check-list">${e.feedingSafety.do.map(function (d) { return `<li>${esc(d)}</li>`; }).join("")}</ul>
        <p style="margin-bottom:4px"><strong>Never:</strong></p>
        <ul class="x-list">${e.feedingSafety.dont.map(function (d) { return `<li>${esc(d)}</li>`; }).join("")}</ul>
      </div>
    `;
    el("emergency-content").innerHTML = html;
  }

  /* ================= TIMER ================= */
  var timer = {
    running: false,
    intervalSec: 3 * 3600,
    remaining: 3 * 3600,
    endAt: null,
    tickId: null,
    species: "kitten"
  };

  var LOG_KEY = "rescuefeeds.feedlog";

  function getLog() {
    try {
      var raw = localStorage.getItem(LOG_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (err) { return []; }
  }
  function saveLog(arr) {
    try { localStorage.setItem(LOG_KEY, JSON.stringify(arr.slice(-100))); } catch (err) {}
  }

  function renderTimerOptions(id) {
    var s = FEED_DATA[id];
    timer.species = id;
    var sel = el("interval-select");
    sel.innerHTML = INTERVAL_OPTIONS.map(function (opt) {
      return `<option value="${opt.value}">${esc(opt.label)}</option>`;
    }).join("");
    var suggested = s.intervals[1] || 3;
    sel.value = String(suggested);
  }

  function renderTimerDisplay() {
    var disp = el("timer-display");
    var t = disp.querySelector(".timer-time");
    if (!t) return;
    t.textContent = fmtTime(timer.remaining);
    var status = el("timer-status");
    if (timer.running) {
      status.textContent = "Next feeding in " + fmtTime(timer.remaining);
      disp.classList.remove("alerting");
    } else if (timer.remaining === 0 || timer.remaining < 0) {
      status.textContent = "Time to feed! 🍼";
      disp.classList.add("alerting");
    } else {
      status.textContent = "Timer not started";
      disp.classList.remove("alerting");
    }
    el("timer-start").disabled = timer.running;
    el("timer-feed").disabled = !(timer.running && timer.remaining <= 0);
    el("timer-stop").disabled = !timer.running;
  }

  function startTimer() {
    var v = parseInt(el("interval-select").value, 10);
    timer.intervalSec = v * 3600;
    timer.remaining = timer.intervalSec;
    timer.running = true;
    timer.endAt = Date.now() + timer.intervalSec * 1000;
    saveTimerState();
    if (timer.tickId) clearInterval(timer.tickId);
    timer.tickId = setInterval(onTick, 500);
    renderTimerDisplay();
    el("timer-status").textContent = "Next feeding in " + fmtTime(timer.remaining);
  }

  function stopTimer() {
    timer.running = false;
    timer.endAt = null;
    if (timer.tickId) { clearInterval(timer.tickId); timer.tickId = null; }
    timer.remaining = 0;
    localStorage.removeItem("rescuefeeds.timer");
    renderTimerDisplay();
  }

  function onTick() {
    if (!timer.running) return;
    timer.remaining = Math.round((timer.endAt - Date.now()) / 1000);
    if (timer.remaining <= 0) {
      timer.remaining = 0;
      timer.running = false;
      if (timer.tickId) { clearInterval(timer.tickId); timer.tickId = null; }
      triggerAlarm();
    }
    renderTimerDisplay();
  }

  function saveTimerState() {
    try {
      localStorage.setItem("rescuefeeds.timer", JSON.stringify({ endAt: timer.endAt, intervalSec: timer.intervalSec }));
    } catch (err) {}
  }

  function restoreTimer() {
    try {
      var raw = localStorage.getItem("rescuefeeds.timer");
      if (!raw) return;
      var st = JSON.parse(raw);
      if (!st || !st.endAt) return;
      timer.intervalSec = st.intervalSec;
      timer.endAt = st.endAt;
      timer.remaining = Math.round((st.endAt - Date.now()) / 1000);
      var sel = el("interval-select");
      sel.value = String(Math.round(st.intervalSec / 3600));
      if (timer.remaining > 0) {
        timer.running = true;
        timer.tickId = setInterval(onTick, 500);
        renderTimerDisplay();
      } else {
        triggerAlarm();
      }
    } catch (err) {}
  }

  function logFeeding() {
    var arr = getLog();
    arr.push({ t: Date.now(), label: isoNow() });
    saveLog(arr);
    renderLog();
  }

  function renderLog() {
    var arr = getLog();
    var today = new Date().toDateString();
    var todayCount = arr.filter(function (x) { return new Date(x.t).toDateString() === today; }).length;
    var countEl = el("log-count");
    if (arr.length === 0) {
      countEl.textContent = "No feedings recorded yet.";
      return;
    }
    countEl.innerHTML = "Day: <strong>" + todayCount + "</strong> feeding" + (todayCount === 1 ? "" : "s") +
      " · all time: " + arr.length + "<br><small style='color:var(--ink-soft)'>Last: " + esc(arr[arr.length - 1].label) + "</small>";
  }

  /* ---------- alarm ---------- */
  function triggerAlarm() {
    renderTimerDisplay();
    el("alarm-overlay").classList.remove("hidden");
    el("alarm-overlay").setAttribute("aria-hidden", "false");
    var copy = el("alarm-copy");
    copy.textContent = timer.species === "puppy"
      ? "Your puppy is hungry — warm formula to 95–100°F and feed."
      : "Your kitten is hungry — warm formula to 95–100°F and feed.";
    beep();
    notify(timer.species === "puppy" ? "Puppy feeding time!" : "Kitten feeding time!");
  }

  function beep() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      var ctx = new Ctx();
      var notes = [880, 660, 880, 660, 880];
      notes.forEach(function (f, i) {
        var o = ctx.createOscillator();
        var g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = f;
        g.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.45);
        g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + i * 0.45 + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.45 + 0.4);
        o.connect(g); g.connect(ctx.destination);
        o.start(ctx.currentTime + i * 0.45);
        o.stop(ctx.currentTime + i * 0.45 + 0.45);
      });
    } catch (err) {}
  }

  function notify(title) {
    try {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, { body: "It's feeding time. Warm the formula, feed on the belly, stimulate afterward." });
      }
    } catch (err) {}
  }

  function initTimerControls() {
    el("timer-start").addEventListener("click", startTimer);
    el("timer-stop").addEventListener("click", stopTimer);
    el("timer-feed").addEventListener("click", function () {
      if (!(timer.running && timer.remaining <= 0)) return;
      logFeeding();
      startTimer();
    });
    el("alarm-dismiss").addEventListener("click", function () {
      el("alarm-overlay").classList.add("hidden");
      el("alarm-overlay").setAttribute("aria-hidden", "true");
    });
    el("log-clear").addEventListener("click", function () { saveLog([]); renderLog(); });
    el("notify-on").addEventListener("click", function () {
      if (!("Notification" in window)) { alert("This browser doesn't support notifications."); return; }
      Notification.requestPermission().then(function (p) {
        alert(p === "granted" ? "Notifications enabled. Keep this app open for reminders." : "Notifications blocked — I'll ring in-page instead.");
      });
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    renderGuide(speciesState.guide);
    renderRecipes(speciesState.recipes);
    renderEmergency();
    renderTimerOptions(speciesState.timer);
    renderLog();
    renderTimerDisplay();
    initTimerControls();
    restoreTimer();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();