// import Logo from '@/objects/logo';

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
    //  NOTE: Below is template use of objects
    // this.logo = this.add.existing(new Logo(this));

    // loading the json tilemap
    this.map = this.make.tilemap({
      key: 'tileset'
    });

    this.tiles = this.map.addTilesetImage('roguelike_city', 'tiles', 16, 16);

    this.layerbg = this.map.createStaticLayer(0, this.tiles, 0, 0).setScale(1);

    // cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // the walker
    this.player = this.physics.add.sprite(100, 100, 'player').setScale(0.3);





    this.layer1 = this.map.createStaticLayer(1, this.tiles, 0, 0).setScale(1);
    this.layercol = this.map.createStaticLayer(2, this.tiles, 0, 0).setScale(1);
    this.layercol.visible = false;
    this.map.setCollisionBetween(715, 716);
    this.cameras.main.setSize(900, 700);
    this.cameras.main.setBounds(0, 0);

    this.cameras.main.setZoom(3.4);
    this.cameras.main.roundPixels = true;
    this.cameras.main.startFollow(this.player, true, 0.9, 0.9);

    // collision tileset and player
    this.physics.add.collider(this.player, this.layercol);

    // player
    // walker config form png sequense
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
        start: 0,
        end: 0
      }),
      frameRate: 5,
      repeat: -1
    };

    this.anims.create(playerup);
    this.anims.create(playerdown);
    this.anims.create(playerside);
    this.anims.create(playeridle);

    // THe RADMENU
    this.radmenu = this.add.image(500, 200, 'mball').setScale(0.5);


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

    //




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
    // NOTE: template of using object
    // this.logo.update();
    // this.controls.update(delta);
    this.player.setVelocity(0);

    var _newstate;


    if (this.cursors.left.isDown) {
      _newstate = 'sideways';
      this.player.setVelocityX(-100);
      this.player.setFlipX(true);
      // this.cameras.main.followOffset.x = 300;
    } else if (this.cursors.right.isDown) {
      _newstate = 'sideways';
      this.player.setVelocityX(100);
      this.player.setFlipX(false);
      // this.cameras.main.followOffset.x = -300;
    } else if (this.cursors.up.isDown) {
      _newstate = 'up';
      this.player.setVelocityY(-100);
      // this.cameras.main.followOffset.x = -300;
    } else if (this.cursors.down.isDown) {
      _newstate = 'down';
      this.player.setVelocityY(100);
      // this.cameras.main.followOffset.x = -300;
    } else {
      _newstate = 'idle';
    }
    this.update_checkPlayerAnimation(_newstate);

    //RADmenu testing
    this.radmenu.x = this.player.x;
    this.radmenu.y = this.player.y;
    this.radmenu.rotation += 0.05;

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
        break;
      case 'idle':
        this.player.play('playeridle');
        break;
      case 'up':
        this.player.play('playerup');
        break;
      case 'down':
        this.player.play('playerdown');
        break;
    }
  } else {
    // Do nothing and keep animation going
  }
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
