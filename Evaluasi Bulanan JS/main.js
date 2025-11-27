document.addEventListener("DOMContentLoaded", () => {
  const user = Auth.check();
  if (!user) UI.renderLogin();
  else UI.renderDashboard(user);
  const theme = DB.get("theme");
if (theme === "dark") document.body.classList.add("dark");
});
