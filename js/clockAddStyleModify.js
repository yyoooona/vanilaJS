function clockWork(){

    // Jenny Modify jquery -> vanilaJS
    // Cache some selectors

    let clock = document.querySelector('#clock'),
    alarm = clock.querySelector('.alarm'),
    ampm = clock.querySelector('.ampm');

    // Map digits to their names (this will be an array)
    let digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');

    // This object will hold the digit elements
    let digits = {};

    // Positions for the hours, minutes, and seconds
    let positions = [
    'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
    ];

    // Generate the digits with the needed markup,
    // and add them to the clock

    let digit_holder = clock.querySelector('.digits');

    
    for (let position of positions){
        if(position == ':'){
            const digitTag = document.createElement('div');
            digitTag.classList.add("dots");
            digit_holder.appendChild(digitTag);
        }
        else{

            let pos = document.createElement('div');
            
            pos.classList.add(position);

            for(let i=1; i<8; i++){
                const className = 'd'+i;
                const tagName = document.createElement('span');
                tagName.classList.add(className);
                pos.appendChild(tagName);
            }

            // Set the digits as key:value pairs in the digits object
            digits[position] = pos;
            // Add the digit elements to the page
            digit_holder.append(pos);
        }

    }   

    // Add the weekday names

    let weekday_names = 'MON TUE WED THU FRI SAT SUN'.split(' '),
    weekday_holder = clock.querySelector('.weekdays');

    for (let weekday of weekday_names){
        const weekdayTag = document.createElement('span');
        weekdayTag.innerHTML = weekday;
        weekday_holder.appendChild(weekdayTag);
    }

    /*  $.each(weekday_names, function(){
        weekday_holder.append('<span>' + this + '</span>');
    });
    */

    let weekdays = clock.querySelectorAll('.weekdays span');
    let arrayWeekdays = Array.prototype.slice.call(weekdays);
    // console.log(weekdays);
    // Run a timer every second and update the clock

    function update_time(){

        // Use moment.js to output the current time as a string
        // hh is for the hours in 12-hour format,
        // mm - minutes, ss-seconds (all with leading zeroes),
        // d is for day of week and A is for AM/PM

        let now = moment().format("hhmmssdA");

        const digitsChild = document.querySelector('.digits').childNodes;
        let digitsCount = 0;

        for(let i=0; i<digitsChild.length; i++){
            if(digitsChild[i].getAttribute('class')!=='dots'){
                digitsChild[i].setAttribute('class', digit_to_name[now[digitsCount++]]);
            }
        }        

        // The library returns Sunday as the first day of the week.
        // Stupid, I know. Lets shift all the days one position down, 
        // and make Sunday last

        let dow = now[6];
        dow--;

        // Sunday!
        if(dow < 0){
            // Make it last
            dow = 6;
        }

        // Mark the active day of the week
        // weekdays.removeClass('active').eq(dow).addClass('active');
        for(let i=0; i<weekdays.length; i++){
            weekdays[i].classList.remove('active');
        }
        // weekdays.eq(dow).addClass('active');
        // console.log(weekdays);
        weekdays[dow].classList.add('active');

        // Set the am/pm text:
        ampm.innerText = now[7]+now[8];

        // Schedule this function to be run again in 1 sec
        setTimeout(update_time, 1000);

    }

    update_time();

    // Switch the theme

    /*$('a.button').click(function(){
        clock.toggleClass('light dark');
    });*/

}

function init(){
    clockWork();
}

init();