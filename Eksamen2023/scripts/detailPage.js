import service from "./service/service.js";

const customShortTitles = {
    "6533c19ad89bd7c9ba8de72e": "Tag væk en<br> weekend, med én <br> du holder af ",
    "6533c22ed89bd7c9ba8de735": "Elsk, forny og fordyb forholdet med en<br> hjertevarm weekend væk. ",
    "6533c25dd89bd7c9ba8de739": "Familieoplevelser<br> der skaber minder ",

   
};

const detailPage = {

    template: (detailedStay) => `
        
    <div class="detail-container" >
      <div class="detail-headder" style="background-image: url(../assets/stays/${detailedStay._id}.jpg);">
        <div class="detail-overskrift">
            <h1>${detailedStay.title}</h1>
        </div>
      </div>
    
    
    
      <div class="detail-content-container">
        <h2>${customShortTitles[detailedStay._id]}</h2>

        <div class="detail-description">
            <p>${detailedStay.description}</p>
        </div>
        <p>Med i pakken, er der inkluderet:</p>
        <p><ul>${detailedStay.includes.map(item =>` <li class="detail-list">${item}</li>` ).join('')} </ul></p>

        <h4>Pris: ${detailedStay.price},- </h4>

        <a href="./Kontakt.html"><div class="detail-bookButton">
            <h4>BOOK NU</h4>
        </div></a>

        <!-- Add additional details here -->
      </div>
    </div>

    `,


    


    init: async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const stayId = urlParams.get('stayId');

    

        if (stayId) {
            try {
                const detailedStay = await service.get('stays/' + stayId);

                if (detailedStay) {
                    // Log the retrieved data to check its structure
                    console.log("Retrieved data:", detailedStay);

                    // Define a template to display the details
                                /*     const detailTemplate = (stay) => `
                                        <div class="detail-container">
                                            <h2>${stay.title}</h2>
                                            <p>Number of Persons: ${stay.numberOfPersons}</p>
                                            <p>Price: ${stay.price}</p>
                                            <!-- Add additional details here -->
                                        </div>`; */

                    // Render the detailed information

                    const detailContainer = document.querySelector('.detail-container');
                    
                    if (detailContainer) {
                        detailedStay.forEach((detailedStay) => {
                            detailContainer.insertAdjacentHTML('beforeend', detailPage.template(detailedStay));
                        });

                        
                    }
                }  else {
                    console.error("No data found for the specified ID.");
                }
            }catch (error) {
                console.error("Error fetching data:", error);
            }
        }else {
            console.error("No stayId provided in the URL.");
        }
    }
};
export default detailPage;