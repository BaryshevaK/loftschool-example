export default (address, review) => {
    const source = $('#balloon-template').html(); // eslint-disable-line
    const template = Handlebars.compile(source); // eslint-disable-line

    return template({ properties: { 'address': address, 'review': review } });
}
