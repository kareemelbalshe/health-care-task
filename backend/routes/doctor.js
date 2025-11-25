import express from 'express';
import User from '../models/User.js';
import Visit from '../models/Visit.js';
const router = express.Router();

// router.get('/profile', async (req, res) => {
//   try {
//     if (req.user.role !== 'doctor') {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     const doctor = await User.findById(req.user.id).select('-password');
//     res.json(doctor);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// router.put('/profile', auth, async (req, res) => {
//   try {
//     if (req.user.role !== 'doctor') {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     const { phone, specialization } = req.body;
//     const doctor = await User.findByIdAndUpdate(
//       req.user.id,
//       { phone, specialization },
//       { new: true }
//     ).select('-password');

//     res.json(doctor);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// router.get('/schedule', auth, async (req, res) => {
//   try {
//     if (req.user.role !== 'doctor') {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     const { date } = req.query;
//     const startDate = new Date(date);
//     startDate.setHours(0, 0, 0, 0);
//     const endDate = new Date(date);
//     endDate.setHours(23, 59, 59, 999);

//     const schedule = await Visit.find({
//       doctor: req.user.id,
//       scheduledDate: {
//         $gte: startDate,
//         $lte: endDate
//       }
//     }).populate('patient', 'name phone')
//       .sort({ scheduledDate: 1 });

//     res.json(schedule);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// router.get('/current-visit', auth, async (req, res) => {
//   try {
//     if (req.user.role !== 'doctor') {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     const currentVisit = await Visit.findOne({
//       doctor: req.user.id,
//       status: 'in-progress'
//     }).populate('patient', 'name phone email address');

//     res.json(currentVisit);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

export default router;