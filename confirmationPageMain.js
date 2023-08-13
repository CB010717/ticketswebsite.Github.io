const updateTable = () => {
    document.querySelector(".date").innerHTML = localStorage.getItem("date");

    let times = JSON.parse(localStorage.getItem("times"));
    let startTime = times[0].name.substring(0, times[0].name.indexOf("-"));
    let endTime = times[times.length-1].name.substring(times[times.length-1].name.indexOf("-"));
    document.querySelector(".time").innerHTML = startTime+endTime;

    let initialDuration = JSON.parse(localStorage.getItem("duration"))
    document.querySelector(".duration").innerHTML = `${initialDuration.numberOfHours}hrs (${initialDuration.numberOfNormal} Normal : ${initialDuration.numberOfPeak} Peak)`;

    const getProfile = JSON.parse(localStorage.getItem("profileDetails"));
    const mobile = "("+getProfile.dialCode+")"+" "+getProfile.mobileNumber;
    document.querySelector(".mobile").innerHTML = mobile;
    document.querySelector(".email").innerHTML = getProfile.email;
    document.querySelector(".gender").innerHTML = getProfile.gender;

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