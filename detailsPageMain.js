localStorage.removeItem("profileDetails");

const countryCodesAndFlag = window.CountryList.getAll();
const dialCode = document.querySelector(".dialCode");
countryCodesAndFlag.forEach((country) => {
    const child = `
        <option value="${country.data.dial_code}">${country.data.flag} ${country.data.dial_code}</option>
    `
    dialCode.innerHTML += child;
});

let formDetails = {
    fullName: "",
    dialCode: "+93",
    mobileNumber: "",
    email: "",
    confirmEmail: "",
    gender: "male"
}

const enterForm = (element) => {
    formDetails = {
        ...formDetails,
        [element.name]: element.value
    }
    setAlert(element);
    checkButton();
}

const setAlert = (element) => {
    if( (element.name === "fullName" && formDetails.fullName === "") || 
        (element.name === "mobileNumber" && formDetails.mobileNumber.length !== 10) ||
        (element.name === "email" && !validateEmail(formDetails.email)) || 
        (element.name === "confirmEmail" && formDetails.confirmEmail !== formDetails.email)){
        document.querySelector("."+element.name+"-alert").style.display = "block";
    }
    else{
        document.querySelector("."+element.name+"-alert").style.display = "none";
    }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const checkButton = () => {
    if(formDetails.fullName === "" || formDetails.mobileNumber.length !== 10 || formDetails.email === "" || validateEmail(formDetails.email) == false || validateEmail(formDetails.confirmEmail) == false || formDetails.email !== formDetails.confirmEmail){
        document.querySelector(".detailsPurchaseButton").classList.add("disabled");
        return;
    }
    document.querySelector(".detailsPurchaseButton").classList.remove("disabled");
}

const saveToLocalStorage = () => {
    localStorage.setItem("profileDetails", JSON.stringify(formDetails));
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
}
updateTable();