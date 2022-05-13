Vue.component('project-window', {
    props:["project"],
    data: function(){
        return {
            style:{
                'background-image': this.project.hasOwnProperty("bgUrl") ? `url('${this.project.bgUrl}')` : ""
            },
            bgImg: this.project.hasOwnProperty("bgUrl") ? this.project.bgUrl : ""
        }
    },
    methods:{
        onClick: function(){
            this.$emit("projectselected", this.project);
        }
    },
    template:`
        <div class="project-window" @click="onClick">
            <div class="project-image" :style="style"></div>
            <div class="description">
                <div class="content">
                    <span class="description-header">{{project.Title}}</span>
                    {{project.Description}}
                </div>
            </div>
        </div>
    `
});