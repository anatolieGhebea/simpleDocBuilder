var jsonData;
var indexes = []

var curElement = jsonData;

indexes.forEach(index => {
    curElement = curElement[index];
})