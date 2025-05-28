// utils/mockUtils.js
import User from "../models/User.js";
import Bill from "../models/Bill.js";
import bcrypt from "bcryptjs";

const regions = [
  "North", "South", "East", "West",
  "Northeast", "Northwest", "Southeast", "Southwest"
];

const generateMeterId = async (region) => {
  let meterId;
  let exists = true;

  while (exists) {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    meterId = `${region.toUpperCase()}-${randomNum}`;
    exists = await User.findOne({ meterId });
  }

  return meterId;
};

export const generateMockUsers = async (count = 20) => {
  const mockUsers = [];

  for (let i = 0; i < count; i++) {
    const region = regions[Math.floor(Math.random() * regions.length)];
    const meterId = await generateMeterId(region);
    const passwordHash = await bcrypt.hash("password123", 10);

    const user = new User({
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `98765432${(10 + i).toString().padStart(2, "0")}`,
      region,
      address: `Address ${i + 1}`,
      meterId,
      password: passwordHash
    });

    mockUsers.push(user);
  }

  await User.insertMany(mockUsers);
  return mockUsers;
};

export const generateMockBills = async (users) => {
  const months = [
    "January", "February", "March", "April", "May"
  ];
  const bills = [];

  for (let user of users) {
    for (let month of months) {
      const units = Math.floor(Math.random() * 300) + 1;
      const slabs = [
        { limit: 100, rate: 3 },
        { limit: 100, rate: 5 },
        { limit: Infinity, rate: 8 }
      ];
      let remaining = units;
      let amount = 0;

      for (let slab of slabs) {
        const usage = Math.min(remaining, slab.limit);
        amount += usage * slab.rate;
        remaining -= usage;
        if (remaining <= 0) break;
      }

      const today = new Date();
      const billDate = today.toISOString().split("T")[0];
      const dueDate = new Date(today);
      dueDate.setMonth(dueDate.getMonth() + 1);

      bills.push({
        user: user._id,
        month,
        units,
        amount,
        billDate,
        dueDate: dueDate.toISOString().split("T")[0],
        status: "Unpaid"
      });
    }
  }

  await Bill.insertMany(bills);
  return bills;
};
