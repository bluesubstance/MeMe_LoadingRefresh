// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property, requireComponent } = cc._decorator;

@ccclass

@requireComponent(cc.Animation)
export default class OnEnablePlayAnim extends cc.Component {

    @property({
        type: cc.Animation,
        // visible: true,
    })
    private _target: cc.Animation = null;

    @property({
        visible: true,
    })
    private _playAdditive = true;

    get target() {
        return this._target || (this._target = this.getComponent(cc.Animation));
    }

    onLoad() {
        if (this.target) this.target.on(cc.Animation.EventType.FINISHED, this._onFinished, this)
    }

    onDestroy() {
        if (this.target) this.target.off(cc.Animation.EventType.FINISHED, this._onFinished, this)
    }

    private _onFinished(...params: any[]) {
        cc.log(`onFinished`);
        // const type: string = params[0];
        const state: cc.AnimationState = params[1];
        const clips = this.target.getClips();
        const index = clips.indexOf(state.clip);
        if (index > -1) {
            if (index + 1 < clips.length) {
                this.play(index + 1);
            }
        }
    }

    onEnable() {
        // cc.log(`onEnable`);
        this.play();
    }

    play(value?: number) {
        if (!this.target) return;
        const clips = this.target.getClips();
        if (this._playAdditive) {
            for (const clip of clips) {
                if (clip) {
                    // cc.log(`playAdditive clip name(${clip.name})`);
                    this.target.playAdditive(clip.name);
                }
            }
        } else {
            const index = cc.js.isNumber(value) ? value : 0;
            const clips = this.target.getClips();
            if (index >= 0 && index < clips.length) {
                this.target.play(clips[index].name);
            }
        }
    }
}
