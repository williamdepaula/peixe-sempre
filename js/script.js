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
        // 1. Vai para o tópico principal (vertical)
        swiperV.slideTo(index);
        
        // 2. Força o subtópico (horizontal) daquele índice a voltar para a capa (slide 0)
        setTimeout(() => {
            if (Array.isArray(swiperH)) {
                if (swiperH[index]) swiperH[index].slideTo(0, 400); // 400ms de animação suave
            } else {
                swiperH.slideTo(0, 400);
            }
        }, 50); // Um pequeno atraso garante que a animação ocorra sem travar o Swiper vertical

        // 3. Fecha o menu mobile se ele estiver aberto
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
        'oliveira2024': 'OLIVEIRA et al. (2024). Estudo sobre o Dourado (Salminus brasiliensis) utilizando Lactobacillus rhamnosus, paraprobiotico e combinação.',
        'veiga2020': 'VEIGA et al. (2020). Estudo em Surubim híbrido (Pseudoplatystoma sp.) avaliando o uso de Bacillus subtilis no desempenho e defesa.',
        'ziemniczak2025': 'ZIEMNICZAK et al. (2025). Adsorvente à base de probiótico para reduzir efeitos fisiológicos da aflatoxina B1 no Pacu (Piaractus mesopotamicus).'
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

   // =========================================
    // MODAL DE IMAGEM AMPLIADA COM ZOOM MANUAL
    // =========================================
    const imgModal = document.getElementById('imageModal');
    const modalExpandedImg = document.getElementById('modalExpandedImg');
    const scrollArea = document.getElementById('imageScrollArea');
    const zoomSlider = document.getElementById('zoomSlider');
    const btnZoomOut = document.getElementById('btnZoomOut');
    const btnZoomIn = document.getElementById('btnZoomIn');

    // Função global para abrir a imagem
    window.openImageModal = function(imgSrc) {
    if (!imgModal || !modalExpandedImg) return;

    modalExpandedImg.src = imgSrc;

    let initialZoom = window.innerWidth <= 768 ? 200 : 120;

    zoomSlider.value = initialZoom;
    modalExpandedImg.style.setProperty('--zoom-width', initialZoom + 'vw');

    imgModal.classList.add('active');

    setTimeout(() => {
        scrollArea.scrollLeft =
            (scrollArea.scrollWidth - scrollArea.clientWidth) / 2;

        scrollArea.scrollTop =
            (scrollArea.scrollHeight - scrollArea.clientHeight) / 2;
    }, 50);
};

    // Atualiza o tamanho em tempo real pela barra
    if (zoomSlider) {
    zoomSlider.addEventListener('input', function() {
        modalExpandedImg.style.setProperty(
            '--zoom-width',
            this.value + 'vw'
        );
    });
}

    // Lógica dos botões de Menos e Mais
    if (btnZoomOut && btnZoomIn && zoomSlider) {

    btnZoomOut.addEventListener('click', (e) => {
        e.stopPropagation();

        let newVal = parseInt(zoomSlider.value) - 25;

        if (newVal < parseInt(zoomSlider.min)) {
            newVal = parseInt(zoomSlider.min);
        }

        zoomSlider.value = newVal;

        modalExpandedImg.style.setProperty(
            '--zoom-width',
            newVal + 'vw'
        );
    });

    btnZoomIn.addEventListener('click', (e) => {
        e.stopPropagation();

        let newVal = parseInt(zoomSlider.value) + 25;

        if (newVal > parseInt(zoomSlider.max)) {
            newVal = parseInt(zoomSlider.max);
        }

        zoomSlider.value = newVal;

        modalExpandedImg.style.setProperty(
            '--zoom-width',
            newVal + 'vw'
        );
    });
}

    // =========================================
    // LÓGICA DE CLICAR E ARRASTAR (DESKTOP E TOUCH)
    // =========================================
    let isDragging = false;
    let startX, startY, scrollLeftPos, scrollTopPos;

    if (scrollArea) {
        // Função que inicia o arrasto
        const startDragging = (e) => {
            isDragging = true;
            scrollArea.classList.add('dragging');
            // Suporta mouse ou toque na tela
            const pageX = e.pageX || e.touches[0].pageX;
            const pageY = e.pageY || e.touches[0].pageY;
            
            startX = pageX - scrollArea.offsetLeft;
            startY = pageY - scrollArea.offsetTop;
            scrollLeftPos = scrollArea.scrollLeft;
            scrollTopPos = scrollArea.scrollTop;
        };

        // Função que para o arrasto
        const stopDragging = () => {
            isDragging = false;
            scrollArea.classList.remove('dragging');
        };

        // Função que executa o movimento do arrasto
        const handleDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Previne o comportamento padrão (scroll da página inteira ou zoom pinça default)
            
            const pageX = e.pageX || (e.touches && e.touches[0] ? e.touches[0].pageX : 0);
            const pageY = e.pageY || (e.touches && e.touches[0] ? e.touches[0].pageY : 0);
            
            const x = pageX - scrollArea.offsetLeft;
            const y = pageY - scrollArea.offsetTop;
            
            // O multiplicador "2" dita a velocidade em que a imagem se move junto com o mouse
            const walkX = (x - startX) * 2; 
            const walkY = (y - startY) * 2;
            
            scrollArea.scrollLeft = scrollLeftPos - walkX;
            scrollArea.scrollTop = scrollTopPos - walkY;
        };

        // Eventos de Mouse (PC)
        scrollArea.addEventListener('mousedown', startDragging);
        scrollArea.addEventListener('mouseleave', stopDragging);
        scrollArea.addEventListener('mouseup', stopDragging);
        scrollArea.addEventListener('mousemove', handleDrag);

        // Eventos de Toque (Celular - como alternativa ao scroll nativo)
        scrollArea.addEventListener('touchstart', startDragging, { passive: false });
        scrollArea.addEventListener('touchend', stopDragging);
        scrollArea.addEventListener('touchmove', handleDrag, { passive: false });
    }

    // =========================================
    // FECHAR MODAL
    // =========================================
    window.closeImageModal = function(event) {
        if (event && event.target.closest('.zoom-control-container')) return;
        
        if (!event || event.target.id === 'imageModal' || event.target.closest('.image-modal-close')) {
            imgModal.classList.remove('active');
        }
    };

    // Fechar modais ao pressionar a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            if (imgModal && imgModal.classList.contains('active')) {
                window.closeImageModal();
            }
            if (typeof modal !== 'undefined' && modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        }
    });
}); // Fim do DOMContentLoaded