data = [
    {
      "title": "Work",
      "timeframes": {
        "daily": {
          "current": 5,
          "previous": 7
        },
        "weekly": {
          "current": 32,
          "previous": 36
        },
        "monthly": {
          "current": 103,
          "previous": 128
        }
      }
    },
    {
      "title": "Play",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 2
        },
        "weekly": {
          "current": 10,
          "previous": 8
        },
        "monthly": {
          "current": 23,
          "previous": 29
        }
      }
    },
    {
      "title": "Study",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 7
        },
        "monthly": {
          "current": 13,
          "previous": 19
        }
      }
    },
    {
      "title": "Exercise",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 5
        },
        "monthly": {
          "current": 11,
          "previous": 18
        }
      }
    },
    {
      "title": "Social",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 3
        },
        "weekly": {
          "current": 5,
          "previous": 10
        },
        "monthly": {
          "current": 21,
          "previous": 23
        }
      }
    },
    {
      "title": "Self Care",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 2,
          "previous": 2
        },
        "monthly": {
          "current": 7,
          "previous": 11
        }
      }
    }
];

let cards = document.querySelectorAll('div.card');
var timePeriods = document.getElementsByClassName('time-period');

for (let timePeriod of timePeriods){
    timePeriod.addEventListener('click', timePeriodClicked);
}

function timePeriodClicked() {
    let activeTimePeriod = document.querySelector('p.time-period.active');

    if (this.innerText != activeTimePeriod.innerText){
        this.classList.add('active')
        activeTimePeriod.classList.remove('active');

        let newTimeFrame = this.innerText.toLowerCase();

        // change the content to correct time period
        for (let i = 1; i < cards.length; i++){ // i = 1 because profile card is also selected
            let card = cards[i];
            let newCardData = data[i-1].timeframes[newTimeFrame];

            let cardHrs = card.getElementsByClassName('card-hrs')[0];
            let cardPrevHrs = card.getElementsByClassName('card-prev-hrs')[0];

            let newHrs = newCardData.current + 'hr';
            let newPrevHrs = newCardData.previous + 'hr';

            if (newCardData.current > 1) newHrs += 's';
            if (newCardData.previous > 1) newPrevHrs += 's';
            
            switch(newTimeFrame){
                case 'daily':
                    newPrevHrs = "Yesterday - " + newPrevHrs;
                    break;
                case 'weekly':
                    newPrevHrs = "Last Week - " + newPrevHrs;
                    break;
                case 'monthly':
                    newPrevHrs = "Last Month - " + newPrevHrs;
                    break;
            }

            cardHrs.innerText = newHrs;
            cardPrevHrs.innerText = newPrevHrs;
        }

        // update state
        localStorage.setItem("currentTimeFrame", newTimeFrame);
    }
    
}


// get states in local storage, set initial page based on stored states
let currentTimeFrame = localStorage.getItem("currentTimeFrame");
if (currentTimeFrame == null) // default value
    localStorage.setItem("currentTimeFrame", 'weekly');


for (let timePeriod of timePeriods){
    if (timePeriod.innerText.toLowerCase() == currentTimeFrame){
        timePeriod.click();
        console.log(currentTimeFrame);
        break;
    }
}