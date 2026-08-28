/* JINGE - 页面逻辑 */
(function () {
  "use strict";
  var D = window.JINGE_DATA;
  var $ = function (s, p) { return (p || document).querySelector(s); };
  var $$ = function (s, p) { return Array.prototype.slice.call((p || document).querySelectorAll(s)); };

  var img = function (file) {
    return "images/" + file + ".jpg";
  };

  /* ========== 视图切换 ========== */
  var views = { home: $("#view-home"), works: $("#view-works"), me: $("#view-me") };
  var subsheet = $("#subsheet");
  var gridBuilt = false;

  function showView(name) {
	if (name === "works" && !gridBuilt) {
	  buildGrid();
	  gridBuilt = true;
	}
    $$(".view").forEach(function (v) { v.classList.remove("active"); });
    views[name].classList.add("active");
    syncTabs(name);
    window.scrollTo(0, 0);
  }

  /* ========== 底部导航 ========== */
  var tabs = $$(".tab");
  function syncTabs(name) {
    tabs.forEach(function (t) { t.classList.toggle("active", t.getAttribute("data-tab") === name); });
  }
  tabs.forEach(function (t) {
    t.addEventListener("click", function () { showView(t.getAttribute("data-tab")); });
  });

  /* ========== 轮播 ========== */
  var heroTrack = $("#heroTrack");
  var heroDots = $("#heroDots");
  var heroIndex = 0, heroTimer = null;

  function buildHero() {
    heroTrack.innerHTML = "";
    heroDots.innerHTML = "";
    D.hero.forEach(function (f, index) {
      var s = document.createElement("div");
      s.className = "hero-slide";
      var im = document.createElement("img");
      im.src = img(f);
      im.alt = f;
      im.loading = index === 0 ? "eager" : "lazy";
      im.decoding = "async";
      if (index === 0) im.fetchPriority = "high";
      s.appendChild(im);
      heroTrack.appendChild(s);

      var dot = document.createElement("i");
      dot.className = "dot";
      heroDots.appendChild(dot);
    });
    setHero(0);
  }

  function setHero(i) {
    heroIndex = (i + D.hero.length) % D.hero.length;
    heroTrack.style.transform = "translateX(-" + heroIndex * 100 + "%)";
    $$(".dot", heroDots).forEach(function (d, k) { d.classList.toggle("on", k === heroIndex); });
  }

  function startHero() {
    stopHero();
    heroTimer = setInterval(function () { setHero(heroIndex + 1); }, 4000);
  }
  function stopHero() { if (heroTimer) { clearInterval(heroTimer); heroTimer = null; } }

  $("#heroPrev").addEventListener("click", function () { setHero(heroIndex - 1); startHero(); });
  $("#heroNext").addEventListener("click", function () { setHero(heroIndex + 1); startHero(); });

  /* 触摸/拖拽滑动 */
  var touchX = null;
  var hero = $("#hero");
  hero.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; stopHero(); }, { passive: true });
  hero.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { setHero(heroIndex + (dx < 0 ? 1 : -1)); }
    touchX = null; startHero();
  }, { passive: true });

  /* ========== 精选作品条 ========== */
  function buildFeat() {
    var feat = $("#featStrip");
    feat.innerHTML = "";
    // 拿分类为 婚纱/古风 的前几款 + 一些私房,凑一组有代表性的
    var pick = D.works.slice(0, 10);
    pick.forEach(function (w) {
      var a = document.createElement("a");
      a.className = "strip-card";
      a.href = "#";
      a.innerHTML = '<img src="' + img(w.file) + '" alt="' + w.title + '" loading="lazy"/>' +
        '<div class="cap">' + w.title + "</div>";
      a.addEventListener("click", function (e) { e.preventDefault(); openLightbox(w); });
      feat.appendChild(a);
    });
  }

  /* ========== 作品网格 + 筛选 ========== */
  var currentCat = "全部";
  function buildChips() {
    var wrap = $("#chips");
    wrap.innerHTML = "";
    D.cats.forEach(function (c) {
      var b = document.createElement("button");
      b.className = "chip" + (c === currentCat ? " on" : "");
      b.textContent = c;
      b.addEventListener("click", function () { currentCat = c; buildChips(); buildGrid(); });
      wrap.appendChild(b);
    });
  }

  function buildGrid() {
    var grid = $("#grid");
    grid.innerHTML = "";
    var list = currentCat === "全部" ? D.works : D.works.filter(function (w) { return w.cat === currentCat; });
    if (!list.length) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#9a9284;padding:40px 0;font-size:14px;">该分类暂无作品</div>';
      return;
    }
    list.forEach(function (w) {
      var c = document.createElement("div");
      c.className = "grid-card";
      c.innerHTML = '<img src="' + img(w.file) + '" alt="' + w.title + '" loading="lazy"/>' +
        '<div class="gcap">' + w.title + "</div>";
      c.addEventListener("click", function () { openLightbox(w); });
      grid.appendChild(c);
    });
  }

  /* ========== 大图 ========== */
  var lightbox = $("#lightbox");
  function openLightbox(w) {
    $("#lb-img").src = img(w.file);
    $("#lb-img").alt = w.title;
    $("#lb-cap").textContent = w.title;
    lightbox.hidden = false;
    stopHero();
  }
  $("#lb-close").addEventListener("click", function () { lightbox.hidden = true; });
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.hidden = true; });

  /* ========== 子页面(联系/故事/评价/搜索) ========== */
  function openSub(title, bodyHtml) {
    $("#subsheet-title").textContent = title;
    $("#subsheet-body").innerHTML = bodyHtml;
    subsheet.hidden = false;
    subsheet.scrollTop = 0;
  }
  $("#subsheet-back").addEventListener("click", function () { subsheet.hidden = true; });

  function pageContact() {
    var c = D.contact;
    openSub("联系", "" +
      '<div class="detail-block">' +
      '<div class="info-cards">' +
      '<div class="info-card"><span class="k">电话</span><span class="v">' + c.phone + "</span></div>" +
      '<div class="info-card"><span class="k">微信</span><span class="v">' + c.wechat + "</span></div>" +
      '<div class="info-card"><span class="k">地址</span><span class="v">' + c.address + "</span></div>" +
      "</div></div>");
  }

  function pageStory() {
    var html = '<div class="detail-block story-copy">';
    D.story.forEach(function (s) { html += "<p>" + s + "</p>"; });
    html += "<p>—— JINGE · 瞬间照相馆</p></div>";
    openSub("故事", html);
  }

  function pageReview() {
    var html = '<div class="detail-block"><div class="review-list">';
    D.reviews.forEach(function (r) {
      var stars = "";
      for (var i = 0; i < r.star; i++) stars += "★";
      html += '<div class="review-card">' +
        '<div class="review-head"><span class="review-name">' + r.dim + "风格</span><span class=\"stars\">" + stars + "</span></div>" +
        '<div class="review-text">' + r.text + "</div></div>";
    });
    html += "</div></div>";
    openSub("风格评价", html);
  }

  function pageSearch() {
    var checked = [];
    var html = '<div class="detail-block">' +
      '<div class="search-box"><input id="q" class="search-input" type="text" placeholder="搜索标题 / 编号 如 GYXZ"/></div>' +
      '<div class="grid" id="searchGrid"></div>' +
      "</div>";
    openSub("搜索", html);
    var q = $("#q");
    function run() {
      var s = q.value.trim().toLowerCase();
      var list = D.works.filter(function (w) {
        return !s || (w.file + w.title + w.cat).toLowerCase().indexOf(s) >= 0;
      });
      var g = $("#searchGrid");
      g.innerHTML = "";
      if (!list.length) { g.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#9a9284;padding:30px 0;font-size:14px;">没有找到匹配作品</div>'; return; }
      list.slice(0, 30).forEach(function (w) {
        var c = document.createElement("div");
        c.className = "grid-card";
        c.innerHTML = '<img src="' + img(w.file) + '" alt="' + w.title + '"/>';
        c.addEventListener("click", function () { openLightbox(w); });
        g.appendChild(c);
      });
    }
    q.addEventListener("input", run);
    q.focus();
  }

  /* ========== 入口绑定 ========== */
  // 菜单项与「我的」列表与「查看全部」
  $$("[data-page]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var p = el.getAttribute("data-page");
      if (p === "works") { showView("works"); }
      else if (p === "contact") { pageContact(); }
      else if (p === "story") { pageStory(); }
      else if (p === "review") { pageReview(); }
      else if (p === "home") { showView("home"); }
    });
  });

  $("#btn-search").addEventListener("click", pageSearch);

  /* ========== 初始化 ========== */
  buildHero();
  buildFeat();
  buildChips();
  startHero();
})();
