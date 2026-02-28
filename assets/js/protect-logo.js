(function () {
  const logos = document.querySelectorAll(".protected-logo");
  if (!logos.length) return;

  logos.forEach((logo) => {
    logo.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    logo.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });
  });
})();
