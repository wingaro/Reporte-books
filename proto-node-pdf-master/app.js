// Requires
const { join } = require('path');
const moment = require('moment');
const pdf = require('html-pdf');
const { promisify } = require('util');
const read = promisify(require('fs').readFile);
const handlebars = require('handlebars');


// PDF Options
const pdf_options = { format: 'A4', quality: 300 };

// GeneratePDF
async function generatePDF() {
    // Data we're going to pass to Handlebars
    const data = {
        mycompany: {
            name: "Oziel Dominguez Vazquez",
            address:"Calle Moroleon #14, Colonia El Arroyito",
            city: "Doctor Mora",
            zipcode: '37960'
        },
        customer: {},
        invoice_no: generateInvoiceNo(),
        date_created: moment().format('DD/MM/YYYY'),
        date_due: moment().add(14, 'days').format('DD/MM/YYYY')
    };

    // // Add customer data
    // data.customer = {
    //     org: 'MX',
    //     name: 'Ulises García Ponce',
    //     email: 'ulisesgarcia060@gmail.com'
    // };

    data.products = [{
            name: 'Nieve de Vainilla',
            price: 10.00
        },
        {
            name: 'Nieve de Fresa',
            price: 8.00
        },
        {
            name: 'Nieve de Chocolate',
            price: 12.00
        },
        {
            name: 'Nieve de Manzana',
            price: 20.00
        },
    ];

    const total = data.products.map(product => product.price).reduce((a, b) => a + b, 0);

    data.exvat = (total - (total / 1.21)).toFixed(2);

    data.total = total.toFixed(2);

    data.products.forEach(product => product.price = product.price.toFixed(2));

    // Read source template
    const source = await read(join(`${__dirname}/template.html`), 'utf-8');

    // Convert to Handlebars template and add the data
    const template = handlebars.compile(source);
    const html = template(data);

    // Generate PDF and promisify the toFile function
    const p = pdf.create(html, pdf_options);
    p.toFile = promisify(p.toFile);

    // Saves the file to the File System as invoice.pdf in the current directory
    await p.toFile(`${join(__dirname, 'Factura.pdf')}`);

};

function generateInvoiceNo() {
    return moment().format('YYYYMMDD');
}

generatePDF();