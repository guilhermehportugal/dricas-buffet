/* ============================================
   HEADER — MUDA DE COR AO ROLAR A PÁGINA
   ============================================ */

const header = document.querySelector('header');
const logo = document.querySelector('.logo img');
let headerEstaComScroll = false;

window.addEventListener('scroll', function () {
    if (window.scrollY > 2 && !headerEstaComScroll) {
        header.classList.add('scrolled');
        logo.src = 'images/logo_dricas_transparente.png';
        headerEstaComScroll = true;
    } else if (window.scrollY <= 2 && headerEstaComScroll) {
        header.classList.remove('scrolled');
        logo.src = 'images/logo_dricas_transparente.png'
        headerEstaComScroll = false;
    }
});

window.addEventListener('scroll', function () {
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
});


/* ============================================
   MENU MOBILE (HAMBÚRGUER)
   ============================================ */

// Seleciona o botão hambúrguer e o menu
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Ao clicar no botão, alterna a classe "active" no menu
menuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');               // abre/fecha o menu
    menuToggle.classList.toggle('active');             // anima o ícone (vira X)

    // atualiza o aria-expanded pra acessibilidade
    const aberto = navMenu.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', aberto);
});

// Fecha o menu automaticamente quando clica em um link
document.querySelectorAll('#nav-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', false);
    });
});


/* ============================================
   HERO — SWIPER (CARROSSEL DE SLIDES) E ANIMAÇÃO DE ENTRADA
   ============================================ */

const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 650,
    pagination: {
        el: '.hero-pagination',
        clickable: true
    },
});

// Anima o título, parágrafo e tags do slide inicial ao carregar a página
function animarHeroInicial() {
    const slideAtivo = document.querySelector('.hero-swiper .swiper-slide-active');

    if (!slideAtivo) {
        return;
    }

    setTimeout(function () {
        slideAtivo.querySelectorAll('.hero-content h1, .hero-content p').forEach(function (item) {
            item.classList.add('animar');
        });

        setTimeout(function () {
            slideAtivo.querySelectorAll('.hero-tags span, .hero-tags a').forEach(function (tag) {
                tag.classList.add('animar');
            });
        }, 250);
    }, 80);

    // Garante que, mesmo se o Swiper já tiver avançado de slide, os elementos fiquem visíveis
    setTimeout(function () {
        document.querySelectorAll('.hero-swiper .hero-content h1, .hero-swiper .hero-content p, .hero-swiper .hero-tags span, .hero-swiper .hero-tags a').forEach(function (item) {
            item.classList.add('animar');
        });
    }, 1600);
}

animarHeroInicial();


/* ============================================
   SOBRE — EFEITO PARALLAX NA FOTO
   ============================================ */

var image = document.getElementById('parallax-foto');
new simpleParallax(image, {
    scale: 1.3,
    delay: 0.6,
    transition: 'cubic-bezier(0,0,0,1)'
});


/* ============================================
   GALERIA — REVELAR IMAGENS AO ROLAR A PÁGINA
   ============================================ */

const itensRevelar = document.querySelectorAll('.galeria-item, .card');

const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
        }
    });
}, { threshold: 0.15 });

itensRevelar.forEach(function (item) {
    observador.observe(item);
});

const cardsServicos = document.querySelectorAll('#servicos .card');

window.addEventListener('scroll', function () {

    const centroTela = window.innerHeight / 2;

    cardsServicos.forEach(function (card) {

        const rect = card.getBoundingClientRect();

        const centroCard = rect.top + rect.height / 2;

        const distancia = Math.abs(centroTela - centroCard);

        if (distancia < rect.height / 2) {
            card.classList.add('card-ativo');
        } else {
            card.classList.remove('card-ativo');
        }

    });

});

// ===== LIGHTBOX DA GALERIA =====

// Pega todas as imagens da galeria e guarda os caminhos delas numa lista
const fotosGaleria = Array.from(document.querySelectorAll('.galeria-item img'));
const listaCaminhos = fotosGaleria.map(function (img) {
    return img.getAttribute('src');
});

// Elementos do lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImagem = document.getElementById('lightbox-imagem');
const btnFechar = document.getElementById('lightbox-fechar');
const btnAnterior = document.getElementById('lightbox-anterior');
const btnProxima = document.getElementById('lightbox-proxima');

let indiceAtual = 0; // guarda qual foto está sendo exibida no momento

// Função que abre o lightbox numa foto específica (pelo índice na lista)
function abrirLightbox(indice) {
    indiceAtual = indice;
    lightboxImagem.src = listaCaminhos[indiceAtual];
    lightbox.classList.add('ativo');
    document.body.style.overflow = 'hidden'
}

// Função que fecha o lightbox
function fecharLightbox() {
    lightbox.classList.remove('ativo');
    document.body.style.overflow = ''
}

