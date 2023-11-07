import service from "../scripts/service.js";



const Udtalelser = {

    template : (review) => `
    <div class="udtalelse-container">
        <div class="udtalelse-overskrift Zen">
            <h4>${review.name}, ${review.age}<br>Har været på ${review.stay}</h4>

            
        </div>
        
        <div class="udtalelse-content Nanum">
            
            <p>${review.review}</p>

        </div>
    </div>`,

   
    renderUdtalelser: ( Udtalelser ) => {

        Udtalelser.insertAdjacentHTML('beforeend', Udtalelser.template(review))  
    
    },

    init : async () => {

        let UdtalelserContainer = document.querySelector('.udtalelser-container');

        if(UdtalelserContainer)
        {

            const ReviewResult = await service.get('reviews');

            ReviewResult.forEach(review => {

                UdtalelserContainer.insertAdjacentHTML('beforeend', Udtalelser.template(review))

            });

          

            
        }
    }

}




export default Udtalelser;