document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicializa os Swipers Horizontais (Subtópicos) PRIMEIRO
    const swiperH = new Swiper('.swiper-h', {
        direction: 'horizontal',
        nested: true, // Permite funcionar dentro do Vertical
        keyboard: { enabled: true },
        spaceBetween: 0,
        pagination: {
            el: '.swiper-pagination-h',
            clickable: true,
        },
    });

    // 2. Inicializa o Swiper Vertical (Tópicos Principais)
    const swiperV = new Swiper('.swiper-v', {
        direction: 'vertical',
        keyboard: { enabled: true },
        mousewheel: {
            forceToAxis: true, // Só rola o vertical se usar a roda do mouse p/ cima/baixo
        },
        speed: 600,
        spaceBetween: 0,
        pagination: {
            el: '.swiper-pagination-v',
            clickable: true,
        },
    });

    // 3. A REGRA DE OURO: Resetar para a capa ao mudar de tópico vertical
    swiperV.on('slideChange', function () {
        // Para cada carrossel horizontal, volta para o slide 0 (Capa) instantaneamente (speed 0)
        if (Array.isArray(swiperH)) {
            swiperH.forEach(swiper => swiper.slideTo(0, 0));
        } else {
            swiperH.slideTo(0, 0);
        }
    });

    // Navegar para Tópico Principal (Vertical) a partir do Menu
    window.goToTopic = function(index) {
        swiperV.slideTo(index);
        const menu = document.querySelector('.navbar-menu');
        if (menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    };

    // Navegar para Tópico > Subtópico (Usado pelos baldes da capa)
    window.goToSubtopic = function(vIndex, hIndex) {
        swiperV.slideTo(vIndex, 0); // Vai para o vertical instantaneamente
        
        // Vai para o horizontal especificado
        setTimeout(() => {
            if (Array.isArray(swiperH)) {
                swiperH[vIndex].slideTo(hIndex);
            } else {
                swiperH.slideTo(hIndex);
            }
        }, 50);
    };

    // Menu Mobile
    window.toggleMobileMenu = function() {
        const menu = document.querySelector('.navbar-menu');
        menu.classList.toggle('active');
    };

    // Caixa de texto mobile
    const introBox = document.querySelector('.floating-intro');
    if (introBox) {
        introBox.addEventListener('click', function(e) {
            e.stopPropagation(); 
            this.classList.toggle('expanded');
        });
    }

    // Modal de Citação
    const citationsData = {
        'vieira2016': 'VIEIRA, B. B.; PEREIRA, E. L. Potencial dos probióticos para o uso na aquicultura. Revista da Universidade Vale do Rio Verde, Três Corações, v. 14, n. 2, p. 1223-1241, 2016.',
        'souza2022': 'SOUZA, F. R.; FERREIRA, M. A.; EVANGELISTA-BARRETO, N. S. Aplicação de micro-organismos e algas como probióticos, prebióticos e simbióticos na aquicultura. In: OPEN SCIENCE RESEARCH IV. Guarujá, 2022.',
        'acunha2023': 'ACUNHA, R. M. G. et al. O uso de imunomoduladores na alimentação de peixes: uma revisão. Research, Society and Development, v. 12, n. 4, 2023.',
        'cornelio2023': 'CORNÉLIO, J. P. S.; CORNÉLIO, K. C. S. A influência do uso de probióticos no desempenho e saúde de peixes nativos: uma revisão narrativa. Revista Ibero-Americana, 2023.',
        'oliveira2024': 'OLIVEIRA et al. (2024). Estudo sobre o Dourado (Salminus brasiliensis) utilizando Lactobacillus rhamnosus, paraprobiotico e combinação.'
    };

    const modal = document.getElementById('citeModal');
    const modalText = document.getElementById('modalText');

    window.openCitation = function(refKey) {
        if(citationsData[refKey]) {
            modalText.innerHTML = citationsData[refKey];
            modal.classList.add('active');
        }
    };

    window.closeCitation = function(event) {
        if (!event || event.target.id === 'citeModal' || event.target.className === 'modal-close' || !event.target) {
            modal.classList.remove('active');
        }
    };
});