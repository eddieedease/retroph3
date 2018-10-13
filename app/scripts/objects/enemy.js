export default class Enemy extends Phaser.GameObjects.Sprite {
  /**
   *  A simple prefab (extended game object class), displaying a spinning
   *  Phaser 3 logo.
   *  @extends Phaser.GameObjects.Sprite
   */
  constructor(scene, x, y) {
    super(scene, 0, 0, 'npc').setScale(0.6);
    //appoint partent scene ref
    this.scene = scene;
    this.x = x;
    this.y = y;
    // randommer enemytipe + followspeed
    this.enemytype = Math.floor((Math.random() * 3) + 1);
    this.speedz = Math.floor((Math.random() * 30) + 27);
    // This setsize is for for the body, 'true' is for from the center
    // activate physics on object
    scene.physics.add.existing(this, false);
    this.body.setVelocity(-16, -16);
    // set up on enemy type, animations and add them if they do not exist
    switch (this.enemytype) {
      case 1:
        // enemy animations setup
        var npcup1 = {
          key: 'npcup1',
          frames: scene.anims.generateFrameNumbers('npc', {
            start: 84,
            end: 86
          }),
          frameRate: 5,
          repeat: -1
        };
        var npcdown1 = {
          key: 'npcdown1',
          frames: scene.anims.generateFrameNumbers('npc', {
            start: 48,
            end: 50
          }),
          frameRate: 5,
          repeat: -1
        };
        var npcside1 = {
          key: 'npcside1',
          frames: scene.anims.generateFrameNumbers('npc', {
            start: 72,
            end: 74
          }),
          frameRate: 5,
          repeat: -1
        };
        var npcidle1 = {
          key: 'npcidle1',
          frames: scene.anims.generateFrameNumbers('npc', {
            start: 49,
            end: 49
          }),
          frameRate: 5,
          repeat: -1
        };
        // adding animations
        // ENEMY ANIMATIONS
        scene.anims.create(npcup1);
        scene.anims.create(npcdown1);
        scene.anims.create(npcside1);
        scene.anims.create(npcidle1);
        this.upframes = 'npcup1';
        this.downframes = 'npcdown1';
        this.sideframes = 'npcside1';
        this.idleframes = 'npcidle1';
        break;
      case 2:
        // enemy 2 animation setup
        // enemy animations setup
        var npcup2 = {
          key: 'npcup2',
          frames: scene.anims.generateFrameNumbers('npc', {
            start: 39,
            end: 41
          }),
          frameRate: 5,
          repeat: -1
        };
        var npcdown2 = {
          key: 'npcdown2',
          frames: scene.anims.generateFrameNumbers('npc', {
            start: 3,
            end: 5
          }),
          frameRate: 5,
          repeat: -1
        };
        var npcside2 = {
          key: 'npcside2',
          frames: scene.anims.generateFrameNumbers('npc', {
            start: 27,
            end: 29
          }),
          frameRate: 5,
          repeat: -1
        };
        var npcidle2 = {
          key: 'npcidle2',
          frames: scene.anims.generateFrameNumbers('npc', {
            start: 4,
            end: 4
          }),
          frameRate: 5,
          repeat: -1
        };
        // ENEMY2 ANIMATIONS
        scene.anims.create(npcup2);
        scene.anims.create(npcdown2);
        scene.anims.create(npcside2);
        scene.anims.create(npcidle2);
        this.upframes = 'npcup2';
        this.downframes = 'npcdown2';
        this.sideframes = 'npcside2';
        this.idleframes = 'npcidle2';
        break;
      case 3:
        // enemy 3 animation setup
        // enemy animations setup
        var npcup3 = {
          key: 'npcup3',
          frames: scene.anims.generateFrameNumbers('npc', {
            start: 87,
            end: 89
          }),
          frameRate: 5,
          repeat: -1
        };
        var npcdown3 = {
          key: 'npcdown3',
          frames: scene.anims.generateFrameNumbers('npc', {
            start: 54,
            end: 56
          }),
          frameRate: 5,
          repeat: -1
        };
        var npcside3 = {
          key: 'npcside3',
          frames: scene.anims.generateFrameNumbers('npc', {
            start: 78,
            end: 80
          }),
          frameRate: 5,
          repeat: -1
        };
        var npcidle3 = {
          key: 'npcidle3',
          frames: scene.anims.generateFrameNumbers('npc', {
            start: 55,
            end: 55
          }),
          frameRate: 5,
          repeat: -1
        };
        // ENEMY3 ANIMATIONS
        scene.anims.create(npcup3);
        scene.anims.create(npcdown3);
        scene.anims.create(npcside3);
        scene.anims.create(npcidle3);
        this.upframes = 'npcup3';
        this.downframes = 'npcdown3';
        this.sideframes = 'npcside3';
        this.idleframes = 'npcidle3';
        break;
    }
  }

  sceneStop() {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }

  changeVelocity() {

    let x1 = Math.floor((Math.random() * 2) + 1);
    let x2 = Math.floor((Math.random() * 2) + 1);
    let v1;
    let v2;

    if (x1 === 1) {
      v1 = -20;
    } else {
      v1 = 20;
    }

    if (x2 === 1) {
      v2 = -20;
    } else {
      v2 = 20;
    }

    this.body.velocity.x = v1;
    this.body.velocity.y = v2;
  }
  /**
   *  UPDATE OBJECT LOOP
   */
  update() {
    // Move to player
    // check mainscene pause variable
    // console.log(this.scene.scenePause);
    if (this.scene.scenePause !== true) {
      // this.scene.physics.moveToObject(this, this.scene.player, this.speedz);
      // npc state var loop, set null
      let npcnewstate = null;
      if (this.body.velocity.x > 15) {
        npcnewstate = 'right';
      } else if (this.body.velocity.x < -15) {
        npcnewstate = 'left';
      } else if (this.body.velocity.y > 15) {
        npcnewstate = 'down';
      } else if (this.body.velocity.y < -15) {
        npcnewstate = 'up';
      } else {
        npcnewstate = 'idle';
      }
      // check if the state has changed, if so, change animations
      if (this.npcstate !== npcnewstate) {
        this.npcstate = npcnewstate;
        switch (this.npcstate) {
          case 'left':
            this.setFlipX(true);
            this.play(this.sideframes);
            break;
          case 'right':
            this.setFlipX(false);
            this.play(this.sideframes);
            break;
          case 'idle':
            this.play(this.idleframes);
            break;
          case 'up':
            this.play(this.upframes);
            break;
          case 'down':
            this.play(this.downframes);
            break;
        }
      }
    } else {

      // Game is pauzes
      //this.body.velocity.x = 0;
      //this.body.velocity.y = 0;
    }


  }
}
