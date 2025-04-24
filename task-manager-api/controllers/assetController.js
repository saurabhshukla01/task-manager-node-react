const Asset = require('../models/Asset');

// Create Asset (Admin only)
exports.createAsset = async (req, res) => {
  const { name, secretKey } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  if (!name || !secretKey) {
    return res.status(400).json({ message: 'Name and secretKey are required.' });
  }

  try {
    const asset = await Asset.create({
      name,
      secretKey,
      owner: req.user._id
    });
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating asset.' });
  }
};

// Get All Assets
exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();

    if (req.user.role === 'admin') {
      // Admin sees everything
      return res.json(assets);
    } else {
      // User sees only name (not secretKey)
      const filteredAssets = assets.map(asset => ({
        _id: asset._id,
        name: asset.name
      }));
      return res.json(filteredAssets);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching assets.' });
  }
};

// Get Single Asset by ID (Admin only)
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found.' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching asset.' });
  }
};

// Update Asset (Admin only)
exports.updateAsset = async (req, res) => {
  const { name, secretKey } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found.' });
    }

    asset.name = name || asset.name;
    asset.secretKey = secretKey || asset.secretKey;

    await asset.save();
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating asset.' });
  }
};

// Delete Asset (Admin only)
exports.deleteAsset = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found.' });
    }

    await asset.deleteOne();
    res.json({ message: 'Asset deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting asset.' });
  }
};
