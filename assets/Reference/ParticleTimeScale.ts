// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

const TIME_SCALE = 'timeScale';
const LATE_UPDATE = 'lateUpdate';
const LATE_UPDATE_NEW = 'lateUpdateNew';
const LATE_UPDATE_ORIGIN = 'lateUpdateOrig';

function lateUpdateNew(this: cc.ParticleSystem, dt: number) {
    this[LATE_UPDATE_ORIGIN](dt * this[TIME_SCALE] || 1);
}

@ccclass
export default class ParticleTimeScale extends cc.Component {

    @property({
        type: cc.Float,
        visible: true,
        min: 0,
    })
    private _timeScale: number = 1;

    @property({
        type: cc.ParticleSystem,
        visible: true,
    })
    private _particleList: Array<cc.ParticleSystem> = [];

    public set timeScale(value: number) {
        this._timeScale = Math.max(0, value);
        this._particleList.filter(it => !!it).forEach(it => it[TIME_SCALE] = this._timeScale);
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._particleList.filter(it => !!it).forEach(it => {
            it[TIME_SCALE] = this._timeScale;
            it[LATE_UPDATE_ORIGIN] = it[LATE_UPDATE];
            it[LATE_UPDATE_NEW] = lateUpdateNew;
        }, this);
    }

    onEnable() {
        this._particleList.forEach(it => it[LATE_UPDATE] = it[LATE_UPDATE_NEW]);
    }

    //onDisable() {
    //    this._particleList.forEach(it => it[LATE_UPDATE] = it[LATE_UPDATE_ORIGIN]);
    //}
}
