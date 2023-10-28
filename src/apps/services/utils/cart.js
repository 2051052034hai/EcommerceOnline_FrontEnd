export const handleTotalProduct = (data) => {
    let total = 0;
    data.map(item =>  {
        total += item.total;
    })
    return total;
}