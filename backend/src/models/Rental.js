import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  rentalDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true,
    default: function() {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return date;
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

rentalSchema.index({ user: 1, movie: 1 });

rentalSchema.virtual('daysLeft').get(function() {
  if (this.status !== 'active') return 0;
  const diff = this.expiryDate - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

rentalSchema.pre(/^find/, async function() {
  await this.model.updateMany(
    { expiryDate: { $lt: new Date() }, status: 'active' },
    { status: 'expired' }
  );
});

const Rental = mongoose.model('Rental', rentalSchema);
export default Rental;