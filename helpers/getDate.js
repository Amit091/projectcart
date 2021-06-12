exports.getDate = (today) => {
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return date;
};

//call by cDate.getDate(new Date())