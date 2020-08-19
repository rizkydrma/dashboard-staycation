const Item = require("../models/Item");
const Treasure = require("../models/Activity");
const Traveler = require("../models/Booking");
const Category = require("../models/Category");
const Bank = require("../models/Bank");
const Member = require("../models/Member");
const Booking = require("../models/Booking");
module.exports = {
  landingPage: async (req, res) => {
    try {
      const mostPicked = await Item.find()
        .select("_id title country city price unit")
        .limit(5)
        .populate({ path: "imageId", select: "_id imageUrl" });

      const treasure = await Treasure.find();
      const traveler = await Traveler.find();
      const city = await Item.find();

      const categories = await Category.find()
        .select("_id name")
        .limit(3)
        .populate({
          path: "itemId",
          select: "_id title country city isPopular imageId",
          perDocumentLimit: 4,
          options: { sort: { sumBooking: -1 } },
          populate: {
            path: "imageId",
            select: "_id imageUrl",
            perDocumentLimit: 1,
          },
        });

      categories.forEach((category) => {
        category.itemId.forEach(async (eachItem, index) => {
          const item = await Item.findOne({ _id: eachItem._id });
          item.isPopular = false;
          if (category.itemId[0] === eachItem) {
            item.isPopular = true;
          }
          await item.save();
        });
      });

      const testimonials = {
        _id: "asd123asd123",
        imageUrl: "images/testimonial1.jpg",
        name: "Happy Family",
        rate: 4.5,
        content:
          "What a grip with my family and i should try again next time soon ...",
        familyName: "Angga",
        familyOccupation: "Product Designer",
      };

      res.status(200).json({
        hero: {
          travelers: traveler.length,
          treasures: treasure.length,
          cities: city.length,
        },
        mostPicked,
        categories,
        testimonials,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
  detailPage: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await Item.findOne({ _id: id })
        .populate({ path: "imageId", select: "_id imageUrl" })
        .populate({ path: "featureId", select: "_id name qty imageUrl" })
        .populate({ path: "activityId", select: "_id name type imageUrl" });

      const bank = await Bank.find();

      const testimonials = {
        _id: "asd123asd123",
        imageUrl: "images/testimonial2.jpg",
        name: "Happy Family",
        rate: 4.5,
        content:
          "What a grip with my family and i should try again next time soon ...",
        familyName: "Angga",
        familyOccupation: "Product Designer",
      };
      res.status(200).json({
        ...item._doc,
        bank,
        testimonials,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  bookingPage: async (req, res) => {
    const {
      idItem,
      duration,
      bookingStartDate,
      bookingEndDate,
      firstName,
      lastName,
      email,
      phoneNumber,
      accountHolder,
      bankFrom,
    } = req.body;

    if (!req.file) {
      return res.status(404).json({ message: "Image notfound" });
    }

    if (
      idItem == undefined ||
      duration == undefined ||
      bookingStartDate == undefined ||
      bookingEndDate == undefined ||
      firstName == undefined ||
      lastName == undefined ||
      email == undefined ||
      phoneNumber == undefined ||
      accountHolder == undefined ||
      bankFrom == undefined
    ) {
      res.status(404).json({ message: "lengkapi semua field" });
    }
    const item = await Item.findOne({ _id: idItem });
    if (!item) {
      res.status(404).json({ message: "Item not found" });
    }
    item.sumBooking += 1;
    await item.save();

    let total = item.price * duration;
    let tax = total * 0.1;

    const invoice = Math.floor(1000000 + Math.random() * 9000000);

    const member = await Member.create({
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    const newBooking = {
      invoice,
      bookingStartDate,
      bookingEndDate,
      total: total + tax,
      itemId: {
        _id: item._id,
        title: item.title,
        price: item.price,
        duration: duration,
      },
      memberId: member._id,
      payments: {
        proofPayment: `images/${req.file.filename}`,
        bankFrom: bankFrom,
        accountHolder: accountHolder,
      },
    };

    const booking = await Booking.create(newBooking);
    res.status(201).json({ message: "Success Booking", booking });
  },
};
