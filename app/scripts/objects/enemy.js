export default class Enemy extends Phaser.GameObjects.Sprite {
  /**
   *  A simple prefab (extended game object class), displaying a spinning
   *  Phaser 3 logo.
   *
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene,x ,y ) {
    super(scene, 0, 0, 'npc').setScale(0.6);


    // randommer followspeed
    this.speedz = Math.floor((Math.random() * 30) + 25);

    this.setSize(4, 4, true);
    this.scene = scene;
    console.log(scene.physics);
    
    console.log(this);

    // this.npc1 = this.physics.add.sprite(100, 100, 'npc').setScale(0.7);
    this.x = x;
    this.y = y;
    scene.physics.add.existing(this, false);
    
    // scene.physics.add.collider(this, scene.layercol);

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

    // ENEMY ANIMATIONS
    scene.anims.create(npcup);
    scene.anims.create(npcdown);
    scene.anims.create(npcside);
    scene.anims.create(npcidle);
  }



  /**
   *  Increment the angle smoothly.
   */
  update() {

    //this.angle += 0.1;
    // this.x += 1;
    this.scene.physics.moveToObject(this, this.scene.player, this.speedz);

    let npc1newstate = null;

    if (this.body.velocity.x > 25) {
      npc1newstate = 'right';
    } else if (this.body.velocity.x < -25) {
      npc1newstate = 'left';
    }
    if (this.body.velocity.y > 25) {
      npc1newstate = 'down';
    } else if (this.body.velocity.y < -25) {
      npc1newstate = 'up';
    } else {

    }

    if (this.npc1state !== npc1newstate) {
      this.npc1state = npc1newstate;
      switch (this.npc1state) {
        case 'left':
          this.play('npcside');
          this.setFlipX(true);
          break;
        case 'right':
          this.play('npcside');
          this.setFlipX(false);
          break;
        case 'idle':
          this.play('npcidle');
          break;
        case 'up':
          this.play('npcup');
          break;
        case 'down':
          this.play('npcdown');
          break;
      }
    }
  }
}
