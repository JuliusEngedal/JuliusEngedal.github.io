import {validateEmail} from "./service/helpers.js";
import service from "./service/service.js";


const subscribe = {

    formResponseTmpl : (response) => `<div class="subscribe-result"><h4>Hej ${response.data.name} <br> Tak for din besked! <br> Du høre fra os snarest.</h4><a href="./Kontakt.html "><div class="subscribe-result-button"><h4> TILBAGE </h4></div></a> </div>`,
    subscribersTmpl : (sub) => `<div>${sub.name} : ${sub.email} : ${sub.message ? sub.message : 'No message'}</div>`,
    
    validateAndSendForm : (e) => {

        e.preventDefault();

        const {name, email, message, subject} = e.target.elements;

        let postObj = {
            'name' : name.value,
            'email' : email.value,
            'message' : message.value,
            'subject' :   subject.value
        }

       service.submitMember(postObj).then((response => {

            let subscribeForm = document.querySelector('#kontakt-form');
            let subscribersContainer = document.querySelector('.kontakt-form-container')
            subscribeForm.style = 'display:none';
            subscribersContainer.innerHTML = subscribe.formResponseTmpl(response);
            console.log(response)
        }));

    },

    validateFormOnUpdate : (e) => {

        console.log(e.target.value, e.target.name)

        if(e.target.name === 'email')
        {
      
            if(validateEmail(e.target.value)) {

                
                e.target.style.borderColor = "white"
                e.target.style.color = "white"
                
            } else {

                e.target.style.borderColor = "red"
                e.target.style.color = "red"

            }

        } else if(e.target.name === 'name')
        {
           

       
        } 

    },

    init : async () => {

        let subscribeContainer = document.querySelector('.kontakt-form-container')
       
       
        if(subscribeContainer) {

            const form = document.querySelector('#kontakt-form');

            if(form)
            {

                form.addEventListener('submit', (e) => subscribe.validateAndSendForm(e));
                form.addEventListener('input', (e) => subscribe.validateFormOnUpdate(e))

            }
      
        }

        
             
    }
}

export default subscribe;