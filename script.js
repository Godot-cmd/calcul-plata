function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function calculeazaDatoria() {
  const startInput = document.getElementById("startDate").value;
  const endInput = document.getElementById("endDate").value;
  const weekly = parseFloat(document.getElementById("weeklyPayment").value);
  const paid = parseFloat(document.getElementById("paidAmount").value) || 0;

  if (!startInput || !endInput || isNaN(weekly)) {
    document.getElementById("result").innerText =
      "⚠️ Completează toate câmpurile corect.";
    return;
  }

  const start = new Date(startInput);
  const end = new Date(endInput);

  if (end < start) {
    document.getElementById("result").innerText =
      "⚠️ Data de sfârșit trebuie să fie după data de început.";
    return;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.ceil((end - start) / msPerDay);
  const fullWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  const dailyRate = weekly / 7;
  const total = fullWeeks * weekly + remainingDays * dailyRate;
  const remaining = Math.max(0, total - paid);

  document.getElementById("result").innerHTML = `
    <div class="info-line">📅 Perioadă: <strong>${formatDate(start)}</strong> – <strong>${formatDate(end)}</strong></div>
    <div class="info-line">⏱ Durată: ${fullWeeks} săptămână(i) și ${remainingDays} zi(le)</div>
    <div class="info-line">💰 Total de plată: <strong>${total.toFixed(2)} lei</strong></div>
    <div class="info-line">💵 Plătit: <strong>${paid.toFixed(2)} lei</strong></div>
    <div class="info-line">🧾 <span class="highlight">Rest de plată: ${remaining.toFixed(2)} lei</span></div>
  `;
}

// 🔹 Trigger Calculează when Enter key is pressed
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    calculeazaDatoria();
  }
});

// Also attach click event for button
document.getElementById("calcBtn").addEventListener("click", calculeazaDatoria);
