/* eslint-disable no-console */
const dayjs = require('dayjs');
const faker = require('faker');
// eslint-disable-next-line no-unused-vars
const db = require('./connectToDatabase.js');
const schema = require('./schema.js');

const reSeed = async () => {
  let listCount = 1;
  try {
    // Delete existing documents
    await schema.Listing.deleteMany({});
    for (listCount; listCount <= 100; listCount += 1) {
      const daysArray = [];
      const randomPrice = faker.random.number({ min: 75, max: 450 });

      const getLastDay = function (yy, mm) {
        return new Date(yy, mm + 1, 0).getDate();
      };

      for (let month = 1; month <= 6; month++) {
        // Construct day object to be pushed to array, 6 months worth of days

        const startDay = dayjs().startOf('month').add(month - 1, 'month').toDate();
        const startMonth = startDay.getMonth();
        const startYear = startDay.getFullYear();
        const lastDay = getLastDay(startYear, startMonth);

        const monthArray = [];

        for (let day = 1; day <= lastDay; day++) {
          const date = {
            date: dayjs(startDay).add(day - 1, 'day').toDate(),
            booked: faker.random.boolean(),
            price: randomPrice,
            servicefee: 0,
            minimumNights: 1,
          };

          // Make weekends more expensive
          if (date.date.getDay() >= 5) {
            date.price = Number((date.price * 1.2).toFixed(2));
          }

          // Make a two day minimum on Fridays
          if (date.date.getDay() === 5) {
            date.minimumNights = 2;
          }

          // Set service fee
          date.serviceFee = Number((date.price * 0.142).toFixed(2));
          monthArray.push(date);
        }
        daysArray.push(monthArray);
      }

      const newListing = new schema.Listing({
        listing_id: listCount,
        days: daysArray,
        cleaningFee: faker.random.number({ min: 50, max: 100 }),
      });

      newListing.save();
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`${listCount - 1} new listings created.`);
  }
};

reSeed();
