$(function () {
    $("#datepicker").datepicker();
});

let initialDate = $("#datepicker").datepicker({ altField: "#input_date" })[0].value;
let initialTime = [
    {
        name: "07.00am - 08.00am",
        category: "normal"
    }
];
let initialDuration = {
    numberOfHours: 1,
    numberOfNormal: 1,
    numberOfPeak: 0
};

let guests = [
    {
        id: 0,
        name: "SL Adult",
        count: 0,
        price: 0
    },
    {
        id: 1,
        name: "SL Child",
        count: 0,
        price: 0
    },
    {
        id: 2,
        name: "Foreigner Adult",
        count: 1,
        price: 10
    },
    {
        id: 3,
        name: "Foreigner Child",
        count: 0,
        price: 0
    },
    {
        id: 4,
        name: "Infant",
        count: 0,
        price: 0
    }
];

const guestsCountContainer = document.querySelector(".guestsCountContainer");
guests.forEach((guest) => {
    const child = `
        <div class="guestContainer">
            <p>${guest.name}</p>
            <div class="buttons">
                <button class="btn btn-danger" onclick="decreaseGuest(${guest.id})">➖</button>
                <p class="slAdultCount guest-${guest.id}">${guest.count}</p>
                <button class="btn btn-success" onclick="increaseGuest(${guest.id})">➕</button>
            </div>
        </div>
    `;
    guestsCountContainer.innerHTML += child;
});

const decreaseGuest = (id) => {
    if (guests[id].count == 0){
        return;
    }
    guests[id].count = guests[id].count - 1;
    document.querySelector(".guest-"+id).innerHTML = guests[id].count;
    initialTime.forEach((time) => {
        if(time.category === "normal" && guests[id].name === "Foreigner Adult"){
            guests[id].price = guests[id].price - 10;
        }
        else if(time.category === "peak" && guests[id].name === "Foreigner Adult"){
            guests[id].price = guests[id].price - 13;
        }
        else if(time.category === "normal" && guests[id].name === "Foreigner Child"){
            guests[id].price = guests[id].price - 5;
        }
        else if(time.category === "peak" && guests[id].name === "Foreigner Child"){
            guests[id].price = guests[id].price - 8;
        }
        else if(time.category === "normal" && guests[id].name === "SL Adult"){
            guests[id].price = guests[id].price - 4;
        }
        else if(time.category === "peak" && guests[id].name === "SL Adult"){
            guests[id].price = guests[id].price - 6;
        }
        else if(time.category === "normal" && guests[id].name === "SL Child"){
            guests[id].price = guests[id].price - 2;
        }
        else if(time.category === "peak" && guests[id].name === "SL Child"){
            guests[id].price = guests[id].price - 3;
        }
    });
    addDataIntoLocalStorage();
}

const increaseGuest = (id) => {
    guests[id].count = guests[id].count + 1;
    document.querySelector(".guest-"+id).innerHTML = guests[id].count;
    initialTime.forEach((time) => {
        if(time.category === "normal" && guests[id].name === "Foreigner Adult"){
            guests[id].price = guests[id].price + 10;
        }
        else if(time.category === "peak" && guests[id].name === "Foreigner Adult"){
            guests[id].price = guests[id].price + 13;
        }
        else if(time.category === "normal" && guests[id].name === "Foreigner Child"){
            guests[id].price = guests[id].price + 5;
        }
        else if(time.category === "peak" && guests[id].name === "Foreigner Child"){
            guests[id].price = guests[id].price + 8;
        }
        else if(time.category === "normal" && guests[id].name === "SL Adult"){
            guests[id].price = guests[id].price + 4;
        }
        else if(time.category === "peak" && guests[id].name === "SL Adult"){
            guests[id].price = guests[id].price + 6;
        }
        else if(time.category === "normal" && guests[id].name === "SL Child"){
            guests[id].price = guests[id].price + 2;
        }
        else if(time.category === "peak" && guests[id].name === "SL Child"){
            guests[id].price = guests[id].price + 3;
        }
    });
    addDataIntoLocalStorage();
}

const durations = [ "07.00am - 08.00am", "08.00am - 09.00am", "09.00am - 10.00am",
                    "10.00am - 11.00am", "11.00am - 12.00pm", "12.00pm - 01.00pm",
                    "01.00pm - 02.00pm", "02.00pm - 03.00pm", "03.00pm - 04.00pm",
                    "04.00pm - 05.00pm", "05.00pm - 06.00pm" ];

const durationInput = document.querySelector(".durationInput");
durationInput.setAttribute("size", durations.length);
durations.forEach((duration, index) => {
    const child = `<option value="${duration}" ${index == 0 ? "selected" : ""}>${duration}</option>`;
    durationInput.innerHTML += child;
});

const selectedDate = () => {
    initialDate = $("#datepicker").datepicker({ altField: "#input_date" })[0].value;
    addDataIntoLocalStorage();
}

