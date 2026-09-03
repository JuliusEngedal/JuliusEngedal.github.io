console.log("Hello World!");

fetch("cv-data.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("job");

    data.CvData.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("Job-card");
      card.classList.add("w-bg")
      card.innerHTML = `
        <h3 class="w-bg">${item.headline}</h3>
        <p class="w-bg"><i class="w-bg">${item.workstation}</i></p>
        <time class="w-bg">${item.date}</time>
      `;
      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error loading cv-data:", error));

fetch("cv-udd-data.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("udd");

    data.CvUddData.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("Udd-card");
      card.classList.add("w-bg")
      card.innerHTML = `
        <h3 class="w-bg">${item.headline} </h3>
        <p class="w-bg"><i class="w-bg">${item.station}</i></p>
        <time class="w-bg">${item.date}</time>
      `;
      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error loading udd-data:", error));
