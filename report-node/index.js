const { createInvoice } = require("./createInvoice.js");

const invoice = {
  shipping: {
    name: "Oziel Dominguez Vazquez",
    address: "Calle Moroleon #14, Colonia El Arroyito",
    city: "Doctor Mora",
    state: "Guanajuato",
    country: "Mexico",
    postal_code: 37960
  },
  items: [
    {
      item: "El Karma",
      description: "Los Plebes del Rancho 2014",
      quantity: 1,
      amount: 10000
    },
    {
      item: "Seguimos Trabajando",
      description: "Los Plebes del Rancho 2017",
      quantity: 3,
      amount: 15000
    },
    {
      item: "Me Deje Llevar",
      description: "Christian Nodal 2017",
      quantity: 1,
      amount: 10000
    },
    {
      item: "Una Copa Mas",
      description: "Dareyes de La Sierra 2018",
      quantity: 2,
      amount: 90000
    }
  ],
  subtotal: 260000,
  paid: 1250,
  invoice_nr: 1001
};

createInvoice(invoice, "invoice.pdf");
