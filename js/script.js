document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.main-swiper', {
        direction: 'horizontal',
        keyboard: { enabled: true },
        mousewheel: false, 
        speed: 600, 
        spaceBetween: 0
    });

    // Função para abrir/fechar o menu no celular
    window.toggleMobileMenu = function() {
        const menu = document.querySelector('.navbar-menu');
        menu.classList.toggle('active');
    };

    // Navegar para o slide e fechar o menu (se estiver no celular)
    window.goToSlide = function(index) {
        swiper.slideTo(index);
        
        // Fecha o menu lateral no smartphone após o clique
        const menu = document.querySelector('.navbar-menu');
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    };

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