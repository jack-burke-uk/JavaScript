vm = new Vue({
    el:"#app",
    data:{
        projects:[
            {
                Title: "Duotone",
                Description: "An easy way to apply theme consistency across a number of images",
                Href: "/JavaScript/Duotone",
                bgUrl:"./HomePage/Content/Images/duotone-transparent.png"
            },
            {
                Title: "Dial Stats",
                Description: "A javascript component for visualising percentage-based data",
                Href: "/JavaScript/Dial%20Stat",
                bgUrl:"./HomePage/Content/Images/dial-stat.png"
            },
            {
                Title: "Spirograph",
                Description: "A spirograph generator that creates a new image each time the page is loaded",
                Href: "/JavaScript/Spirograph",
                bgUrl:"./HomePage/Content/Images/spirograph.png"
            },
            {
                Title: "Polaroid Video",
                Description: "A JS page which can turn videos (or camera feeds) into a polaroid-style animation",
                Href: "/JavaScript/Polaroid",
                bgUrl:"./HomePage/Content/Images/polaroid.png"
            }
        ]
    },
    methods:{
        handleProjectClicked: function(project){
            if(project.hasOwnProperty("Href")){
                window.location = project.Href;
            }
            else{
                console.log(`Project '${project.Title}' clicked.`);
            }
        }
    }
});