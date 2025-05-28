// controllers/dashboardController.js
import User from "../models/User.js";
import Bill from "../models/Bill.js";


export const getDashboardMetrics = async (req, res) => {
  try {
    const { month, year, region } = req.query;

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, +month + 1, 0);

    const filter = {
      billDate: { $gte: startDate, $lte: endDate },
      ...(region && { region })
    };

    const users = await User.countDocuments(region ? { region } : {});
    const paidBills = await Bill.find({ status: "Paid", ...filter });
    const unpaidBills = await Bill.find({ status: "Unpaid", ...filter });

    const totalRevenue = paidBills.reduce((sum, b) => sum + b.amount, 0);
    const unitsPaidFor = paidBills.reduce((sum, b) => sum + b.units, 0);
    const unitsPending = unpaidBills.reduce((sum, b) => sum + b.units, 0);

    res.json({
      totalUsers: users,
      paidBills: paidBills.length,
      unpaidBills: unpaidBills.length,
      totalRevenue,
      unitsPaidFor,
      unitsPending
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch metrics", error: err.message });
  }
};

export const getRevenueData = async (req, res) => {
  try {
    const { year, region } = req.query;

    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59);

    const filter = {
      status: "Paid",
      billDate: { $gte: startOfYear, $lte: endOfYear },
      ...(region && region !== "All" && { region })
    };

    const allBills = await Bill.find(filter);

    const monthlyRevenue = Array(12).fill(0);
    allBills.forEach((bill) => {
      const month = new Date(bill.billDate).getMonth();
      monthlyRevenue[month] += bill.amount;
    });

    res.json(monthlyRevenue);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch revenue", error: err.message });
  }
};

export const getUserPaymentStatusData = async (req, res) => {
  try {
    const { month, year, region } = req.query;

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, +month + 1, 0, 23, 59, 59);

    const userFilter = region && region !== "All" ? { region } : {};
    const users = await User.find(userFilter);

    let paid = 0;
    let unpaid = 0;

    for (const user of users) {
      const unpaidBill = await Bill.findOne({
        user: user._id,
        status: "Unpaid",
        billDate: { $gte: startDate, $lte: endDate },
        ...(region && region !== "All" && { region })
      });

      if (unpaidBill) unpaid++;
      else paid++;
    }

    res.json({ paid, unpaid });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to fetch user payment status",
        error: err.message
      });
  }
};

export const getUnitsComparisonData = async (req, res) => {
  try {
    const { month, year, region } = req.query;

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, +month + 1, 0, 23, 59, 59);

    const filter = {
      billDate: { $gte: startDate, $lte: endDate },
      ...(region && region !== "All" && { region })
    };

    const paidBills = await Bill.find({ status: "Paid", ...filter });
    const unpaidBills = await Bill.find({ status: "Unpaid", ...filter });

    const unitsPaidFor = paidBills.reduce((sum, b) => sum + b.units, 0);
    const unitsPending = unpaidBills.reduce((sum, b) => sum + b.units, 0);

    res.json({ unitsPaidFor, unitsPending });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to fetch unit comparison data",
        error: err.message
      });
  }
};
