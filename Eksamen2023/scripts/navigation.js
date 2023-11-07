


const navigation = {

    navData : [
        {
            page: '../pages/Kontakt.html',
            title: 'Kontakt'
        },
        {
            page: '../pages/Aktiviteter.html',
            title: 'Aktiviteter'
        }, 
        {
            page: '../pages/Ophold.html',
            title: 'Ophold'
        },
        {
            page: '../pages/detailPage.html?stayId=6533c19ad89bd7c9ba8de72e',
            title: 'Weekendtur'
        },
        {
            page: '../pages/detailPage.html?stayId=6533c22ed89bd7c9ba8de735',
            title: 'Romantisk Getaway'
        },
        {
            page: '../pages/detailPage.html?stayId=6533c25dd89bd7c9ba8de739',
            title: 'Familie Pakken'
        }
    ],

   
    template : (navDataList) => 
    `<nav class="topnav">    
    <a href="../index.html"><img src="../assets/fav.ico" alt="logo" class="logo" ></a>
 
    <div id="myLinks" class="myLinks">
      <ul>
      ${navDataList.map( (link) => `<li><a class="Zen" href="${link.page}">${link.title}</a></li>` ).join(' ')}
      </ul>
    </div>
    
    <a id="burger" class="icon">
      <div class="burger-box">
      <span class="bl-1"></span>
      <span class="bl-2"></span>
      <span class="bl-3"></span>
      </div>
    </a>
    </nav>`,



    
    addEvents : () => {

        const Burgermenu = document.querySelector('#myLinks');
        const toggleBurgerMenu = document.querySelector('#burger');
        const nav = document.querySelector('.topnav')
        const logo = document.querySelector('.logo')

        if(toggleBurgerMenu) {
            toggleBurgerMenu.addEventListener('click', () => {
                Burgermenu.classList.toggle('active');
                toggleBurgerMenu.classList.toggle('b-active');
                nav.classList.toggle('nav-farve');
                logo.classList.toggle('none')
            });
        }
    },

   
    init : () => {

        const navigationElement = document.querySelector('.navigation');
        
        if(navigationElement) {
    
            navigationElement.innerHTML = navigation.template(navigation.navData);
    
      
            navigation.addEvents();
          
    
        }
        
        
    },

    

};

export default navigation;