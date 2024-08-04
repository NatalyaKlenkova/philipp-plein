document.addEventListener('DOMContentLoaded', function () {
    // Swipers Init
    var vipSwiper = new Swiper(".vip__swiper .swiper", {
        autoplay: {
            delay: 3000,
        },
        spaceBetween: 20,
        slidesPerScroll: 1,
        slidesPerView: 3,
        loop: true,
        breakpoints: {
            1601: {
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            769: {
                slidesPerView: 2,
                spaceBetween: 16
            },
            320: {
                slidesPerView: 1.2,
                spaceBetween: 8
            }
        }
    });

    var clothingSwiper = new Swiper(".clothing__swiper .swiper", {
        pagination: {
            el: '.clothing__pagination',
            type: "bullets",
            clickable: true,
        },
        slidesPerScroll: 1,
        slidesPerView: 1,
        loop: true
    });


    // Only mobile swipers
    function generateMobileSwipers() {
        const mobileSwipers = document.querySelectorAll('.mobile-swiper');
        for (let i = 0; i < mobileSwipers.length; i++) {
            let swiperClass = `mobile-swiper-${i}`;
            mobileSwipers[i].classList.add(swiperClass); 
            
            if (window.screen.availWidth < 769 || window.innerWidth < 769) {
                var mobile = new Swiper(`.${swiperClass} .swiper`, {
                    slidesPerScroll: 1,
                    slidesPerView: 1.2,
                    spaceBetween: 8
                });
            }
        }
    }
    'load resize'.split(' ').forEach(function(e){
      window.addEventListener(e, generateMobileSwipers);
    });


    // Content Toggler
    const navTabs = document.querySelectorAll('.navigation__tab');
    const tabContentItems = document.querySelectorAll('.tab-content');

    navTabs.forEach(navTab => {
        navTab.onclick = () => {
            navTabs.forEach(elem => {
                elem.classList.remove('navigation__tab--active');
            })

            let target = navTab.dataset.tabname;
            navTab.classList.add('navigation__tab--active');

            tabContentItems.forEach(tabContentItem => {
                tabContentItem.dataset.tabcontent === target ? 
                tabContentItem.classList.add('tab-content--active') : 
                tabContentItem.classList.remove('tab-content--active');
            })
        }
    })

    // Looks Marks
    const markBtns = document.querySelectorAll('.mark__btn');
    const markPopups = Array.prototype.slice.call(document.querySelectorAll('.mark__popup'));

    markBtns.forEach(markBtn => {
        markBtn.onclick = (e) => {
            e.stopPropagation();
            markBtn.closest('.mark').querySelector('.mark__popup').classList.toggle('active');
        }
    })
    document.addEventListener('click', (e) => {
        const withinBoundaries = markPopups.some(markPopup => e.composedPath().includes(markPopup));

        if (!withinBoundaries) {
            document.querySelectorAll('.mark__popup').forEach(markPopup => {
                markPopup.classList.remove('active');
            })
        }
    })
})

