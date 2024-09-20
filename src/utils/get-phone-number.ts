export function getPhoneNumber() {
  const data = localStorage.getItem("tg-storage");
  if (data) {
    const tgStore = JSON.parse(data);
    const phoneNumber = tgStore.state.userPhoneNumber;
    return phoneNumber || null;
  }

  return null;
}
