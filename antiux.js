(function () {
    const qs = new URLSearchParams(location.search);

    function popup(cls, html, x, y) {
        const el = document.createElement("div");
        el.className = cls;
        el.innerHTML = html;
        if (typeof x === "number") el.style.left = x + "px";
        if (typeof y === "number") el.style.top = y + "px";
        document.body.appendChild(el);
        return el;
    }

    window.antiUX = {
        cookies() {
            const desenhar = () => {
                if (document.querySelector(".popup-cookie")) return;
                const box = popup(
                    "popup-cookie popup-cookie",
                    `<strong>🍪 COOKIES OBRIGATÓRIOS (lei 9¾)</strong>
                    <p>Aceitar é recusar. Recusar é aceitar. Fechar instala 47 cookies de terceiros.</p>
                    <p><label><input type="checkbox" id="ck-nao" checked> Não aceito, portanto aceito.</label></p>
                    <button type="button" id="ck-ok">Recusar</button>
                    <button type="button" id="ck-no">Aceitar</button>
                    <button type="button" id="ck-mais">Gerenciar preferências</button>`,
                );
                const ok = box.querySelector("#ck-ok");
                const no = box.querySelector("#ck-no");
                const mais = box.querySelector("#ck-mais");
                ok.onclick = () => {
                    document.cookie = "consentimento=recusou_mas_aceitou; max-age=31536000; path=/";
                    box.remove();
                    alert("Preferência salva como ACEITO.");
                };
                no.onclick = () => {
                    box.style.transform = "scale(1.4) rotate(8deg)";
                    alert("Para recusar, aceite primeiro.");
                };
                mais.onclick = () => {
                    location.href = "termos.html?voltar=" + encodeURIComponent(location.pathname);
                };
            };
            desenhar();
            setInterval(desenhar, 7000);
        },

        java() {
            popup(
                "popup-java",
                `<b>⚠ Java 7 Update 51</b>
                <p>Este portal só funciona no Internet Explorer 6 com Java.</p>
                <button type="button" id="java-sim">Atualizar agora</button>
                <button type="button" id="java-nao">Mais tarde (obrigatório)</button>`,
            );
            document.getElementById("java-sim").onclick = () => {
                alert("Download cancelado pelo antivírus imaginário. Tente no painel.");
            };
            document.getElementById("java-nao").onclick = () => {
                document.querySelector(".popup-java").style.top =
                    Math.random() * 70 + 5 + "%";
                document.querySelector(".popup-java").style.left =
                    Math.random() * 60 + 5 + "%";
            };
        },

        foge(selector) {
            document.querySelectorAll(selector).forEach((btn) => {
                btn.classList.add("btn-foge");
                btn.addEventListener("mouseenter", () => {
                    if (Math.random() < 0.72) {
                        btn.style.transform =
                            "translate(" +
                            (Math.random() * 220 - 110) +
                            "px," +
                            (Math.random() * 160 - 80) +
                            "px)";
                    }
                });
            });
        },

        chance(selector, destino, taxa = 0.45) {
            document.querySelectorAll(selector).forEach((el) => {
                el.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    if (Math.random() < taxa) {
                        location.href = destino;
                    } else {
                        alert("ERRO 200: sucesso recusado. Tente o outro botão, ou este de novo.");
                    }
                });
            });
        },

        loading(ms, depois) {
            let bar = document.getElementById("loading-antiux");
            if (!bar) {
                bar = document.createElement("div");
                bar.id = "loading-antiux";
                bar.className = "loading";
                bar.innerHTML = '<div>CARREGANDO <span id="pct">0</span>%<div class="barra-progresso" id="bp"></div></div>';
                document.body.appendChild(bar);
            }
            bar.style.display = "flex";
            let p = 0;
            const t = setInterval(() => {
                p += Math.random() * 11;
                if (p > 99) p = 97;
                document.getElementById("pct").textContent = Math.floor(p);
                document.getElementById("bp").style.width = p + "%";
            }, 180);
            setTimeout(() => {
                clearInterval(t);
                document.getElementById("pct").textContent = "99";
                setTimeout(() => {
                    bar.style.display = "none";
                    depois();
                }, 900);
            }, ms);
        },

        sessao(segundos) {
            const el = document.createElement("div");
            el.className = "contador";
            el.title = "Sessão";
            document.body.appendChild(el);
            let s = segundos;
            const iv = setInterval(() => {
                s -= 1;
                el.textContent = "EXPIRA: " + s + "s";
                if (s <= 0) {
                    clearInterval(iv);
                    alert("Sessão expirada por inatividade (você mexeu o mouse).");
                    location.href = "index.html?timeout=1";
                }
            }, 1000);
        },

        confirma(n, ok) {
            let i = 0;
            const passo = () => {
                i += 1;
                const msg =
                    i % 2 === 0
                        ? "Tem certeza que deseja CANCELAR?"
                        : "Confirma que NÃO quer continuar?";
                if (confirm(msg)) {
                    if (i >= n) ok();
                    else passo();
                } else {
                    if (i >= n) ok();
                    else passo();
                }
            };
            passo();
        },

        invertClick() {
            document.addEventListener(
                "click",
                (e) => {
                    if (e.target.closest("a,button,input,label,select,textarea")) return;
                    if (Math.random() < 0.08) {
                        e.preventDefault();
                        history.back();
                    }
                },
                true,
            );
        },
    };

    if (!qs.get("semcookie")) {
        window.addEventListener("DOMContentLoaded", () => {
            antiUX.cookies();
            antiUX.java();
            antiUX.invertClick();
        });
    }
})();
