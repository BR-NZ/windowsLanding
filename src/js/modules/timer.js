const timer = (selector, deadline) => {
    const addZero = (num) => {
        return (num <= 9) ? `0${num}` : num;
    };
    const getTimeRemaining = (endtime) =>  {
        const dTime = Date.parse(endtime) - Date.now(); // остаток времени в миллисекундах
        const s = Math.floor((dTime / 1000) % 60);
        const m = Math.floor((dTime / 1000 / 60) % 60);
        const h = Math.floor((dTime / 1000 / 60 / 60) % 24);
        const d = Math.floor((dTime / 1000 / 60 / 60 / 24));

        return {
            total: dTime,
            d: d,
            s: s,
            m: m,
            h: h
        };
    };
    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector);
        const days = document.querySelector('#days');
        const hours = document.querySelector('#hours');
        const minutes = document.querySelector('#minutes');
        const seconds = document.querySelector('#seconds');

        const updateClock = () => {
            const t = getTimeRemaining(endtime);

            days.textContent = addZero(t.d);
            hours.textContent = addZero(t.h);
            minutes.textContent  = addZero(t.m);
            seconds.textContent = addZero(t.s);

            if(t.total <= 0) {
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent  = '00';
                seconds.textContent = '00';
            }
        };

        updateClock();

        const intervalID = setInterval(updateClock, 1000);
    };

    setClock(selector, deadline);
};

export default timer;