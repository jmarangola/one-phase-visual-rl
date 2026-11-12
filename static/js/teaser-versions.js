(() => {
  const $ = id => document.getElementById(id);
  const video = $('teaser');
  const sectionStart = 418 / 30;
  const gridStart = (418 + 420) / 30;
  const variants = {
    v0a: { file: 'static/videos/teaser-draft/website-teaser-v0a.mp4', description: 'Original: a single Push-T force-recovery clip, then the three-column recovery grid.', poster: 'static/videos/teaser-draft/teaser-v0a-hero.jpg' },
    v0b: { file: 'static/videos/teaser-draft/website-teaser-v0b.mp4', description: 'Push-T on the left, simulated clutter picking on the right, then the three-column recovery grid.', poster: 'static/videos/teaser-draft/teaser-v0b-split.jpg' },
    v0c: { file: 'static/videos/teaser-draft/website-teaser-v0c.mp4', description: 'The same Push-T / clutter split, followed by six short recoveries playing simultaneously in a 2 × 3 grid.', poster: 'static/videos/teaser-draft/teaser-v0c-grid.jpg' }
  };
  const cached = new Map();
  let current = 'v0b', scope = 'section', request = 0, ready = false, desiredTime = sectionStart;
  const scopeStart = () => scope === 'grid' ? gridStart : scope === 'section' ? sectionStart : 0;
  function timeDisplay() {
    const time = ready ? video.currentTime : desiredTime;
    $('seek').value = time;
    const duration = ready && Number.isFinite(video.duration) ? video.duration.toFixed(2) : '—';
    $('clock').textContent = `${time.toFixed(2)} / ${duration} s`;
  }
  async function play() {
    try { await video.play(); $('status').textContent = ''; }
    catch { $('status').textContent = 'Ready. Press Play to start.'; }
  }
  async function select(id) {
    desiredTime = ready ? video.currentTime : desiredTime;
    const mine = ++request;
    current = id;
    ready = false;
    video.pause();
    $('play').disabled = $('seek').disabled = true;
    Object.keys(variants).forEach(key => $(key).setAttribute('aria-pressed', String(key === id)));
    $('description').textContent = variants[id].description;
    $('download').href = variants[id].file;
    $('download').textContent = `Download ${id}`;
    video.poster = variants[id].poster;
    $('status').textContent = `Loading ${id}…`;
    history.replaceState(null, '', `#${id}`);
    try {
      // Fetch once into a Blob so seeking also works through the private Site proxy.
      if (!cached.has(id)) cached.set(id, fetch(variants[id].file).then(response => {
        if (!response.ok) throw new Error(`Video request failed (${response.status})`);
        return response.blob();
      }).then(blob => URL.createObjectURL(blob)).catch(error => { cached.delete(id); throw error; }));
      const url = await cached.get(id);
      if (mine !== request) return;
      video.onloadedmetadata = () => {
        if (mine !== request) return;
        ready = true;
        video.currentTime = Math.max(0, Math.min(desiredTime, video.duration - 1/30));
        $('play').disabled = $('seek').disabled = false;
        $('seek').max = video.duration;
        timeDisplay();
        play();
      };
      video.src = url;
      video.load();
    } catch (error) {
      if (mine === request) $('status').textContent = `${error.message}. Reload this page to retry.`;
    }
  }
  function setScope(next) {
    scope = next;
    $('section').setAttribute('aria-pressed', String(scope === 'section'));
    $('grid').setAttribute('aria-pressed', String(scope === 'grid'));
    $('full').setAttribute('aria-pressed', String(scope === 'full'));
    desiredTime = scopeStart();
    if (ready) { video.currentTime = desiredTime; play(); }
    timeDisplay();
  }
  Object.keys(variants).forEach(id => $(id).addEventListener('click', () => select(id)));
  $('section').addEventListener('click', () => setScope('section'));
  $('grid').addEventListener('click', () => setScope('grid'));
  $('full').addEventListener('click', () => setScope('full'));
  $('play').addEventListener('click', () => video.paused ? play() : video.pause());
  $('seek').addEventListener('input', () => { desiredTime = Number($('seek').value); video.currentTime = desiredTime; timeDisplay(); });
  video.addEventListener('timeupdate', timeDisplay);
  video.addEventListener('play', () => { $('play').textContent = 'Pause'; });
  video.addEventListener('pause', () => { $('play').textContent = 'Play'; });
  video.addEventListener('ended', () => { video.currentTime = scopeStart(); play(); });
  video.addEventListener('error', () => { $('status').textContent = 'The video could not load. Try reloading, or use the download link.'; });
  window.addEventListener('pagehide', () => { video.pause(); });
  const requested = location.hash.slice(1);
  select(Object.hasOwn(variants, requested) ? requested : 'v0b');
})();
