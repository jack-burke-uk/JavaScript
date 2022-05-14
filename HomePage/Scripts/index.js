vm = new Vue({
    el:"#app",
    data:{
        isLoading: true,
        projects:[]
    },
    created(){
        var self = this;
        var req = new XMLHttpRequest();
        req.open("GET", "./HomePage/Content/Projects.json");
        req.addEventListener("readystatechange", function(){
            if(req.readyState == 4 && req.status == 200){
                self.projects = JSON.parse(req.responseText).projects;
                self.isLoading = false;
            }
        });
        req.send();       
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