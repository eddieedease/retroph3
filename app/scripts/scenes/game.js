 import Enemy from '@/objects/enemy';
 import Texter from '@/objects/texter';



 export default class Game extends Phaser.Scene {
   /**
    *  A sample Game scene, displaying the Phaser logo.
    *
    *  @extends Phaser.Scene
    */
   constructor() {
     super({
       key: 'Game'
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

    // the ref to this is pretty important
     let thisRef = this;

     let shader = 1;

     // loading the json tilemap
     this.map = this.make.tilemap({
       key: 'tileset'
     });

     console.log('map = ' + this.map.height);

     this.tiles = this.map.addTilesetImage('roguelike_city', 'tiles', 16, 16);
     this.tiles2 = this.map.addTilesetImage('tileset2extruded', 'tiles2', 16, 16);

     this.layerbg = this.map.createStaticLayer(0, this.tiles, 0, 0).setScale(1);
     this.layerbg2 = this.map.createStaticLayer(1, this.tiles2, 0, 0).setScale(1);

     // cursor keys (disabled cause WASD movement)
     // this.cursors = this.input.keyboard.createCursorKeys();

     // the walker
     this.player = this.physics.add.sprite(50, 100, 'player').setScale(0.3);

     // set up a boolean for our player alive status
     this.playerAlive = true;

     this.playerInvincible = false;


     // we want this to be a group eventually
     this.enemy = this.add.existing(new Enemy(this, 100, 200));
     this.enemy2 = this.add.existing(new Enemy(this, 300, 150));
     this.enemy3 = this.add.existing(new Enemy(this, 500, 400));
     this.enemy4 = this.add.existing(new Enemy(this, 400, 400));
     this.enemy5 = this.add.existing(new Enemy(this, 300, 300));
     this.enemy6 = this.add.existing(new Enemy(this, 100, 500));
     this.enemy7 = this.add.existing(new Enemy(this, 300, 50));
     this.enemy8 = this.add.existing(new Enemy(this, 400, 400));
     this.enemy9 = this.add.existing(new Enemy(this, 200, 400));
     this.enemy10 = this.add.existing(new Enemy(this, 100, 150));

     // Adding them to the Array
     this.enemyArray = [this.enemy, this.enemy2, this.enemy3, this.enemy4, this.enemy5, this.enemy6, this.enemy7, this.enemy8, this.enemy9, this.enemy10];

     this.enemyArray.forEach(_enemy => {
       
        let collider = this.physics.add.overlap(_enemy, this.player, function (clownOnBlock) {
         // clownOnBlock.body.stop();
         // this.physics.world.removeCollider(collider);
         // this.cameras.main.flash(500);
         // TODO: HERE is the player colliding with enemies
         // dthis.playerAlive = false;
         // this.gameoverscreen.visible = true;
          if (this.playerInvincible !== true){
            this.cameras.main.flash();
            this.scene.pause();
            this.playerInvincible = true;
            this.invisEvent = this.time.addEvent({ delay: 5000, callback: this.inVinsibleForAsec, callbackScope: this, repeat: 0 });
            this.input.stopPropagation();
           
            this.scene.launch('MiniGame');
            this.upKey.isDown = false;
            this.downKey.isDown = false;
            this.leftKey.isDown = false;
            this.rightKey.isDown = false;
          } else {
            
          }
         

         
       }, null, this);
     });

     this.scenePause = false;

     //try an npc



     this.layer1 = this.map.createStaticLayer(2, this.tiles, 0, 0).setScale(1);
     this.layercol = this.map.createStaticLayer(3, this.tiles, 0, 0).setScale(1);
     this.layer2 = this.map.createStaticLayer(4, this.tiles2, 0, 0).setScale(1);
     this.layercol.setCollisionBetween(715, 716);
     this.layercol.visible = false;
     this.cameras.main.setSize(900, 600);
     this.cameras.main.setBounds(0, 0, 2400, 1600);

     this.cameras.main.setZoom(3);
     this.cameras.main.roundPixels = false;
     this.cameras.main.startFollow(this.player, true, 0.8, 0.8);



     this.sprites = [];

     //  Create the particles
    //  for (var i = 0; i < 200; i++) {
    //    var x = Phaser.Math.Between(0, 900);
    //    var y = Phaser.Math.Between(0, 700);

    //    this.image = this.add.image(x, y, 'particle').setScrollFactor(0).setAlpha(0.1);
                                                        
    //    this.image.setBlendMode(Phaser.BlendModes.OVERLAY);

    //    this.sprites.push({
    //      s: this.image,
    //      r: 2 + Math.random() * 6
    //    });
    //  }


     //  The miniCam is 400px wide, so can display the whole world at a zoom of 0.2
     // this.minimap = this.cameras.add(200, 10, 400, 100).setZoom(0.2).setName('mini');
     // this.minimap.setBackgroundColor(0x002244);
     // this.minimap.scrollX = 1600;
     // this.minimap.scrollY = 300;

     // this.cameras.main.setRenderToTexture(customPipeline2);

     // collision tileset and player & rest
     this.physics.add.collider(this.player, this.layercol);

     // enemey collider
     this.enemyArray.forEach(_enemy => {
       this.physics.add.collider(_enemy, this.layercol, this.enemyHitWall);
     });
     // NOTE: Animations set up
     // player animations setup
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

     this.pinhole = this.add.image(450, 300, 'pinhole').setScale(0.4).setScrollFactor(0).setAlpha(0.8);

     // THe RADMENU
     this.radmenu = this.add.image(500, 200, 'mball').setScale(0.5);
     this.radmenu.visible = false;
     // gameover screen
     this.gameoverscreen = this.add.image(450, 300, 'gameover').setScale(0.7).setScrollFactor(0);
     this.gameoverscreen.visible = false;




     this.texter = this.add.existing(new Texter(this, 100, 200));

     // example of group in circle
     // this.mballcircle = new Phaser.Geom.Circle(this.player.x, this.player.y, 50);

     // this.mballgroup = this.add.group({
     //   key: 'mball',
     //   frameQuantity: 5,
     //   setScale: {
     //     x: 0.3,
     //     y: 0.3,
     //   }
     // });

     // example place on circle
     // Phaser.Actions.PlaceOnCircle(this.mballgroup.getChildren(), this.mballcircle);

     // example of tween
     // this.mballtween = this.tweens.addCounter({
     //   from: 100,
     //   to: 10,
     //   duration: 3000,
     //   delay: 2000,
     //   ease: 'Sine.easeInOut',
     //   repeat: -1,
     //   yoyo: true
     // });

     //  Pausing the action, show menu ring
     this.input.keyboard.on('keydown_F', function (event) {
       if (this.scenePause === false) {
         this.scenePause = true;
         // this.scene.pause();
         this.radmenu.visible = true;
         this.physics.pause();
         this.anims.pauseAll();
         this.radmenu.x = this.player.x;
         this.radmenu.y = this.player.y;

         // testing: show texter
         this.texter.updateText(this.player.x,this.player.y,'I need some\nmotivation\nOh! Fancy ringmenu');
       } else {
         this.scenePause = false;
         // console.log('resume');
         this.radmenu.visible = false;
         this.physics.resume();
         this.anims.resumeAll();

         // testing: hide texter
         this.texter.hideTexter();
       }
     }, this);


     this.allowMenuLeft = true;
     this.allowMenuRight = true;

     //pauze menu rings
     // left 
     this.input.keyboard.on('keydown_A', function (event) {
       // check if the action is paused
       if (thisRef.scenePause === true && thisRef.allowMenuLeft === true) {
         thisRef.allowMenuLeft = false;
         console.log('A is pressed');
         thisRef.tweens.add({
           targets: thisRef.radmenu,
           ease: 'Power1',
           duration: 250,
           onComplete: function () {
             thisRef.allowMenuLeft = true;
           },
           angle: thisRef.radmenu.angle - 90
         });
       }
     });
     // right
     this.input.keyboard.on('keydown_D', function (event) {
       if (thisRef.scenePause === true && thisRef.allowMenuRight === true) {
         thisRef.allowMenuRight = false;
         thisRef.tweens.add({
           targets: thisRef.radmenu,
           ease: 'Power1',
           duration: 250,
           onComplete: function () {
             thisRef.allowMenuRight = true;
           },
           angle: thisRef.radmenu.angle + 90
         });
       }
     });

     // Register KEYS for movement (Instead of cursorkeys)

     this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
     this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
     this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
     this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

     // Add pinhole effect

   }

   inVinsibleForAsec (){
    this.playerInvincible = false;
    console.log('comes here');

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



     // Pause VAR -- check if the main game needs to be updated

     // group of enemiews update
     this.enemyArray.forEach(_enemy => {
       //_enemy.update();

       let random = Math.floor((Math.random() * 200) + 1);
       if (random === 100) {
         _enemy.changeVelocity();
       }
       if (this.playerAlive === true) {
         _enemy.update();
       } else {
         _enemy.sceneStop();
       }
     });

     // what needs pauzing on main scene
     if (this.scenePause !== true && this.playerAlive === true) {

       // The psarticle update loop
       for (var i = 0; i < this.sprites.length; i++) {
         var sprite = this.sprites[i].s;
        
         sprite.y -= this.sprites[i].r - 4;

         if (sprite.y < -256) {
           sprite.y = 700;
         }
       }


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



   enemyHitWall(_enemy) {
     _enemy.changeVelocity();
   }



   debug() {
     this.debugGraphics.clear();
     this.map.renderDebug(this.debugGraphics, {
       tileColor: null, // Non-colliding tiles
       collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
       faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
     });
   }
 }
