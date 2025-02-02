

export const extractPrices = (...elements : any) => {
    for (const element of elements){
        const priceText = element.text().trim()
        if (priceText) return priceText.replace(/[^\d.]/g, '')
    }   
    return ''
}

export const formatNumber = (num: number = 0) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
};