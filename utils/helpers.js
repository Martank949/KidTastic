module.exports = {
  formatDate: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  formatAmount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  getEmoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return;
    } else if (randomNum > 0.4) {
      return;
    }
    return;
  },
};
