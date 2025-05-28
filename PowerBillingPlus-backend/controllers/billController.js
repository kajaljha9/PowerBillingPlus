//controllers/billController.js
import Bill from "../models/Bill.js";
import User from "../models/User.js";

export const generateBill = async (req, res) => {
  try {
    let { userId, units, amount, month, billDate, dueDate } = req.body;

    if (!userId || !units || !month) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const currentMonth = new Date().getMonth();
    const monthIndex = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ].indexOf(month);

    if (monthIndex > currentMonth) {
      return res
        .status(400)
        .json({ message: "Cannot generate bill for future month" });
    }

    // ✅ Check for existing bill (PREVENT DUPLICATE)
    const duplicate = await Bill.findOne({ user: userId, month });
    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Bill already exists for this user and month." });
    }

    // Auto-calculate amount if not provided
    if (!amount) {
      units = Number(units);
      const slabs = [
        { limit: 100, rate: 3 },
        { limit: 100, rate: 5 },
        { limit: Infinity, rate: 8 }
      ];
      let remaining = units;
      amount = 0;
      for (let slab of slabs) {
        const usage = Math.min(remaining, slab.limit);
        amount += usage * slab.rate;
        remaining -= usage;
        if (remaining <= 0) break;
      }
    }

    const today = new Date();
    if (!billDate) billDate = today;
    if (!dueDate) {
      const due = new Date(today);
      due.setMonth(due.getMonth() + 1);
      dueDate = due;
    }

    const bill = await Bill.create({
      user: userId,
      units,
      amount,
      month,
      billDate,
      dueDate
    });

    await bill.populate("user", "name email region phone meterId");

    res.status(201).json({ message: "Bill generated", bill });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating bill", error: error.message });
  }
};

export const getAllBills = async (req, res) => {
  try {
    const { region, month } = req.query;

    const filters = {};
    if (region) filters["user.region"] = region;
    if (month) filters.month = month;

    const bills = await Bill.find()
      .populate("user", "name email phone region address")
      .sort({ billDate: -1 });

    const filteredBills = bills.filter((b) => {
      return (
        (!region || b.user.region === region) && (!month || b.month === month)
      );
    });

    res.json(filteredBills);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch bills", error: error.message });
  }
};


export const updateBillStatus = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(bill);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update bill", error: error.message });
  }
};

export const deleteBill = async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.json({ message: "Bill deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete bill", error: error.message });
  }
};

export const updateBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).populate("user");
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json({ message: "Bill updated", bill });
  } catch (err) {
    res.status(500).json({ message: "Failed to update bill", error: err.message });
  }
};

