// Your code here
// Define the createEmployeeRecord function
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Define the createEmployeeRecords function
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Define the createTimeInEvent function
function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    });
    return employee;
}

// Define the createTimeOutEvent function
function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    });
    return employee;
}

// Define the hoursWorkedOnDate function
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Define the wagesEarnedOnDate function
function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Define the allWagesFor function
function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(event => event.date);
    let totalWages = eligibleDates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}

// Define the calculatePayroll function
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}

// Export the functions
module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
};

