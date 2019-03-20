
export default class Minigame extends Phaser.Scene {
   /**
    *  A sample Game scene, displaying the Phaser logo.
    *
    *  @extends Phaser.Scene
    */
   constructor() {
     super({
       key: 'MiniGame'
     });
   }

   /**
    *  Called when a scene is initialized. Method responsible for setting up
    *  the game objects of the scene.
    *
    *  @protected
    *  @param {object} data Initialization parameters.
    */
   create( /* data */ ) {
     //  NOTE: Below is template use of objects
     // this.logo = this.add.existing(new Logo(this));

     let thisRef = this;

     let shader = 1;

     this.playerAlive = true;

     // the walker
     this.player = this.physics.add.sprite(50, 100, 'player').setScale(0.3);

     var playerup = {
       key: 'playerup',
       frames: this.anims.generateFrameNumbers('player', {
         start: 12,
         end: 15
       }),
       frameRate: 5,
       repeat: -1
     };

     var playerdown = {
       key: 'playerdown',
       frames: this.anims.generateFrameNumbers('player', {
         start: 0,
         end: 3
       }),
       frameRate: 5,
       repeat: -1
     };

     var playerside = {
       key: 'playerside',
       frames: this.anims.generateFrameNumbers('player', {
         start: 4,
         end: 7
       }),
       frameRate: 5,
       repeat: -1
     };

     var playeridle = {
       key: 'playeridle',
       frames: this.anims.generateFrameNumbers('player', {
         start: 1,
         end: 1
       }),
       frameRate: 5,
       repeat: -1
     };


     // space key bar
     this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



     // PLAYER ANIMATIONS
     this.anims.create(playerup);
     this.anims.create(playerdown);
     this.anims.create(playerside);
     this.anims.create(playeridle);

     // this.physics.accelerateToObject(this.npc1, this.player, 60, 300, 300);

     this.playerxy = {
       x: this.player.x,
       y: this.player.y
     };

     // this.pinhole = this.add.image(450, 300, 'pinhole').setScale(0.4).setScrollFactor(0).setAlpha(0.8);

     // Register KEYS for movement (Instead of cursorkeys)

     this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
     this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
     this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
     this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

     // Add pinhole effect
   }



   /**
    *  Called when a scene is updated. Updates to game logic, physics and game
    *  objects are handled here.
    *
    *  @protected
    *  @param {number} t Current internal clock time.
    *  @param {number} dt Time elapsed since last update.
    */
   update( /* t, dt */ ) {


    if (this.keySpace.isDown)
    {
      this.input.stopPropagation();
      this.scene.resume('Game');
      this.scene.stop('MiniGame');

    }

     // Pause VAR -- check if the main game needs to be updated


     // what needs pauzing on main scene
     if (this.playerAlive === true) {
       // this.controls.update(delta);
       this.player.setVelocity(0);
       // this.npc1.setVelocity(0);
       var _newstate;
       if (this.leftKey.isDown) {
         _newstate = 'sideways';
         this.player.setVelocityX(-85);
         this.player.setFlipX(true);
         // this.cameras.main.followOffset.x = 300;
       } else if (this.rightKey.isDown) {
         _newstate = 'sideways';
         this.player.setVelocityX(85);
         this.player.setFlipX(false);

         // this.cameras.main.followOffset.x = -300;
       } else if (this.upKey.isDown) {
         _newstate = 'up';
         this.player.setVelocityY(-85);
         // this.cameras.main.followOffset.x = -300;
       } else if (this.downKey.isDown) {
         _newstate = 'down';
         this.player.setVelocityY(85);
         // this.cameras.main.followOffset.x = -300;
       } else {
         _newstate = 'idle';
       }
       this.update_checkPlayerAnimation(_newstate);
     } else {
       // NOTE: GAMELoop is Pauzed or player is dead
       //RADmenu testing
       this.player.setVelocity(0);
       // this.radmenu.rotation += 0.05;
     }





     // the mball update loop
     // Phaser.Actions.SetXY(this.mballgroup.getChildren(), this.player.x, this.player.y);
     // Phaser.Actions.RotateAroundDistance(this.mballgroup.getChildren(), { x: this.player.x, y: this.player.y }, 0.02, 50);
   }

   update_checkPlayerAnimation(_newstate) {
     // lets check if the animation needs to be changed
     if (this.player_animstate !== _newstate) {
       this.player_animstate = _newstate;
       switch (_newstate) {
         case 'sideways':
           this.player.play('playerside');
           //this.npc1.play('npcside');
           break;
         case 'idle':
           this.player.play('playeridle');
           // this.npc1.play('npcidle');
           break;
         case 'up':
           this.player.play('playerup');
           // this.npc1.play('npcup');
           break;
         case 'down':
           this.player.play('playerdown');
           // this.npc1.play('npcdown');
           break;
       }
     } else {
       // Do nothing and keep animation going
     }
   }



   debug() {
    //  this.debugGraphics.clear();
    //  this.map.renderDebug(this.debugGraphics, {
    //    tileColor: null, // Non-colliding tiles
    //    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
    //    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
    //  });
   }
 }
