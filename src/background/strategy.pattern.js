// mọi con đường đều dẫn đến thành Rome

function preOrderPrice(originalPrice){
    return originalPrice * 0.8
}
function promotionPrice(originalPrice){
    return originalPrice <= 200 ? originalPrice * 0.9 : originalPrice -30
}

function defaultPrice(originalPrice){
    return originalPrice
}

function blackFriday(originalPrice){
    return originalPrice <= 200 ? originalPrice * 0.8 : originalPrice -30
}

function dayPrice11(originalPrice){
    return originalPrice * 0.6
}

const getPriceStrategies = {
    promotion : promotionPrice,
    blackFriday : blackFriday,
    dayPrice11,
    default : defaultPrice
}

function getPrice(originalPrice,typePromotion){
    return getPriceStrategies[typePromotion](originalPrice)
}

console.log(getPrice(1500,'dayPrice11'))