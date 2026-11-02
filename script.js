// RailExploreIndia.in — static-site interactions. Account/upload/views require backend setup.
const activities = [{
  id: "nandankanan-12815",
  name: "12815 Puri – Anand Vihar Terminal Nandankanan Express",
  type: "Passenger",
  route: "ECR (as recorded in the supplied ACT file)",
  duration: "9h 30m (ACT duration field)",
  difficulty: "Not specified",
  size: "170 KB",
  icon: "🚆",
  file: "downloads/12815-Nandankanan-Express-OpenRails.zip",
  views: null,
  description: "Open Rails activity package supplied by the site owner. Includes the ACT, PATHS, SERVICES and TRF files."
}];

function card(a) {
  const viewLabel = a.views === null ? "Views: tracking not enabled yet" : `👁 ${a.views.toLocaleString()} views`;
  return `<article class="card">
    <div class="card-image" aria-hidden="true">${a.icon}</div>
    <div class="card-body">
      <h3>${escapeHTML(a.name)}</h3>
      <p>${escapeHTML(a.description)}</p>
      <div class="meta">📍 ${escapeHTML(a.route)}<br>◷ Duration: ${escapeHTML(a.duration)}<br>◉ Difficulty: ${escapeHTML(a.difficulty)}<br>👁 ${viewLabel}</div>
      <a class="download" href="${a.file}" download>⬇ Download activity package (${a.size})</a>
    </div>
  </article>`;
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function render(list, target) {
  const el = document.getElementById(target);
  if (!el) return;
  el.innerHTML = list.map(card).join("");
}
function filterActivities() {
  const q = [
    document.getElementById("heroSearch")?.value || "",
    document.getElementById("navSearch")?.value || "",
    document.getElementById("listSearch")?.value || ""
  ].join(" ").trim().toLowerCase();
  const cat = document.getElementById("categoryFilter")?.value || "";
  const dif = document.getElementById("difficultyFilter")?.value || "";
  const list = activities.filter(a =>
    (!q || [a.name,a.type,a.route,a.description].join(" ").toLowerCase().includes(q)) &&
    (!cat || a.type === cat) &&
    (!dif || a.difficulty === dif)
  );
  render(list, "allCards");
  const count = document.getElementById("resultCount");
  if (count) count.textContent = `${list.length} published ${list.length === 1 ? "activity" : "activities"}`;
  const side = document.getElementById("sideActivity");
  const empty = document.getElementById("sideEmpty");
  if (side) side.innerHTML = list.map(a => `<div class="side-activity"><div class="side-thumb">🚆</div><div class="side-info"><strong>${escapeHTML(a.name)}</strong><small>Passenger Activity · Views not yet tracked</small><a href="${a.file}" download>Download package</a></div></div>`).join("");
  if (empty) empty.classList.toggle("hidden", list.length > 0);
}
function setCategory(cat) {
  const filter = document.getElementById("categoryFilter");
  if (filter) filter.value = cat === "Route" ? "" : cat;
  document.getElementById("activities")?.scrollIntoView({behavior:"smooth"});
  filterActivities();
}
function openModal(html) {
  document.getElementById("modalBody").innerHTML = html;
  document.getElementById("modal").style.display = "flex";
}
function closeModal() { document.getElementById("modal").style.display = "none"; }
function showAccount(mode) {
  const title = mode === "login" ? "Login" : "Create your account";
  openModal(`<h2>${title}</h2>
    <p class="note">Account registration is not active yet. This GitHub Pages version is the website frontend; Supabase authentication must be connected before accounts can be created or used.</p>
    <label>Email<input type="email" placeholder="you@example.com" disabled></label>
    <label>Password<input type="password" placeholder="Password" disabled></label>
    <button class="primary" disabled>Coming after backend setup</button>`);
}
function showUpload() {
  openModal(`<h2>Upload an Open Rails Activity</h2>
    <p class="note">User uploads will be enabled after the secure storage and account backend is connected. Submitted files will stay pending until an admin approves them.</p>
    <label>Activity name<input disabled placeholder="Enter activity name"></label>
    <label>Route / description<textarea disabled placeholder="Describe your activity"></textarea></label>
    <label>Activity ZIP<input type="file" disabled></label>
    <button class="primary" disabled>Upload for admin approval</button>`);
}
function showGuide() {
  openModal(`<h2>Installing an Open Rails activity</h2>
    <ol><li>Download and extract the complete activity package.</li><li>Read the activity documentation, if supplied.</li><li>Install the required route, rolling stock, consists and other dependencies.</li><li>Place the ACT, PATHS, SERVICES and TRAFFIC files in their matching folders under the route's Open Rails/MSTS folder structure.</li><li>Open Open Rails and select the activity.</li></ol>
    <p class="note">Exact installation locations depend on your route and Open Rails installation. Check all required dependencies before running.</p>`);
}
function showCommunity() {
  openModal(`<h2>RailExploreIndia Community</h2><p>A community/forum destination has not been configured yet. This panel is a placeholder until an official community link is provided.</p>`);
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
render(activities, "featuredCards");
filterActivities();
