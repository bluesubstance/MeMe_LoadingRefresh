// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property} = cc._decorator;

@ccclass
export default class OnEnablePlayAnim extends cc.Component {

    @property(cc.Animation)
    nodeList: cc.Animation[] = [null];

    onLoad() {
        for (let i = 0; i < this.nodeList.length; i++) {
            if (this.nodeList[i] != null) this.nodeList[i].on(cc.Animation.EventType.FINISHED, this._onFinished, this)
        };
    }

    private _onFinished(...params: any[]) {
        //cc.log(`onFinished`);
        
        // const type: string = params[0];
        const state: cc.AnimationState = params[1];
        for (let i = 0; i < this.nodeList.length; i++) {
            const clips = this.nodeList[i].getClips();
        
        const index = clips.indexOf(state.clip);
        if (index > -1) {
            if (index + 1 < clips.length) {
                this.playAnimation(index + 1);
            }
            }
        };
    }

    //onEnable() {
        //this.playAnimation();
    //}

    playAnimation(value?: number) {
        for (let i = 0; i < this.nodeList.length; i++) {
            if (!this.nodeList[i]) return;
            const clips = this.nodeList[i].getClips();
            
                const index = cc.js.isNumber(value) ? value : 0;
                if (index >= 0 && index < clips.length) {
                    this.nodeList[i].play(clips[index].name);
                }
            
        };
    }
}
