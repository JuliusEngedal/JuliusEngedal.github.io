import service from "./service/service.js";



const activities = {

    template : (activities) => `
    <div class="aktiviteter-accordian" style="background-image: url(/assets/activities/${activities._id}.jpg);">
        <div class="aktivitet-overskrift">
            <h2>${activities.title} 
            
            </h2>
        </div>


      <div class="aktivitet-content-container">
        <h4>${activities.date}<br>kl.${activities.time}</h4>
           <div class="aktivitet-span-container">
            <span class="material-symbols-outlined more"><h4>Læs Mere    </h4>expand_more</span>
            <span class="material-symbols-outlined less"><h4>Læs Mindre   </h4> expand_less </span>
           </div> 
          <div class="aktivitet-accordian-content">
            <p>${activities.description}</p>
          </div>
      </div>
    </div>`,

    onToggle : (e) => {

        e.currentTarget.classList.toggle('active');

    },

    addEvents : () => {

        const accordions = document.querySelectorAll('.aktiviteter-accordian');
        
        accordions.forEach((accord) => accord.addEventListener('click', activities.onToggle))

    },

    init : async () => {

        let aktiviteterContainer = document.querySelector('.aktiviteter-container');

        if(aktiviteterContainer)
        {

            const activitiesResult = await service.get('activities');

            activitiesResult.forEach(activiti => {

                aktiviteterContainer.insertAdjacentHTML('beforeend', activities.template(activiti))

            });

            activities.addEvents();

            
        }
    }

}




export default activities;