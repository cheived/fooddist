function timer() {
    const date = new Date()
    const deadLine = `${date.getFullYear()}-${date.getMonth() + 3}-${date.getDay()}`;

    function DateCalculating(end) {
        const date = Date.parse(end) - Date.parse(new Date()),
            day = Math.floor(date / (1000 * 60 * 60 * 24)),
            hour = Math.floor(date / (1000 * 60 * 60) % 24),
            minute = Math.floor(date / (1000 * 60) % 60),
            second = Math.floor(date / 1000 % 60);

        return {
            date: date,
            day: day,
            hour: hour,
            minute: minute,
            second: second
        }
    }

    function plusZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function insertCountdown(result) {
        const days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds');

        if (result.date <= 0) {
            days.innerHTML = '00';
            hours.innerHTML = '00';
            minutes.innerHTML = '00';
            seconds.innerHTML = '00';
        } else {
            days.innerHTML = plusZero(result.day);
            hours.innerHTML = plusZero(result.hour);
            minutes.innerHTML = plusZero(result.minute);
            seconds.innerHTML = plusZero(result.second);
        }
    }
    insertCountdown(DateCalculating(deadLine));
    const interval = setInterval(function () {
        stopCounting(DateCalculating);
        insertCountdown(DateCalculating(deadLine));
    }, 1000);

    function stopCounting(result) {
        if (result.date <= 0) {
            clearInterval(interval);
        }
    }
}

export default timer;