const calculateDuration = (times) => {
    initialDuration.numberOfHours = times.length;
    let peak = 0;
    let normal = 0;
    times.forEach((time) => {
        if(time.category === "normal"){
            normal = normal + 1;
        }else{
            peak = peak + 1;
        }
    });
    initialDuration.numberOfNormal = normal;
    initialDuration.numberOfPeak = peak;
}

const calculatePriceAfterSelectingDuration = (initialTime) => {
    for(let j=0; j<guests.length; j++){
        let count = 0;
        if(guests[j].count > 0){
            for(let i=0; i<initialTime.length; i++){
                if(initialTime[i].category === "normal" && guests[j].name === "Foreigner Adult"){
                    guests[j].price = count + (guests[j].count * 10);
                    count = count + (guests[j].count * 10);
                }
                else if(initialTime[i].category === "peak" && guests[j].name === "Foreigner Adult"){
                    guests[j].price = count + (guests[j].count * 13);
                    count = count + (guests[j].count * 13);
                }
                else if(initialTime[i].category === "normal" && guests[j].name === "Foreigner Child"){
                    guests[j].price = count + (guests[j].count * 5);
                    count = count + (guests[j].count * 5);
                }
                else if(initialTime[i].category === "peak" && guests[j].name === "Foreigner Child"){
                    guests[j].price = count + (guests[j].count * 8);
                    count = count + (guests[j].count * 8);
                }
                else if(initialTime[i].category === "normal" && guests[j].name === "SL Adult"){
                    guests[j].price = count + (guests[j].count * 4);
                    count = count + (guests[j].count * 4);
                }
                else if(initialTime[i].category === "peak" && guests[j].name === "SL Adult"){
                    guests[j].price = count + (guests[j].count * 6);
                    count = count + (guests[j].count * 6);
                }
                else if(initialTime[i].category === "normal" && guests[j].name === "SL Child"){
                    guests[j].price = count + (guests[j].count * 2);
                    count = count + (guests[j].count * 2);
                }
                else if(initialTime[i].category === "peak" && guests[j].name === "SL Child"){
                    guests[j].price = count + (guests[j].count * 3);
                    count = count + (guests[j].count * 3);
                }
            }
        }  
    }
}

const selectedTime = () => {
    initialTime = [];
    times = $('.durationInput').val();
    times.forEach((time) => {
        if(time === "07.00am - 08.00am" || time === "08.00am - 09.00am" || time === "09.00am - 10.00am" || time === "01.00pm - 02.00pm" || time === "02.00pm - 03.00pm"){
            initialTime.push({
                name: time,
                category: "normal"
            })
        }
        else if(time === "10.00am - 11.00am" || time === "11.00am - 12.00pm" || time === "12.00pm - 01.00pm" || time === "03.00pm - 04.00pm" || time === "04.00pm - 05.00pm" || time === "05.00pm - 06.00pm"){
            initialTime.push({
                name: time,
                category: "peak"
            })
        }
    });
    calculatePriceAfterSelectingDuration(initialTime);
    calculateDuration(initialTime);
    addDataIntoLocalStorage();
}

const updateTable = () => {
    document.querySelector(".date").innerHTML = localStorage.getItem("date");

    let times = JSON.parse(localStorage.getItem("times"));
    let startTime = times[0].name.substring(0, times[0].name.indexOf("-"));
    let endTime = times[times.length-1].name.substring(times[times.length-1].name.indexOf("-"));
    document.querySelector(".time").innerHTML = startTime+endTime;

    document.querySelector(".duration").innerHTML = `${initialDuration.numberOfHours}hrs (${initialDuration.numberOfNormal} Normal : ${initialDuration.numberOfPeak} Peak)`;

    let totalPrice = 0;
    document.querySelector(".guests").innerHTML = "";
    guests.forEach((guest) => {
        if(guest.count > 0){
            totalPrice = totalPrice + guest.price;
            const child = `
                <tr>
                    <td>${guest.count} ${guest.name}</td>
                    <td>${guest.price == 0? "Free" : "$"+guest.price}</td>
                </tr>
            `;
            document.querySelector(".guests").innerHTML += child;
        }
    });

    document.querySelector(".totalPrice").innerHTML = `$${totalPrice}`;
}

const checkButton = () => {
    let length = 0;
    guests.forEach((guest) => {
        if(guest.count == 0){
            length = length + 1;
        }
    });

    if(length == guests.length){
        document.querySelector(".homePurchaseButton").classList.add("disabled");
    }else{
        document.querySelector(".homePurchaseButton").classList.remove("disabled");
    }
}

const addDataIntoLocalStorage = () => {
    localStorage.setItem("date", initialDate);
    localStorage.setItem("times", JSON.stringify(initialTime));
    localStorage.setItem("duration", JSON.stringify(initialDuration));
    localStorage.setItem("guests", JSON.stringify(guests));
    updateTable();
    checkButton();
}
addDataIntoLocalStorage();