// Função que avança para a próxima foto (volta pro início se chegar no fim)
function proximaFoto() {
    indiceAtual = (indiceAtual + 1) % listaCaminhos.length;
    lightboxImagem.src = listaCaminhos[indiceAtual];
}

// Função que volta para a foto anterior (vai pro fim se estiver no início)
function fotoAnterior() {
    indiceAtual = (indiceAtual - 1 + listaCaminhos.length) % listaCaminhos.length;
    lightboxImagem.src = listaCaminhos[indiceAtual];
}

// Ao clicar em qualquer foto da galeria, abre o lightbox nela
fotosGaleria.forEach(function (img, indice) {
    img.addEventListener('click', function () {
        abrirLightbox(indice);
    });
});

// Botões de fechar e navegar
btnFechar.addEventListener('click', fecharLightbox);
btnProxima.addEventListener('click', proximaFoto);
btnAnterior.addEventListener('click', fotoAnterior);

// Fecha o lightbox se clicar fora da imagem (no fundo escuro)
lightbox.addEventListener('click', function (evento) {
    if (evento.target === lightbox) {
        fecharLightbox();
    }
});

// Permite navegar com as setas do teclado e fechar com Esc
document.addEventListener('keydown', function (evento) {
    if (!lightbox.classList.contains('ativo')) return; // só funciona se o lightbox estiver aberto

    if (evento.key === 'Escape') fecharLightbox();
    if (evento.key === 'ArrowRight') proximaFoto();
    if (evento.key === 'ArrowLeft') fotoAnterior();
});


/* ============================================
   DEPOIMENTOS — SWIPER (CARROSSEL) E SETAS DE NAVEGAÇÃO
   ============================================ */

