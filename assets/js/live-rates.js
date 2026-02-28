(function () {
  const troyOunceInGram = 31.1034768;

  const ids = {
    gold24: document.getElementById("rate-gold-24"),
    gold22: document.getElementById("rate-gold-22"),
    gold18: document.getElementById("rate-gold-18"),
    silver: document.getElementById("rate-silver"),
    updated: document.getElementById("rate-updated"),
  };

  if (!ids.gold24 || !ids.gold22 || !ids.gold18 || !ids.silver || !ids.updated) {
    return;
  }

  const formatInr = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);

  const setError = () => {
    ids.gold24.textContent = "Unavailable";
    ids.gold22.textContent = "Unavailable";
    ids.gold18.textContent = "Unavailable";
    ids.silver.textContent = "Unavailable";
    ids.updated.textContent = "Live rate temporarily unavailable. Please call for current rate.";
  };

  Promise.all([
    fetch("https://api.gold-api.com/price/XAU").then((r) => r.json()),
    fetch("https://api.gold-api.com/price/XAG").then((r) => r.json()),
    fetch("https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR").then((r) => r.json()),
  ])
    .then(([xau, xag, fx]) => {
      const usdInr = fx && fx.rates ? fx.rates.INR : null;
      const xauUsd = xau ? xau.price : null;
      const xagUsd = xag ? xag.price : null;

      if (!usdInr || !xauUsd || !xagUsd) {
        setError();
        return;
      }

      const gold24 = (xauUsd * usdInr) / troyOunceInGram;
      const gold22 = gold24 * (22 / 24);
      const gold18 = gold24 * (18 / 24);
      const silver = (xagUsd * usdInr) / troyOunceInGram;

      ids.gold24.textContent = formatInr(gold24);
      ids.gold22.textContent = formatInr(gold22);
      ids.gold18.textContent = formatInr(gold18);
      ids.silver.textContent = formatInr(silver);

      const now = new Date();
      ids.updated.textContent = `Last updated: ${now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`;
    })
    .catch(setError);
})();
