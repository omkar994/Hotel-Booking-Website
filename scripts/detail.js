window.addEventListener('load', () => {
    document.getElementById('fromDate').value = moment().format('YYYY-MM-DD');
    document.getElementById('toDate').value = moment().add(1, 'days').format('YYYY-MM-DD');  
});

const calculateNumberOfDays = (startDate, EndDate) => {
    const a = moment(startDate);
    const b = moment(EndDate);
    return b.diff(a, 'days');
}

const calcaulateTotalprice = () => {
    document.getElementById('total').value =  calculateNumberOfDays(document.getElementById('fromDate').value, document.getElementById('toDate').value) * document.getElementById('adult').value * 1000; 
}; 

document.getElementById('adult').addEventListener('change', () => {
    calcaulateTotalprice();
});

document.getElementById('fromDate').addEventListener('change', () => {
    calcaulateTotalprice();
});

document.getElementById('toDate').addEventListener('change', () => {
    calcaulateTotalprice();
});