const carrosselDepoimentos = new Swiper('.carrossel-depoimentos', {
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 5500,
    },
    autoHeight: false,
    pagination: {
        el: '.paginacao-depoimentos',
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 24
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

// Conecta os botões de seta ao swiper manualmente
document.querySelector('.seta-anterior').addEventListener('click', function () {
    carrosselDepoimentos.slidePrev(); // volta um slide
});

document.querySelector('.seta-proxima').addEventListener('click', function () {
    carrosselDepoimentos.slideNext(); // avança um slide
});


/* ============================================
   BOTÃO WHATSAPP FLUTUANTE — TOOLTIP ANIMADO
   ============================================ */

window.addEventListener('load', function () {
    setTimeout(function () {
        var pontos = document.querySelector('.wpp-pontos');
        var texto = document.querySelector('.wpp-texto');

        setTimeout(function () {
            pontos.style.display = 'none';
            texto.style.display = 'inline';
        }, 800);
    }, 500);
});

/* ============================================
   WHATSAPP — ABRE/FECHA O MENU DE 2 NÚMEROS
   ============================================ */

const botaoWhatsapp = document.getElementById('whatsapp-toggle');
const opcoesWhatsapp = document.getElementById('wpp-opcoes');

if (botaoWhatsapp && opcoesWhatsapp) {
    botaoWhatsapp.addEventListener('click', function (evento) {
        // Impede que o clique nos links de dentro do menu também
        // acione esse toggle (senão o menu fecharia antes de navegar)
        if (evento.target.closest('a')) {
            return;
        }

        opcoesWhatsapp.classList.toggle('ativo');
    });

    // Fecha o menu se a pessoa clicar em qualquer lugar fora dele
    document.addEventListener('click', function (evento) {
        const cliqueForaDoBotao = !botaoWhatsapp.contains(evento.target);

        if (cliqueForaDoBotao) {
            opcoesWhatsapp.classList.remove('ativo');
        }
    });
}

let posicaoInicialX = 0;
let posicaoFinalX = 0;

lightbox.addEventListener('touchstart', function (evento) {
    posicaoInicialX = evento.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', function (evento) {
    posicaoFinalX = evento.changedTouches[0].screenX;
    detectarDirecaoSwipe();
});

function detectarDirecaoSwipe() {
    if (window.visualViewport && window.visualViewport.scale > 1.05) {
        return;
    }

    const distanciaMinima = 50;
    const diferenca = posicaoFinalX - posicaoInicialX;

    if (diferenca > distanciaMinima) {
        fotoAnterior();
    } else if (diferenca < -distanciaMinima) {
        proximaFoto();
    }
}

/* ============================================
   FORMULÁRIO — MÁSCARA DE TELEFONE
   ============================================ */

const campoTelefone = document.getElementById('telefone');

if (campoTelefone) {
    campoTelefone.addEventListener('input', function (evento) {
        let numeros = evento.target.value.replace(/\D/g, '');

        const ddd = numeros.slice(0, 2);
        const restante = numeros.slice(2);

        const ehCelular = restante.length > 0 && restante[0] === '9';

        // fixo tem 10 dígitos no total (DDD + 8), celular tem 11 (DDD + 9)
        numeros = numeros.slice(0, ehCelular ? 11 : 10);

        if (ehCelular) {
            if (numeros.length > 7) {
                numeros = numeros.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            } else if (numeros.length > 2) {
                numeros = numeros.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (numeros.length > 0) {
                numeros = numeros.replace(/^(\d*)/, '($1');
            }
        } else {
            if (numeros.length > 6) {
                numeros = numeros.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (numeros.length > 2) {
                numeros = numeros.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
            } else if (numeros.length > 0) {
                numeros = numeros.replace(/^(\d*)/, '($1');
            }
        }

        evento.target.value = numeros;
    });
}

const formOrcamento = document.querySelector('.form-orcamento');
const formSucesso = document.getElementById('form-sucesso');
const formErro = document.getElementById('form-erro');
const btnEnviar = formOrcamento ? formOrcamento.querySelector('.btn-form-enviar') : null;

const campoDataEvento = document.getElementById('data_evento');

if (campoDataEvento) {
    const dataAtual = new Date();
    const hoje = dataAtual.toISOString().split('T')[0];
    campoDataEvento.setAttribute('min', hoje);

    campoDataEvento.addEventListener('blur', function () {
        if (!campoDataEvento.value) return;

        const ano = campoDataEvento.value.split('-')[0];

        if (ano.length !== 4 || !campoDataEvento.checkValidity()) {
            campoDataEvento.value = '';
            formErro.textContent = 'Digite uma data válida.';
            formErro.style.display = 'block';
        }
    });
}

if (formOrcamento) {
    formOrcamento.addEventListener('submit', function (evento) {
        evento.preventDefault();

        formErro.style.display = 'none';

        const idsObrigatorios = ['nome', 'telefone', 'email', 'tipo_evento'];
        let temCampoVazio = false;
        const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/;

        idsObrigatorios.forEach(function (id) {
            const campo = document.getElementById(id);
            const spanErro = document.getElementById('erro-' + id);

            if (!campo.value.trim()) {
                spanErro.textContent = 'O campo é obrigatório.';
                campo.classList.add('campo-invalido');
                temCampoVazio = true;
            } else if (id === 'telefone' && !regexTelefone.test(campo.value.trim())) {
                spanErro.textContent = 'Telefone incompleto.';
                campo.classList.add('campo-invalido');
                temCampoVazio = true;
            } else {
                spanErro.textContent = '';
                campo.classList.remove('campo-invalido');
            }
        });

        if (temCampoVazio) {
            return;
        }

        if (campoDataEvento.value) {
            const ano = campoDataEvento.value.split('-')[0];

            if (ano.length !== 4 || !campoDataEvento.checkValidity()) {
                formErro.textContent = 'Digite uma data válida.';
                formErro.style.display = 'block';
                return;
            }
        }

        btnEnviar.disabled = true;
        btnEnviar.textContent = 'Enviando...';

        const dadosForm = new FormData(formOrcamento);

        fetch(formOrcamento.action, {
            method: 'POST',
            body: dadosForm,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    formOrcamento.style.display = 'none';
                    formSucesso.classList.add('ativo');
                } else {
                    throw new Error('Falha no envio');
                }
            })
            .catch(function () {
                formErro.textContent = 'Não foi possível enviar. Tente novamente ou fale pelo WhatsApp acima.';
                formErro.style.display = 'block';
                btnEnviar.disabled = false;
                btnEnviar.textContent = 'Enviar solicitação';
            });
    });
}

/* ============================================
                VIDEO FUMAÇA 
   ============================================ */

const videoFumaca = document.querySelector('.footer-video-fundo');

if (videoFumaca) {
    const tentativePlay = videoFumaca.play();

    if (tentativePlay !== undefined) {
        tentativePlay.catch(function () {
            videoFumaca.style.display = 'none';
        });
    }
}

/* ============================================
   CÓDIGO NÃO UTILIZADO ATUALMENTE
   (esta função existe mas não é chamada em nenhum lugar do código —
   provavelmente sobrou de uma seção de "números/estatísticas" que não
   está mais no HTML. Mantida aqui sem alteração, comentada e isolada,
   para não arriscar quebrar nada. Pode apagar com segurança se
   confirmar que não vai usar.)
   ============================================ */

// function iniciarContagem() {
//     const numeros = document.querySelectorAll('.numero');
//     numeros.forEach(numero => {
//         const target = parseInt(numero.dataset.target);
//         let count = 0;
//         const increment = target / 100;
//         const timer = setInterval(() => {
//             count += increment;
//             numero.textContent = Math.floor(count);
//             if (count >= target) {
//                 numero.textContent = target;
//                 clearInterval(timer);
//             }
//         }, 20);
//     });
// }