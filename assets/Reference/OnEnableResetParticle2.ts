// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass

export default class OnEnableResetParticle extends cc.Component {

    @property(cc.ParticleSystem)
    nodeList: cc.ParticleSystem[] = [null];
       
    playParticles() {
        for (let i = 0; i < this.nodeList.length; i++) {
            this.nodeList[i].resetSystem();            
        };
    }
}
