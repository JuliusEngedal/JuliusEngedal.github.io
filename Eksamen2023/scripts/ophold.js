import service from "./service/service.js";

const ophold = {
    template: (stay) => `
        <div class="stays-container" style="background-image: url(/assets/stays/${stay._id}.jpg);">
            <div class="stays-overskrift">
                <h2>${stay.title}</h2>
                <h4>${stay.numberOfPersons} personer</h4>
                <h4>Fra ${stay.price},-</h4>
            </div>

            
            <div class="stays-læsmere-container">
                <h4><a href="detailPage.html?stayId=${stay._id}">LÆS MERE</a></h4>
            </div>
        </div>`,



    init: async () => {
        const OpholdContainer = document.querySelector('.ophold-container');

        if (OpholdContainer) {
            const stayResult = await service.get('stays');

            stayResult.forEach((opholds) => {
                OpholdContainer.insertAdjacentHTML('beforeend', ophold.template(opholds));
            });
        }
    }
};

export default ophold;