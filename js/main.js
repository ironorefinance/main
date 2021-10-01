(function(document, $) {
    document.addEventListener("DOMContentLoaded", function(event) {
        var timeEnd = new Date("2021-11-30").setHours(0, 0, 0, 0);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        var initDate = new Date(timeEnd);
        var countDownDate = initDate.getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (days < 10 && days >= 0)
                days = `0${days}`;
            if (hours < 10 && hours >= 0)
                hours = `0${hours}`;
            if (minutes < 10 && minutes >= 0)
                minutes = `0${minutes}`;
            if (seconds < 10 && seconds >= 0)
                seconds = `0${seconds}`;
            document.getElementById('days').innerText = days;
            document.getElementById('hours').innerText = hours;
            document.getElementById('minutes').innerText = minutes;
            document.getElementById('seconds').innerText = seconds;
            if (distance < 0) {
                clearInterval(x);
            }
        }, 1000);
        document.getElementById('timeEnd').innerText = initDate.toDateString();
    });

    $(function() {
        const nav = document.querySelector('#nav');
        const menu = document.querySelector('#menu');
        const menuToggle = document.querySelector('.nav__toggle');
        const links = menu.querySelectorAll('.nav__link');
        let isMenuOpen = false;


        // TOGGLE MENU ACTIVE STATE
        menuToggle.addEventListener('click', e => {
            e.preventDefault();
            isMenuOpen = !isMenuOpen;

            // toggle a11y attributes and active class
            menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
            menu.hidden = !isMenuOpen;
            nav.classList.toggle('nav--open');
        });
        links.forEach(item => {
            item.addEventListener("click", function() {
                nav.classList.remove('nav--open');
                isMenuOpen = false;
                // toggle a11y attributes and active class
                menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
                menu.hidden = !isMenuOpen;
            });
        });

        // TRAP TAB INSIDE NAV WHEN OPEN
        nav.addEventListener('keydown', e => {
            // abort if menu isn't open or modifier keys are pressed
            if (!isMenuOpen || e.ctrlKey || e.metaKey || e.altKey) {
                return;
            }

            // listen for tab press and move focus
            // if we're on either end of the navigation
            const menuLinks = menu.querySelectorAll('.nav__link');
            if (e.keyCode === 9) {
                if (e.shiftKey) {
                    if (document.activeElement === menuLinks[0]) {
                        menuToggle.focus();
                        e.preventDefault();
                    }
                } else if (document.activeElement === menuToggle) {
                    menuLinks[0].focus();
                    e.preventDefault();
                }
            }
        });
    });

})(document, $);