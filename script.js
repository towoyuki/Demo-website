const form = document.querySelector("#blendForm");
const resultCard = document.querySelector(".result-card");
const resultTitle = document.querySelector("#resultTitle");
const resultTarget = document.querySelector("#resultTarget");
const resultBase = document.querySelector("#resultBase");
const resultWater = document.querySelector("#resultWater");
const resultNote = document.querySelector("#resultNote");

const menuLabels = {
  standard: "通常シャンプー",
  medicated: "薬用シャンプー",
  sensitive: "敏感肌ケア",
  coat: "被毛ケア",
};

const coatNotes = {
  short: "少なめ・短毛の想定です。",
  normal: "標準的な毛量を想定しています。",
  long: "多め・長毛のため、塗布量の確認が必要です。",
};

function toPositiveNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function updateResult() {
  const formData = new FormData(form);
  const menuType = formData.get("menuType");
  const coatLength = formData.get("coatLength");
  const targetAmount = toPositiveNumber(formData.get("targetAmount"), 500);
  const dilutionRate = toPositiveNumber(formData.get("dilutionRate"), 5);
  const petWeight = toPositiveNumber(formData.get("petWeight"), 5);
  const notes = formData.get("notes")?.trim();

  const baseAmount = Math.round(targetAmount / dilutionRate);
  const waterAmount = Math.max(0, Math.round(targetAmount - baseAmount));
  const menuLabel = menuLabels[menuType] || menuLabels.standard;

  resultTitle.textContent = `${menuLabel}の目安`;
  resultTarget.textContent = `${Math.round(targetAmount)}ml`;
  resultBase.textContent = `${baseAmount}ml`;
  resultWater.textContent = `${waterAmount}ml`;
  resultNote.textContent = [
    `${petWeight}kgのワンちゃん、${coatNotes[coatLength] || coatNotes.normal}`,
    `希釈倍率${dilutionRate}倍として置いたデモ用の仮計算です。`,
    notes ? `メモ: ${notes}` : "正式運用時は薬剤ラベル、メーカー推奨、店舗ルールに合わせて調整します。",
  ].join(" ");
}

form.addEventListener("input", updateResult);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateResult();
  resultCard.classList.add("is-highlighted");
  window.setTimeout(() => resultCard.classList.remove("is-highlighted"), 700);
});

updateResult();
