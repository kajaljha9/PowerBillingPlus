import Tariff from "../models/Tariff.js";

export const createOrUpdateTariff = async (req, res) => {
  try {
    const { slabs, taxPercent } = req.body;

    if (!slabs || !Array.isArray(slabs) || slabs.length === 0) {
      return res.status(400).json({ message: "Slabs are required" });
    }

    const existing = await Tariff.findOne({});
    if (existing) {
      existing.slabs = slabs;
      existing.taxPercent = taxPercent || 0;
      await existing.save();
      return res.json({ message: "Tariff updated", tariff: existing });
    }

    const newTariff = await Tariff.create({ slabs, taxPercent });
    res.status(201).json({ message: "Tariff created", tariff: newTariff });
  } catch (error) {
    res.status(500).json({ message: "Failed to create tariff", error: error.message });
  }
};

export const getTariff = async (req, res) => {
  try {
    const tariff = await Tariff.findOne({});
    res.json(tariff || {});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tariff", error: error.message });
  }
};
