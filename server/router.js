const router = require('express').Router();
const schema = require('../database/schema.js');

// Get request from the client
router.route('/listings/').get((req, res) => {
  schema.Listing.find()
    .then((listings) => res.status(200).send(listings))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

router.route('/listing/:listingId').get((req, res) => {
  const { listingId } = req.params;
  schema.Listing.findOne({ listing_id: listingId })
    .then((listing) => res.status(200).send(listing))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

router.route('/listing/reservation/:listingId').patch((req, res) => {
  const { listingId } = req.params;
  const { newBooking } = req.body;
  const { days } = req.body;
  console.log(newBooking);

  schema.Listing.updateOne(
    { listing_id: listingId },
    { $push: { reservations: newBooking }, days },
    { returnNewDocument: true },
  )
    .then((updated) => res.status(200).send(updated))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

module.exports = router;
