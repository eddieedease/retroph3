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

    this.a = 0.25;

    // space key bar
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    // Register KEYS for movement (Instead of cursorkeys)

    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // Circle
    this.graphics = this.add.graphics({
      lineStyle: {
        width: 2,
        color: 0x00ff00
      },
      fillStyle: {
        color: 0xff0000
      }
    });

    this.circle = new Phaser.Geom.Circle(450, 300, 250, 200);
    this.point = new Phaser.Geom.Rectangle(0, 0, 16, 16);

    this.playerShip = this.add.image(500, 200, 'ship').setScale(0.6);
    this.playerShip.angle = 90;
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


    // Circler update
    // this.a += 0.01;

    if (this.a > 1) {
      this.a = 0;
    }


    if (this.leftKey.isDown) {
      this.a += 0.005;
      if (this.a > 1) {
        this.a = 0;
      }

    } else if (this.rightKey.isDown) {
      this.a -= 0.005;
      if (this.a < 0) {
        this.a = 1;
      }
    }

    this.playerShip.rotation = Phaser.Math.Angle.Between(this.playerShip.x, this.playerShip.y, 450, 300);

    this.circle.getPoint(this.a, this.point);
    this.graphics.clear();
    this.graphics.lineStyle(2, 0x00ff00);
    this.graphics.strokeCircleShape(this.circle);

    this.graphics.fillStyle(0xFF0000);
    this.graphics.fillRect(this.point.x - 8, this.point.y - 8, this.point.width, this.point.height);

    this.playerShip.x = this.point.x ;
    this.playerShip.y = this.point.y ;


    if (this.keySpace.isDown) {
      this.input.stopPropagation();
      this.scene.resume('Game');
      this.scene.stop('MiniGame');
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
