let cardDetails = {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name:"",
}

const enterForm = (element) => {
    cardDetails = {
        ...cardDetails,
        [element.name]: element.value
    }
    console.log(cardDetails);
    setAlert(element);
    buttonCheck();
}

const checkDate = (selectedDate) => {
    const selectedMonth = parseInt(selectedDate.substring(5));
    const selectedYear = parseInt(selectedDate.substring(0,4));
    
    const date = new Date();
    if(selectedYear < date.getFullYear()){
        return true;
    }
    else if(selectedYear == date.getFullYear() && selectedMonth < date.getMonth()){
        return true;
    }
    return false;
}

const setAlert = (element) => {
    if( (element.name === "cardNumber" && cardDetails.cardNumber.length !== 16) ||
        (element.name === "cvv" && cardDetails.cvv.length !== 3) ||
        (element.name === "name" && validateString(cardDetails.name)) ||
        (element.name === "expiryDate" && checkDate(cardDetails.expiryDate))){
        document.querySelector("."+element.name+"-alert").style.display = "block";
    }
    else{
        document.querySelector("."+element.name+"-alert").style.display = "none";
    }
}

const validateString = (str) => {
    const regex = /[0-9~`!@#$%^&*()_+-={}[\]:;"'<>,.?/\\|]/;
    return regex.test(str);
}

const buttonCheck = () => {
    
    if(cardDetails.cardNumber.length != 16 || cardDetails.expiryDate === "" || cardDetails.cvv.length != 3 || cardDetails.name === "" ||validateString(cardDetails.name) === true){
        document.querySelector(".paymentButton").classList.add("disabled");
        return;
    }
    document.querySelector(".paymentButton").classList.remove("disabled");
}


const updateTable = () => {
    document.querySelector(".date").innerHTML = localStorage.getItem("date");

    let times = JSON.parse(localStorage.getItem("times"));
    let startTime = times[0].name.substring(0, times[0].name.indexOf("-"));
    let endTime = times[times.length-1].name.substring(times[times.length-1].name.indexOf("-"));
    document.querySelector(".time").innerHTML = startTime+endTime;

    let initialDuration = JSON.parse(localStorage.getItem("duration"))
    document.querySelector(".duration").innerHTML = `${initialDuration.numberOfHours}hrs (${initialDuration.numberOfNormal} Normal : ${initialDuration.numberOfPeak} Peak)`;

    let totalPrice = 0;
    let guests = JSON.parse(localStorage.getItem("guests"));
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
    document.querySelector(".paymentButton").innerHTML = `Pay $${totalPrice}`
}
updateTable();