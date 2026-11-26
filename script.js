(function () {
    var $ = function (s) { return document.querySelector(s) };
    var EMAIL = "alperonoberto@gmail.com";
    function toast(m) { var t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toast.i); toast.i = setTimeout(function () { t.classList.remove("on") }, 2000) }
    function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v) } catch (e) { return null } }

    /* Tema */
    function isDark() { var a = document.documentElement.getAttribute("data-theme"); return a ? a === "dark" : matchMedia("(prefers-color-scheme: dark)").matches }
    var saved = store("theme"); if (saved) document.documentElement.setAttribute("data-theme", saved);
    function updateLogo() {
        var logo = $("#logo");
        if (logo) logo.setAttribute("src", isDark() ? "assets/logo_light.ico" : "assets/logo_dark.ico");
    }
    updateLogo();
    function setTheme(t) {
        document.documentElement.setAttribute("data-theme", t);
        store("theme", t);
        updateLogo();
    }
    $("#theme").addEventListener("click", function () { setTheme(isDark() ? "light" : "dark") });

    /* Navegación móvil */
    var menuButton = $("#menuToggle"), primaryNav = $("#primaryNav");
    function setMenuOpen(open) {
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
        primaryNav.classList.toggle("is-open", open);
    }
    menuButton.addEventListener("click", function () {
        setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
    });
    primaryNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () { setMenuOpen(false) });
    });
    document.addEventListener("click", function (event) {
        if (menuButton.getAttribute("aria-expanded") === "true" &&
            !menuButton.contains(event.target) &&
            !primaryNav.contains(event.target)) setMenuOpen(false);
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
            menuButton.focus();
        }
    });
    document.documentElement.classList.add("menu-ready");

    /* Habilidades */
    var S = [
        ["Python", "Desarrollo", "Automatización, parsing"], ["JavaScript", "Desarrollo", "Frontend y APIs"], ["TypeScript", "Desarrollo", "Angular"], ["C#/.NET", "Desarrollo", "MVC"], ["SQL", "Desarrollo", "Consultas y datos"], ["HTML5/CSS", "Desarrollo", "MTA HTML5"], ["Angular", "Desarrollo", "Prácticas"],
        ["Active Directory", "Sistemas", "Dominio y usuarios"], ["Windows Server 2022", "Sistemas", "Administración"], ["DHCP/DNS", "Sistemas", "Servicios de red"], ["VPN", "Sistemas", "Acceso remoto"], ["Bash", "Sistemas", "Scripting Linux"], ["Zabbix", "Sistemas", "Monitorización"],
        ["Pentesting", "Seguridad", "Laboratorios"], ["Enumeración", "Seguridad", "Superficie de exposición"], ["Wireshark", "Seguridad", "Análisis de tráfico"], ["FortiClient", "Seguridad", "Acceso seguro"], ["Linux/Windows", "Seguridad", "Entornos de prueba"]];
    var colors = { Desarrollo: "var(--accent)", Sistemas: "var(--signal)", Seguridad: "var(--ok)" };
    var cats = ["Todo", "Desarrollo", "Sistemas", "Seguridad"], cur = "Todo";
    function renderSkills() {
        $("#skills").innerHTML = "";
        S.forEach(function (s) {
            var d = document.createElement("div"); d.className = "sk"; d.style.setProperty("--c", colors[s[1]]);
            d.hidden = cur !== "Todo" && s[1] !== cur;
            var a = document.createElement("span"); a.textContent = s[0]; var b = document.createElement("small"); b.textContent = s[2];
            d.append(a, b); $("#skills").appendChild(d)
        });
        document.querySelectorAll(".tab").forEach(function (t) { t.setAttribute("aria-pressed", t.dataset.c === cur) });
    }
    cats.forEach(function (c) {
        var b = document.createElement("button"); b.className = "tab"; b.dataset.c = c; b.textContent = c;
        b.addEventListener("click", function () { cur = c; renderSkills() }); $("#tabs").appendChild(b)
    });
    renderSkills();

    /* Contacto */
    $("#copy").addEventListener("click", function () {
        var ok = function () { toast("Email copiado") }, ko = function () { toast("Cópialo a mano: " + EMAIL) };
        try { navigator.clipboard.writeText(EMAIL).then(ok, ko) } catch (e) { ko() }
    });

    $("#download-cv").addEventListener("click", function () {
        var link = document.createElement("a");
        link.href = "assets/CV_Alberto_Sanchez_Villalba.pdf";
        link.download = "CV_Alberto_Sanchez_Villalba.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    /* Juego */
    var H = ["DC01", "DNS", "DHCP", "VPN", "WEB", "DB", "FW", "ZBX", "SRV1", "SRV2", "NAS", "PC-01", "PC-02", "AP", "SW", "LOG"];
    var nodes = H.map(function (n) { var b = document.createElement("button"); b.className = "node"; b.textContent = n; b.type = "button"; b.setAttribute("aria-label", "Host " + n); b.disabled = true; $("#net").insertBefore(b, $("#over")); return { el: b, t: 0, life: 0 } });
    var run = false, score = 0, lives = 3, best = parseInt(store("best"), 10) || 0, loop, spawnAt = 0, clock = 0;
    $("#best").textContent = best;
    function hud() { $("#score").textContent = score; $("#lives").textContent = ("♥".repeat(lives) + "♡".repeat(3 - lives)) }
    function flash(n, c) { n.el.classList.add(c); setTimeout(function () { n.el.classList.remove(c) }, 250) }
    nodes.forEach(function (n) {
        n.el.addEventListener("click", function () {
            if (!run) return;
            if (n.t > 0) { n.t = 0; n.el.classList.remove("vuln"); flash(n, "ok"); score++; hud() }
            else { flash(n, "hit"); }
        })
    });
    function end() {
        run = false; clearInterval(loop); nodes.forEach(function (n) { n.t = 0; n.el.className = "node"; n.el.disabled = true });
        var nb = score > best; if (nb) { best = score; store("best", String(best)); $("#best").textContent = best }
        $("#overmsg").innerHTML = "<b>Red comprometida.</b><br>" + score + " parches" + (nb && score > 0 ? " · ¡nuevo récord!" : "");
        $("#start").textContent = "Jugar otra vez"; $("#over").hidden = false; $("#start").focus();
    }
    function tick() {
        clock += 100;
        var life = Math.max(1300, 2800 - score * 25);
        nodes.forEach(function (n) {
            if (n.t > 0) {
                n.t -= 100; n.el.style.setProperty("--p", Math.max(0, n.t / n.life * 100) + "%");
                if (n.t <= 0) { n.el.classList.remove("vuln"); flash(n, "hit"); lives--; hud() }
            }
        });
        if (lives <= 0) { end(); return }
        if (clock >= spawnAt) {
            var free = nodes.filter(function (n) { return n.t <= 0 });
            if (free.length) { var n = free[Math.floor(Math.random() * free.length)]; n.life = n.t = life; n.el.classList.add("vuln"); n.el.style.setProperty("--p", "100%") }
            spawnAt = clock + Math.max(380, 1000 - score * 12);
        }
    }
    $("#start").addEventListener("click", function () {
        score = 0; lives = 3; clock = 0; spawnAt = 300; hud(); run = true; $("#over").hidden = true;
        nodes.forEach(function (n) { n.el.disabled = false });
        clearInterval(loop); loop = setInterval(tick, 100);
    });
    hud();

    /* Terminal */
    var out = $("#out"), input = $("#cmd");
    var C = {
        help: function () { return ["Comandos disponibles:", "  whoami   quién soy", "  exp      experiencia", "  skills   habilidades", "  edu      formación", "  nmap     escanear este portfolio", "  contact  cómo contactar", "  theme    cambiar tema", "  clear    limpiar pantalla"] },
        whoami: function () { return ["Estudiante de Ingeniería Informática (UNED).", "Técnico de sistemas y redes, desarrollador Full Stack y perfil de ciberseguridad."] },
        exp: function () { return ["2026  Experiencia industrial (3 meses)", "2024–25  Técnico de Sistemas y Redes (12 meses)", "Prácticas  Desarrollador Full Stack (3 meses)"] },
        skills: function () { return cats.slice(1).map(function (c) { return c + ": " + S.filter(function (s) { return s[1] === c }).map(function (s) { return s[0] }).join(", ") }) },
        edu: function () { return ["Grado en Ingeniería Informática (UNED, en curso)", "Certificado de Profesionalidad en Ciberseguridad (+500 h)", "CFGS DAW · MTA HTML5 · Inglés B2 Cambridge"] },
        contact: function () { return ["Email: " + EMAIL, "Garantía Juvenil · Demandante de empleo · Vehículo propio"] },
        theme: function () { setTheme(isDark() ? "light" : "dark"); return ["Tema cambiado a " + (isDark() ? "oscuro" : "claro") + "."] },
        nmap: function () { return ["Escaneando portfolio.local ...", "22/tcp   open  bash", "53/tcp   open  dns", "80/tcp   open  html5-css", "389/tcp  open  active-directory", "443/tcp  open  typescript-angular", "1433/tcp open  sql", "5000/tcp open  csharp-dotnet", "10050/tcp open zabbix-agent", "Escaneo completado: 8 servicios abiertos. Ninguna vulnerabilidad crítica."] }
    };
    function print(t, cls) { var d = document.createElement("div"); if (cls) d.className = cls; d.textContent = t; out.appendChild(d); out.scrollTop = out.scrollHeight }
    function exec(raw) {
        var c = raw.trim().toLowerCase(); if (!c) return;
        print("$ " + raw, "cmd");
        if (c === "clear") { out.innerHTML = ""; return }
        if (C[c]) { C[c]().forEach(function (l) { print(l, c === "nmap" && /open/.test(l) ? "good" : "") }) }
        else print("comando no encontrado: " + c + ". Escribe help para ver la lista.", "dim");
    }
    $("#form").addEventListener("submit", function (e) { e.preventDefault(); exec(input.value); input.value = "" });
    ["help", "whoami", "exp", "skills", "nmap", "theme", "clear"].forEach(function (c) {
        var b = document.createElement("button"); b.type = "button"; b.textContent = c; b.addEventListener("click", function () { exec(c) }); $("#chips").appendChild(b)
    });
    print("Bienvenido. Escribe help o pulsa un comando.", "dim");
})();