/* ============================================
   HEADER — MUDA DE COR AO ROLAR A PÁGINA
   ============================================ */

const header = document.querySelector('header');
const logo = document.querySelector('.logo img');
let headerEstaComScroll = false;

window.addEventListener('scroll', function () {
    if (window.scrollY > 2 && !headerEstaComScroll) {
        header.classList.add('scrolled');
        logo.src = 'images/logo preta.png';
        headerEstaComScroll = true;
    } else if (window.scrollY <= 2 && headerEstaComScroll) {
        header.classList.remove('scrolled');
        logo.src = 'images/Logo Drica_s fundo branco3.png'
        headerEstaComScroll = false;
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
            slideAtivo.querySelectorAll('.hero-tags span').forEach(function (tag) {
                tag.classList.add('animar');
            });
        }, 250);
    }, 80);

    // Garante que, mesmo se o Swiper já tiver avançado de slide, os elementos fiquem visíveis
    setTimeout(function () {
        document.querySelectorAll('.hero-swiper .hero-content h1, .hero-swiper .hero-content p, .hero-swiper .hero-tags span').forEach(function (item) {
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

const itensGaleria = document.querySelectorAll('.galeria-item');

const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
        }
    });
}, { threshold: 0.15 });

itensGaleria.forEach(function (item) {
    observador.observe(item);
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