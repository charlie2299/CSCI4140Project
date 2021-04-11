export default function canvasController(p, init){
    this.p = p;
    this.init = init;
    this.propsHandler = (props) => {
        this.p.frameRate(props.settings.frameRate);
        if(props.settings.paused){
            this.p.noLoop();
        }else{
            this.p.loop();
        }
        if(props.settings.restart){
            this.init();
            if(!this.p.isLooping()){
                this.p.redraw();
            }
        }
        if(props.settings.nextStep){
            this.p.redraw();
        }
    }

}

