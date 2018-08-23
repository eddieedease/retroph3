export default class Enemy extends Phaser.GameObjects.Sprite {
  /**
   *  A simple prefab (extended game object class), displaying a spinning
   *  Phaser 3 logo.
   *
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene) {
    super(scene, 0, 0, 'npc').setScale(0.7); 
    
    
    console.log(scene.physics);
    
    // this.npc1 = this.physics.add.sprite(100, 100, 'npc').setScale(0.7);
   this.x = 100;
   this.y = 100;

     // enemy animations setup
    var npcup = {
      key: 'npcup',
      frames: scene.anims.generateFrameNumbers('npc', {
        start: 84,
        end: 86
      }),
      frameRate: 5,
      repeat: -1
    };

    var npcdown = {
      key: 'npcdown',
      frames: scene.anims.generateFrameNumbers('npc', {
        start: 48,
        end: 50
      }),
      frameRate: 5,
      repeat: -1
    };

    var npcside = {
      key: 'npcside',
      frames: scene.anims.generateFrameNumbers('npc', {
        start: 72,
        end: 74
      }),
      frameRate: 5,
      repeat: -1
    };

    var npcidle = {
      key: 'npcidle',
      frames: scene.anims.generateFrameNumbers('npc', {
        start: 49,
        end: 49
      }),
      frameRate: 5,
      repeat: -1
    };
  }



  /**
   *  Increment the angle smoothly.
   */
  update() {
    
    //this.angle += 0.1;
    this.x += 1;
    

    // let npc1newstate = null;
    
    // if (this.body.velocity.x > 55) {
    //   npc1newstate = 'right';
    // } else if (this.body.velocity.x < -55) {
    //   npc1newstate = 'left';
    // }
    // if (this.body.velocity.y > 55) {
    //   npc1newstate = 'down';
    // } else if (this.body.velocity.y < -55) {
    //   npc1newstate = 'up';
    // } else {
      
    // }


    // // check if statechange needs action
    // if (this.npc1state !== npc1newstate) {
    //   this.npc1state = npc1newstate;
    //   switch (this.npc1state) {
    //     case 'left':
    //       this.play('npcside');
    //       this.setFlipX(true);
    //       break;
    //     case 'right':
    //       this.play('npcside');
    //       this.setFlipX(false);
    //       break;
    //     case 'idle':
    //       this.play('npcidle');
    //       break;
    //     case 'up':
    //       this.play('npcup');
    //       break;
    //     case 'down':
    //       this.play('npcdown');
    //       break;
    //   }
    // }
  }
}
