const express = require('express');
const stripe = require('stripe')(
  'sk_test_51N3e2JSIOp89KyYyREsJOdBVvVeBEeK5s96FrS3s99gXcYQLp0HeLvbSe0WM4fCWpmkRcKAeNVbi7ENEKkVTNK0b005bP6nlRM'
);
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'V@123',
  database: 'stripe',
});

connection.connect((error) => {
  if (error) return error;

  console.log('Database Connected');
});

app.post('/create-customer', async (req, res) => {
  const { name, email, line1, city, state1, pcode, country } = req.body;

  try {
    // Create a new Stripe customer
    const customer = await stripe.customers.create({
      name,
      email,
      address: {
        line1: line1,
        city: city,
        state: state1,
        postal_code: pcode,
        country: country,
      },
    });

    // console.log(customer);

    // Store the customer ID in the database
    connection.query(
      'INSERT INTO customer (idcustomer) VALUES (?)',
      [customer.id],
      (error, result) => {
        if (error) {
          //   console.log(error);
          return;
        }
        // console.log(result);
      }
    );
    return res.json({ customerId: customer.id });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the customer.' });
  }
});

app.get('/get-customer/:id', async (req, res) => {
  const { id } = req.params;
  console.log('id', req.params);
  // const id = 1;

  try {
    // Store the customer ID in the database
    connection.query(
      'select * from customer where id=?',
      [id],
      (error, result) => {
        if (error) return error;
        console.log(result);
        return res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the customer.' });
  }
});

app.post('/add-card', async (req, res) => {
  const { customerId, paymentMethodId } = req.body;

  try {
    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Set the attached payment method as the default for the customer
    // await stripe.customers.update(customerId, {
    //   invoice_settings: {
    //     default_payment_method: paymentMethodId,
    //   },
    // });

    res.json({ message: 'Card added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the card.' });
  }
});

//////////////////////////////////////

app.post('/idapi', async (req, res) => {
  const { customerId } = req.body;
  console.log(
    customerId,
    '----------------------------------------------------------------------'
  );
  try {
    stripe.customers.listPaymentMethods(`${customerId}`, (err, pmethod) => {
      if (err) {
        console.log('list method error');
      }
      if (pmethod) {
        console.log('pmethod -------------------------', pmethod.data);
        res.json({ paymentMethodidsent: pmethod.data });
      } else {
        console.log('something went wrong');
      }
    });
    // stripe.customers.retrieve(`${customerId}`, (err, customer) => {
    //   //returns customer object we just need payment mehod id here
    //   if (err) {
    //     console.log('err', err);
    //   }
    //   if (customer) {
    //     console.log('customer----------------------------------------------------------------------------------------',customer);
    //     console.log(
    //       'get payment id log---------------',
    //       customer.invoice_settings.default_payment_method
    //     );
    //     res.json({ message: customer.invoice_settings.default_payment_method });
    //   } else {
    //     console.log('somthing went wrong');
    //   }
    // });
  } catch (error) {}
});

/////////////////////////////////////

app.post('/payment', cors(), async (req, res) => {
  let { amount, idcustomer, paymentid } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      payment_method_types: ['card', 'apple_pay'],
      amount,
      currency: 'USD',
      customer: idcustomer,
      description: 'try description',
      payment_method: paymentid,
      off_session: true,
      confirm: true,
    });
    // console.log('payment', payment);
    console.log('payment zal n bho');

    stripe.paymentIntents;

    res.json({ payment });
  } catch (error) {
    // console.log('error', error);
    res.json({
      message: 'payment failed',
      success: false,
    });
  }
});
// const retriveCustomer = () => {
//   stripe.customers.retrieve('cus_O2iHpqCQ9ULmyA', (err, customer) => {
//     if (err) {
//       console.log('err', err);
//     }
//     if (customer) {
//       console.log('customer', JSON.stringify(customer, null, 2));
//       console.log(customer.invoice_settings.default_payment_method);
//     } else {
//       console.log('somthing went wrong');
//     }
//   });
// };

// retriveCustomer();

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
