const validationBody = function (x) {
    if (!x) {
        return true;
    }
    else {
        return false;
    }
}

const validationLength = function (y) {
    if (y == 0) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = {
    validationBody,
    validationLength
};